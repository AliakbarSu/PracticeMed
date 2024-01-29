<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-8 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tests
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Track your progress by reviewing previous tests or take a new one.
        </p>
        <p class="p-2 flex items-center justify-center">
          <span class="mr-2">View previous tests</span>
          <Switch
            v-model="enabled"
            :class="[
              enabled ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            ]"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              :class="[
                enabled ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              ]"
            />
          </Switch>
        </p>
      </div>
      <div class="w-full flex justify-center py-5" v-if="loading">
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
      <div
        v-if="!loading"
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        :class="{
          'lg:grid-cols-1':
            (previousTests as TestType[]).length <= 0 &&
            state.currentView === 'history'
        }"
      >
        <DashboardComponentsTest
          v-if="state.currentView === 'tests'"
          v-for="test in tests"
          :key="test.id"
          :test="test"
        />
        <DashboardComponentsUICTANoTestHistory
          v-if="
            (previousTests as TestType[]).length <= 0 &&
            state.currentView === 'history'
          "
        />
        <DashboardComponentsTestHistory
          v-if="state.currentView === 'history'"
          v-for="test in previousTests"
          :key="(test as TestType).id"
          :test="test"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'
import type { Test as TestType } from '../../src/types/test'
import { useAppStore } from '../../src/store/main'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import * as Gtag from '../../src/gtag/index'
import { usePlansStore } from '../../src/store/plans'
import { useAuthStore } from '../../src/store/auth'
import { useUIStore } from '../../src/store/UI'
import { watch } from 'vue'
import { Switch } from '@headlessui/vue'

const route = useRoute()
const appStore = useAppStore()
const plansStore = usePlansStore()
const authStore = useAuthStore()
const UIStore = useUIStore()

const { plans } = storeToRefs(plansStore)

const { tests, testsHistory } = storeToRefs(appStore)

const state = reactive<{ currentView: 'tests' | 'history' }>({
  currentView: 'tests'
})

const enabled = ref(false)

const setCurrentView = (view: 'tests' | 'history') => {
  state.currentView = view
}

watch(enabled, () => {
  if (enabled.value) {
    setCurrentView('history')
  } else {
    setCurrentView('tests')
  }
})

const previousTests = computed(() => {
  return testsHistory.value
    .map((testHistory) => {
      const test = tests.value.find(({ id }) => testHistory.test_id === id)
      return test
        ? {
            ...test,
            ...testHistory,
            id: testHistory.id
          }
        : null
    })
    .filter((test) => test) as unknown
})

watch(plans, () => {
  const success = !!route.query.success || false
  const planId = route.query.id || null
  const freeTrial = route.query.free_trial || false
  if (success && planId) {
    const plan = plans.value.find(({ id }) => id === planId)
    if (!plan) return
    if (freeTrial) {
      Gtag.purchase(plan, true)
    } else {
      Gtag.purchase(plan)
    }
  }
})

const loading = computed(() => {
  return UIStore.tests.loading || UIStore.testsHistory.loading
})

watch(
  [
    () => authStore.isAuthenticated,
    () => appStore.tests,
    () => appStore.testsHistory,
    () => appStore.loading
  ],
  ([isAuth, tests, previousTests, loading]) => {
    if (isAuth && tests.length <= 0 && !loading) {
      appStore.fetchTests()
    }
    if (isAuth && previousTests.length <= 0 && !loading) {
      appStore.fetchTestsHistory()
    }
  },
  { immediate: true }
)

useSeoMeta({
  title: 'Dashboard',
  description:
    'Track your progress by reviewing previous tests or take a new one.'
})
</script>

<style scoped>
div[id^='headlessui-menu-items'] {
  left: 0 !important;
}
</style>
