import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const error = ref<Error | null>(null)
  const $reset = () => {
    error.value = null
  }
  return {
    error,
    $reset
  }
})
