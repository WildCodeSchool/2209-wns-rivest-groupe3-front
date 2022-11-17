import { Link } from 'react-router-dom'
import Card from '../components/Card'

const Discover = () => {
  return (
    <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">
          Blogs les plus récents
        </h2>
        <article className="flex justify-center items-center gap-16">
          <Card />
          <Card />
          <Card />
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
          <Card />
          <Card />
          <Card />
        </article>
        <Link to="/articles" className="link link-hover text-xl">
          Voir plus
        </Link>
      </section>
    </main>
  )
}

export default Discover
