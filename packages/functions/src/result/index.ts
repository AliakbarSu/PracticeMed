import { ApiHandler } from 'sst/node/api'
import { analyze } from '@mpt-sst/core/results/index'
import { UserSubmittedResult } from '@mpt-types/Result'

export const handler = ApiHandler(async (_evt) => {
  const result: UserSubmittedResult = (
    JSON.parse(_evt.body || '') as unknown as {
      result: UserSubmittedResult
    }
  ).result
  const analyzedResult = await analyze(result)
  return {
    body: JSON.stringify(analyzedResult)
  }
})
