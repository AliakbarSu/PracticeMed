import { Question } from '../../../types/Question'
import { isCorrectOption } from '../../results/calculations'
import { it, expect } from 'vitest'

it('should return correct option', () => {
  const question: Question = {
    _id: { toString: () => 'test' } as string,
    options: [
      {
        alpha: 'a',
        id: 'test',
        text: 'test',
        is_correct: true,
        explanation: ''
      }
    ],
    correct_option: {
      alpha: 'a',
      id: 'test',
      text: 'test',
      is_correct: true,
      explanation: ''
    },
    text: 'test',
    difficulty_level: 1,
    field: 'sa',
    point: 22
  }
  expect(isCorrectOption({ option_id: 'a' } as any, question as any)).eq(true)
})
