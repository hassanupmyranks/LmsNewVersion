import React, { useRef, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styled from 'styled-components'
import { ReactComponent as DownArrow } from '../../../../../../assets/svg/keyboard_arrow_down.svg'
import { ReactComponent as UpArrow } from '../../../../../../assets/svg/keyboard_arrow_up.svg'

import { Calendar } from 'react-date-range'
import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'
import {
  Blue,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../../../../const/V2/stylingVariables'
import moment from 'moment'

interface PasswordInputProps {
  label: string
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeDate: (selectedValue: Date) => void
  value: string
}

const SingleCalendar: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  onChangeDate
}) => {
  const [showPassword, setShowPassword] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const CalendarRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(CalendarRef, () => {
    setShowPassword(true)
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleDateChange = (selectedDate: Date) => {
    onChangeDate(selectedDate)
    setSelectedDate(selectedDate)
  }

  const formattedDate = value ? moment(value).format('Do MMMM YYYY') : ''

  return (
    <PasswordInputWrapper>
      {showPassword ? (
        ''
      ) : (
        <CalenderViewer ref={CalendarRef}>
          <Calendar date={selectedDate} onChange={handleDateChange} />
        </CalenderViewer>
      )}
      <PasswordInputLabel>{label}</PasswordInputLabel>

      <PasswordInputField
        onClick={togglePasswordVisibility}
        placeholder={placeholder}
        value={formattedDate}
        onChange={onChange}
      />
      <Icon onClick={togglePasswordVisibility}>
        {showPassword ? <DownArrow /> : <UpArrow />}
      </Icon>
    </PasswordInputWrapper>
  )
}

export default SingleCalendar

export const PasswordInputWrapper = styled.div`
  position: relative;
  background-image: red;
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (min-width: 2500px) {
    width: 100%;
  }
`

export const PasswordInputLabel = styled.label`
  display: block;

  color: ${Blue};
  user-select: none;
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const PasswordInputField = styled.input`
  border: none;

  width: auto;
  box-sizing: border-box;
  font-family: 'DM Sans';
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 20px;
  border: 1px solid ${SecondaryGray};
  border-radius: 1rem;

  background: ${White};
  color: ${Blue};

  &:focus {
    outline: none;
    border-color: none;
  }
  &::placeholder {
    color: ${SecondaryGray600};
    font-size: 14px;
    font-weight: 400;
  }
`

export const Icon = styled.span`
  position: absolute;
  right: 10px;
  top: 70%;
  transform: translateY(-50%);
  cursor: pointer;
`
const CalenderViewer = styled.div`
  z-index: 1000;
  text-align: start;
  position: absolute;
  top: 75%;
  right: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
