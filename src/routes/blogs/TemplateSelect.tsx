import React from 'react'
import { IBlog } from '../../utils/interfaces/Interfaces'

const TemplateSelect = ({
  blog,
  setBlog,
}: {
  blog: IBlog
  setBlog: React.Dispatch<React.SetStateAction<IBlog | null>>
}) => {
  return (
    <div className="flex justify-between gap-2 text-white mx-auto w-full">
      <label
        className={`flex flex-col justify-start items-center gap-2 font-bold cursor-pointer rounded py-2 px-6 w-1/2 ${
          blog.template === 1 ? 'btn-info' : 'btn-ghost'
        }`}
      >
        <img src="/template-1.png" alt="template 1" className="w-24 rounded" />
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
        <img src="/template-2.png" alt="template 2" className="w-24 rounded" />
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
  )
}

export default TemplateSelect
