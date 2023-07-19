import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
  mutation CommentArticle($articleId: String!, $content: String!) {
    commentArticle(articleId: $articleId, content: $content) {
      id
      content
      createdAt
      updatedAt
      user {
        nickname
        id
      }
    }
  }
`
export const GET_ALL_COMMENTS_OF_AN_ARTICLE = gql`
  query getOneArticleComments($blogSlug: String!, $slug: String!) {
    getOneArticleComments(blogSlug: $blogSlug, slug: $slug) {
      id
      comments {
        id
        content
        createdAt
        updatedAt
        user {
          nickname
          id
        }
      }
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: String!, $content: String!) {
    updateComment(commentId: $commentId, content: $content) {
      content
      updatedAt
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`
