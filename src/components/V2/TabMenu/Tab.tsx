import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { FunctionComponent, SVGProps } from 'react'

export interface TabProps {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  label: string
  value: number
  link: string
}

const Tab = ({ Icon, label, value, link }: TabProps) => {
  const { pathname } = useLocation()
  return (
    <TabContainer to={link} isActive={pathname === link}>
      <IconContainer>
        <Icon fill={PrimaryBlue} />
      </IconContainer>
      <div>
        <Label className="m-0">{label}</Label>
        <Value className="m-0">{value}</Value>
      </div>
    </TabContainer>
  )
}

export default Tab

const TabContainer = styled(Link)<{ isActive: boolean }>`
  all: unset;
  cursor: pointer;

  padding: 12px;
  background: ${White};
  border-radius: 20px;
  width: 190px;
  min-width: 190px;
  max-width: 190px;

  display: flex;
  align-items: center;
  gap: 10px;

  outline: ${({ isActive }) =>
    isActive ? `2px solid ${PrimaryBlue}` : 'none'};

  // @media (max-width: 710px) {
  //   max-width: 180px;
  // }

  // @media (max-width: 560px) {
  //   max-width: 100%;
  // }

  // @media (max-width: 500px) {
  //   max-width: 100%;
  //   padding: 8px;
  //   gap: 5px;
  // }
`

const IconContainer = styled.div`
  background: #f4f7fe;
  border-radius: 40px;
  width: 100%;
  max-width: 52px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;

  @media (max-width: 500px) {
    max-width: 40px;
  }
`

const Label = styled.p`
  color: ${SecondaryGray600};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`

const Value = styled.p`
  color: ${Blue};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.48px;

  @media (max-width: 500px) {
    font-size: 18px;
  }
`
