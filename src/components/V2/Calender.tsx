import React, { useRef, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import styled from 'styled-components'
import {
  Blue,
  SecondaryGray,
  White,
  SecondaryGray600,
  RequiredRed
} from '../../const/V2/stylingVariables'
import { Calendar } from 'react-date-range'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { RequiredError } from './Form/Input'
import { ReactComponent as CalendarIcon } from '../../assets/svg/calendar-icon.svg'

interface CalenderInputProps {
  label: string
  placeholder: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeDate: (selectedvalue: Date) => void
  value: string | any
  error?: string
  minDate?: any
  maxDate?: any
}

const CalenderSelectInput: React.FC<CalenderInputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  onChangeDate,
  error,
  minDate,
  maxDate
}) => {
  const [showPassword, setShowPassword] = useState(true)
  const [selectedDate, setSelectedDate] = useState<any>(new Date())

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

  return (
    <CalenderSelectWrapper>
      {showPassword ? (
        ''
      ) : (
        <CalenderViewer ref={CalendarRef}>
          <Calendar
            onChange={handleDateChange}
            date={selectedDate}
            // maxDate={maxSelectableDate}
            minDate={minDate} // Set minimum selectable date
            maxDate={maxDate} // Set maximum selectable date
          />
        </CalenderViewer>
      )}
      <CalenderSelectLabel>
        {label}
        <span style={{ color: '#197BBD' }}></span>
      </CalenderSelectLabel>

      <CalenderSelectField
        error={error}
        onClick={togglePasswordVisibility}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <RequiredError>Enter {error}</RequiredError>}
      <Icon onClick={togglePasswordVisibility}>
        <CalendarIcon />
      </Icon>
    </CalenderSelectWrapper>
  )
}

export default CalenderSelectInput

export const CalenderSelectWrapper = styled.div`
  position: relative;
  background-image: red;
  margin-bottom: 15px;
  @media (min-width: 2500px) {
    width: 100%;
  }
`

export const CalenderSelectLabel = styled.label`
  display: block;

  color: ${Blue};
  margin-bottom: 8px;
  user-select: none;
  font-family: 'DM Sans';
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const CalenderSelectField = styled.input<{ error?: string }>`
  border: none;

  width: 100%;
  box-sizing: border-box;
  font-family: 'DM Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.28px;
  padding: 17px 20px;
  border: 1px solid ${SecondaryGray};
  border-radius: 1.3rem;
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}
  background: ${White};
  color: ${Blue};

  &:focus {
    outline: none;
    border-color: none;
  }
  &::placeholder {
    color: ${SecondaryGray600};
  }
`

export const Icon = styled.span`
  position: absolute;
  right: 15px;
  top: 65%;
  transform: translateY(-50%);
  cursor: pointer;
`
const CalenderViewer = styled.div`
  z-index: 1000;
  text-align: start;
  position: absolute;
  top: -300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
