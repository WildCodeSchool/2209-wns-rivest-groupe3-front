import { useState, useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { NotificationContext } from '../../contexts/NotificationContext'

import { GET_ALL_BLOGS_WITH_LIMIT_AND_TOTAL } from '../../queries/blogs'
import { IBlog } from '../../utils/interfaces/Interfaces'

import Pagination from '../../components/buttons/Pagination'
import Card from '../../components/Card'
import SearchBar from '../../components/inputs/SearchBar'
import PolaroidCard from '../../components/PolaroidCard'

const ListingBlogs = () => {
  const { setMessage } = useContext(NotificationContext)

  const [limit] = useState(6)
  const [offset, setOffset] = useState(0)

  const { loading, error, data, fetchMore } = useQuery(
    GET_ALL_BLOGS_WITH_LIMIT_AND_TOTAL,
    {
      variables: {
        limit,
        offset,
      },
    }
  )

  const [searchInput, setSearchInput] = useState<string>('')
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.getNumberOfBlogs / limit))
    }
  }, [data])

  useEffect(() => {
    updatePage(currentPage)
  }, [currentPage])

  const updatePage = (page: number) => {
    setOffset(limit * page - limit)
    fetchMore({
      variables: {
        offset,
      },
    })
  }

  useEffect(() => {
    if (error) setMessage({ text: error.message, type: 'error' })
  }, [error])

  if (loading) return <>Loading...</>

  if (error) return <></>

  return (
    <main className="relative">
      <img
        src="/tache-right.png"
        alt="tâche"
        className="hidden md:flex absolute max-w-xl -right-0 top-1/2 -translate-y-1/3 text-primary"
      />
      <section className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8 py-16">
        <h1 className="text-7xl font-bold font-lobster text-center">Blogs</h1>
        <SearchBar setSearchInput={setSearchInput} isCenter />
        <article className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-row-3 gap-8">
          {data.getAllBlogs
            .filter((blog: IBlog) =>
              blog.name.toLowerCase().includes(searchInput)
            )
            .map((blog: IBlog) => (
              <div className="w-fit mx-auto">
                <PolaroidCard key={blog.id} blog={blog} />
              </div>
            ))}
        </article>

        <Pagination
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </main>
  )
}

export default ListingBlogs
