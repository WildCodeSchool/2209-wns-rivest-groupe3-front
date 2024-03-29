import { gql, useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'

import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormProps } from '../components/inputs/inputsInterfaces'
import { loginSchema } from '../utils/userRegisterValidation'
import PasswordInput from '../components/inputs/PasswordInput'
import { GET_TOKEN } from '../queries/user'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(loginSchema),
  })

  const { setUser, isCreatingBlog } = useContext(UserContext)
  const { message, setMessage } = useContext(NotificationContext)
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
          avatar: res.data.login.user.avatar,
        }
        localStorage.setItem('user', JSON.stringify(localUser))
        setUser(res.data.login.user)
        isCreatingBlog ? navigate('/createblog') : navigate('/')
        setMessage({
          text: 'Connexion réussie',
          type: 'success',
        })
      })
      .catch((err) => {
        setMessage({
          text: 'Erreur lors de la connexion',
          type: 'error',
        })
        console.error(err)
      })
  }

  return (
    <div className="group hero min-h-screen bg-primary/10 mt-16 lg:mt-0">
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row-reverse justify-around items-center gap-8 py-8">
        <div className="text-center lg:text-left max-w-screen-sm space-y-4 md:space-y-8 px-4">
          <h1 className="text-5xl font-bold">Déjà inscrit ? Connectez-vous !</h1>
          <div className="hidden lg:flex h-px w-0 group-hover:w-full max-w-sm bg-primary transition-all duration-1000" />
          <p className='hidden sm:flex'>
            Bienvenue sur notre application ! Pour accéder à toutes les
            fonctionnalités, veuillez vous connecter en utilisant vos
            identifiants de connexion. Si vous n'avez pas encore de compte, vous
            pouvez en créer un en cliquant sur le bouton "Inscription" en haut à
            droite de la page. Nous espérons que vous apprécierez votre
            expérience sur notre application !
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100 card-body">
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
            <PasswordInput
              id="password"
              labelTitle="Mot de passe"
              labelClassName="label label-text"
              inputName="password"
              inputClassName={
                errors.password ? 'input input-error' : 'input input-bordered'
              }
              placeholder="Mot de passe"
              register={register}
              error={errors.password?.message}
            />
          </form>
          <Link to="/register" className="label-text-alt link link-hover mt-6">
            Pas encore de comtpe ?
          </Link>
          <button
            id="connexion-button"
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
