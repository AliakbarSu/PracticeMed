import sgMail from '@sendgrid/mail'
import { Config } from 'sst/node/config'
sgMail.setApiKey(Config.SENDGRID_API_KEY)

export const sendMessage = (data: {
  firstName: string
  lastName: string
  email: string
  message: string
}) => {
  const message = {
    from: {
      email: 'aliakbar.su@gmail.com',
      name: `${data.firstName} ${data.lastName}`
    },
    to: 'hello@alisultani.com',
    subject: `Message From Contact Form: ${data.email}}`,
    text: data.message
  }

  return new Promise((resolve, reject) => {
    sgMail.send(message).then(resolve).catch(reject)
  })
}
