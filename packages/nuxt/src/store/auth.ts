import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<any>(null);

  const auth0 = process.client ? useAuth0() : undefined;

  const isAuthenticated = computed(() => token.value !== null);

  const $reset = () => {
    token.value = null;
    user.value = null;
  };

  const setToken = (tk: string | undefined) => {
    token.value = !tk ? null : tk;
  };

  const setUser = (usr: any) => {
    user.value = usr;
  };

  watchEffect(async () => {
    if (auth0?.isAuthenticated.value) {
      const token = await auth0?.getAccessTokenSilently();
      const user = auth0?.user.value;
      setToken(token);
      setUser(user);
    } else {
      $reset();
    }
  });

  return {
    isAuthenticated,
    $reset,
    setToken,
    token,
    setUser,
    user,
  };
});
