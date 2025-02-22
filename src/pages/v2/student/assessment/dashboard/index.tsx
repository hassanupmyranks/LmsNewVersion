import { ReactComponent as PracticeIcon } from '../../../../../assets/svg/practice-icon.svg'
import { ReactComponent as FinishedIcon } from '../../../../../assets/svg/finished-icon.svg'
import { ReactComponent as TestIcon } from '../../../../../assets/svg/test.svg'
import {
  Flex,
  PageContainer
} from '../../../../../components/V2/styledComponents'
import { ReactComponent as DotArrowIcon } from '../../../../../assets/svg/dotArrow.svg'
import { useEffect, useRef, useState } from 'react'
import {
  getAllFinishedTest,
  getAllMyTest,
  getAssignedTest,
  getQuestionBankV2SubjectsAPI,
  getStudentTestChartDetails,
  getStudentTestcounts,
  getStudentTestDetails,
  startTestAPI
} from '../../../../../helpers/V2/apis'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { AssignedTest, MyTest, Subject } from './types'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import {
  AssesmentContainerWrapper,
  AssesmentTableTabWrapper,
  AssessmentFlex,
  Button,
  TwoDiv
} from './styledcomponents'
import ColumnApexChart01 from '../../assignments/components/ColumnCommonChart'
import { SummaryGraphs } from '../../../dashboard/StudentDashBoard/styledComponents'
import {
  Icons,
  Nodata,
  TableTitle,
  TestTitle
} from '../../../dashboard/TeacherDashBoard/styledComponents'
import {
  Table,
  TableRowBody,
  TableRowHead,
  TableHeader
} from '../../../dashboard/SuperAdminDashoard/styledComponents'
import {
  AssignmentList,
  Font12,
  Font14,
  TableWrapper,
  TD
} from '../../assignments/styledComponent'
import Assessment from './components/Assesment'
import ApexChart7 from '../../../dashboard/PieChart'
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../attemptTest/styledComponents'
import ROUTES_V2 from '../../../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { AssignedTestDetail } from '../../../../../redux/studentV2/action'
import {
  FlexLine,
  TestDetailContainer,
  TestDetailFlex,
  TestDetailPara,
  TestDetailPopup
} from './components/styledComponents'
import { ReactComponent as QuestionIcon } from '../../../../../assets/svg/question-mark.svg'
import { ReactComponent as MarksIcon } from '../../../../../assets/svg/puzzle-icon.svg'
import { ReactComponent as ClockIcon } from '../../../../../assets/svg/clock.svg'
import { ReactComponent as MedalIcon } from '../../../../../assets/svg/medal.svg'
import { ReactComponent as TimerIcon } from '../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../assets/svg/skip-icon.svg'
import useOnClickOutside from '../../../../../hooks/useOnClickOutside'
let assessmentMenu = [
  {
    Icon: <PracticeIcon />,
    label: 'Practice',
    color: '#FF9D40',
    subData: '4 subjects',
    bgColor: '#FFEBD8'
  },
  {
    Icon: <FinishedIcon />,
    label: 'Finished',
    color: '#1BA35C',
    subData: '4 tests',
    bgColor: '#E7FFF3'
  },
  {
    Icon: <TestIcon />,
    label: 'My Tests',
    color: '#32778C',
    subData: '10 created',
    bgColor: '#D6F5FF'
  }
]

const StudentAssessment = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [, setSubjects] = useState<Subject[]>([])
  const [assignedTest, setAssignedTest] = useState<AssignedTest[]>([])
  const [, setFinishedTests] = useState<MyTest[]>([])
  const [, setPracticeTests] = useState<any>([])
  const [completedBarChart, setCompletedBarChart] = useState<any[]>([])
  const [chartCounts, setChartCounts] = useState<any>()
  const [tableTabActive, settableTabActive] = useState('completed')
  const [, setIsSubmitAPILoading] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [assignedTestLoader, setAssignedTestLoader] = useState(false)
  const [assesmentTableDetials, setassesmentTableDetials] = useState<any>([])
  const [testDetail, setTestDetail] = useState<AssignedTest>()
  const [show, setPopup] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))
  const color: Record<string, string> = {
    red: '#fdf1ef',
    blue: '#EDF3FE',
    green: '#EDFEEF'
  }

  const IconColor: Record<string, string> = {
    red: '#FF374E',
    blue: '#0681BC',
    green: '#2F9E3C'
  }

  // console.log(user)

  useEffect(() => {
    setIsLoading(true)
    getQuestionBankV2SubjectsAPI({
      limit: 100,
      courseId: user?.questionBankCourses?.[0]?.courseId ?? '',
      type: 'courses'
    })
      .then((res) => {
        setSubjects(res.data)
        assessmentMenu[0].subData = `${res.total || 0} subjects`
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }, [user.questionBankCourses])

  useEffect(() => {
    setIsLoading(true)
    getAssignedTest({ page: 1, limit: 200 })
      .then((res) => {
        setAssignedTest(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })

    let tempAssessmentMenu = assessmentMenu
    // getSubmitPracticeTestAPI({limit:100, page:1})
    setIsSubmitAPILoading(true)
    getAllFinishedTest({
      limit: 100,
      page: 1
    })
      .then((res) => {
        setFinishedTests(res.data)
        tempAssessmentMenu[1].subData = `${res.count || 0} tests`
        assessmentMenu = tempAssessmentMenu
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubmitAPILoading(false))

    getAllMyTest({
      limit: 100,
      page: 1
    })
      .then((res) => {
        setPracticeTests(res.data)
        tempAssessmentMenu[2].subData = `${res.count || 0} created`
      })
      .catch((error) => console.log(error))

    getStudentTestChartDetails()
      .then((res) => {
        function rearrangeArray(data: any) {
          if (!Array.isArray(data)) {
            console.error(
              'Expected an array for the data parameter, but received:',
              data
            )
            return []
          }

          const startIndex = data.findIndex((item: any) => item.month === 1)

          if (startIndex === -1) return data
          const rearranged = [
            ...data.slice(startIndex),
            ...data.slice(0, startIndex)
          ]
          return rearranged
        }
        const arrangeAssessmentBarChart = rearrangeArray(res?.data)
        const completed = arrangeAssessmentBarChart?.map((d) => d.avgPercentage)
        // const inCompleted = arrangeAssessmentBarChart?.map((d) => d.unattempted)

        setCompletedBarChart(completed)
        // setInCompletedBarChart(inCompleted)
      })
      .catch((error) => console.log(error))
  }, [])
  useEffect(() => {
    getStudentTestcounts()
      .then((res) => {
        setChartCounts(res?.data)
      })
      .catch((error) => console.log(error))
  }, [])
  useEffect(() => {
    setAssignedTestLoader(true)
    getStudentTestDetails(tableTabActive)
      .then((res) => {
        setassesmentTableDetials(res?.data)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setAssignedTestLoader(false)
      })
  }, [tableTabActive])

  const filteredTest = assignedTest?.filter((item) =>
    moment(item.test_start_time).isSameOrAfter(moment(), 'day')
  )

  const totalTestCount =
    chartCounts?.attemptedCount + chartCounts?.unattemptedCount
  const getCurrentDateTime = () => {
    return new Date().toISOString()
  }

  const currentDateTime = getCurrentDateTime()
  const handleChange = () => {
    if (testDetail?.test_start_time) {
      const now = new Date()
      const startTime = new Date(testDetail?.test_start_time)
      if (now > startTime) {
        setIsStarted(true),
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
  }
  return (
    <PageContainer scroll>
      <AssessmentFlex>
        <SummaryGraphs style={{ alignItems: 'center' }}>
          <ColumnApexChart01
            height={380}
            data={[
              {
                name: 'Attempted Test',
                data: completedBarChart
              }
            ]}
          />
        </SummaryGraphs>
        <TwoDiv>
          <AssesmentContainerWrapper style={{ height: '190px', width: '100%' }}>
            <Font12>Attempeted Test</Font12>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Font14 style={{ fontSize: '30px', paddingLeft: '10px' }}>
                {chartCounts?.attemptedCount} <span>Nos</span>
              </Font14>
              <ApexChart7
                Count={(chartCounts?.attemptedCount / totalTestCount) * 100}
                Color={'#09F8FF'}
                BackColor={'#a1f2f5'}
                Height={170}
                Width={170}
              />
            </div>
          </AssesmentContainerWrapper>
          <AssesmentContainerWrapper style={{ height: '190px', width: '100%' }}>
            <Font14>UnAttempeted Test</Font14>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Font14 style={{ fontSize: '30px', paddingLeft: '10px' }}>
                {chartCounts?.unattemptedCount} <span>Nos</span>
              </Font14>
              <ApexChart7
                Count={(chartCounts?.unattemptedCount / totalTestCount) * 100}
                Color={'#09F8FF'}
                BackColor={'#a1f2f5'}
                Height={170}
                Width={170}
              />
            </div>
          </AssesmentContainerWrapper>
        </TwoDiv>
      </AssessmentFlex>
      <AssessmentFlex className="mt-3">
        <AssesmentContainerWrapper style={{ width: '30%', height: '600px' }}>
          <TableTitle style={{ marginBottom: '10px' }}>
            <TestTitle>Upcoming Test</TestTitle>
            <Icons onClick={() => {}}>
              <DotArrowIcon />
            </Icons>{' '}
          </TableTitle>
          <AssignmentList style={{ height: '450px' }}>
            {loading ? (
              <Spinner
                style={{
                  width: '30px',
                  height: '30px',
                  color: `${BlueButton}`
                }}
                animation={'border'}
              />
            ) : filteredTest?.length > 0 ? (
              filteredTest
                ?.filter((data) => data?.attempted === false)
                ?.map((data, index) => {
                  const colorKey =
                    Object.keys(color)[index % Object.keys(color)?.length]
                  const currentColor: any = color[colorKey]
                  const iconColor: any = IconColor[colorKey]
                  return (
                    <Assessment
                      key={index}
                      data={data}
                      index={index}
                      length={assignedTest?.length}
                      currentColor={currentColor}
                      iconColor={iconColor}
                      handleChangeAssessment={() => {
                        const now = new Date()
                        const startTime = new Date(data?.test_start_time)
                        if (now < startTime) {
                          CustomToastMessage(
                            `Test  will start on ${moment(
                              data?.test_start_time
                            ).format('Do MMM, YYYY, h:mm A')}`,
                            'error'
                          )
                        } else {
                          dispatch(
                            AssignedTestDetail({
                              limit: 100,
                              page: 1,
                              // courseId: data.course_id,
                              testId: data._id
                            })
                          )
                          setTestDetail(data)

                          setPopup(!show)
                        }
                      }}
                      selectedAssessmentId={''}
                    />
                  )
                })
            ) : (
              <Nodata>No Data Available</Nodata>
            )}
          </AssignmentList>
        </AssesmentContainerWrapper>{' '}
        <AssesmentContainerWrapper style={{ width: '70%', height: '600px' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <AssesmentTableTabWrapper
              active={tableTabActive === 'completed'}
              onClick={() => {
                settableTabActive('completed')
              }}
            >
              Attempted
            </AssesmentTableTabWrapper>
            <AssesmentTableTabWrapper
              active={tableTabActive === 'overdue'}
              onClick={() => {
                settableTabActive('overdue')
              }}
            >
              UnAttempted
            </AssesmentTableTabWrapper>
          </div>

          <TableWrapper style={{ width: '100%' }}>
            <Table>
              <TableHeader>
                <TableRowHead>
                  <td style={{ textAlign: 'center' }}>Test Name</td>
                  <td style={{ textAlign: 'center' }}>Duration</td>
                  <td style={{ textAlign: 'center' }}>Time</td>
                  <td style={{ textAlign: 'center' }}>Marks</td>
                  {tableTabActive === 'completed' ? (
                    <td style={{ textAlign: 'center' }}>Result</td>
                  ) : (
                    ''
                  )}
                </TableRowHead>
              </TableHeader>
              {assignedTestLoader ? (
                <Spinner
                  style={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 auto',
                    color: `${BlueButton}`
                  }}
                  animation={'border'}
                />
              ) : (
                <tbody>
                  {assesmentTableDetials?.map((data: any, index: any) => {
                    return (
                      <TableRowBody key={index}>
                        <TD>{data?.institute_test_name}</TD>
                        <TD>{data?.test_duration} mins</TD>
                        <TD>{data?.total_marks}</TD>
                        <TD>{data?.total_marks}</TD>
                        {tableTabActive === 'completed' ? (
                          <TD
                            onClick={() => {
                              history.push({
                                pathname: `${ROUTES_V2.STUDENT_ANALYTICS}/${data?._id}`
                              })
                            }}
                            style={{
                              textAlign: 'center',
                              cursor: 'pointer',
                              color: '#1376B9'
                            }}
                          >
                            view
                          </TD>
                        ) : (
                          ''
                        )}
                      </TableRowBody>
                    )
                  })}
                </tbody>
              )}
            </Table>
          </TableWrapper>
        </AssesmentContainerWrapper>
        {show && (
          <TestDetailPopup>
            <TestDetailContainer ref={popupRef} style={{ width: '400px' }}>
              <Flex gap="16px" direction="column" alignItems="flex-start">
                <TestDetailPara fontWeight={500} fontSize="24px">
                  {testDetail?.institute_test_name}
                </TestDetailPara>
                <div>
                  <Flex
                    gap="18px"
                    wrap={true}
                    style={{ paddingBottom: '16px' }}
                  >
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
              <Flex justifyContent="center">
                <Button
                  onClick={handleChange}
                  aria-disabled={isStarted}
                  to={`#`}
                >
                  Start Test
                </Button>
              </Flex>
            </TestDetailContainer>
          </TestDetailPopup>
        )}
      </AssessmentFlex>
    </PageContainer>
  )
}

export default StudentAssessment
