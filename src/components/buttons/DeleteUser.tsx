import { useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser
  }
`

const DeleteUser = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const { message, setMessage } = useContext(NotificationContext)
  const [deleteCurrentUser, { loading, error }] = useMutation(DELETE_USER)

  async function deleteUserOnClick() {
    try {
      await deleteCurrentUser()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setMessage({
        text: 'Compte, blogs et articles supprimés avec succès, même si nous sommes triste de vous voir partir :( Bon vent !',
        type: 'success',
      })
      navigate('/')
    } catch (error) {
      setMessage({
        text: 'Error while deleting the account, please try again later.',
        type: 'error',
      })
      console.error(error)
    }
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
          <p className="text-lg text-center mb-8">
            Si vous supprimez votre compte, vous perdrez tous vos blogs et vos
            articles !
          </p>
          <p className="font-bold text-lg text-center mb-2">
            Êtes-vous sûr de vouloir faire ça ?
          </p>
          <p className="italic text-sm text-center mb-12">
            {' '}
            (Et puis franchement, on est pas bien là ?)
          </p>
          <div className="modal-action flex items-center justify-center">
            <label
              htmlFor="delete-user-modal"
              className="btn btn-sm text-white btn-error"
              onClick={() => deleteUserOnClick()}
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
