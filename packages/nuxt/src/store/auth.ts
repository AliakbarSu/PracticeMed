import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<any>(null)

  const isAuthenticated = computed(() => token.value !== null)

  function $reset() {
    token.value = null
    user.value = null
  }

  const setToken = (tk: string) => {
    token.value = tk
  }

  const setUser = (usr: any) => {
    user.value = usr
  }

  return {
    isAuthenticated,
    $reset,
    setToken,
    token,
    setUser,
    user
  }
})
