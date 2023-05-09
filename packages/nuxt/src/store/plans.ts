import type { Plan } from '@/types/plans'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAppStore } from './main'
import { useUIStore } from './UI'

export const usePlansStore = defineStore('plans', () => {
  const appStore = useAppStore()
  const UIStore = useUIStore()

  const loading = ref(false)
  const plans = ref<Plan[]>([{} as Plan, {} as Plan, {} as Plan])
  const subscribingTo = ref<string | null>(null)
  const checkoutUrl = ref<string | null>(null)

  const hasActivePlan = computed(() => !!appStore.profile?.plan.id || false)
  const hasThisPlan = (planId: string) => appStore.profile?.plan?.id === planId
  const subscribing = (planId: string) => subscribingTo.value === planId

  function $reset() {
    plans.value = []
    loading.value = false
    subscribingTo.value = null
    checkoutUrl.value = null
  }

  const fetchPlans = async () => {
    const config = useRuntimeConfig()
    try {
      loading.value = true
      const result = await useFetch<{ body: string }>(
        `${config.public.api_endpoint}/plans`,
        {
          method: 'GET'
        }
      )
      plans.value = JSON.parse(
        (result.data?.value?.body as unknown as string) || ''
      )
    } catch (err) {
      UIStore.error = err as Error
    } finally {
      loading.value = false
    }
  }

  const subscribe = async (plan: Plan) => {
    const config = useRuntimeConfig()
    if (hasThisPlan(plan.id)) return
    try {
      subscribingTo.value = plan.id
      const token = appStore.authToken
      const url = `${config.public.api_endpoint}/plans/${plan.id}`
      const endpoint = plan.freeTrial
        ? `${url}/subscribe/free-trial`
        : `${url}/subscribe`
      const result = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      checkoutUrl.value = result.data.body
    } finally {
      subscribingTo.value = null
    }
  }

  return {
    fetchPlans,
    subscribe,
    plans,
    loading,
    hasActivePlan,
    hasThisPlan,
    $reset,
    checkoutUrl,
    subscribing
  }
})
