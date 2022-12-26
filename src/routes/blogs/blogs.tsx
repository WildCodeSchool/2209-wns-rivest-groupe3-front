import { Route, Routes } from 'react-router-dom'
import BlogT1 from './BlogT1'
import ListingBlogs from './ListingBlogs'

const Blogs = () => {
  return (
    <Routes>
        <Route element={<ListingBlogs />} path="/" />
        <Route element={<BlogT1 />} path="/:blogname" />
    </Routes>
  )
}

export default Blogs