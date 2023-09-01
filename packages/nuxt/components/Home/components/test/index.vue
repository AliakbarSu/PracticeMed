<template>
  <div class="test mb-12 p-2 bg-white">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Try Our Demo Mock Test
      </h2>
      <p class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900">
        Take our demo mock test to get a feel for the format, experience a
        simulated testing environment, and instantly review your performance.
      </p>
    </div>
    <TestComponentsAlertsReadyToSubmit
      @submit="testStore.submit"
      v-if="alerts.readyToSubmit"
      @cancel="cancelAlert('readyToSubmit')"
    />
    <TestComponentsAlertsSelectOption
      v-if="alerts.selectOption"
      @cancel="cancelAlert('selectOption')"
    />
    <div class="content" v-if="testStarted && !alerts.upgrade && !loading">
      <div class="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div class="px-4 py-5 sm:p-6" ref="questionRef">
          <TestComponentsUIQuestion :question="question" />
          <TestComponentsUIOptions
            @select="testStore.select"
            :options="question.options"
          />
        </div>
      </div>
      <TestComponentsUIQuestionControls
        :canSkip="!question.skipped"
        @next="next"
        @skip="testStore.skip"
        @end="endTestAlert"
        class="mr-12"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTestStore } from '../../../../src/store/test'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export interface Alerts {
  timeOver: boolean
  selectOption: boolean
  readyToSubmit: boolean
  upgrade: boolean
}

const questionRef = ref(null)
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
  selectedOption
} = storeToRefs(testStore)

const alerts = reactive({
  timeOver: false,
  selectOption: false,
  readyToSubmit: false,
  endTest: false,
  upgrade: false
} as Alerts)

testStore.loadDemoTest()

setTimeout(() => {
  testStore.start()
}, 0)

const setAlert = (key: keyof Alerts) => {
  alerts[key] = true
}
const cancelAlert = (key: keyof Alerts) => {
  alerts[key] = false
}
const viewResults = () => {
  // router.push(`/results/${resultId.value}`)
}
const endTestAlert = () => {
  setAlert('readyToSubmit')
}

const next = () => {
  if (selectedOption.value == null) {
    setAlert('selectOption')
  } else {
    testStore.next()
    ;(questionRef.value as any).scrollIntoView({ behavior: 'smooth' })
  }
}

watch(testEnded, () => {
  if (testEnded.value && previewMode.value) {
    router.push(`/results/demo_test`)
  }
})
</script>
