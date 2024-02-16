export interface Option {
  alpha: string; // e.g a, b, c
  id: string;
  text: string;
  correct: boolean;
}

export interface Question extends QuestionObject {
  difficulty_level: number; // 1 to 10
  point: number;
}

export interface QuestionOption {
  id: string;
  alpha: string;
  text: string;
  explanation: string;
  is_correct: boolean;
}

export interface QuestionObject {
  _id: string;
  text: string;
  options: QuestionOption[];
  correct_option: QuestionOption;
  field: string;
  type: string;
  deleted: boolean;
  demo: boolean;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface InputQuestion {
  correct_option: string;
  demo: boolean;
  field: string;
  option_a: string;
  option_a_explanation: string;
  option_b: string;
  option_b_explanation: string;
  option_c: string;
  option_c_explanation: string;
  option_d: string;
  option_d_explanation: string;
  question: string;
}
