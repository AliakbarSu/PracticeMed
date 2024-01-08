import { getUser, updateUserAppMetadata } from '../auth0'
import { getPlan } from '../plans'
import { cancelSubscription } from '../stripe'
import { UserAppMetadata } from '../../types/User'
import { Stripe } from 'stripe'
import { sendSingleEmail } from '../emails/index'

const sendSubscriptionCancelEmail = async (email: string) => {
  const data = {
    from: {
      email: 'info@practicemed.org'
    },
    personalizations: [
      {
        to: [
          {
            email
          }
        ],
        dynamic_template_data: {}
      }
    ],
    template_id: 'd-3ab5bd256d494bf6a6849678b026999d' //sendgrid dynamic template id
  }
  return sendSingleEmail(data)
}

const sendSubscriptionStartedEmail = async (email: string) => {
  const data = {
    from: {
      email: 'info@practicemed.org'
    },
    personalizations: [
      {
        to: [
          {
            email
          }
        ],
        dynamic_template_data: {}
      }
    ],
    template_id: 'd-38f58172c77c4d848c4fe2e5c01f4ca3' //sendgrid dynamic template id
  }
  return sendSingleEmail(data)
}

export const createSubscription = async (subscription: Stripe.Subscription) => {
  const userId = subscription.metadata.user_id as string
  const { app_metadata, email = '' } = await getUser(userId)
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
  try {
    await sendSubscriptionStartedEmail(email)
  } finally {
    return updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
  }
}

export const deleteSubscription = async (subscription: Stripe.Subscription) => {
  const userId = subscription.metadata.user_id as string
  const { app_metadata, email = '' } = await getUser(userId)
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
  try {
    await sendSubscriptionCancelEmail(email)
  } finally {
    return updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
  }
}

export const updateSubscription = async (subscription: Stripe.Subscription) => {
  const userId = subscription.metadata.user_id as string
  const planId = subscription.metadata?.plan_id || ''
  const { app_metadata, email = '' } = await getUser(userId)
  let updatedUserAppMetadata: UserAppMetadata = app_metadata
  if (
    subscription.status === 'active' &&
    !subscription.cancellation_details?.reason
  ) {
    const trial = !!Number(subscription.metadata?.trial) || false
    const product = await getPlan(planId)
    updatedUserAppMetadata = {
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
  }

  // Update user app metadata in Auth 0
  try {
    await sendSubscriptionStartedEmail(email)
  } finally {
    return updateUserAppMetadata({ id: userId, data: updatedUserAppMetadata })
  }
}
