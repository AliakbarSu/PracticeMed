import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getTestQuery, getTestQuery1 } from './queries'
import { LoadedTest } from '../../types/Test'
import { getUserAppMetadata, updateUserAppMetadata } from '../auth0/index'
import { UserAppMetadata } from '../../types/User'

const query = (query: string, variables: any) => {
  return fetch(Config.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Config.HYGRAPH_TOKEN}`
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  })
}

const hasUserRemainingTests = async (
  userId: string
): Promise<{ hasAccess: boolean; metadata: UserAppMetadata }> => {
  const userAppMetadata = await getUserAppMetadata(userId)
  return {
    hasAccess: userAppMetadata.plan.limit > userAppMetadata.plan.used,
    metadata: userAppMetadata
  }
}

const reduceUserRemainingTests = async (userId: string) => {
  const userAppMetadata = await getUserAppMetadata(userId)
  return updateUserAppMetadata({
    id: userId,
    data: {
      ...userAppMetadata,
      plan: {
        ...userAppMetadata.plan,
        used: userAppMetadata.plan.used + 1
      }
    }
  })
}

export const loadTest = async ({
  testId,
  userId
}: {
  testId: string
  userId: string
}) => {
  // Check if user has access to tests
  const { hasAccess } = await hasUserRemainingTests(userId)
  if (!hasAccess) {
    return Promise.reject('User has no remaining tests!')
  }
  // Increase the number of used tests
  await reduceUserRemainingTests(userId)
  // Load test
  const response = await query(getTestQuery, {
    id: testId
  })
  const response1 = await query(getTestQuery1, {
    id: testId
  })

  const parsed = await response.json()
  const parsed1 = await response1.json()

  const test = (parsed as { data: { test: LoadedTest } }).data.test
  const test1 = (parsed1 as { data: { test: LoadedTest } }).data.test
  const loadedTest: LoadedTest = {
    ...test,
    questions: [...test.questions, ...test1.questions]
  }
  return loadedTest
}
