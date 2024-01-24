import { gql } from 'graphql-request'
import { blog } from '../../queries'
import { Config } from 'sst/node/config'

export const getSingleBlog = gql`
  query GetBlog($slug: String) {
    blog(where: { slug: $slug }) {
      ${blog}
    }
  }
`

export default defineEventHandler(async (event: any) => {
  const slug = getRouterParam(event, 'slug') || ''
  const hygraph_token = (Config as any).HYGRAPH_TOKEN
  try {
    const {
      public: { hygraph_endpoint }
    } = useRuntimeConfig()
    const query = (query: string, variables: { slug: string }) => {
      return fetch(hygraph_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hygraph_token}`
        },
        body: JSON.stringify({
          query,
          variables
        })
      })
    }
    const response = await query(getSingleBlog, { slug })
    const data = await response.json()
    return data.data.blog
  } catch (err) {
    console.log(`Failed to fetch blog: ${slug}`, err)
    return {}
  }
})
