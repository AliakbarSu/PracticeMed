import { StackContext, Api, Config } from 'sst/constructs'

export function API({ stack }: StackContext) {
  const fnPath = 'packages/functions/src'
  const api = new Api(stack, 'api', {
    routes: {
      // User
      'GET /user/profile': `${fnPath}/user/index.profile`,
      'GET /user/reset-password': `${fnPath}/resetPassword/index.handler`,
      // PLANS
      'GET /plans': `${fnPath}/plans/index.handler`,
      'GET /plans/{id}': `${fnPath}/plans/index.getSinglePlan`,
      'GET /plans/{id}/subscribe': `${fnPath}/plans/subscribe.checkoutUrl`,
      'POST /plans/{id}/subscribe': `${fnPath}/plans/subscribe.handler`,
      // TESTS
      'GET /tests': `${fnPath}/listTests/index.handler`,
      'GET /tests/history': `${fnPath}/getTest/index.history`,
      'GET /tests/{id}': `${fnPath}/getTest/index.handler`,
      'GET /tests/{id}/load': `${fnPath}/loadTest/index.handler`,
      'POST /test/{id}/result': `${fnPath}/result/index.handler`,
      // WEBHOOKS
      'POST /webhooks/stripe': `${fnPath}/webhook/stripe.handler`
    }
  })
  // STRIPE
  const STRIPE_KEY = new Config.Secret(stack, 'STRIPE_KEY')
  const STRIPE_ENDPOINT_SECRET = new Config.Secret(
    stack,
    'STRIPE_ENDPOINT_SECRET'
  )

  // HYGRAPH
  const HYGRAPH_TOKEN = new Config.Secret(stack, 'HYGRAPH_TOKEN')
  const HYGRAPH_ENDPOINT = new Config.Parameter(stack, 'HYGRAPH_ENDPOINT', {
    value:
      'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master'
  })

  // AUTH0
  const AUTH0_DOMAIN = new Config.Parameter(stack, 'AUTH0_DOMAIN', {
    value: 'https://practicemed.uk.auth0.com/api/v2'
  })
  const AUTH0_TOKEN = new Config.Secret(stack, 'AUTH0_TOKEN')
  const AUTH0_CLIENT_ID = new Config.Secret(stack, 'AUTH0_CLIENT_ID')

  // URL
  const FRONT_END_URL = new Config.Secret(stack, 'FRONT_END_URL')

  api.bind([
    STRIPE_KEY,
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    AUTH0_DOMAIN,
    AUTH0_TOKEN,
    STRIPE_ENDPOINT_SECRET,
    FRONT_END_URL,
    AUTH0_CLIENT_ID
  ])
  stack.addOutputs({
    ApiEndpoint: api.url
  })
}
