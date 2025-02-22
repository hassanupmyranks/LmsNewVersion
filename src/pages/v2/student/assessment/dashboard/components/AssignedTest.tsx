import { Flex } from '../../../../../../components/V2/styledComponents'
import {
  Title,
  AssignTestDiv,
  TestAssignIcon,
  TeacherName,
  SubDetail,
  TestMark,
  TestDetailPopup,
  FlexLine,
  TestDetailContainer,
  TestDetailFlex,
  TestDetailPara,
  Button,
  AttemptSec,
  UnAttemptSec
} from './styledComponents'
import { ReactComponent as AssignTestIcon } from '../../../../../../assets/svg/assign-test.svg'
import { AssignedTest } from '../types'
import { useRef, useState } from 'react'
import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'
import { ReactComponent as QuestionIcon } from '../../../../../../assets/svg/question-mark.svg'
import { ReactComponent as MarksIcon } from '../../../../../../assets/svg/puzzle-icon.svg'
import { ReactComponent as ClockIcon } from '../../../../../../assets/svg/clock.svg'
import { ReactComponent as MedalIcon } from '../../../../../../assets/svg/medal.svg'
import { ReactComponent as TimerIcon } from '../../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../../assets/svg/skip-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../../redux/store'
import ROUTES_V2 from '../../../../../../const/V2/routes'
import { AssignedTestDetail } from '../../../../../../redux/studentV2/action'
import moment from 'moment'
import CountdownTimer from './countDownTimer'
import { CustomToastMessage } from '../../../../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { PrimaryBlue } from '../../../../../../const/V2/stylingVariables'
import { startTestAPI } from '../../../../../../helpers/V2/apis'
import { useHistory } from 'react-router-dom'

export const AssignTest = ({
  data,
  isAssignedAPILoading
}: {
  data: AssignedTest[]
  isAssignedAPILoading: boolean
}) => {
  const [show, setPopup] = useState(false)
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const history = useHistory()
  const popupRef = useRef<HTMLDivElement>(null)
  const [isStarted, setIsStarted] = useState(false)
  const [testDetail, setTestDetail] = useState<AssignedTest | any>()
  const [currentDate] = useState(new Date())
  useOnClickOutside(popupRef, () => setPopup(false))
  const dispatch = useDispatch()

  const getCurrentDateTime = () => {
    return new Date().toISOString()
  }

  const currentDateTime = getCurrentDateTime()

  const handleChange = () => {
    const now = new Date()
    const startTime = new Date(testDetail?.test_start_time)

    if (now > startTime) {
      setIsStarted(true)
      startTestAPI({ testId: testDetail?._id })
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          history.push(
            `${ROUTES_V2.ATTEMPT_TEST}?startTime=${encodeURIComponent(
              currentDateTime
            )}`
          )
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsStarted(false))
    }
  }

  return (
    <>
      <Flex gap="12px" style={{ padding: '0 0 10px 10px' }}>
        <AssignTestIcon />
        <Title fontWeight={700}>Test Assigned</Title>
      </Flex>
      <Flex
        gap="16px"
        direction="column"
        style={{ height: '70vh', overflowX: 'auto' }}
      >
        {isAssignedAPILoading && (
          <Spinner
            style={{
              height: '30px',
              width: '30px',
              color: `${PrimaryBlue}`
            }}
            animation={'border'}
          />
        )}
        {data.map((test, index) => (
          <AssignTestDiv
            key={`${test}_${index}`}
            onClick={() => {
              if (!test.attempted) {
                const now = new Date()
                const startTime = new Date(test?.test_start_time)
                const endTime = new Date(test?.test_end_time)
                const startTimeBefore = new Date(
                  startTime.getTime() - 5 * 60 * 1000
                )

                const endTimeWithBuffer = new Date(
                  endTime.getTime() + 5 * 60 * 1000
                )

                if (now < startTimeBefore) {
                  CustomToastMessage(
                    'Test will not be started before start time',
                    'error'
                  )
                } else if (now > endTimeWithBuffer) {
                  CustomToastMessage('Test time is ended', 'error')
                } else {
                  setTestDetail(test)
                  setPopup(!show)
                  dispatch(
                    AssignedTestDetail({
                      limit: 100,
                      page: 1,
                      testId: test._id
                    })
                  )
                }
              } else {
                CustomToastMessage('Test already submitted', 'error')
              }
            }}
          >
            <TestAssignIcon />
            <TeacherName>{test?.assigned_by[0]?.firstName}</TeacherName>
            {test?.attempted ? (
              <AttemptSec>Attempted</AttemptSec>
            ) : (
              <UnAttemptSec>
                <CountdownTimer
                  startDate={new Date(test.test_start_time)}
                  endDate={new Date(test.test_end_time)}
                  testDuration={test.test_duration}
                />
              </UnAttemptSec>
            )}
            <Title
              fontSize="20px"
              fontWeight={600}
              style={{ paddingTop: '16px', width: '230px' }}
            >
              {test.institute_test_name}
            </Title>
            <Flex justifyContent="space-between">
              <SubDetail fontSize="14px" style={{ marginTop: '18px' }}>
                {`Duration : ${test.test_duration} minutes`}
                <p>
                  {' '}
                  {`Time: ${moment(test.test_start_time).format(
                    'DD MMM, YYYY LT'
                  )}`}
                </p>
              </SubDetail>

              <div>
                <TestMark>{test.total_marks}</TestMark>
                <TestMark style={{ fontSize: '16px' }}>Marks</TestMark>
              </div>
            </Flex>
          </AssignTestDiv>
        ))}
      </Flex>
      {show && (
        <TestDetailPopup>
          <TestDetailContainer ref={popupRef}>
            <Flex gap="16px" direction="column" alignItems="flex-start">
              <TestDetailPara fontWeight={500} fontSize="24px">
                {testDetail?.institute_test_name}
              </TestDetailPara>
              <div>
                <Flex gap="18px" wrap={true} style={{ paddingBottom: '16px' }}>
                  <TestDetailFlex>
                    <QuestionIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      {testDetail?.total_test_questions} questions
                    </TestDetailPara>
                  </TestDetailFlex>
                  <FlexLine />
                  <TestDetailFlex>
                    <MarksIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      {testDetail?.total_marks} Marks
                    </TestDetailPara>
                  </TestDetailFlex>
                </Flex>
                <Flex gap="18px">
                  <TestDetailFlex>
                    <ClockIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      {testDetail?.test_duration} Minutes
                    </TestDetailPara>
                  </TestDetailFlex>
                  <FlexLine />
                  <TestDetailFlex>
                    <MedalIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      50 points
                    </TestDetailPara>
                  </TestDetailFlex>
                </Flex>
              </div>
              <p
                style={{
                  fontFamily: 'Rubik',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  color: '#858494',
                  paddingTop: '8px'
                }}
              >
                DESCRIPTION
              </p>

              <TestDetailPara>{testDetail?.instruction_text}</TestDetailPara>

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
            <Flex>
              <div style={{ marginTop: '36px' }}>
                <TestDetailPara fontSize="14px" fontWeight={500}>
                  {user.firstName}
                </TestDetailPara>
                <TestDetailPara
                  fontSize="12px"
                  fontWeight={400}
                  style={{ color: '#858494', lineHeight: '0.8' }}
                >
                  Creator
                </TestDetailPara>
              </div>
            </Flex>

            <TestDetailPara
              fontSize="14px"
              fontWeight={500}
              style={{ color: '#222B45', margin: '12px 0 24px' }}
            >
              Note : This test will show results {testDetail?.result_announce}{' '}
            </TestDetailPara>
            <Flex justifyContent="center" direction="column">
              {currentDate < new Date(testDetail?.test_start_time) ? (
                <>
                  <UnAttemptSec>
                    <CountdownTimer
                      startDate={new Date(testDetail?.test_start_time)}
                      endDate={new Date(testDetail?.test_end_time)}
                      testDuration={testDetail?.test_duration}
                    />
                  </UnAttemptSec>
                  <TestDetailPara>
                    It looks like starting this test now would make it
                    impossible to finish before the end time. Please check with
                    your instructor for help or to reschedule.
                  </TestDetailPara>
                </>
              ) : (
                <Button
                  onClick={handleChange}
                  aria-disabled={isStarted}
                  // to={`${ROUTES_V2.ATTEMPT_TEST}?startTime=${encodeURIComponent(
                  //   currentDateTime
                  // )}`}
                  to={`#`}
                >
                  Start Test
                </Button>
              )}
            </Flex>
          </TestDetailContainer>
        </TestDetailPopup>
      )}
    </>
  )
}
