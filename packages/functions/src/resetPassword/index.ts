import { ApiHandler } from 'sst/node/api'
import { getPasswordResetLink } from '@mpt-sst/core/auth0/index'
import { ApiGatewayAuth } from '@mpt-types/System'

export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const link = (await getPasswordResetLink(userId)) as string
  return {
    body: link
  }
})
