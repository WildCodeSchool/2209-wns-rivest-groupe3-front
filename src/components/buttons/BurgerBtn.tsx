import React from 'react'
import { IUser } from '../../contexts/UserContext'

interface IProps {
  burgerColor: 'text-white' | 'text-primary'
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerBtn = ({ burgerColor = 'text-primary', setIsMenuOpen }: IProps) => {
  const openMenu = () => setIsMenuOpen(true)

  return (
    <button
      className={`btn btn-ghost ${burgerColor} md:hidden`}
      onClick={openMenu}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  )
}

export default BurgerBtn
