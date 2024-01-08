import { constructEvent } from '@mpt-sst/core/stripe'
import { ApiHandler } from 'sst/node/api'
import { Stripe } from 'stripe'
import {
  createSubscription,
  deleteSubscription
} from '@mpt-sst/core/webhooks/stripe'

export const handler = ApiHandler(async (_evt) => {
  const event = (JSON.parse(_evt.body || '') as unknown as Stripe.Event) || {}
  if (event.type == 'customer.subscription.created') {
    const subscription = event.data.object as Stripe.Subscription
    try {
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
  } else if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    try {
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
  } else if (event.type === 'customer.subscription.trial_will_end') {
    return {
      body: `User subscription trial will end soon!`
    }
  } else {
    return {
      body: `Unhandled event type: ${event.type}`
    }
  }
})
