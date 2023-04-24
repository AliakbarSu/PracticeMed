import { Config } from 'sst/node/config'
import Stripe from 'stripe'
import { getUser } from '../auth0'
import { cancelSubscription as cancelSubscriptionStripe } from '../stripe/index'

export const getPlans = async () => {
  const stripe = new Stripe(Config.STRIPE_KEY, { apiVersion: '2022-11-15' })
  return (await stripe.products.list()).data
}

export const getPlan = async (planId: string) => {
  const stripe = new Stripe(Config.STRIPE_KEY, { apiVersion: '2022-11-15' })
  return await stripe.products.retrieve(planId)
}

export const cancelSubscription = async (userId: string) => {
  const user = await getUser(userId)
  return cancelSubscriptionStripe(user.app_metadata.plan.subscription.id)
}
