import sgMailClient from '@sendgrid/client'
import { Config } from 'sst/node/config'
sgMailClient.setApiKey(Config.SENDGRID_API_KEY)

export const sendSingleEmail = async (data: any) => {
  const request = {
    url: `/v3/mail/send`,
    method: 'POST' as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
    },
    body: data
  }

  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject)
  })
}
