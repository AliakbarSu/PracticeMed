import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getTestQuery } from './queries'
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
  const totalNumberOfQuestions = 500

  const runFunctionForEvery100Items = async (
    number: number,
    functionToRun: any
  ) => {
    const iterations = Math.ceil(number / 100)
    let totalItems = 0
    for (let i = 0; i < iterations; i++) {
      const itemsInGroup = Math.min(100, number - totalItems)
      await functionToRun(100, totalItems)
      totalItems += itemsInGroup
    }
  }
  const questions = [] as any
  let loadedTest: LoadedTest = {} as unknown as LoadedTest
  await runFunctionForEvery100Items(
    totalNumberOfQuestions,
    async (first: number, skip: number) => {
      const response = await query(getTestQuery, {
        id: testId,
        first,
        skip
      })
      const parsed = await response.json()
      const test = (parsed as { data: { test: LoadedTest } }).data.test
      loadedTest = test
      questions.push(...test.questions)
    }
  )

  return { ...loadedTest, questions }
}
