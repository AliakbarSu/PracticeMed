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

export const get_videos = `
  query GetVideos {
      videos {
      thumbnails {
        id
        url
        width
      }
      title
      topic
      description
      id
      objectKey
    }
  }
`;
