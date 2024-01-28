import { gql } from 'graphql-request'

export const listTestsQuery = gql`
  query GetTests($trial: Boolean!, $demo: Boolean!, $available: Boolean!) {
    tests(where: { trial: $trial, demo: $demo, available: $available }) {
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
      demo
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

export const get30QuestionQuery = gql`
  query GetQuestions($type: String!) {
    allQuestion(limit: 30, where: { type: { eq: $type } }) {
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
