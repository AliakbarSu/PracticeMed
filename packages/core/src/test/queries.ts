import { gql } from 'graphql-request'

export const listTestsQuery = gql`
  query GetTests($trial: Boolean!) {
    tests(where: { trial: $trial }) {
      available
      id
      name
      type
      description
      trial
      instructions
      breaks
      timeLimit
      points
      passingPoint
      thumbnail {
        url
      }
    }
  }
`

export const getTestQuery = gql`
  query GetTest($id: ID!) {
    test(where: { id: $id }) {
      available
      id
      name
      type
      description
      trial
      instructions
      breaks
      timeLimit
      points
      passingPoint
      questionsNumber
    }
  }
`

export const getQuestionQuery = gql`
  query GetQuestions($type: String!) {
    allQuestion(where: { type: { eq: $type } }) {
      id
      point
      textRaw
      options {
        alpha
        correct
        text
      }
      field
      correct_option_id
      correct_option_explanation
    }
  }
`
