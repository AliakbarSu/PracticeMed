import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getTestQuery, listTestsQuery } from './queries'
import { UserTest } from '../../types/Test'

const query = (query: string, variables: any) => {
  return fetch(Config.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Config.HYGRAPH_TOKEN}`
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  })
}

export const getTest = async (id: string) => {
  const response = await query(getTestQuery, { id })
  const parsed = await response.json()
  return (parsed as { data: { test: UserTest } }).data.test
}

export const listTests = async (): Promise<UserTest[]> => {
  const response = await query(listTestsQuery, { trial: false })
  const parsed = await response.json()
  return (parsed as { data: { tests: UserTest[] } }).data.tests
}

export const listTrialTests = async (): Promise<UserTest[]> => {
  const response = await query(listTestsQuery, { trial: true })
  const parsed = await response.json()
  return (parsed as { data: { tests: UserTest[] } }).data.tests
}
