import { format } from 'date-fns'
import React, {
  FunctionComponent,
  SVGProps,
  useEffect,
  useRef,
  useState
} from 'react'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendar-icon.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { CalendarSectionDetails } from '../../../utils/types'
import {
  AllWrapper,
  CalendarContainer,
  CalendarInputBox,
  CalendarInputWrapper,
  CalendarPicker,
  CalendarTitle,
  CalendarValue,
  IconWrapper,
  InputLabel,
  MyTimeWrapper
} from './StyledComponents'
import MyTimePicker from './TimePicker'

let Icon: FunctionComponent<SVGProps<SVGSVGElement>> = CalendarIcon

const CalendarInput: React.FC<CalendarSectionDetails> = ({
  label,
  title,
  onChangeDate,
  onChangeTime,
  defaultDate,
  defaultTime,
  minDate,
  maxDate,
  color,
  disabled
}: CalendarSectionDetails) => {
  const [isOpen, setIsOpen] = useState(false)
  const [updateDate, setUpdateDate] = useState(0)
  const [updateTime, setUpdateTime] = useState(0)
  const [selectedDate, setSelectedDate] = useState<any>(new Date())
  const [selectedTime, setSelectedTime] = useState<any>({
    title: new Date().getHours() % 12,
    firstName: `${new Date().getMinutes()}`.padStart(2, '0'),
    lastName: new Date().getHours() > 12 ? 'PM' : 'AM'
  })
  const [combinedValue, setCombinedValue] = useState<string>('')

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

  const handleTimeChange = (value: any) => {
    setUpdateTime(1)
    onChangeTime(value)
    setSelectedTime(value)
  }

  const handleIconClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  useEffect(() => {
    const combinedValue =
      selectedDate || selectedTime
        ? `${format(selectedDate, 'do MMMM, yyyy')} - ${selectedTime.title}:${
            selectedTime.firstName
          } ${selectedTime.lastName} `
        : ''
    setCombinedValue(combinedValue)

    // combinedDateTimeValue(
    //   moment(combinedValue, 'Do MMMM, YYYY - hh:mm A').toISOString()
    // )
  }, [selectedDate, selectedTime])

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
              {(updateDate === 0 || updateTime === 0) &&
              defaultDate === '' &&
              defaultTime === ''
                ? combinedValue
                : (updateDate === 0 || updateTime === 0) &&
                  defaultDate !== '' &&
                  defaultTime !== ''
                ? `${defaultDate} - ${defaultTime}`
                : (updateDate === 1 || updateTime === 1) &&
                  defaultDate === '' &&
                  defaultTime === ''
                ? combinedValue
                : (updateDate === 1 || updateTime === 1) &&
                  defaultDate !== '' &&
                  defaultTime !== ''
                ? combinedValue
                : ''}
            </CalendarValue>
          </div>
          <IconWrapper>
            <Icon />
          </IconWrapper>
        </CalendarInputWrapper>
      </CalendarInputBox>{' '}
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
          <MyTimeWrapper>
            <MyTimePicker onChangeTime={handleTimeChange} />
          </MyTimeWrapper>
        </AllWrapper>
      )}
    </CalendarContainer>
  )
}

export default CalendarInput
