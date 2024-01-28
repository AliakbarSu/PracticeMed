import * as mongodb from 'mongodb'
import { Config } from 'sst/node/config'
import { SubmittedAnswer } from '../../types/Result'
import { TestObject, TestStatus } from '../../types/Test'

const MongoClient = mongodb.MongoClient
let cachedDb: any = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(Config.MONGODB_URI)
  cachedDb = await client.db('Tests')
  return cachedDb
}

export const addTest = async (test: TestObject) => {
  const db = await connectToDatabase()
  return db.collection('tests').insertOne(test)
}

export const saveSubmittedAnswer = async (config: {
  testId: string
  userId: string
  answer: SubmittedAnswer
}) => {
  const db = await connectToDatabase()
  const test: TestObject = await db
    .collection('tests')
    .findOne({ test_id: config.testId, user_id: config.userId })
  if (!test) {
    return
  }

  const submittedAnswers = test.submitted_answers
  submittedAnswers.push(config.answer)
  return db
    .collection('tests')
    .updateOne(
      { test_id: config.testId, user_id: config.userId },
      { $set: { submitted_answers: submittedAnswers } }
    )
}

export const saveTestResult = async (config: {
  testId: string
  userId: string
  results: any
}) => {
  const db = await connectToDatabase()
  const test: TestObject = await db
    .collection('tests')
    .findOne({ test_id: config.testId, user_id: config.userId })
  if (!test) {
    return
  }

  return db
    .collection('tests')
    .updateOne(
      { test_id: config.testId, user_id: config.userId },
      { $set: { results: config.results, status: TestStatus.COMPLETED } }
    )
}
