import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'

import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../contexts/UserContext'

import Card from '../components/Card'

const GET_USER = gql`
  query GetOneUser($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      nickname
      lastName
      firstName
      description
      createdAt
      city
      avatar
    }
  }
`

const Profile = () => {
  const { user } = useContext<IUserContext>(UserContext)

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getOneUserId: user?.id },
  })

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de la récupération de l'utilisateur </p>

  return (
    <main className="py-16 min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <h1 className="text-5xl font-bold text-center">Profil</h1>

      <section className="flex mt-12 p-6 rounded-md">
        <figure className="w-1/4 m-auto">
          <img
            src={data.getOneUser.avatar}
            alt={`${data.getOneUser.nickname}-profil-picture`}
            className="m-auto"
          />
        </figure>

        <div className="w-3/4">
          <h2 className="card-title">Pseudo</h2>
          <p className="mb-6">{data.getOneUser.nickname}</p>
          <h2 className="card-title">Presentation</h2>
          <p>{data.getOneUser.description}</p>
        </div>
      </section>

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
