import { Route, Routes } from 'react-router-dom'
import BlogT1 from './BlogT1'
import BlogT2 from './BlogT2'
import ListingBlogs from './ListingBlogs'

const Blogs = () => {
  return (
    <Routes>
        <Route element={<ListingBlogs />} path="/" />
        <Route element={<BlogT1 />} path="/:blogname" />
        <Route element={<BlogT2 />} path="/:blogname/T2" />
    </Routes>
  )
}

export default Blogs