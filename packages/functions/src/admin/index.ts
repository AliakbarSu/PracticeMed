import { getAllUsers, getUser } from '@mpt-sst/core/model/users'
import { ApiGatewayAuth } from '@mpt-types/System'
import { RolesEnum } from '@mpt-types/User'
import { ApiHandler } from 'sst/node/api'

export const get_users = ApiHandler(async _evt => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const { roles } = await getUser(userId)
  if (!roles.includes(RolesEnum.Admin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' }),
    }
  }
  const users = await getAllUsers()
  const usersWithTimestamp = users.map(user => ({
    ...user,
    created_at: (user as any)._id.getTimestamp(),
  }))
  return {
    body: usersWithTimestamp as any as string,
  }
})
