import { ApiResources } from 'sst/node/api'

export interface ApiGatewayAuth {
  requestContext: {
    authorizer: {
      jwt: {
        claims: {
          sub: string
        }
      }
    }
  }
}
