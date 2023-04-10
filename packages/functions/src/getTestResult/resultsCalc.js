const processData = (questions, submitted_answers) => {
  const processedQuestions = submitted_answers.map((q) => {
    // Finds the question
    const originalQuestion = questions.find((orgq) => orgq.id == q.questionId)

    const correctOptions = originalQuestion.options
      .filter((option) => option.isCorrectAnswer)
      .map((op) => op.id)

    const correct = correctOptions.includes(q.submitted_answer)
    const answeredIn = (q.endAt - q.startAt) / 1000 // changes millseconds to seconds
    return { ...q, correct, answeredIn, ...originalQuestion }
  })
  return processedQuestions
}

const calcOverallScore = (submittedQuestions) => {
  const correctQuestions = submittedQuestions.filter((q) => q.correct)
  const incorrectQuestions = submittedQuestions.filter((q) => !q.correct)

  const answeringTimes = submittedQuestions.map((q) => q.answeredIn)
  const totalAnsweringTime = answeringTimes.reduce(
    (total, curr) => total + curr,
    0
  )
  const averageAnsweringTime = Math.round(
    totalAnsweringTime / answeringTimes.length,
    2
  )
  const score = correctQuestions
    .map((q) => q.points)
    .reduce((total, curr) => total + curr, 0)

  return {
    correct: correctQuestions.length,
    incorrect: incorrectQuestions.length,
    total: submittedQuestions.length,
    averageAnsweringTime,
    score: score
  }
}

const calcCategoryBasedScore = (submittedQuestions) => {
  const categories = submittedQuestions
    .reduce((prev, curr) => {
      if (!prev.map((dta) => dta.category).includes(curr.category)) {
        return [...prev, curr]
      } else {
        return [...prev]
      }
    }, [])
    .map((dta) => dta.category)

  const scores = categories.map((category) => {
    const totalQuestionsInSection = submittedQuestions.filter(
      (q) => q.category == category
    )
    const gotCorrectInSection = totalQuestionsInSection.filter((q) => q.correct)
    const gotIncorrectInSection = totalQuestionsInSection.filter(
      (q) => !q.correct
    )
    const answeringTimes = totalQuestionsInSection.map((q) => q.answeredIn)
    const totalAnsweringTime = answeringTimes.reduce(
      (total, curr) => total + curr
    )
    const averageAnsweringTime = Math.round(
      totalAnsweringTime / answeringTimes.length
    )
    const totalCategoryPotentialScore = submittedQuestions
      .filter((cat) => cat.category == category)
      .map((q) => q.points)
      .reduce((total, curr) => total + curr, 0)
    const totalCategoryScores = gotCorrectInSection
      .map((q) => q.points)
      .reduce((total, curr) => total + curr, 0)
    console.log(totalCategoryScores, totalCategoryPotentialScore)
    return {
      category,
      averageAnsweringTime,
      correct: gotCorrectInSection.length,
      incorrect: gotIncorrectInSection.length,
      total: totalQuestionsInSection.length,
      score: totalCategoryScores,
      percentage:
        Math.round(
          (totalCategoryScores / totalCategoryPotentialScore) * 100,
          2
        ) || 0
    }
  })
  return scores
}

const calcAccuracy = (submittedQuestions, testStartTime) => {
  const questionsWithTime = submittedQuestions.map((q) => ({
    correct: q.correct,
    time: q.startAt
  }))
  const startTime = questionsWithTime[0] ? questionsWithTime[0].time : 0
  const endTime = questionsWithTime.length
    ? questionsWithTime[questionsWithTime.length - 1].time
    : 1
  const range = endTime - startTime
  const interval = range / 10
  const times = []
  for (let t = startTime; t <= endTime; t += interval) {
    times.push({ time: t })
  }
  const data = times.map(({ time }) => {
    const qa = questionsWithTime.filter(
      (q) => q.time <= time && q.time >= time - interval
    )
    const total = qa
      .map((q) => q.correct)
      .reduce((total, curr) => (curr ? total + 1 : total), 0)
    const timeElapsedInMinutes = convertTimeToMinutes(time - testStartTime)
    return { time: timeElapsedInMinutes, count: total }
  })
  return data
}

const calcSpeed = (submittedQuestions, testStartTime) => {
  return submittedQuestions.map((q) => ({
    answeredIn: q.answeredIn,
    time: convertTimeToMinutes(q.startAt - testStartTime)
  }))
}

const convertTimeToMinutes = (time) => {
  const timeElapsed = time / 60000
  return (
    Math.round((timeElapsed + Number.EPSILON) * Math.pow(10, 2)) /
    Math.pow(10, 2)
  )
}

module.exports = {
  calcOverallScore,
  processData,
  calcCategoryBasedScore,
  calcAccuracy,
  calcSpeed
}
