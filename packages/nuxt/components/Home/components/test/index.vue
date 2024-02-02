<template>
  <div class="test mb-12 p-2 bg-white" ref="signupRef" v-if="displayMockTest">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Try our demo mock test
      </h2>
      <p
        class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900"
        v-if="!neesToUpgrade"
      >
        Take our demo mock test to get a feel for the format.
      </p>
    </div>
    <HomeComponentsTestViewResultsRedirect :testId="testStore.resultId" />
    <TestComponentsUILoadingSkeleton v-if="UIStore.test.loading" />
    <HomeComponentsTestSignupMessage v-if="needToSignup" />
    <HomeComponentsTestSignupModal v-if="needToSignup" />
    <HomeComponentsTestUpgradeMessage v-if="neesToUpgrade" />
    <TestComponentsAlertsReadyToSubmit
      @submit="testStore.submit"
      v-if="flags.readyToSubmit"
      @cancel="flags.readyToSubmit = false"
    />
    <TestComponentsAlertsSelectOption
      v-if="flags.selectOption"
      @cancel="flags.selectOption = false"
    />
    <div class="content" v-if="displayTestConsole && !neesToUpgrade">
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
import { usePlansStore } from '../../../../src/store/plans'

export interface Flags {
  endTest: boolean
  timeOver: boolean
  selectOption: boolean
  readyToSubmit: boolean
}

const questionRef = ref<HTMLDivElement | null>(null)
const signupRef = ref<HTMLDivElement | null>(null)

const flags = reactive({
  timeOver: false,
  selectOption: false,
  readyToSubmit: false,
  endTest: false
})

const testStore = useTestStore()
const appStore = useAppStore()
const authStore = useAuthStore()
const UIStore = useUIStore()
const planStore = usePlansStore()

onMounted(async () => {
  await testStore.loadDemoTest()
})

onBeforeRouteLeave(() => {
  testStore.resultId = null
})

const needToSignup = computed(
  () => !authStore.isAuthenticated && testStore.testEnded
)
const displayTestConsole = computed(
  () => !testStore.loading && !needToSignup.value && testStore.testStarted
)

const displayMockTest = computed(
  () => !planStore.userHasActivePlan || appStore.canTryMockTest
)

const neesToUpgrade = computed(
  () => !planStore.userHasActivePlan && !appStore.canTryMockTest
)

const next = () => {
  if (testStore.selectedOption == null) {
    flags.selectOption = true
  } else {
    testStore.next()
    questionRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
}

const endTest = () => {
  testStore.submit()
}

watch(
  [() => authStore.isAuthenticated, () => testStore.test],
  ([isAuth, test]) => {
    if (isAuth && test) {
      testStore.setAllQuestions()
      testStore.start()
      testStore.demoMode = false
    } else {
      testStore.setDemoQuestions()
      testStore.start()
    }
  },
  { immediate: true }
)
</script>
