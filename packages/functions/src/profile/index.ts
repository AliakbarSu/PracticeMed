import { getProfile } from '@mpt-sst/core/user/index'
import { ApiGatewayAuth } from '@mpt-types/System'
import { ApiHandler } from 'sst/node/api'
import { User } from '@mpt-types/User'

export const get_profile = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const user = await getProfile(userId)
  const profile: {
    id: string
    name: string
    email: string
    plan: User['plan']
  } = {
    ...user,
    id: user.userId,
    name: user.email
  }
  return {
    body: JSON.stringify(profile)
  }
})
