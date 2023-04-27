import { ApiHandler } from 'sst/node/api'
import { sendMessage } from '@mpt-sst/core/contact/index'

export const message = ApiHandler(async (_evt) => {
  const data = JSON.parse(_evt.body || '') as {
    firstName: string
    lastName: string
    email: string
    message: string
  }
  await sendMessage(data)
  return {
    body: `Your message was sent!`
  }
})
