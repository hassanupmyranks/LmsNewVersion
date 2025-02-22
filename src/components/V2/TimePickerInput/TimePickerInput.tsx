import React, { FunctionComponent, SVGProps, useRef, useState } from 'react'
import { ReactComponent as TimerIcon } from '../../../assets/svg/timer.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  CalendarContainer,
  CalendarInputBox,
  CalendarInputWrapper,
  CalendarTitle,
  CalendarValue,
  IconWrapper,
  InputLabel,
  TimePickerDropdown
} from './StyledComponents'
import MyTimePicker from './MyTimePicker'

let Icon: FunctionComponent<SVGProps<SVGSVGElement>> = TimerIcon

interface TimePickerProps {
  label: string
  title: string
  defaultTime?: string
  onChangeTime: (value: string) => void
  color?: string
  disabled?: boolean
}

const TimePickerInput: React.FC<TimePickerProps> = ({
  label,
  title,
  onChangeTime,
  defaultTime = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string>(defaultTime)

  const CalendarRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(CalendarRef, () => {
    setIsOpen(false)
  })

  const handleTimeChange = (value: { hour: string; minute: string }) => {
    const formattedTime = `${value.hour}:${value.minute}`
    setSelectedTime(formattedTime)
    onChangeTime(formattedTime)
  }

  function handleIconClick() {
    if (!disabled) {
      setIsOpen((prevIsOpen) => !prevIsOpen)
    }
  }

  return (
    <CalendarContainer>
      <InputLabel>{label}</InputLabel>
      <CalendarInputBox disabled={disabled} onClick={handleIconClick}>
        <CalendarInputWrapper>
          <div>
            <CalendarTitle>{title}</CalendarTitle>
            <CalendarValue>{selectedTime || defaultTime}</CalendarValue>
          </div>
          <IconWrapper>
            <Icon />
          </IconWrapper>
        </CalendarInputWrapper>
      </CalendarInputBox>
      {isOpen && (
        <TimePickerDropdown ref={CalendarRef}>
          <MyTimePicker onChangeTime={handleTimeChange} />
        </TimePickerDropdown>
      )}
    </CalendarContainer>
  )
}

export default TimePickerInput
