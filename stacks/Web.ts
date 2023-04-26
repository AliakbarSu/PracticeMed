import { StackContext, StaticSite, use } from 'sst/constructs'
import { API } from './PracticeMedApi'

export function WEB({ stack }: StackContext) {
  const {
    api: { url }
  } = use(API)
  const site = new StaticSite(stack, 'Site', {
    customDomain:
      stack.stage === 'dev' ? 'web.practicemed.org' : 'practicemed.org',
    path: 'packages/web',
    buildOutput: 'dist',
    buildCommand: 'npm run build',
    errorPage: 'redirect_to_index_page',
    environment: {
      VITE_API_ENDPOINT: `${url}/api`
    }
  })
  stack.addOutputs({
    SiteDomain: site.customDomainUrl,
    SiteUrl: site.url
  })
}
