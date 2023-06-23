import { createContext, useState } from 'react'

interface IErrorContext {
  error: any | null
  setError: React.Dispatch<React.SetStateAction<any | null>>
}

export const ErrorContext = createContext<IErrorContext>({
  error: null,
  setError: () => {},
})

export const ErrorProvider = ({ children }: { children: JSX.Element }) => {
  const [error, setError] = useState<IErrorContext | null>(null)

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}
