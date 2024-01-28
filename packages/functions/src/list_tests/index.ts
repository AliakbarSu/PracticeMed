import { ApiHandler } from 'sst/node/api'
import { listTests, listTrialTests } from '@mpt-sst/core/src/test/index'
import { Examination } from '@mpt-types/Test'
import { ApiGatewayAuth } from '@mpt-types/System'
import { getUser } from '@mpt-sst/core/src/model/users'

export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const user = await getUser(userId)
  const isOnTrail = !!user.plan.subscription.onTrial
  let result = undefined
  if (isOnTrail) {
    result = await listTrialTests()
  } else {
    result = await listTests()
  }
  const tests: Pick<
    Examination,
    'id' | 'name' | 'description' | 'type' | 'thumbnail' | 'instructions'
  >[] = result.map((test) => ({
    id: test.id,
    name: test.name,
    description: test.description,
    type: test.type,
    thumbnail: test.thumbnail,
    instructions: test.instructions
  }))
  return {
    body: JSON.stringify(tests)
  }
})
