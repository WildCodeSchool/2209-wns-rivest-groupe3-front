import { gql } from '@apollo/client'

export const GET_ALL_BLOGS_FOR_DISCOVER = gql`
  query GetAllBlogs {
    getAllBlogs {
      id
      name
      description
      createdAt
      slug
      user {
        id
        nickname
      }
    }
  }
`
