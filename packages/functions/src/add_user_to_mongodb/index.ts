import { ApiHandler } from 'sst/node/api'
import { addUser } from '@mpt-sst/core/model/users'

export const handler = ApiHandler(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const { user } = JSON.parse(event.body || '') as {
    user: any
  }
  await addUser(user.user_id, user.email)
  return {
    body: `User was saved to MongoDB successfully!`
  }
})
