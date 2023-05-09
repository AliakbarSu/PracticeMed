import gql from 'graphql-tag'

export const getAbout = gql`
  query AboutPage {
    about(where: { id: "clgpviive52f30b1geewv9m08" }) {
      heading
      content
    }
  }
`
