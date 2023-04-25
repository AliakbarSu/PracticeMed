import { getUser, updateUserAppMetadata } from '@mpt-sst/core/auth0'
import { getPlan } from '@mpt-sst/core/plans'
import { constructEvent, retrieveSession } from '@mpt-sst/core/stripe'
import { UserAppMetadata } from '@mpt-types/User'
import { ApiHandler } from 'sst/node/api'
import { Stripe } from 'stripe'

export const handler = ApiHandler(async (_evt) => {
  const payload = _evt.body || ''
  const sig = _evt.headers['stripe-signature'] || ''

  const event = constructEvent({ payload, sig })
  const session = event.data.object as Stripe.Checkout.Session
  if (event.type === 'checkout.session.completed') {
    const sessionWithLineItems = await retrieveSession(session.id, {})
    const planId = sessionWithLineItems.metadata?.product_id || ''
    const auth0_id = sessionWithLineItems.metadata?.customer_id || ''
    const { app_metadata } = await getUser(auth0_id)
    // Getting the plan
    const product = await getPlan(planId)
    const updatedUserAppMetadata: UserAppMetadata = {
      ...app_metadata,
      plan: {
        id: product.id,
        stripe_customer_id: (sessionWithLineItems.customer as string) || '',
        name: product.name,
        limit: Number(product.metadata.limit),
        used: Number(product.metadata.limit),
        subscription: {
          id: sessionWithLineItems.subscription as string
        }
      }
    }

    // Update user app metadata in Auth 0
    await updateUserAppMetadata({ id: auth0_id, data: updatedUserAppMetadata })
  }

  return {
    body: `Subscription added to the user`
  }
})
