import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Ce champ doit être rempli',
  },
  string: {
    min: 'Ton texte doit faire au moins ${min} caractères',
  },
})

export const nameValidation: any = yup.object().shape({
  name: yup.string().nullable().required().min(5),
})

export const descriptionValidation: any = yup.object().shape({
  description: yup.string().nullable().required().min(10),
})
