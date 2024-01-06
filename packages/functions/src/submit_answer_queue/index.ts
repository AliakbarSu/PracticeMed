import { SQSEvent } from 'aws-lambda'
export const handler = (event: SQSEvent) => {
  const messageBody = JSON.parse(event.Records[0].body)
  console.log('submitted answer', messageBody)
}

export const dd_handler = (event: SQSEvent) => {
  const messageBody = JSON.parse(event.Records[0].body)
  console.log('failed to process', messageBody)
}
