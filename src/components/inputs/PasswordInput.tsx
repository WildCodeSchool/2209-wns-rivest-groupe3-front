import React, { FC, InputHTMLAttributes, useState } from 'react'
import { HiEyeSlash } from 'react-icons/hi2'
import { HiEye } from 'react-icons/hi2'

interface IPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  additionalLabelContainerClassName?: string
  labelTitle?: string
  labelClassName?: string
  inputName: string
  inputClassName: string
  placeholder: string
  error?: string
  register: any
}

const PasswordInput: FC<IPasswordInputProps> = ({
  id,
  additionalLabelContainerClassName,
  labelTitle,
  labelClassName,
  inputName,
  inputClassName,
  placeholder,
  register,
  error,
}) => {
  const [passwordType, setPasswordType] = useState('password')
  const [eyeShow, setEyeShow] = useState(false)

  const showPasswordIcon = () => {
    if (eyeShow) {
      return <HiEye />
    } else {
      return <HiEyeSlash />
    }
  }

  const showOnClick = (e: { preventDefault: any }) => {
    e.preventDefault()
    if (passwordType === 'password') {
      setPasswordType('text')
      setEyeShow(true)
    } else {
      setPasswordType('password')
      setEyeShow(false)
    }
  }

  return (
    <label className={`form-control ${additionalLabelContainerClassName}`}>
      <span className={labelClassName}>{labelTitle}</span>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pt-1">
          <input
            className="hidden js-password-toggle"
            id="toggle"
            type="checkbox"
          />
          <label className="mr-2 cursor-pointer js-password-label">
            <button onClick={showOnClick}>
              <i>{showPasswordIcon()}</i>
            </button>
          </label>
        </div>
        <input
          className={`w-full js-password ${inputClassName}`}
          {...register(inputName)}
          aria-invalid={error ? 'true' : 'false'}
          id={id}
          type={passwordType}
          placeholder={placeholder}
        />
      </div>

      <p className="text text-error">{error}</p>
    </label>
  )
}

export default PasswordInput
