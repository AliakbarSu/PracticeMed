import { ApiHandler } from 'sst/node/api'
import { sendDailyRecalls } from '@mpt-sst/core/daily_recalls/index'

export const send = ApiHandler(async (_evt) => {
  await sendDailyRecalls()
  return {
    body: `Daily recalls sent to the mailing list`
  }
})

export const empty = ApiHandler(async (_evt) => {
  return {
    body: `Daily recalls not sent to the mailing list`
  }
})
