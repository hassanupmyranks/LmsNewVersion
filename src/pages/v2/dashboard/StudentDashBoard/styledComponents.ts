import styled from 'styled-components'

export const Peformance = styled.div`
  padding: 25px 20px 18px 20px;
  height: 170px;
  width: 30%;
  border-radius: 30px;
  background: linear-gradient(180deg, #4393f3 0%, #00ccff 100%);
  box-shadow: 0px 5px 10px 2px #b6dae3;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`

export const Font12 = styled.p`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 12px;
  line-height: 16.8px;
  color: #ffffff;
`
export const Font25 = styled.p`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 20px;
  line-height: 26.5px;
  color: #ffffff;
`
export const Font14 = styled.p`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 14px;
  line-height: 19.6px;
  color: #f6f6f6;
`
export const UpArrow = styled.div`
  font-family: 'Rubik';
  color: #43ffff;
  margin-right: 5px;
`
export const Flex = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Between = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
`

export const OnlyFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const FlexEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const BlockSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Select = styled.div`
  select {
    width: 120px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: #4393f3;
    font-size: 0.85rem;
    font-weight: 500;
    color: #fff;
    outline: none;
  }
`
export const FirstRow = styled.div`
  display: flex;
  gap: 20px;
  height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export const TextOne = styled.p`
  font-size: 16px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 20px;
  color: #6c6c6c;
`
export const TextTwo = styled.p`
  font-size: 18px;
  font-family: 'Inter';
  font-weight: 600;
  line-height: 20px;
  color: #0a0a0a;
`
export const Heading = styled.div`
  font-size: 30px;
  font-family: 'DM Sans';
  font-weight: 700;
  line-height: 42px;
  color: #2b3674;
  margin: 35px 0px 20px 0px;

  @media (max-width: 768px) {
    font-size: 26px !important;
  }
`
export const SummaryGraphs = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 70%;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const EachGraph = styled.div`
  height: 120px;
  width: 265px;
  display: flex;
  align-items: center;
  margin: 10px;
`

export const SummaryStatus = styled.div`
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const TabMenuContainer = styled.div`
  overflow: auto;
  height: 310px;
  scrollbar-width: none;
`
export const Heading2 = styled.div`
  font-size: 20px;
  font-family: 'Rubik';
  font-weight: 500;
  line-height: 28px;
  color: #0c092a;
  display: flex;
  align-self: flex-start;
  margin-left: 40px;
`
export const Button = styled.div`
  height: 56px;
  width: 165px;
  border-radius: 20px;
  border: 2px solid #3d7586;
  padding: 8px;
  padding-left: 12px;
  margin-left: 40px;
`
export const FontBtn14 = styled.p`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 14px;
  line-height: 19.6px;
  color: #3d7586;
`
export const FontBtn11 = styled.p`
  font-family: 'Rubik';
  font-weight: 700;
  font-size: 11px;
  line-height: 16.5px;
  color: #3d7586;
`
export const ButtonCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 3.5px solid #3d7586;
`
export const Font10 = styled.div`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
  color: #a7a7a7;
`
