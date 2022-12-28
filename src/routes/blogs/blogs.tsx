import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import EditDrag from './EditDrag'
import ListingBlogs from './ListingBlogs'

const Blogs = () => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
    {isEditing && <EditDrag setIsEditing={setIsEditing} />}
    <Routes>
        <Route element={<ListingBlogs />} path="/" />
        <Route element={<BlogT2 setIsEditing={setIsEditing} />} path="/:blogname" />
        <Route element={<BlogT1 setIsEditing={setIsEditing} />} path="/:blogname/T1" />
    </Routes></>
  )
}

export default Blogs