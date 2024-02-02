import { Question } from '../../types/Question'
import { AnalyzedAnswer, ResultEnum, SubmittedAnswer } from '../../types/Result'
import moment from 'moment'

export const isCorrectOption = (
  { option_id }: SubmittedAnswer,
  question: Question
): boolean => {
  if (!question) {
    return false
  }
  return option_id.toLowerCase() == question.correct_option.alpha.toLowerCase()
}

export const calculateTimeTaken = (answer: SubmittedAnswer) => {
  const startTime = moment(+answer.start_at)
  const endTime = moment(+answer.end_at)
  const timeTaken = moment.duration(endTime.diff(startTime)).asMinutes()
  return { ...answer, timeTaken }
}

export const calculateTimeTakenPerCategory = (data: AnalyzedAnswer[]) => {
  const categoryTimes: any = {}

  for (const field in data) {
    const answer = data[field]
    const { timeTaken } = calculateTimeTaken(answer)
    if (answer.field in categoryTimes) {
      categoryTimes[answer.field] += timeTaken
    } else {
      categoryTimes[answer.field] = timeTaken
    }
  }
  return categoryTimes
}

export const calculateAverageTimeTaken = (data: AnalyzedAnswer[]) => {
  const totalTime = data.reduce((total, answer) => {
    const { timeTaken } = calculateTimeTaken(answer)
    return timeTaken + total
  }, 0)
  return parseInt((totalTime / data.length).toFixed())
}

export const calculateTotalPoint = (data: AnalyzedAnswer[]) => {
  return data.reduce((acc, cur) => (cur.correct ? acc + cur.point : acc), 0)
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

  return categoryPoints
}

export const calculateTestResult = (
  totalPoints: number,
  passingScore: number
): ResultEnum => {
  return totalPoints >= passingScore ? ResultEnum.pass : ResultEnum.fail
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
    if (cur.correct !== true) {
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
    percentages[field] = Math.round((correct / total) * 100)
  })

  return percentages
}

export const calculatePercentageIncorrectByField = (
  answers: AnalyzedAnswer[]
) => {
  const fields = {} as any

  answers.forEach((answer) => {
    if (!answer.correct) {
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
    percentages[field] = Math.round((correct / total) * 100)
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
    } else {
      const field = item.field
      if (counts[field]) {
        counts[field] = counts[field]
      } else {
        counts[field] = 0
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

const getMinuteIntervals = (
  startAt: string,
  endAt: string,
  interval: number = 2,
  defaultValue: any = 0
) => {
  const testStartTime = moment(+startAt)
  const testEndTime = moment(+endAt)
  const testDuration = moment.duration(testEndTime.diff(testStartTime))
  const result: {
    [key: string]: number
  } = {}

  for (let i = 0; i <= testDuration.asMinutes(); i += interval) {
    result[i] = defaultValue
  }
  return result
}

export const calculateCorrectAnswersByMinuteInterval = (
  startAt: string,
  endAt: string,
  answersArray: AnalyzedAnswer[]
): { [key: string]: number } => {
  const testStartTime = moment(+startAt)
  const testEndTime = moment(+endAt)
  const chunkSize = 2
  const testDuration = moment.duration(testEndTime.diff(testStartTime))
  const result: {
    [key: string]: number
  } = getMinuteIntervals(startAt, endAt, chunkSize)

  answersArray.forEach((answer) => {
    const timeElapsed = moment.duration(
      moment(+answer.end_at).diff(testStartTime)
    )
    const intervals = Object.keys(result)
    for (let i = 0; i < intervals.length; i++) {
      const nextIndex = i + 1
      const interval = parseInt(intervals[i])
      const nextInterval =
        parseInt(intervals[nextIndex]) || testDuration.asMinutes() + chunkSize
      if (
        timeElapsed.asMinutes() >= interval &&
        timeElapsed.asMinutes() <= nextInterval
      ) {
        result[interval] += answer.correct ? 1 : 0
      }
    }
  })
  return result
}

export const calculateSpeedByMinuteIntervals = (
  startAt: string,
  endAt: string,
  answersArray: AnalyzedAnswer[]
) => {
  const testStartTime = moment(+startAt)
  const testEndTime = moment(+endAt)
  const chunkSize = 2
  const testDuration = moment.duration(testEndTime.diff(testStartTime))
  const result: {
    [key: string]: any
  } = getMinuteIntervals(startAt, endAt, chunkSize)

  const intervals = Object.keys(result)
  for (let i = 0; i < intervals.length; i++) {
    const nextIndex = i + 1
    const interval = parseInt(intervals[i])
    const nextInterval =
      parseInt(intervals[nextIndex]) || testDuration.asMinutes() + chunkSize

    const answers = answersArray
      .filter((answer) => {
        const timeElapsed = moment.duration(
          moment(+answer.end_at).diff(testStartTime)
        )
        return (
          timeElapsed.asMinutes() >= interval &&
          timeElapsed.asMinutes() <= nextInterval
        )
      })
      .map((answer) => {
        const answerDuration = moment
          .duration(moment(+answer.end_at).diff(moment(+answer.start_at)))
          .asSeconds()
        return answerDuration
      })
    const total = answers.reduce((acc, cur) => acc + cur, 0)
    result[interval] = parseInt(
      (answers.length > 0 ? total / answers.length : 0).toFixed(2)
    )
  }

  return result
}

export const distributePoints = (points: number, objects: Question[]) => {
  // Calculate the total number of points in the objects array
  const totalPoints = objects.reduce((acc, obj) => acc + obj.point, 0)

  // If the total points are less than or equal to the number, return the objects array
  if (totalPoints <= points) {
    return objects
  }

  // Calculate the scaling factor to distribute the points evenly between 0 and 100
  const scalingFactor = 100 / totalPoints

  // Distribute the points evenly between 0 and 100 for each object
  objects.forEach((obj) => {
    obj.point *= scalingFactor
  })
  return objects
}

export const calculateFieldsAverageTime = (data: AnalyzedAnswer[]) => {
  const averageTimePerField: { [key in string]: number } =
    calculateTimeTakenPerCategory(data)
  const values = Object.values(averageTimePerField)
  const sum = values.reduce((total, value) => total + value, 0)
  return parseInt((sum / values.length).toFixed(2))
}
