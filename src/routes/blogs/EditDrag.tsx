import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ImageHandler from '../../components/ImageHandler'

interface Position {
  x: number
  y: number
}

const EditDrag = ({
  setIsEditing,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [blog, setBlog] = useState({ template: 1 })

  const { register, handleSubmit } = useForm()

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
  const onSubmit = (data: any) => {
    console.log(data)
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
          />
        </label>
        <label className="form-control">
          <span className="label font-bold text-white">Description :</span>
          <textarea
            {...register('description')}
            className="input input-bordered h-48 p-4"
            id="description"
            placeholder="Description"
          />
        </label>
        <ImageHandler />
        <button type="button" className="btn btn-info self-center w-full">
          + Ajouter un article
        </button>
        {/* <div className="flex justify-between text-white mx-auto w-full">
          <label
            className={`flex flex-col justify-start items-center gap-2 font-bold cursor-pointer rounded py-2 px-6 w-1/2 ${
              blog.template === 1 ? 'btn-info' : 'btn-ghost'
            }`}
          >
            <img src='/src/assets/template-1.png' alt='template 1' className='w-24 rounded'/>
            <span>Template 1</span>
            <input
              className="hidden"
              type="radio"
              name="template"
              checked={blog.template === 1}
              onClick={() => setBlog({ ...blog, template: 1 })}
            />
          </label>
          <label
            className={`flex flex-col justify-start items-center gap-2 font-bold cursor-pointer bg-ghost rounded py-2 px-6 w-1/2 ${
              blog.template === 2 ? 'btn-info' : 'btn-ghost text-white'
            }`}
          >
            <img src='/src/assets/template-2.png' alt='template 2' className='w-24 rounded'/>
            <span>Template 2</span>
            <input
              className="hidden"
              type="radio"
              name="template"
              checked={blog.template === 2}
              onClick={() => setBlog({ ...blog, template: 2 })}
            />
          </label>
        </div> */}
        <div className='flex justify-center gap-4 w-full py-4'>
          <button type="submit" className="btn btn-info w-2/5">
            Sauvegarder
          </button>
          <button type="button" className="btn btn-secondary w-2/5" 
              onClick={() => setIsEditing(isEditing => !isEditing)}
              >
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditDrag
