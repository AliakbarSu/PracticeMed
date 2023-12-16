import { StackContext, Api, Cron } from 'sst/constructs'
import { endpoints } from '../resources/endpoints'
import { configure_parameters } from './Parameters'
import { dev } from '../resources/stages'

export function API(context: StackContext) {
  const { stack } = context
  const {
    HYGRAPH_TOKEN,
    HYGRAPH_ENDPOINT,
    SANITY_ENDPOINT,
    DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    FRONT_END_URL,
    STRIPE_SECRET,
    STRIPE_SIGNING_SECRET,
    SENDGRID_API_KEY
  } = configure_parameters(context)

  const fnPath = 'packages/functions/src'
  const api = new Api(stack, 'api', {
    customDomain: {
      domainName:
        stack.stage == dev
          ? endpoints.custom_domains.api.dev
          : endpoints.custom_domains.api.prod,
      hostedZone: endpoints.hosted_zone
    },
    defaults: {
      function: {
        runtime: 'nodejs18.x',
        timeout: 60,
        environment: {
          stage: stack.stage
        }
      }
    },
    authorizers: {
      auth0Authorizer: {
        type: 'jwt',
        jwt: {
          issuer: `${endpoints.auth0_domain.dev}/`,
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
        function: `${fnPath}/reset_password/index.handler`
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
      'GET /api/tests': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/list_tests/index.handler`
      },
      'GET /api/tests/history': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/get_test/index.history`
      },
      'GET /api/tests/{id}': `${fnPath}/get_test/index.handler`,
      'GET /api/tests/{id}/load': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/load_test/index.handler`
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
      'POST /api/contact/message': `${fnPath}/contact/index.message`,
      'POST /api/auth/welcome': `${fnPath}/welcome_email/index.message`,
      'GET /api/tests/{id}/personalised-tips': {
        authorizer: 'auth0Authorizer',
        function: `${fnPath}/personalised_tips/index.handler`
      }
      // AUTOMATIONS
      // 'POST /api/daily-recalls': `${fnPath}/daily_recalls/index.send`
    }
  })

  const cronStack = new Cron(stack, 'Cron', {
    schedule: stack.stage === 'dev' ? 'rate(1 day)' : 'cron(0 17 * * ? *)',
    job: {
      function: {
        runtime: 'nodejs18.x',
        timeout: 60,
        environment: {
          stage: stack.stage
        },
        handler:
          stack.stage === dev
            ? `${fnPath}/daily_recalls/index.empty`
            : `${fnPath}/daily_recalls/index.empty`
      }
    }
  })

  cronStack.bind([
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    SENDGRID_API_KEY,
    SANITY_ENDPOINT
  ])

  api.bind([
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    STRIPE_SECRET,
    FRONT_END_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    STRIPE_SIGNING_SECRET,
    SENDGRID_API_KEY,
    SANITY_ENDPOINT
  ])
  stack.addOutputs({
    ApiDomain: api.customDomainUrl,
    ApiEndpoint: api.url
  })

  return {
    api,
    cron: cronStack
  }
}
