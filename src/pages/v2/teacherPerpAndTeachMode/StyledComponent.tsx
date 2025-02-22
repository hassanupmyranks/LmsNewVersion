import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  RequiredRed,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'

export const FullPage = styled.div`
  width: 100%;
  height: 100%;
  background: ${White};
  border-radius: 20px;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const ContainerBodyNew = styled.div`
  max-height: 245px;
  min-height: 185px;
  height: 245px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`

export const HeadingH3 = styled.h3`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 18px;
`

export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`

export const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1450px) {
    display: block;
  }
`

export const PageTitle = styled.h6`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.68px;
  margin-bottom: 0px;
  margin-right: 6px;

  @media (max-width: 992px) {
    font-size: 20px;
  }
`
export const BoxOne = styled.div`
  height: 20px;
  width: 80px;
  background-color: ${PrimaryBlue};
  border-radius: 10px 0px 0px 10px;
`
export const BoxTwo = styled.div`
  height: 20px;
  width: 60px;
  background-color: ${PrimaryBlue};
  background-image: radial-gradient(
    circle at 0%,
    #f4f4fc 10px,
    ${PrimaryBlue} 10px
  );
`
export const BoxThree = styled.div`
  height: 20px;
  width: 70px;
  background-color: ${PrimaryBlue};
  border-radius: 10px 0px 0px 10px;
`
export const FinalBox = styled.div`
  height: 300px;
  width: 60px;
  background-color: ${PrimaryBlue};
  border-bottom-left-radius: 10px;
`
export const DetailBox = styled.div`
  height: 380px;
  width: 100%;
  background-color: white;
  padding: 20px 20px;
  border-radius: 0px 10px 10px 0px;
`
export const DetailText = styled.h6`
  color: ${PrimaryBlue};
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 992px) {
    font-size: 16px;
  }
`
export const Card = styled.div`
  height: 310px;
  width: 275px;
  background: white;
  border: 2px solid #cedae1;
  border-radius: 20px;
  padding: 20px 10px;
`
export const CardIcon = styled.div`
  height: 22px;
  width: 22px;
  border: 2px solid #197bbd;
  border-radius: 50%;
`
export const HeadingName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  font-family: DM Sans;
  color: ${SecondaryGray600};
  line-height: 1.2; /* Ensures consistent vertical spacing */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens */
  }
`
export const CompletedButton = styled.div`
  all: unset;
  background-color: #01b574;
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`

export const ExpiredButton = styled.div`
  all: unset;
  background-color: ${RequiredRed};
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
export const InProgresButton = styled.div`
  all: unset;
  background-color: #6d6d2e;
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
