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

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de l'action </p>

  return (
    <>
      <label htmlFor="delete-user-modal" className="btn btn-error text-white">
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
          <p className="text-lg text-center mb-2">
            Si vous supprimez votre compte, vous perdrez tous vos blogs et vos
            articles !
          </p>
          <p className="text-lg text-center mb-2">
            Rentrez votre mot de passe pour confirmer la suppression du compte:
          </p>
          <label className="form-control mb-16">
            <input
              {...register('password')}
              className={
                errors.password ? 'input input-error' : 'input input-bordered'
              }
              id="password"
              type="password"
              placeholder="Mot de passe"
            />
            <p className="text text-error">{errors.password?.message}</p>
          </label>
          <div className="modal-action flex items-center justify-center">
            <label
              htmlFor="delete-user-modal"
              className="btn btn-sm text-white btn-error"
              onClick={handleSubmit(deleteUserOnClick)}
            >
              Oui supprimer mon comtpe
            </label>
            <label htmlFor="delete-user-modal" className="btn btn-sm btn-ghost">
              Non, annuler
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteUser
