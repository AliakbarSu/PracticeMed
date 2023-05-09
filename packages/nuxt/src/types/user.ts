import type { User } from '@auth0/auth0-vue'
import type { TestPerformanceResult } from './test'

export interface AppUser extends User {}

export interface UserPlan {
  id: string
  stripe_customer_id: string
  name: string
  limit: number
  used: number
}

export interface UserAppMetadata {
  test_history: TestPerformanceResult[]
  plan: UserPlan
}

export interface Profile {
  id: string
  name: string
  email: string
  plan: UserPlan
}
