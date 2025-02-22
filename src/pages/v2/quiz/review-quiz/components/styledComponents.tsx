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
  overflow: hidden;
  max-width: 100%;
  padding: 10px;
  margin-top: 30px;

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

  overflow: ${({ scroll }) => (scroll ? 'auto' : 'hidden')};

  & p {
    margin: 0;
  }

  & * {
    font-family: 'DM Sans', sans-serif;
  }
`

export const ReviweCommonHeading = styled.div`
  /* border: 1px solid ${SecondaryGray600}; */
  border-radius: 20px;
  overflow: hidden;
  max-width: 100%;
  padding: 10px;
  /* margin-top: 30px; */
  display: flex;
  align-items: center;
`

export const ReviweCommonSection = styled.div`
  /* border: 1px solid ${SecondaryGray600}; */
  border-radius: 20px;
  overflow: hidden;
  max-width: 100%;
  padding: 10px;
  /* margin-top: 30px; */

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
`

export const ReviweContainerHeadingLeft = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  /* padding: 10px 20px; */
  width: 50%;
`
export const ReviweContainerHeadingRight = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  align-items: center;
  /* padding: 10px 20px; */
  width: 50%;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const QuestionsContainer = styled.div`
  max-height: 370px;
  overflow-y: auto;
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
  height: 100vh;
  width: auto;
  border-radius: 1rem;
  /* padding: 25px;
  margin: 20px; */
  display: flex;
`

export const StudentsCardWrapper = styled.div`
  height: 100%;
  width: 45%;
  padding: 5px;
`
export const StudentCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  flex-direction: row;
  margin-bottom: 5px;
  margin-left: 5px;
  width: 100%;
  padding: 10px;
  background-color: ${White};
  border: 1px solid #a3aed063;
  box-shadow: 0px 4px 14px 0px #a3aed066;
  border-radius: 10px;

  &:hover {
    transform: scale(1.03);
  }

  /* p {
    color: ${Blue};
    font-size: 18px;
    font-weight: 700;
    padding-left: 0px;
    gap: 10px;
    align-items: center;
    margin-bottom: 5px;
    white-space: warp;
  } */
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

export const ReviewQuizWrapper = styled.div`
  /* max-height: 100%; */
  margin-left: 10px;
  max-height: 450px;
  overflow-y: auto;
  width: 100%;
`

export const QuizReview = styled.div`
  /* max-height: 100%; */
  margin-left: 10px;
  padding: 20px;
  /* width: 60%; */
  background-color: #ffffff;
  border: 1px solid #a3aed096;
  border-radius: 20px;
`

export const ReviewQuizHeading = styled.div`
  font-family: DM Sans;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #2b3674;
`

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  justify-content: space-between;
`

export const DetailsWrapper = styled.div`
  font-family: DM Sans;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;
  text-align: left;
  color: #2b3674;
  width: 90px;
`
export const StatusAndDateWrapper = styled.div`
  text-align: right;
`
export const ScoredWrapper = styled.div`
  text-align: right;
`
export const Scored = styled.div`
  font-family: Rubik;
  font-size: 22px;
  font-weight: 600;
  line-height: 47px;
  letter-spacing: 0em;
  text-align: left;
  color: #2b3674;
`

export const AttemptQuestions = styled.div`
  font-family: Rubik;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`

export const QuestionsTotal = styled.div`
  font-family: Rubik;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
`

export const CorrectIncorrect = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  font-family: Rubik;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
`

export const AnsweresText = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 15px;
  font-family: Rubik;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  color: #197bbd;
`

export const IncorrectSpan = styled.div`
  margin-left: 10px;
  font-family: Rubik;
  font-size: 12px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #2b3674;
`

export const CorrectSpan = styled.div`
  margin-left: 10px;
  font-family: Rubik;
  font-size: 12px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #2b3674;
`

export const ReviewQuizAttemptedSpan = styled.span`
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

export const ReviewQuizUnAttemptedSpan = styled.span`
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

export const StatusAndDate = styled.div`
  margin-top: 10px;
  font-family: DM Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: right;
`

export const StudentName = styled.div`
  margin-bottom: 10px;
  font-family: DM Sans;
  font-size: 20px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #2b3674;
`

export const StudentNumber = styled.div`
  font-family: DM Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: #030229;
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
    text-warp: wrap;
  }

  table p font {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    display: flex;
  }

  // p {
  //   color: ${Blue};
  //   font-size: 18px;
  //   font-weight: 700;
  //   padding-left: 0px;
  //   gap: 10px;
  //   align-items: center;
  //   margin-bottom: 5px;
  //   white-space: warp;
  //   text-warp: wrap;
  // }
`
export const QuestionOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
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
  align-items: center;
  gap: 15px;
`

export const HeadReviweLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 22%;

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

  p {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
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
