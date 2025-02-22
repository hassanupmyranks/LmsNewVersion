import styled from 'styled-components'
import {
  SecondaryDarkGrey900,
  Blue,
  White,
  PrimaryBlue
} from '../../../../const/V2/stylingVariables'
import { ReactComponent as PdfIcon } from '../../../../assets/svg/pdf-icon.svg'
import { ReactComponent as PptxIcon } from '../../../../assets/svg/pptx-icon.svg'
import ReactPlayer from 'react-player'
export const Title = styled.p`
  color: ${SecondaryDarkGrey900};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.36px;
`

export const WrapperCard = styled.div<{ fullHeight?: boolean }>`
  background-color: ${White};
  border-radius: 20px;

  padding: 20px;

  border-top: 0;
  display: flex;
  flex-wrap: wrap;

  ${({ fullHeight }) => fullHeight && 'height: 100%;'}
  max-height: 100vh;
  overflow: auto;
  @media (max-width: 767px) {
    padding: 10px !important;
    width: 100% !important;
    margin: 0 0 !important;
  }
`

export const MediaCard = styled.div<{
  Bgcolor?: string
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 3px;
  border-radius: 20px;
  background: ${(props) => props.Bgcolor};
  cursor: pointer;
`

export const MediaTitle = styled.p`
  color: ${Blue};
  font-size: 14px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.36px;
`
export const FileName = styled.p<{
  color: string
}>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.4px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const PdfSvg = styled(PdfIcon)`
  fill: #ffdcda;
  width: 30px;
  height: 30px;
`

export const ImageSvg = styled.img`
  height: 100px;
`

export const PptxSvg = styled(PptxIcon)`
  fill: #ffcab9;
  width: 30px;
  height: 30px;
`
export const VideoDiv = styled.div<{
  bgImage: string
}>`
  min-width: 100%;
  aspect-ratio: 16/9;
  border: 1px solid black;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.2);
  background-image: ${(props) => `url(${props.bgImage})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PlayIcon = styled.div`
  width: 55px;
  height: 55px;
  background-color: white;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CardWrapper = styled.div<{ active?: boolean }>`
  border-radius: 20px;
  cursor: pointer;
  background: #fff;
  max-width: 250px;
  padding: 16px;
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  &:hover {
    box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  }
  ${({ active }) => active && 'border-radius:20px; border:3px solid #1377B9'}
`
export const Logo = styled.img`
  max-width: 56px;
  aspect-ratio: 1;
`

export const SubjectName = styled.p`
  color: ${SecondaryDarkGrey900};
  font-family: 'DM Sans';
  font-weight: 700;
  letter-spacing: -0.32px;
`
export const Details = styled.p`
  color: ${SecondaryDarkGrey900};
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 500;
`
export const LabVideoDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  cursor: pointer;
  column-gap: 16px;
`
export const Video = styled(ReactPlayer)`
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/9;
  width: 100% !important;
  height: auto !important;
`

export const TextMaterialFrame = styled.iframe`
  width: 100%;
  height: 100%;
`
export const Flex = styled.div`
  width: 100%;
  overflow: auto;

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

export const FormContainerV2 = styled.div`
  margin: 30px;
  border-radius: 20px;
  background: ${White};
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 12px;
  }
`

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Prevents wrapping to keep items in a single row */
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  overflow-x: auto;
  align-items: center;
  gap: 30px;

  /* & > * {
    flex: 1; 
    min-width: 150px;
  } */

  @media (max-width: 768px) {
    flex-wrap: wrap; /* Allows wrapping for smaller screens */
    gap: 15px;
  }
`

export const SmallContainer = styled.div`
  /* min-width: 200px; */
  padding: 10px;
`

export const ContentRow = styled.div`
  display: flex;
  align-items: start; /* Vertically centers the content */
  gap: 10px; /* Adds spacing between heading and text */
`

export const Text = styled.p`
  font-size: 18px;
  font-family: DM Sans;
  color: #666;
  line-height: 1.2; /* Matches line height with heading for alignment */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens to match heading */
  }
`

export const Heading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  font-family: DM Sans;
  color: ${Blue};
  line-height: 1.2; /* Ensures consistent vertical spacing */

  @media (max-width: 768px) {
    font-size: 14px; /* Adjusts font size for smaller screens */
  }
`
