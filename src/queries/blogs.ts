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

export const GET_ONE_BLOG = gql`
  query GetBlog($slug: String!) {
    getBlog(slug: $slug) {
      id
      name
      description
      template
      slug
      createdAt
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
      articles {
        id
        slug
        title
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
mutation Mutation(
  $description: String!
  $name: String!
  $template: Float!
) {
  createBlog(description: $description, name: $name, template: $template) {
    name
    id
    slug
  }
}
`