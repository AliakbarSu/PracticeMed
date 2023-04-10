import { StackContext, Api } from 'sst/constructs'

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'POST /pay': 'packages/functions/src/pay/lambda.handler',
      'POST /bookTest': 'packages/functions/src/bookTest/lambda.handler',
      'GET /getTestResult':
        'packages/functions/src/getTestResult/lambda.handler',
      'GET /listProducts': 'packages/functions/src/listProducts/lambda.handler',
      'GET /listUserTests':
        'packages/functions/src/listUserTests/lambda.handler',
      'POST /loadTest': 'packages/functions/src/loadTest/lambda.handler',
      'GET /fetchTestHistory':
        'packages/functions/src/fetchTestHistory/lambda.handler'
    }
  })
  stack.addOutputs({
    ApiEndpoint: api.url
  })
}
// { "pay/index": "./src/pay/index.js", "bookTest/index": "./src/bookTest/index.js", "getTestResult/index": "./src/getTestResult/index.js", "listProducts/index": "./src/listProducts/index.js", "listUserTests/index": "./src/listUserTests/index.js", "loadTest/index": "./src/loadTest/index.js", "fetchTestHistory/index": "./src/fetchTestHistory/index.js" }
