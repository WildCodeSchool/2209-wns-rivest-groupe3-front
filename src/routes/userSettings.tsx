import { useContext } from 'react'
import { gql, useQuery } from '@apollo/client'

import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../contexts/UserContext'

import DeleteUser from '../components/buttons/DeleteUser'

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

const UserSettings = () => {
  const { user } = useContext<IUserContext>(UserContext)

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getOneUserId: user?.id },
  })

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de la récupération de l'utilisateur </p>

  return (
    <main className="py-16 min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <h1 className="text-5xl font-bold text-center">Mes informations</h1>
      <section className="card flex flex-col gap-8">
        <label className="space-y-4">
          <span className="card-title">Nom</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className="space-y-4">
          <span className="card-title">Prénom</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className="space-y-4">
          <span className="card-title">Ville</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className="space-y-4">
          <span className="card-title">E-mail</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <label className="space-y-4">
          <span className="card-title">Mot de passe</span>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full w-full"
          />
        </label>
        <button className="btn btn-primary">Edit</button>
      </section>
      <DeleteUser />
    </main>
  )
}

export default UserSettings
