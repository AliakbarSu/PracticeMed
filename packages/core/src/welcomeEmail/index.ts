import sgMailClient from '@sendgrid/client'
import { Config } from 'sst/node/config'
sgMailClient.setApiKey(Config.SENDGRID_API_KEY)

export const sendWelcomeEmail = async (email: string) => {
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
    template_id: 'd-b88f14175b2c4b39931e5d4d91540169' //sendgrid dynamic template id
  }
  const request = {
    url: `/v3/mail/send`,
    method: 'POST' as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
    },
    body: data
  }
  try {
    await signupToPlatformUsers(email)
  } catch {
    console.log('Error while signing up to platform users')
  }
  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject)
  })
}

const signupToPlatformUsers = (email: string) => {
  const data = {
    list_ids: ['108d449c-dae1-43aa-8694-7abcbbcfd74f'], // Platform Users id
    contacts: [
      {
        email
      }
    ]
  }

  const request = {
    url: `/v3/marketing/contacts`,
    method: 'PUT' as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
    },
    body: data
  }
  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject)
  })
}
