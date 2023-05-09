import { usePlansStore } from '../src/store/plans'
import { authGuard } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const plans = usePlansStore()
  await plans.fetchPlans()
  return
})
