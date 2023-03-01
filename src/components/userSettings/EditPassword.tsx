import { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  UserPasswordFormProps,
  userEditPasswordSchema,
} from '../../utils/userEditPasswordValidation'
import { IUser } from '../../contexts/UserContext'
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
  const { setMessage } = useContext(NotificationContext)

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
        <div className="w-full md:w-4/6 m-auto">
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
        <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </button>
        {/* <button className="btn btn-error" onClick={() => onCancelClick()}> */}
        <button className="btn btn-error" onClick={() => onCancelClick()}>
          Annuler
        </button>
      </div>
    </>
  )
}

export default EditPasswordForm
