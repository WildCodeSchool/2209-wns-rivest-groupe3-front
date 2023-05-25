import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { NotificationContext } from '../contexts/NotificationContext'
import { GET_FIRST_BLOGS_AND_ARTICLES } from '../queries/blogs'

import Card from '../components/Card'
import { IArticle, IBlog } from '../utils/interfaces/Interfaces'

const Discover = () => {
  const { loading, error, data } = useQuery(GET_FIRST_BLOGS_AND_ARTICLES, {
    variables: {
      limit: 4,
    },
  })

  const { setMessage } = useContext(NotificationContext)

  useEffect(() => {
    if (error) setMessage({ text: error.message, type: 'error' })
  }, [error])

  if (loading) return <>Loading...</>
  if (error) return <></>

  return (
    <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">
          Blogs les plus récents
        </h2>
        <article className="flex justify-center items-center gap-16">
          {data.getAllBlogs.map((blog: IBlog, key: number) => {
            return <Card key={key} blog={blog} />
          })}
        </article>
        <Link to="/blogs" className="link link-hover text-xl">
          Voir plus
        </Link>
      </section>
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">
          Articles les plus récents
        </h2>
        <article className="flex justify-center items-center gap-16">
          {data.getAllArticles.map((article: IArticle, key: number) => {
            return <Card key={key} article={article} />
          })}
        </article>
        <Link to="/articles" className="link link-hover text-xl">
          Voir plus
        </Link>
      </section>
    </main>
  )
}

export default Discover
