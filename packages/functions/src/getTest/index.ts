import { ApiHandler } from 'sst/node/api'
import { getTest } from '@mpt-sst/core/src/test/index'
import { Test } from '@mpt-types/Test'
import { getUser } from '@mpt-sst/core/auth0'

export const handler = ApiHandler(async (_evt) => {
  const testId = _evt.pathParameters?.id || ''
  const { id, name, type, description, thumbnail } = await getTest(testId)
  const test: Test = { id, name, type, description, thumbnail }
  return {
    body: JSON.stringify(test)
  }
})

export const history = ApiHandler(async (_evt) => {
  const userId = 'auth0|64409c95c3a961d278445467'
  const { app_metadata } = await getUser(userId)
  return {
    body: JSON.stringify(app_metadata?.test_history)
  }
})
