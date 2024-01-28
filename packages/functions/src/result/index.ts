import { ApiHandler } from 'sst/node/api'
import { analyze, saveTestResult } from '@mpt-sst/core/results/index'
import { UserSubmittedResult } from '@mpt-types/Result'
import { ApiGatewayAuth } from '@mpt-types/System'

export const get_test_result = ApiHandler(async (_evt) => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  try {
    const result: UserSubmittedResult = JSON.parse(
      _evt.body || ''
    ) as unknown as UserSubmittedResult
    const analyzedResult = await analyze(result)

    await saveTestResult({
      result: analyzedResult,
      user_id: userId,
      raw_result: result
    })
    return {
      body: analyzedResult as unknown as string
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Something went wrong on the server'
    }
  }
})
