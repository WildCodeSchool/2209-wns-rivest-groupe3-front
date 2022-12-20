import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface IUser {
  nickname?: string
  email?: string
  password?: string
}

const ADD_USER = gql`
  mutation Mutation($nickname: String!, $password: String!, $email: String!) {
    createUser(nickname: $nickname, password: $password, email: $email) {
      nickname
    }
  }
`

const Register = () => {
  const [user, setUser] = useState<IUser>({})
  const [addUser] = useMutation(ADD_USER)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isValid, setIsValid] = useState(true)

  const changeField = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'confirm-password') {
      setConfirmPassword(e.target.value)
    } else {
      setUser({ ...user, [e.target.id]: e.target.value })
    }
  }
  
  const submitUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if(confirmPassword === user?.password){
      addUser({ variables: { ...user } })
        .then(() => {
          alert('Vous avez été enregistré avec succès !')
        })
        .catch((err) => {
          console.error(err)
          alert('Erreur')
        })
    } else {
      setIsValid(false)
    }
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Créez votre compte maintenant !
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={submitUser}>
            <label className="form-control">
              <span className="label label-text">Email</span>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={user?.email}
                onChange={changeField}
                required
              />
            </label>
            <label className="form-control">
              <span className="label label-text">Mot de passe</span>
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                className="input input-bordered"
                value={user?.password}
                onChange={changeField}
                required
              />
            </label>
            <label className="form-control">
              <span className="label label-text">
                Confirmation du mot de passe
              </span>
              <input
                id="confirm-password"
                type="password"
                placeholder="Mot de passe"
                className="input input-bordered"
                value={confirmPassword}
                onChange={changeField}
                required
              />
            </label>
            <label className="form-control">
              <span className="label label-text">Pseudo</span>
              <input
                id="nickname"
                type="text"
                placeholder="Pseudo"
                className="input input-bordered"
                value={user?.nickname}
                onChange={changeField}
                required
              />
            </label>
            <Link to="/login" className="label-text-alt link link-hover">
              Déjà membre ?
            </Link>
            {!isValid && (
              <span className="text-red-500">
                Confirmation différente du mot de passe
              </span>
            )}
            <button type="submit" className="btn btn-primary mt-6">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
