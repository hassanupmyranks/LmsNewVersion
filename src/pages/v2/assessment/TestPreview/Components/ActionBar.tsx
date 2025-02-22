import { FlexContainer, IconFlexContainer, SmallLabel } from '../subcomponents'
import { ReactComponent as LightBulbQuestion } from '../../../../../assets/svg/lightbulbQuestion.svg'
import { ReactComponent as PaperIcon } from '../../../../../assets/svg/paper.svg'
import { ReactComponent as StarIcon } from '../../../../../assets/svg/starbadge.svg'
import { ReactComponent as TimerIcon } from '../../../../../assets/svg/timer.svg'
import { ButtonV2 } from '../../../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'

const ActionBar = ({
  submitHandler,
  totalMarks,
  totalTestQuestion,
  isUpdateQuestions,
  isTestSubmit,
  isEditTest
}: {
  submitHandler: (d: boolean) => void
  startTime: Date
  endTime: Date
  totalMarks: number
  totalTestQuestion: number
  isUpdateQuestions: boolean
  isTestSubmit: boolean
  isEditTest?: boolean | undefined
}) => {
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  return (
    <FlexContainer>
      <IconFlexContainer>
        <PaperIcon />
        <SmallLabel> Instruction</SmallLabel>
      </IconFlexContainer>
      <IconFlexContainer>
        <StarIcon />
        <SmallLabel> Medium</SmallLabel>
      </IconFlexContainer>
      <IconFlexContainer>
        <TimerIcon />
        <SmallLabel>
          {' '}
          {/* {calculateHoursDifference(startTime, endTime).toFixed(2)} Hours */}
          {selector.testDuration} mins
        </SmallLabel>
      </IconFlexContainer>
      <IconFlexContainer>
        <LightBulbQuestion />
        <SmallLabel>
          {' '}
          {totalTestQuestion} Questions, {totalMarks} Marks
        </SmallLabel>
      </IconFlexContainer>
      <ButtonV2
        width="100px"
        disabled={isTestSubmit}
        style={{ marginLeft: 'auto' }}
        onClick={() => submitHandler(true)}
      >
        {isTestSubmit ? (
          <Spinner animation={'border'} />
        ) : isEditTest ? (
          'Update Test'
        ) : isUpdateQuestions ? (
          'Save Test'
        ) : (
          'Save Test'
        )}
      </ButtonV2>
    </FlexContainer>
  )
}
export default ActionBar
