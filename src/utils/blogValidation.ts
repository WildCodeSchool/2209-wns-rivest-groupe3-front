import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Ce champ doit être rempli',
  },
  string: {
    min: 'Ton texte doit faire au moins ${min} caractères',
  },
})

export const nameValidation = yup.object().shape({
  name: yup.string().required().min(5),
})

export const descriptionValidation = yup.object().shape({
  description: yup.string().required().min(10),
})
