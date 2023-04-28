import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../contexts/UserContext'
import { GET_USER } from '../queries/user'

import Card from '../components/Card'
import Avatar from '../components/Avatar'

const Profile = () => {
  const { user } = useContext<IUserContext>(UserContext)
  const navigate = useNavigate()
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getOneUserId: user?.id },
  })

  const onClickProfile = () => {
    navigate('/settings')
  }

  const onClickCreateBlog = () => {
    navigate('/createblog')
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de la récupération de l'utilisateur </p>
  - console.log("user", data?.getOneUser)
  return (
    <main className="py-16 min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <h1 className="text-5xl font-bold text-center">Profil</h1>
      <section className="flex flex-col md:flex-row mt-12 p-6 shadow-lg rounded-lg min-w-full gap-8">
        <div className="w-full md:w-1/4 m-auto">
          <Avatar imgUrl={data.getOneUser.avatar}/>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="card-title">Pseudo</h2>
          <p className="mb-6">{data.getOneUser.nickname}</p>
          <h2 className="card-title">Presentation</h2>
          <p>{data.getOneUser.description}</p>
        </div>
      </section>
      <div className="flex">
        <button
          id="create-blog-button"
          className="btn btn-primary text-white mr-2"
          onClick={() => onClickCreateBlog()}
        >
          Créer un blog
        </button>
        <button
          id="edit-profile-button"
          className="btn btn-primary text-white ml-2"
          onClick={() => onClickProfile()}
        >
          Editer mon profil
        </button>
      </div>
      <section className="py-16 flex flex-col items-center justify-center gap-16">
        <h2 className="text-5xl font-bold text-center">Mes blogs</h2>
        <article className="flex justify-center items-center gap-16">
          <Card />
          <Card />
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
    </main>
  )
}

export default Profile
