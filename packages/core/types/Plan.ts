export interface UserPlan {
  id: string | null
  stripe_customer_id: string | null
  name: string | null
  limit: number
  used: number
  subscription: {
    id: string | null
    onTrial: boolean
  }
}

export interface SubscribeEventPayload {
  token: string
}
