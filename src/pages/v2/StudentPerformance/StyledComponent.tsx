import styled from 'styled-components'
import { Blue } from '../../../const/V2/stylingVariables'
export const Menucontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: auto;
`

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #ffff;
  border-radius: 20px;
  gap: 10px;
  padding: 10px;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`
export const Flex = styled.div`
  display: flex;
  width: 100%;

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
    text-align: center;
  }
`
export const GraphContainer = styled.div`
  display: flex;
  width: 70%;
  min-height: 180px;
  background-color: #ffff;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`
export const ClassContainer = styled.div`
  display: flex;
  background-color: #ffff;
  padding: 10px;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`
export const GradeLable = styled.p`
  color: ${Blue};
  font-size: 20px;
  font-weight: 700;
  display: flex;
  letter-spacing: -0.28px;
`
export const PercentageLable = styled.p`
  color: ${Blue};
  font-size: 17px;
  font-weight: 700;
  display: flex;
  letter-spacing: -0.28px;
`
export const Lable = styled.p`
  color: ${Blue};
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.28px;
`
