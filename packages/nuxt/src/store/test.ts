import type { Option, Question } from '@/types/question'
import type { Answer, SubmittedAnswer, Test } from '@/types/test'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
// import { mockTest } from '../data/mockQuestions'
import { useUIStore } from './UI'
import { useAuthStore } from './auth'
import { loadTestApi, loadDemoTestApi, submitTestApi } from '../api/testApi'

export interface TestInProgress extends Omit<Test, 'questions'> {
  questions: QuestionInProgress[]
  start_at: number
  end_at: number
  lastIndex: number
  instructions: string
  completed: boolean
}

export interface QuestionInProgress extends Question {
  number: number
  start_at: number
  submitted: boolean
  skipped: boolean
  isLast: boolean
  isFirst: boolean
}

export const useTestStore = defineStore('test', () => {
  const authStore = useAuthStore()
  const UIStore = useUIStore()

  const previewMode = ref(false)
  const demoMode = ref(false)
  const loading = ref(false)
  const submitting = ref(false)
  const hasTestsRemaning = ref(true)
  const test = ref<TestInProgress | null>(null)
  const questions = ref<Question[]>([])
  const resultId = ref<string | null>(null)
  const skippedQuestions = ref<QuestionInProgress[]>([])
  const currentQuestionIndex = ref(0)
  const selectedOption = ref<Option | null>(null)
  const submittedAnswers = ref<Answer[]>([])
  const openedAt = ref<number>(0)
  const testDuration = ref(1.26e7)
  const testEnded = ref(false)
  const testStarted = ref(false)
  const instructions = ref<string | null>(null)
  const timeRemained = ref({ h: 0, m: 0, s: 0, mil: 0 })
  const testEndsIn = ref(0)
  const isTimeOver = ref(false)
  const interval = ref<number | null>(null)
  const completed = ref(false)

  function $reset() {
    test.value = null
    resultId.value = null
    skippedQuestions.value = []
    currentQuestionIndex.value = 0
    selectedOption.value = null
    submittedAnswers.value = []
    openedAt.value = 0
    testEnded.value = false
    testStarted.value = false
    instructions.value = null
    timeRemained.value = { h: 0, m: 0, s: 0, mil: 0 }
    testEndsIn.value = 0
    isTimeOver.value = false
    interval.value = null
    previewMode.value = false
    demoMode.value = false
    submitting.value = false
    loading.value = false
    completed.value = false
  }

  onBeforeUnmount(() => {
    $reset()
    if (interval.value) {
      clearInterval(interval.value)
    }
  })

  const questionsIndexLength = computed(() =>
    test.value ? test.value?.questions.length - 1 : 0
  )
  const isLastQuestion = computed(
    () => questionsIndexLength.value == currentQuestionIndex.value
  )
  const timeElapsed = computed(() => {
    const timeElapsed =
      100 -
      ((testDuration.value - timeRemained.value.mil) / testDuration.value) * 100
    return timeElapsed < 0 ? 0 : timeElapsed
  })
  const question = computed(() => {
    if (test.value) {
      const isLast = isLastQuestion.value && skippedQuestions.value.length === 0
      return {
        ...test.value.questions[currentQuestionIndex.value],
        number: currentQuestionIndex.value + 1,
        isFirst: currentQuestionIndex.value === 0,
        isLast
      }
    } else {
      return {} as QuestionInProgress
    }
  })

  const loadTest = async (testId: string) => {
    try {
      $reset()
      loading.value = true
      UIStore.startLoadingTest()
      const result = await loadTestApi(testId)
      test.value = {
        ...result,
        lastIndex: result.questions.length - 1
      }
      instructions.value = result.instructions
    } catch (err: any) {
      UIStore.error = new Error(err as string)
      const statusCode = err.response?.status
      if (statusCode === 403) {
        hasTestsRemaning.value = false
      }
    } finally {
      loading.value = false
      UIStore.stopLoadingTest()
    }
  }

  const loadDemoTest = async () => {
    try {
      $reset()
      UIStore.startLoadingTest()
      loading.value = true
      demoMode.value = true
      previewMode.value = true
      const result = await loadDemoTestApi()
      questions.value = result.questions
      test.value = {
        ...(result as TestInProgress),
        lastIndex: result.questions.length - 1
      }
      instructions.value = result.instructions
    } catch (err: any) {
      UIStore.error = new Error(err as string)
      const statusCode = err.response?.status
      if (statusCode === 403) {
        hasTestsRemaning.value = false
      }
    } finally {
      loading.value = false
      UIStore.stopLoadingTest()
    }
  }

  const start = () => {
    if (!test.value) return
    if (!demoMode.value) setTimer()
    const now = new Date().getTime()
    test.value.start_at = now
    currentQuestionIndex.value = 0
    openedAt.value = now
    testStarted.value = true
  }

  const setDemoQuestions = () => {
    if (!test.value) return
    test.value.questions = questions.value.splice(0, 5) as QuestionInProgress[]
  }

  const setAllQuestions = () => {
    if (!test.value) return
    test.value.questions = questions.value as QuestionInProgress[]
  }

  const select = (option: Option) => {
    selectedOption.value = option
  }

  const next = () => {
    if (!selectedOption.value) return
    const submittedAnswer: Answer = {
      question_id: question.value.id,
      option_id: selectedOption.value.alpha,
      start_at: openedAt.value,
      end_at: new Date().getTime()
    }
    submittedAnswers.value = [...submittedAnswers.value, submittedAnswer]
    openedAt.value = new Date().getTime()
    nextQuestion()
  }

  const nextQuestion = () => {
    if (!test.value) return
    selectedOption.value = null
    if (isLastQuestion.value) {
      if (skippedQuestions.value.length > 0) {
        currentQuestionIndex.value = 0
        test.value.questions = [...skippedQuestions.value]
        skippedQuestions.value = []
      } else {
        submit()
        testEnded.value = true
        completed.value = true
      }
    } else {
      currentQuestionIndex.value += 1
    }
  }

  const skip = () => {
    if (!test.value) return
    question.value.skipped = true
    skippedQuestions.value = [...skippedQuestions.value, question.value]
    nextQuestion()
  }

  const setTimer = () => {
    if (interval.value !== null) {
      clearInterval(interval.value)
    }
    if (!test.value) return
    testDuration.value = test.value.timeLimit * 3.6e6
    testEndsIn.value = testDuration.value + new Date().getTime()
    interval.value = setInterval(() => {
      const now = new Date().getTime()
      const t = testEndsIn.value - now < 0 ? 0 : testEndsIn.value - now
      timeRemained.value.h = Math.floor(
        (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      timeRemained.value.m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
      timeRemained.value.s = Math.floor((t % (1000 * 60)) / 1000)
      timeRemained.value.mil = t
      1.2528e7
      if (t <= 0 && interval.value !== null) {
        clearInterval(interval.value)
        isTimeOver.value = true
      }
    }, 100) as any as number
  }

  const submit = async () => {
    if (!test.value) return
    if (previewMode.value) {
      testEnded.value = true
      return
    }
    const payload: SubmittedAnswer = {
      test_id: test.value.id,
      answers: submittedAnswers.value,
      start_at: test.value.start_at,
      end_at: new Date().getTime()
    }
    submitting.value = true
    try {
      resultId.value = (await submitTestApi(test.value.id, payload)) as string
    } catch (err) {
      UIStore.error = new Error(err as string)
    } finally {
      submitting.value = false
    }
  }

  watch(timeElapsed, () => {
    if (timeElapsed.value === 0) {
      if (!previewMode.value) submit()
      testEnded.value = true
    }
  })

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
    selectedOption,
    test,
    question,
    instructions,
    testStarted,
    testEnded,
    hasTestsRemaning,
    loading,
    submitting,
    timeElapsed,
    timeRemained,
    isTimeOver,
    previewMode,
    demoMode,
    resultId,
    completed,
    $reset
  }
})
