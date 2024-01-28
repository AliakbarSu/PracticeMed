<template>
  <div class="test mb-12 p-2 bg-white" ref="signupRef">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Try our demo mock test
      </h2>
      <p class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900">
        Take our demo mock test to get a feel for the format.
      </p>
    </div>
    <TestComponentsUILoadingSkeleton v-if="UIStore.test.loading" />
    <HomeComponentsTestSignupMessage v-if="needToSignup" />
    <HomeComponentsTestSignupModal v-if="needToSignup" />
    <TestComponentsAlertsReadyToSubmit
      @submit="testStore.submit"
      v-if="flags.readyToSubmit"
      @cancel="flags.readyToSubmit = false"
    />
    <TestComponentsAlertsSelectOption
      v-if="flags.selectOption"
      @cancel="flags.selectOption = false"
    />
    <div class="content" v-if="displayTestConsole">
      <div class="mt-6 overflow-hidden rounded-lg bg-white shadow">
        <div class="px-4 py-5 sm:p-6" ref="questionRef">
          <TestComponentsUIQuestion :question="testStore.question" />
          <TestComponentsUIOptions
            @select="testStore.select"
            :options="testStore.question.options"
          />
        </div>
      </div>
      <TestComponentsUIQuestionControls
        :canSkip="!testStore.question.skipped"
        :submitting="testStore.submitting"
        @next="next"
        @skip="testStore.skip"
        @end="endTest"
        class="mr-12"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useTestStore } from '../../../../src/store/test'
import { useAppStore } from '../../../../src/store/main'
import { useAuthStore } from '../../../../src/store/auth'
import { useUIStore } from '../../../../src/store/UI'
import { useRouter } from 'vue-router'

export interface Flags {
  endTest: boolean
  timeOver: boolean
  selectOption: boolean
  readyToSubmit: boolean
  upgrade: boolean
}

const questionRef = ref(null)
const signupRef = ref(null)

const flags = reactive({
  timeOver: false,
  selectOption: false,
  readyToSubmit: false,
  endTest: false,
  upgrade: false
})

const testStore = useTestStore()
const appStore = useAppStore()
const authStore = useAuthStore()
const UIStore = useUIStore()
const router = useRouter()

const needToSignup = computed(
  () => !authStore.isAuthenticated && testStore.testEnded
)
const displayTestConsole = computed(
  () => !testStore.loading && !needToSignup.value && testStore.testStarted
)

onMounted(async () => {
  await testStore.loadDemoTest()
  if (authStore.isAuthenticated) {
    testStore.setAllQuestions()
    testStore.start()
  } else {
    testStore.setDemoQuestions()
    testStore.start()
  }
})

const viewResults = () => {
  router.push(`/results/demo_test`)
}
const next = () => {
  if (testStore.selectedOption == null) {
    flags.selectOption = true
  } else {
    testStore.next()
    ;(questionRef.value as any).scrollIntoView({ behavior: 'smooth' })
  }
}

const endTest = () => {
  testStore.submit()
  viewResults()
}

watch([testStore, appStore], () => {
  if (
    testStore.testEnded &&
    testStore.previewMode &&
    testStore.completed &&
    authStore.isAuthenticated
  ) {
    router.push(`/results/${testStore.resultId}`)
  }
  if (
    testStore.testEnded &&
    testStore.previewMode &&
    !authStore.isAuthenticated
  ) {
    flags.upgrade = true
    ;(signupRef.value as any).scrollIntoView({
      behavior: 'smooth'
    })
  }
})

watch(authStore, () => {
  if (authStore.isAuthenticated) {
    testStore.setAllQuestions()
    testStore.start()
  } else {
    testStore.setDemoQuestions()
    testStore.start()
  }
})
</script>
