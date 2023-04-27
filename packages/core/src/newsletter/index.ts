import sgMailClient from '@sendgrid/client'
import { Config } from 'sst/node/config'
sgMailClient.setApiKey(Config.SENDGRID_API_KEY)

export const signupToNewletter = (email: string) => {
  const data = {
    list_ids: ['bfc92657-2adb-4907-9456-369f32876665'], // Newsletter id
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

export const unsubscribeFromNewsletter = async (email: string) => {
  const contacts = await getContactByEmail(email)
  const request = {
    url: `/v3/marketing/contacts?ids=${contacts[0].body.result[email].contact.id}`,
    method: 'DELETE' as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
    }
  }
  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject)
  })
}

const getContactByEmail = async (email: string) => {
  const request = {
    url: `/v3/marketing/contacts/search/emails`,
    method: 'POST' as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
    },
    body: {
      emails: [email]
    }
  }
  return new Promise((resolve: any, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject)
  }) as Promise<
    {
      body: {
        result: {
          [key: string]: {
            contact: {
              id: string
            }
          }
        }
      }
    }[]
  >
}
