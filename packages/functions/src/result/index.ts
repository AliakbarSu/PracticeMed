import { ApiHandler } from 'sst/node/api'
import { analyze, saveTestResult } from '@mpt-sst/core/results/index'
import { UserSubmittedResult } from '@mpt-types/Result'
import { ApiGatewayAuth } from '@mpt-types/System'

export const handler = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  const result: UserSubmittedResult = (
    JSON.parse(_evt.body || '') as unknown as {
      result: UserSubmittedResult
    }
  ).result
  const analyzedResult = await analyze(result)
  await saveTestResult({
    result: analyzedResult,
    user_id: userId
  })
  return {
    body: JSON.stringify(analyzedResult)
  }
})
