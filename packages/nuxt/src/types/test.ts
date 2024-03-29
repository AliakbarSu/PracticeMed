import type { Question } from "./question";

export enum TestResult {
  pass = "pass",
  fail = "fail",
}

export interface Test {
  id: string;
  name: string;
  questions: Question[];
  thumbnail: { url: string }[];
  description: string;
  type: string;
  instructions: string;
  timeLimit: number;
  demo: false;
}

export interface TestHistory extends Test {
  timestamp: number;
  result: TestResult;
}

export interface Answer {
  start_at: number;
  end_at: number;
  question_id: string;
  option_id: string;
}

export interface SubmittedAnswer {
  id?: string;
  test_id: string;
  start_at: number;
  end_at: number;
  answers: Answer[];
}

export interface Result {
  overallScore: {
    score: number;
    correct: number;
    incorrect: number;
  };
  accuracy: {
    time: number;
    count: number;
  }[];
  speed: {
    time: number;
    answeredIn: number;
  }[];
  categoryBasedScore: {
    category: string;
    percentage: number;
    averageAnsweringTime: number;
    incorrect: number;
    correct: number;
  }[];
}

export enum ResultEnum {
  pass = "pass",
  fail = "fail",
}

export interface Stats {
  testScore: number;
  totalPoints: number;
  totalPointsPerField: { [key: string]: number };
  averageTimeTaken: number;
  fieldsAverageTime: number;
  averageTimeTakenPerField: { [key: string]: number };
  correctResponseRatePerField: {
    [key: string]: number;
  };
  incorrectResponseRatePerField: {
    [key: string]: number;
  };
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
  timestamp: number;
}
