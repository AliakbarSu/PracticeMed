import { ApiHandler } from 'sst/node/api'
import { getTest } from '@mpt-sst/core/src/test/index'
import { Examination } from '@mpt-types/Test'
import { ApiGatewayAuth } from '@mpt-types/System'
import { getUser } from '@mpt-sst/core/src/model/users'

export const handler = ApiHandler(async (_evt) => {
  const testId = _evt.pathParameters?.id || ''
  const { id, name, type, description, thumbnail, instructions } =
    await getTest(testId)
  const test: Pick<
    Examination,
    'id' | 'name' | 'type' | 'description' | 'thumbnail' | 'instructions'
  > = {
    id,
    name,
    type,
    description,
    thumbnail,
    instructions
  }
  return {
    body: JSON.stringify(test)
  }
})

export const history = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const { tests } = await getUser(userId)
  return {
    body: ((tests as unknown as string) || '') as unknown as string
  }
})
