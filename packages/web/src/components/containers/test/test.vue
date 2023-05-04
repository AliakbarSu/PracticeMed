<template>
  <v-container fluid>
    <ReadyToSubmitAlert
      @submit="testStore.submit"
      v-if="alerts.readyToSubmit"
      @cancel="cancelAlert('readyToSubmit')"
    />
    <SelectOptionAlert
      v-if="alerts.selectOption"
      @cancel="cancelAlert('selectOption')"
    />
    <TimeOverAlert
      v-if="alerts.timeOver"
      :submitting="submitting"
      @cancel="cancelAlert('timeOver')"
      @view="viewResults"
    />
    <div class="test">
      <SkeletonLoading v-if="loading" />
      <Instructions
        v-if="!loading && hasTestsRemaning && !testStarted"
        @start="start"
        :test="test"
      />
      <UpgradePlanCTA v-if="!hasTestsRemaning" />
      <UpgradePlanCTA
        v-if="alerts.upgrade"
        :goBack="false"
        heading="Unlock Unlimited Access with Our Premium Plan!"
        description="Congratulations on completing the preview test! To gain access to the full range of tests and elevate your learning experience, upgrade to our Premium Plan now."
      />
      <div class="content" v-if="testStarted && !alerts.upgrade && !loading">
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
            <Options @select="testStore.select" :options="question.options" />
          </div>
        </div>
        <QuestionControls
          :canSkip="!question.skipped"
          @next="next"
          @skip="testStore.skip"
          @end="endTestAlert"
        />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import Instructions from './components/instructions/instructions.vue'
import TimeProgressBar from './components/UI/time-progress-bar/timeProgressBar.vue'
import QuestionComponent from './components/UI/question/question.vue'
import Options from './components/UI/options/options.vue'
import QuestionControls from './components/UI/question-controls/questionControls.vue'
import TimeDisplay from './components/UI/time-display/time-display.vue'
import ReadyToSubmitAlert from './components/alerts/readyToSubmit.vue'
import SelectOptionAlert from './components/alerts/selectOption.vue'
import TimeOverAlert from './components/alerts/timeOver.vue'
import SkeletonLoading from './components/UI/loading/skeleton.vue'
import UpgradePlanCTA from './components/UI/CTA/UpgradeCTA.vue'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTestStore } from '@/store/test'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export interface Alerts {
  timeOver: boolean
  selectOption: boolean
  readyToSubmit: boolean
  upgrade: boolean
}

const router = useRouter()
const route = useRoute()

const testStore = useTestStore()

const {
  timeElapsed,
  timeRemained,
  submitting,
  loading,
  question,
  test,
  testStarted,
  hasTestsRemaning,
  isTimeOver,
  previewMode,
  testEnded,
  selectedOption,
  resultId
} = storeToRefs(testStore)

const alerts = reactive({
  timeOver: false,
  selectOption: false,
  readyToSubmit: false,
  endTest: false,
  upgrade: false
} as Alerts)

const testId = (route.params.id as string) || ''
const preview = route.query.preview === 'true'
if (preview) {
  testStore.loadMockTest()
} else {
  testStore.loadTest(testId)
}

const setAlert = (key: keyof Alerts) => {
  alerts[key] = true
}
const cancelAlert = (key: keyof Alerts) => {
  alerts[key] = false
}
const viewResults = () => {
  router.push(`/results/${resultId.value}`)
}
const endTestAlert = () => {
  setAlert('readyToSubmit')
}

const start = () => {
  testStore.start()
}

const next = () => {
  if (selectedOption.value == null) {
    setAlert('selectOption')
  } else {
    testStore.next()
  }
}

watch(isTimeOver, () => {
  if (isTimeOver && !previewMode.value) {
    setAlert('timeOver')
  } else if (isTimeOver && !previewMode.value) {
    setAlert('upgrade')
  }
})

watch(testEnded, () => {
  if (testEnded.value && previewMode.value) {
    setAlert('upgrade')
  }
})

watch(resultId, () => {
  if (resultId.value) {
    viewResults()
  }
})
</script>
