import { useContext, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../contexts/UserContext'
import UserInformations from '../components/userSettings/UserInformations'
import EditUserForm from '../components/userSettings/EditUserForm'
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
      email
    }
  }
`

const UserSettings = () => {
  const [showUserInformations, setShowUserInformations] = useState(true)
  const [showEditUserForm, setShowEditUserForm] = useState(false)

  const { user } = useContext<IUserContext>(UserContext)

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getOneUserId: user?.id },
  })

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de la récupération de l'utilisateur </p>

  return (
    <main className="py-16 min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <div
        className={
          showUserInformations === true ? 'flex flex-col w-4/5 mb-4' : 'hidden'
        }
      >
        <UserInformations
          userInformations={data.getOneUser}
          setShowUserInformations={setShowUserInformations}
          setShowEditUserForm={setShowEditUserForm}
        />
      </div>
      <div
        className={
          showEditUserForm === true ? 'flex flex-col w-4/5 mb-4' : 'hidden'
        }
      >
        <EditUserForm
          userInformations={data.getOneUser}
          setShowEditUserForm={setShowEditUserForm}
          setShowUserInformations={setShowUserInformations}
        />
      </div>
    </main>
  )
}

export default UserSettings
