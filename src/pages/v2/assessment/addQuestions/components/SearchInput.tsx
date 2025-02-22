import styled from 'styled-components'
import { SecondaryGray300 } from '../../../../../const/V2/stylingVariables'
import { ReactComponent as SearchIcon } from '../../../../../assets/svg/search-icon.svg'
import { InputHTMLAttributes } from 'react'

const SearchInput = ({
  ...inputPros
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'className'>) => {
  return (
    <SearchContainer>
      <div>
        <SearchIcon />
      </div>
      <Input {...inputPros} />
    </SearchContainer>
  )
}

export default SearchInput

const SearchContainer = styled.label`
  cursor: text;
  background-color: ${SecondaryGray300};
  border-radius: 20px;
  padding: 8px 20px;

  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`
const Input = styled.input`
  all: unset;
  font-size: 14px;
  letter-spacing: -0.28px;
  width: 100%;

  &::placeholder {
    color: #8f9bba;
  }
`
