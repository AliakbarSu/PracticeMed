import { Context, SQSEvent } from 'aws-lambda'
// import { saveSubmittedAnswer } from '@mpt-sst/core/save_submitted_answer/index'
// import { SubmittedAnswer } from '@mpt-types/Result'

export const handler = async (event: SQSEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const messageBody = JSON.parse(event.Records[0].body) as {
    userId: string
    testId: string
    // answer: SubmittedAnswer
  }
  // await saveSubmittedAnswer(messageBody)
  // console.log('Answer submitted successfully', messageBody)
}

export const dd_handler = (event: SQSEvent) => {
  const messageBody = JSON.parse(event.Records[0].body)
  console.log('failed to process', messageBody)
}
