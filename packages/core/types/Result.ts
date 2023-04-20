import { Question } from './Question'

export enum ResultEnum {
  pass = 'pass',
  fail = 'fail'
}

export interface AnalyzedAnswer extends SubmittedAnswer, Question {
  correct: boolean
  timeTaken: number
}

export interface SubmittedAnswer {
  question_id: string
  option_id: string
  start_at: string
  end_at: string
}

export interface UserSubmittedResult {
  test_id: string
  start_at: string
  end_at: string
  answers: SubmittedAnswer[]
}

export interface TestPerformanceResult {
  averageTimeTaken: number
  averageTimeTakenPerField: { [key: string]: number }
  totalPoints: number
  totalPointsPerField: { [key: string]: number }
  result: ResultEnum
}
