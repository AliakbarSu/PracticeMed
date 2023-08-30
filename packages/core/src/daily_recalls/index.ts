import sgMailClient from '@sendgrid/client'
import { Config } from 'sst/node/config'
import { design_html } from './html'
import moment from 'moment'
import { getTest } from '../test/index'
sgMailClient.setApiKey(Config.SENDGRID_API_KEY)

export const sendDailyRecalls = async () => {
  const data = {
    send_at: 'now'
  }

  try {
    const results = await createSingleSend()
    const singleSendId = (results as any)[0].body.id
    const request = {
      url: `/v3/marketing/singlesends/${singleSendId}/schedule`,
      method: 'PUT' as any,
      headers: {
        Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
      },
      body: data
    }
    await sgMailClient.request(request)
  } catch (err) {
    console.log(err)
    console.log('Error while sending daily recalls')
    Promise.reject(err)
  }
  return Promise.resolve('Daily recalls sent to the mailing list')
}

const createSingleSend = async () => {
  const questions = await get3RandomQuestions()
  const data = {
    name: `Daily recalls ${moment().format('DD-MM-YYYY')}`,
    send_to: {
      list_ids: ['544e3b58-0d0f-4ed8-a27a-d4e66924c695'] // sendgrid list id for daily recalls
    },
    email_config: {
      subject: 'AMC MCQ Daily Recalls',
      html_content: design_html({ questions }),
      editor: 'design',
      suppression_group_id: 40698, // Unsubscribe group id
      sender_id: 5213082 // info@practicemed.org
    }
  }

  const request = {
    url: `/v3/marketing/singlesends`,
    method: 'POST' as any,
    headers: {
      Authorization: `Bearer ${Config.SENDGRID_API_KEY}`
    },
    body: data
  }
  return new Promise((resolve, reject) => {
    sgMailClient.request(request).then(resolve).catch(reject)
  })
}

const get3RandomQuestions = async () => {
  const { questions } = await getTest('clgodqsus3bh40b1gaqxmm0wd') // AMC MCQ test id from hygraph
  if (questions.length <= 3) {
    return questions
  }

  const randomItems = []
  const cloneArray = [...questions] // Create a clone to avoid modifying the original array

  while (randomItems.length < 3) {
    const randomIndex = Math.floor(Math.random() * cloneArray.length)
    const randomItem = cloneArray.splice(randomIndex, 1)[0]
    randomItems.push(randomItem)
  }

  const randomQuestions = randomItems.map((question) => {
    const { text, options, answer } = question
    const correctOption = options.find(
      (option: { correct: any }) => option.correct
    )
    const incorrectOptions = options.filter(
      (option: { correct: any }) => !option.correct
    )
    return {
      text,
      correctOption,
      options: [
        correctOption.text,
        incorrectOptions[0].text,
        incorrectOptions[1].text
      ].sort(() => Math.random() - 0.5)
    }
  })

  return randomQuestions
}
