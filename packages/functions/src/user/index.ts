import { getProfile } from '@mpt-sst/core/user/index'
import { ApiHandler } from 'sst/node/api'

export const profile = ApiHandler(async (_evt) => {
  const userId = 'auth0|64409c95c3a961d278445467'
  const profile = await getProfile(userId)
  return {
    body: JSON.stringify(profile)
  }
})
