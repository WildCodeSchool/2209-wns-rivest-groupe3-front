import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Navbar = () => {
  const { user, setUser } = useContext(UserContext)
  const location = useLocation()

  const defaultNavClass =
    'navbar bg-white text-neutral w-full justify-between fixed top-0 z-50'
  const heroNavClass =
    'navbar bg-transparent text-white w-full justify-between absolute top-0 z-50'

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <nav className={location.pathname === "/" ? heroNavClass : defaultNavClass}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Logo
        </Link>
        <Link to="/discover" className="btn btn-ghost normal-case text-xl">
          Découvrir
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <span className="text-xl font-bold mr-2">{user.nickname}</span>
        ) : (
          <>
            <Link to="/register" className="btn btn-ghost">
              Inscription
            </Link>
            <Link to="/login" className="btn">
              Connexion
            </Link>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end text-neutral">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button className="btn btn-secondary" onClick={logout}>
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
