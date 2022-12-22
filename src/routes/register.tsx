import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterFormProps } from '../components/inputs/inputsInterfaces'
import { registerSchema } from '../utils/schemaValidation'

const ADD_USER = gql`
  mutation Mutation($nickname: String!, $password: String!, $email: String!) {
    createUser(nickname: $nickname, password: $password, email: $email) {
      nickname
    }
  }
`

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(registerSchema),
  })

  const [addUser] = useMutation(ADD_USER)

  const onSubmit = async (data: FieldValues) => {
    const user = {
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    }
    console.log(user)
    addUser({ variables: { ...user } })
      .then(() => {
        alert('Ok')
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
            Vous souhaitez créer votre propre blog ? Inscrivez-vous dès
            maintenant sur notre plateforme ! L'inscription est simple et
            rapide, et vous donne accès à toutes les fonctionnalités de notre
            service de blogging. Vous pourrez personnaliser votre blog selon vos
            goûts et vos besoins, et partager vos passions et vos idées avec le
            monde entier. N'attendez plus, inscrivez-vous dès maintenant et
            lancez-vous dans l'aventure du blogging !
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

            <label className="form-control">
              <span className="label label-text">
                Confirmation du mot de passe
              </span>
              <input
                {...register('confirmPassword')}
                className={
                  errors.confirmPassword
                    ? 'input input-error'
                    : 'input input-bordered'
                }
                id="confirm-password"
                type="password"
                placeholder="Confirmation du mot de passe"
              />
              <p className="text text-error">
                {errors.confirmPassword?.message}
              </p>
            </label>

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
