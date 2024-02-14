import { getQuestion } from '@mpt-sst/core/model/question'
import { ApiHandler } from 'sst/node/api'

export const get_question = ApiHandler(async _evt => {
  const id = (_evt as unknown as { pathParameters: { id: string } })
    .pathParameters.id
  if (!id) {
    return {
      statusCode: 400,
      body: 'Missing id',
    }
  }
  const questions = await getQuestion(id)
  if (!questions.length) {
    return {
      statusCode: 404,
      body: 'Question not found',
    }
  }
  const question = questions[0]
  const mappedQuestion = {
    text: question.text,
    options: question.options.map(option => ({
      alpha: option.alpha,
      text: option.text,
    })),
  }
  return {
    body: mappedQuestion as unknown as string,
  }
})
