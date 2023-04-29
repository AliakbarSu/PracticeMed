import { ApiHandler } from 'sst/node/api'
import { loadTest } from '@mpt-sst/core/loadTest/index'
import { LoadedTest } from '@mpt-types/Test'
import { ApiGatewayAuth } from '@mpt-types/System'

export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const testId = _evt.pathParameters?.id || ''
  const type = _evt.pathParameters?.type || ''
  try {
    const result = await loadTest({ userId, testId, type })
    const test: LoadedTest = {
      id: result.id,
      name: result.name,
      type: result.type,
      description: result.description,
      questions: result.questions,
      text: result.text,
      thumbnail: result.thumbnail,
      timeLimit: result.timeLimit,
      breaks: result.breaks,
      instructions: result.instructions
    }
    return {
      body: test as unknown as string
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
