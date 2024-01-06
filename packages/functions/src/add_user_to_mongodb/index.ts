import { ApiHandler } from 'sst/node/api'
import { add_user } from '@mpt-sst/core/model/users'

export const handler = ApiHandler(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const { user } = JSON.parse(event.body || '') as {
    user: any
  }
  await add_user(user.user_id, user.email)
  return {
    body: `User was saved to MongoDB successfully!`
  }
})
