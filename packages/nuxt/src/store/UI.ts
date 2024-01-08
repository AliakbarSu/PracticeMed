import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const error = ref<Error | null>(null)
  const test = reactive({ loading: false })
  const tests = reactive({ loading: false, loaded: false })
  const testsHistory = reactive({ loading: false, loaded: false })
  const $reset = () => {
    error.value = null
    test.loading = false
    tests.loading = false
    tests.loaded = false
    testsHistory.loading = false
    testsHistory.loaded = false
  }

  const startLoadingTest = () => {
    test.loading = true
  }
  const stopLoadingTest = () => {
    test.loading = false
  }

  const startLoadingTests = () => {
    tests.loading = true
    tests.loaded = false
  }

  const stopLoadingTests = () => {
    tests.loading = false
  }

  const startLoadingTestsHistory = () => {
    testsHistory.loading = true
    testsHistory.loaded = false
  }

  const stopLoadingTestsHistory = () => {
    testsHistory.loading = false
  }

  const testsLoaded = () => {
    tests.loaded = true
  }

  const testsHistoryLoaded = () => {
    testsHistory.loaded = true
  }

  return {
    error,
    test,
    startLoadingTest,
    stopLoadingTest,
    tests,
    startLoadingTests,
    stopLoadingTests,
    testsLoaded,
    testsHistoryLoaded,
    testsHistory,
    startLoadingTestsHistory,
    stopLoadingTestsHistory,
    $reset
  }
})
