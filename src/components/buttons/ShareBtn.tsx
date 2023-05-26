import { useContext } from 'react'
import { HiOutlineShare } from 'react-icons/hi'
import { NotificationContext } from '../../contexts/NotificationContext'

const ShareBtn = () => {
  const { setMessage } = useContext(NotificationContext)

  const copyToClipboard = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    setMessage({
      text: 'Le blog a été copiée dans le presse-papiers !',
      type: 'success',
    })
  }
  return (
    <button
      className="btn btn-outline flex items-center gap-2 w-12 aspect-square p-2 sm:w-fit sm:aspect-auto sm:px-4"
      onClick={copyToClipboard}
    >
      <HiOutlineShare size={'1.5rem'} />
      <span className="hidden lg:flex">Partager</span>
    </button>
  )
}

export default ShareBtn
