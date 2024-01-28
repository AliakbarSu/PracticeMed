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
          <ResultsComponentsUISampleBadge v-if="state.demoMode" />
          <div v-if="state.demoMode">
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
                <ResultsComponentsUILoadingContentSkeleton
                  v-if="state.loading"
                />
                <dd
                  v-if="!state.loading"
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
              <ResultsComponentsUISampleBadge v-if="state.demoMode" />
              <dt
                class="text-base font-normal text-gray-900"
                v-if="!state.loading"
              >
                Subject-wise Percentage
                <p class="max-w-4xl text-sm text-gray-500">
                  percentage of correct responses per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="state.loading" />
                <ChartsPieChart
                  tooltip-unit="%"
                  v-if="!state.loading"
                  :data="amchartCorrectResponseRatePerField"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="state.demoMode" />
              <dt
                class="text-base font-normal text-gray-900"
                v-if="!state.loading"
              >
                Overall Question Accuracy
                <p class="max-w-4xl text-sm text-gray-500">
                  number of correct questions over time intervals
                </p>
              </dt>
              <dd
                class="mt-1 h-full items-center flex justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="state.loading" />
                <ChartsLineChart
                  v-if="!state.loading"
                  :data="amchartAccuracyOverTime"
                />
              </dd>
            </div>
          </dl>
          <dl
            class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="state.demoMode" />
              <dt class="text-base font-normal text-gray-900">
                Overall Time Performance
                <p class="max-w-4xl text-sm text-gray-500">
                  average time taken to answer during test
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full w-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="state.loading" />
                <ChartsLineChart
                  v-if="!state.loading"
                  :data="amLineChartData"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="state.demoMode" />
              <dt
                class="text-base font-normal text-gray-900"
                v-if="!state.loading"
              >
                Mean Subject Time
                <p class="max-w-4xl text-sm text-gray-500">
                  total time taken per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="state.loading" />
                <ChartsPieChart
                  tooltip-unit="minutes"
                  v-if="!state.loading"
                  :data="amchartAverageCategoryTiming"
                />
              </dd>
            </div>
          </dl>
          <dl
            class="mt-5 pb-16 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-x md:divide-y-0"
          >
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="state.demoMode" />
              <dt
                class="text-base font-normal text-gray-900"
                v-if="!state.loading"
              >
                Incorrect Responses
                <p class="max-w-4xl text-sm text-gray-500">
                  total number of incorrect responses per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full w-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="state.loading" />
                <ChartsBarChart
                  v-if="!state.loading"
                  :data="amchartIncorrectResponses"
                />
              </dd>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <ResultsComponentsUISampleBadge v-if="state.demoMode" />
              <dt
                class="text-base font-normal text-gray-900"
                v-if="!state.loading"
              >
                Correct Responses
                <p class="max-w-4xl text-sm text-gray-500">
                  total number of correct responses per subject
                </p>
              </dt>
              <dd
                class="mt-1 flex h-full items-center justify-center md:block lg:flex"
              >
                <ResultsComponentsUILoadingSkeleton v-if="state.loading" />
                <ChartsBarChart
                  v-if="!state.loading"
                  :data="amchartCorrectResponses"
                />
              </dd>
            </div>
          </dl>
          <div
            v-if="state.demoMode"
            class="mt-5 pb-16 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:divide-x md:divide-y-0"
          >
            <ResultsComponentsFeedback />
          </div>
        </div>
      </main>
      <div class="my-4" v-if="state.demoMode">
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
import axios from 'axios'
import type { UserAppMetadata } from '@/types/user'
import type { Stats } from '../../src/types/test'
import { useUIStore } from '../../src/store/UI'
import { useAuthStore } from '../../src/store/auth'
import { demoResultsData } from '../../src/data/demoResultsData'

const UIStore = useUIStore()
const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

const state = reactive({
  loading: false,
  demoMode: false,
  testHistory: {} as UserAppMetadata['test_history'][0],
  previous_tests: [] as UserAppMetadata['test_history'],
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
})

const fetchTestHistory = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  state.loading = true
  const resultId = route.params.id || ''

  // display demo data
  if (resultId === 'demo_test') {
    state.demoMode = true
    setTimeout(() => {
      state.previous_tests = [
        demoResultsData
      ] as UserAppMetadata['test_history']
      state.testHistory = demoResultsData as UserAppMetadata['test_history'][0]
      // this.loading = false
    }, 1000)
    return
  }
  try {
    const response = await axios.get(`${api_endpoint}/tests/history`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    const testHistoryArray = response.data
      .body as unknown as UserAppMetadata['test_history']
    state.previous_tests = testHistoryArray
    const matchingTestHistory = testHistoryArray.find(
      ({ id }: any) => id === resultId
    ) as UserAppMetadata['test_history'][0]
    if (!matchingTestHistory) {
      UIStore.error = new Error('Failed to find a matching test result')
      return
    }
    state.testHistory = matchingTestHistory

    state.loading = false
  } catch (err) {
    UIStore.error = new Error(err as string)
  } finally {
    state.loading = false
  }
}

await fetchTestHistory()

const pass = computed(() => state.testHistory.result === 'pass')

const testStats = computed(() => {
  if (state.loading) {
    return [
      { name: 'Total Points' },
      { name: 'Average Time' },
      { name: 'Subjects Average Time' }
    ] as any[]
  }
  if (!state.testHistory?.stats) return []
  return [
    {
      name: 'Total Points',
      stat: state.testHistory.stats.totalPoints,
      previousStat: state.testHistory.stats.testScore,
      change: calculateChangeRate('totalPoints'),
      changeType: calculateChangeType('totalPoints')
    },
    {
      name: 'Average Time (minutes)',
      stat: state.testHistory.stats.averageTimeTaken.toFixed(2),
      previousStat: state.testHistory.stats.averageTimeTaken.toFixed(2),
      change: calculateChangeRate('averageTimeTaken').toFixed(2),
      changeType: calculateChangeType('averageTimeTaken')
    },
    {
      name: 'Subjects Average Time (minutes)',
      stat: state.testHistory.stats.fieldsAverageTime.toFixed(2),
      previousStat: state.testHistory.stats.fieldsAverageTime.toFixed(2),
      change: calculateChangeRate('fieldsAverageTime').toFixed(2),
      changeType: calculateChangeType('fieldsAverageTime')
    }
  ]
})

const amLineChartData = computed(() => {
  return Object.keys(state.testHistory.stats.speedByMinuteInterval).map(
    (key) => ({
      score: Number(state.testHistory.stats.speedByMinuteInterval[key]),
      value: Number(key)
    })
  )
})

const amchartIncorrectResponses = computed(() => {
  return Object.keys(
    state.testHistory.stats.incorrectResponseCountPerField
  ).map((key) => ({
    category: key,
    score: state.testHistory.stats.incorrectResponseCountPerField[key]
  }))
})

const amchartCorrectResponses = computed(() => {
  return Object.keys(state.testHistory.stats.correctResponseCountPerField).map(
    (key) => ({
      category: key,
      score: state.testHistory.stats.correctResponseCountPerField[key]
    })
  )
})

const amchartCorrectResponseRatePerField = computed(() => {
  return Object.keys(state.testHistory.stats.correctResponseRatePerField).map(
    (key) => ({
      category: key,
      value: state.testHistory.stats.correctResponseRatePerField[key]
    })
  )
})

const amchartAverageCategoryTiming = computed(() => {
  return Object.keys(state.testHistory.stats.averageTimeTakenPerField).map(
    (key) => ({
      category: key,
      value: state.testHistory.stats.averageTimeTakenPerField[key]
    })
  )
})

const amchartAccuracyOverTime = computed(() => {
  return Object.keys(
    state.testHistory.stats.correctAnswersByMinuteInterval
  ).map((key) => ({
    score: state.testHistory.stats.correctAnswersByMinuteInterval[key],
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
  const sortedTestHistory = state.previous_tests.sort(
    (a, b) => Number(a.timestamp) - Number(b.timestamp)
  )
  const currentHistoryIndex = sortedTestHistory.findIndex(
    ({ test_id }) => test_id === state.testHistory.test_id
  )
  const previousTest = sortedTestHistory[currentHistoryIndex + 1]
  if (!previousTest) return 0
  return Number(state.testHistory.stats[key]) - Number(previousTest.stats[key])
}
const calculateChangeType = (key: keyof Stats) => {
  // if (this.calculateChangeRate(key) === 0) return 'same'
  return calculateChangeRate(key) > 0 ? 'increase' : 'decrease'
}
</script>
