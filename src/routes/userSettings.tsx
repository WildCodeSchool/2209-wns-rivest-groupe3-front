import { useContext, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../contexts/UserContext'
import UserInformations from '../components/userSettings/UserInformations'
import EditUserForm from '../components/userSettings/EditUserForm'
import EditPasswordForm from '../components/userSettings/EditPassword'
import ErrorComponent from '../components/ErrorComponent'

export const GET_USER = gql`
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
  const [showUserInformations, setShowUserInformations] =
    useState<boolean>(true)
  const [showEditUserForm, setShowEditUserForm] = useState<boolean>(false)
  const [showEditPasswordForm, setShowEditPasswordForm] =
    useState<boolean>(false)
  const { user } = useContext<IUserContext>(UserContext)

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getOneUserId: user?.id },
  })

  if (loading) return <p>Chargement...</p>
  if (error)
    return (
      <ErrorComponent
        error={{ message: "Erreur lors de la récupération de l'utilisateur" }}
      />
    )

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
          setShowEditPasswordForm={setShowEditPasswordForm}
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
      <div
        className={
          showEditPasswordForm === true ? 'flex flex-col w-4/5 mb-4' : 'hidden'
        }
      >
        <EditPasswordForm
          userInformations={data.getOneUser}
          setShowUserInformations={setShowUserInformations}
          setShowEditPasswordForm={setShowEditPasswordForm}
        />
      </div>
    </main>
  )
}

export default UserSettings
