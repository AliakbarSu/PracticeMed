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
import { Config } from 'sst/node/config'
import { ApiGatewayAuth } from '@mpt-types/System'

export const checkoutUrl = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const planId = _evt.pathParameters?.id || ''
  const { email, app_metadata } = await getUser(userId)
  // Getting the plan
  const product = await getPlan(planId)
  const customerId = app_metadata.plan.stripe_customer_id
  const checkoutUrl = await createCheckoutUrl({
    ...(customerId ? { customer: customerId } : { customer_email: email }),
    mode: 'subscription',
    metadata: {
      customer_id: userId,
      product_id: product.id,
      trial: 0
    },
    subscription_data: {
      metadata: {
        user_id: userId
      }
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    success_url: `${Config.FRONT_END_URL}/dashboard?success=true`,
    cancel_url: `${Config.FRONT_END_URL}/payment/failed?canceled=true`
  })
  return {
    body: checkoutUrl.url || ''
  }
})

export const checkoutUrlWithFreeTrial = ApiHandler(async (_evt, c) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  // TODO: Update it with production product ID
  const stage = process.env?.SST_STAGE
  const planId = stage === 'dev' ? 'prod_NkElI8ETMlLhVb' : 'prod_NoMXS8DcAkl0xi'
  const { email, app_metadata } = await getUser(userId)
  // Getting the plan
  const product = await getPlan(planId)
  const customerId = app_metadata.plan.stripe_customer_id
  const checkoutUrl = await createCheckoutUrl({
    ...(customerId ? { customer: customerId } : { customer_email: email }),
    mode: 'subscription',
    metadata: {
      customer_id: userId,
      product_id: product.id,
      trial: 1
    },
    subscription_data: {
      trial_period_days: Number(product.metadata.free_trial_limit) || 3,
      metadata: {
        user_id: userId
      }
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    success_url: `${Config.FRONT_END_URL}/dashboard?success=true`,
    cancel_url: `${Config.FRONT_END_URL}/payment/failed?canceled=true`
  })
  return {
    body: checkoutUrl.url || ''
  }
})

// Creates a subscription from a token
// Note: This is not used in the app, but is here for reference
export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const planId = _evt.pathParameters?.id || ''
  const eventPayload: SubscribeEventPayload = JSON.parse(_evt.body || '{}')
  const {
    user_id: auth0_id = '',
    email = '',
    app_metadata
  } = await getUser(userId)
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
  const subscription = await createSubscription({
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
      used: Number(product.metadata.limit),
      subscription: {
        id: subscription.id,
        onTrial: false
      }
    }
  }

  // Update user app metadata in Auth 0
  await updateUserAppMetadata({ id: auth0_id, data: updatedUserAppMetadata })

  return {
    body: 'Subscription created successfully'
  }
})
