import { ApiHandler } from 'sst/node/api'
import { UserSubmittedResult } from '@mpt-types/Result'
import { ApiGatewayAuth } from '@mpt-types/System'
import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

type authEvent = ApiGatewayAuth
export const handler = ApiHandler(async (event) => {
  const userId = (event as unknown as authEvent).requestContext.authorizer.jwt
    .claims.sub
  try {
    const result: UserSubmittedResult = JSON.parse(
      event.body || ''
    ) as unknown as UserSubmittedResult

    const messageBody = {
      userId,
      testId: event.pathParameters?.id,
      result
    }
    const params = {
      MessageBody: JSON.stringify(messageBody),
      QueueUrl: process.env.queue_url || ''
    }
    await sqs.sendMessage(params).promise()
    return {
      body: 'Answer submitted successfully'
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: 'Something went wrong on the server'
    }
  }
})
