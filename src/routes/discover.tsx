import { gql, useQuery } from '@apollo/client'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { NotificationContext } from '../contexts/NotificationContext'

const Discover = () => {
  const GET_FIRST_BLOGS_AND_ARTICLES = gql`
    query getAllBlogsAndArticles($limit: Float) {
      getAllBlogs(limit: $limit) {
        id
        name
        slug
        description
        createdAt
        user {
          nickname
        }
      }
      getAllArticles(limit: $limit) {
        id
        title
        slug
      }
    }
  `
  const { loading, error, data } = useQuery(GET_FIRST_BLOGS_AND_ARTICLES, {
    variables: {
      limit: 4,
    },
  })

  const { setMessage } = useContext(NotificationContext)

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <></>
  }

  return (
    <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">
          Blogs les plus récents
        </h2>
        <article className="flex justify-center items-center gap-16">
          {data.getAllBlogs.map((blog: any) => {
            return <Card key={blog.id} blog={blog} />
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
          {data.getAllArticles.map((article: any) => {
            return <Card key={article.id} article={article} />
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
