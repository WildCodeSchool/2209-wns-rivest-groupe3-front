import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_ONE_BLOG } from '../../queries/blogs'
import EditDrag from './EditDrag'
import { IBlog } from '../../utils/interfaces/Interfaces'
import UpdateForm from './UpdateForm'

const Blog = () => {
  const { setMessage } = useContext(NotificationContext)
  const [isEditing, setIsEditing] = useState(false)
  const [blog, setBlog] = useState<IBlog | null>(null)

  const { slug } = useParams()
  const navigate = useNavigate()

  const editBlog = () => setIsEditing((isEditing) => !isEditing)
  const resetChangements = () => {
    setBlog(data.getBlog)
    setIsEditing(false)
  }
  const addArticle = () => navigate(`_`)

  const { loading, error, data } = useQuery(GET_ONE_BLOG, {
    variables: { slug },
  })

  useEffect(() => {
    if (data) setBlog(data.getBlog)
  }, [data])

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <div>Erreur</div>
  }

  return (
    blog && (
      <>
        {isEditing && (
          <EditDrag>
            <UpdateForm
              slug={slug}
              blog={blog}
              closeEdit={editBlog}
              reset={resetChangements}
              setBlog={setBlog}
            />
          </EditDrag>
        )}
        {blog.template === 2 ? (
          <BlogT2
            editBlog={editBlog}
            addArticle={addArticle}
            blog={blog}
            articles={data.getBlog.articles}
            editor={data.getBlog.editor}
          />
        ) : (
          <BlogT1
            editBlog={editBlog}
            addArticle={addArticle}
            blog={blog}
            articles={data.getBlog.articles}
            editor={data.getBlog.editor}
          />
        )}
      </>
    )
  )
}

export default Blog
