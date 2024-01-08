import { constructEvent } from '@mpt-sst/core/stripe'
import { ApiHandler } from 'sst/node/api'
import { Stripe } from 'stripe'
import {
  createSubscription,
  deleteSubscription,
  updateSubscription
} from '@mpt-sst/core/webhooks/stripe'

export const handler = ApiHandler(async (_evt) => {
  const event = (JSON.parse(_evt.body || '') as unknown as Stripe.Event) || {}
  const stage = process.env.stage
  const subscriptionStage =
    (event.data.object as Stripe.Subscription).metadata?.stage || ''
  if (stage !== subscriptionStage) {
    console.warn(
      `Subscription stage doesn't match the current stage. current: ${stage}, subscription: ${subscriptionStage}`
    )
    return {
      body: `Subscription stage doesn't match the current stage`
    }
  }
  switch (event.type) {
    case 'customer.subscription.created':
      try {
        const subscription = event.data.object as Stripe.Subscription
        await createSubscription(subscription)
      } catch (err: any) {
        console.log(err)
        return {
          body: `Error creating subscription`,
          statusCode: 500
        }
      }
      return {
        body: `User subscription created successfully!`
      }
    case 'customer.subscription.updated':
      // try {
      //   const subscription = event.data.object as Stripe.Subscription
      //   await updateSubscription(subscription)
      // } catch (err) {
      //   console.log(err)
      //   return {
      //     body: `Error updating subscription`,
      //     statusCode: 500
      //   }
      // }
      return {
        body: `User subscription updated successfully!`
      }
    case 'customer.subscription.deleted':
      try {
        const subscription = event.data.object as Stripe.Subscription
        await deleteSubscription(subscription)
      } catch (err) {
        console.log(err)
        return {
          body: `Error deleting subscription`,
          statusCode: 500
        }
      }
      return {
        body: `User subscription canceled successfully!`
      }
    case 'customer.subscription.trial_will_end':
      return {
        body: `User subscription trial will end soon!`
      }
    default:
      return {
        body: `Unhandled event type: ${event.type}`
      }
  }
})
