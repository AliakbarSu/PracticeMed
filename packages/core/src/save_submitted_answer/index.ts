import * as mongodb from 'mongodb'
import { Config } from 'sst/node/config'
const MongoClient = mongodb.MongoClient
let cachedDb: any = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(Config.MONGODB_URI)
  cachedDb = await client.db('Users')
  return cachedDb
}

export const saveSubmittedAnswer = async (data: {
  userId: string
  testId: string
  result: any
}) => {
  const db = await connectToDatabase()
  const user = await db.collection('users').findOne({ userId: data.userId })
  return user
}
