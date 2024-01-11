import { UserPlan } from './Plan'
import { TestPerformanceResult } from './Result'

export interface UserAppMetadata {
  test_history: TestPerformanceResult[]
  raw_test_history: any[]
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

export interface MongoDBUser {
  userId: string
  tests: any[]
}

export interface User {
  userId: string
  email: string
  plan: UserPlan
  tests: TestPerformanceResult[]
  tests_history: any[]
}
