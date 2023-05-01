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
  query GetTest($id: ID!, $first: Int, $skip: Int) {
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
      questions(first: $first, skip: $skip) {
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
