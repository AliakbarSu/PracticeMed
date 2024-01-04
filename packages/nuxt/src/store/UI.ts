import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const error = ref<Error | null>(null)
  const test = reactive({ loading: false })
  const $reset = () => {
    error.value = null
  }

  const startLoadingTest = () => {
    test.loading = true
  }
  const stopLoadingTest = () => {
    test.loading = false
  }
  return {
    error,
    test,
    startLoadingTest,
    stopLoadingTest,
    $reset
  }
})
