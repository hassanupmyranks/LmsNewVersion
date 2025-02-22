import styled from 'styled-components'

import { ReactComponent as WordDocLogoSVG } from '../../../assets/svg/microsoft-word.svg'

import {
  PrimaryBlue,
  CoolGray20,
  SecondaryGray600,
  SecondaryGray,
  Blue,
  CoolGray10,
  White
} from '../../../const/V2/stylingVariables'

export const MyContainer = styled.div`
  background-color: ${White};
  height: 90%;
  width: 35%;
  border-radius: 1rem;
  padding: 16px;
  margin: 10px 20px;
  display: flex;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 12px;
    width: 90%;
  }
`

export const MyContainer2 = styled.div`
  background-color: ${White};
  height: 80vh;
  width: auto;
  border-radius: 1rem;
  padding: 16px;
  margin: 10px 20px;
  display: flex;
  overflow: auto;

  @media (max-width: 800px) {
    display: block;
  }
`

export const HeadingWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 220px;
`
export const FullHeading = styled.div`
  display: flex;
  margin-bottom: 25px;
  height: 4%;

  @media (max-width: 768px) {
    height: auto;
  }

  @media (max-width: 525px) {
    flex-direction: column;
  }
`
export const Line = styled.div`
  height: 100%;
  width: 2px;
  background-color: ${CoolGray20};
  margin-right: 6px;
  border-radius: 1px;
`
export const Line2 = styled.div`
  height: 100%;
  width: 2px;
  background-color: ${CoolGray20};
  margin-right: 6px;
  margin-left: 6px;
  border-radius: 1px;

  @media (max-width: 800px) {
    display: none;
  }
`

export const Flex = styled.div`
  display: flex;
`
export const Form = styled.div`
  height: 90%;
  width: 98%;  
  overflow-y: auto
  padding-right: 15px;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${SecondaryGray600};
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0px;
  }
`
export const UploadAssignment = styled.div`
  height: auto;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid ${SecondaryGray};
  margin-top: 20px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const WordTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: ${Blue};
`
export const FileType = styled.div`
  font-size: 16px;
  font-family: 'DM Sans';
  font-weight: 400;
  color: ${SecondaryGray600};
`
export const AlignCenter = styled.div`
  display: flex;
  flex-direction: column;
`
export const DotBorder = styled.div`
  height: 110px;
  width: auto;
  border: 1px dashed black;
  border-radius: 1rem;
  margin-top: 18px;
  padding-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`
export const WordLogoCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: #ddf1ff;
  border-radius: 50%;
  margin-top: 10px;
`
export const LogoArrange = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const WordLogo = styled(WordDocLogoSVG)`
  height: 28px;
  width: 28px;
`
export const SmallWordLogo = styled(WordDocLogoSVG)`
  height: 22px;
  width: 22px;
`
export const Logo = styled.img`
  height: 22px;
  width: 22px;
`

export const Assignment = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${PrimaryBlue};
  margin-top: 10px;
`
export const FlexReverse = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
export const PageAllign = styled.div`
  max-height: 90%;
  width: 100%;

  @media (max-width: 768px) {
    max-height: fit-content;
    width: 100%;
  }
`
export const PageAllign2 = styled.div`
  height: 100%;
  width: 40%;

  @media (max-width: 800px) {
    height: auto;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`

export const TableHeader = styled.div`
  margin-left: 20px;
  height: 9%;
  font-size: 20px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: '#5E6483';

  @media (max-width: 430px) {
    margin-left: 0px;
    height: auto;
  }
`
export const TableHeader2 = styled.div`
  margin-left: 20px;
  margin-bottom: 5px;
  height: 9%;
  font-size: 20px;
  font-weight: 700;
  font-family: 'DM Sans';
  color: '#5E6483';

  @media (max-width: 800px) {
    margin-top: 20px;
  }
`

export const TableWrapper = styled.div`
  max-height: 90%;
  width: 58%;

  @media (max-width: 768px) {
    max-height: auto;
    width: 100%;
  }
`
export const TableScroll = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${SecondaryGray600};
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
  }
`
export const TableScroll2 = styled.div`
  height: 75%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${SecondaryGray600};
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
  }
`
export const MyText = styled.p`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: -0.4px;
`
