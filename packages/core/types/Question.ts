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
