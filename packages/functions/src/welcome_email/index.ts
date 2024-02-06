import { ApiHandler } from 'sst/node/api'
import { sendWelcomeEmail } from '@mpt-sst/core/emails/index'

export const post_welcome_email = ApiHandler(async _evt => {
  const data = JSON.parse(_evt.body || '') as {
    email: string
    code: string
  }
  if (data.code !== 'FGQSG_f524245') {
    return {
      statusCode: 403,
      body: `Invalid code`,
    }
  }
  await sendWelcomeEmail(data.email)
  return {
    body: `Email was sent to the user`,
  }
})
