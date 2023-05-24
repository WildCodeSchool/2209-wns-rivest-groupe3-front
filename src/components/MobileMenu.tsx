import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from '../contexts/NotificationContext'
import { IUser, UserContext } from '../contexts/UserContext'
import Avatar from './Avatar'

interface IProps {
  user: IUser | null
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu = ({ user, setIsMenuOpen }: IProps) => {
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

  const closeMenu = () => {
    setIsMenuOpen((isOpen: boolean) => (isOpen = false))
  }

  return (
    <div
      className={`fixed border z-50 top-0 left-0 bg-white w-full h-screen flex flex-col justify-center items-center gap-2 text-neutral p-4`}
    >
      <button
        className="absolute top-4 right-4 font-bold text-3xl"
        onClick={closeMenu}
      >
        x
      </button>
      {user ? (
        <>
          <div className="self-center border-4 border-primary rounded-full">
            <Avatar imgUrl={user.avatar} width="w-48" />
          </div>
          <Link
            to="/blogs"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Blogs
          </Link>
          <Link
            to="/articles"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Articles
          </Link>
          <Link
            id="profil-head-link"
            to={`/profile/${user.id}`}
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Voir le profil
          </Link>

          <Link
            id="settings-head-link"
            to="/settings"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Paramètres
          </Link>

          <button
            id="disconnexion-head"
            className="btn btn-ghost text-secondary normal-case text-xl"
            onClick={logout}
          >
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link
            to="/blogs"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Blogs
          </Link>
          <Link
            to="/articles"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Articles
          </Link>
          <Link
            id="inscription-head-link"
            to="/register"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Inscription
          </Link>
          <Link
            id="login-head-link"
            to="/login"
            className="btn btn-ghost normal-case text-xl"
            onClick={closeMenu}
          >
            Connexion
          </Link>
        </>
      )}
    </div>
  )
}

export default MobileMenu
