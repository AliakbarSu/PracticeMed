import { Question } from '../../types/Question'
import { AnalyzedAnswer, ResultEnum, SubmittedAnswer } from '../../types/Result'

export const isCorrectOption = (
  { option_id }: SubmittedAnswer,
  question: Question
): boolean => {
  const { alpha } = question.options.filter(({ correct }) => correct)[0]
  return option_id.toUpperCase() === alpha.toUpperCase()
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
    const { timeTaken } = calculateTimeTaken(answer)
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
    const { timeTaken } = calculateTimeTaken(answer)
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
    percentages[field] = (correct / total) * 100
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

  // Sort the objects array in descending order of points
  objects.sort((a, b) => b.point - a.point)

  // Loop through the objects array to adjust the points to meet the requirements
  let totalAdjustedPoints = 0
  let lowestObjectIndex = objects.length - 1
  let highestObjectIndex = 0
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]

    // Calculate the maximum point that this object can have to meet the requirements
    const maxPoint = Math.min(
      obj.point,
      Math.floor(points - totalPoints + obj.point) / (objects.length - i)
    )

    // If the maximum point is less than the current point, adjust the point
    if (maxPoint < obj.point) {
      obj.point = maxPoint
    }

    // Add the adjusted point to the total adjusted points
    totalAdjustedPoints += obj.point

    // Keep track of the lowest and highest object index that has the same point value
    if (i > 0 && obj.point === objects[i - 1].point) {
      lowestObjectIndex = i
    }
    if (i < objects.length - 1 && obj.point === objects[i + 1].point) {
      highestObjectIndex = i
    }
  }

  // If the total adjusted points are less than or equal to the number, return the objects array
  if (totalAdjustedPoints <= points) {
    return objects
  }

  // Adjust the points of the objects with the lowest point value
  for (let i = lowestObjectIndex; i >= 0; i--) {
    const obj = objects[i]
    const maxPoint = Math.min(
      obj.point,
      Math.floor(points - totalAdjustedPoints + obj.point) /
        (lowestObjectIndex + 1 - i)
    )
    obj.point = maxPoint
    totalAdjustedPoints += obj.point - maxPoint
  }

  // Adjust the points of the objects with the highest point value
  for (let i = highestObjectIndex; i < objects.length; i++) {
    const obj = objects[i]
    const maxPoint = Math.min(
      obj.point,
      Math.floor(points - totalAdjustedPoints + obj.point) /
        (i - highestObjectIndex + 1)
    )
    obj.point = maxPoint
    totalAdjustedPoints += obj.point - maxPoint
  }

  // Return the objects array with the adjusted points
  return objects
}

export const calculateFieldsAverageTime = (data: AnalyzedAnswer[]) => {
  const averageTimePerField: { [key in string]: number } =
    calculateTimeTakenPerCategory(data)
  const values = Object.values(averageTimePerField)
  const sum = values.reduce((total, value) => total + value, 0)
  const average = sum / values.length
  return average
}
