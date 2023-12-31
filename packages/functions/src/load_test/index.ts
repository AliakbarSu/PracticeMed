import { ApiHandler } from 'sst/node/api'
import { loadTest, loadMockTest } from '@mpt-sst/core/loadTest/index'
import { LoadedTest } from '@mpt-types/Test'
import { ApiGatewayAuth } from '@mpt-types/System'
import { Converter } from 'showdown'

const mockTestId = 'clh14ynv50l7m0b1jsrl59nvy'

const getTest = async (testId: string, userId: string) => {
  const converter = new Converter()
  const result =
    testId == mockTestId
      ? await loadMockTest(mockTestId)
      : await loadTest({ userId, testId })
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
    instructions: converter.makeHtml(result.instructions)
  }
  return test
}

export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const testId = _evt.pathParameters?.id || ''
  try {
    const test = await getTest(testId, userId)
    return {
      body: test as unknown as string
    }
  } catch (err: any) {
    console.log(err)
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

export const demoTestHandler = ApiHandler(async (_evt) => {
  try {
    return {
      body: (await getTest(mockTestId, '')) as unknown as string
    }
  } catch (err: any) {
    console.log(err)
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
