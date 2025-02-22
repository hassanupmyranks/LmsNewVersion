import styled from 'styled-components'
import {
  Blue,
  BlueButton,
  CoolGray10,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'

export const CalendarContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

export const TimePickerDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`

export const InputLabel = styled.p`
  color: ${Blue};
  user-select: none;
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
  @media (max-width: 992px) {
    font-size: 10px; /* Adjust font size for smaller screens */
  }
`

export const CalendarInputBox = styled.div<{ disabled?: boolean }>`
  width: 286px;
  padding: 10px 20px;
  border: 1px solid ${SecondaryGray};
  border-radius: 1rem;
  background: ${(props) => (props.disabled ? CoolGray10 : White)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  ${({ disabled }) => disabled && 'opacity: 0.6;'}
  margin-top: 5px;

  @media (max-width: 425px) {
    width: 310px;
  }
`

export const CalendarTitle = styled.p`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: ${SecondaryGray600};

  @media (max-width: 992px) {
    font-size: 10px; /* Adjust font size for smaller screens */
  }
`
export const CalendarValue = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${Blue};

  @media (max-width: 992px) {
    font-size: 10px; /* Adjust font size for smaller screens */
  }
`
export const CalendarInputWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const IconWrapper = styled.div`
  cursor: pointer;
`
export const CalendarPicker = styled.div`
  color: ${BlueButton};
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

export const TimeWrapper = styled.div`
  height: 100%;
  background-color: white;
  margin: 10px 0px 0px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

export const AllWrapper = styled.div`
  display: flex;
  width: 500px;
  position: absolute;
  z-index: 999;
`

// export const MyTimeWrapper = styled.div`
//   height: 210px;
//   width: 150px;
//   background-color: #ffffff;
//   margin: 10px 0px 0px 20px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
//   font-size: 11px;
//   cursor: pointer;
// `
