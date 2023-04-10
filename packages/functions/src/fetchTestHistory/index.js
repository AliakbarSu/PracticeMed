const mongoose = require('mongoose')
const DB_URL =
  'mongodb+srv://ali:3Vyuj*Tx3quYREn@cluster0.erkbv.mongodb.net/Users'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const stripeConfig = require('../layer/stripe-config')
const stripe = require('stripe')(stripeConfig.client_secret)

const { User } = require('./schemas/user.schema')

exports.handler = async (event) => {
  const userId = event.userId
  const userTests = await listUsersExpiredTests(userId)
  const tests = await listProducts()
  const testHistory = userTests.map((ts) => ({
    ...ts.toJSON(),
    ...tests.find((pts) => pts.id == ts.testType),
    results: JSON.parse(ts.results)
  }))
  const response = {
    statusCode: 200,
    body: JSON.stringify(testHistory)
  }
  return response
}

function listUsersExpiredTests(userId) {
  return new Promise(async (resolve, reject) => {
    User.findOne({ userId: userId }, function (err, data) {
      const expiredTests = data.tests.filter((ts) => ts.expired)
      resolve(expiredTests)
    })
  })
}

async function listProducts() {
  let products = await stripe.products.list({
    limit: 20
  })
  products = products.data
  return products.map((product) => {
    return {
      name: product.name,
      id: product.id,
      object: product.object,
      active: products.active,
      description: product.description,
      images: product.images,
      metadata: product.metadata,
      shippable: product.shippable,
      statement_descriptor: product.statement_descriptor,
      unit_label: product.unit_label,
      url: product.url
    }
  })
}
