import styled from 'styled-components'
import { Blue, Gray } from '../../../../../const/V2/stylingVariables'
import { ReactComponent as TimerIcon } from '../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../assets/svg/skip-icon.svg'
export const MainContainer = styled.div`
  overflow: auto;
  padding: 0 36px 16px;
  background: #fff;
  height: 100%;
`

export const Para = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: ${Blue};
`
export const Section = styled.div<{
  active?: boolean
}>`
  cursor: pointer;
  min-width: 108px;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px;
  border: 1px solid ${({ active }) => (active ? 'transparent' : '#2b3674')};
  text-align: center;
  ${({ active }) => active && 'background:#65C1FF'};
`
export const QuestionCountDiv = styled.div<{
  show?: boolean
}>`
  position: relative;
  margin-top: 48px;
  padding: 36px 64px;
  width: 100%;
  border-radius: 30px 30px 0px 0px;
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
export const Wrapper = styled.div`
  position: relative;
  top: -12px;
  width: 100%;
  border: 1px solid #c6c6c6;
  border-radius: 0px 0px 30px 30px;
  border-top: transparent;
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

export const OptionContainer = styled.div<{
  isSelected?: boolean
}>`
  all: unset;
  cursor: pointer;
  min-width: 160px;
  padding: 16px 12px;
  border-radius: 17px;
  border: transparent;
  background: ${({ isSelected }) =>
    isSelected
      ? 'linear-gradient(108.91deg, #FBC088 0%, #FFAF64 112.5%)'
      : '#65c1ff'};
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
    width: 85%;
  }
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

export const BlueButton = styled.button`
  cursor: pointer;
  padding: 16px 32px;
  border-radius: 17px;
  border: transparent;
  background: linear-gradient(183.93deg, #4190f3 0.31%, #69d1f9 106.24%);
  color: #ffffff;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  :hover {
    color: #ffffff;
  }
`

export const FillInTheBlank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 130px;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.28px;
    outline: none;
    padding: 12px 20px;
    border: 1px solid #e0e5f2;
    border-radius: 1rem;
    border: 1px solid #e0e5f2;
    background: #ffffff;
    color: #2b3674;
    cursor: text;
  }
`
