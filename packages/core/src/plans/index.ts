import { Config } from 'sst/node/config'
import Stripe from 'stripe'

export const getPlans = async () => {
  const stripe = new Stripe(Config.STRIPE_KEY, { apiVersion: '2022-11-15' })
  return (await stripe.products.list()).data
}
