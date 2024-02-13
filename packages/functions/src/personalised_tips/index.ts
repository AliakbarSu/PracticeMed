import { ApiHandler } from 'sst/node/api'

export const get_tips = ApiHandler(async _evt => {
  // const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
  //   .jwt.claims.sub
  // const testId = _evt.pathParameters?.id || ''
  try {
    // const tips = generate_tips({ testId, userId })
    return {
      body: '',
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    }
  }
})
