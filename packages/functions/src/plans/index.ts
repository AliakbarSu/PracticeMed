import { ApiHandler } from 'sst/node/api'
import { getPlan, getPlans } from '@mpt-sst/core/plans/index'
export const handler = ApiHandler(async (_evt) => {
  const plans = await getPlans()
  const activePlans = plans
    .filter((plan) => plan.active)
    .map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.metadata.price,
      description: plan.description,
      features: plan.metadata.features?.split(','),
      images: plan.images,
      mostPopular: plan.metadata.mostPopular || false,
      freeTrial: plan.metadata.free_trial_limit || false
    }))
  return {
    body: JSON.stringify(activePlans)
  }
})

export const getSinglePlan = ApiHandler(async (_evt) => {
  const planId = _evt.pathParameters?.id || ''
  const plan = await getPlan(planId)
  const planObj = {
    id: plan.id,
    name: plan.name,
    price: plan.metadata.price,
    description: plan.description,
    features: plan.metadata.features?.split(','),
    images: plan.images,
    mostPopular: plan.metadata.mostPopular || false,
    freeTrial: plan.metadata.free_trial_limit || false
  }

  return {
    body: JSON.stringify(planObj)
  }
})
