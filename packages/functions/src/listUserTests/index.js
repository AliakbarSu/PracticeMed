const stripeConfig = require('../layer/stripe-config')
const stripe = require('stripe')(stripeConfig.client_secret)

const mongoose = require('mongoose')
const DB_URL =
  'mongodb+srv://ali:3Vyuj*Tx3quYREn@cluster0.erkbv.mongodb.net/Users'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const { User } = require('./schemas/user.schema')

exports.handler = async (event) => {
  return new Promise(async (resolve, reject) => {
    const userTests = await listUsersActiveTests(event.userId)
    const products = await listProducts()

    const userActiveTests = userTests.map((ts) => {
      return { ...ts.toJSON(), ...products.find((pd) => pd.id == ts.testType) }
    })
    const response = {
      statusCode: 200,
      body: JSON.stringify(userActiveTests)
    }
    resolve(response)
  })
}

function listUsersActiveTests(userId) {
  return new Promise(async (resolve, reject) => {
    User.findOne({ userId: userId }, function (err, data) {
      resolve(data.tests.filter((ts) => !ts.expired))
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
