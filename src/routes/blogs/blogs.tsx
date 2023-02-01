import { gql, useQuery } from '@apollo/client'
import { Route, Routes } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import EditDrag from './EditDrag'
import ListingBlogs from './ListingBlogs'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'

const Blogs = () => {
  const { setMessage } = useContext(NotificationContext)

  const GET_ALL_BLOGS = gql`
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

  const { loading, error, data } = useQuery(GET_ALL_BLOGS)

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <></>
  }
  return (
    <>
    {isEditing && <EditDrag setIsEditing={setIsEditing} />}
    <Routes>
        <Route element={<ListingBlogs />} path="/" />
        <Route element={<BlogT2 setIsEditing={setIsEditing} />} path="/:blogname" />
        <Route element={<BlogT1 setIsEditing={setIsEditing} />} path="/:blogname/T1" />
    </Routes>
  )
}

export default Blogs
