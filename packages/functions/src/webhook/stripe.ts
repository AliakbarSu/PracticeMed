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

  if (event.type == 'customer.subscription.created') {
    const subscription = event.data.object as Stripe.Subscription
    const userId = subscription.metadata.user_id as string
    const { app_metadata } = await getUser(userId)
    if (
      app_metadata.plan.subscription.id &&
      app_metadata.plan.subscription.id !== subscription.id
    ) {
      await cancelSubscription(app_metadata.plan.subscription.id)
    }

    const trial = !!Number(subscription.metadata?.trial) || false
    const planId = subscription.metadata?.plan_id || ''
    // Getting the plan
    const product = await getPlan(planId)
    const updatedUserAppMetadata: UserAppMetadata = {
      ...app_metadata,
      plan: {
        id: product.id,
        stripe_customer_id: (subscription.customer as string) || '',
        name: product.name,
        limit: Number(product.metadata.limit),
        used: 0,
        subscription: {
          id: subscription.id as string,
          onTrial: trial
        }
      }
    }
    // Update user app metadata in Auth 0
    await updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
    return {
      body: `User subscription created!`
    }
  } else if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const userId = subscription.metadata.user_id as string
    const { app_metadata } = await getUser(userId)
    if (app_metadata.plan.subscription.id !== subscription.id) {
      return {
        body: `Subscription is already removed from the user metadata`
      }
    }
    const updatedUserAppMetadata: UserAppMetadata = {
      ...app_metadata,
      plan: {
        id: null as unknown as string,
        stripe_customer_id: app_metadata.plan.stripe_customer_id,
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
