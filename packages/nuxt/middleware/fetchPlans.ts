import { usePlansStore } from '../src/store/plans'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const plans = usePlansStore()
  await plans.fetchPlans()
  return
})
