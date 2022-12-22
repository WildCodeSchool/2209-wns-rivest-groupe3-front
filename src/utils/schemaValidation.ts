import * as yup from 'yup'
import {
  RegisterFormProps,
  LoginFormProps,
} from '../components/inputs/inputsInterfaces'

yup.setLocale({
  mixed: {
    default: 'Champ non valide',
  },
})

const registerSchema: any = yup
  .object({
    email: yup
      .string()
      .email()
      .required('Merci de renseigner un email')
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Merci de renseigner une adresse mail valide'
      ),
    password: yup
      .string()
      .required('Merci de renseigner un mot de passe')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Le mot de passe doit contenir au moins 8 charactères, dont une majuscule, un chiffre, et un chactère spécial'
      ),
    confirmPassword: yup
      .string()
      .required('Merci de confirmer votre mot de passe')
      .oneOf(
        [yup.ref('password'), null],
        'Les mots de passe ne correspondent pas.'
      ),
    nickname: yup.string().required('Merci de renseigner un pseudo'),
  })
  .required()
  .defined()

const loginSchema: any = yup.object({
  email: yup
    .string()
    .email()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Merci de renseigner une adresse mail valide'
    )
    .required('Merci de renseigner un email'),
  password: yup.string().required('Merci de renseigner un mot de passe'),
})

export { registerSchema, loginSchema }
