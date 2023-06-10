import { createAuth0 } from '@auth0/auth0-vue'
import { domain, clientId } from '../auth_config.json'

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain,
    clientId,
    cacheLocation: 'localstorage',
    useRefreshTokens: false,
    authorizationParams: {
      redirect_uri: process.client
        ? 'http://localhost:3000'
        : 'https://practicemed.org',
      audience: 'https://jwt-token-authorizer.com'
    }
  })

  nuxtApp.vueApp.use(auth0)

  addRouteMiddleware('auth', async () => {
    await auth0.checkSession()
    // console.log(await auth0.)
    if (!auth0.isAuthenticated.value) {
      auth0.loginWithRedirect({
        appState: {
          target: useRoute().path
        }
      })
      return abortNavigation()
    }
  })
})