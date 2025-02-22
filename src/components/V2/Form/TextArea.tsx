import styled from 'styled-components'
import {
  Blue,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { CSSProperties, TextareaHTMLAttributes } from 'react'
import { Required } from './styledComponents'
import { RequiredError } from './Input'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  error?: string
  Update?: boolean
}

const TextArea = ({
  label,
  style,
  required,
  error,
  Update,
  ...inputProps
}: TextAreaProps) => {
  return (
    <InputContainer style={style}>
      <InputLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </InputLabel>
      <InputElement {...inputProps} error={!!error} Update={Update} />
      {error && <RequiredError>{error}</RequiredError>}
    </InputContainer>
  )
}

export default TextArea

const InputLabel = styled.p`
  color: ${Blue};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

const InputContainer = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
`

const InputElement = styled.textarea<{ error?: boolean; Update?: boolean }>`
  all: unset;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;

  padding: 16px 24px;
  border: 1px solid
    ${({ error, Update }) =>
      error ? RequiredRed : Update ? '#0bed07' : SecondaryGray};
  border-radius: 1rem;

  background: ${White};
  color: ${Blue};
  cursor: text;

  &::placeholder {
    color: ${SecondaryGray600};
  }
`
