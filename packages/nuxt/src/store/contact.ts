import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useContactStore = defineStore('contact', () => {
  const loading = ref(false)
  const signedup = ref(false)
  const email = ref<string | null>(null)

  const $reset = () => {
    loading.value = false
    signedup.value = false
  }

  const signup = async (em: string) => {
    const {
      public: { api_endpoint }
    } = useRuntimeConfig()
    email.value = em
    if (signedup.value) return
    try {
      loading.value = true
      await axios.post(`${api_endpoint}/newsletter/signup`, {
        email: em
      })
      signedup.value = true
      email.value = null
    } catch (err) {
    } finally {
      loading.value = false
    }
  }

  return {
    signup,
    $reset,
    loading,
    signedup
  }
})
