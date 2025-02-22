import styled from 'styled-components'
import AIlogo from '../../../assets/AI_cleanup.jpg'

export const AIHeading = styled.div`
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 26px;
  line-height: 30px;
  color: #ffffff;

  @media (max-width: 550px) {
    display: flex;
    justify-content: center;
  }
`
export const AILogo = styled.div`
  background-image: url(${AIlogo});
  background-size: cover;
  width: 500px;
  height: 307px;
  border-radius: 20px;
  padding: 18px 20px;
`

export const AIData = styled.p`
  color: #0084af;
  margin-top: 10px;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  width: 150px;
`
export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`
export const FlexBetween1 = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 550px) {
    margin: 0px 80px;
  }
`
export const AIPercentage = styled.div`
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 19px;
  color: #ffffff;
`
