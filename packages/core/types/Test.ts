import { Question } from './Question'

export interface UserTest extends Test {
  text: string
  questions: Question[]
}

export interface Test {
  id: string
  name: string
  type: string
  description: string
  thumbnail: { url: string }[]
}
