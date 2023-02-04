import * as yup from 'yup'

export interface UserInformationsFormProps {
  nickname?: string
  lastName?: string
  firstName?: string
  description?: string
  createdAt?: string
  city?: string
  avatar?: string
  email?: string
  oldPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}

yup.setLocale({
  mixed: {
    default: 'Champ non valide',
  },
})

const userInformationsSchema = yup.object({
  nickname: yup.string().optional(),
  lastName: yup.string().optional(),
  firstname: yup.string().optional(),
  city: yup.string().optional(),
  description: yup.string().optional(),
  email: yup
    .string()
    .email()
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Merci de renseigner une adresse mail valide'
    )
    .optional(),
  oldPassword: yup.string(),
  newPassword: yup
    .string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Le mot de passe doit contenir au moins 8 charactères, dont une majuscule, un chiffre, et un chactère spécial'
    )
    .optional(),
  confirmNewPassword: yup
    .string()
    .required('Merci de confirmer votre mot de passe')
    .oneOf(
      [yup.ref('newPassword'), null],
      'Les mots de passe ne correspondent pas.'
    )
    .optional(),
})

export { userInformationsSchema }
