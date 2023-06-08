import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getQuestionQuery, getTestQuery, listTestsQuery } from './queries'
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

const sanityQuery = (query: string, variables: any) => {
  return fetch(Config.SANITY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  const loadedTest = (parsed as { data: { test: UserTest } }).data.test

  const questionsResponse = await sanityQuery(getQuestionQuery, {
    type: loadedTest.type
  })
  const QuestionsParsed = await questionsResponse.json()
  const questions = (
    QuestionsParsed as { data: { allQuestion: any[] } }
  ).data.allQuestion.map((question) => ({
    ...question,
    textRaw: '',
    text: question.textRaw[0].children[0].text
  }))

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
