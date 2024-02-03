import * as mongodb from 'mongodb'
import { Config } from 'sst/node/config'
import { User } from '../../types/User'

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

export const getUser = async (userId: string): Promise<User> => {
  const db = await connectToDatabase()
  return db.collection('users').findOne({ userId })
}

export const getAllUsers = async (): Promise<User[]> => {
  const db = await connectToDatabase()
  return db.collection('users').find({}).toArray()
}

export const updateUser = async (userId: string, data: User): Promise<User> => {
  const db = await connectToDatabase()
  return db.collection('users').updateOne({ userId }, { $set: data })
}

export const addUser = async (userId: string, email: string): Promise<User> => {
  const user: User = {
    userId,
    email,
    plan: {
      id: null,
      limit: 0,
      name: null,
      stripe_customer_id: null,
      subscription: {
        id: null,
        onTrial: false
      },
      used: 0
    },
    tests: [],
    tests_history: [],
    roles: []
  }
  const db = await connectToDatabase()
  return db.collection('users').insertOne(user)
}
