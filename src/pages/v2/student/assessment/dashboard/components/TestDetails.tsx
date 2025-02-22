import { Flex } from '../../../../../../components/V2/styledComponents'
import {
  TestDetailContainer,
  TestDetailPara,
  TestDetailFlex,
  FlexLine,
  Title
} from './styledComponents'
import { ReactComponent as QuestionIcon } from '../../../../../../assets/svg/question-mark.svg'
import { ReactComponent as ClockIcon } from '../../../../../../assets/svg/clock.svg'
import { ReactComponent as TimerIcon } from '../../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../../assets/svg/skip-icon.svg'
import { ReactComponent as MarksIcon } from '../../../../../../assets/svg/puzzle-icon.svg'

const TestDetails = ({
  duration,
  correctAnsMark,
  inCorrectAnsMark,
  testName,
  totalNumberOfQuestions
}: {
  duration: string
  correctAnsMark: string
  inCorrectAnsMark: string
  testName: string
  totalNumberOfQuestions: number
}) => {
  return (
    <TestDetailContainer>
      <Flex gap="16px" direction="column" alignItems="flex-start">
        <TestDetailPara fontWeight={500} fontSize="24px">
          {testName || 'Test Name'}
        </TestDetailPara>
        {/* <TestDetailPara fontSize="18px" fontWeight={400}>
          1200 Students took this
        </TestDetailPara> */}
        <div>
          <Flex gap="18px" wrap={true} style={{ paddingBottom: '16px' }}>
            <TestDetailFlex>
              <QuestionIcon />
              <TestDetailPara fontSize="14px" fontWeight={500}>
                {totalNumberOfQuestions} questions
              </TestDetailPara>
            </TestDetailFlex>
            <FlexLine />
            <TestDetailFlex>
              <ClockIcon />
              <TestDetailPara fontSize="14px" fontWeight={500}>
                {duration || 0} Minutes
              </TestDetailPara>
            </TestDetailFlex>
          </Flex>
          <Flex gap="18px">
            <TestDetailFlex>
              <MarksIcon />
              <TestDetailPara fontSize="14px" fontWeight={500}>
                {totalNumberOfQuestions * Number(correctAnsMark) || 0} Marks
              </TestDetailPara>
            </TestDetailFlex>
            <FlexLine />
            {/*  <TestDetailFlex>
              <MedalIcon />
              <TestDetailPara fontSize="14px" fontWeight={500}>
                50 points
              </TestDetailPara>
            </TestDetailFlex> */}
          </Flex>
        </div>
        <Title
          fontWeight={500}
          fontSize="14px"
          style={{
            color: '#858494',
            paddingTop: '8px'
          }}
        >
          DESCRIPTION
        </Title>
        <ul>
          <li>
            <TestDetailPara>This is Multiple choice test </TestDetailPara>
          </li>
          <li>
            <TestDetailPara>
              Duration of test is {duration || 0} Minutes
            </TestDetailPara>
          </li>
          <li>
            <TestDetailPara>
              {correctAnsMark || 0} mark for each correct answer
            </TestDetailPara>
          </li>
          <li>
            <TestDetailPara>
              Negative Marking {inCorrectAnsMark || 0} each question
            </TestDetailPara>
          </li>
          <li>
            <TestDetailPara>
              Use Below toggles to come back later
            </TestDetailPara>
          </li>
        </ul>
        <Flex gap="18px">
          <Flex gap="12px">
            <TimerIcon />
            <TestDetailPara fontSize="14px" fontWeight={500}>
              Review Later
            </TestDetailPara>
          </Flex>
          <Flex gap="12px">
            <SkipIcon />
            <TestDetailPara fontSize="14px" fontWeight={500}>
              Skip Question
            </TestDetailPara>
          </Flex>
        </Flex>
      </Flex>
    </TestDetailContainer>
  )
}

export default TestDetails
