import React, { useState } from 'react'
import {
  Icon,
  PasswordInputField,
  PasswordInputWrapper,
  PasswordInputLabel
} from './styledcomponents'
import { RequiredError } from '../../../components/V2/Form/Input'
import ShowedPasswordEyeImage from '../../../assets/images/show-password-eye-image.jpeg'
import HidePasswordEyeImage from '../../../assets/images/hide-password-eye-image.jpeg'

interface PasswordInputProps {
  label: string
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  error?: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <PasswordInputWrapper>
        <PasswordInputLabel>
          {label}
          <span style={{ color: '#197BBD' }}>*</span>
        </PasswordInputLabel>

        <PasswordInputField
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
        />
        <Icon onClick={togglePasswordVisibility}>
          {showPassword ? (
            <>
              <img
                src={ShowedPasswordEyeImage}
                alt="new"
                width={23}
                height={18}
              />
              {/* <FontAwesomeIcon icon={['far', 'eye']} size="1x" /> */}
            </>
          ) : (
            <>
              {/* <FontAwesomeIcon icon={['far', 'eye-slash']} size="1x" /> */}
              <img
                src={HidePasswordEyeImage}
                alt="new"
                width={22}
                height={22}
              />
            </>
          )}
        </Icon>
      </PasswordInputWrapper>
      {error && (
        <RequiredError style={{ marginTop: '-14px' }}>{error}</RequiredError>
      )}
    </>
  )
}

export default PasswordInput
