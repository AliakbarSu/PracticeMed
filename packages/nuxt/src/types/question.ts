export interface Option {
  alpha: string // e.g a, b, c
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  field: string
  options: Option[]
  correct_option_explanation: string
}
