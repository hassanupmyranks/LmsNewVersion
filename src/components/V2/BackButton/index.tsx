import React from 'react'
import { ReactComponent as LeftIcon } from '../../../assets/svg/left-icon.svg'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const LightButton = styled(Button)`
  background: transparent;
  height: 45px;
  margin: auto 0;
  border: none;
  &:hover,
  &:focus {
    background: #f4f7fe;
  }
`

interface BackButtonProps {
  handleBack?: () => void
}

const BackButton = ({ handleBack }: BackButtonProps) => (
  <LightButton variant="light" onClick={handleBack}>
    <LeftIcon />
  </LightButton>
)

export default BackButton
