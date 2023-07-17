import { gql, useMutation } from '@apollo/client'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterFormProps } from '../components/inputs/inputsInterfaces'
import { registerSchema } from '../utils/userRegisterValidation'
import { NotificationContext } from '../contexts/NotificationContext'
import PasswordInput from '../components/inputs/PasswordInput'
import { ADD_USER, GET_TOKEN } from '../queries/user'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(registerSchema),
  })

  const [addUser] = useMutation(ADD_USER)
  const { setUser, isCreatingBlog } = useContext(UserContext)
  const navigate = useNavigate()
  const [loadToken] = useMutation(GET_TOKEN)
  const { setMessage } = useContext(NotificationContext)

  const location = useLocation()

  const onSubmit = async (data: FieldValues) => {
    const user = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    }
    addUser({ variables: { ...user } })
      .then(() => {
        setMessage({
          text: 'Félicitation pour votre création de compte ! Bon voyage sur tabas.blog',
          type: 'success',
        })
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
            isCreatingBlog ? navigate('/createblog') : navigate('/profile')
          })
          .catch((err) => console.error(err))
        isCreatingBlog ? navigate('/login') : navigate('/')
      })
      .catch((err) => {
        console.error(err)
        alert('Erreur')
      })
  }

  return (
    <div
      className={`relative group flex justify-center items-center ${
        location.pathname === '/register'
          ? 'min-h-screen pt-16 md:pt-0 pb-8'
          : ''
      }`}
    >
      <img
        src="/texture-3.png"
        className={`${
          location.pathname === '/register' ? 'md:flex' : ''
        } hidden absolute left-0 bottom-0 w-full opacity-50`}
      />
      <img
        src="/tache-right.png"
        alt="tâche"
        className={`${
          location.pathname === '/register' ? 'xl:flex' : ''
        } hidden absolute max-w-xl right-0 -top-1/4 text-primary`}
      />
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row-reverse justify-around items-center gap-8">
        <div className="text-center lg:text-left max-w-screen-sm space-y-4 md:space-y-8 px-4">
          <h1 className="text-5xl font-bold">
            Créez votre compte maintenant !
          </h1>
          <div className="h-px w-0 group-hover:w-full max-w-sm bg-primary transition-all duration-1000" />
          <p>
            Vous souhaitez créer votre propre blog ? Inscrivez-vous dès
            maintenant sur notre plateforme ! L'inscription est simple et
            rapide, et vous donne accès à toutes les fonctionnalités de notre
            service de blogging. Vous pourrez personnaliser votre blog selon vos
            goûts et vos besoins, et partager vos passions et vos idées avec le
            monde entier. N'attendez plus, inscrivez-vous dès maintenant et
            lancez-vous dans l'aventure du blogging !
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm card-body py-0 px-4 sm:px-8">
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
            <PasswordInput
              id="confirm-password"
              labelTitle="Confirmation du mot de passe"
              labelClassName="label label-text"
              inputName="confirmPassword"
              inputClassName={
                errors.confirmPassword
                  ? 'input input-error'
                  : 'input input-bordered'
              }
              placeholder="Mot de passe"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <label className="form-control">
              <span className="label label-text">Pseudo</span>
              <input
                {...register('nickname')}
                className={
                  errors.nickname ? 'input input-error' : 'input input-bordered'
                }
                id="nickname"
                type="text"
                placeholder="Pseudo"
              />
              <p className="text text-error">{errors.nickname?.message}</p>
            </label>
          </form>
          <Link to="/login" className="label-text-alt link link-hover mt-6">
            Déjà membre ?
          </Link>
          <button
            id="create-account-button"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-primary"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
