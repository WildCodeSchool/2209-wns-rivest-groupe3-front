import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../contexts/NotificationContext'
import { IUser, UserContext } from '../contexts/UserContext'
import Avatar from './Avatar'

interface IProps {
  user: IUser | null
}

const MobileMenu = ({ user }: IProps) => {
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
    <div
      className={`fixed border border-red-500 z-50 top-0 left-0 bg-white w-full h-screen flex flex-col justify-center items-start text-neutral p-4`}
    >
      {user ? (
        <>
          <div className="self-center">
            <Avatar imgUrl={user.avatar} width="w-48" />
          </div>
          <Link to="/blogs" className="btn btn-ghost normal-case text-xl">
            Blogs
          </Link>
          <Link to="/articles" className="btn btn-ghost normal-case text-xl">
            Articles
          </Link>
          <Link
            id="profil-head-link"
            to={`/profile/${user.id}`}
            className="justify-between"
          >
            Voir le profil
          </Link>

          <Link
            id="settings-head-link"
            to="/settings"
            className="justify-between"
          >
            Paramètres de compte
          </Link>

          <button
            id="disconnexion-head"
            className="btn btn-secondary"
            onClick={logout}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link to="/blogs" className="btn btn-ghost normal-case text-xl">
            Blogs
          </Link>
          <Link to="/articles" className="btn btn-ghost normal-case text-xl">
            Articles
          </Link>
          <Link
            id="inscription-head-link"
            to="/register"
            className="btn btn-ghost"
          >
            Inscription
          </Link>
          <Link id="login-head-link" to="/login" className="btn">
            Connexion
          </Link>
        </>
      )}
    </div>
  )
}

export default MobileMenu
