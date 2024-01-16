import { Question } from '../../../types/Question'
import { loadTest } from '../../loadTest/index'
import { it, expect, vi } from 'vitest'
import questions from '../resources/questions.json'
import { updateUser } from '../../model/users'
import { addTest } from '../../model/test'

vi.mock('../../test/index', () => {
  return {
    getTest: () => ({
      id: 'test',
      questions: questions as Question[],
      questionsNumber: 30,
      points: 180,
      passingPoint: 70
    })
  }
})

vi.mock('../../model/users', () => {
  return {
    getUser: () => ({
      plan: {
        used: 0,
        limit: 10
      }
    }),
    updateUser: vi.fn()
  }
})

vi.mock('../../model/test', () => {
  return {
    addTest: vi.fn()
  }
})

it('should load test correctly', async () => {
  const loadedTest = await loadTest({ testId: 'testId', userId: 'userId' })
  expect(loadedTest.id).eq('test')
  expect(loadedTest.questions.length).eq(30)
  expect(updateUser).toHaveBeenCalledOnce()
  expect(addTest).toHaveBeenCalledOnce()
})
