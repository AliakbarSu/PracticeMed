import { Config, StackContext } from "sst/constructs";
import { endpoints } from "../resources/endpoints";
import { dev } from "../resources/stages";

export const configure_parameters = ({ stack }: StackContext) => {
  const HYGRAPH_TOKEN = new Config.Secret(stack, "HYGRAPH_TOKEN");
  const HYGRAPH_ENDPOINT = new Config.Parameter(stack, "HYGRAPH_ENDPOINT", {
    value: stack.stage === dev ? endpoints.hygraph.dev : endpoints.hygraph.prod,
  });

  // Chat GPT
  const CHAT_GPT_API_KEY = new Config.Secret(stack, "CHAT_GPT_API_KEY");
  const API_FLASH_KEY = new Config.Secret(stack, "API_FLASH_KEY");

  const SANITY_ENDPOINT = new Config.Parameter(stack, "SANITY_ENDPOINT", {
    value: stack.stage === dev ? endpoints.sanity.dev : endpoints.sanity.prod,
  });

  // AUTH0
  const DOMAIN = new Config.Parameter(stack, "DOMAIN", {
    value:
      stack.stage === dev
        ? endpoints.auth0_domain.dev
        : endpoints.auth0_domain.prod,
  });
  const AUTH0_CLIENT_ID = new Config.Parameter(stack, "AUTH0_CLIENT_ID", {
    value:
      stack.stage === dev
        ? endpoints.auth0_client_id.dev
        : endpoints.auth0_client_id.prod,
  });
  const AUTH0_CLIENT_SECRET = new Config.Secret(stack, "AUTH0_CLIENT_SECRET");

  // URL
  const FRONT_END_URL = new Config.Parameter(stack, "FRONT_END_URL", {
    value:
      stack.stage === dev ? endpoints.frontend.dev : endpoints.frontend.prod,
  });

  // STRIPE
  const STRIPE_SECRET = new Config.Secret(stack, "STRIPE_SECRET");
  const STRIPE_SIGNING_SECRET = new Config.Secret(
    stack,
    "STRIPE_SIGNING_SECRET",
  );

  // SENDGRID
  const SENDGRID_API_KEY = new Config.Secret(stack, "SENDGRID_API_KEY");

  const MONGODB_URI = new Config.Secret(stack, "MONGODB_URI");

  return {
    HYGRAPH_TOKEN,
    HYGRAPH_ENDPOINT,
    SANITY_ENDPOINT,
    DOMAIN,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    FRONT_END_URL,
    STRIPE_SECRET,
    STRIPE_SIGNING_SECRET,
    SENDGRID_API_KEY,
    MONGODB_URI,
    CHAT_GPT_API_KEY,
    API_FLASH_KEY,
  };
};
