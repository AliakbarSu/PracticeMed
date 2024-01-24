import { Api, Function, StackContext, StaticSite, use } from 'sst/constructs'
import { HttpMethods } from 'aws-cdk-lib/aws-s3'
import { API } from './PracticeMedApi'
import { prod } from '../resources/stages'
import { endpoints } from '../resources/endpoints'

export function NuxtStack({ stack }: StackContext) {
  const api = use(API)
  const stage = stack.stage
  const {
    api: { customDomainUrl: api_url }
  } = api
  const nuxt = new Api(stack, 'Nuxt', {
    customDomain: {
      domainName:
        stage == prod ? endpoints.domain : `${stage}.${endpoints.domain}`,
      hostedZone: endpoints.hosted_zone
    },
    cors: {
      allowHeaders: ['*'],
      allowMethods: ['ANY'],
      allowOrigins: ['*']
    }
  })
  nuxt.bind([api.api])
  const publicAsset = new StaticSite(stack, 'PublicAssetCdn', {
    customDomain: {
      domainName: `${stage}.cdn.${endpoints.domain}`,
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
            allowedOrigins: ['*', nuxt.url, nuxt.customDomainUrl || '']
          }
        ]
      }
    }
  })

  nuxt.bind([publicAsset, api.HYGRAPH_TOKEN])
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
        install: ['tslib', 'uuid']
      },
      environment: {
        NUXT_APP_CDN_URL: publicAsset.url || '',
        NUXT_PUBLIC_CDN_URL: publicAsset.url || '',
        NUXT_PUBLIC_API_ENDPOINT: `${api_url}/api`,
        NUXT_PUBLIC_HYGRAPH_ENDPOINT: api.HYGRAPH_ENDPOINT.value,
        NUXT_PUBLIC_DOMAIN_NAME:
          stage == prod
            ? `https://${endpoints.domain}`
            : `https://${stage}.${endpoints.domain}`
      }
    })
  })

  /**
   * Show the endpoint in the output
   */
  stack.addOutputs({
    cdn_url: publicAsset.url,
    cdn_domain: publicAsset.customDomainUrl || '',
    web_app_url: nuxt.url,
    web_app_domain: nuxt.customDomainUrl || ''
  })
}
