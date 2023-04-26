import { createAuth0 } from '@auth0/auth0-vue'
import { domain, clientId } from '../../auth_config.json'

export default () =>
  createAuth0({
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://jwt-token-authorizer.com'
    }
  })
