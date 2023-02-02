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
    }
    console.log(newUserDatas)
    updateUser({ variables: { ...newUserDatas } })
      .then(() => {
        setShowUserInformations(true)
        setShowEditUserForm(false)
      })
      .catch((err) => {
        console.error(err)
        alert('Erreur')
      })
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center mb-16">
        Editer mon profil
      </h1>
      <div className="flex">
        <div className="w-1/4">
          <img
            src={userInformations.avatar}
            alt={`${userInformations.nickname}-profil-picture`}
          />
          <label className="form-control space-y-2">
            <span className="label card-title">Avatar</span>
            <input
              {...register('avatar')}
              className={
                errors.avatar ? 'input input-error' : 'input input-bordered'
              }
              id="avatar"
              type="avatar"
              placeholder="avatar"
              defaultValue={userInformations.avatar}
            />
            <p className="text text-error">{errors.avatar?.message}</p>
          </label>
        </div>
        <div className="w-3/4">
          <label className="form-control space-y-2">
            <span className="label card-title">Pseudo</span>
            <input
              {...register('nickname')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="nickname"
              type="nickname"
              placeholder="nickname"
              defaultValue={userInformations.nickname}
            />
            <p className="text text-error">{errors.nickname?.message}</p>
          </label>

          <label className="form-control space-y-2">
            <span className="label card-title">Nom</span>
            <input
              {...register('lastName')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="lastName"
              type="lastName"
              placeholder="lastName"
              defaultValue={userInformations.lastName}
            />
            <p className="text text-error">{errors.lastName?.message}</p>
          </label>
          <label className="form-control space-y-2">
            <span className="label card-title">Prénom</span>
            <input
              {...register('firstName')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="firstName"
              type="firstName"
              placeholder="firstName"
              defaultValue={userInformations.firstName}
            />
            <p className="text text-error">{errors.firstName?.message}</p>
          </label>
          <label className="form-control space-y-2">
            <span className="label card-title">Ville</span>
            <input
              {...register('city')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="city"
              type="city"
              placeholder="city"
              defaultValue={userInformations.city}
            />
            <p className="text text-error">{errors.city?.message}</p>
          </label>
          <label className="form-control space-y-2">
            <span className="label card-title">Présentation</span>
            <input
              {...register('description')}
              className={
                errors.nickname ? 'input input-error' : 'input input-bordered'
              }
              id="description"
              type="description"
              placeholder="description"
              defaultValue={userInformations.description}
            />
            <p className="text text-error">{errors.description?.message}</p>
          </label>
          <label className="form-control space-y-2">
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
        </div>
      </div>
      <div className="flex justify-center gap-4">
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
