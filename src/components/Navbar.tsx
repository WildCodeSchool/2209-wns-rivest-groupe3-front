import { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import BurgerBtn from './buttons/BurgerBtn'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import ProfilDropdown from './ProfilDropdown'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation()

  return (
    <>
      <nav
        className={`navbar w-full justify-between top-0 z-50 ${
          location.pathname === '/'
            ? 'bg-transparent text-white absolute'
            : 'bg-white text-neutral fixed'
        }`}
      >
        <Logo />
        <div className="hidden md:flex flex-1">
          <Link to="/blogs" className="btn btn-ghost normal-case text-xl">
            Blogs
          </Link>
          <Link to="/articles" className="btn btn-ghost normal-case text-xl">
            Articles
          </Link>
        </div>
        <div className="hidden md:flex gap-2">
          {user ? (
            <span className="text-xl font-bold mr-2">{user.nickname}</span>
          ) : (
            <>
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

          {user && <ProfilDropdown user={user} />}
        </div>
        <BurgerBtn
          burgerColor={
            location.pathname === '/' ? 'text-white' : 'text-primary'
          }
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>
      {isMenuOpen && <MobileMenu user={user} setIsMenuOpen={setIsMenuOpen} />}
    </>
  )
}

export default Navbar
