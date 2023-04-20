import { ApiHandler } from 'sst/node/api'
import { getUser } from '@mpt-sst/core/auth0/index'

export const handler = ApiHandler(async (_evt) => {
  const user = await getUser('fjsf')
  console.log(user)
  return {
    body: `Hello world. The time is `
  }
})
