import { UserPlan } from '../../types/Plan'
import { Profile } from '../../types/User'
import { getUser } from '../auth0'

export const getProfile = async (id: string): Promise<Profile> => {
  const { email = '', name = '', app_metadata } = await getUser(id)
  const profile: Profile = {
    id: id,
    name: name,
    email: email,
    plan: {
      id: app_metadata.plan.id,
      name: app_metadata.plan.name,
      limit: app_metadata.plan.limit,
      used: app_metadata.plan.used
    } as UserPlan
  }
  return profile
}
