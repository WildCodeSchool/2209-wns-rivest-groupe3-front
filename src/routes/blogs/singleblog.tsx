import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_ONE_BLOG } from '../../queries/blogs'
import EditDrag from './EditDrag'

const Blog = () => {
  const { setMessage } = useContext(NotificationContext)
  const [isEditing, setIsEditing] = useState(false)
  const { slug } = useParams()
  const navigate = useNavigate()

  const editBlog = () => setIsEditing((isEditing) => !isEditing)
  const addArticle = () => navigate(`_`)

  const { loading, error, data } = useQuery(GET_ONE_BLOG, {
    variables: { slug },
  })

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <></>
  }
  const template: number = data.getBlog.template
  return (
    <>
      {isEditing && <EditDrag closeEdit={editBlog} />}
      {template === 2 ? (
        <BlogT2
          editBlog={editBlog}
          addArticle={addArticle}
          blog={data.getBlog}
          articles={data.getBlog.articles}
          editor={data.getBlog.editor}
        />
      ) : (
        <BlogT1
          editBlog={editBlog}
          addArticle={addArticle}
          blog={data.getBlog}
          articles={data.getBlog.articles}
          editor={data.getBlog.editor}
        />
      )}
    </>
  )
}

export default Blog
