import { gql, useQuery } from '@apollo/client'
import { Route, Routes } from 'react-router-dom'
import ListingBlogs from './ListingBlogs'
import Blog from './singleblog'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import Article from './articles/singleArticle'
import ArticleEditor from './articles/newArticle'

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
    <Routes>
      <Route element={<ListingBlogs blogs={data.getAllBlogs} />} path="/" />
      <Route element={<Blog />} path="/:slug" />
      <Route element={<ArticleEditor />} path="/:blogSlug/_" />
      <Route element={<Article />} path="/:blogSlug/:slug" />
    </Routes>
  )
}

export default Blogs
