import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getTestQuery, listTestsQuery } from './queries'
import { UserTest } from '../../types/Test'
import { getQuestions } from '../model/question'

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

export const getTest = async (id: string, trial: boolean = false) => {
  const response = await query(getTestQuery, { id })
  const parsed = await response.json()
  const loadedTest = (parsed as { data: { test: UserTest } }).data.test
  const questionLimit = trial ? 30 : loadedTest.questionsNumber
  const questions = await getQuestions(loadedTest.type, questionLimit)
  return {
    ...loadedTest,
    questions
  }
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
