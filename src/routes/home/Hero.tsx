import { Link } from 'react-router-dom'
import IframeHero from './IframeHero'

const Hero = () => {
  return (
    <section
    className="hero min-h-screen bg-gradient-to-r from-primary to-neutral text-white"
    style={{ backgroundImage: `url("bg-dark.png")` }}
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
        <Link to="./createblog" className="btn btn-secondary w-96">
          Crée ton blog
        </Link>
      </div>
      <div className="w-1/2 h-full overflow-hidden">
        <IframeHero />
      </div>
    </div>
  </section>
  )
}

export default Hero