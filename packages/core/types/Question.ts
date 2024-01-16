export interface Option {
  alpha: string // e.g a, b, c
  id: string
  text: string
  correct: boolean
}

export interface Question {
  id: string
  text: string
  field: string
  difficulty_level: number // 1 to 10
  options: Option[]
  point: number
  correct_option_id: string
  correct_option_explanation: string
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
