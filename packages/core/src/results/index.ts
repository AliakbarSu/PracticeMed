import { Question } from '../../types/Question'
import {
  AnalyzedAnswer,
  SubmittedAnswer,
  TestPerformanceResult,
  UserSubmittedResult
} from '../../types/Result'
import { UserTest } from '../../types/Test'
import { UserAppMetadata } from '../../types/User'
import { getUserAppMetadata, updateUserAppMetadata } from '../auth0'
import { getTest } from '../test'
import {
  calculateAverageTimeTaken,
  calculateCorrectAnswersByMinuteInterval,
  calculateCorrectAnswersCount,
  calculateCorrectAnswersCountPerField,
  calculateIncorrectAnswersCount,
  calculateIncorrectAnswersCountPerField,
  calculatePercentageCorrectByField,
  calculatePercentageIncorrectByField,
  calculatePercentageOfCorrectAnswers,
  calculatePercentageOfIncorrectAnswers,
  calculateSpeedByMinuteIntervals,
  calculateTestResult,
  calculateTimeTaken,
  calculateTimeTakenPerCategory,
  calculateTotalPoint,
  calculateTotalPointPerCategory,
  isCorrectOption
} from './calculations'

const analyzeAnswer = (
  data: SubmittedAnswer[],
  test: UserTest
): AnalyzedAnswer[] => {
  const questions = test.questions

  const result = data.map((answer) => {
    const { question_id } = answer
    const timeTaken = calculateTimeTaken(answer).timeTaken
    const question = questions.find(({ id }) => id === question_id) as Question
    const correct = isCorrectOption(answer, question)
    return {
      ...answer,
      ...question,
      timeTaken,
      correct
    }
  })

  return result
}

export const analyze = async (
  submittedTest: UserSubmittedResult
): Promise<TestPerformanceResult> => {
  const { test_id, answers } = submittedTest
  const test = await getTest(test_id)
  const analyzedAnswers = analyzeAnswer(answers, test)
  const totalPoints = calculateTotalPoint(analyzedAnswers)
  const averageTimeTaken = calculateAverageTimeTaken(analyzedAnswers)
  const averageTimeTakenPerField =
    calculateTimeTakenPerCategory(analyzedAnswers)
  const totalPointsPerField = calculateTotalPointPerCategory(analyzedAnswers)
  // Percentages
  const correctResponseRate =
    calculatePercentageOfCorrectAnswers(analyzedAnswers)
  const incorrectResponseRate =
    calculatePercentageOfIncorrectAnswers(analyzedAnswers)
  const correctResponseRatePerField =
    calculatePercentageCorrectByField(analyzedAnswers)
  const incorrectResponseRatePerField =
    calculatePercentageIncorrectByField(analyzedAnswers)

  // Counts
  const correctResponseCount = calculateCorrectAnswersCount(analyzedAnswers)
  const incorrectResponseCount = calculateIncorrectAnswersCount(analyzedAnswers)

  const correctResponseCountPerField =
    calculateCorrectAnswersCountPerField(analyzedAnswers)
  const incorrectResponseCountPerField =
    calculateIncorrectAnswersCountPerField(analyzedAnswers)

  // Time performace
  const correctAnswersByMinuteInterval =
    calculateCorrectAnswersByMinuteInterval(analyzedAnswers)
  const speedByMinuteInterval = calculateSpeedByMinuteIntervals(analyzedAnswers)
  const result = calculateTestResult(totalPoints)
  return {
    test_id,
    stats: {
      totalPoints,
      averageTimeTaken,
      averageTimeTakenPerField,
      totalPointsPerField,
      correctResponseRate,
      incorrectResponseRate,
      correctResponseCount,
      incorrectResponseCount,
      correctResponseRatePerField,
      incorrectResponseRatePerField,
      correctResponseCountPerField,
      correctAnswersByMinuteInterval,
      incorrectResponseCountPerField,
      speedByMinuteInterval
    },
    result,
    timestamp: Date.now()
  }
}

export const saveTestResult = async ({
  user_id,
  result
}: {
  user_id: string
  result: TestPerformanceResult
}): Promise<UserAppMetadata> => {
  const user_app_metadata = await getUserAppMetadata(user_id)
  const { test_history } = user_app_metadata
  const updated_app_metadata: UserAppMetadata = {
    ...user_app_metadata,
    test_history: [...test_history, result]
  }
  return updateUserAppMetadata({ id: user_id, data: updated_app_metadata })
}
