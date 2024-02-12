export const blog = `
    id
    title
    subtitle
    slug
    createdAt
    publishedOn
    topic
    blurb
    updatedBy {
    name
    }
    body {
    html
    text
    }
    thumbnail {
        handle
        url
      }
`;

export const faqs = `
  query GetFAQS {
    faqses {
      question
      answer
    }
  }
`;

export const terms_conditions = `
    query Terms {
      termsConditions {
        item
        description
      }
    }
  `;
