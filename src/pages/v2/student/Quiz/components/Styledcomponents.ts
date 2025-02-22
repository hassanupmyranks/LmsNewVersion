import styled from 'styled-components'
import {
  Gray,
  PrimaryBlue,
  White
} from '../../../../../const/V2/stylingVariables'
import { getThemeDetails } from '../../../../../helpers/V2/getThemeDetails'

export const QuizContainer = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
`
export const QuestionType = styled.h4`
  color: ${PrimaryBlue};
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 700;
`
export const QuestionSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
  flex-direction: column;
  gap: 20px;
`
export const QuizSec = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  width: 70%;
`
export const QuestionContainer = styled.div`
  width: 100%;
`

export const Question = styled.p`
  color: #ff1979bb;
  font-family: DM Sans;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
`
export const Heading = styled.h4`
  color: ${PrimaryBlue};
  font-family: DM Sans;
  font-size: 18px;
  font-weight: 700;
`
export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`
export const Option = styled.div<{
  active?: boolean
}>`
  cursor: pointer;
  color: ${(props) => (props.active ? White : PrimaryBlue)};
  font-family: DM Sans;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 30px;
  background-color: ${(props) =>
    props.active ? PrimaryBlue : 'rgba(208, 238, 247, 0.93)'};
  width: 100%;
  border-radius: 20px;
`
export const QuizButton = styled.button<{
  filled?: boolean
  width?: string
  disabled?: boolean
}>`
  all: unset;
  background-color: ${(props) => (props.disabled ? Gray : White)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border-radius: 16px;
  border: 1px solid ${getThemeDetails().primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${(props) =>
    props.disabled
      ? 'rgba(255, 255, 255, 0.5)'
      : getThemeDetails().primaryColor};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
  width: 90px;

  &:hover {
    color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
    background-color: ${(props) =>
      props.disabled ? Gray : getThemeDetails().primaryColor};
  }
`

export const Title = styled.p<{
  fontWeight?: number
  fontSize?: string
}>`
  font-family: 'Rubik', sans-serif;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : `16px`)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
  line-height: 1.4;
  color: #343434;
`
