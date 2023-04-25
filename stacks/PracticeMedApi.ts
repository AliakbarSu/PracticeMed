import { StackContext, Api, Config } from 'sst/constructs'

const AUTH0_DOMAIN = 'https://practicemed.uk.auth0.com'
export function API({ stack }: StackContext) {
  // HYGRAPH
  const HYGRAPH_TOKEN = new Config.Secret(stack, 'HYGRAPH_TOKEN')
  const HYGRAPH_ENDPOINT = new Config.Parameter(stack, 'HYGRAPH_ENDPOINT', {
    value:
      'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master'
  })

  // AUTH0
  const DOMAIN = new Config.Parameter(stack, 'DOMAIN', {
    value: AUTH0_DOMAIN
  })
  const AUTH0_CLIENT_ID = new Config.Secret(stack, 'AUTH0_CLIENT_ID')
  const AUTH0_CLIENT_SECRET = new Config.Secret(stack, 'AUTH0_CLIENT_SECRET')

  // URL
  const FRONT_END_URL = new Config.Secret(stack, 'FRONT_END_URL')

  const fnPath = 'packages/functions/src'
  const api = new Api(stack, 'api', {
    authorizers: {
      auth0Authorizer: {
        type: 'jwt',
        jwt: {
          issuer: `${AUTH0_DOMAIN}/`,
          audience: ['https://jwt-token-authorizer.com']
        }
      }
    },
    routes: {
      // User
      'GET /user/profile': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/user/index.profile`
      },
      'GET /user/reset-password': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/resetPassword/index.handler`
      },
      // PLANS
      'GET /plans': `${fnPath}/plans/index.handler`,
      'GET /plans/{id}': `${fnPath}/plans/index.getSinglePlan`,
      'GET /plans/{id}/subscribe': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.checkoutUrl`
      },
      'POST /plans/{id}/cancel': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.cancel`
      },
      'POST /plans/{id}/subscribe': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.handler`
      },
      // TESTS
      'GET /tests': `${fnPath}/listTests/index.handler`,
      'GET /tests/history': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/getTest/index.history`
      },
      'GET /tests/{id}': `${fnPath}/getTest/index.handler`,
      'GET /tests/{id}/load': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/loadTest/index.handler`
      },
      'POST /test/{id}/result': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/result/index.handler`
      },
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

  api.bind([
    STRIPE_KEY,
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    STRIPE_ENDPOINT_SECRET,
    FRONT_END_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET
  ])
  stack.addOutputs({
    ApiEndpoint: api.url
  })
}
