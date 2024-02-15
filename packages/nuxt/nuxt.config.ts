// https://nuxt.com/docs/api/configuration/nuxt-config
import { local } from "../../resources/stages";
import path from "path";

const alias =
  process.env.LOCAL_ENV == local
    ? {}
    : {
        "vue/server-renderer": path.resolve(
          __dirname,
          "./node_modules/vue/server-renderer",
        ),
      };
export default defineNuxtConfig({
  site: {
    url: "https://practicemed.org",
  },
  sitemap: {
    exclude: [
      "/admin/**",
      "/dashboard/**",
      "/account/**",
      "/login",
      "/confirmation",
      "/payment/**",
      "unsuccessful",
    ],
    sources: ["/api/__sitemap__/urls"],
  },
  gtm: {
    id: "GTM-K9LRZTF",
    loadScript: true,
    debug: true,
    devtools: true,
  },
  routeRules: {
    "/resources": { redirect: "/resources/blogs" },
    "/resources/amc/prepare-from-scratch": {
      redirect: "/resources/blogs/how-to-prepare-for-the-amc-mcq-examination",
    },
    "/resources/amc/prepare": {
      redirect: "/resources/blogs/how-to-prepare-for-the-amc-mcq-examination",
    },
    "/resources/amc/find-job": {
      redirect:
        "/resources/blogs/securing-employment-in-australia-after-successfully-passing-the-amc-mcq-exam",
    },
    "/resources/**": { prerender: true },
  },
  app: {
    head: {
      script: [],
      htmlAttrs: {
        class: "h-full",
        lang: "en",
      },
      bodyAttrs: {
        class: "h-full",
      },
      link: [
        {
          href: "https://rsms.me/inter/inter.css",
          rel: "stylesheet",
        },
      ],
      meta: [
        { charset: "UTF-8" },
        { name: "theme-color", content: "#ffffff" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  image: {
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dxuf2ssx6/image/upload",
    },
  },
  runtimeConfig: {
    public: {
      api_endpoint: "",
      hygraph_endpoint: "",
      domain_name: "",
      cdn_url: "",
    },
  },
  // @ts-expect-error - no types
  modules: [
    "@pinia/nuxt",
    "@nuxt/devtools",
    "@vueform/nuxt",
    "@nuxt/image",
    "nuxt-primevue",
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    "@zadigetvoltaire/nuxt-gtm",
    "nuxt-og-image",
  ],
  ogImage: {
    compatibility: {
      prerender: {
        chromium: false,
      },
    },
    // runtimeCompatibility: {
    //   bindings: {
    //     chromium: false,
    //     "css-inline": "node",
    //     resvg: "wasm",
    //     satori: "node",
    //     sharp: false,
    //   },
    //   wasmStrategy: "inline",
    // },
    debug: true,
  },
  alias: {
    "@store": "./src/store",
    "@plugins": "./src/plugins",
    "@custom-auth": "./src/auth",
    "@types": "./src/types",
    "@gtag": "./src/gtag",
    "mpt-types": "../core/types",
    ...alias,
  },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/main.css" as *;',
        },
      },
    },
  },

  devtools: {
    enabled: true,
    vscode: {},
    timeline: {
      enabled: true,
    },
  },
  nitro: {
    preset: "aws-lambda",
    experimental: {
      wasm: true,
    },
    wasm: {
      esmImport: true,
    },
    rollupConfig: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
