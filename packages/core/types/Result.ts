import { Question } from "./Question";

export enum ResultEnum {
  pass = "pass",
  fail = "fail",
}

export interface AnalyzedAnswer extends SubmittedAnswer, Question {
  correct: boolean;
  timeTaken: number;
}

export interface SubmittedAnswer {
  question_id: string;
  option_id: string;
  start_at: string;
  end_at: string;
}

export interface UserSubmittedResult {
  test_id: string;
  start_at: string;
  end_at: string;
  answers: SubmittedAnswer[];
}

export interface QuestionHistory {
  question: string;
  selected_option: string;
  correct_option: {
    id: string;
    alpha: string;
    text: string;
  };
  options: {
    id: string;
    alpha: string;
    option: string;
    selected: string;
  }[];
}

export interface Stats {
  testScore: number;
  totalPoints: number;
  totalPointsPerField: { [key: string]: number };
  averageTimeTaken: number;
  fieldsAverageTime: number;
  averageTimeTakenPerField: { [key: string]: number };
  correctResponseRatePerField: { [key: string]: number };
  incorrectResponseRatePerField: { [key: string]: number };
  correctResponseCountPerField: { [key: string]: number };
  incorrectResponseCountPerField: { [key: string]: number };
  correctResponseRate: number;
  incorrectResponseRate: number;
  correctResponseCount: number;
  incorrectResponseCount: number;
  correctAnswersByMinuteInterval: { [key: string]: number };
  speedByMinuteInterval: { [key: string]: number };
}

export interface TestPerformanceResult {
  demo: boolean;
  id: string;
  test_id: string;
  stats: Stats;
  result: ResultEnum;
  questionsHistory: QuestionHistory[];
  timestamp: number;
}

export interface Results {
  demo: boolean;
  id: string;
  test_id: string;
  stats: Stats;
  result: ResultEnum;
  start_at: string;
  end_at: string;
  answers: SubmittedAnswer[];
  timestamp: number;
}
