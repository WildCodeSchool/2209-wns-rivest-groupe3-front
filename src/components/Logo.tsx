import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="w-16 md:w-32 hover:scale-110 hover:-rotate-3 transition-all duration-300">
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
