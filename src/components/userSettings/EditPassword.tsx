import { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  UserPasswordFormProps,
  userEditPasswordSchema,
} from '../../utils/userEditPasswordValidation'
import { UserContext, IUserContext, IUser } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'

const UPDATE_PASSWORD_USER = gql`
  mutation UpdateUserPassword($newPassword: String!, $oldPassword: String!) {
    updateUserPassword(newPassword: $newPassword, oldPassword: $oldPassword) {
      id
    }
  }
`

interface IEditPasswordForm {
  userInformations: IUser
  setShowEditPasswordForm: React.Dispatch<React.SetStateAction<boolean>>
  setShowUserInformations: React.Dispatch<React.SetStateAction<boolean>>
}

const EditPasswordForm = ({
  userInformations,
  setShowUserInformations,
  setShowEditPasswordForm,
}: IEditPasswordForm) => {
  const { user } = useContext<IUserContext>(UserContext)
  const { message, setMessage } = useContext(NotificationContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserPasswordFormProps>({
    resolver: yupResolver(userEditPasswordSchema),
  })

  const [updateUser] = useMutation(UPDATE_PASSWORD_USER)

  const onSubmit = async (formData: FieldValues) => {
    const newUserPassword = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    }
    updateUser({ variables: { ...newUserPassword } })
      .then(() => {
        setMessage({
          text: `Mot de passe mis à jour avec succès !`,
          type: 'success',
        })
        setShowUserInformations(true)
        setShowEditPasswordForm(false)
      })
      .catch((err) => {
        setMessage({
          text: `Impossible de mettre à jour le mot de passe. ${err}.`,
          type: 'error',
        })
        console.error(err)
      })
  }

  const onCancelClick = () => {
    setShowUserInformations(true)
    setShowEditPasswordForm(false)
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
        </div>
        <div className="w-4/6">
          <label className="form-control mb-4">
            <span className="label card-title">Ancien mot de passe</span>
            <input
              {...register('oldPassword')}
              className={
                errors.oldPassword
                  ? 'input input-error'
                  : 'input input-bordered'
              }
              id="old-password"
              type="password"
              placeholder="Ancien mot de passe"
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
              id="new-password"
              type="password"
              placeholder="Nouveau mot de passe"
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
              placeholder="Confirmation du nouveau mot de passe"
            />
            <p className="text text-error">
              {errors.confirmNewPassword?.message}
            </p>
          </label>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-12">
        <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </button>
        <button className="btn btn-error" onClick={() => onCancelClick()}>
          Annuler
        </button>
      </div>
    </>
  )
}

export default EditPasswordForm
