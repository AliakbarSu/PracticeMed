import { ResultEnum, type Stats } from "mpt-types/Result";
import type { Answer } from "./test";

export interface QuestionHistory {
  question: string;
  selected_option: string;
  correct_option: {
    id: string;
    alpha: string;
    text: string;
    explanation: string;
  };
  options: {
    id: string;
    alpha: string;
    option: string;
    selected: string;
  }[];
}

export interface Feedback {
  aspect: string;
  recommendation: string;
}

export interface Results {
  demo: boolean;
  id: string;
  test_id: string;
  stats: Stats;
  result: ResultEnum;
  start_at: number;
  end_at: number;
  answers: Answer[];
  feedbacks: Feedback[];
  questionsHistory: QuestionHistory[];
  timestamp: number;
}
