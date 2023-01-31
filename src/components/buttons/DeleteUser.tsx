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
      <label htmlFor="delete-user-modal" className="btn btn-error">
        Supprimer mon compte
      </label>
      <input type="checkbox" id="delete-user-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </h3>
          <div className="modal-action flex items-center justify-center">
            <label
              htmlFor="delete-user-modal"
              className="btn btn-sm btn-error"
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
