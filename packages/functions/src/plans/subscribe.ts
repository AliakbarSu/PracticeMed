import { ApiHandler } from 'sst/node/api'
import { getPlan } from '@mpt-sst/core/plans/index'
import {
  createCustomer,
  createSubscription,
  getCustomer,
  createCheckoutUrl
} from '@mpt-sst/core/stripe/index'
import { SubscribeEventPayload } from '@mpt-types/Plan'
import { getUser, updateUserAppMetadata } from '@mpt-sst/core/auth0'
import { StripeCustomer } from '@mpt-types/Stripe'
import { Stripe } from 'stripe'
import { UserAppMetadata } from '@mpt-types/User'

export const checkoutUrl = ApiHandler(async (_evt) => {
  const planId = _evt.pathParameters?.id || ''
  // TODO: Get actual user id
  const { email } = await getUser('auth0|64409c95c3a961d278445467')
  // Getting the plan
  const product = await getPlan(planId)
  const checkoutUrl = await createCheckoutUrl({
    customer_email: email,
    mode: 'subscription',
    metadata: {
      customer_id: 'auth0|64409c95c3a961d278445467',
      product_id: product.id
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    success_url: `http://localhost:5173/dashboard?success=true`,
    cancel_url: `http://localhost:5173/payment/failed?canceled=true`
  })
  return {
    body: checkoutUrl.url || ''
  }
})

// Creates a subscription from a token
// Note: This is not used in the app, but is here for reference
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
    body: 'Subscription created successfully'
  }
})
