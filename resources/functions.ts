const fnPath = "packages/functions/src";
export const functions = {
  get_profile: `${fnPath}/profile/index.get_profile`,
  get_reset_password_link: `${fnPath}/reset_password/index.get_reset_password_link`,
  get_plans: `${fnPath}/plans/index.get_plans`,
  get_plan: `${fnPath}/plans/index.get_plan`,
  get_checkout_url: `${fnPath}/subscription/index.get_checkout_url`,
  get_checkout_url_free_trial: `${fnPath}/subscription/index.subscribeToFreeTrial`,
  get_billing_link: `${fnPath}/user/index.billingLink`,
  post_subscribe: `${fnPath}/subscription/index.subscribe`,
  get_tests: `${fnPath}/tests/index.get_tests`,
  get_test: `${fnPath}/tests/index.get_test`,
  get_test_history: `${fnPath}/tests/index.get_test_history`,
  get_load_test: `${fnPath}/load_test/index.handler`,
  get_load_demo_test: `${fnPath}/load_test/index.demoTestHandler`,
  get_test_result: `${fnPath}/result/index.get_test_result`,
  post_stripe_webhook: `${fnPath}/webhooks/stripe.handler`,
  post_newsletter_subscribe: `${fnPath}/newsletter/index.subscribe`,
  post_newsletter_unsubscribe: `${fnPath}/newsletter/index.unsubscribe`,
  get_tips: `${fnPath}/personalised_tips/index.get_tips`,
  post_welcome_email: `${fnPath}/welcome_email/index.post_welcome_email`,
  post_contact_form: `${fnPath}/contact_form/index.post_contact_form`,
  post_daily_recalls: `${fnPath}/daily_recalls/index.empty`,
  post_answer: `${fnPath}/submit_answer/index.post_answer`,
  get_question: `${fnPath}/question/index.get_question`,
  submit_answer_queue: `${fnPath}/submit_answer_queue/index.handler`,
  submit_answer_ddl: `${fnPath}/submit_answer_queue/index.dd_handler`,
  post_add_user: `${fnPath}/user/index.add_user`,
  admin_get_users: `${fnPath}/admin/index.get_users`,
  admin_get_questions: `${fnPath}/admin/index.get_questions`,
  admin_add_question: `${fnPath}/admin/index.add_question`,
  admin_update_question: `${fnPath}/admin/index.update_question`,
  admin_delete_question: `${fnPath}/admin/index.delete_question`,
  paid_media_get_video_url: `${fnPath}/paid_media/index.get_video_url`,
  add_study_partner: `${fnPath}/study_partners/index.addStudyPartnerHandler`,
};
