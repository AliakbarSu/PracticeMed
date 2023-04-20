import { User } from 'auth0'
import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { UserAppMetadata } from '../../types/User'

const query = async (path: string) => {
  const response = fetch(`${Config.AUTH0_DOMAIN}/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  return (await response).json()
}

const patch = async (path: string, data: unknown) => {
  const response = fetch(`${Config.AUTH0_DOMAIN}/${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return (await response).json()
}

export const getUser = (id: string) => {
  return query(`users/${id}`) as Promise<User>
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
