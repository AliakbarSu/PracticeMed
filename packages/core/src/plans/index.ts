import { Config } from 'sst/node/config'
import Stripe from 'stripe'

export const getPlans = async () => {
  const stripe = new Stripe(Config.STRIPE_SECRET, { apiVersion: '2022-11-15' })
  return (await stripe.products.list()).data
}

export const getPlan = async (planId: string) => {
  const stripe = new Stripe(Config.STRIPE_SECRET, { apiVersion: '2022-11-15' })
  return await stripe.products.retrieve(planId)
}
