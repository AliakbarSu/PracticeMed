const stripeConfig = require('../layer/stripe-config')
const stripe = require('stripe')(stripeConfig.client_secret)

exports.handler = async (event) => {
  // TODO implement
  return createStripeSession(event).then((url) => {
    const response = {
      statusCode: 200,
      body: url
    }
    return response
  })
}

async function createStripeSession(data) {
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
    success_url: `http://localhost:8080/#/test`,
    cancel_url: `http://localhost:8080/#/`,
    metadata: {
      userId: data.userId
    }
  })
  return session.url
}

function getProductPrice(productId) {
  return new Promise(async (resolve) => {
    const prices = await stripe.prices.list()
    resolve(prices.data.filter((pr) => pr.id == productId))
  })
}
