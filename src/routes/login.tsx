import { gql, useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const GET_TOKEN = gql`
  mutation Mutation($password: String!, $email: String!) {
    login: getToken(password: $password, email: $email) {
      token
      user {
        id
        nickname
        email
        lastName
        firstName
        lastLogin
        description
        createdAt
      }
    }
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)

  const { setUser, isCreatingBlog } = useContext(UserContext)

  const navigate = useNavigate()
  const [loadToken] = useMutation(GET_TOKEN)

  const submitLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    loadToken({
      variables: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        localStorage.setItem('token', res.data.login.token)
        const localUser = {
          id: res.data.login.user.id,
          nickname: res.data.login.user.nickname,
        }
        localStorage.setItem('user', JSON.stringify(localUser))
        setUser(res.data.login.user)

        isCreatingBlog ? navigate('/createblog') : navigate('/')
      })
      .catch((err) => console.error(err))
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Connexion</h1>
          <p className="py-6">
            Bienvenue sur notre application ! Pour accéder à toutes les
            fonctionnalités, veuillez vous connecter en utilisant vos
            identifiants de connexion. Si vous n'avez pas encore de compte, vous
            pouvez en créer un en cliquant sur le bouton "Inscription" en haut à
            droite de la page. Nous espérons que vous apprécierez votre
            expérience sur notre application !
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={submitLogin}>
            <label className="form-control">
              <span className="label label-text">Email</span>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </label>

            <label className="form-control">
              <span className="label label-text">Mot de passe</span>
              <input
                type="password"
                placeholder="Mot de passe"
                className="input input-bordered"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </label>
            {isValid && (
              <span className="text-red-500">
                Email ou mot de passe invalide
              </span>
            )}
            <button type="submit" className="btn btn-primary mt-6">
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
