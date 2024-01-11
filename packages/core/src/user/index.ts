import { UserPlan } from '../../types/Plan'
import { Profile } from '../../types/User'
import { getUser as getUserAuth0 } from '../auth0'
import { getUser } from '../model/users'

export const getProfile = async (id: string): Promise<Profile> => {
  const { name = '' } = (await getUserAuth0(id)) as any
  const user = await getUser(id)
  const profile: Profile = {
    id: id,
    name: name,
    email: user.email,
    plan: {
      id: user.plan.id,
      name: user.plan.name,
      limit: user.plan.limit,
      used: user.plan.used,
      stripe_customer_id: user.plan.stripe_customer_id
    } as UserPlan
  }
  return profile
}
