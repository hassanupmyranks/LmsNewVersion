import Calendar from 'react-calendar'
import { ReactComponent as Arrow } from '../../../../../../assets/svg/dark-blue-arrow.svg'
import { Flex } from '../../../../../../components/V2/styledComponents'
import moment from 'moment'
import { CalenderContainer, NavigationBtn, ActiveDot } from './styledComponents'

const days = [
  '29-01-2024',
  '31-01-2024',
  '04-02-2024',
  '03-02-2024',
  '09-02-2024',
  '15-02-2024',
  '25-02-2024',
  '20-02-2024',
  '02-03-2024'
]
const CustomCalendar = ({
  dateState,
  changeDate
}: {
  dateState: any
  changeDate: (d: any) => void
}) => {
  return (
    <CalenderContainer>
      <Calendar
        next2Label={null}
        prev2Label={null}
        value={dateState}
        onChange={changeDate}
        prevLabel={
          <NavigationBtn>
            <Arrow />
          </NavigationBtn>
        }
        nextLabel={
          <NavigationBtn>
            <Arrow style={{ rotate: '180deg' }} />
          </NavigationBtn>
        }
        tileContent={({ date }) => showDailyTask(date)}
        navigationLabel={({ date }) => navigationLabel(date)}
      />
    </CalenderContainer>
  )
}

export default CustomCalendar

const showDailyTask = (date: Date) => {
  if (days.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
    return (
      <Flex
        gap="2px"
        justifyContent="center"
        style={{
          position: 'absolute',
          bottom: '0',
          left: '28%'
        }}
      >
        <ActiveDot color="#00b383" />
        <ActiveDot color="#00CCFF" />
        <ActiveDot color="#0095FF" />
      </Flex>
    )
  }
  return <></>
}
const navigationLabel = (date: Date) => {
  return (
    <Flex justifyContent="center" direction="column" gap="3px">
      <p style={{ fontSize: '18px' }}>
        {date.toLocaleString('default', { month: 'long' })}
      </p>
      <p
        style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#8F9BB3'
        }}
      >
        {date.getFullYear()}
      </p>
    </Flex>
  )
}
