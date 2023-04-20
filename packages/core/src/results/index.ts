import { Question } from '../../types/Question'
import {
  AnalyzedAnswer,
  SubmittedAnswer,
  TestPerformanceResult,
  UserSubmittedResult
} from '../../types/Result'
import { UserTest } from '../../types/Test'
import { getTest } from '../test'
import {
  calculateAverageTimeTaken,
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
  const result = calculateTestResult(totalPoints)
  return {
    totalPoints,
    averageTimeTaken,
    averageTimeTakenPerField,
    totalPointsPerField,
    result
  }
}
