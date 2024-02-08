import { Question } from "./Question";
import { SubmittedAnswer } from "./Result";

export interface Examination {
  id: string;
  name: string;
  type: string;
  description: string;
  thumbnail: { url: string }[];
  questions: Question[];
  points: number;
  passingPoint: number;
  breaks: string;
  timeLimit: number;
  instructions: string;
  questionsNumber: number;
  trial: boolean;
  demo: boolean;
}

export enum TestStatus {
  "IN_PROGRESS" = "IN_PROGRESS",
  "COMPLETED" = "COMPLETED",
}

export interface TestObject {
  _id?: string;
  test_id: string;
  user_id: string;
  status: TestStatus;
  submitted_answers: SubmittedAnswer[];
  results: any[];
  timezone: string;
  started_at: string;
  ended_at: string;
}
