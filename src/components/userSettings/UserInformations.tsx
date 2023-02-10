import { IUser } from '../../contexts/UserContext'
import DeleteUser from '../buttons/DeleteUser'

interface IUserInfromation {
  userInformations: IUser
  setShowEditPasswordForm: React.Dispatch<React.SetStateAction<boolean>>
  setShowUserInformations: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditUserForm: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInformations = ({
  userInformations,
  setShowUserInformations,
  setShowEditUserForm,
  setShowEditPasswordForm,
}: IUserInfromation) => {
  const onEditClick = () => {
    setShowUserInformations(false)
    setShowEditUserForm(true)
  }
  const onPasswordClick = () => {
    setShowUserInformations(false)
    setShowEditPasswordForm(true)
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center mb-16">Mes informations</h1>
      <div className="flex">
        <div className="w-2/6 justify-center">
          <img
            src={userInformations.avatar}
            alt={`${userInformations.nickname}-profil-picture`}
          />
        </div>
        <div className="w-4/6">
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
