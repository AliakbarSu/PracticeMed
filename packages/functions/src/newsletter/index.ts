import { ApiHandler } from 'sst/node/api'
import {
  signupToNewletter,
  unsubscribeFromNewsletter
} from '@mpt-sst/core/newsletter/index'

export const signup = ApiHandler(async (_evt) => {
  const email = (JSON.parse(_evt.body || '') as unknown as { email: string })
    .email
  if (email.length) {
    try {
      await signupToNewletter(email)
    } catch (err: any) {
      console.log(err.response.body)
    }
  }
  return {
    body: `Thanks for signing up to our newletter.`
  }
})

export const unsubscribe = ApiHandler(async (_evt) => {
  const email = (JSON.parse(_evt.body || '') as unknown as { email: string })
    .email
  if (email.length) {
    try {
      await unsubscribeFromNewsletter(email)
    } catch (err: any) {
      console.log(err.response.body)
    }
  }
  return {
    body: `Thanks for being part of our newletter.`
  }
})
