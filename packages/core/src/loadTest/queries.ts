import { gql } from 'graphql-request'

export const listTestsQuery = gql`
  query GetTests {
    tests {
      available
      id
      name
      type
      description
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
    }
  }
`

export const getTrialTestsQuery = gql`
  query GetTest($type: String!) {
    tests(where: { type: $type, trial: true }) {
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
    }
  }
`
