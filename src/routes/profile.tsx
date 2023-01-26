import Card from '../components/Card'

const Profil = () => {
  return (
    <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <h1 className="text-5xl font-bold text-center">Profile</h1>
      <section className="card lg:card-side bg-base-100 shadow-card">
        <figure>
          <img src="https://placeimg.com/400/400/arch" alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Pseudo</h2>
          <p>Sasuke69</p>
          <h2 className="card-title">Presentation</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
            fugiat, veritatis ea et, similique velit nesciunt laborum eius nam
            adipisci blanditiis ullam officia, labore atque cumque saepe! Id,
            maxime officia.
          </p>
        </div>
      </section>
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Mes blogs</h2>
        <article className="flex justify-center items-center gap-16">
          <Card />
        </article>
      </section>
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Mes articles</h2>
        <article className="flex justify-center items-center gap-16">
          <Card />
          <Card />
          <Card />
        </article>
        <a className="link link-hover text-xl">Voir plus</a>
      </section>
      <section className="card flex flex-col gap-8">
        <h2 className="text-5xl font-bold text-center">Mes informations</h2>

        <label className='space-y-4'>
          <span className="card-title">Nom</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className='space-y-4'>
          <span className="card-title">Prénom</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className='space-y-4'>
          <span className="card-title">Ville</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className='space-y-4'>
          <span className="card-title">E-mail</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className='space-y-4'>
          <span className="card-title">Mot de passe</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <button className="btn btn-primary">Edit</button>
      </section>
    </main>
  )
}

export default Profil
