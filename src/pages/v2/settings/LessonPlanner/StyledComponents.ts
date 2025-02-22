import styled from 'styled-components'
import { Blue, White } from '../../../../const/V2/stylingVariables'

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

export const FullPage = styled.div`
  width: 100%;
  height: 100%;
  background: ${White};
  border-radius: 20px;
  padding: 20px;
`

export const UnitsChapterContainer = styled.div`
  /* height: 100%; */
  padding: 10px;
  border: 1px solid;
  border-radius: 15px;
  border: 1px solid #e0e5f2;
  max-height: 62vh;
  min-height: 62vh;
  overflow-y: auto;
  min-width: 280px;
  width: 280px;
`
export const Fields = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const UnitChapterHeading = styled.h3`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.68px;
  text-align: center;

  @media (max-width: 992px) {
    font-size: 15px;
  }
`

export const SubmitSecondContainer = styled.div`
  height: 100%;
  padding: 10px;
  border-radius: 15px;
  max-height: 60vh;
  min-height: 60vh;
  border: 1px solid #e0e5f2;
  overflow-y: auto;
  min-width: 360px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const TopicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Topic = styled.div`
  padding: 5px 12px;
  border: 1px solid black;
  border-radius: 10px;
  color: #000;
  background-color: rgb(245, 246, 249);
`
export const SubTopic = styled.div`
  padding: 5px 12px;
  border: 1px solid black;
  border-radius: 10px;
  color: #000;
  background-color: rgb(231, 255, 221);
`

export const BlueBox = styled.div`
  padding: 5px 12px;
  border: 1px solid black;
  font-weight: 600;
  border-radius: 10px;
  color: #000;
  background-color: rgb(237, 230, 252);
`
