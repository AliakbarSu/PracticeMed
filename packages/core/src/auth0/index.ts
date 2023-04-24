import { User } from 'auth0'
import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { Auth0User, UserAppMetadata } from '../../types/User'

const query = async (path: string) => {
  const authToken = await getAuthToken()
  const response = fetch(`${Config.DOMAIN}/api/v2/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  return (await response).json()
}

const post = async (path: string, body: unknown) => {
  const authToken = await getAuthToken()
  const response = fetch(`${Config.DOMAIN}/api/v2/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(body)
  })
  return (await response).json()
}

const patch = async (path: string, data: unknown) => {
  const authToken = await getAuthToken()
  const response = fetch(`${Config.DOMAIN}/api/v2/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
  return (await response).json()
}

const getAuthToken = async () => {
  const response = await fetch(`${Config.DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: Config.AUTH0_CLIENT_ID,
      client_secret: Config.AUTH0_CLIENT_SECRET,
      audience: `${Config.DOMAIN}/api/v2/`
    })
  })
  const parsedData = (await response.json()) as { access_token: string }
  return parsedData?.access_token
}

export const getUser = async (id: string) => {
  return query(`users/${id}`) as Promise<Auth0User>
}

export const getUserAppMetadata = async (
  id: string
): Promise<UserAppMetadata> => {
  const user = await getUser(id)
  return user.app_metadata as UserAppMetadata
}

export const updateUserAppMetadata = async ({
  id,
  data
}: {
  id: string
  data: UserAppMetadata
}): Promise<UserAppMetadata> => {
  const result = (await patch(`users/${id}`, {
    app_metadata: data
  })) as Promise<User>
  return (await result).app_metadata as UserAppMetadata
}

export const getPasswordResetLink = async (userId: string) => {
  return post('tickets/password-change', {
    user_id: userId,
    client_id: Config.AUTH0_CLIENT_ID,
    ttl_sec: 0,
    mark_email_as_verified: false,
    includeEmailInRedirect: false
  })
}
