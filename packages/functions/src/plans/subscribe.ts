import { ApiHandler } from 'sst/node/api'
import { getPlan } from '@mpt-sst/core/plans/index'
import {
  createCustomer,
  createSubscription,
  getCustomer
} from '@mpt-sst/core/stripe/index'
import { SubscribeEventPayload } from '@mpt-types/Plan'
import { getUser, updateUserAppMetadata } from '@mpt-sst/core/auth0'
import { StripeCustomer } from '@mpt-types/Stripe'
import { Stripe } from 'stripe'
import { UserAppMetadata } from '@mpt-types/User'

export const handler = ApiHandler(async (_evt) => {
  const planId = _evt.pathParameters?.id || ''
  const eventPayload: SubscribeEventPayload = JSON.parse(_evt.body || '{}')
  // TODO: Get actual user id
  const {
    user_id: auth0_id = '',
    email = '',
    app_metadata
  } = await getUser('auth0|64409c95c3a961d278445467')
  const { plan } = app_metadata || {}

  // Create Stripe Customer

  let customer: StripeCustomer | Stripe.DeletedCustomer | undefined = undefined
  if (plan?.stripe_customer_id) {
    customer = await getCustomer(plan.stripe_customer_id)
  } else {
    customer = await createCustomer({
      auth0_id,
      email,
      source: eventPayload.token
    })
  }

  // Getting the plan
  const product = await getPlan(planId)

  // Create Stripe Subscription
  await createSubscription({
    items: [{ price: product.default_price as string }],
    customer: customer.id
  })

  const updatedUserAppMetadata: UserAppMetadata = {
    ...app_metadata,
    plan: {
      id: product.id,
      stripe_customer_id: customer.id,
      name: product.name,
      limit: Number(product.metadata.limit),
      used: Number(product.metadata.limit)
    }
  }

  // Update user app metadata in Auth 0
  await updateUserAppMetadata({ id: auth0_id, data: updatedUserAppMetadata })

  return {
    body: 'Subscription Created Successfully'
  }
})
