import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js'
import { domain, clientId } from '../../auth_config.json'
import { useAuthStore } from '../store/auth'

// let auth0Client: Auth0Client | null = null
let redirectLink = 'http://localhost:3000'

if (process.env.LOCAL_ENV == 'dev') {
  redirectLink = 'https://dev.practicemed.org'
} else if (process.env.LOCAL_ENV == 'prod') {
  redirectLink = 'https://practicemed.org'
}

let auth0Client: Auth0Client | null = null

export const auth = () =>
  createAuth0Client({
    domain,
    clientId,
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
    authorizationParams: {
      redirect_uri: redirectLink,
      audience: 'https://jwt-token-authorizer.com'
    }
  })

export const buildAuthClient = async () => {
  if (auth0Client) {
    return auth0Client
  }
  const client = await auth()
  auth0Client = client
  return client
}

export const getAuth0Client = async () => {
  // if (!auth0Client) {
  return auth()
  // }
  // return auth0Client
}

export const loginWithRedirect = async () => {
  const client = await buildAuthClient()
  const authStore = useAuthStore()
  await client.loginWithRedirect()
  const token = await getAuthToken()
  authStore.setToken(token)
}

export const signup = async () => {
  const client = await buildAuthClient()
  const authStore = useAuthStore()
  await client.loginWithRedirect({
    authorizationParams: { screen_hint: 'signup' }
  })
  const token = await getAuthToken()
  authStore.setToken(token)
}

export const getAccessTokenSilently = () =>
  getAuth0Client().then((client) => client.getTokenSilently())

export const getAuthToken = async () => {
  if (auth0Client) {
    return auth0Client.getTokenSilently()
  } else {
    const client = await buildAuthClient()
    return client.getTokenSilently()
  }
}

export const logout = async () => {
  const client = await buildAuthClient()
  const authStore = useAuthStore()
  authStore.$reset()
  return client.logout({ logoutParams: { returnTo: window.location.origin } })
}
