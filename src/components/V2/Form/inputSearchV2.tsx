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
import { ReactComponent as SearchIcon } from '../../../assets/svg/search-icon.svg'

interface InputV2Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  style?: CSSProperties
  required?: boolean
  full?: boolean
  error?: string
  Update?: boolean
}

const InputSearchV2 = ({
  label,
  style,
  required,
  full,
  error,
  Update,
  ...inputProps
}: InputV2Props) => {
  return (
    <InputContainer style={style} full={full}>
      <InputLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </InputLabel>
      <SearchBox Update={Update} error={error}>
        <InputElement {...inputProps} spellCheck={false} />
        <div>
          <SearchIcon />
        </div>
      </SearchBox>
      {error && <RequiredError>{error}</RequiredError>}
    </InputContainer>
  )
}

export default InputSearchV2

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
  ${({ full }) => !full && 'max-width: 300px;'}
  flex-direction: column;
  /* gap: 6px; */

  // @media (max-width: 500px) {
  //   width: 100% !important;
  // }
`
const SearchBox = styled.div<{ error?: string; Update?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: 'DM Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  outline: none;
  padding: 12px 10px;
  border-radius: 1rem;
  border: 1px solid ${SecondaryGray};
  background: ${White};
  color: ${Blue};
  cursor: text;
`
const InputElement = styled.input`
  all: unset;
  font-family: 'DM Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  outline: none;
  width: 100%;
  //padding: 12px 12px;
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
