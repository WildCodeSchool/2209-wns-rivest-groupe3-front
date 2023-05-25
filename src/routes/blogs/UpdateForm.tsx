import { useMutation, useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageHandler from '../../components/imagehandler/ImageHandler'
import { NotificationContext } from '../../contexts/NotificationContext'
import {
  GET_ALL_SLUGS,
  GET_ONE_BLOG,
  UPDATE_BLOG,
  UPDATE_COVER_IMG,
} from '../../queries/blogs'
import { IBlog } from '../../utils/interfaces/Interfaces'
import BlogDetailsForm from './BlogDetailsForm'
import TemplateSelect from './TemplateSelect'

const UpdateForm = ({
  slug,
  blog,
  closeEdit,
  reset,
  setBlog,
}: {
  slug: string | undefined
  blog: IBlog
  closeEdit: () => void
  reset: () => void
  setBlog: React.Dispatch<React.SetStateAction<IBlog | null>>
}) => {
  const navigate = useNavigate()
  const { setMessage } = useContext(NotificationContext)
  const { loading, error, data } = useQuery(GET_ALL_SLUGS)
  const { id, name, coverUrl } = blog

  const [updateBlog] = useMutation(UPDATE_BLOG, {
    refetchQueries: [
      {
        query: GET_ONE_BLOG,
        variables: { slug },
      },
    ],
  })

  const [updateCoverImg] = useMutation(UPDATE_COVER_IMG, {
    refetchQueries: [
      {
        query: GET_ONE_BLOG,
        variables: { slug },
      },
    ],
  })

  const updateCoverUrl = async (coverUrl: string | null) => {
    try {
      await updateCoverImg({ variables: { slug, coverUrl: coverUrl } })
      setMessage({
        text: `Votre image de couverture a été mis à jour avec succès !`,
        type: 'success',
      })
    } catch (err) {
      setMessage({
        text: `Impossible de mettre à jour votre image de couverture. ${err}.`,
        type: 'error',
      })
      console.error(err)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { name, description, template } = blog
    const blogToUpload = { name, description, template }

    updateBlog({ variables: { slug, ...blogToUpload } })
      .then((blog) => {
        setMessage({
          text: `Blog mis à jour avec succès !`,
          type: 'success',
        })
        const newSlug: string = blog.data.updateBlog.slug
        navigate(`/blogs/${newSlug}`)
        closeEdit()
      })
      .catch((err) => {
        setMessage({
          text: `Impossible de mettre à jour le blog. ${err}.`,
          type: 'error',
        })
        console.error(err)
      })
  }
  
  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <div>Erreur</div>
  }

  const initialsBlogs: { dataSlugs: string[]; dataNames: string[] } = {
    dataSlugs: [],
    dataNames: [],
  }
  const blogs = data.getAllBlogs.reduce(
    (
      acc: { dataSlugs: string[]; dataNames: string[] },
      cur: { slug: string; name: string }
    ) => {
      if (cur.slug === slug || cur.name === name) return acc
      acc.dataSlugs.push(cur.slug)
      acc.dataNames.push(cur.name)
      return acc
    },
    initialsBlogs
  )
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <BlogDetailsForm blog={blog} blogs={blogs} setBlog={setBlog} />
      <span className='text-white font-bold block'>Image de couverture :</span>
      <ImageHandler
        type="cover"
        imgUrl={coverUrl}
        blogId={id}
        updateBackendUrlImg={updateCoverUrl}
      />
      <TemplateSelect blog={blog} setBlog={setBlog} />
      <div className="flex justify-around gap-2 w-full">
        <button type="submit" className="btn btn-info w-1/2">
          Sauvegarder
        </button>
        <button type="button" className="btn btn-secondary w-1/2" onClick={reset}>
          Annuler
        </button>
      </div>
    </form>
  )
}

export default UpdateForm
