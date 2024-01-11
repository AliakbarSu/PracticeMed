import { Config } from 'sst/node/config'
import { ChatGPTAPI } from 'chatgpt'
import { TestPerformanceResult } from '../../types/Result'
import { getUser } from '../model/users'

export const generate_tips = async ({
  testId,
  userId
}: {
  testId: string
  userId: string
}): Promise<string> => {
  const user = await getUser(userId)
  const test = user.tests.find((test) => test.id === testId)

  if (!test) {
    return Promise.reject('Test not found')
  }

  // TODO: Uncomment this when we have a valid API key

  // const api = new ChatGPTAPI({
  //   apiKey: Config.SENDGRID_API_KEY
  // })

  const command = `
    analyse this information and give me some meaningful feedback,
    Give me in the form of bullet points, Don't mention seeking guidance, Generate maximum 5 tips,
    Write it in html markup and only include ul tag
    ${test.stats}
  `
  // const res = await api.sendMessage(command)
  // return res.text
  return ''
}
