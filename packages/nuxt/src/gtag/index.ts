import type { Plan } from '@/types/plans'

// const dataLayer = process.server
//   ? []
//   : (window as unknown as { dataLayer: any[] })?.dataLayer || []

const dataLayer = []

export const begin_checkout = (item: Plan) => {
  dataLayer.push({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'USD',
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: 1
        }
      ]
    }
  })
}

export const purchase = (item: Plan, freeTrial = false) => {
  dataLayer.push({
    event: 'purchase',
    ecommerce: {
      currency: 'USD',
      value: item.price,
      freeTrial: freeTrial,
      items: [
        {
          item_id: item.price,
          item_name: item.price,
          price: item.price,
          quantity: 1
        }
      ]
    }
  })
}

export const view_item_list = (plans: Plan[]) => {
  dataLayer.push({
    event: 'view_item_list',
    ecommerce: {
      currency: 'USD',
      item_list_id: plans.map((plan) => plan.id).join(','),
      item_list_name: plans.map((plan) => plan.name).join(','),
      items: plans.map((plan) => ({
        item_id: plan.id,
        item_name: plan.name,
        price: plan.price,
        quantity: 1
      }))
    }
  })
}

export const news_letter_signup = () => {
  dataLayer.push({
    event: 'news_letter_signup'
  })
}
