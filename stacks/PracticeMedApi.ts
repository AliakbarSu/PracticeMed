import { StackContext, Api, Cron, Queue } from 'sst/constructs'
import { endpoints } from '../resources/endpoints'
import { configure_parameters } from './Parameters'
import { dev } from '../resources/stages'
import { functions } from '../resources/functions'

export function API(context: StackContext) {
  const { stack } = context
  const stage = stack.stage
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
    SENDGRID_API_KEY,
    MONGODB_URI
  } = configure_parameters(context)

  const submit_answer_ddl = new Queue(stack, 'ddl', {
    consumer: functions.submit_answer_ddl
  })
  const submit_answer_queue = new Queue(stack, 'queue', {
    consumer: functions.submit_answer_queue,
    cdk: {
      queue: {
        deadLetterQueue: {
          queue: submit_answer_ddl.cdk.queue,
          maxReceiveCount: 1
        }
      }
    }
  })

  submit_answer_queue.bind([MONGODB_URI])

  const api = new Api(stack, 'api', {
    customDomain: {
      domainName: `${stage}.api.${endpoints.domain}`,
      hostedZone: endpoints.hosted_zone
    },
    defaults: {
      function: {
        runtime: 'nodejs18.x',
        timeout: 60,
        environment: {
          stage
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
        function: functions.profile
      },
      'GET /api/user/reset-password': {
        authorizer: 'auth0Authorizer',
        function: functions.reset_password
      },
      // PLANS
      'GET /api/plans': functions.get_plans,
      'GET /api/plans/{id}': functions.get_plan,
      'GET /api/plans/{id}/subscribe': {
        authorizer: 'auth0Authorizer',
        function: functions.get_checkout_url
      },
      'GET /api/plans/{id}/subscribe/free-trial': {
        authorizer: 'auth0Authorizer',
        function: functions.get_checkout_url_free_trial
      },
      'GET /api/billing/manage': {
        authorizer: 'auth0Authorizer',
        function: functions.get_billing_link
      },
      'POST /api/plans/{id}/subscribe': {
        authorizer: 'auth0Authorizer',
        function: functions.subscribe
      },
      // TESTS
      'GET /api/tests': {
        authorizer: 'auth0Authorizer',
        function: functions.get_tests
      },
      'GET /api/tests/history': {
        authorizer: 'auth0Authorizer',
        function: functions.get_test_history
      },
      'GET /api/tests/{id}': functions.get_single_test,
      'GET /api/tests/{id}/load': {
        authorizer: 'auth0Authorizer',
        function: functions.load_test
      },
      'GET /api/tests/demo': {
        function: functions.get_demo_test
      },
      'POST /api/test/{id}/result': {
        authorizer: 'auth0Authorizer',
        function: functions.get_test_result
      },
      'POST /api/test/{id}/submit': {
        authorizer: 'auth0Authorizer',
        function: {
          handler: functions.submit_answer,
          environment: {
            queue_url: submit_answer_queue.queueUrl
          },
          bind: [submit_answer_queue]
        }
      },
      // WEBHOOKS
      'POST /api/webhooks/stripe': functions.stripe_webhook,
      'POST /api/add-user-to-mongodb': functions.add_user_to_mongodb,
      // New Letter
      'POST /api/newsletter/signup': functions.newsletter_signup,
      'POST /api/newsletter/unsubscribe': functions.newsletter_unsubscribe,
      // CONTACTS
      'POST /api/contact/message': functions.contact_form,
      'POST /api/auth/welcome': functions.send_welcome_message,
      'GET /api/tests/{id}/personalised-tips': {
        authorizer: 'auth0Authorizer',
        function: functions.get_tips
      }
      // AUTOMATIONS
      // 'POST /api/daily-recalls': `${fnPath}/daily_recalls/index.send`
    }
  })

  const cronStack = new Cron(stack, 'Cron', {
    schedule: stage == dev ? 'rate(1 day)' : 'cron(0 17 * * ? *)',
    job: {
      function: {
        runtime: 'nodejs18.x',
        timeout: 60,
        environment: {
          stage
        },
        handler:
          stage == dev
            ? functions.send_daily_recalls
            : functions.send_daily_recalls
      }
    }
  })

  cronStack.bind([
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    SENDGRID_API_KEY,
    SANITY_ENDPOINT,
    MONGODB_URI
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
    SANITY_ENDPOINT,
    MONGODB_URI
  ])
  stack.addOutputs({
    api_domain: api.customDomainUrl,
    api_url: api.url
  })

  return {
    api,
    cron: cronStack,
    queue: submit_answer_queue
  }
}
