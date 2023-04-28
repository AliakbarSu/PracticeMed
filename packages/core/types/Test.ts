import { Question } from './Question'

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
}
