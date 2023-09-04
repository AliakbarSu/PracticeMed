import { ApiHandler } from 'sst/node/api'
import { getTest } from '@mpt-sst/core/src/test/index'
import { Test } from '@mpt-types/Test'
import { getUser } from '@mpt-sst/core/auth0'
import { ApiGatewayAuth } from '@mpt-types/System'

export const handler = ApiHandler(async (_evt) => {
  const testId = _evt.pathParameters?.id || ''
  const { id, name, type, description, thumbnail, instructions } =
    await getTest(testId)
  const test: Test = { id, name, type, description, thumbnail, instructions }
  return {
    body: JSON.stringify(test)
  }
})

export const history = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const { app_metadata } = await getUser(userId)
  return {
    body: ((app_metadata?.test_history as unknown as string) ||
      '') as unknown as string
  }
})
