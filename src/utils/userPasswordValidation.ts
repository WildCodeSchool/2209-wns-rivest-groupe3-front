import * as yup from 'yup'

export interface IUserPassword {
  password: string
}

yup.setLocale({
  mixed: {
    default: 'Champ non valide',
  },
})

const userPasswordSchema = yup.object({
  password: yup.string(),
})

export { userPasswordSchema }
