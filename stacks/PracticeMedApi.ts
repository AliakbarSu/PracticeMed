import { Api, Cron, Queue, StackContext } from "sst/constructs";
import { endpoints } from "../resources/endpoints";
import { configure_parameters } from "./Parameters";
import { dev } from "../resources/stages";
import { functions } from "../resources/functions";

export function API(context: StackContext) {
  const { stack } = context;
  const stage = stack.stage;
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
    MONGODB_URI,
    CHAT_GPT_API_KEY,
    API_FLASH_KEY,
  } = configure_parameters(context);

  const submit_answer_ddl = new Queue(stack, "ddl", {
    consumer: functions.submit_answer_ddl,
  });
  const submit_answer_queue = new Queue(stack, "queue", {
    consumer: functions.submit_answer_queue,
    cdk: {
      queue: {
        deadLetterQueue: {
          queue: submit_answer_ddl.cdk.queue,
          maxReceiveCount: 1,
        },
      },
    },
  });

  submit_answer_queue.bind([MONGODB_URI]);

  const api = new Api(stack, "api", {
    customDomain: {
      domainName: `${stage}.api.${endpoints.domain}`,
      hostedZone: endpoints.hosted_zone,
    },
    defaults: {
      function: {
        runtime: "nodejs18.x",
        timeout: 60,
        environment: {
          stage,
        },
      },
    },
    authorizers: {
      auth0Authorizer: {
        type: "jwt",
        jwt: {
          issuer: `${endpoints.auth0_domain.dev}/`,
          audience: ["https://jwt-token-authorizer.com"],
        },
      },
    },
    routes: {
      // User
      "GET /api/user/profile": {
        authorizer: "auth0Authorizer",
        function: functions.get_profile,
      },
      "GET /api/user/reset-password": {
        authorizer: "auth0Authorizer",
        function: functions.get_reset_password_link,
      },
      // PLANS
      "GET /api/plans": functions.get_plans,
      "GET /api/plans/{id}": functions.get_plan,
      "GET /api/plans/{id}/subscribe": {
        authorizer: "auth0Authorizer",
        function: functions.get_checkout_url,
      },
      "GET /api/plans/{id}/subscribe/free-trial": {
        authorizer: "auth0Authorizer",
        function: functions.get_checkout_url_free_trial,
      },
      "GET /api/billing/manage": {
        authorizer: "auth0Authorizer",
        function: functions.get_billing_link,
      },
      "POST /api/plans/{id}/subscribe": {
        authorizer: "auth0Authorizer",
        function: functions.post_subscribe,
      },
      // ADMIN
      "GET /api/admin/users": {
        authorizer: "auth0Authorizer",
        function: functions.admin_get_users,
      },
      "GET /api/admin/questions": {
        authorizer: "auth0Authorizer",
        function: functions.admin_get_questions,
      },
      "POST /api/admin/add-question": {
        authorizer: "auth0Authorizer",
        function: functions.admin_add_question,
      },
      "PUT /api/admin/update-question": {
        authorizer: "auth0Authorizer",
        function: functions.admin_update_question,
      },
      "DELETE /api/admin/delete-question/{id}": {
        authorizer: "auth0Authorizer",
        function: functions.admin_delete_question,
      },
      // TESTS
      "GET /api/tests": {
        authorizer: "auth0Authorizer",
        function: functions.get_tests,
      },
      "GET /api/tests/history": {
        authorizer: "auth0Authorizer",
        function: functions.get_test_history,
      },
      "GET /api/tests/{id}": functions.get_test,
      "GET /api/tests/{id}/load": {
        authorizer: "auth0Authorizer",
        function: functions.get_load_test,
      },
      "GET /api/tests/demo": {
        function: functions.get_load_demo_test,
      },
      "POST /api/test/{id}/result": {
        authorizer: "auth0Authorizer",
        function: functions.get_test_result,
      },
      "POST /api/test/{id}/submit": {
        authorizer: "auth0Authorizer",
        function: {
          handler: functions.post_answer,
          environment: {
            queue_url: submit_answer_queue.queueUrl,
          },
          bind: [submit_answer_queue],
        },
      },
      // QUESTIONS
      "GET /api/questions/{id}": functions.get_question,
      // WEBHOOKS
      "POST /api/webhooks/stripe": functions.post_stripe_webhook,
      "POST /api/add-user-to-mongodb": functions.post_add_user,
      // New Letter
      "POST /api/newsletter/signup": functions.post_newsletter_subscribe,
      "POST /api/newsletter/unsubscribe": functions.post_newsletter_unsubscribe,
      // CONTACTS
      "POST /api/contact/message": functions.post_contact_form,
      "POST /api/auth/welcome": functions.post_welcome_email,
      "GET /api/tests/{id}/personalised-tips": {
        authorizer: "auth0Authorizer",
        function: functions.get_tips,
      },
      // STUDY PARTNERS
      "POST /api/study-partners": functions.add_study_partner,
      // AUTOMATIONS
      // 'POST /api/daily-recalls': `${fnPath}/daily_recalls/index.send`
    },
  });

  const cronStack = new Cron(stack, "Cron", {
    schedule: stage == dev ? "rate(1 day)" : "cron(0 17 * * ? *)",
    job: {
      function: {
        runtime: "nodejs18.x",
        timeout: 60,
        environment: {
          stage,
        },
        handler:
          stage == dev
            ? functions.post_daily_recalls
            : functions.post_daily_recalls,
      },
    },
  });

  cronStack.bind([
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    DOMAIN,
    SENDGRID_API_KEY,
    SANITY_ENDPOINT,
    MONGODB_URI,
  ]);

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
    MONGODB_URI,
    CHAT_GPT_API_KEY,
    API_FLASH_KEY,
  ]);
  stack.addOutputs({
    api_domain: api.customDomainUrl,
    api_url: api.url,
  });

  return {
    api,
    cron: cronStack,
    queue: submit_answer_queue,
    HYGRAPH_TOKEN,
    HYGRAPH_ENDPOINT,
    API_FLASH_KEY,
  };
}
