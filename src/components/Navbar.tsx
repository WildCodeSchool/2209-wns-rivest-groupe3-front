import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 w-full">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Logo</Link>
      </div>
      <div className="flex-none gap-2">
      <Link to="/register" className="btn btn-ghost">Register</Link>
      <Link to="/login" className="btn">Login</Link>
        <div className="dropdown dropdown-end">
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
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
