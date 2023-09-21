import { ApiHandler } from 'sst/node/api'
import { ApiGatewayAuth } from '@mpt-types/System'
import { generate_tips } from '@mpt-sst/core/src/personalised_tips/index'

export const handler = ApiHandler(async (_evt) => {
  // const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
  //   .jwt.claims.sub
  // const testId = _evt.pathParameters?.id || ''
  try {
    // const tips = generate_tips({ testId, userId })
    return {
      body: ''
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    }
  }
})
