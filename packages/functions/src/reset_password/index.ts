import { ApiHandler } from 'sst/node/api'
import { getPasswordResetLink } from '@mpt-sst/core/auth0/index'
import { ApiGatewayAuth } from '@mpt-types/System'

export const get_reset_password_link = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const link = await getPasswordResetLink(userId)
  return {
    body: link as string
  }
})
