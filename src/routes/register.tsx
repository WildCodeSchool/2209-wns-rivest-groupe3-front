import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
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

  const changeField = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUser({ ...user, [e.target.id]: e.target.value })

  const submitUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    addUser({ variables: { ...user } })
      .then(() => {
        alert('Vous avez été enregistré avec succès !')
      })
      .catch((err) => {
        console.error(err)
        alert('Erreur')
      })
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={user?.email}
                onChange={changeField}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="mot de passe"
                className="input input-bordered"
                value={user?.password}
                onChange={changeField}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pseudo</span>
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="pseudo"
                className="input input-bordered"
                value={user?.nickname}
                onChange={changeField}
                required
              />
            </div>
            <Link to="/login" className="label-text-alt link link-hover">
              Déjà membre ?
            </Link>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
