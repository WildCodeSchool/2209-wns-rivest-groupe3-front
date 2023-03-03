import React, { useState } from 'react'
import { IBlog } from '../../utils/interfaces/Interfaces'
import { slugPreview } from '../../utils/slug'

const BlogDetailsForm = ({
  blog,
  blogs,
  setBlog,
}: {
  blog: IBlog
  blogs: { dataSlugs: string[]; dataNames: string[] }
  setBlog: React.Dispatch<React.SetStateAction<IBlog | null>>
}) => {
  const [errorField, setErrorField] = useState<{
    name?: string | null
    description?: string | null
  }>({})
  const { name, description } = blog
  const { dataSlugs, dataNames } = blogs

  return (
    <>
      <label className="form-control">
        <span className="label font-bold text-white">Nom du blog :</span>
        <input
          className={`input input-bordered ${errorField.name && 'input-error'}`}
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
    </>
  )
}

export default BlogDetailsForm
