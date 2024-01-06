import { Queue, StackContext } from 'sst/constructs'
import { functions } from '../resources/functions'

export function QueueStack({ stack }: StackContext) {
  const submit_answer_ddl = new Queue(stack, 'ddl', {
    consumer: functions.submit_answer_ddl
  })
  const submit_answer_queue = new Queue(stack, 'queue', {
    consumer: functions.submit_answer_queue,
    cdk: {
      queue: {
        deadLetterQueue: {
          queue: submit_answer_ddl.cdk.queue,
          maxReceiveCount: 1
        }
      }
    }
  })

  return {
    submit_answer_queue,
    submit_answer_ddl
  }
}
