import { createContext, useState } from 'react'

interface IModalContext {
  title: string | null
  setTitle: React.Dispatch<React.SetStateAction<string | null>>
  images: string[]
  setImages: React.Dispatch<React.SetStateAction<string[]>>
}

export const ModalContext = createContext<IModalContext>({
  title: null,
  setTitle: () => {},
  images: [],
  setImages: () => {},
})

export const ModalProvider = ({ children }: { children: JSX.Element }) => {
  const [title, setTitle] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])

  return (
    <ModalContext.Provider value={{ title, setTitle, images, setImages }}>
      {children}
    </ModalContext.Provider>
  )
}
