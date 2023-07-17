export interface RegisterFormProps {
  email: string
  password: string
  confirmPassword: string
  nickname: string
}

export interface LoginFormProps {
  email: string
  password: string
}

export interface CreateCommentProps {
  content: string
}
