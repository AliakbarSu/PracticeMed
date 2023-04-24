import { ApiHandler } from 'sst/node/api'
import { loadTest } from '@mpt-sst/core/loadTest/index'
import { UserTest } from '@mpt-types/Test'

export const handler = ApiHandler(async (_evt) => {
  const testId = _evt.pathParameters?.id || ''
  // TODO: use internal user id
  const userId = 'auth0|64409c95c3a961d278445467'
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
  } catch (err) {
    console.log(err)
    return {
      body: 'Something went wrong'
    }
  }
})
