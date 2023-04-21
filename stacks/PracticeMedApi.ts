import { StackContext, Api, Config } from 'sst/constructs'

export function API({ stack }: StackContext) {
  const fnPath = 'packages/functions/src'
  const api = new Api(stack, 'api', {
    routes: {
      'GET /plans': `${fnPath}/plans/index.handler`,
      'POST /plans/{id}/subscribe': `${fnPath}/plans/subscribe.handler`,
      'GET /tests': `${fnPath}/listTests/index.handler`,
      'GET /tests/{id}': `${fnPath}/getTest/index.handler`,
      'GET /test/{id}/load': `${fnPath}/loadTest/index.handler`,
      'POST /test/{id}/result': `${fnPath}/result/index.handler`,
      'POST /pay': `${fnPath}/pay/lambda.handler`,
      'POST /bookTest': `${fnPath}/bookTest/lambda.handler`,
      'GET /getTestResult': `${fnPath}/getTestResult/lambda.handler`,
      'GET /listProducts': `${fnPath}/listProducts/index.handler`,
      'GET /listUserTests': `${fnPath}/listUserTests/lambda.handler`,
      'POST /loadTest': `${fnPath}/loadTest/lambda.handler`,
      'GET /fetchTestHistory': `${fnPath}/fetchTestHistory/lambda.handler`,
      'GET /testauth0': `${fnPath}/testauth0/index.handler`
    }
  })
  // STRIPE
  const STRIPE_KEY = new Config.Secret(stack, 'STRIPE_KEY')

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

  api.bind([
    STRIPE_KEY,
    HYGRAPH_ENDPOINT,
    HYGRAPH_TOKEN,
    AUTH0_DOMAIN,
    AUTH0_TOKEN
  ])
  stack.addOutputs({
    ApiEndpoint: api.url
  })
}
