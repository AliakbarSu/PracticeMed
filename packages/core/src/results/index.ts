import { Question } from "../../types/Question";
import { v4 as uuidv4 } from "uuid";
import {
  AnalyzedAnswer,
  QuestionHistory,
  Results,
  SubmittedAnswer,
  TestPerformanceResult,
  UserSubmittedResult,
} from "../../types/Result";
import { Examination } from "../../types/Test";
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
  const questionsHistory: QuestionHistory[] = submittedTest.answers.map(
    (answer) => {
      const question = loadedTest.questions.find(
        ({ _id }) => _id === answer.question_id,
      ) as Question;
      return {
        question: question.text,
        selected_option: answer.option_id,
        correct_option: {
          id: question.correct_option.id,
          alpha: question.correct_option.alpha,
          text: question.correct_option.text,
        },
        options: question.options.map((option) => ({
          id: option.id,
          alpha: option.alpha,
          option: option.text,
          selected: answer.option_id,
        })),
      };
    },
  );
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
    questionsHistory,
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
}): Promise<Results> => {
  const user_data = await getUser(user_id);
  const { results = [] } = user_data;
  const result_id = raw_result?.id || null;

  delete raw_result?.user_id;

  let updated_result: Results | null = null;

  const existing_result = results.find(({ id }) => id == result_id);
  if (existing_result) {
    updated_result = {
      ...existing_result,
      stats: result.stats,
      result: result.result,
      questionsHistory: result.questionsHistory,
    };
  } else {
    updated_result = {
      ...result,
      ...raw_result,
      timestamp: Date.now(),
    } as Results;
  }

  if (!updated_result) {
    throw new Error("Test not found");
  }

  const updated_results = results.map((r) =>
    r.id === result_id ? updated_result : r,
  );

  if (!existing_result) {
    updated_results.push(updated_result);
  }
  const updated_user_data = {
    ...user_data,
    results: updated_results as Results[],
  };
  await updateUser(user_id, updated_user_data);
  return updated_result;
};
