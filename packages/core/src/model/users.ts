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

export const get_users = async () => {
  return ''
}

export const add_user = async (userId: string) => {
  const user = {
    userId,
    tests: []
  }
  const db = await connectToDatabase()
  return db.collection('users').insertOne(user)
}
