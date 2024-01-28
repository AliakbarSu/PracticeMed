import { Config } from 'sst/node/config'
import fetch from 'node-fetch'
import { getTestQuery, listTestsQuery } from './queries'
import { Examination } from '../../types/Test'
import { getQuestions } from '../model/question'
import { Question } from '../../types/Question'

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
  const loadedTest = (parsed as { data: { test: Examination } }).data.test
  const questionLimit = trial ? 30 : loadedTest.questionsNumber
  const questions = await getQuestions(loadedTest.type, questionLimit)
  const updatedQuestions: Question[] = questions.map((question) => {
    return {
      ...question,
      _id: question._id.toString(),
      point: 1,
      difficulty_level: 2
    }
  })
  return {
    ...loadedTest,
    questions: updatedQuestions
  }
}

export const listTests = async (): Promise<Examination[]> => {
  const response = await query(listTestsQuery, {
    trial: false,
    demo: false,
    available: true
  })
  const parsed = await response.json()
  return (parsed as { data: { tests: Examination[] } }).data.tests
}

export const listTrialTests = async (): Promise<Examination[]> => {
  const response = await query(listTestsQuery, {
    trial: true,
    demo: false,
    available: true
  })
  const parsed = await response.json()
  return (parsed as { data: { tests: Examination[] } }).data.tests
}
