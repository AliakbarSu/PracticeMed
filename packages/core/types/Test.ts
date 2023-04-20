import { Question } from './Question'

export interface UserTest {
  id: string
  name: string
  type: string
  description: string
  text: string
  questions: Question[]
}

export interface Test {
  id: string
  name: string
  type: string
  description: string
}
