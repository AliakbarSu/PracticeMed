import { gql } from 'graphql-request'
import { blog } from '../../queries'
import { Config } from 'sst/node/config'

export const listBlogsQuery = gql`
  query GetBlogs {
    blogs {
      ${blog}
    }
  }
`

export default defineEventHandler(async (event: any) => {
  const hygraph_token = (Config as any).HYGRAPH_TOKEN
  try {
    const {
      public: { hygraph_endpoint }
    } = useRuntimeConfig()
    const query = (query: string) => {
      return fetch(hygraph_endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hygraph_token}`
        },
        body: JSON.stringify({
          query
        })
      })
    }
    const response = await query(listBlogsQuery)
    const data = await response.json()
    return data.data.blogs
  } catch (err) {
    console.log('Failed to fetch blogs!', err)
    return []
  }
})
