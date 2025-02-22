import styled from 'styled-components'
import {
  Blue,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { CSSProperties, InputHTMLAttributes } from 'react'
import { Required } from './styledComponents'
import { RequiredError } from './Input'

interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  full?: boolean
  error?: string
}

const BasicNumberInput = ({
  label,
  style,
  required,
  full,
  error,
  ...inputProps
}: InputV2Props) => {
  return (
    <InputContainer style={style} full={full}>
      <InputLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </InputLabel>
      <InputElement {...inputProps} type="number" />
      {error && <RequiredError>{error}</RequiredError>}
    </InputContainer>
  )
}

export default BasicNumberInput

const InputLabel = styled.p`
  color: ${Blue};
  user-select: none;
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
`

const InputElement = styled.input<{ error?: string }>`
  width: 0;
  min-width: 100%;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  outline: none;
  padding: 12px 20px;
  border: 1px solid ${SecondaryGray};
  border-radius: 1rem;
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}
  background: ${White};
  color: ${Blue};
  cursor: text;
  &::placeholder {
    color: ${SecondaryGray600};
  }
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`
