import { Question } from '../../../types/Question'
import { getTest } from '../../test/index'
import { it, expect, vi } from 'vitest'
import questions from '../resources/test_questions.json'

vi.mock('node-fetch', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as any),
    default: async () => ({
      json: async () => ({
        data: {
          test: {
            id: 'test',
            questions: questions as Question[],
            questionsNumber: 30,
            points: 180,
            passingPoint: 70
          }
        }
      })
    })
  }
})

vi.mock('../../model/question', () => {
  return {
    getQuestions: () =>
      questions.map((q: any) => ({ ...q, _id: { toString: () => q._id } }))
  }
})

it('should return a test object', async () => {
  const loadedTest = await getTest('testId')
  expect(loadedTest.id).eq('test')
  expect(loadedTest.questions.length).eq(1)
  expect(loadedTest.questions[0].text).deep.eq(questions[0].text)
  expect(loadedTest.questions[0]._id.toString()).eq(questions[0]._id)
})
