import styled from 'styled-components'
import { Blue, PrimaryBlue } from '../../../const/V2/stylingVariables'

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
