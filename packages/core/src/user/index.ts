import { User } from '../../types/User'
import { getUser } from '../model/users'

export const getProfile = async (id: string): Promise<User> => {
  return getUser(id)
}
