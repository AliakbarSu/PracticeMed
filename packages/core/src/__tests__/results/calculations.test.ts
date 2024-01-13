import { Question } from '../../../types/Question'
import { isCorrectOption } from '../../results/calculations'
import { it, expect } from 'vitest'

it('should return correct option', () => {
  const question: Question = {
    options: [{ alpha: 'a', id: 'test', text: 'test', correct: true }],
    text: 'test',
    correct_option_explanation: '',
    difficulty_level: 1,
    field: 'sa',
    id: 'test',
    point: 22,
    correct_option_id: 'a'
  }
  expect(isCorrectOption({ option_id: 'a' } as any, question as any)).eq(true)
})
