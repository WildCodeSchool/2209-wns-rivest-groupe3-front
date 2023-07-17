import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import ErrorComponent from '../../components/ErrorComponent'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_FIRST_BLOGS_AND_ARTICLES } from '../../queries/blogs'
import Hero from './Hero'
import HomeSection from './HomeSection'
import LastedItemsSection from './LastedItemsSection'
import ShareSection from './ShareSection'

export const Home = () => {
  const { setMessage } = useContext(NotificationContext)

  const { loading, error, data } = useQuery(GET_FIRST_BLOGS_AND_ARTICLES, {
    variables: {
      limit: 3,
    },
  })

  const sections = [
    {
      title: 'Inscris-toi et connecte-toi',
      img: '/icon-profil.png',
      content:
        'Créer ton espace personnel et afin de disposer de toutes les fonctionnalités nécessaires pour créer et gérer ton blog.',
    },
    {
      title: 'Crée ton blog et rédige tes articles',
      img: '/icon-article.png',
      content:
        'Choisis un thème et un titre pour ton blog puis rédige et alimente-le de contenu: photos, articles, vidéos...',
    },
    {
      title: 'Publie et partage ton blog',
      img: '/icon-share.png',
      content:
        'Rends ton blog visible via les réseaux sociaux. Les autres utilisateurs pourront te laisser des commentaires.',
    },
  ]

  if (loading) return <>Chargement...</>
  if (error) {
    setMessage({ text: error.message, type: 'error' })
    return <ErrorComponent error={error} />
  }

  return (
    <>
      <Hero />
      <section className="flex flex-col items-center justify-center md:py-16">
        {sections.map((section, key) => (
          <HomeSection
            key={key}
            order={key}
            title={section.title}
            content={section.content}
            img={section.img}
          />
        ))}
      </section>
      <LastedItemsSection
        title="Découvre les derniers blogs créés"
        content="Rends ton blog visible via les réseaux sociaux. Les autres utilisateurs pourront te laisser des commentaires."
        bgColor="bg-primary/5"
        blogs={data.getAllBlogs}
        link="/blogs"
      />
      <ShareSection />
    </>
  )
}

export default Home
