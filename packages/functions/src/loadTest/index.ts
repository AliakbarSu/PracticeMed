import { ApiHandler } from 'sst/node/api'
import { loadTest } from '@mpt-sst/core/loadTest/index'
import { UserTest } from '@mpt-types/Test'
import { ApiGatewayAuth } from '@mpt-types/System'

export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const testId = _evt.pathParameters?.id || ''
  try {
    const result = await loadTest({ userId, testId })
    const test: UserTest = {
      id: result.id,
      name: result.name,
      type: result.type,
      description: result.description,
      questions: result.questions,
      text: result.text,
      thumbnail: result.thumbnail
    }
    return {
      body: JSON.stringify(test)
    }
  } catch (err: any) {
    if (err === 'User has no remaining tests!') {
      return {
        body: 'User has no remaining tests!',
        statusCode: 403
      }
    }
    return {
      body: 'Something went wrong'
    }
  }
})
