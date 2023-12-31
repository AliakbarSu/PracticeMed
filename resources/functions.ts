const fnPath = 'packages/functions/src'
export const functions = {
  profile: `${fnPath}/user/index.profile`,
  reset_password: `${fnPath}/reset_password/index.handler`,
  get_plans: `${fnPath}/plans/index.handler`,
  get_plan: `${fnPath}/plans/index.getSinglePlan`,
  get_checkout_url: `${fnPath}/plans/subscribe.checkoutUrl`,
  get_checkout_url_free_trial: `${fnPath}/plans/subscribe.checkoutUrlWithFreeTrial`,
  get_billing_link: `${fnPath}/user/index.billingLink`,
  subscribe: `${fnPath}/plans/subscribe.handler`,
  get_tests: `${fnPath}/list_tests/index.handler`,
  get_single_test: `${fnPath}/get_test/index.handler`,
  get_test_history: `${fnPath}/get_test/index.history`,
  load_test: `${fnPath}/load_test/index.handler`,
  get_demo_test: `${fnPath}/load_test/index.demoTestHandler`,
  get_test_result: `${fnPath}/result/index.handler`,
  stripe_webhook: `${fnPath}/webhook/stripe.handler`,
  newsletter_signup: `${fnPath}/newsletter/index.signup`,
  newsletter_unsubscribe: `${fnPath}/newsletter/index.unsubscribe`,
  get_tips: `${fnPath}/personalised_tips/index.handler`,
  send_welcome_message: `${fnPath}/welcome_email/index.message`,
  contact_form: `${fnPath}/contact/index.message`,
  send_daily_recalls: `${fnPath}/daily_recalls/index.empty`
}
