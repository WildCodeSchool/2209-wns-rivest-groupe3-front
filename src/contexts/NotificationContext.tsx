import { createContext, useContext, useState } from 'react'

interface IMessage {
  text: string
  type: 'success' | 'error' | 'info' | 'warn'
}

interface INotificationContext {
  message: IMessage | null
  setMessage: React.Dispatch<React.SetStateAction<IMessage | null>>
}

export const NotificationContext = createContext<INotificationContext>({
  message: null,
  setMessage: () => {},
})

export const NotificationProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  const [message, setMessage] = useState<IMessage | null>(null)

  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}
