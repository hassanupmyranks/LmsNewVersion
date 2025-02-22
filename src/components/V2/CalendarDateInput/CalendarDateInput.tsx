import React, { FunctionComponent, SVGProps, useRef, useState } from 'react'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendar-icon.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { CalendarSectionDetailss } from '../../../utils/types'
import {
  AllWrapper,
  CalendarContainer,
  CalendarInputBox,
  CalendarInputWrapper,
  CalendarPicker,
  CalendarTitle,
  CalendarValue,
  IconWrapper,
  InputLabel
} from './StyledComponents'

let Icon: FunctionComponent<SVGProps<SVGSVGElement>> = CalendarIcon

const CalendarDateInput: React.FC<CalendarSectionDetailss> = ({
  label,
  title,
  onChangeDate,
  defaultDate,
  minDate,
  maxDate,
  color,
  disabled
}: CalendarSectionDetailss) => {
  const [isOpen, setIsOpen] = useState(false)
  const [updateDate, setUpdateDate] = useState(0)
  const [selectedDate, setSelectedDate] = useState<any>(new Date())

  const CalendarRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(CalendarRef, () => {
    setIsOpen(false)
  })

  const handleDateChange = (selectedDate: Date) => {
    setUpdateDate(1)
    onChangeDate(selectedDate)
    setSelectedDate(selectedDate)
    setIsOpen(false)
  }

  const handleIconClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <CalendarContainer>
      <InputLabel>{label}</InputLabel>
      <CalendarInputBox
        disabled={disabled}
        onClick={() => !disabled && handleIconClick()}
      >
        <CalendarInputWrapper>
          <div>
            <CalendarTitle>{title}</CalendarTitle>
            <CalendarValue>
              {(updateDate === 0 || updateDate === 0) && defaultDate === ''
                ? ''
                : (updateDate === 0 || updateDate === 0) && defaultDate !== ''
                ? `${defaultDate}`
                : (updateDate === 1 || updateDate === 1) && defaultDate === ''
                ? ''
                : (updateDate === 1 || updateDate === 1) && defaultDate !== ''
                ? `${defaultDate}`
                : ''}
            </CalendarValue>
          </div>
          <IconWrapper>
            <Icon />
          </IconWrapper>
        </CalendarInputWrapper>
      </CalendarInputBox>
      {isOpen && (
        <AllWrapper ref={CalendarRef}>
          <CalendarPicker>
            <Calendar
              onChange={handleDateChange}
              showMonthArrow={false}
              color={color}
              date={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          </CalendarPicker>
        </AllWrapper>
      )}
    </CalendarContainer>
  )
}

export default CalendarDateInput
