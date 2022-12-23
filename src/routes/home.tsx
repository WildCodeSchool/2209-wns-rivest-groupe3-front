import { Link } from 'react-router-dom'
import Card from '../components/Card'

const Home = () => {
  return (
    <>
      <section
        className="hero min-h-screen bg-gradient-to-r from-primary to-neutral text-white"
        style={{ backgroundImage: `url("src/assets/bg-dark.png")` }}
      >
        <div className="h-full w-full text-start flex justify-around items-center">
          <div className="max-w-xl space-y-16 mx-auto">
            <h1 className="text-7xl font-bold font-lobster">
              Raconte nous tes aventures !
              <div className="h-px w-96 bg-white mt-4" />
            </h1>
            <p>
              Si vous êtes passionné de voyage et que vous avez envie de
              partager vos expériences avec le monde entier, alors vous êtes au
              bon endroit. Notre site vous offre tout ce dont vous avez besoin
              pour créer votre propre blog de voyage et raconter vos aventures.
              Bon voyage !
            </p>
            <button className="btn btn-secondary w-96">Crée ton blog</button>
          </div>
          <div className="w-1/2 h-full overflow-hidden">
            <iframe
              src="https://my.spline.design/untitled-18ba1390b53bebdecb84a2fb59aca0ec/"
              frameBorder="0"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </section>
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Comment ca marche ?</h2>
        <article className="flex justify-center items-center gap-16">
          <div className="card w-96 h-96 bg-base-100 shadow-xl rotate-6">
            <div className="card-body">
              <h2 className="card-title">Inscris-toi ou connecte-toi</h2>
              <p>
                Créer ton espace personnel et afin de disposer de toutes les
                fonctionnalités nécessaires pour créer et gérer ton blog.
              </p>
              <img
                src="src/assets/login.svg"
                alt="login"
                className="w-40 h-40 m-auto"
              />
            </div>
          </div>
          <div className="card w-96 h-96 bg-base-100 shadow-xl -rotate-6">
            <div className="card-body">
              <h2 className="card-title">
                Crée ton blog et rédige tes articles
              </h2>
              <p>
                Choisis un thème et un titre pour ton blog puis rédige et
                alimente-le de contenu: photos, articles, vidéos...
              </p>
              <img
                src="src/assets/write.svg"
                alt="write"
                className="w-40 h-40 m-auto"
              />
            </div>
          </div>
          <div className="card w-96 h-96 bg-base-100 shadow-xl rotate-6">
            <div className="card-body">
              <h2 className="card-title">Publie et partage ton blog</h2>
              <p>
                Rends ton blog visible via les réseaux sociaux. Les autres
                utilisateurs pourront te laisser des commentaires.
              </p>
              <img
                src="src/assets/share.svg"
                alt="share"
                className="w-40 h-40 m-auto"
              />
            </div>
          </div>
        </article>
      </section>

      <section className="py-16 flex flex-col items-center justify-center gap-16 bg-gray-300">
        <h2 className="text-5xl font-bold text-center">Choisis ton template</h2>
        <article className="flex justify-center items-center gap-16">
          <Card />
          <Card />
          <Card />
        </article>
      </section>

      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Découvre des blogs</h2>
        <article className="flex justify-center items-center gap-16">
          <Card />
          <Card />
          <Card />
        </article>
        <Link to="/blogs" className="link link-hover text-xl">
          Voir plus
        </Link>
      </section>
    </>
  )
}

export default Home
