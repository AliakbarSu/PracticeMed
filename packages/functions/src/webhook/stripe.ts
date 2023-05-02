import { getUser, updateUserAppMetadata } from '@mpt-sst/core/auth0'
import { getPlan } from '@mpt-sst/core/plans'
import {
  constructEvent,
  retrieveSession,
  cancelSubscription
} from '@mpt-sst/core/stripe'
import { UserAppMetadata } from '@mpt-types/User'
import { ApiHandler } from 'sst/node/api'
import { Stripe } from 'stripe'

export const handler = ApiHandler(async (_evt) => {
  const payload = _evt.body || ''
  const sig = _evt.headers['stripe-signature'] || ''
  const event = constructEvent({ payload, sig })
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const sessionWithLineItems = await retrieveSession(session.id, {})
    const planId = sessionWithLineItems.metadata?.product_id || ''
    const auth0_id = sessionWithLineItems.metadata?.customer_id || ''
    const trial = !!sessionWithLineItems.metadata?.trial || false
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
        used: 0,
        subscription: {
          id: sessionWithLineItems.subscription as string,
          onTrial: trial
        }
      }
    }

    // Update user app metadata in Auth 0
    await updateUserAppMetadata({ id: auth0_id, data: updatedUserAppMetadata })
    // cancel previous subscription is exists
    if (
      app_metadata.plan.subscription.id !== sessionWithLineItems.subscription
    ) {
      await cancelSubscription(app_metadata.plan.subscription.id)
    }
    return {
      body: `Subscription added to the user`
    }
  } else if (event.type === 'customer.subscription.deleted') {
    const session = event.data.object as Stripe.Subscription
    const userId = session.metadata.user_id as string
    const { app_metadata } = await getUser(userId)
    const updatedUserAppMetadata: UserAppMetadata = {
      ...app_metadata,
      plan: {
        id: null as unknown as string,
        stripe_customer_id: null as unknown as string,
        name: null as unknown as string,
        limit: 0,
        used: 0,
        subscription: {
          id: null as unknown as string,
          onTrial: false
        }
      }
    }
    // Update user app metadata in Auth 0
    await updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
    return {
      body: `User subscription canceled`
    }
  } else {
    return {
      body: `Unhandled event type: ${event.type}`
    }
  }
})
