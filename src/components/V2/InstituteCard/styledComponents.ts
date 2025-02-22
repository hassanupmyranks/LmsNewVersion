import styled from 'styled-components'
import {
  PrimaryBlue,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import { ReactComponent as DotsIconSvg } from '../../../assets/svg/three-vertical-dots.svg'

export const CardContainer = styled.div`
  background: ${White};
  border-radius: 20px;
  width: 300px;
  height: 305px;
  padding: 10px;
  cursor: pointer;
  // margin: 10px;

  @media (max-width: 500px) {
    width: 100%;
  }
`

export const InstituteImage = styled.img`
  border-radius: 20px;
  position: relative;
  // top: 14px;
  // left: 14px;
  width: 100%;
  height: 160px;
`

export const LogoContainer = styled.div`
  background: white;
  border-radius: 50%;
  text-align: center;
  position: relative;
  top: -12px;
  width: 45px;
  height: 45px;
  margin-left: 25px;
`
export const LogoImage = styled.img`
  text-align: center;
  border-style: solid;
  border-width: 3px;
  border-color: ${PrimaryBlue};
  border-radius: 50%;
  width: 38px;
  height: 38px;
  margin: 3px;
  background-color: white;
`
export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: -6px;
`
export const Heading = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: #2b3674;
  font-family: 'DM Sans';
  font-style: normal;
  letter-spacing: -0.48px;
  margin-bottom: 3px;
`

export const Para = styled.p`
  color: ${SecondaryGray600};
  font-size: 12px;
`

export const IconContainer = styled.div`
  width: 20px;
  height: 30px;
`
export const LogoCountsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DotsIcon = styled(DotsIconSvg)`
  cursor: pointer;
  height: 16px;
  width: 16px;
  border-radius: 8px;
`
