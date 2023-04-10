import { ApiHandler } from 'sst/node/api'

const stripeConfig = require('../layer/stripe-config')
const stripe = require('stripe')(stripeConfig.client_secret)

export const handler = ApiHandler(async (event) => {
  // TODO implement
  return createStripeSession(
    event.body as { productId: string; userEmail: string }
  ).then((url) => {
    const response = {
      statusCode: 200,
      body: url
    }
    return response
  })
})

async function createStripeSession(data: {
  productId: string
  userEmail: string
  userId: string
}) {
  const productId = data.productId

  const testPrice = await getProductPrice(productId)
  console.log(testPrice, productId)

  const session = await stripe.checkout.sessions.create({
    customer_email: data.userEmail,
    payment_method_types: ['card'],
    line_items: [
      {
        price: testPrice.id,
        quantity: 1
      }
    ],
    mode: 'payment',
    allow_promotion_codes: true,
    success_url: `https://www.mle-prep-tests.org/confirmation`,
    cancel_url: `https://www.mle-prep-tests.org/unsuccessful`,
    metadata: {
      userId: data.userId
    }
  })
  return session.url
}

function getProductPrice(productId) {
  return new Promise(async (resolve) => {
    const prices = await stripe.prices.list()
    resolve(prices.data.find((pr) => pr.product == productId))
  })
}
