import { getUser, updateUserAppMetadata } from '../auth0'
import { getPlan } from '../plans'
import { cancelSubscription } from '../stripe'
import { UserAppMetadata } from '../../types/User'
import { Stripe } from 'stripe'

export const createSubscription = async (subscription: Stripe.Subscription) => {
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
  return updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
}

export const deleteSubscription = async (subscription: Stripe.Subscription) => {
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
  return updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
}
