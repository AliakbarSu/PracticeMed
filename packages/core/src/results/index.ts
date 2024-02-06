import { Question } from "../../types/Question";
import { v4 as uuidv4 } from "uuid";
import {
  AnalyzedAnswer,
  SubmittedAnswer,
  TestPerformanceResult,
  UserSubmittedResult,
} from "../../types/Result";
import { Examination } from "../../types/Test";
import { User } from "../../types/User";
import { getUser, updateUser } from "../model/users";
import { getTest } from "../test";

import {
  calculateAverageTimeTaken,
  calculateCorrectAnswersByMinuteInterval,
  calculateCorrectAnswersCount,
  calculateCorrectAnswersCountPerField,
  calculateFieldsAverageTime,
  calculateIncorrectAnswersCount,
  calculateIncorrectAnswersCountPerField,
  calculatePercentageCorrectByField,
  calculatePercentageIncorrectByField,
  calculatePercentageOfCorrectAnswers,
  calculatePercentageOfIncorrectAnswers,
  calculateSpeedByMinuteIntervals,
  calculateTestResult,
  calculateTimeTaken,
  calculateTimeTakenPerCategory,
  calculateTotalPoint,
  calculateTotalPointPerCategory,
  isCorrectOption,
} from "./calculations";

const analyzeAnswer = (
  data: SubmittedAnswer[],
  test: Examination,
): AnalyzedAnswer[] => {
  const questions = test.questions;
  return data.map((answer) => {
    const { question_id } = answer;
    const timeTaken = calculateTimeTaken(answer).timeTaken;
    const question = questions.find(
      ({ _id }) => _id === question_id,
    ) as Question;
    const correct = isCorrectOption(answer, question);
    return {
      ...answer,
      ...question,
      timeTaken,
      correct,
    };
  });
};

export const analyze = async (
  submittedTest: UserSubmittedResult,
): Promise<TestPerformanceResult> => {
  const { test_id, answers } = submittedTest;
  const loadedTest = await getTest(test_id);
  const analyzedAnswers = analyzeAnswer(answers, loadedTest);
  const totalPoints = calculateTotalPoint(analyzedAnswers);
  const averageTimeTaken = calculateAverageTimeTaken(analyzedAnswers);
  const averageTimeTakenPerField =
    calculateTimeTakenPerCategory(analyzedAnswers);
  const fieldsAverageTime = calculateFieldsAverageTime(analyzedAnswers);
  const totalPointsPerField = calculateTotalPointPerCategory(analyzedAnswers);
  // Percentages
  const correctResponseRate =
    calculatePercentageOfCorrectAnswers(analyzedAnswers);
  const incorrectResponseRate =
    calculatePercentageOfIncorrectAnswers(analyzedAnswers);
  const correctResponseRatePerField =
    calculatePercentageCorrectByField(analyzedAnswers);
  const incorrectResponseRatePerField =
    calculatePercentageIncorrectByField(analyzedAnswers);

  // Counts
  const correctResponseCount = calculateCorrectAnswersCount(analyzedAnswers);
  const incorrectResponseCount =
    calculateIncorrectAnswersCount(analyzedAnswers);

  const correctResponseCountPerField =
    calculateCorrectAnswersCountPerField(analyzedAnswers);
  const incorrectResponseCountPerField =
    calculateIncorrectAnswersCountPerField(analyzedAnswers);

  // Time performace
  const correctAnswersByMinuteInterval =
    calculateCorrectAnswersByMinuteInterval(
      submittedTest.start_at,
      submittedTest.end_at,
      analyzedAnswers,
    );
  const speedByMinuteInterval = calculateSpeedByMinuteIntervals(
    submittedTest.start_at,
    submittedTest.end_at,
    analyzedAnswers,
  );
  const result = calculateTestResult(totalPoints, loadedTest.passingPoint);
  return {
    id: uuidv4(),
    test_id,
    demo: loadedTest.demo,
    stats: {
      testScore: loadedTest.points,
      totalPoints,
      averageTimeTaken,
      averageTimeTakenPerField,
      fieldsAverageTime,
      totalPointsPerField,
      correctResponseRate,
      incorrectResponseRate,
      correctResponseCount,
      incorrectResponseCount,
      correctResponseRatePerField,
      incorrectResponseRatePerField,
      correctResponseCountPerField,
      correctAnswersByMinuteInterval,
      incorrectResponseCountPerField,
      speedByMinuteInterval,
    },
    result,
    timestamp: Date.now(),
  };
};

export const saveOrUpdateTestResult = async ({
  user_id,
  result,
  raw_result,
}: {
  user_id: string;
  result: TestPerformanceResult;
  raw_result?: UserSubmittedResult & { user_id?: string; id?: string };
}): Promise<User> => {
  const user_data = await getUser(user_id);
  const { tests_history = [], tests } = user_data;

  delete raw_result?.user_id;
  const updated_tests_history = tests_history.map((test) =>
    test.id == result.id ? raw_result : test,
  );

  const updated_tests = tests.map((test) =>
    test.id == raw_result?.id
      ? { ...result, id: test.id, timestamp: test.timestamp }
      : test,
  );

  if (!updated_tests_history.find((test) => test.id == raw_result?.id)) {
    updated_tests_history.push(raw_result);
  }

  if (!updated_tests.find((test) => test.id == raw_result?.id)) {
    updated_tests.push(result);
  }

  const updated_user_data = {
    ...user_data,
    tests: updated_tests,
    tests_history: updated_tests_history,
  };
  return updateUser(user_id, updated_user_data);
};
