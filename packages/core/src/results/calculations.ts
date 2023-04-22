import { Question } from '../../types/Question'
import { AnalyzedAnswer, ResultEnum, SubmittedAnswer } from '../../types/Result'

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

export const calculatePercentageOfCorrectAnswers = (
  answers: AnalyzedAnswer[]
): number => {
  const numCorrect = answers.filter((answer) => answer.correct === true).length
  const totalQuestions = answers.length
  const percentageCorrect = (numCorrect / totalQuestions) * 100
  return Number(percentageCorrect.toFixed(2))
}

export const calculatePercentageOfIncorrectAnswers = (
  answers: AnalyzedAnswer[]
): number => {
  const numIncorrect = answers.filter(
    (answer) => answer.correct === false
  ).length
  const totalQuestions = answers.length
  const percentageIncorrect = (numIncorrect / totalQuestions) * 100
  return Number(percentageIncorrect.toFixed(2))
}

export const calculateCorrectAnswersCount = (arr: AnalyzedAnswer[]) => {
  return arr.reduce((acc, cur) => {
    if (cur.correct === true) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
}

export const calculateIncorrectAnswersCount = (arr: AnalyzedAnswer[]) => {
  return arr.reduce((acc, cur) => {
    if (cur.correct === true) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
}

export const calculatePercentageCorrectByField = (
  answers: AnalyzedAnswer[]
) => {
  const fields = {} as any

  answers.forEach((answer) => {
    if (answer.correct) {
      if (!fields[answer.field]) {
        fields[answer.field] = { correct: 1, total: 1 }
      } else {
        fields[answer.field].correct += 1
        fields[answer.field].total += 1
      }
    } else {
      if (!fields[answer.field]) {
        fields[answer.field] = { correct: 0, total: 1 }
      } else {
        fields[answer.field].total += 1
      }
    }
  })

  const percentages = {} as any
  Object.entries(fields).forEach(([field, { correct, total }]: any) => {
    percentages[field] = (correct / total) * 100
  })

  return percentages
}

export const calculatePercentageIncorrectByField = (
  answers: AnalyzedAnswer[]
) => {
  const fields = {} as any

  answers.forEach((answer) => {
    if (answer.correct) {
      if (!fields[answer.field]) {
        fields[answer.field] = { correct: 1, total: 1 }
      } else {
        fields[answer.field].correct += 1
        fields[answer.field].total += 1
      }
    } else {
      if (!fields[answer.field]) {
        fields[answer.field] = { correct: 0, total: 1 }
      } else {
        fields[answer.field].total += 1
      }
    }
  })

  const percentages = {} as any
  Object.entries(fields).forEach(([field, { correct, total }]: any) => {
    percentages[field] = (correct / total) * 100
  })

  return percentages
}

export const calculateCorrectAnswersCountPerField = (
  data: AnalyzedAnswer[]
) => {
  const counts = {} as any
  data.forEach((item) => {
    if (item.correct) {
      const field = item.field
      if (counts[field]) {
        counts[field]++
      } else {
        counts[field] = 1
      }
    }
  })

  return counts
}

export const calculateIncorrectAnswersCountPerField = (
  data: AnalyzedAnswer[]
) => {
  const counts = {} as any
  data.forEach((item) => {
    if (!item.correct) {
      const field = item.field
      if (counts[field]) {
        counts[field]++
      } else {
        counts[field] = 1
      }
    }
  })

  return counts
}

export const calculateCorrectAnswersByMinuteInterval = (
  answersArray: AnalyzedAnswer[]
): { [key: string]: number } => {
  const correctAnswersByMinuteInterval = {} as any

  for (const answer of answersArray) {
    const minuteInterval = Math.floor(Number(answer.start_at) / 60000)
    if (!correctAnswersByMinuteInterval[minuteInterval]) {
      correctAnswersByMinuteInterval[minuteInterval] = 0
    }
    if (answer.correct) {
      correctAnswersByMinuteInterval[minuteInterval]++
    }
  }

  return correctAnswersByMinuteInterval
}

export const calculateSpeedByMinuteIntervals = (data: AnalyzedAnswer[]) => {
  const timeIntervals = {} as any
  data.forEach((item) => {
    const start = new Date(parseInt(item.start_at))
    const end = new Date(parseInt(item.end_at))
    const diff = end.getTime() - start.getTime()
    const minutes = Math.floor(diff / 60000) // 1 minute = 60,000 milliseconds
    for (let i = 0; i <= minutes; i++) {
      const key = start.getTime() + i * 60000
      if (timeIntervals[key]) {
        timeIntervals[key]++
      } else {
        timeIntervals[key] = 1
      }
    }
  })
  return timeIntervals
}
