import { getUserAppMetadata, updateUserAppMetadata } from '../auth0/index'
import { UserAppMetadata } from '../../types/User'
import { getTest } from '../test'
import { Question } from '../../types/Question'
import { addTest } from '../model/test'
import { MongoDBTest, TestStatus } from '../../types/Test'

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

function getRandomQuestions(array: Question[], count = 1) {
  const randomItems = []

  // Shuffle the array
  const shuffledArray = array.sort(() => Math.random() - 0.5)

  // Select random items based on the count
  for (let i = 0; i < count; i++) {
    if (i < shuffledArray.length) {
      randomItems.push(shuffledArray[i])
    }
  }

  return randomItems
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

  const { questions, questionsNumber, ...rest } = await getTest(testId)

  const loadedTest: MongoDBTest = {
    user_id: userId,
    test_id: testId,
    status: TestStatus.IN_PROGRESS,
    submitted_answers: [],
    results: [],
    timezone: 'UTC',
    started_at: new Date().toISOString(),
    ended_at: ''
  }

  await addTest(loadedTest)

  return { ...rest, questions: getRandomQuestions(questions, questionsNumber) }
}

export const loadMockTest = async (mockTestId: string) => {
  const { questions, questionsNumber, ...rest } = await getTest(
    mockTestId,
    true
  )
  return { ...rest, questions: getRandomQuestions(questions, questionsNumber) }
}
