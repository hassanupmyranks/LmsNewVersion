import styled from 'styled-components'
import { ReactComponent as LightbulbQuestionSvg } from '../../../../../assets/svg/lightbulb-question.svg'
import { ReactComponent as TimerSvg } from '../../../../../assets/svg/timer.svg'
import { Blue } from '../../../../../const/V2/stylingVariables'
import { RootState } from '../../../../../redux/store'
import { useSelector } from 'react-redux'

const Actions = ({
  totalMarks,
  totalTestQuestion
}: {
  startTime: Date
  endTime: Date
  totalMarks: number
  totalTestQuestion: number
}) => {
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  return (
    <Statistics>
      <Statistic isClickable={false} isHoverable={false}>
        {/* <img src={TimerSvg} alt="timer" /> */}
        <TimerSvg />
        <StatisticsText>
          {/* {calculateHoursDifference(startTime, endTime).toFixed(2)} Hours */}
          {selector.testDuration} mins
        </StatisticsText>
      </Statistic>
      <Statistic isClickable={false} isHoverable={false}>
        {/* <img src={LightbulbQuestionSvg} alt={'lightbulbQuestion'} /> */}
        <LightbulbQuestionSvg />
        <StatisticsText>
          {totalTestQuestion} Questions , {totalMarks} Marks
        </StatisticsText>
      </Statistic>
    </Statistics>
  )
}

export default Actions

const Statistics = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const Statistic = styled.div<{ isClickable: boolean; isHoverable: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: ${(props) =>
    props?.isClickable || props?.isHoverable ? 'pointer' : 'default'};
`
const StatisticsText = styled.div`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.68px;
`
