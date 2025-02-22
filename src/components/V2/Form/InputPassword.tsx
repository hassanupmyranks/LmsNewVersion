import styled from 'styled-components'
import {
  Blue,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { CSSProperties, InputHTMLAttributes, useState } from 'react'
import { Required } from './styledComponents'
import ShowedPasswordEyeImage from '../../../assets/images/show-password-eye-image.jpeg'
import HidePasswordEyeImage from '../../../assets/images/hide-password-eye-image.jpeg'

interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  full?: boolean
  error?: string
  Update?: boolean
  password?: boolean
}

const InputPasswordV2 = ({
  label,
  style,
  required,
  full,
  error,
  Update,
  password,
  ...inputProps
}: InputV2Props) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <InputContainer style={style} full={full}>
      <InputLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </InputLabel>
      <InputElement
        {...inputProps}
        spellCheck={false}
        Update={Update}
        error={error}
        type={showPassword ? 'text' : 'password'}
      />
      {password && (
        <Icon onClick={togglePasswordVisibility}>
          {showPassword ? (
            <img
              src={ShowedPasswordEyeImage}
              alt="new"
              width={23}
              height={18}
            />
          ) : (
            <img src={HidePasswordEyeImage} alt="new" width={22} height={22} />
          )}
        </Icon>
      )}
      {error && <RequiredError>{error}</RequiredError>}
    </InputContainer>
  )
}

export default InputPasswordV2

const InputLabel = styled.p`
  color: ${Blue};

  user-select: none;
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

const InputContainer = styled.label<{ full?: boolean }>`
  display: flex;
  width: 100%;
  ${({ full }) => !full && 'max-width: 500px;'}
  flex-direction: column;
  gap: 6px;
  position: relative;
`

const InputElement = styled.input<{ error?: string; Update?: boolean }>`
  all: unset;
  font-family: 'DM Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  outline: none;
  padding: 12px 33px 12px 20px;
  border-radius: 1rem;
  border: 1px solid
    ${({ error, Update }) =>
      error ? RequiredRed : Update ? '#0bed07' : SecondaryGray};
  background: ${White};
  color: ${Blue};

  cursor: text;

  &::placeholder {
    color: ${SecondaryGray600};
    font-weight: 400;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
export const RequiredError = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${RequiredRed};
  user-select: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
  margin-right: 10px;
`
const Icon = styled.span`
  position: absolute;
  cursor: pointer;
  margin-top: 42px;
  margin-right: 12px;
  width: auto;
  display: flex;
  align-self: flex-end;
`
