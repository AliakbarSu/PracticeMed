<template>
  <v-container fluid>
    <ReadyToSubmitAlert
      @submit="submit"
      v-if="alerts.readyToSubmit"
      @cancel="cancelAlert('readyToSubmit')"
    />
    <SelectOptionAlert
      v-if="alerts.selectOption"
      @cancel="cancelAlert('selectOption')"
    />
    <TimeOverAlert
      v-if="alerts.timeOver"
      @cancel="cancelAlert('timeOver')"
      @view="viewResults"
    />
    <div class="test">
      <SkeletonLoading v-if="loading" />
      <Instructions @start="start" :open="!testStarted" />
      <div class="content" v-if="testStarted">
        <div class="overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <TimeDisplay :time="timeRemained" />
            <TimeProgressBar :timeElapsed="timeElapsed" />
          </div>
        </div>

        <div class="mt-6 overflow-hidden rounded-lg bg-white shadow">
          <div class="px-4 py-5 sm:p-6">
            <QuestionComponent :question="question" />
            <!-- <CircularTimer/> -->
            <Options @select="select" :options="question.options" />
          </div>
        </div>
        <QuestionControls
          :canSkip="canSkip"
          @next="next"
          @skip="skip"
          @end="endTestAlert"
        />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
// import { questions } from '../../../dummyData'
import Instructions from './components/instructions/instructions.vue'
// import Circle8 from 'vue-loading-spinner/src/components/Circle8'
import ProgressCircular from '@/components/UI/progress-circular/progressCircular.vue'
import TimeProgressBar from './components/UI/time-progress-bar/timeProgressBar.vue'
import QuestionComponent from './components/UI/question/question.vue'
import Options from './components/UI/options/options.vue'
import QuestionControls from './components/UI/question-controls/questionControls.vue'
import TimeDisplay from './components/UI/time-display/time-display.vue'
import { defineComponent } from 'vue'

import axios from 'axios'
import type { Test, SubmittedAnswer, Answer } from '@/types/test'
import type { Option, Question } from '@/types/question'
import ReadyToSubmitAlert from './components/alerts/readyToSubmit.vue'
import SelectOptionAlert from './components/alerts/selectOption.vue'
import TimeOverAlert from './components/alerts/timeOver.vue'
import SkeletonLoading from './components/UI/loading/skeleton.vue'

interface TestInProgress extends Omit<Test, 'questions'> {
  questions: QuestionInProgress[]
  start_at: number
  end_at: number
  lastIndex: number
}

export interface QuestionInProgress extends Question {
  number: number
  start_at: number
  submitted: boolean
  skipped: boolean
  isLast: boolean
  isFirst: boolean
}

export interface Alerts {
  timeOver: boolean
  selectOption: boolean
  readyToSubmit: boolean
}

export default defineComponent({
  async created() {
    await this.loadTest()
    this.numberQuestions()
  },
  data: () => {
    return {
      skipping: false,
      test: {} as TestInProgress,
      currentQuestionIndex: undefined as number | undefined,
      submittedAnswers: [] as Answer[],
      selectedOption: {} as Option,
      testEndsIn: 0,
      interval: 0,
      timeLimit: 1.26e7,
      timeRemained: { h: 0, m: 0, s: 0, mil: 0 },
      isTimeOver: false,
      loading: false,
      alerts: {
        timeOver: false,
        selectOption: false,
        readyToSubmit: false,
        endTest: false
      } as Alerts
    }
  },
  components: {
    Instructions,
    // Circle8,
    ProgressCircular,
    TimeProgressBar,
    QuestionComponent,
    Options,
    QuestionControls,
    TimeDisplay,
    ReadyToSubmitAlert,
    SelectOptionAlert,
    TimeOverAlert,
    SkeletonLoading
  },
  methods: {
    async loadTest() {
      this.loading = true
      const testId = this.$route.params.id
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/tests/${testId}/load`
        )
        const test = JSON.parse(response.data.body) as TestInProgress
        this.test = {
          ...test,
          lastIndex: test.questions.length - 1
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async submit() {
      const payload: SubmittedAnswer = {
        test_id: this.test.id,
        answers: this.submittedAnswers,
        start_at: this.test.start_at,
        end_at: new Date().getTime()
      }
      console.log(payload)
      return
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/tests/${this.test.id}/submit`,
        payload
      )
      this.viewResults()
    },
    start() {
      this.setTimer()
      const now = new Date().getTime()
      this.test.start_at = now
      this.currentQuestionIndex = 0
      this.sortQuestions()
      this.test.questions = this.test.questions.map((question, index) => {
        return index === this.currentQuestionIndex
          ? {
              ...question,
              start_at: now
            }
          : question
      })
    },
    setTimer() {
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.testEndsIn = this.timeLimit + new Date().getTime()
      this.interval = setInterval(() => {
        const now = new Date().getTime()
        const t = this.testEndsIn - now
        this.timeRemained.h = Math.floor(
          (t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        this.timeRemained.m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
        this.timeRemained.s = Math.floor((t % (1000 * 60)) / 1000)
        this.timeRemained.mil = t
        1.2528e7
        if (t < 0) {
          clearInterval(this.interval)
          this.isTimeOver = true
          // this.$swal
          //   .fire('Time Over', 'Your time is over!', 'error')
          //   .then(() => {
          //     this.calculateResults()
          //   })
        }
      }, 100) as any as number
    },
    setAlert(key: keyof Alerts) {
      this.alerts[key] = true
    },
    cancelAlert(key: keyof Alerts) {
      this.alerts[key] = false
    },
    alertSubmit(action: string) {
      if (action === 'end') {
        this.submit()
      }
    },
    viewResults() {
      this.$router.push(`/results/${this.test.id}`)
    },
    endTestAlert() {
      this.setAlert('readyToSubmit')
    },
    select(option: Option) {
      this.selectedOption = option
    },
    skip() {
      this.test.questions = this.test.questions.map((question) => {
        return question.id === this.question.id
          ? { ...question, skipped: true }
          : question
      })
      this.skipping = true
      this.nextQuestion()
    },
    next() {
      if (!this.selectedOption.id) {
        this.setAlert('selectOption')
        return
      }
      const submittedAnswers: Answer = {
        question_id: this.question.id,
        option_id: this.selectedOption.id,
        start_at: this.question.start_at,
        end_at: new Date().getTime()
      }
      this.submittedAnswers.push(submittedAnswers)
      this.selectedOption = {} as Option
      this.nextQuestion()
    },
    nextQuestion() {
      this.sortQuestions()
      if (this.question.isLast) {
        this.endTestAlert()
        return
      }
      if (this.skipping && this.question.isFirst) {
        this.currentQuestionIndex = 0
      } else if (!this.skipping) {
        this.currentQuestionIndex = (this.currentQuestionIndex || 0) + 1
      }
      this.skipping = false
    },
    numberQuestions() {
      if (!this.test.id) return
      this.test.questions = this.test.questions.map((question, index) => ({
        ...question,
        number: index + 1
      }))
    },
    sortQuestions() {
      const sortedQuestions = this.test.questions.sort((a, b) => {
        if (a.skipped && !b.skipped) {
          return 1
        } else if (!a.skipped && b.skipped) {
          return -1
        } else {
          return a.number - b.number
        }
      })
      this.test.questions = sortedQuestions
      this.indexQuestions()
    },
    indexQuestions() {
      this.test.questions = this.test.questions.map((question, index) => {
        return {
          ...question,
          isLast: index === this.test.questions.length - 1,
          isFirst: index === 0
        }
      })
    }
  },
  watch: {
    timeElapsed() {
      if (this.timeElapsed === 0) {
        this.submit()
      }
    }
  },
  computed: {
    canSkip() {
      return !this.question.skipped
    },
    question() {
      return this.test.questions[this.currentQuestionIndex || 0]
    },
    testStarted(): boolean {
      return this.currentQuestionIndex !== undefined
    },
    timeElapsed() {
      return (
        100 - ((this.timeLimit - this.timeRemained.mil) / this.timeLimit) * 100
      )
    }
  }
})
</script>
