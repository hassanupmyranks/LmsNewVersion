import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { White } from '../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../helpers/V2/getThemeDetails'

const LinkButton = ({
  to,
  children
}: {
  to: string
  children: React.ReactNode
}) => {
  return <Link to={to}>{children}</Link>
}

export default LinkButton

const Link = styled(RouterLink)`
  all: unset;
  background-color: ${getThemeDetails().primaryColor};
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 16px;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${White};
    background-color: #2d9de9;
  }
`
