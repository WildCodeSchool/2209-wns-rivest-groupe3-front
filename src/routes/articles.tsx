import { useQuery } from '@apollo/client'
import { useContext, useState, useEffect } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'
import { GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL } from '../queries/articles'

import Pagination from '../components/buttons/Pagination'
import Card from '../components/Card'
import SearchBar from '../components/inputs/SearchBar'
import { IArticle, IArticleCard } from '../utils/interfaces/Interfaces'
import ErrorComponent from '../components/ErrorComponent'

const Articles = () => {
  const { setMessage } = useContext(NotificationContext)

  const [limit] = useState(6)
  const [offset, setOffset] = useState(0)
  const [searchInput, setSearchInput] = useState<string>('')
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, error, data, fetchMore } = useQuery(
    GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL,
    {
      fetchPolicy: 'no-cache',
      variables: {
        limit,
        offset,
      },
    }
  )

  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.getNumberOfArticles / limit))
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setMessage({ text: error.message, type: 'error' })
    }
  }, [error])

  useEffect(() => {
    updatePage(currentPage)
  }, [currentPage])

  function updatePage(page: number) {
    setOffset(limit * page - limit)
    fetchMore({
      variables: {
        offset,
      },
    })
  }

  if (loading)
    return (
      <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <header className="h-96 w-full m-auto bg-[url('https://placeimg.com/1000/800/arch')] flex justify-center items-center">
          <h1 className="text-7xl font-bold text-center">Articles</h1>
        </header>
      </main>
    )
  if (error) {
    return (
      <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <ErrorComponent error={error} />
      </main>
    )
  }
  return (
    <main className="relative">
      <img
        src="/texture-3.png"
        className="hidden md:flex absolute left-0 -bottom-8 w-full opacity-50"
      />
      <section className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8 py-16">
        <h1 className="text-7xl font-bold font-lobster text-center">
          Articles
        </h1>
        <SearchBar setSearchInput={setSearchInput} isCenter />
        <article className="w-full grid md:grid-cols-2 lg:grid-cols-3 grid-row-3 gap-8">
          {data.getAllArticles
            .filter((article: IArticleCard) =>
              article.title.toLowerCase().includes(searchInput)
            )
            .map((article: IArticle, key: number) => {
              return <Card key={key} article={article} />
            })}
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

export default Articles
