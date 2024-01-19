import { gql } from 'graphql-request'
import { blog } from '../../queries'

export const getSingleBlog = gql`
  query GetBlog($slug: String) {
    blog(where: { slug: $slug }) {
      ${blog}
    }
  }
`

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  try {
    const {
      public: { hygraph_endpoint },
      hygraph_token
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
