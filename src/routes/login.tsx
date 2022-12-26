import { gql, useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormProps } from '../components/inputs/inputsInterfaces'
import { loginSchema } from '../utils/schemaValidation'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(loginSchema),
  })

  const { setUser, isCreatingBlog } = useContext(UserContext)

  const navigate = useNavigate()
  const [loadToken] = useMutation(GET_TOKEN)

  const onSubmit = async (data: FieldValues) => {
    loadToken({
      variables: {
        email: data.email,
        password: data.password,
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
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 card-body">
          <form>
            <label className="form-control">
              <span className="label label-text">Email</span>
              <input
                {...register('email')}
                className={
                  errors.email ? 'input input-error' : 'input input-bordered'
                }
                id="email"
                type="email"
                placeholder="Email"
              />
              <p className="text text-error">{errors.email?.message}</p>
            </label>

            <label className="form-control">
              <span className="label label-text">Mot de passe</span>
              <input
                {...register('password')}
                className={
                  errors.password ? 'input input-error' : 'input input-bordered'
                }
                id="password"
                type="password"
                placeholder="Mot de passe"
              />
              <p className="text text-error">{errors.password?.message}</p>
            </label>
          </form>
          <Link to="/register" className="label-text-alt link link-hover mt-6">
            Pas encore de comtpe ?
          </Link>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-primary"
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
