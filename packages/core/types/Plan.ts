export interface UserPlan {
  id: string
  stripe_customer_id: string
  name: string
  limit: number
  used: number
}

export interface SubscribeEventPayload {
  token: string
}
