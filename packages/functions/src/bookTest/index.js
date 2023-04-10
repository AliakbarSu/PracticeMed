const stripeConfig = require('../layer/stripe-config')
const stripe = require('stripe')(stripeConfig.client_secret)
const mongoose = require('mongoose')
const DB_URL =
  'mongodb+srv://ali:3Vyuj*Tx3quYREn@cluster0.erkbv.mongodb.net/Users'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const { User } = require('./schemas/user.schema')

// Handler
module.exports.handler = async function (event, context) {
  const data = event.data.object
  const userEamil = data.customer_email
  const sessionId = data.id
  const userId = data.metadata.userId.split('|')[1]

  const testId = await getProduct(sessionId)

  return new Promise(async (resolve) => {
    const newTest = {
      testType: testId,
      expired: false,
      results: ''
    }
    User.updateOne(
      { userId: userId },
      { $push: { tests: newTest } },
      function (err, res) {
        if (err) return resolve(err)
        const response = {
          statusCode: 200,
          body: 'testing'
        }
        resolve(response)
      }
    )
  })
}

function getProduct(sessionId) {
  return new Promise((resolve, reject) => {
    stripe.checkout.sessions.listLineItems(
      sessionId,
      function (err, lineItems) {
        if (err) {
          reject(err)
        } else {
          resolve(lineItems.data[0].price.product)
        }
      }
    )
  })
}
