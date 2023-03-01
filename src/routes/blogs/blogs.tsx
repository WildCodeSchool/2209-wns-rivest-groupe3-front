import { Route, Routes } from 'react-router-dom'
import ListingBlogs from './ListingBlogs'
import Blog from './singleblog'
import Article from './articles/singleArticle'
import ArticleEditor from './articles/newArticle'

const Blogs = () => {
  return (
    <Routes>
      <Route element={<ListingBlogs />} path="/" />
      <Route element={<Blog />} path="/:slug" />
      <Route element={<ArticleEditor />} path="/:blogSlug/_" />
      <Route element={<Article />} path="/:blogSlug/:slug" />
    </Routes>
  )
}

export default Blogs
