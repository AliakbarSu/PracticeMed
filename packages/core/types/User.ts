import { User } from 'auth0'
import { UserPlan } from './Plan'
import { TestPerformanceResult } from './Result'

export interface UserAppMetadata {
  test_history: TestPerformanceResult[]
  plan: UserPlan
}

export interface Auth0User extends Omit<User, 'app_metadata'> {
  app_metadata: UserAppMetadata
}

export interface Profile {
  id: string
  name: string
  email: string
  plan: UserPlan
}
