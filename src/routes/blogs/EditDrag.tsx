import { useMutation } from '@apollo/client'
import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_ONE_BLOG, UPDATE_BLOG } from '../../queries/blogs'
import { IBlog } from '../../utils/interfaces/Interfaces'

interface Position {
  x: number
  y: number
}

const EditDrag = ({
  slug,
  blog,
  closeEdit,
}: {
  slug: string | undefined
  blog: IBlog
  closeEdit: () => void
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [template, setTemplate] = useState(2)

  const { setMessage } = useContext(NotificationContext)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    setTemplate(blog.template)
  }, [])

  useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const elementWidth = 96
      const elementHeight = 96

      let newX = position.x
      let newY = position.y

      if (newX + elementWidth > windowWidth) {
        newX = windowWidth - elementWidth
      } else if (newX < 0) {
        newX = 0
      }

      if (newY + elementHeight > windowHeight) {
        newY = windowHeight - elementHeight
      } else if (newY < 0) {
        newY = 0
      }

      setPosition({ x: newX, y: newY })
    }

    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [position])

  const handleMouseDown = (e: React.MouseEvent) => {
    const initialX = e.clientX - position.x
    const initialY = e.clientY - position.y

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - initialX,
        y: e.clientY - initialY,
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

  const onSubmit = (data: any) => {
    updateBlog({ variables: { slug, ...data, template: template } })
      .then(() => {
        setMessage({
          text: `Blog mis à jour avec succès !`,
          type: 'success',
        })
      })
      .catch((err) => {
        setMessage({
          text: `Impossible de mettre à jour le blog. ${err}.`,
          type: 'error',
        })
        console.error(err)
      })
  }

  return (
    <div
      className="w-96 bg-primary rounded-md fixed cursor-move z-50 p-4"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="form-control">
          <span className="label font-bold text-white">Nom du blog :</span>
          <input
            {...register('name')}
            className="input input-bordered"
            id="name"
            type="name"
            placeholder="Nom du blog"
            defaultValue={blog.name}
          />
        </label>
        <label className="form-control">
          <span className="label font-bold text-white">Description :</span>
          <textarea
            {...register('description')}
            className="input input-bordered h-48 p-4"
            id="description"
            placeholder="Description"
            defaultValue={blog.description}
          />
        </label>
        <div className="flex justify-center gap-2 text-white mx-auto w-full">
          <label
            className={`flex flex-col justify-start gap-2 font-bold cursor-pointer rounded py-2 px-6 ${
              template === 1 ? 'btn-info' : 'btn-ghost'
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
              onChange={() => setTemplate(1)}
            />
          </label>
          <label
            className={`flex flex-col justify-start gap-2 font-bold cursor-pointer bg-ghost rounded py-2 px-6 ${
              template === 2 ? 'btn-info' : 'btn-ghost text-white'
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
              onClick={() => setTemplate(2)}
            />
          </label>
        </div>
        <div className="flex justify-around gap-2 w-full">
          <button type="submit" className="btn btn-info">
            Modifier
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeEdit}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditDrag
