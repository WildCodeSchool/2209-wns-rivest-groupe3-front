import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../contexts/NotificationContext'
import { IUser, UserContext } from '../contexts/UserContext'
import Avatar from './Avatar'

const ProfilDropdown = ({ user }: { user: IUser }) => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)
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
    <div className="dropdown dropdown-end text-neutral">
      <label
        tabIndex={0}
        id="profil-head-avatar"
        className="btn btn-ghost btn-circle avatar"
      >
        <Avatar imgUrl={user.avatar} width="w-10" />
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
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
    </div>
  )
}

export default ProfilDropdown
