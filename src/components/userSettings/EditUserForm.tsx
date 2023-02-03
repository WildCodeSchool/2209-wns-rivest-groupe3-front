import { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  UserInformationsFormProps,
  userInformationsSchema,
} from '../../utils/userInformationsValidation'
import { GET_USER } from '../../routes/userSettings'
import { UserContext, IUserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'

const UPDATE_USER = gql`
  mutation UpdateUser(
    $lastName: String
    $firstName: String
    $avatar: String
    $description: String
    $city: String
    $nickname: String
    $email: String
  ) {
    updateUser(
      lastName: $lastName
      firstName: $firstName
      avatar: $avatar
      description: $description
      city: $city
      nickname: $nickname
      email: $email
    ) {
      avatar
      city
      description
      email
      firstName
      lastName
      nickname
    }
  }
`

const EditUserForm = ({
  userInformations,
  setShowEditUserForm,
  setShowUserInformations,
}: any) => {
  const { user } = useContext<IUserContext>(UserContext)
  const { message, setMessage } = useContext(NotificationContext)

  const onClick = () => {
    setShowUserInformations(true)
    setShowEditUserForm(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInformationsFormProps>({
    resolver: yupResolver(userInformationsSchema),
  })

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { getOneUserId: user?.id },
      },
    ],
  })

  const onSubmit = async (formData: FieldValues) => {
    const newUserDatas = {
      avatar: formData.avatar,
      city: formData.city,
      description: formData.description,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      nickname: formData.nickname,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    }
    updateUser({ variables: { ...newUserDatas } })
      .then(() => {
        setMessage({
          text: `Profil mis à jour avec succès !`,
          type: 'success',
        })
        setShowUserInformations(true)
        setShowEditUserForm(false)
      })
      .catch((err) => {
        setMessage({
          text: `Impossible de mettre à jour le profil utilisateur. ${err}.`,
          type: 'error',
        })
        console.error(err)
      })
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center mb-16">
        Editer mon profil
      </h1>
      <div className="flex">
        <div className="w-2/6">
          <img
            src={userInformations.avatar}
            alt={`${userInformations.nickname}-profil-picture`}
          />
          <label className="form-control mb-4">
            <span className="label card-title">Avatar</span>
            <input
              {...register('avatar')}
              className={
                errors.avatar ? 'input input-error' : 'input input-bordered'
              }
              id="avatar"
              type="text"
              placeholder="avatar"
              defaultValue={userInformations.avatar}
            />
            <p className="text text-error">{errors.avatar?.message}</p>
          </label>
        </div>
        <div className="w-4/6">
          <label className="form-control mb-4">
            <span className="label card-title">Pseudo</span>
            <input
              {...register('nickname')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="nickname"
              type="text"
              placeholder="nickname"
              defaultValue={userInformations.nickname}
            />
            <p className="text text-error">{errors.nickname?.message}</p>
          </label>

          <label className="form-control mb-4">
            <span className="label card-title">Nom</span>
            <input
              {...register('lastName')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="lastName"
              type="text"
              placeholder="lastName"
              defaultValue={userInformations.lastName}
            />
            <p className="text text-error">{errors.lastName?.message}</p>
          </label>
          <label className="form-control mb-4">
            <span className="label card-title">Prénom</span>
            <input
              {...register('firstName')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="firstName"
              type="text"
              placeholder="firstName"
              defaultValue={userInformations.firstName}
            />
            <p className="text text-error">{errors.firstName?.message}</p>
          </label>
          <label className="form-control mb-4">
            <span className="label card-title">Ville</span>
            <input
              {...register('city')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="city"
              type="text"
              placeholder="city"
              defaultValue={userInformations.city}
            />
            <p className="text text-error">{errors.city?.message}</p>
          </label>
          <label className="form-control mb-4">
            <span className="label card-title">Présentation</span>
            <textarea
              {...register('description')}
              className={
                errors.nickname
                  ? 'input input-error'
                  : 'textarea textarea-bordered h-32 min-h-fit'
              }
              id="description"
              placeholder="description"
              defaultValue={userInformations.description}
            />
            <p className="text text-error">{errors.description?.message}</p>
          </label>
          <label className="form-control mb-4">
            <span className="label card-title">Email</span>
            <input
              {...register('email')}
              className={
                errors.email ? 'input input-error' : 'input input-bordered'
              }
              id="email"
              type="email"
              placeholder="Email"
              defaultValue={userInformations.email}
            />
            <p className="text text-error">{errors.email?.message}</p>
          </label>
          {/* <label className="form-control mb-4">
            <span className="label card-title">Ancien mot de passe</span>
            <input
              {...register('oldPassword')}
              className={
                errors.oldPassword
                  ? 'input input-error'
                  : 'input input-bordered'
              }
              id="password"
              type="password"
              placeholder="Mot de passe"
            />
            <p className="text text-error">{errors.oldPassword?.message}</p>
          </label>
          <label className="form-control mb-4">
            <span className="label card-title">Nouveau mot de passe</span>
            <input
              {...register('newPassword')}
              className={
                errors.oldPassword
                  ? 'input input-error'
                  : 'input input-bordered'
              }
              id="password"
              type="password"
              placeholder="Mot de passe"
            />
            <p className="text text-error">{errors.newPassword?.message}</p>
          </label>

          <label className="form-control mb-4">
            <span className="label card-title">
              Confirmation du mot de passe
            </span>
            <input
              {...register('confirmNewPassword')}
              className={
                errors.confirmNewPassword
                  ? 'input input-error'
                  : 'input input-bordered'
              }
              id="confirm-password"
              type="password"
              placeholder="Confirmation du mot de passe"
            />
            <p className="text text-error">
              {errors.confirmNewPassword?.message}
            </p>
          </label> */}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-12">
        <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </button>
        <button className="btn btn-error" onClick={() => onClick()}>
          Annuler
        </button>
      </div>
    </>
  )
}

export default EditUserForm
