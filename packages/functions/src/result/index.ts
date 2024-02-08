import { ApiHandler } from 'sst/node/api'
import { analyze, saveOrUpdateTestResult } from '@mpt-sst/core/results/index'
import { UserSubmittedResult } from '@mpt-types/Result'
import { ApiGatewayAuth } from '@mpt-types/System'
import { getUser } from '@mpt-sst/core/model/users'
import { RolesEnum } from '@mpt-types/User'

export const get_test_result = ApiHandler(async _evt => {
  const userId = (_evt as unknown as ApiGatewayAuth).requestContext.authorizer
    .jwt.claims.sub
  try {
    const result: { user_id: string; id?: string } & UserSubmittedResult =
      JSON.parse(_evt.body || '') as unknown as UserSubmittedResult & {
        user_id: string
        id?: string
      }
    const { roles } = await getUser(userId)
    const analyzedResult = await analyze(result)

    if (
      result.user_id &&
      result.user_id !== userId &&
      !roles.includes(RolesEnum.Admin)
    ) {
      return {
        statusCode: 403,
        body: 'You are not authorized to access this resource',
      }
    }

    const updated_results = await saveOrUpdateTestResult({
      result: analyzedResult,
      user_id: result.user_id || userId,
      raw_result: result,
    })
    return {
      body: updated_results as unknown as string,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: 'Something went wrong on the server',
    }
  }
})
