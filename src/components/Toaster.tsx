import { useContext, useEffect, useState } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

const Toaster = () => {
  const { message, setMessage } = useContext(NotificationContext)

  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    const resizeBar = setInterval(() => {
      setProgress((prev) => prev - 1)
    }, 50)

    return () => {
      clearInterval(resizeBar)
      clearTimeout(timer)
    }
  }, [message, setMessage])

  if (!message) return null

  let innerDivClass
  let progressBarBGColor

  switch (message.type) {
    case 'success':
      innerDivClass = 'alert alert-success'
      progressBarBGColor = 'bg-success h-1 rounded-full'
      break
    case 'error':
      innerDivClass = 'alert alert-error'
      progressBarBGColor = 'bg-error h-1 rounded-full'
      break
    case 'info':
      innerDivClass = 'alert alert-info'
      progressBarBGColor = 'bg-info h-1 rounded-full'
      break
    case 'warn':
      innerDivClass = 'alert alert-warning'
      progressBarBGColor = 'bg-warning h-1 rounded-full'
      break
    default:
      break
  }

  return (
    <div className="toast z-[1000]">
      <div className={innerDivClass}>
        <p>{message.text}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
        <div
          className={progressBarBGColor}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Toaster
