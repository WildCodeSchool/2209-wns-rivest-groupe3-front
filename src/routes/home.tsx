import { Link } from 'react-router-dom'
import Card from '../components/Card'

const Home = () => {
  return (
    <>
      <section
        className="hero min-h-screen"
        style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md space-y-16">
            <h1 className="text-5xl font-bold font-lobster">Bienvenue !</h1>
            <p>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </section>
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Comment ca marche ?</h2>
        <article className="flex justify-center items-center gap-16">
          <div className="card w-96 h-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Step 1</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 h-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Step 2</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card w-96 h-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Step 3</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
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
        <Link to="/blogs" className="link link-hover text-xl">Voir plus</Link>
      </section>
    </>
  )
}

export default Home
