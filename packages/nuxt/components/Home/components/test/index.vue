<template>
  <div class="test mb-12 p-2 bg-white" ref="signupRef">
    <div class="text-center sm:w-2/3 md:1/3 mx-auto">
      <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Try Our Demo Mock Test
      </h2>
      <p class="w-3/4 mx-auto mt-4 text-lg leading-8 text-gray-900">
        Take our demo mock test to get a feel for the format, experience a
        simulated testing environment, and instantly review your performance.
      </p>
    </div>
    <div class="w-full flex justify-center py-5" v-if="UIStore.test.loading">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <HomeComponentsTestSignupMessage v-if="needToSignup" />
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
    viewResults()
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
