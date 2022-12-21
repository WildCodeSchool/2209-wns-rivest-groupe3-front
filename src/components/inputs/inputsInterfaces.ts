import { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

export interface RegisterFormProps {
  nickname?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export interface RHFInputProps {
  label: string
  name: string
  control: Control<FieldValues, any>
  errors: Partial<
    FieldErrorsImpl<{
      name: string
      email: string
      password: string
      confirmPassword: string
    }>
  >
}
