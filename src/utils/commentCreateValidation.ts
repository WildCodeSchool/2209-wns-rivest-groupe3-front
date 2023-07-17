import * as yup from 'yup'

yup.setLocale({
  mixed: {
    default: 'Champ non valide',
  },
})

const commentSchema: any = yup
  .object({
    content: yup.string().required('Veuillez écrire un commentaire valide'),
  })
  .required()
  .defined()

export { commentSchema }
