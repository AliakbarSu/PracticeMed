import { ApiHandler } from 'sst/node/api'
import { getPlan } from '@mpt-sst/core/plans/index'
import {
  createCustomer,
  createSubscription,
  getCustomer,
  createCheckoutUrl
} from '@mpt-sst/core/stripe/index'
import { SubscribeEventPayload } from '@mpt-types/Plan'
import { getUser, updateUser } from '@mpt-sst/core/model/users'
import { StripeCustomer } from '@mpt-types/Stripe'
import { Stripe } from 'stripe'
import { User } from '@mpt-types/User'
import { ApiGatewayAuth } from '@mpt-types/System'
import { endpoints } from '../../../../resources/endpoints'

export const get_checkout_url = ApiHandler(async (_evt) => {
  const endpoint =
    process.env.stage == 'dev'
      ? `${endpoints.frontend.dev}`
      : `https://${process.env.stage}.${endpoints.domain}`
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const planId = _evt.pathParameters?.id || ''
  const user = await getUser(userId)
  // Getting the plan
  const product = await getPlan(planId)
  const customerId = user.plan.stripe_customer_id
  const checkoutUrl = await createCheckoutUrl({
    ...(customerId ? { customer: customerId } : { customer_email: user.email }),
    allow_promotion_codes: true,
    mode: 'subscription',
    metadata: {
      customer_id: userId,
      product_id: product.id,
      trial: 0
    },
    subscription_data: {
      metadata: {
        user_id: userId,
        trial: 0,
        plan_id: planId,
        stage: process.env.stage || ''
      }
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    success_url: `${endpoint}/dashboard?success=true&id=${planId}`,
    cancel_url: `${endpoint}/payment/failed?canceled=true&id=${planId}`
  })
  return {
    body: checkoutUrl.url || ''
  }
})

export const subscribeToFreeTrial = ApiHandler(async (_evt) => {
  const endpoint =
    process.env.stage == 'dev'
      ? `${endpoints.frontend.dev}`
      : `https://${process.env.stage}.${endpoints.domain}`
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const planId = _evt.pathParameters?.id || ''
  const user = await getUser(userId)
  // Getting the plan
  const product = await getPlan(planId)
  const customerId = user.plan.stripe_customer_id
  const checkoutUrl = await createCheckoutUrl({
    ...(customerId ? { customer: customerId } : { customer_email: user.email }),
    mode: 'subscription',
    allow_promotion_codes: true,
    metadata: {
      customer_id: userId,
      product_id: product.id,
      trial: 1
    },
    subscription_data: {
      trial_period_days: Number(product.metadata.free_trial_limit) || 7,
      metadata: {
        user_id: userId,
        trial: 1,
        plan_id: planId,
        stage: process.env.stage || ''
      }
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
    success_url: `${endpoint}/dashboard?success=true&id=${planId}&free_trial=true`,
    cancel_url: `${endpoint}/payment/failed?canceled=true&id=${planId}&free_trial=true`
  })
  return {
    body: checkoutUrl.url || ''
  }
})

// Creates a subscription from a token
// Note: This is not used in the app, but is here for reference
export const subscribe = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const planId = _evt.pathParameters?.id || ''
  const eventPayload: SubscribeEventPayload = JSON.parse(_evt.body || '{}')
  const user = await getUser(userId)

  // Create Stripe Customer

  let customer: StripeCustomer | Stripe.DeletedCustomer | undefined = undefined
  if (user.plan?.stripe_customer_id) {
    customer = await getCustomer(user.plan.stripe_customer_id)
  } else {
    customer = await createCustomer({
      auth0_id: userId,
      email: user.email,
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

  const updatedUserData: User = {
    ...user,
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
  await updateUser(user.userId, updatedUserData)

  return {
    body: 'Subscription created successfully'
  }
})
