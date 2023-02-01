import Pagination from '../../components/buttons/Pagination'
import BlogCard from '../../components/BlogCard'
import SearchBar from '../../components/inputs/SearchBar'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_BLOGS_FOR_DISCOVER } from '../../queries/blogs'

interface IUser {
  id: string
  nickname: string
}

interface IBlog {
  id: string
  name: string
  description: string
  createdAt: Date
  slug: string
  user: IUser
}
const ListingBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const { loading, error, data } = useQuery(GET_ALL_BLOGS_FOR_DISCOVER)

  useEffect(() => {
    data && setBlogs(data.getAllBlogs)
  }, [data])

  return (
    <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <header className="h-96 w-full m-auto bg-[url('https://placeimg.com/1000/800/arch')] flex justify-center items-center">
        <h1 className="text-5xl font-bold text-center text-neutral-content">
          Blogs
        </h1>
      </header>
      <div className="flex justify-between w-full items-center">
        <SearchBar />
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Filter
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <section className="w-full grid grid-cols-3 grid-row-3 gap-8">
        {loading && 'Loading ...'}
        {error && `Error : ${error.message}`}
        {blogs.map((blog: IBlog) => {
          return <BlogCard key={blog.id} blog={blog} />
        })}
      </section>
      <Pagination />
    </main>
  )
}

export default ListingBlogs
