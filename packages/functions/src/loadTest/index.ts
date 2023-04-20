import { ApiHandler } from 'sst/node/api'
import { loadTest } from '@mpt-sst/core/loadTest/index'
import { UserTest } from '@mpt-types/Test'

export const handler = ApiHandler(async (_evt) => {
  const testId = _evt.pathParameters?.id || ''
  const userId = _evt.queryStringParameters?.userid || ''
  try {
    const result = await loadTest({ userId, testId })
    const test: UserTest = {
      id: result.id,
      name: result.name,
      type: result.type,
      description: result.description,
      questions: result.questions,
      text: result.text
    }
    return {
      body: JSON.stringify(test)
    }
  } catch (err) {
    console.log(err)
    return {
      body: 'Something went wrong'
    }
  }
})
