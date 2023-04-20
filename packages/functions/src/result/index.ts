import { ApiHandler } from 'sst/node/api'
import { analyze, saveTestResult } from '@mpt-sst/core/results/index'
import { UserSubmittedResult } from '@mpt-types/Result'

export const handler = ApiHandler(async (_evt) => {
  const result: UserSubmittedResult = (
    JSON.parse(_evt.body || '') as unknown as {
      result: UserSubmittedResult
    }
  ).result
  const analyzedResult = await analyze(result)
  await saveTestResult({
    result: analyzedResult,
    user_id: 'auth0|64409c95c3a961d278445467'
  })
  return {
    body: JSON.stringify(analyzedResult)
  }
})
