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
import PasswordInput from '../inputs/PasswordInput'

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
    resetField,
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
    resetField('oldPassword')
    resetField('newPassword')
    resetField('confirmNewPassword')
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
          {userInformations.avatar ? (
            <img
              src={userInformations.avatar}
              alt={`${userInformations.nickname}-profil-picture`}
            />
          ) : (
            <img
              src={
                'https://ocsheriff.gov/sites/ocsd/files/styles/square_270/public/2022-05/John%20Doe_icon.png?h=8a7fc05e&itok=Gv2mcIrT'
              }
            />
          )}
        </div>
        <div className="w-4/6">
          <PasswordInput
            id="old-password"
            labelTitle="Ancien mot de passe"
            labelClassName="label card-title"
            additionalLabelContainerClassName="mb-4"
            inputName="oldPassword"
            placeholder="Ancien mot de passe"
            inputClassName={
              errors.oldPassword ? 'input input-error' : 'input input-bordered'
            }
            register={register}
            error={errors.oldPassword?.message}
          />
          <PasswordInput
            id="new-password"
            labelTitle="Nouveau mot de passe"
            labelClassName="label card-title"
            additionalLabelContainerClassName="mb-4"
            inputName="newPassword"
            placeholder="Nouveau mot de passe"
            inputClassName={
              errors.newPassword ? 'input input-error' : 'input input-bordered'
            }
            register={register}
            error={errors.newPassword?.message}
          />
          <PasswordInput
            id="confirm-password"
            labelTitle="Confirmation du nouveau mot de passe"
            labelClassName="label card-title"
            additionalLabelContainerClassName="mb-4"
            inputName="confirmNewPassword"
            placeholder="Confirmation du nouveau mot de passe"
            inputClassName={
              errors.confirmNewPassword
                ? 'input input-error'
                : 'input input-bordered'
            }
            register={register}
            error={errors.confirmNewPassword?.message}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-12">
        <button
          id="edit-password-save"
          className="btn btn-primary"
          onClick={handleSubmit(onSubmit)}
        >
          Enregistrer
        </button>
        {/* <button className="btn btn-error" onClick={() => onCancelClick()}> */}
        <button
          id="edit-password-cancel"
          className="btn btn-error"
          onClick={() => onCancelClick()}
        >
          Annuler
        </button>
      </div>
    </>
  )
}

export default EditPasswordForm
