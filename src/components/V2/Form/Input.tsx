import styled from 'styled-components'
import {
  Blue,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { CSSProperties, InputHTMLAttributes } from 'react'
import { InfoIcon, Required, Tooltiped } from './styledComponents'
import { OverlayTrigger } from 'react-bootstrap'

interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  full?: boolean
  error?: string
  Update?: boolean
  toolTipText?: any
}

const InputV2 = ({
  label,
  style,
  required,
  full,
  error,
  Update,
  toolTipText,
  ...inputProps
}: InputV2Props) => {
  return (
    <InputContainer style={style} full={full}>
      <InputLabel>
        {label}
        {required ? <Required>*</Required> : ''}

        {toolTipText && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltiped id="tooltip-top">{toolTipText}</Tooltiped>}
          >
            <InfoIcon />
          </OverlayTrigger>
        )}
      </InputLabel>
      <InputElement
        {...inputProps}
        spellCheck={false}
        Update={Update}
        error={error}
      />
      {error && <RequiredError>{error}</RequiredError>}
    </InputContainer>
  )
}

export default InputV2

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
  // gap: 6px;

  // @media (max-width: 500px) {
  //   width: 100% !important;
  // }
`

const InputElement = styled.input<{ error?: string; Update?: boolean }>`
  all: unset;
  font-family: 'DM Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  outline: none;
  padding: 12px 20px;
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
