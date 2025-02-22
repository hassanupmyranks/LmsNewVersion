import styled from 'styled-components'
import { PrimaryBlue } from '../../../../const/V2/stylingVariables'

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
  height: 600px;
  width: 60px;
  background-color: ${PrimaryBlue};
  border-bottom-left-radius: 10px;
`
export const DetailBox = styled.div`
  height: 680px;
  width: 450px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 0px 10px 10px 0px;
`
export const DetailText = styled.h6`
  color: ${PrimaryBlue};
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;

  @media (max-width: 992px) {
    font-size: 16px;
  }
`
