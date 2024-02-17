import { getAllUsers, getUser } from '@mpt-sst/core/model/users'
import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda'
import {
  addQuestion,
  getQuestions,
  updateQuestion,
} from '@mpt-sst/core/model/question'
import { RolesEnum } from '@mpt-types/User'
import { InputQuestion, QuestionObject } from '@mpt-types/Question'
import { v4 } from 'uuid'

export const get_users: APIGatewayProxyHandlerV2WithJWTAuthorizer<{
  body: any
}> = async _evt => {
  const userId = _evt.requestContext.authorizer.jwt.claims.sub as string
  const { roles } = await getUser(userId)
  if (!roles.includes(RolesEnum.Admin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' }),
    }
  }
  const users = await getAllUsers()
  const usersWithTimestamp = users.map(user => ({
    ...user,
    created_at: (user as any)._id.getTimestamp(),
  }))
  return {
    body: usersWithTimestamp,
  }
}

export const get_questions: APIGatewayProxyHandlerV2WithJWTAuthorizer<{
  body: QuestionObject[]
}> = async _evt => {
  const userId = _evt.requestContext.authorizer.jwt.claims.sub as string
  const { roles } = await getUser(userId)
  if (!roles.includes(RolesEnum.Admin)) {
    return {
      statusCode: 403,
      body: 'Forbidden',
    }
  }
  const questions = await getQuestions()
  return {
    body: questions,
  }
}

export const add_question: APIGatewayProxyHandlerV2WithJWTAuthorizer<{
  body: QuestionObject
}> = async _evt => {
  const userId = _evt.requestContext.authorizer.jwt.claims.sub as string
  const { roles } = await getUser(userId)
  if (!roles.includes(RolesEnum.Admin)) {
    return {
      statusCode: 403,
      body: 'Forbidden',
    }
  }
  const data = JSON.parse((_evt as any).body) as InputQuestion
  const options: QuestionObject['options'] = [
    {
      alpha: 'A',
      id: v4(),
      text: data.option_a,
      explanation: data.option_a_explanation,
      is_correct: data.correct_option.toLowerCase() == 'a',
    },
    {
      alpha: 'B',
      id: v4(),
      text: data.option_b,
      explanation: data.option_b_explanation,
      is_correct: data.correct_option.toLowerCase() == 'b',
    },
    {
      alpha: 'C',
      id: v4(),
      text: data.option_c,
      explanation: data.option_c_explanation,
      is_correct: data.correct_option.toLowerCase() == 'c',
    },
    {
      alpha: 'D',
      id: v4(),
      text: data.option_d,
      explanation: data.option_d_explanation,
      is_correct: data.correct_option.toLowerCase() == 'd',
    },
  ]
  const formattedData: Omit<QuestionObject, '_id'> = {
    text: data.question,
    demo: data.demo,
    type: 'amc',
    available: true,
    deleted: false,
    field: data.field,
    options: options,
    correct_option: options.find(
      option => option.alpha.toLowerCase() == data.correct_option.toLowerCase(),
    ) as QuestionObject['correct_option'],
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  }
  const addedQuestion = await addQuestion(formattedData)
  return {
    body: addedQuestion as QuestionObject,
  }
}

export const update_question: APIGatewayProxyHandlerV2WithJWTAuthorizer =
  async _evt => {
    const userId = _evt.requestContext.authorizer.jwt.claims.sub as string
    const { roles } = await getUser(userId)
    if (!roles.includes(RolesEnum.Admin)) {
      return {
        statusCode: 403,
        body: 'Forbidden',
      }
    }
    const data = JSON.parse((_evt as any).body)
    const questionId = data.id
    const updatedQuestion = await updateQuestion(questionId, data)
    return {
      body: updatedQuestion,
    }
  }

export const delete_question: APIGatewayProxyHandlerV2WithJWTAuthorizer<{
  body: QuestionObject
}> = async _evt => {
  const userId = _evt.requestContext.authorizer.jwt.claims.sub as string
  const { roles } = await getUser(userId)
  if (!roles.includes(RolesEnum.Admin)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Forbidden' }),
    }
  }
  const questionId = (_evt as any).pathParameters.id
  const question = await updateQuestion(questionId, { deleted: true })
  return {
    body: question,
  }
}
