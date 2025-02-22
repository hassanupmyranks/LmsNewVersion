import styled from 'styled-components'

import { CSSProperties, TextareaHTMLAttributes } from 'react'
import { Required } from '../../../../../../components/V2/Form/styledComponents'
import { RequiredError } from '../../../../../../components/V2/Form/Input'
import {
  Blue,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../../../../const/V2/stylingVariables'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  error?: string
}

const TextArea = ({
  label,
  style,
  required,
  error,
  ...inputProps
}: TextAreaProps) => {
  return (
    <InputContainer style={style}>
      <InputLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </InputLabel>
      <InputElement {...inputProps} error={!!error} />
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
  gap: 12px;
`

const InputElement = styled.textarea<{ error?: boolean }>`
  all: unset;
  height: 180px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  word-wrap: break-word;
  word-break: break-all;
  padding: 16px 24px;
  border: 1px solid ${({ error }) => (error ? RequiredRed : SecondaryGray)};
  border-radius: 1rem;

  background: ${White};
  color: ${Blue};
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}
  cursor: text;

  &::placeholder {
    color: ${SecondaryGray600};
  }
`
