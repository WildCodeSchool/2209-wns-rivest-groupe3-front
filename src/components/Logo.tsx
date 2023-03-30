import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="btn btn-ghost normal-case text-xl">
      <object
        data="/Tabasblog-logo.svg"
        type="image/svg+xml"
        className="h-full pointer-events-none"
      >
        <img src="/Tabasblog-logo.png" />
      </object>
    </Link>
  )
}

export default Logo
