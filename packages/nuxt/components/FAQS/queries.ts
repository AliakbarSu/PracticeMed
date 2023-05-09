import gql from 'graphql-tag'

export const getFaqs = gql`
  query GetFAQS {
    faqses {
      question
      answer
    }
  }
`
