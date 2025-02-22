import styled from 'styled-components'
import { Gray } from '../../../../../const/V2/stylingVariables'
import { ReactComponent as TimerIcon } from '../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../assets/svg/skip-icon.svg'
import { ReactComponent as CorrectIcon } from '../../../../../assets/svg/ans-correct-icon.svg'
import { ReactComponent as InCorrectIcon } from '../../../../../assets/svg/cross-incorrect-icon.svg'

CorrectIcon
export const MainContainer = styled.div`
  overflow: auto;
  padding: 0 36px 16px;
  background: #fff;
  height: 100%;
`

export const TestTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  font-family: DM Sans;
  color: #2b3674;
`

export const QuestionCountDiv = styled.div<{
  show?: boolean
}>`
  position: relative;
  // margin-top: 48px;
  padding: 36px 64px;
  width: 100%;
  border-radius: 25px 25px 0px 0px;
  background: linear-gradient(183.93deg, #4190f3 0.31%, #69d1f9 106.24%);
  ${({ show }) => show && 'z-index:999;'}
`
export const QuestionNumber = styled.button<{
  isSelect?: boolean
  isAnswered?: boolean
}>`
  cursor: pointer;
  width: 48px;
  min-width: 48px;
  height: 48px;
  background: ${({ isAnswered, isSelect }) =>
    isSelect
      ? 'linear-gradient(108.91deg, #FFB36C 0%, #FCBE84 112.5%)'
      : isAnswered
      ? '#8BE8FF'
      : '#3e84d4'};
  font-family: 'Rubik', sans-serif;
  font-size: 20px;
  border-radius: 999px;
  font-weight: 500;
  line-height: 28px;
  border: transparent;
  color: #fff;
  position: relative;
`

export const SubjectSectionName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 22px;
  color: #fff;
  font-weight: 800;
`

export const QuestionText = styled.p`
  font-size: 18px;
  color: #343434;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
`

export const ImageQuestionContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  // align-items: center;
  width: 50%;
`
export const ImageQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  // align-items: center;
`
export const ExpP = styled.p`
  font-size: 14px;
  color: #343434;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
`

export const KeyChallengesContainer = styled.div`
  border: 1px solid #c6c6c6;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
`
export const QuestionChallengesForm = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  width: 40%;

  h4 {
    font-size: 20px;
    color: #0c092a;
    font-weight: 500;
    font-family: 'Rubik', sans-serif;
    margin: 0;
  }
`

export const AddFormSections = styled.div`
  p {
    color: #2c3d7a;
    font-size: 18px;
    font-weight: 700;
  }

  span {
    color: #2c3d7a;
    font-size: 12px;
    font-weight: 700;
  }
`

export const UploadDocumentSec = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 40px;
  margin-bottom: 10px;
`

export const DocumentSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #ff7976;
    border-radius: 10px;
  }
`

export const SubPar = styled.div`
  h4 {
    color: #e078bf;
    font-size: 28px;
    font-weight: 700;
    font-family: 'Rubik', sans-serif;
  }

  p {
    color: #e078bf;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Rubik', sans-serif;
  }
`

export const DetailsCard = styled.div`
  box-shadow: 0px 4px 54px 0px rgba(0, 0, 0, 0.08);
  width: fit-content;
  padding: 10px;
  border-radius: 25px;
  width: 165px;
  height: 170px;

  .flexCard {
    #chart {
      margin-left: -15px;
    }
  }
`
export const DurationSec = styled.div`
  h4 {
    color: #5b72f8;
    font-size: 28px;
    font-weight: 700;
    font-family: 'Rubik', sans-serif;
  }

  p {
    color: #5b72f8;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Rubik', sans-serif;
  }
`
export const DurationText = styled.p`
  color: #5b72f8;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
  margin-top: 20px;
`
export const CardsWithAnalytics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const Cards = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`

export const TopSkillButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 34px;
  width: 100px;
  border-radius: 17px;
  background-image: linear-gradient(to right, #e7a4f5, #db5ab4);
  box-shadow: 0 0 8px #e7a4f5;
`
export const ButtonText = styled.div`
  font-family: 'Rubik';
  font-weight: 500;
  font-size: 14px;
  color: white;
`
export const ButtonCircle = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 2px solid #bda0b4;
  font-weight: 500;
  font-size: 10px;
  color: white;
  margin-left: 6px;
  background-image: linear-gradient(to right, #db5ab4, #e7a4f5);
`

export const Button = styled.button`
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 17px;
  border: 1.5px solid #6a5ae033;
  background: ${(props) =>
    props['aria-disabled']
      ? Gray
      : `linear-gradient(183.93deg, #4190f3 0.31%, #69d1f9 106.24%)`};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : 'pointer')};
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  span {
    color: #ffffff;
  }
`
export const SkipStatus = styled(SkipIcon)`
  width: 20px;
  position: absolute;
  top: -8px;
  left: -4px;
`

export const ReviewStatus = styled(TimerIcon)`
  width: 20px;
  position: absolute;
  top: -8px;
  left: -4px;
`
export const CorrectAnswer = styled(CorrectIcon)`
  width: 20px;
  position: absolute;
  top: -8px;
  left: -4px;
`
export const IncorrectAnswer = styled(InCorrectIcon)`
  width: 20px;
  position: absolute;
  top: -8px;
  left: -4px;
`

export const OptionContainer = styled.div<{
  isSelected?: boolean
  isAnswered?: string
}>`
  all: unset;
  cursor: pointer;
  min-width: 160px;
  padding: 16px 12px;
  border-radius: 17px;
  border: transparent;
  background: ${({ isSelected, isAnswered }) =>
    isSelected ? '#21AD64' : `${isAnswered}`};
  color: #ffffff;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  display: flex;
  justify-content: center;
  gap: 8px;
  :hover {
    color: #ffffff;
  }

  // mjx-container[jax='CHTML'][display='true'] {
  //   margin: 0px !important;
  // }

  img {
    width: 100% !important;
  }

  svg {
    width: 10%;
  }

  span {
    width: 90%;
  }
`
export const Rank = styled.div`
  height: 100px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0px;
`
export const SmallWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 330px;
  // width: 30%;
  background-color: white;
  border-radius: 20px;
  padding: 30px 0px;
`
