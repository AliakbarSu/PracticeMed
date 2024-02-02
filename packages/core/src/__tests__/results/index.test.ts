import { Question } from '../../../types/Question'
import { analyze } from '../../results/index'
import { it, expect, vi } from 'vitest'
import questions from '../resources/questions.json'
import pass_test_results from '../resources/pass_test_result.json'
import correct_calculations from '../resources/correct_calculation_results.json'
import { TestPerformanceResult } from '../../../types/Result'

vi.mock('../../test/index', () => {
  return {
    getTest: () => ({
      questions: questions.map((q: any) => ({
        ...q,
        point: 1
      })),
      questionsNumber: 30,
      points: 180,
      passingPoint: 70
    })
  }
})

it('should analyse test correctly', async () => {
  const result = (await analyze(pass_test_results)) as TestPerformanceResult
  const expectedResults = correct_calculations as TestPerformanceResult
  expect(result.stats.testScore).equal(expectedResults.stats.testScore)
  expect(result.stats.totalPoints).equal(expectedResults.stats.totalPoints)
  expect(result.stats.averageTimeTaken).equal(
    expectedResults.stats.averageTimeTaken
  )
  expect(result.stats.averageTimeTakenPerField).deep.equal(
    expectedResults.stats.averageTimeTakenPerField
  )
  expect(result.stats.fieldsAverageTime).equal(
    expectedResults.stats.fieldsAverageTime
  )
  expect(result.stats.totalPointsPerField).deep.equal(
    expectedResults.stats.totalPointsPerField
  )
  expect(result.stats.correctResponseRate).equal(
    expectedResults.stats.correctResponseRate
  )
  expect(result.stats.incorrectResponseRate).equal(
    expectedResults.stats.incorrectResponseRate
  )
  expect(result.stats.correctResponseCount).equal(
    expectedResults.stats.correctResponseCount
  )
  expect(result.stats.incorrectResponseCount).equal(
    expectedResults.stats.incorrectResponseCount
  )
  expect(result.stats.correctResponseRatePerField).deep.equal(
    expectedResults.stats.correctResponseRatePerField
  )
  expect(result.stats.incorrectResponseRatePerField).deep.equal(
    expectedResults.stats.incorrectResponseRatePerField
  )
  expect(result.stats.correctResponseCountPerField).deep.equal(
    expectedResults.stats.correctResponseCountPerField
  )
  expect(result.stats.correctAnswersByMinuteInterval).deep.equal(
    expectedResults.stats.correctAnswersByMinuteInterval
  )
  expect(result.stats.incorrectResponseCountPerField).deep.equal(
    expectedResults.stats.incorrectResponseCountPerField
  )
  expect(result.stats.speedByMinuteInterval).deep.equal(
    expectedResults.stats.speedByMinuteInterval
  )
})
