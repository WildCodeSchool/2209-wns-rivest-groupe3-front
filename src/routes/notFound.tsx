import { Link } from 'react-router-dom'
import ErrorComponent from '../components/ErrorComponent'

const NotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 not found</h1>
          <ErrorComponent error={{ message: 'Cette page est introuvable' }} />
        </div>
      </div>
    </div>
  )
}

export default NotFound
