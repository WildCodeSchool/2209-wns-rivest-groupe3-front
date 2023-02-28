import { useState, useContext, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { NotificationContext } from '../../contexts/NotificationContext'
import { IBlog } from '../../utils/interfaces/Interfaces'
import Pagination from '../../components/buttons/Pagination'
import Card from '../../components/Card'
import SearchBar from '../../components/inputs/SearchBar'

const ListingBlogs = () => {
  const { setMessage } = useContext(NotificationContext)

  const [limit] = useState(6)
  const [offset, setOffset] = useState(0)

  const [numberOfPages, setNumberOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const GET_ALL_BLOGS_AND_TOTAL = gql`
    query GetAllBlogs($limit: Float, $offset: Float) {
      getAllBlogs(limit: $limit, offset: $offset) {
        id
        name
        slug
        description
        template
        createdAt
        user {
          id
          nickname
        }
      }
      getNumberOfBlogs
    }
  `
  const { loading, error, data, fetchMore } = useQuery(
    GET_ALL_BLOGS_AND_TOTAL,
    {
      variables: {
        limit,
        offset,
      },
    }
  )

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

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <></>
  }

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
        {data.getAllBlogs.map((blog: IBlog) => (
          <Card key={blog.id} blog={blog} />
        ))}
      </section>

      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  )
}

export default ListingBlogs
