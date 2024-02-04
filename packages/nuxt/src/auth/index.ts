import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { clientId, domain } from "../../auth_config.json";
import { useAuthStore } from "../store/auth";

let auth0Client: Auth0Client | null = null;

export const auth = () => {
  const {
    public: { domain_name },
  } = useRuntimeConfig();
  return createAuth0Client({
    domain,
    clientId,
    cacheLocation: "localstorage",
    authorizationParams: {
      redirect_uri: (domain_name as string) || "",
      audience: "https://jwt-token-authorizer.com",
    },
  });
};

export const buildAuthClient = async () => {
  if (auth0Client) {
    return auth0Client;
  }
  const client = await auth();
  auth0Client = client;
  return client;
};

export const getAuth0Client = async () => {
  return auth();
};

export const loginWithRedirect = async () => {
  try {
    const client = await buildAuthClient();
    const authStore = useAuthStore();
    await client.loginWithRedirect();
    const token = await getAuthToken();
    const user = await client.getUser();
    authStore.setToken(token);
    authStore.setUser(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loginWithPop = async () => {
  try {
    const client = await buildAuthClient();
    const authStore = useAuthStore();
    await client.loginWithPopup();
    const token = await getAuthToken();
    const user = await client.getUser();
    authStore.setToken(token);
    authStore.setUser(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signup = async () => {
  const client = await buildAuthClient();
  const authStore = useAuthStore();
  await client.loginWithRedirect({
    authorizationParams: { screen_hint: "signup" },
  });
  const token = await getAuthToken();
  const user = await client.getUser();
  authStore.setToken(token);
  authStore.setUser(user);
};

export const signupWithPopup = async () => {
  const client = await buildAuthClient();
  const authStore = useAuthStore();
  await client.loginWithPopup({
    authorizationParams: { screen_hint: "signup" },
  });
  const token = await getAuthToken();
  const user = await client.getUser();
  authStore.setToken(token);
  authStore.setUser(user);
};

export const getAccessTokenSilently = () =>
  getAuth0Client().then((client) => client.getTokenSilently());

export const getAuthToken = async () => {
  if (auth0Client) {
    return auth0Client.getTokenSilently();
  } else {
    const client = await buildAuthClient();
    return client.getTokenSilently();
  }
};

export const logout = async () => {
  const client = await buildAuthClient();
  const authStore = useAuthStore();
  authStore.$reset();
  return client.logout({ logoutParams: { returnTo: window.location.origin } });
};
