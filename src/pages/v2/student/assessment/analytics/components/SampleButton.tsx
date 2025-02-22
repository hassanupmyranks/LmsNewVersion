import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from '../../../../../../components/V2/Form/Spinner'
import { Gray, White } from '../../../../../../const/V2/stylingVariables'

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
  background-color: ${(props) => (props.disabled ? Gray : White)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border: 1px solid rgba(106, 90, 224, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(props) =>
    props.disabled ? 'rgba(255, 255, 255, 0.5)' : 'rgba(25, 121, 187, 1)'};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
