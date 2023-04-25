import { StackContext, Api, Config } from 'sst/constructs'

const AUTH0_DOMAIN = 'https://practicemed.uk.auth0.com'
export function API({ stack }: StackContext) {
  // HYGRAPH
  const HYGRAPH_TOKEN = new Config.Secret(stack, 'HYGRAPH_TOKEN')
  const HYGRAPH_ENDPOINT = new Config.Parameter(stack, 'HYGRAPH_ENDPOINT', {
    value:
      stack.stage === 'dev'
        ? 'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master'
        : 'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master'
  })

  // AUTH0
  const DOMAIN = new Config.Parameter(stack, 'DOMAIN', {
    value: AUTH0_DOMAIN
  })
  const AUTH0_CLIENT_ID = new Config.Parameter(stack, 'AUTH0_CLIENT_ID', {
    value:
      stack.stage === 'dev'
        ? '99gQVHl3gaeIuSoXJEfOZACGmjZmtEYa'
        : '99gQVHl3gaeIuSoXJEfOZACGmjZmtEYa'
  })
  const AUTH0_CLIENT_SECRET = new Config.Secret(stack, 'AUTH0_CLIENT_SECRET')

  // URL
  const FRONT_END_URL = new Config.Parameter(stack, 'FRONT_END_URL', {
    value:
      stack.stage === 'dev'
        ? 'http://localhost:5173'
        : 'https://practicemed.org'
  })

  // STRIPE
  const STRIPE_SECRET = new Config.Secret(stack, 'STRIPE_SECRET')

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
      'GET /plans/{id}/subscribe/free-trial': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.checkoutUrlWithFreeTrial`
      },
      'GET /billing/manage': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/user/index.billingLink`
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

  api.bind([
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    STRIPE_SECRET,
    FRONT_END_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET
  ])
  stack.addOutputs({
    ApiEndpoint: api.url
  })
}
