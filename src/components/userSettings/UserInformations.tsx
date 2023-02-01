import DeleteUser from '../buttons/DeleteUser'

const UserInformations = ({
  userInformations,
  setShowUserInformations,
  setShowEditUserForm,
}: any) => {
  const onClick = () => {
    setShowUserInformations(false)
    setShowEditUserForm(true)
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center mb-16">Mes informations</h1>
      <div className="flex">
        <div className="w-1/4">
          <img
            src={userInformations.avatar}
            alt={`${userInformations.nickname}-profil-picture`}
          />
        </div>
        <div className="w-3/4">
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
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary" onClick={() => onClick()}>
          Editer
        </button>
        <DeleteUser />
      </div>
    </>
  )
}

export default UserInformations
