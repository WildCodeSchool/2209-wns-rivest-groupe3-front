import { useNavigate } from 'react-router-dom'
import LogoCrash from './LogoCrash'
import { useContext } from 'react'
import { ErrorContext } from '../contexts/ErrorContext'

const ErrorComponent = ({ error }: { error: any }) => {
  const { setError } = useContext(ErrorContext)

  const navigate = useNavigate()
  return (
    <section className="min-h-screen flex flex-col justify-center content-center">
      <h2 className="text-6xl font-bold font-lobster mt-5 text-center">
        Oups !
      </h2>
      <LogoCrash />
      <h3 className="text-3xl font-bold mt-5 text-center">{error.message}</h3>
      <button
        type="button"
        className="btn btn-primary mx-auto mt-4"
        onClick={() => {
          setError(null)
          navigate('/')
        }}
      >
        Retour à la page d'accueil
      </button>
    </section>
  )
}

export default ErrorComponent
