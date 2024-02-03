import { useAuth0 } from "@auth0/auth0-vue";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth0 = useAuth0();
  await auth0?.checkSession();
  if (!auth0?.isAuthenticated.value) {
    if (from.path !== "/login") {
      return navigateTo("/login?redirect_to=" + to.path);
    }
    return abortNavigation();
  }
});
