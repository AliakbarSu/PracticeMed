import { ApiHandler } from 'sst/node/api'
import { getTest } from '@mpt-sst/core/src/test/index'
import { Test } from '@mpt-types/Test'

export const handler = ApiHandler(async (_evt) => {
  const testId = _evt.pathParameters?.id || ''
  const { id, name, type, description } = await getTest(testId)
  const test: Test = { id, name, type, description }
  return {
    body: JSON.stringify(test)
  }
})
