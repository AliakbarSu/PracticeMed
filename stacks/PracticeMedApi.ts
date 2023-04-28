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
  const STRIPE_SIGNING_SECRET = new Config.Secret(
    stack,
    'STRIPE_SIGNING_SECRET'
  )

  // SENDGRID
  const SENDGRID_API_KEY = new Config.Secret(stack, 'SENDGRID_API_KEY')

  const fnPath = 'packages/functions/src'
  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        runtime: 'nodejs18.x'
      }
    },
    customDomain:
      stack.stage === 'dev' ? 'dev.practicemed.org' : 'api.practicemed.org',
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
      'GET /api/user/profile': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/user/index.profile`
      },
      'GET /api/user/reset-password': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/resetPassword/index.handler`
      },
      // PLANS
      'GET /api/plans': `${fnPath}/plans/index.handler`,
      'GET /api/plans/{id}': `${fnPath}/plans/index.getSinglePlan`,
      'GET /api/plans/{id}/subscribe': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.checkoutUrl`
      },
      'GET /api/plans/{id}/subscribe/free-trial': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.checkoutUrlWithFreeTrial`
      },
      'GET /api/billing/manage': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/user/index.billingLink`
      },
      'POST /api/plans/{id}/subscribe': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/plans/subscribe.handler`
      },
      // TESTS
      'GET /api/tests': `${fnPath}/listTests/index.handler`,
      'GET /api/tests/history': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/getTest/index.history`
      },
      'GET /api/tests/{id}': `${fnPath}/getTest/index.handler`,
      'GET /api/tests/{id}/{type}/load': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/loadTest/index.handler`
      },
      'POST /api/test/{id}/result': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/result/index.handler`
      },
      // WEBHOOKS
      'POST /api/webhooks/stripe': `${fnPath}/webhook/stripe.handler`,
      // New Letter
      'POST /api/newsletter/signup': `${fnPath}/newsletter/index.signup`,
      'POST /api/newsletter/unsubscribe': `${fnPath}/newsletter/index.unsubscribe`,
      // CONTACTS
      'POST /api/contact/message': `${fnPath}/contact/index.message`
    }
  })

  api.bind([
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    STRIPE_SECRET,
    FRONT_END_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    STRIPE_SIGNING_SECRET,
    SENDGRID_API_KEY
  ])
  stack.addOutputs({
    ApiDomain: api.customDomainUrl,
    ApiEndpoint: api.url
  })

  return {
    api
  }
}
