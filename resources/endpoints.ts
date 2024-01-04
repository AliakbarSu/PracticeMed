export const endpoints = {
  hygraph: {
    dev: 'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master',
    prod: 'https://api-ap-southeast-2.hygraph.com/v2/clgn1doxk5et901ug6uub1w1u/master'
  },
  sanity: {
    dev: 'https://5f74k37r.api.sanity.io/v1/graphql/production/default',
    prod: 'https://5f74k37r.api.sanity.io/v1/graphql/production/default'
  },
  auth0_domain: {
    dev: 'https://practicemed.uk.auth0.com',
    prod: 'https://practicemed.uk.auth0.com'
  },
  auth0_client_id: {
    dev: '99gQVHl3gaeIuSoXJEfOZACGmjZmtEYa',
    prod: '99gQVHl3gaeIuSoXJEfOZACGmjZmtEYa'
  },
  frontend: {
    dev: 'http://localhost:3000',
    prod: 'https://practicemed.org'
  },
  domain: 'practicemed.org',
  custom_domains: {
    api: {
      dev: 'dev.api.practicemed.org',
      prod: 'prod.api.practicemed.org'
    },
    web: {
      dev: 'dev.practicemed.org',
      prod: 'practicemed.org'
    },
    cdn: {
      dev: 'dev.cdn.practicemed.org',
      prod: 'prod.cdn.practicemed.org'
    }
  },
  hosted_zone: 'practicemed.org'
}
