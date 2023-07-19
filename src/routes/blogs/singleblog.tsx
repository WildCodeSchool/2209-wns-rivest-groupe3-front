import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import { GET_ONE_BLOG } from '../../queries/blogs'
import EditDrag from './EditDrag'
import { IBlog } from '../../utils/interfaces/Interfaces'
import UpdateForm from './UpdateForm'
import ErrorComponent from '../../components/ErrorComponent'

const Blog = () => {
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

  const { loading, data, error } = useQuery(GET_ONE_BLOG, {
    variables: { slug },
  })

  useEffect(() => {
    if (data) setBlog(data.getBlog)
  }, [data])

  if (loading) return <>Chargement...</>
  if (error)
    return (
      <div className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <ErrorComponent error={error} />
      </div>
    )

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
