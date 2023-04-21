import { ApiHandler } from 'sst/node/api'
import { getPlan, getPlans } from '@mpt-sst/core/plans/index'
export const handler = ApiHandler(async (_evt) => {
  const plans = await (
    await getPlans()
  ).map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: plan.metadata.price,
    description: plan.description,
    features: plan.description
      ?.split('-')
      .map((item) => item.trim())
      .filter((item) => item.length > 0),
    images: plan.images,
    mostPopular: plan.metadata.mostPopular || false
  }))
  return {
    body: JSON.stringify(plans)
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
    features: plan.description
      ?.split('-')
      .map((item) => item.trim())
      .filter((item) => item.length > 0),
    images: plan.images,
    mostPopular: plan.metadata.mostPopular || false
  }

  return {
    body: JSON.stringify(planObj)
  }
})
