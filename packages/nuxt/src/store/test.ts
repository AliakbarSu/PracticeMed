import type { Option, Question } from "@/types/question";
import type { Answer, SubmittedAnswer, Test } from "@/types/test";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useUIStore } from "./UI";
import { loadDemoTestApi, loadTestApi, submitTestApi } from "../api/testApi";
import { useTimer } from "vue-timer-hook";

export interface TestInProgress extends Omit<Test, "questions"> {
  questions: QuestionInProgress[];
  start_at: number;
  end_at: number;
  lastIndex: number;
  instructions: string;
  completed: boolean;
}

export interface QuestionInProgress extends Question {
  number: number;
  start_at: number;
  submitted: boolean;
  skipped: boolean;
  isLast: boolean;
  isFirst: boolean;
}

export const useTestStore = defineStore("test", () => {
  const UIStore = useUIStore();
  const {
    pause: pauseTimer,
    resume: resumeTimer,
    start: startTimer,
    restart: restartTimer,
    hours,
    minutes,
    seconds,
    isRunning,
    isExpired,
  } = useTimer(10, false);

  const previewMode = ref(false);
  const demoMode = ref(false);
  const loading = ref(false);
  const hasTestsRemaning = ref(true);
  const test = ref<Test | null>(null);
  const questions = ref<Question[]>([]);
  const resultId = ref<string | null>(null);
  const skippedQuestions = ref<QuestionInProgress[]>([]);
  const state = reactive<{
    started: boolean;
    ended: boolean;
    started_at: number | null;
    ended_at: number | null;
    submitting: boolean;
    completed: boolean;
  }>({
    started: false,
    ended: false,
    started_at: null,
    ended_at: null,
    completed: false,
    submitting: false,
  });
  const questionIndexes = reactive<{ current: number; last: number }>({
    current: 0,
    last: 0,
  });
  const selectedOption = ref<Option | null>(null);
  const submittedAnswers = ref<Answer[]>([]);
  const openedAt = ref<number>(0);
  const testDuration = ref(0);
  const instructions = ref<string | null>(null);
  const timeRemained = ref({ h: 0, m: 0, s: 0, mil: 0 });
  const testEndsIn = ref(0);
  const isTimeOver = ref(false);
  const timer = computed(() => ({
    hours,
    minutes,
    seconds,
    isRunning: isRunning,
    isExpired: isExpired,
  }));

  const $reset = () => {
    test.value = null;
    resultId.value = null;
    skippedQuestions.value = [];
    selectedOption.value = null;
    submittedAnswers.value = [];
    openedAt.value = 0;
    instructions.value = null;
    timeRemained.value = { h: 0, m: 0, s: 0, mil: 0 };
    testEndsIn.value = 0;
    isTimeOver.value = false;
    previewMode.value = false;
    demoMode.value = false;
    loading.value = false;
  };

  const questionNumber = computed(() => questionIndexes.current + 1);
  const isLastQuestion = computed(
    () => questionIndexes.last == questionIndexes.current,
  );
  const timeElapsed = computed(() => {
    const millisecondsInHour = hours.value * 60 * 60 * 1000;
    const millisecondsInMinute = minutes.value * 60 * 1000;
    const millisecondsInSecond = seconds.value * 1000;
    const totalMilliseconds =
      millisecondsInHour + millisecondsInMinute + millisecondsInSecond;
    return (totalMilliseconds / testDuration.value) * 100;
  });
  const question = computed((): QuestionInProgress => {
    const isLast = isLastQuestion.value && skippedQuestions.value.length === 0;
    const currentQuestion = questions.value[questionIndexes.current];
    return currentQuestion
      ? ({
          ...currentQuestion,
          number: questionNumber.value,
          isFirst: questionIndexes.current === 0,
          isLast,
        } as QuestionInProgress)
      : ({} as QuestionInProgress);
  });

  const loadTest = async (testId: string) => {
    await fetchTest(() => loadTestApi(testId));
  };

  const loadDemoTest = async () => {
    $reset();
    demoMode.value = true;
    previewMode.value = true;
    await fetchTest(loadDemoTestApi);
  };

  const fetchTest = async (api: () => Promise<Test | null>) => {
    try {
      UIStore.startLoadingTest();
      loading.value = true;
      const result = await api();
      if (!result) {
        console.warn("No test found");
        return;
      }
      test.value = result;
      testDuration.value = test.value.timeLimit * 3.6e6;
      testEndsIn.value = testDuration.value + new Date().getTime();
    } catch (err: any) {
      UIStore.error = new Error(err as string);
      const statusCode = err.response?.status;
      if (statusCode === 403) {
        hasTestsRemaning.value = false;
      }
    } finally {
      loading.value = false;
      UIStore.stopLoadingTest();
    }
  };

  const start = () => {
    if (!test.value) return;
    restartTimer(testEndsIn.value, false);
    const now = new Date().getTime();
    state.started_at = now;
    state.started = true;
    questionIndexes.current = 0;
    openedAt.value = now;
    startTimer();
  };

  const resume = () => {
    resumeTimer();
  };

  const pause = () => {
    pauseTimer();
  };

  const setDemoQuestions = () => {
    setQuestions(
      (test?.value?.questions || []).slice(0, 11) as QuestionInProgress[],
    );
  };

  const setAllQuestions = () => {
    setQuestions([
      ...(test?.value?.questions || []),
      ...(questions.value || []).slice(state.started ? 12 : 0, 30),
    ] as QuestionInProgress[]);
  };

  const setQuestions = (data: QuestionInProgress[]) => {
    if (!test.value) return;
    questions.value = data;
    questionIndexes.last = data.length - 1;
  };

  const select = (option: Option) => {
    selectedOption.value = option;
  };

  const next = () => {
    if (!selectedOption.value) return;
    const submittedAnswer: Answer = {
      question_id: question.value._id,
      option_id: selectedOption.value.alpha,
      start_at: openedAt.value,
      end_at: new Date().getTime(),
    };
    submittedAnswers.value = [...submittedAnswers.value, submittedAnswer];
    openedAt.value = new Date().getTime();
    nextQuestion();
  };

  const nextQuestion = () => {
    if (!test.value) return;
    selectedOption.value = null;
    if (isLastQuestion.value) {
      if (skippedQuestions.value.length > 0) {
        questionIndexes.current = 0;
        questions.value = [...skippedQuestions.value];
        skippedQuestions.value = [];
      } else {
        submit();
      }
    } else {
      questionIndexes.current += 1;
    }
  };

  const skip = () => {
    if (!test.value) return;
    question.value.skipped = true;
    skippedQuestions.value = [...skippedQuestions.value, question.value];
    nextQuestion();
  };

  const submit = async () => {
    try {
      state.submitting = true;
      if (test.value && !demoMode.value) {
        const payload: SubmittedAnswer = {
          test_id: test.value.id,
          answers: submittedAnswers.value,
          start_at: state.started_at || 0,
          end_at: new Date().getTime(),
        };
        resultId.value = (await submitTestApi(
          test.value.id,
          payload,
        )) as string;
      }
    } catch (err) {
      UIStore.error = new Error(err as string);
    } finally {
      state.ended = true;
      state.completed = true;
      state.submitting = false;
    }
  };

  watch(timeElapsed, async () => {
    if (timeElapsed.value === 0 && state.started) {
      isTimeOver.value = true;
      if (!previewMode.value) await submit();
      state.ended = true;
    }
  });

  return {
    loadTest,
    loadDemoTest,
    start,
    setDemoQuestions,
    setAllQuestions,
    skip,
    next,
    select,
    submit,
    $reset,
    pause,
    resume,
    selectedOption,
    test,
    question,
    instructions,
    hasTestsRemaning,
    loading,
    timeElapsed,
    timeRemained,
    isTimeOver,
    previewMode,
    demoMode,
    resultId,
    timer,
    state,
  };
});
