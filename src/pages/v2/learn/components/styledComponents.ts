import styled from 'styled-components'
import {
  SecondaryDarkGrey900,
  Blue
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

export const MediaCard = styled.div<{
  Bgcolor?: string
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 10px 16px;
  gap: 16px;
  border-radius: 20px;
  background: ${(props) => props.Bgcolor};
  cursor: pointer;
`

export const MediaTitle = styled.p`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.36px;
`
export const FileName = styled.p<{
  color: string
}>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 18px;
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
`

export const ImageSvg = styled.img`
  height: 100px;
`

export const PptxSvg = styled(PptxIcon)`
  fill: #ffcab9;
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
  width: 65px;
  height: 65px;
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

export const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
export const TextMaterialFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

export const HideButtonArea = styled.div`
  position: absolute;
  bottom: 3px; /* Approximate position of the button */
  right: 5px;
  width: 80px;
  height: 19px;
  background: #444444;
  user-select: none;
`
