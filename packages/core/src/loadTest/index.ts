import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getTestQuery, getTrialTestsQuery } from './queries'
import { UserTest, LoadedTest } from '../../types/Test'
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
  userId,
  type
}: {
  testId: string
  userId: string
  type: string
}) => {
  // Check if user has access to tests
  const { hasAccess, metadata } = await hasUserRemainingTests(userId)
  if (!hasAccess) {
    return Promise.reject('User has no remaining tests!')
  }
  // Increase the number of used tests
  await reduceUserRemainingTests(userId)
  // Load test
  const isTrial = metadata.plan.subscription.onTrial
  const response = await query(isTrial ? getTrialTestsQuery : getTestQuery, {
    id: testId,
    type
  })
  const parsed = await response.json()
  return isTrial
    ? (parsed as { data: { tests: LoadedTest[] } }).data.tests[0]
    : (parsed as { data: { test: UserTest } }).data.test
}
