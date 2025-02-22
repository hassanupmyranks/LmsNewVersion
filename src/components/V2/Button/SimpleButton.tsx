import React from 'react'
import styled from 'styled-components'
import { Gray, White } from '../../../const/V2/stylingVariables'
import LoadingSpinner from '../Form/Spinner'
import { getThemeDetails } from '../../../helpers/V2/getThemeDetails'

const SimpleButton = ({
  label,
  clickHandler,
  disabled
}: {
  label: string
  clickHandler: () => void
  disabled?: boolean
}) => {
  return (
    <Button onClick={clickHandler} disabled={disabled}>
      {disabled && <LoadingSpinner />} {label}
    </Button>
  )
}

export default SimpleButton

export const Button = styled.button`
  all: unset;
  background-color: ${(props) =>
    props.disabled ? Gray : getThemeDetails().primaryColor};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
    background-color: ${(props) => (props.disabled ? Gray : '#2d9de9')};
  }
`
