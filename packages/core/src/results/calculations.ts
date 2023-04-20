import { Question } from '../../types/Question'
import {
  AnalyzedAnswer,
  ResultEnum,
  SubmittedAnswer,
  UserSubmittedResult
} from '../../types/Result'

export const isCorrectOption = (
  { option_id }: SubmittedAnswer,
  question: Question
): boolean => {
  const { id } = question.options.filter(({ correct }) => correct)[0]
  return option_id === id
}

export const calculateTimeTaken = (answer: SubmittedAnswer) => {
  const startTime = new Date(Number(answer.start_at))
  const endTime = new Date(Number(answer.end_at))
  const timeTaken = (endTime.getTime() - startTime.getTime()) / 1000
  return { ...answer, timeTaken }
}

export const calculateTimeTakenPerCategory = (data: AnalyzedAnswer[]) => {
  const categoryTimes: any = {}

  data.forEach((answer) => {
    const startTime = new Date(Number(answer.start_at))
    const endTime = new Date(Number(answer.end_at))
    const timeTaken = (endTime.getTime() - startTime.getTime()) / 1000

    if (answer.field in categoryTimes) {
      categoryTimes[answer.field] += timeTaken
    } else {
      categoryTimes[answer.field] = timeTaken
    }
  })
  return categoryTimes
}

export const calculateAverageTimeTaken = (data: AnalyzedAnswer[]) => {
  let totalTime = 0
  let answerCount = 0

  data.forEach((answer) => {
    const startTime = new Date(Number(answer.start_at))
    const endTime = new Date(Number(answer.end_at))
    const timeTaken = (endTime.getTime() - startTime.getTime()) / 1000

    totalTime += timeTaken
    answerCount += 1
  })

  const averageTime = totalTime / answerCount
  return averageTime
}

export const calculateTotalPoint = (data: AnalyzedAnswer[]) => {
  let totalPoint = 0
  data.forEach((answer) => {
    if (answer.point >= 1 && answer.point <= 100) {
      totalPoint += answer.point
    }
  })
  return totalPoint
}

export const calculateTotalPointPerCategory = (data: AnalyzedAnswer[]) => {
  const categoryPoints: any = {}

  data.forEach((answer) => {
    if (answer.field) {
      if (answer.field in categoryPoints) {
        categoryPoints[answer.field] += answer.point || 0
      } else {
        categoryPoints[answer.field] = answer.point || 0
      }
    }
  })

  const result = Object.entries(categoryPoints).map(
    ([category, totalPoint]) => {
      return `Total point for category ${category}: ${totalPoint}`
    }
  )

  return categoryPoints
}

export const calculateTestResult = (totalPoints: number): ResultEnum => {
  return totalPoints > 75 ? ResultEnum.pass : ResultEnum.fail
}
