import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => token.value !== null)

  function $reset() {
    token.value = null
  }

  const setToken = (tk: string) => {
    token.value = tk
  }

  return {
    isAuthenticated,
    $reset,
    setToken: setToken,
    token
  }
})
