export interface Option {
  alpha: string // e.g a, b, c
  id: string
  text: string
  correct: boolean
}

export interface Question extends QuestionObject {
  difficulty_level: number // 1 to 10
  point: number
}

export interface QuestionOption {
  id: string
  alpha: string
  text: string
  explanation: string
  is_correct: boolean
}

export interface QuestionObject {
  _id: string
  text: string
  options: QuestionOption[]
  correct_option: QuestionOption
  field: string
}
