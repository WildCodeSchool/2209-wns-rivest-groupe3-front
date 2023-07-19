import { gql } from '@apollo/client'

export const GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL = gql`
  query getAllArticles($limit: Float, $offset: Float) {
    getAllArticles(limit: $limit, offset: $offset) {
      id
      title
      coverUrl
      blog {
        id
        name
        slug
        user {
          nickname
        }
      }
      slug
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
      coverUrl
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
              caption
              file {
                url
              }
              stretched
              withBackground
              withBorder
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
    $coverUrl: String
  ) {
    updateArticle(
      blogId: $blogId
      show: $show
      version: $version
      articleContent: $articleContent
      articleId: $articleId
      title: $title
      coverUrl: $coverUrl
    ) {
      id
      postedAt
      show
      slug
      version
      coverUrl
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
