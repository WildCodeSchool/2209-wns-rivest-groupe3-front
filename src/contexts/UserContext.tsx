import { createContext, useState } from 'react'

export interface IUser {
  id?: string
  nickname: string
  email: string
  lastName: string
  firstName: string
  lastLogin: Date
  description: string
  city: string
  avatar: string
  createdAt: Date
}

export interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  isCreatingBlog: boolean
  setIsCreatingBlog: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  isCreatingBlog: false,
  setIsCreatingBlog: () => {},
})

const stringUser = localStorage.getItem('user')

const localUser: IUser | undefined = stringUser && JSON.parse(stringUser)

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(localUser || null)
  const [isCreatingBlog, setIsCreatingBlog] = useState(false)

  return (
    <UserContext.Provider
      value={{ user, setUser, isCreatingBlog, setIsCreatingBlog }}
    >
      {children}
    </UserContext.Provider>
  )
}
