import styled from 'styled-components'
import { White } from '../../../../const/V2/stylingVariables'

export const Statistics = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  background: #fdfcfc;
  width: auto;
  padding: 18px 26px;
  color: #0c092a;
  margin: 16px;
  height: auto;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);

  @media (max-width: 1550px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Statistics1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;

  @media (max-width: 1550px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const Statistics2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 30%;

  @media (max-width: 1550px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`

export const Statistics3 = styled.div`
  @media (max-width: 1550px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`

export const AICard = styled.div`
  margin: 20px 20px 20px 30px;
`

export const ST1 = styled.div`
  @media (max-width: 1550px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  @media (max-width: 700px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`

export const ST2 = styled.div`
  @media (max-width: 1550px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

export const Heading = styled.div`
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
`

export const SubHeading = styled.div`
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  @media (max-width: 1550px) {
    margin-top: 10px;
  }
`

export const SubmittedDate = styled.p`
  color: #286896;
  margin-top: 10px;
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`
export const ClockCom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 92px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 10px;
`
export const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`
export const Min = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 19px;
  line-height: 24px;
`
export const TestPercent = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 30px;
  line-height: 40px;
`
export const Correct = styled.div`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #2b3674;
`

export const SecAvg = styled.div`
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #5b72f8;
`
export const SmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 330px;
  background-color: white;
  border-radius: 20px;
  padding: 30px 0px;
  margin: 20px;
`

export const Container = styled.div`
  display: grid;

  @media (min-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
  }

  @media (min-width: 1061px) and (max-width: 1499px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }

  @media (max-width: 1060px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
  }
`

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const WrapHeading = styled.div`
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 13px;
  line-height: 24px;
  color: #2b3674;
`
export const View = styled.div`
  cursor: pointer;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 13px;
  line-height: 24px;
  color: #4254f7;
`
export const Rank = styled.div`
  height: 100px;
  width: 90%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0px;
`

export const ProfileImage = styled.img<{ color?: string }>`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 3px solid ${(props) => props.color};
  background-size: cover;
  margin-right: 10px;
`

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: auto;
  scrollbar-width: none;
`
export const UserTab = styled.div`
  border-radius: 30px;
  background: ${White};
  padding: 10px;
  box-shadow: 14px 17px 40px 4px rgba(112, 144, 176, 0.08);

  display: flex;
  gap: 24px;
  align-items: center;
`
export const MainHeading = styled.a`
  font-size: 34px;
  font-weight: 700;
  line-height: 42px;
  font-family: 'DM Sans';
  color: #2b3674;
`
export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`
export const StatList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  background-color: white;
  border-radius: 20px;
  padding: 30px 0px;
  margin-right: 30px;
`
export const StatHead = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
`
export const StatPercen = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 30px;
  line-height: 40px;
`
export const Minutes = styled.div<{ color?: string }>`
  color: ${(props) => props.color};
  font-family: 'Rubik';
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
`
