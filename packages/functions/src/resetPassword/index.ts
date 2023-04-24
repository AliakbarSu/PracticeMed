import { ApiHandler } from 'sst/node/api'
import { getPasswordResetLink } from '@mpt-sst/core/auth0/index'

export const handler = ApiHandler(async (_evt) => {
  // TODO: use user id from auth0
  const userId = 'auth0|64409c95c3a961d278445467'
  const link = (await getPasswordResetLink(userId)) as string
  return {
    body: link
  }
})
