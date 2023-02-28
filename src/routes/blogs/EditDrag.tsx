import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_ALL_SLUGS, GET_ONE_BLOG, UPDATE_BLOG } from '../../queries/blogs'
import { IBlog } from '../../utils/interfaces/Interfaces'
import { slugPreview } from '../../utils/slug'
import ImageHandler from '../../components/imagehandler/ImageHandler'

interface Position {
  x: number
  y: number
}

const EditDrag = ({
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
  const { name, description } = blog

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [errorField, setErrorField] = useState<{
    name?: string | null
    description?: string | null
  }>({})
  const { setMessage } = useContext(NotificationContext)

  const { loading, error, data } = useQuery(GET_ALL_SLUGS)

  const navigate = useNavigate()

  const handleMouseDown = (e: React.MouseEvent) => {
    const initialX = e.clientX - position.x
    const initialY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - initialX > 0 ? e.clientX - initialX : 0,
        y: e.clientY - initialY > 0 ? e.clientY - initialY : 0,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mouseup', handleMouseUp)
  }

  const [updateBlog] = useMutation(UPDATE_BLOG, {
    refetchQueries: [
      {
        query: GET_ONE_BLOG,
        variables: { slug },
      },
    ],
  })

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
    { dataSlugs: [], dataNames: [] }
  )
  const { dataSlugs, dataNames } = blogs

  return (
    <div
      className="w-96 bg-primary rounded-md fixed cursor-move z-50 p-4"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="form-control">
          <span className="label font-bold text-white">Nom du blog :</span>
          <input
            className={`input input-bordered ${
              errorField.name && 'input-error'
            }`}
            id="name"
            type="name"
            placeholder="Nom du blog"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (dataNames.includes(e.target.value))
                setErrorField({
                  ...errorField,
                  name: 'Ce nom est déjà utilisé.',
                })
              else
                setErrorField({
                  ...errorField,
                  name: null,
                })
              setBlog({ ...blog, name: e.target.value })
            }}
            value={name}
            minLength={5}
            maxLength={50}
            required
          />
          {errorField.name && (
            <span className="text-error self-end">{errorField.name}</span>
          )}
        </label>
        <div className="label font-bold text-white">
          <span>Lien :</span>
          <u>/blogs/{slugPreview(blog.name, dataSlugs)}</u>
        </div>
        <label className="form-control">
          <span className="label font-bold text-white">Description :</span>
          <textarea
            className="input input-bordered h-48 p-4"
            id="description"
            placeholder="Description"
            maxLength={500}
            onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            value={description}
          />
        </label>
        {/* Put the cover link => ex: blog.cover-url */}
        <ImageHandler type="cover" imgUrl={null}  />
        <button type="button" className="btn btn-info self-center w-full">
          + Ajouter un article
        </button>
        <div className="flex justify-between gap-2 text-white mx-auto w-full">
          <label
            className={`flex flex-col justify-start items-center gap-2 font-bold cursor-pointer rounded py-2 px-6 w-1/2 ${
              blog.template === 1 ? 'btn-info' : 'btn-ghost'
            }`}
          >
            <img
              src="/src/assets/template-1.png"
              alt="template 1"
              className="w-24 rounded"
            />
            <span>Template 1</span>
            <input
              className="hidden"
              type="radio"
              name="template"
              defaultChecked={blog.template === 1}
              onChange={() => setBlog({ ...blog, template: 1 })}
            />
          </label>
          <label
            className={`flex flex-col justify-start items-center gap-2 font-bold cursor-pointer bg-ghost rounded py-2 px-6 w-1/2 ${
              blog.template === 2 ? 'btn-info' : 'btn-ghost text-white'
            }`}
          >
            <img
              src="/src/assets/template-2.png"
              alt="template 2"
              className="w-24 rounded"
            />
            <span>Template 2</span>
            <input
              className="hidden"
              type="radio"
              name="template"
              defaultChecked={blog.template === 2}
              onChange={() => setBlog({ ...blog, template: 2 })}
            />
          </label>
        </div>
        <div className="flex justify-around gap-2 w-full">
          <button type="submit" className="btn btn-info">
            Sauvegarder
          </button>
          <button type="button" className="btn btn-secondary" onClick={reset}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditDrag
