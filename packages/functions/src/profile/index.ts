import { getProfile } from '@mpt-sst/core/user/index'
import { ApiGatewayAuth } from '@mpt-types/System'
import { ApiHandler } from 'sst/node/api'
import { RolesEnum, User } from '@mpt-types/User'
import { Results } from '@mpt-types/Result'

export const get_profile = ApiHandler(async _evt => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const user = await getProfile(userId)
  const profile: {
    id: string
    name: string
    email: string
    results: Results[]
    plan: User['plan']
    roles: RolesEnum[]
  } = {
    ...user,
    id: user.userId,
    name: user.email,
    results: user.results,
    roles: user.roles,
  }
  return {
    body: profile as unknown as string,
  }
})
