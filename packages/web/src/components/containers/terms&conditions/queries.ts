import gql from 'graphql-tag'

export const getTerms = gql`
  query Terms {
    termsConditions {
      item
      description
    }
  }
`
