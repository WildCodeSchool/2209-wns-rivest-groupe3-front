import { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'
import {
  IUserPassword,
  userPasswordSchema,
} from '../../utils/userPasswordValidation'
import PasswordInput from '../inputs/PasswordInput'

const DELETE_USER = gql`
  mutation DeleteUser($password: String!) {
    deleteUser(password: $password)
  }
`

const DeleteUser = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const { message, setMessage } = useContext(NotificationContext)
  const [deleteCurrentUser, { loading, error }] = useMutation(DELETE_USER)

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<IUserPassword>({
    resolver: yupResolver(userPasswordSchema),
  })

  const deleteUserOnClick = async (formData: FieldValues) => {
    const userToDelete = {
      password: formData.password,
    }
    deleteCurrentUser({ variables: { ...userToDelete } })
      .then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setMessage({
          text: 'Compte, blogs et articles supprimés avec succès, même si nous sommes triste de vous voir partir :( Bon vent !',
          type: 'success',
        })
        navigate('/')
      })
      .catch((err) => {
        setMessage({
          text: 'Error while deleting the account, please try again later.',
          type: 'error',
        })
        console.error(err)
      })
  }

  const onCancelClick = () => {
    resetField('password')
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de l'action </p>

  return (
    <>
      <label
        id="delete-account"
        htmlFor="delete-user-modal"
        className="btn btn-error text-white"
      >
        Supprimer mon compte
      </label>
      <input type="checkbox" id="delete-user-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p className="font-bold text-lg text-center mb-1">
            Êtes-vous sûr de vouloir faire ça ?
          </p>
          <p className="italic text-sm text-center mb-12">
            {' '}
            (Franchement, on est pas bien là en bermuda ?)
          </p>
          <p className="text-lg text-center mb-8">
            Si vous supprimez votre compte, vous perdrez tous vos blogs et vos
            articles !
          </p>
          <p className="text-lg text-center mb-4">
            Mais si c'est vraiment ce que vous voulez, rentrez votre mot de
            passe pour confirmer la suppression :
          </p>
          <PasswordInput
            id="password"
            additionalLabelContainerClassName="mb-12"
            inputName="password"
            placeholder="Mot de passe"
            inputClassName={
              errors.password ? 'input input-error' : 'input input-bordered'
            }
            register={register}
            error={errors.password?.message}
          />
          <div className="modal-action flex items-center justify-center">
            <label
              id="delete-account-confirm"
              htmlFor="delete-user-modal"
              className="btn btn-sm text-white btn-error"
              onClick={handleSubmit(deleteUserOnClick)}
            >
              Oui supprimer mon comtpe
            </label>
            <label
              id="delete-account-cancel"
              onClick={onCancelClick}
              htmlFor="delete-user-modal"
              className="btn btn-sm btn-ghost"
            >
              Non, annuler
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteUser
