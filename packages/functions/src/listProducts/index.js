const stripeConfig = require('../layer/stripe-config')
const stripe = require('stripe')(stripeConfig.client_secret)

exports.handler = async (event) => {
  // TODO implement
  return listProducts().then((products) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(products)
    }
    return response
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
