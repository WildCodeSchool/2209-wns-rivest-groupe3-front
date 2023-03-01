import { gql, useMutation } from '@apollo/client'
import { useContext } from 'react'
import { NotificationContext } from '../../contexts/NotificationContext'
import { IUser, IUserContext, UserContext } from '../../contexts/UserContext'
import { GET_USER } from '../../routes/userSettings'
import DeleteUser from '../buttons/DeleteUser'
import ImageHandler from '../imagehandler/ImageHandler'

interface IUserInformation {
  userInformations: IUser
  setShowEditPasswordForm: React.Dispatch<React.SetStateAction<boolean>>
  setShowUserInformations: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditUserForm: React.Dispatch<React.SetStateAction<boolean>>
}

const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($avatar: String) {
    updateUser(avatar: $avatar) {
      avatar
    }
  }
`

const UserInformations = ({
  userInformations,
  setShowUserInformations,
  setShowEditUserForm,
  setShowEditPasswordForm,
}: IUserInformation) => {
  const onEditClick = () => {
    setShowUserInformations(false)
    setShowEditUserForm(true)
  }
  const onPasswordClick = () => {
    setShowUserInformations(false)
    setShowEditPasswordForm(true)
  }
  const { user, setUser } = useContext<IUserContext>(UserContext)
  const { setMessage } = useContext(NotificationContext)
  const [updateAvatarImg] = useMutation(UPDATE_AVATAR, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { getOneUserId: user?.id },
      },
    ],
  })

  const updateAvatarUrl = async (avatarUrl: string | null) => {
    try {
      const dataAvatar = await updateAvatarImg({
        variables: { avatar: avatarUrl },
      })
      const newAvatar = dataAvatar.data.updateUser.avatar as string
      if (user) {
        const newUser = { ...user, avatar: newAvatar }
        const localUser = {
          id: newUser.id,
          nickname: newUser.nickname,
          avatar: newUser.avatar,
        }
        localStorage.setItem('user', JSON.stringify(localUser))
        setUser(newUser)
      }
      setMessage({
        text: `Votre avatar a été mis à jour avec succès !`,
        type: 'success',
      })
    } catch (err) {
      setMessage({
        text: `Impossible de mettre à jour votre avatar. ${err}.`,
        type: 'error',
      })
      console.error(err)
    }
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center mb-16">Mes informations</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col justify-center items-center gap-8">
          <span className="font-bold text-3xl">Avatar</span>
          <ImageHandler
            type="avatar"
            imgUrl={userInformations.avatar}
            updateBackendUrlImg={updateAvatarUrl}
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="card-title">Pseudo</h2>
          <p className="mb-6">{userInformations?.nickname}</p>
          <h2 className="card-title">Nom</h2>
          <p className="mb-6">{userInformations?.lastName}</p>
          <h2 className="card-title">Prénom</h2>
          <p className="mb-6">{userInformations?.firstName}</p>
          <h2 className="card-title">Ville</h2>
          <p className="mb-6">{userInformations?.city}</p>
          <h2 className="card-title">Presentation</h2>
          <p className="mb-6">{userInformations?.description}</p>
          <h2 className="card-title">Email</h2>
          <p className="mb-6">{userInformations?.email}</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-12">
        <button
          className="btn btn-primary text-white"
          onClick={() => onEditClick()}
        >
          Editer mon profil
        </button>
        <button
          className="btn btn-primary text-white"
          onClick={() => onPasswordClick()}
        >
          Modifier mon mot de passe
        </button>
        <DeleteUser />
      </div>
    </>
  )
}

export default UserInformations
