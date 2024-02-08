import { ApiHandler } from 'sst/node/api'
import {
  getTest,
  listTests,
  listTrialTests,
} from '@mpt-sst/core/src/test/index'
import { Examination } from '@mpt-types/Test'
import { ApiGatewayAuth } from '@mpt-types/System'
import { getAllUsers, getUser } from '@mpt-sst/core/src/model/users'
import { RolesEnum } from '@mpt-types/User'
import { Results } from '@mpt-types/Result'

export const get_tests = ApiHandler(async _evt => {
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
  >[] = result.map(test => ({
    id: test.id,
    name: test.name,
    description: test.description,
    type: test.type,
    thumbnail: test.thumbnail,
    instructions: test.instructions,
  }))
  return {
    body: JSON.stringify(tests),
  }
})

export const get_test = ApiHandler(async _evt => {
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
    instructions,
  }
  return {
    body: JSON.stringify(test),
  }
})

export const get_test_history = ApiHandler(async _evt => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const { results, roles } = await getUser(userId)
  let allTests = results
  if (roles.includes(RolesEnum.Admin)) {
    const allUsers = await getAllUsers()
    allTests = [
      ...allTests,
      ...allUsers.reduce((acc, user) => {
        return acc.concat(user.tests)
      }, [] as Results[]),
    ]
  }
  return {
    body: ((allTests as unknown as string) || '') as unknown as string,
  }
})
