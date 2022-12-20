import { createContext, useContext, useState } from 'react'

interface IUser {
  id: number
  nickname: string
  email: string
  lastName: string
  firstName: string
  lastLogin: string
  description: string
  createdAt: string
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {}
});

const localUser = JSON.parse(localStorage.getItem("user") || "{}")

export const UserProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<IUser | null>(localUser.length ? localUser : null);
    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}