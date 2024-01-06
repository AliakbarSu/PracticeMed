import { Question } from './Question'
import { SubmittedAnswer } from './Result'

export interface LoadedTest
  extends Omit<UserTest, 'passingPoint' | 'trial' | 'points'> {}

export interface UserTest extends Test {
  text: string
  questions: Question[]
  points: number
  passingPoint: number
  timeLimit: number
  breaks: {
    [key: string]: string
  }
  trial: boolean
}

export interface Test {
  id: string
  name: string
  type: string
  description: string
  thumbnail: { url: string }[]
  instructions: string
  questionsNumber?: number
}

export enum TestStatus {
  'IN_PROGRESS' = 'IN_PROGRESS',
  'COMPLETED' = 'COMPLETED'
}

export interface MongoDBTest {
  _id?: string
  test_id: string
  user_id: string
  status: TestStatus
  submitted_answers: SubmittedAnswer[]
  results: any[]
  timezone: string
  started_at: string
  ended_at: string
}
