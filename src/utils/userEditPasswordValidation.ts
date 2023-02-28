import * as yup from 'yup'

export interface UserPasswordFormProps {
  oldPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}

yup.setLocale({
  mixed: {
    default: 'Champ non valide',
  },
})

const userEditPasswordSchema = yup.object({
  oldPassword: yup.string(),
  newPassword: yup
    .string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Le mot de passe doit contenir au moins 8 charactères, dont une majuscule, un chiffre, et un chactère spécial'
    )
    .notOneOf(
      [yup.ref('oldPassword'), null],
      "Le nouveau mot de passe ne peut pas être le même que l'ancien."
    ),
  confirmNewPassword: yup
    .string()
    .required('Merci de confirmer votre mot de passe')
    .oneOf(
      [yup.ref('newPassword'), null],
      'Les mots de passe ne correspondent pas.'
    ),
})

export { userEditPasswordSchema }
