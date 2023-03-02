import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation Mutation($nickname: String!, $password: String!, $email: String!) {
    createUser(nickname: $nickname, password: $password, email: $email) {
      nickname
    }
  }
`

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
export const GET_TOKEN = gql`
  mutation Mutation($password: String!, $email: String!) {
    login: getToken(password: $password, email: $email) {
      token
      user {
        id
        nickname
        email
        lastName
        firstName
        lastLogin
        description
        createdAt
        avatar
      }
    }
  }
`
