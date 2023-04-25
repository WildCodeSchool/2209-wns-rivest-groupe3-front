import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_FIRST_BLOGS_AND_ARTICLES } from '../../queries/blogs'
import Hero from './Hero'
import LastedItemsSection from './LastedItemsSection'

export const Home = () => {
  const { setMessage } = useContext(NotificationContext)

  const { loading, error, data } = useQuery(GET_FIRST_BLOGS_AND_ARTICLES, {
    variables: {
      limit: 3,
    },
  })

  if (loading) return <>Loading...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <></>
  }

  return (
    <>
      <Hero />
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Comment ca marche ?</h2>
        <article className="md:flex justify-center items-center gap-16">
          <div className="card w-full md:w-96 h-96 bg-base-100 shadow-card md:rotate-6">
            <div className="card-body">
              <h2 className="card-title">Inscris-toi ou connecte-toi</h2>
              <p>
                Créer ton espace personnel et afin de disposer de toutes les
                fonctionnalités nécessaires pour créer et gérer ton blog.
              </p>
              <img src="login.svg" alt="login" className="w-40 h-40 m-auto" />
            </div>
          </div>
          <div className="card w-full md:w-96 h-96 bg-base-100 shadow-card md:-rotate-6">
            <div className="card-body">
              <h2 className="card-title">
                Crée ton blog et rédige tes articles
              </h2>
              <p>
                Choisis un thème et un titre pour ton blog puis rédige et
                alimente-le de contenu: photos, articles, vidéos...
              </p>
              <img src="write.svg" alt="write" className="w-40 h-40 m-auto" />
            </div>
          </div>
          <div className="card w-full md:w-96 h-96 bg-base-100 shadow-card md:rotate-6">
            <div className="card-body">
              <h2 className="card-title">Publie et partage ton blog</h2>
              <p>
                Rends ton blog visible via les réseaux sociaux. Les autres
                utilisateurs pourront te laisser des commentaires.
              </p>
              <img src="share.svg" alt="share" className="w-40 h-40 m-auto" />
            </div>
          </div>
        </article>
      </section>

      <LastedItemsSection
        title="Découvre les derniers blogs de la communauté"
        bgColor="bg-gray-300"
        blogs={data.getAllBlogs}
        link="/blogs"
      />
      <LastedItemsSection
        title="Articles les plus récents"
        bgColor="bg-transparent"
        articles={data.getAllArticles}
        link="/articles"
      />
    </>
  )
}

export default Home
