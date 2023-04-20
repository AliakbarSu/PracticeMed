import { UserPlan } from './Plan'
import { TestPerformanceResult } from './Result'

export interface UserAppMetadata {
  test_history: TestPerformanceResult[]
  plan: UserPlan
}
