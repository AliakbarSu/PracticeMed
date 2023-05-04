import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from './main'

export const useContactStore = defineStore('contact', () => {
  const appStore = useAppStore()
  const loading = ref(false)
  const signedup = ref(false)
  const email = ref<string | null>(null)

  const $reset = () => {
    loading.value = false
    signedup.value = false
  }

  const signup = async (em: string) => {
    email.value = em
    if (signedup.value) return
    try {
      loading.value = true
      await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/newsletter/signup`,
        {
          email: em
        }
      )
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
