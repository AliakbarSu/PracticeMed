const { AwesomeGraphQLClient } = require('awesome-graphql-client')
const fetch = require('node-fetch')
const GRAPHCMS_ENDPOINT =
  'https://api-us-west-2.graphcms.com/v2/ckrl8w1mi2au701xsb8nv28ky/master'

const client = new AwesomeGraphQLClient({ endpoint: GRAPHCMS_ENDPOINT, fetch })

const mongoose = require('mongoose')
const DB_URL =
  'mongodb+srv://ali:3Vyuj*Tx3quYREn@cluster0.erkbv.mongodb.net/Users'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const { User } = require('./schemas/user.schema')

const {
  processData,
  calcAccuracy,
  calcCategoryBasedScore,
  calcOverallScore,
  calcSpeed,
} = require('./resultsCalc')

exports.handler = async (event) => {
  const submitted_answers = event.submitted_answers
  const userId = event.userId
  const testId = event.testId

  const questionIds = submitted_answers.map((q) => q.questionId)

  const questions = await getQuestions(questionIds)
  const processedData = processData(questions, submitted_answers)
  const accuracy = calcAccuracy(processedData, event.test_start_time)
  const categoryBasedScore = calcCategoryBasedScore(processedData)
  const overallScore = calcOverallScore(processedData)
  const speed = calcSpeed(processedData, event.test_start_time)

  const date = new Date()
  const testResults = {
    timestamps: date.toString(),
    accuracy,
    categoryBasedScore,
    overallScore,
    speed,
  }

  await updateUserTests(userId, testId, testResults)

  return testResults
}

const updateUserTests = (userId, testId, testResults) => {
  return User.updateOne(
    { userId: userId, 'tests._id': testId },
    { $set: { 'tests.$.results': JSON.stringify(testResults) } }
  )
}

const getQuestions = async (ids) => {
  const { questions } = await client.request(query, { ids })
  return questions
}

const query = `
    query GetQuestions($ids: [ID!]){ 
      questions(where: {id_in: $ids}) {
        category
        title
        explanation
        options {
          ... on Option {
            id
            text
            order
            id
            isCorrectAnswer
          }
        }
        points
        id
        media {
          url
        }
      }
    }
    `
