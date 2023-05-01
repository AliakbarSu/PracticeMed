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
      questions {
        id
        point
        text
        options {
          alpha
          correct
          id
          text
        }
        field
        correct_option_id
        correct_option_explanation
      }
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
      questions(first: 100) {
        id
        point
        text
        options {
          alpha
          correct
          id
          text
        }
        field
        correct_option_id
        correct_option_explanation
      }
    }
  }
`

export const getTestQuery1 = gql`
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
      questions(first: 50, skip: 100) {
        id
        point
        text
        options {
          alpha
          correct
          id
          text
        }
        field
        correct_option_id
        correct_option_explanation
      }
    }
  }
`
