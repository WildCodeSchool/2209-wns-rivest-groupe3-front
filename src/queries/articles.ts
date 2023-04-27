import { gql } from '@apollo/client'

export const GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL = gql`
  query getAllArticles($limit: Float, $offset: Float) {
    getAllArticles(limit: $limit, offset: $offset) {
      id
      title
      blog {
        id
        name
        slug
        user {
          nickname
        }
      }
      postedAt
      createdAt
    }
    getNumberOfArticles
  }
`

export const CREATE_ARTICLE = gql`
  mutation CreateArticle(
    $blogId: String!
    $title: String!
    $show: Boolean!
    $version: Float!
    $articleContent: IContentType!
  ) {
    createArticle(
      blogId: $blogId
      title: $title
      show: $show
      version: $version
      articleContent: $articleContent
    ) {
      show
      version
      id
      title
      slug
      postedAt
      createdAt
      articleContent {
        content {
          time
          version
          blocks {
            data {
              items
              level
              style
              text
            }
            id
            type
          }
        }
        id
        version
      }
    }
  }
`
export const GET_ONE_ARTICLE = gql`
  query ($slug: String!, $blogSlug: String!, $allVersions: Boolean) {
    getOneArticle(slug: $slug, blogSlug: $blogSlug, allVersions: $allVersions) {
      id
      postedAt
      show
      slug
      title
      articleContent {
        version
        id
        current
        content {
          time
          version
          blocks {
            id
            type
            data {
              text
              level
              style
              items
            }
          }
        }
      }
      version
    }
    getBlog(slug: $blogSlug) {
      id
      name
      description
      slug
      user {
        id
        avatar
        nickname
        city
        blogs {
          slug
        }
      }
    }
  }
`
export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle(
    $blogId: String!
    $show: Boolean!
    $version: Float!
    $articleContent: IContentType!
    $articleId: String!
    $title: String!
  ) {
    updateArticle(
      blogId: $blogId
      show: $show
      version: $version
      articleContent: $articleContent
      articleId: $articleId
      title: $title
    ) {
      id
      postedAt
      show
      slug
      version
      articleContent {
        id
        current
        content {
          time
          version
          blocks {
            id
            type
            data {
              text
              level
              style
              items
            }
          }
        }
        version
      }
    }
  }
`
