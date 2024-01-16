import * as mongodb from 'mongodb'
import { Config } from 'sst/node/config'
import { QuestionObject } from '../../types/Question'

const MongoClient = mongodb.MongoClient
let cachedDb: any = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(Config.MONGODB_URI)
  cachedDb = await client.db('Questions')
  return cachedDb
}

export const getQuestions = async (
  type = 'amc',
  limit = 100
): Promise<QuestionObject[]> => {
  const db = await connectToDatabase()
  return db.collection('questions').find().limit(limit).toArray()
}
