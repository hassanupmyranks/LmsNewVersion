import styled from 'styled-components'
import { PrimaryBlue, White } from '../../../const/V2/stylingVariables'

export const UploadFileContainer = styled.div`
  margin: 10px;
  padding: 20px;
  height: 160px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid rgba(163, 174, 208, 0.51);
  background: ${White};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const QuestionFileHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.48px;
`
export const HorizontalElements = styled.div`
  display: flex;
  flex-direction: row;
`
export const UploadFilePara = styled.p`
  color: #71a7cb;
  font-family: DM Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.32px;
  padding: 3px;
  padding-left: 10px;
`

export const FileContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 11px 50px 21px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px dashed #000;
  background: ${White};
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  cursor: pointer;

  @media (max-width: 767px) {
    margin-left: 0px;
  }
`
export const FileCircle = styled.div`
  border-radius: 50%;
  background-color: #ddf1ff;
  width: 50px;
  height: 50px;
  padding: 12px;
  margin-top: 5px;
`
export const UploadFileMessageContainer = styled.p`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  width: 180px;

  @media (max-width: 767px) {
    width: 80px;
  }
`

export const MainMessage = styled.p`
  color: #197bbd;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`
export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ProgressBar = styled.input`
  height: 15px;
  width: ${({ width }) => width}%;
  border-radius: 0px 60px 60px 0px;
  border-width: 0px;
  background: linear-gradient(
    270deg,
    #62cdfb 5.56%,
    rgba(76, 201, 255, 0.66) 100%
  );

  position: relative;
  top: -5px;
`
export const SecondHalfProgressBar = styled.div`
  border-radius: 0px 60px 60px 0px;
  background: #e6eaeb;
  width: 100%;
  height: 15px;
  margin-top: 5px;
`
export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const SuccessProgressBar = styled.div`
  border-radius: 0px 60px 60px 0px;
  width: 100%;
  height: 15px;
  background: #47e285;
  margin-top: 5px;
`
export const SuccessProgressBarPara = styled.p`
  color: #71a7cb;
  font-family: DM Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.34px;
  padding-top: 10px;
`
export const Percentage = styled.div`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.34px;
  padding-left: 10px;
`

export const SuccessfulUploadMessage = styled.div`
  color: ${PrimaryBlue};
  text-align: center;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`
export const MessageContainer = styled.div`
  margin-top: 5px;
`

export const WrongMessage = styled.div`
  color: #d93d3d;
  font-family: DM Sans;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.34px;
  width: 50%;
`
export const DeleteButton = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-color: #ffedec;
  width: 100px;
  height: 27px;
  margin-left: 10px;
  color: #e71d36;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  border-width: 0px;
`
export const DeleteIconContainer = styled.div`
  width: 30%;
  height: 10px;
  padding: 5px;
`

export const DeleteText = styled.div`
  width: 70%;
  height: 10px;
  color: #e71d36;
  text-align: center;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  top: -5px;
  left: 15px;
`
export const CloseButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 80px;
  height: 30px;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #197bbd;
  color: #197bbd;
  text-align: center;
  font-family: DM Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.28px;
`
export const ShareableContainer = styled.div`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.28px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 10px;
`
export const DragBox = styled.div`
  width: 36px;
  height: 18px;
  padding: 2px;
  padding-left: 10px;
`
