const { AwesomeGraphQLClient } = require('awesome-graphql-client')
const fetch = require('node-fetch')
const mongoose = require('mongoose')

const GRAPHCMS_URL =
  'https://api-us-west-2.graphcms.com/v2/ckrl8w1mi2au701xsb8nv28ky/master'
const DB_URL =
  'mongodb+srv://ali:3Vyuj*Tx3quYREn@cluster0.erkbv.mongodb.net/Users'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const client = new AwesomeGraphQLClient({
  endpoint: GRAPHCMS_URL,
  fetch,
})

const { User } = require('./users.schema')

const handler = (event) => {
  return new Promise(async (resolve) => {
    let userTests
    try {
      userTests = await listUsersActiveTests(event.userId)
    } catch (err) {
      console.log(err)
    }
    if (
      userTests.filter((ut) => ut._id == event.testId && ut.expired == false)
        .length
    ) {
      const questions = await getQuestions()
      await updateUserTests(event.userId, event.testId)
      const response = {
        statusCode: 200,
        body: JSON.stringify(questions),
      }
      resolve(response)
    } else {
      const response = {
        statusCode: 200,
        body: 'No test was booked for this user',
      }
      resolve(response)
    }
  })
}

const listUsersActiveTests = (userId) => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: String(userId) }, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data.tests)
    })
  })
}

const updateUserTests = async (userId, testId) => {
  return User.updateOne(
    { userId: userId, 'tests._id': testId },
    { $set: { 'tests.$.expired': true } }
  )
}

const query = `
    { 
      questions {
        category
        title
        explanation
        options {
          ... on Option {
            id
            text
            order
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

function randomiseQuestions(questionsArg) {
  return questionsArg.sort(() => 0.5 - Math.random())
}

function generate(max, thecount) {
  var r = []
  var currsum = 0
  for (var i = 0; i < thecount; i++) {
    const random = Math.random()
    r.push(random < 0.1 ? 0.1 : random)
    currsum += r[i]
  }
  for (var i = 0; i < r.length; i++) {
    r[i] = Math.round((r[i] / currsum) * max)
  }
  return r
}

const getQuestions = async () => {
  const totalQuestions = 150

  const { questions } = await client.request(query)
  const questionsArray = questions

  const subjectsArray = questionsArray.map((q) => q.category)
  let subjects = []
  subjectsArray.forEach((sub) => {
    if (!subjects.includes(sub)) {
      subjects.push(sub)
    }
  })

  const percentages = [
    { sub: 'Medicine', perc: 35 },
    { sub: 'Obstetrics Gynecology', perc: 10 },
    { sub: 'Pediatrics', perc: 15 },
    { sub: 'Psychiatry', perc: 15 },
    { sub: 'Surgery', perc: 20 },
    { sub: 'Public Health', perc: 10 },
  ]

  const points = generate(500, 120)
  const questionsAll = subjects
    .map((sub) => {
      const subjectPercentage = percentages.find((pr) => pr.sub == sub)
      const amount = Math.floor((subjectPercentage.perc / 100) * totalQuestions)
      return randomiseQuestions(
        questionsArray.filter((q) => q.category == sub)
      ).slice(0, amount - 1)
    })
    .map((q) => (q.subject == 'Surgery' ? { ...q, subject: 'Medicine' } : q))
    .reduce((prev, curr) => [...prev, ...curr])

  const realQuestions = questionsAll
    .slice(0, 120)
    .map((q, index) => ({ ...q, point: points[index] }))
  const pirateQuestions = questionsAll
    .slice(120, questionsAll.length)
    .map((q) => ({ ...q, point: 0 }))
  const allQuestions = [...realQuestions, ...pirateQuestions]
  return randomiseQuestions(allQuestions)
}

module.exports = {
  handler,
  updateUserTests,
  listUsersActiveTests,
}
