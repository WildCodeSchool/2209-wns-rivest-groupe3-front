import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetOneUser($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      nickname
      lastName
      firstName
      description
      createdAt
      city
      avatar
    }
  }
`
