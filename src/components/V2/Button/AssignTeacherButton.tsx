import React from 'react'
import styled from 'styled-components'
import { White } from '../../../const/V2/stylingVariables'
import LoadingSpinner from '../Form/Spinner'
import { getThemeDetails } from '../../../helpers/V2/getThemeDetails'

const AssignTeacherButton = ({
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

export default AssignTeacherButton

export const Button = styled.button`
  all: unset;
  background-color: ${getThemeDetails().primaryColor};
  max-width: 144px;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${White};
    background-color: #2d9de9;
  }

  @media (max-width: 768px) {
    padding: 12px 12px;
  }
`
