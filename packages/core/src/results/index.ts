import { Question } from '../../types/Question'
import { v4 as uuidv4 } from 'uuid'
import {
  AnalyzedAnswer,
  SubmittedAnswer,
  TestPerformanceResult,
  UserSubmittedResult
} from '../../types/Result'
import { Examination } from '../../types/Test'
import { User } from '../../types/User'
import { getUser, updateUser } from '../model/users'
import { getTest } from '../test'
import { calculateFieldsAverageTime, distributePoints } from './calculations'
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
  test: Examination
): AnalyzedAnswer[] => {
  const questions = test.questions
  const result = data.map((answer) => {
    const { question_id } = answer
    const timeTaken = calculateTimeTaken(answer).timeTaken
    const question = questions.find(
      ({ _id }) => _id === question_id
    ) as Question
    const correct = isCorrectOption(answer, question)
    return {
      ...answer,
      ...question,
      timeTaken,
      correct
    }
  })

  return result.map((question) => {
    const point = question.correct ? test.points / test.questionsNumber : 0
    return {
      ...question,
      point: Math.round(point)
    }
  })
}

export const analyze = async (
  submittedTest: UserSubmittedResult
): Promise<TestPerformanceResult> => {
  const { test_id, answers } = submittedTest
  const loadedTest = await getTest(test_id)
  const analyzedAnswers = analyzeAnswer(answers, loadedTest)
  const totalPoints = calculateTotalPoint(analyzedAnswers)
  const averageTimeTaken = calculateAverageTimeTaken(analyzedAnswers)
  const averageTimeTakenPerField =
    calculateTimeTakenPerCategory(analyzedAnswers)
  const fieldsAverageTime = calculateFieldsAverageTime(analyzedAnswers)
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
    calculateCorrectAnswersByMinuteInterval(
      submittedTest.start_at,
      submittedTest.end_at,
      analyzedAnswers
    )
  const speedByMinuteInterval = calculateSpeedByMinuteIntervals(
    submittedTest.start_at,
    submittedTest.end_at,
    analyzedAnswers
  )
  const result = calculateTestResult(totalPoints, loadedTest.passingPoint)
  return {
    id: uuidv4(),
    test_id,
    stats: {
      testScore: loadedTest.points,
      totalPoints,
      averageTimeTaken,
      averageTimeTakenPerField,
      fieldsAverageTime,
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
  result,
  raw_result
}: {
  user_id: string
  result: TestPerformanceResult
  raw_result?: UserSubmittedResult
}): Promise<User> => {
  const user_data = await getUser(user_id)
  const { tests_history, tests } = user_data

  const user_submitted_result = [...(tests_history || [])]
  if (raw_result) {
    user_submitted_result.push(raw_result)
  }

  const updated_user_data = {
    ...user_data,
    tests: [...tests, result],
    tests_history: user_submitted_result
  }
  return updateUser(user_id, updated_user_data)
}
