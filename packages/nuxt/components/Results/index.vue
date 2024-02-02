<template>
  <div class="min-h-full bg-gray-100">
    <UIAlertsError v-if="UIStore.error" />
    <!-- <div class="p-4">
      <Banner :pass="pass" />
    </div> -->
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            class="text-3xl font-bold leading-tight tracking-tight text-gray-900"
          >
            Feedback
          </h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            class="mt-5 pb-2 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:divide-x md:divide-y-0"
          >
            <ResultsComponentsFeedback />
          </div>

          <div class="mb-3" v-if="demoMode">
            <dl
              class="flex justify-center mt-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:divide-x md:divide-y-0"
            >
              <div class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900"></dt>
                <dd
                  class="mt-1 flex items-baseline justify-between md:block lg:flex"
                >
                  <div
                    class="text-center items-baseline text-2xl font-semibold text-indigo-600"
                  >
                    Subscribe to a premium plan to view your results
                    <div
                      class="pt-4 text-center text-sm font-medium text-gray-500"
                    >
                      Upgrade to our premium plan for full-length mock tests and
                      benchmark your performance against peers! Elevate your
                      preparation and maximize success.
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <ResultsComponentsUISampleBadge v-if="demoMode" />
            <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">
              Last 30 days
            </h3> -->
            <dl
              class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0"
            >
              <div
                v-for="item in testStats"
                :key="item.name"
                class="px-4 py-5 sm:p-6"
              >
                <dt class="text-base font-normal text-gray-900">
                  {{ item.name }}
                </dt>
                <ResultsComponentsUILoadingContentSkeleton v-if="loading" />
                <dd
                  v-if="!loading"
                  class="mt-1 flex items-baseline justify-between md:block lg:flex"
                >
                  <div
                    class="flex items-baseline text-2xl font-semibold text-indigo-600"
                  >
                    {{ item.stat }}
                    <span class="ml-2 text-sm font-medium text-gray-500"
                      >from {{ item.previousStat }}</span
                    >
                  </div>

                  <div
                    :class="[
                      item.changeType === 'increase'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                      'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                    ]"
                  >
                    <ArrowUpIcon
                      v-if="item.changeType === 'increase'"
                      class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                    <ArrowDownIcon
                      v-else
                      class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                    <span class="sr-only">
                      {{
                        item.changeType === 'increase'
                          ? 'Increased'
                          : 'Decreased'
                      }}
                      by
                    </span>
                    {{ item.change }}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <dl
            class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="demoMode" />
              <dt class="text-base font-normal text-gray-900" v-if="!loading">
                Subject-wise Percentage
                <p class="max-w-4xl text-sm text-gray-500">
                  percentage of correct responses per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ChartsPieChart
                  tooltip-unit="%"
                  v-if="!loading"
                  :data="amchartCorrectResponseRatePerField"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="demoMode" />
              <dt class="text-base font-normal text-gray-900" v-if="!loading">
                Overall Question Accuracy
                <p class="max-w-4xl text-sm text-gray-500">
                  number of correct questions over time intervals
                </p>
              </dt>
              <dd
                class="mt-1 h-full items-center flex justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ChartsLineChart
                  v-if="!loading"
                  :data="amchartAccuracyOverTime"
                />
              </dd>
            </div>
          </dl>
          <dl
            class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="demoMode" />
              <dt class="text-base font-normal text-gray-900">
                Overall Time Performance
                <p class="max-w-4xl text-sm text-gray-500">
                  average time taken to answer during test
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full w-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ChartsLineChart v-if="!loading" :data="amLineChartData" />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="demoMode" />
              <dt class="text-base font-normal text-gray-900" v-if="!loading">
                Mean Subject Time
                <p class="max-w-4xl text-sm text-gray-500">
                  total time taken per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ChartsPieChart
                  tooltip-unit="minutes"
                  v-if="!loading"
                  :data="amchartAverageCategoryTiming"
                />
              </dd>
            </div>
          </dl>
          <dl
            class="mt-5 pb-16 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="demoMode" />
              <dt class="text-base font-normal text-gray-900" v-if="!loading">
                Incorrect Responses
                <p class="max-w-4xl text-sm text-gray-500">
                  total number of incorrect responses per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full w-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ChartsBarChart
                  tooltipUnit="answer(s)"
                  v-if="!loading"
                  :data="amchartIncorrectResponses"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="demoMode" />
              <dt class="text-base font-normal text-gray-900" v-if="!loading">
                Correct Responses
                <p class="max-w-4xl text-sm text-gray-500">
                  total number of correct responses per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="loading" />
                <ChartsBarChart
                  tooltipUnit="answer(s)"
                  v-if="!loading"
                  :data="amchartCorrectResponses"
                />
              </dd>
            </div>
          </dl>
        </div>
      </main>
      <div class="my-4" v-if="demoMode">
        <TestComponentsUICTAUpgradeCTA
          heading="Take a Mock Test to See Your Results"
          description="This is just a sample data. Sign up to a paid plan to take a mock test and see your results."
          btnText="View Plans"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'
import type { UserAppMetadata } from '@/types/user'
import type { Stats } from '../../src/types/test'
import { useUIStore } from '../../src/store/UI'
import { useAuthStore } from '../../src/store/auth'
import { useAppStore } from '../../src/store/main'
import { demoResultsData } from '../../src/data/demoResultsData'

const UIStore = useUIStore()
const authStore = useAuthStore()
const appStore = useAppStore()

const router = useRouter()
const route = useRoute()
const resultId = computed(() => route.params.id || '')
const previous_tests = computed(() => appStore.testsHistory)
const loading = computed(() => appStore.loading)
const demoMode = ref<boolean>(false)

const fetchTestHistory = async () => {
  // display demo data
  if (resultId.value === 'demo_test') {
    demoMode.value = true
    appStore.fetchTestsHistory([demoResultsData as any])
  } else {
    appStore.fetchTestsHistory()
  }
}

const pass = computed(() => testHistory.value?.result === 'pass')

const testHistory = computed<UserAppMetadata['test_history'][0] | undefined>(
  () => {
    const test = previous_tests.value.find(
      ({ id, test_id }) => id === route.params.id || test_id === route.params.id
    )
    return test
  }
)

const testStats = computed(() => {
  if (loading.value) {
    return [
      { name: 'Total Points' },
      { name: 'Average Time' },
      { name: 'Subjects Average Time' }
    ] as any[]
  }
  if (!testHistory.value?.stats) return []
  return [
    {
      name: 'Total Points',
      stat: testHistory.value?.stats.totalPoints,
      previousStat: testHistory.value?.stats.testScore,
      change: calculateChangeRate('totalPoints'),
      changeType: calculateChangeType('totalPoints')
    },
    {
      name: 'Average Time (minutes)',
      stat: testHistory.value.stats.averageTimeTaken.toFixed(2),
      previousStat: testHistory.value.stats.averageTimeTaken.toFixed(2),
      change: calculateChangeRate('averageTimeTaken').toFixed(2),
      changeType: calculateChangeType('averageTimeTaken')
    },
    {
      name: 'Subjects Average Time (minutes)',
      stat: testHistory.value.stats.fieldsAverageTime.toFixed(2),
      previousStat: testHistory.value.stats.fieldsAverageTime.toFixed(2),
      change: calculateChangeRate('fieldsAverageTime').toFixed(2),
      changeType: calculateChangeType('fieldsAverageTime')
    }
  ]
})

const amLineChartData = computed(() => {
  return Object.keys(testHistory.value?.stats.speedByMinuteInterval || {}).map(
    (key) => ({
      score: Number(testHistory.value?.stats.speedByMinuteInterval[key]) || 0,
      value: Number(key)
    })
  )
})

const amchartIncorrectResponses = computed(() => {
  return Object.keys(
    testHistory.value?.stats.incorrectResponseCountPerField || {}
  )
    .map((key) => ({
      category: key,
      score: testHistory.value?.stats.incorrectResponseCountPerField[key] || 0
    }))
    .filter((item) => item.score > 0)
})

const amchartCorrectResponses = computed(() => {
  return Object.keys(
    testHistory.value?.stats.correctResponseCountPerField || {}
  )
    .map((key) => ({
      category: key,
      score: testHistory.value?.stats.correctResponseCountPerField[key] || 0
    }))
    .filter((item) => item.score > 0)
})

const amchartCorrectResponseRatePerField = computed(() => {
  return Object.keys(testHistory.value?.stats.correctResponseRatePerField || {})
    .map((key) => ({
      category: key,
      value: testHistory.value?.stats.correctResponseRatePerField[key] || 0
    }))
    .filter((item) => item.value > 0)
})

const amchartAverageCategoryTiming = computed(() => {
  return Object.keys(testHistory.value?.stats.averageTimeTakenPerField || {})
    .map((key) => ({
      category: key,
      value: testHistory.value?.stats.averageTimeTakenPerField[key] || 0
    }))
    .filter((item) => item.value > 0)
})

const amchartAccuracyOverTime = computed(() => {
  return Object.keys(
    testHistory.value?.stats.correctAnswersByMinuteInterval || {}
  ).map((key) => ({
    score: testHistory.value?.stats.correctAnswersByMinuteInterval[key] || 0,
    value: Number(key)
  }))
})

const navigateToDashboard = () => {
  router.push('/dashboard')
}
const printResults = () => {
  window.print()
}

const calculateChangeRate = (key: keyof Stats) => {
  const sortedTestHistory = previous_tests.value.sort(
    (a, b) => Number(a.timestamp) - Number(b.timestamp)
  )
  const currentHistoryIndex = sortedTestHistory.findIndex(
    ({ test_id }) => test_id === testHistory.value?.test_id
  )
  const previousTest = sortedTestHistory[currentHistoryIndex + 1]
  if (!previousTest) return 0
  return Number(testHistory.value?.stats[key]) - Number(previousTest.stats[key])
}
const calculateChangeType = (key: keyof Stats) => {
  return calculateChangeRate(key) > 0 ? 'increase' : 'decrease'
}

watch(
  () => authStore.isAuthenticated,
  (isAuth) => {
    if (isAuth) {
      fetchTestHistory()
    }
  },
  { immediate: true }
)
</script>
