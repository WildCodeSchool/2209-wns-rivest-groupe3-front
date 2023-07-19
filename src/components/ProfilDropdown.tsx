import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../contexts/NotificationContext'
import { IUser, UserContext } from '../contexts/UserContext'
import Avatar from './Avatar'

const ProfilDropdown = ({ user }: { user: IUser }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)

  const showMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  const logout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setMessage({
        text: 'Déconnexion réussie',
        type: 'success',
      })
      navigate('/')
    } catch (err) {
      setMessage({
        text: 'Erreur lors de la déconnexion',
        type: 'error',
      })
      navigate('/')
    }
  }
  return (
    <div className="relative text-neutral">
      <button
        id="profil-head-avatar"
        className="btn btn-ghost btn-circle avatar"
        onClick={showMenu}
      >
        <Avatar imgUrl={user.avatar} width="w-10" />
      </button>
      {isMenuVisible && (
        <>
          <div className="fixed left-0 top-0 w-full h-full" onClick={showMenu}/>
          <ul className="absolute right-0 mt-3 p-2 shadow menu menu-compact bg-base-100 rounded-box w-52">
            <li>
              <Link
                id="profil-head-link"
                to={`/profile/${user.id}`}
                className="justify-between"
              >
                Voir le profil
              </Link>
            </li>
            <li>
              <Link
                id="settings-head-link"
                to="/settings"
                className="justify-between"
              >
                Paramètres de compte
              </Link>
            </li>
            <li>
              <button
                id="disconnexion-head"
                className="btn btn-secondary"
                onClick={logout}
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default ProfilDropdown
