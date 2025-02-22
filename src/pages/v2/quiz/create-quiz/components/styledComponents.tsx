import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  SecondaryGray300,
  SecondaryGray600,
  White
} from '../../../../../const/V2/stylingVariables'

export const QuestionContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
`

export const ChaptersContainer = styled.div`
  border: 1px solid ${SecondaryGray600};
  border-radius: 20px;
  padding: 3px 14px;
  flex-basis: 26%;

  h5 {
    color: #2b3674;
    font-size: 20px;
    font-weight: 700;
  }
`
export const ContainerHeading = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;

  h3 {
    color: ${Blue};
    font-size: 22px;
    font-weight: 700;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  p {
    color: ${SecondaryGray600};
    font-size: 16px;
    font-weight: 400;
  }
`
export const ContainerBody = styled.div`
  max-height: 625px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  // margin-top: 25px;
  padding-right: 5px;

  // &::-webkit-scrollbar {
  //   width: 0px;
  // }
  // &::-webkit-scrollbar-track {
  //   background: transparent;
  // }
  // &::-webkit-scrollbar-thumb {
  //   background: transparent;
  // }
`

export const QuestionActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  max-width: 72%;
  overflow: hidden;
`
export const CommonSection = styled.div`
  border: 1px solid ${SecondaryGray600};
  border-radius: 20px;
  max-width: 100%;
  padding: 10px;
  margin-top: 10px;

  height: 85%;
  overflow-x: auto;

  h5 {
    color: #2b3674;
    font-size: 20px;
    font-weight: 700;
    padding-left: 20px;
  }
`

export const ReviewQuizPageContainer = styled.div<{ scroll?: boolean }>`
  background-color: ${SecondaryGray300};
  flex: 1 0 0;
  padding: 0.5rem 1.25rem 1.5rem;
  gap: 0.75rem;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;

  & p {
    margin: 0;
  }

  & * {
    font-family: 'DM Sans', sans-serif;
  }
`

export const ReviweCommonHeading = styled.div`
  border-radius: 20px;
  overflow: hidden;
  max-width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: row;
  }
`

export const ReviweCommonSection = styled.div`
  /* border: 1px solid ${SecondaryGray600}; */
  border-radius: 20px;
  overflow: hidden;
  max-width: 100%;
  padding: 10px;

  h5 {
    color: #2b3674;
    font-size: 20px;
    font-weight: 700;
    padding-left: 20px;
  }
`

export const DifficultyLevel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding: 0px 20px 12px 12px;
  width: 100%;

  :before {
    content: ' ';
    width: 95%;
    border: 3px solid #f4f7fe;
    position: absolute;
    margin-top: 4px;
    z-index: 0;
  }
`

export const DifficultyLevelItem = styled.div<{ isActivated: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 1;
  span {
    background: ${(props) =>
      props?.isActivated
        ? 'linear-gradient(180deg, #1377B9 0%, #57B1ED 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF)'
        : 'linear-gradient(180deg, #A3AED0 0%, #E0E5F2 100%),linear-gradient(0deg, #FFFFFF, #FFFFFF)'};
    height: 15px;
    width: 15px;
    border-radius: 50%;
    cursor: pointer;
  }
`

export const DifficultyLevelItemName = styled.p`
  color: ${Blue};
  font-family: DM Sans;
  letter-spacing: -0.68px;
  font-size: 15px;
  font-weight: 600;
`

export const AddQuestionsContainerHeading = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;

  h3 {
    color: ${Blue};
    font-size: 22px;
    font-weight: 700;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 0px;
  }

  p {
    color: ${SecondaryGray600};
    font-size: 18px;
    font-weight: 700;
  }

  @media (max-width: 1300px) {
    display: block;
  }
`
export const Line = styled.div`
  height: 40px;
  width: 1px;
  background-color: ${SecondaryGray600};
  margin-right: 15px;

  @media (max-width: 500px) {
    display: none;
  }
`

export const ReviweContainerHeadingLeft = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  width: 50%;

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 700px) {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
`
export const ReviweContainerHeadingRight = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  align-items: center;
  width: 50%;

  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 20px;
  }

  @media (max-width: 700px) {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const QuestionsContainer = styled.div`
  height: 80%;
  overflow-x: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 5px;
`

export const StudentsReviewQuizWrapper = styled.div`
  background-color: ${White};
  // height: 100vh;
  width: auto;
  border-radius: 1rem;
  display: flex;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`

export const StudentsCardWrapper = styled.div`
  padding: 5px;
  max-height: 550px;
  overflow-y: auto;
  width: 50%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

export const Flexx = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  width: 60%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

export const StudentCard = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  flex-direction: row;
  margin-bottom: 5px;
  // margin-left: 5px;
  width: 100%;
  padding: 10px;
  background-color: ${White};
  border: 1px solid #a3aed063;
  box-shadow: 0px 4px 14px 0px #a3aed066;
  border-radius: 10px;
  overflow: auto;

  @media (max-width: 1600px) {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    transform: scale(1.01);
  }
`
export const StudentCardP = styled.p`
  font-family: DM Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  padding: 10px 0px 10px 0px;
  gap: 10px;
  align-items: center;
`

export const StudentCardReviewedSpan = styled.span`
  white-space: nowrap;
  padding-left: 0px;
  gap: 10px;
  background-color: rgba(91, 147, 255, 0.2);
  color: #2784c4;
  padding: 10px;
  width: 100px;
  border-radius: 33px;
  align-items: center;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`
export const StudentCardPendingSpan = styled.span`
  white-space: nowrap;
  padding-left: 0px;
  gap: 10px;
  background-color: rgba(253, 248, 248, 0.2);
  color: #ff8f6b;
  padding: 10px;
  width: 100px;
  border-radius: 33px;
  align-items: center;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`

export const StudentCardAttemptedSpan = styled.span`
  white-space: nowrap;
  padding-left: 0px;
  gap: 10px;
  background-color: rgba(1, 181, 116, 0.2);
  color: #01b574;
  padding: 10px;
  border-radius: 33px;
  width: 117px;
  align-items: center;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`

export const StudentCardUnAttemptedSpan = styled.span`
  white-space: nowrap;
  padding-left: 0px;
  gap: 10px;
  background-color: rgb(244 135 161 / 20%);
  color: #ef1010;
  padding: 10px;
  width: 117px;
  border-radius: 33px;
  align-items: center;
  font-family: Nunito;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
`

export const RandomGenerateSection = styled.div`
  border: 1px solid ${SecondaryGray600};
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  padding-bottom: 20px;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
export const QuestionsOptionsItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 0px;
  background: rgba(222, 242, 255, 0.22);
  position: relative;
`

export const QuestionsItems = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

export const QuestionOptionsItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  h5 {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    padding-left: 10px;
    gap: 10px;
    align-items: center;
    margin-bottom: 5px;
    white-space: warp;
  }

  table p font {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    display: flex;
  }
`

export const OptionLabel = styled.div`
  p {
    font-family: DM Sans;
    font-weight: 500;
    padding-left: 10px;
    padding-bottom: 5px;
    font-size: 15px;
    color: #2b3674;
  }
`

export const QuestionsOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
  padding-left: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`

export const ChildOptions = styled.div<{ isActive: boolean }>`
  width: 200px;
  height: 57px;
  border-radius: 16px;
  border: 1px solid;

  border-color: ${(props) =>
    props?.isActive ? 'rgba(79, 159, 128, 1)' : '#A3AED0'};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  padding: 0px 10px;
  cursor: pointer;
  background: ${(props) =>
    props?.isActive ? 'rgba(230, 248, 241, 1)' : '#fff'};
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &:hover {
    border-color: rgba(79, 159, 128, 1);
    background: rgba(230, 248, 241, 1);
  }

  h3 {
    color: ${Blue};
    font-size: 15px !important;
    font-weight: 700 !important;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 0px;
  }
`

export const QuestionsExplanation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
`

export const ExplanationHeading = styled.div`
  padding-left: 10px;
  font-family: DM Sans;
  font-weight: 500;
  font-size: 15px;
  color: #2b3674;
`

export const ExplanationDescription = styled.div`
  padding-left: 10px;

  p {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 15px;
    color: #2b3674;
  }

  .mb {
    margin-bottom: 10px;
  }
`
export const UpToDownButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px;

  span {
    color: #2b3674;
    font-size: 14px;
    font-weight: 700;
  }
`
export const HeadAddQuestions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`

export const CalenderSelectLabel = styled.label`
  display: block;
  margin-right: 10px;
  color: ${Blue};
  user-select: none;
  font-family: 'DM Sans';
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.28px;

  @media (max-width: 800px) {
    margin-top: 10px;
  }
`

export const HeadTitle = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    gap: 0px;
  }
`

export const HeadReviweLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 22%;

  @media (max-width: 700px) {
    width: 100%;
  }

  h3 {
    color: ${Blue};
    font-size: 22px;
    font-weight: 700;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 0px;
  }

  p {
    color: ${Blue};
    font-size: 18px;
    font-weight: 600;
  }
`

export const HeadReviweRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 30%;

  @media (max-width: 700px) {
    width: 100%;
  }

  p {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    text-transform: capitalize;
  }
`

export const UploadFileContainer = styled.div`
  width: 100%;
  padding: 20px;
  // height: 160px;
  height: 400px;
  border-radius: 20px;
  border: 1px solid rgba(163, 174, 208, 0.51);
  background: ${White};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px 10px;
`

export const QuestionFileHeading = styled.h1`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`
export const HorizontalElements = styled.div`
  display: flex;
  flex-direction: row;
`
export const UploadFilePara = styled.p`
  color: #71a7cb;
  font-family: DM Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  padding: 3px;
  padding-left: 10px;
`

export const FileContainer = styled.div`
  display: flex;

  height: 98%;
  padding: 11px 50px 21px 51px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px dashed #000;
  background: ${White};
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  cursor: pointer;
`
export const FileCircle = styled.div`
  border-radius: 50%;
  background-color: #ddf1ff;
  width: 50px;
  height: 50px;
  padding: 12px;
`
export const UploadFileMessageContainer = styled.p`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -0.3px;
  display: flex;
  flex-direction: row;
  text-align: center;
`

export const MainMessage = styled.p`
  color: #197bbd;
  font-family: DM Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.3px;
  padding: 2px;
`
export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const ProgressBar = styled.input`
  height: 10px;
  width: ${({ width }) => width}%;
  border-radius: 0px 60px 60px 0px;
  border-width: 0px;
  background: linear-gradient(
    270deg,
    #62cdfb 5.56%,
    rgba(76, 201, 255, 0.66) 100%
  );

  position: relative;
  top: -7px;
`
export const SecondHalfProgressBar = styled.div`
  border-radius: 0px 60px 60px 0px;
  background: #e6eaeb;
  width: 100%;
  height: 10px;
  margin-top: 5px;
`
export const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const SuccessProgressBar = styled.div`
  border-radius: 0px 60px 60px 0px;
  width: 100%;
  height: 10px;
  background: #47e285;
  margin-top: 5px;
`
export const SuccessProgressBarPara = styled.p`
  color: #71a7cb;
  font-family: DM Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  padding-top: 10px;
`
export const Percentage = styled.div`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  padding-left: 6px;
`

export const SuccessfulUploadMessage = styled.div`
  color: ${PrimaryBlue};
  text-align: center;
  font-family: DM Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.3px;
`
export const MessageContainer = styled.div``
export const WrongMessage = styled.p`
  color: #d93d3d;
  font-family: DM Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  width: 100%;
`
export const DeleteButton = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-color: #ffedec;
  width: 60px;
  height: 27px;
  margin-left: 6px;
  color: #e71d36;
  font-family: DM Sans;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-width: 0px;
`
export const DeleteIconContainer = styled.div`
  width: 25%;
  height: 10px;
  padding: 5px;
`

export const DeleteText = styled.div`
  width: 70%;
  height: 10px;
  color: #e71d36;
  text-align: center;
  font-family: DM Sans;
  font-size: 11px;
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
  justify-content: center;
  align-items: center;
  margin: 4px;
  border-radius: 12px;
  border: 1px solid #197bbd;
  color: #197bbd;
  text-align: center;
  font-family: DM Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.28px;
`
export const ShareableContainer = styled.div`
  color: #2b3674;
  font-family: DM Sans;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  padding-top: 15px;
`
export const DragBox = styled.div`
  width: 20px;
  height: 10px;
  padding-left: 6px;
`

export const UploadQuestionPartOne = styled.div`
  width: 70%;
`
export const UploadQuestionPartTwo = styled.div`
  width: 30%;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const UploadQuestionSaveButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`
export const NoQuestions = styled.p`
  color: #2b3674;
  font-size: 22px;
  font-weight: 700;
`
