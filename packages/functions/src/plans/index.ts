import { ApiHandler } from 'sst/node/api'
import { getPlans } from '@mpt-sst/core/plans/index'
export const handler = ApiHandler(async (_evt) => {
  const plans = await (
    await getPlans()
  ).map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: plan.metadata.price,
    description: plan.description,
    mostPopular: plan.metadata.mostPopular || false
  }))
  return {
    body: JSON.stringify(plans)
  }
})
