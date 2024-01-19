import { gql } from 'graphql-request'
import { blog } from '../../queries'

export const listBlogsQuery = gql`
  query GetBlogs {
    blogs {
      ${blog}
    }
  }
`

export default defineEventHandler(async (event) => {
  try {
    const {
      public: { hygraph_endpoint },
      hygraph_token
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
