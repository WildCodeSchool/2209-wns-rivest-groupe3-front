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

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    getAllBlogs {
      id
      name
      slug
      description
      template
      createdAt
      user {
        id
        nickname
      }
    }
  }
`

export const GET_ALL_BLOGS_WITH_LIMIT_AND_TOTAL = gql`
  query GetAllBlogs($limit: Float, $offset: Float) {
    getAllBlogs(limit: $limit, offset: $offset) {
      id
      name
      slug
      description
      template
      createdAt
      coverUrl
      user {
        id
        nickname
      }
    }
    getNumberOfBlogs
  }
`

export const GET_ONE_BLOG = gql`
  query GetBlog($slug: String!) {
    getBlog(slug: $slug) {
      id
      name
      description
      template
      slug
      createdAt
      coverUrl
      editor: user {
        id
        avatar
        nickname
        city
        description
        blogs {
          slug
        }
      }
      subscriptions {
        id
        user {
          id
          nickname
        }
      }
      articles {
        id
        slug
        title
        coverUrl
        articleContent {
          id
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
          current
        }
      }
    }
  }
`

export const CREATE_BLOG = gql`
  mutation Mutation($description: String!, $name: String!, $template: Float!) {
    createBlog(description: $description, name: $name, template: $template) {
      name
      id
      slug
    }
  }
`

export const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $slug: String!
    $name: String
    $description: String
    $template: Float
  ) {
    updateBlog(
      blogSlug: $slug
      name: $name
      description: $description
      template: $template
    ) {
      id
      name
      description
      slug
    }
  }
`

export const UPDATE_COVER_IMG = gql`
  mutation UpdateBlog($slug: String!, $coverUrl: String) {
    updateBlog(blogSlug: $slug, coverUrl: $coverUrl) {
      coverUrl
    }
  }
`

export const GET_ALL_SLUGS = gql`
  query GetAllBlogs {
    getAllBlogs {
      slug
      name
    }
  }
`

export const GET_FIRST_BLOGS_AND_ARTICLES = gql`
  query getAllBlogsAndArticles($limit: Float) {
    getAllBlogs(limit: $limit) {
      id
      name
      slug
      description
      createdAt
      user {
        nickname
      }
      coverUrl
    }
    getAllArticles(limit: $limit) {
      id
      slug
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
  }
`
