import { createAuth0 } from "@auth0/auth0-vue";
import { clientId, domain } from "../auth_config.json";

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain,
    clientId,
    cacheLocation: "localstorage",
    useRefreshTokens: false,
    authorizationParams: {
      redirect_uri: process.client
        ? "http://localhost:3000"
        : "https://practicemed.org",
      audience: "https://jwt-token-authorizer.com",
    },
  });

  nuxtApp.vueApp.use(auth0);
});
