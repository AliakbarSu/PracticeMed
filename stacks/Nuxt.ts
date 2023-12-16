import { Api, Function, StackContext, StaticSite, use } from 'sst/constructs'
import { HttpMethods } from 'aws-cdk-lib/aws-s3'
import { API } from './PracticeMedApi'
import { dev } from '../resources/stages'
import { endpoints } from '../resources/endpoints'

export function NuxtStack({ stack }: StackContext) {
  const {
    api: { customDomainUrl }
  } = use(API)
  const nuxt = new Api(stack, 'Nuxt', {
    customDomain: {
      domainName:
        stack.stage == dev
          ? endpoints.custom_domains.web.dev
          : endpoints.custom_domains.web.prod,
      hostedZone: endpoints.hosted_zone
    },
    cors: {
      allowHeaders: ['*'],
      allowMethods: ['ANY'],
      allowOrigins: ['*']
    }
  })
  const publicAsset = new StaticSite(stack, 'PublicAssetCdn', {
    customDomain: {
      domainName:
        stack.stage == dev
          ? endpoints.custom_domains.cdn.dev
          : endpoints.custom_domains.cdn.prod,
      hostedZone: endpoints.hosted_zone
    },
    path: 'packages/nuxt/.output/public',
    // we wait for CloudFront cache invalidation to avoid any issue. It is increase the build time
    waitForInvalidation: true,
    cdk: {
      /**
       * We setup a very permissive cors policy for the demo.
       * On production, we will make it stricter
       */
      bucket: {
        cors: [
          {
            allowedHeaders: ['*'],
            allowedMethods: [
              HttpMethods.GET,
              HttpMethods.DELETE,
              HttpMethods.HEAD,
              HttpMethods.POST,
              HttpMethods.PUT
            ],
            /**
             * Here we provide nuxt api url on the allowed origins
             */
            allowedOrigins: ['*', nuxt.url]
          }
        ]
      }
    }
  })

  /**
   * Set up a default route to handle all call http call to the nuxt application
   */
  nuxt.addRoutes(stack, {
    $default: new Function(stack, 'EntryPointFunc', {
      handler: 'packages/nuxt/.output/server/index.handler',
      url: {
        cors: {
          allowHeaders: ['*'],
          allowMethods: ['*'],
          allowOrigins: ['*']
        }
      },
      nodejs: {
        install: ['tslib']
      },
      environment: {
        NUXT_APP_CDN_URL: publicAsset.customDomainUrl || '',
        NUXT_PUBLIC_API_ENDPOINT: `${customDomainUrl}/api`
      }
    })
  })

  /**
   * Show the endpoint in the output
   */
  stack.addOutputs({
    CdnUrl: publicAsset.url,
    NuxtEndpoint: nuxt.url
  })
}
