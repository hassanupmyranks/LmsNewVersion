import styled from 'styled-components'
import { ReactComponent as BgMath } from '../../../../../../assets/svg/math-blur.svg'
import TestImage from '../../../../../../assets/assign-test.png'
import { Link } from 'react-router-dom'
import { Gray } from '../../../../../../const/V2/stylingVariables'

export const MainTitle = styled.p`
  font-family: DM Sans;
  font-size: 25px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: #2b3674;
  padding-bottom: 16px;
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

export const SubjectContainer = styled.div<{
  active?: boolean
}>`
  cursor: pointer;
  padding: 8px;
  height: 100%;
  aspect-ratio: 5/1;
  border-radius: 15px;
  border: 1px solid transparent;
  ${({ active }) => (active ? 'border: 1px solid rgba(214, 61, 79, 1);' : '')}
  ${({ active }) =>
    active ? 'background-color: rgba(219, 39, 60, 0.14)' : ''};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &:hover {
    ${({ active }) =>
      active ? '' : 'border: 1px solid rgba(122, 134, 161, 0.1);'}
  }
  position: relative;

  svg {
    position: absolute;
    right: -6px;
    top: -2px;
  }
`

export const Task = styled.div<{
  color: string
  active?: boolean
  bgColor: string
}>`
  cursor: pointer;
  width: 124px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  display: grid;
  place-content: center;
  ${({ active, bgColor }) => active && `background-color:${bgColor}`}
`

export const SubDetail = styled.p<{
  fontWeight?: number
  fontSize?: string
}>`
  font-family: 'Rubik', sans-serif;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : `16px`)};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
  color: #a7a7a7;
`

export const QuizContent = styled.div`
  cursor: pointer;
  width: 320px;
  height: 94px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  box-shadow: 0px 4px 14px 5px #0000000d;

  @media (1370px < width < 1550px) {
    width: 260px;
  }
`
export const QuizDiv = styled.div`
  justify-self: center;
  @media (width <1370px) {
    justify-self: baseline;
    grid-column-start: 1;
    grid-row-end: 3;
  }
`
export const TestDiv = styled.div`
  justify-self: center;
  @media (width <1370px) {
    grid-column-start: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    justify-self: baseline;
  }
`

export const BgMathIcon = styled(BgMath)`
  position: absolute;
  right: 0;
  bottom: 0;
`

export const AssignTestDiv = styled.div`
  cursor: pointer;
  padding: 18px;
  background: #ffffff;
  box-shadow: 0px 24px 32px 0px #f0f0f0;
  border-radius: 12px;
`
export const TeacherName = styled.span`
  font-family: Poppins;
  border-radius: 12px;
  background: #f2cfd3;
  color: #db5969;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  padding: 3px 12px;
`
export const TestAssignIcon = styled.div`
  border-radius: 12px;
  width: 287px;
  height: 120px;
  background-image: ${`url(${TestImage})`};
  margin-bottom: 18px;
`
export const TestMark = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 24px;
  color: #79b2f0;
`
export const Line = styled.div`
  width: 82.29px;
  border: 1px;
  background: #d0d0d0b2;
  border: 1px solid #d0d0d0b2;
  position: absolute;
  rotate: 90deg;
  top: 111%;
  left: -32px;
`
export const FlexContainer = styled.div`
  display: grid;
  align-items: start;
  justify-content: space-between;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (width <1370px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-evenly;
    row-gap: 36px;
  }
  @media (width > 1550px) {
    justify-content: space-around;
    width: 100%;
    gap: 40px;
  }
`
export const Test = styled.div<{
  color?: string
  bgColor?: string
}>`
  position: relative;
  width: 316px;
  border-radius: 20px;
  border: 1px solid ${({ color }) => (color ? color : 'transparent')};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'transparent')};
  padding: 12px 18px;
`
export const TestBtn = styled.div<{
  bgColor?: string
}>`
  cursor: pointer;
  min-width: 70px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : 'transparent')};
  display: grid;
  place-content: center;
  padding: 4px 12px;
  color: #fff;
  border-radius: 11px;
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
`
export const TestType = styled.div<{
  color?: string
}>`
  position: absolute;
  bottom: 0;
  right: 18px;
  width: 74px;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  background: ${({ color }) => (color ? color : '#70d3c1')};
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 17px;
  text-align: center;
  color: #fff;
  padding: 3px 0;
`
export const NavigationBtn = styled.div`
  width: 27px;
  aspect-ratio: 1/1;
  border: 1px solid #ced3de;
  display: grid;
  place-content: center;
  border-radius: 10px;
`

export const ActiveDot = styled.div<{
  color: string
}>`
  height: 5px;
  width: 5px;
  border: 1.2px solid ${({ color }) => color};
  border-radius: 24px;
`
export const PracticeContainer = styled.div`
  padding: 32px;
  margin-bottom: 24px;
  border-radius: 24px;
  border: 1px solid #c6c6c6;
  height: 80%;
`
export const PracticeCard = styled.div`
  padding: 18px;
  flex-basis: 33%;
  flex-shrink: 1;
  height: 100%;
  border-radius: 12px;
  background: #dfedff4d;
  overflow-y: auto;
`

export const TestDetailContainer = styled.div`
  padding: 20px;
  flex-basis: 33%;
  flex-shrink: 1;
  height: 100%;
  width: 500px;
  border: 1px;
  background: #ffffff;
  border-radius: 24px;
  border: 1px solid #b7b7b75e;
  overflow-y: auto;
`
export const TestDetailPara = styled.p<{
  fontWeight?: number
  fontSize?: string
}>`
  font-family: 'Rubik', sans-serif;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 400)};
  line-height: 24px;
  color: #0c092a;
  white-space: pre-line;
`
export const FlexLine = styled.div`
  width: 2px;
  height: 30px;
  background: linear-gradient(
    180deg,
    rgba(204, 204, 204, 0.1) 0%,
    rgba(204, 204, 204, 0.5) 49.52%,
    rgba(204, 204, 204, 0.1) 100%
  );
`
export const TestDetailFlex = styled.div`
  display: flex;
  width: 140px;
  gap: 8px;
  align-items: center;
`
export const InputTest = styled.input`
  all: unset;
  width: -webkit-fill-available;
  padding: 16px;
  border-radius: 20px;
  border: 2px;
  background: white;
  border: 2px solid #7a86a17d;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  :focus {
    border: 2px solid #50a7f6eb;
  }
`
export const Button = styled(Link)`
  all: unset;
  width: fit-content;
  padding: 16px 32px;
  border-radius: 17px;
  border: transparent;
  background: ${(props) =>
    props['aria-disabled']
      ? Gray
      : `linear-gradient(183.93deg, #4190f3 0.31%, #69d1f9 106.24%)`};
  cursor: ${(props) => (props['aria-disabled'] ? 'not-allowed' : 'pointer')};
  color: #ffffff;
  font-family: 'Rubik', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  :hover {
    color: #ffffff;
  }
`

export const TestDetailPopup = styled.div`
  position: fixed;
  inset: 0;
  height: 100vh;
  background-color: #bdc3d37b;
  display: grid;
  place-content: center;
  border-radius: 12px;
  z-index: 999;
`

export const DropdownContainer = styled.div<{
  show?: boolean
}>`
  cursor: pointer;
  width: 100%;
  border-radius: 18px;
  padding-left: 18px;
  border: 1px;
  background: #ffffff;
  border: 1px solid #7a86a17d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ show }) => show && `border: 1px solid #50a7f6eb`};
`

export const PlaceHolder = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #343434;
`

export const SelectedValue = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: right;
  color: #4ea6f6;
`

export const DropdownPopUp = styled.div<{
  show?: boolean
}>`
  width: 100%;
  padding-top: 16px;
  ${({ show }) => !show && `display:none`};
`

export const DropdownBtn = styled.button<{
  isActive: boolean
}>`
  cursor: pointer;
  padding: 12px 8px;
  border-radius: 15px;
  border: 1.5px;
  background: #ffffff;
  border: 1.5px solid #6a5ae033;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  flex-grow: 1;
  font-weight: 500;
  line-height: 20px;
  color: #1979bb;
  ${({ isActive }) =>
    isActive &&
    `background: linear-gradient(183.93deg, #4190F3 0.31%, #69D1F9 106.24%);
    color: #FFFFFF;
    border: 1.5px solid transparent
`};
`

export const CalenderContainer = styled.div`
  .react-calendar {
    background-color: #fff;
    border: 1px transparent;
    border-radius: 20px;
    box-shadow: 0px 7px 21px 0px #0000001a;
    padding: 12px;
    font-family: 'Rubik', sans-serif;
  }
  .react-calendar__navigation button {
    font-family: 'Rubik', sans-serif;
  }
  .react-calendar__month-view__weekdays__weekday {
    cursor: default;
    border: none;
    text-transform: capitalize;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    cursor: default;
    text-decoration: none;
    color: #8f9bb3;
    display: grid;
    place-content: center;
  }
  .react-calendar abbr {
    padding-top: 4px;
    display: grid;
    place-content: center;
  }
  .react-calendar button {
    display: grid;
    place-content: center;
    background-color: #fff;
    border: none;
    color: #222b45;
    padding: 2px 2px 0px;
    font-weight: 500;
    height: 42px;
  }
  .react-calendar__tile--active {
    background-color: #fff !important;
    display: grid;
    place-content: center;
  }
  .react-calendar__tile--active abbr {
    padding: 6px;
    background-color: #00ccff !important;
    color: #fff !important;
    border-radius: 12px !important;
    font-weight: 700;
    width: 28px;
    aspect-ratio: 1/1;
  }
  .react-calendar__month-view__days__day {
    position: relative;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #8f9bb3 !important ;
  }
`
export const TestContainer = styled.div`
  height: 60vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 5px;
`
export const PracticeText = styled.p`
  font-family: DM Sans;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -2%;
  line-height: 24px;
  color: #2b3674;
  margin-bottom: 10px;
`
export const Error = styled.p`
  font-family: DM Sans;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
  line-height: 24px;
  color: #e71d36;
  text-align: end;
`
export const FieldContainer = styled.div`
  width: 100%;
`
export const AssignedName = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  background-color: #35bba3;
  padding: 8px;
  border-radius: 30px;
`

export const ResultDiv = styled.div`
  width: 40%;
  background-color: #fff;
  border: 1px transparent;
  border-radius: 20px;
  box-shadow: 0px 7px 21px 0px #0000001a;
  font-family: 'Rubik', sans-serif;
`

export const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(183.93deg, #4190f3 0.31%, #69d1f9 106.24%);
  clip-path: polygon(0 0, 100% 0, 100% 84%, 50% 100%, 0 84%);
  height: 356px;
  position: relative;

  img {
    // width: 222px;
    // height: 210px;
    position: absolute;
    z-index: 999;
  }
`
export const CrownIconDiv = styled.div`
  position: absolute;
  top: 1%;
  z-index: 999;
`

export const UserDiv = styled.div`
  border: 4px solid #00ccff;
  border-radius: 50%;
  width: 170px;
  height: 170px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    border-radius: 50%;
  }
`
export const TextSec = styled.p`
  color: #ffff;
  font-family: Rubik;
  font-weight: 700;
  font-size: 28px;
  line-height: 30px;
  margin-top: 20px;
`

export const NameSec = styled.p`
  color: #ffd967;
  font-family: Rubik;
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
`
export const DetailsSections = styled.div`
  padding: 25px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
export const ScoreDetailsSec = styled.div`
  display: flex;
  gap: 30px;
`

export const ResultTitle = styled.div`
  color: #858494;
  font-size: 12px;
  font-weight: 500;
  font-family: Rubik;
  line-height: 18px;
`
export const ResultLabel = styled.div`
  color: #0c092a;
  font-size: 20px;
  font-weight: 500;
  font-family: Rubik;
  line-height: 18px;
`
export const FirstSec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const BottomSec = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`
export const ShareIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #4ba0f5;
  padding: 8px;
  border-radius: 20px;
  height: 56px;
  width: 56px;
`
export const AttemptSec = styled.span`
  font-family: Poppins;
  border-radius: 12px;
  background: #1ba35c;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  padding: 3px 12px;
  margin-left: 20px;
`
export const UnAttemptSec = styled.span`
  font-family: Poppins;
  border-radius: 12px;
  background: #79b2f0;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  padding: 3px 12px;
  margin-left: 20px;
`
export const TestTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  font-family: DM Sans;
  color: #2b3674;
  margin-bottom: 20px;
`
