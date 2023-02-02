import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import EditDrag from './EditDrag'
import ListingBlogs from './ListingBlogs'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'

const Blog = () => {
  const { setMessage } = useContext(NotificationContext)
  const [isEditing, setIsEditing] = useState(false)
  const { slug } = useParams()

  const GET_BLOG = gql`
    query GetBlog($slug: String!) {
      getBlog(slug: $slug) {
        id
        name
        description
        template
        slug
        createdAt
        user {
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
  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: { slug },
  })

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <></>
  }

  if (data.getBlog.template === 0)
    return <BlogT1 setIsEditing={setIsEditing} blog={data.getBlog} />
  if (data.getBlog.template === 1) return <BlogT2 setIsEditing={setIsEditing} />
  return <></>
}

export default Blog
