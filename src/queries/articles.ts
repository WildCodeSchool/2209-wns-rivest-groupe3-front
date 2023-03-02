import { gql } from '@apollo/client'

export const GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL = gql`
  query getAllArticles($limit: Float, $offset: Float) {
    getAllArticles(limit: $limit, offset: $offset) {
      id
      title
      postedAt
      createdAt
    }
    getNumberOfArticles
  }
`
