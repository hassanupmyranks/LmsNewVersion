import { PageContainer } from '../../../../components/V2/styledComponents'
import {
  Between,
  BlockSpace,
  FirstRow,
  Flex,
  FlexEnd,
  Font12,
  Font14,
  Font25,
  Heading,
  Peformance,
  Select,
  SummaryGraphs,
  TabMenuContainer,
  UpArrow
} from './styledComponents'
import { ReactComponent as FireIcon } from '../../../../assets/fire.svg'
import { ReactComponent as CircleIcon } from '../../../../assets/design-circles.svg'
import {
  AvgScore,
  BigCircle,
  BlockAlign,
  DotLine,
  Icons,
  LatestTest,
  Marks,
  Nodata,
  SmallCircle,
  SmallCom,
  TableTitle,
  TestName,
  TestTitle
} from '../TeacherDashBoard/styledComponents'
import { ReactComponent as DotArrowIcon } from '../../../../assets/svg/dotArrow.svg'
import ApexChart7 from '../PieChart'
import ApexChart9 from '../SimpleGraph'
import { useEffect, useState } from 'react'
import {
  getAllReviewAssignmentData,
  getAssignedTest,
  getStudentAssignmentTypeBarChart,
  getStudentDashboardAPI,
  getStudentSubjectAverage,
  getStudentTestCount,
  getSubjectsDataCourseId
} from '../../../../helpers/V2/apis'
import moment from 'moment'
import Maths from '../../../../assets/MathsLogo.png'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import ApexChart10 from '../LineChartCommon'
// import ColumnApexChart01 from '../../student/assignments/components/ColumnCommonChart'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { AssignmentsData } from '../../student/assignments/types'
import { AssignedTest } from '../../student/assessment/dashboard/types'

const StudentsDashboard = () => {
  const [completedTestCount, setCompletedTestCount] = useState<any>([])
  const [subjectData, setSubjectData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [assignedTest, setAssignedTest] = useState<AssignedTest[]>([])
  const [inCompletedTestCount, setInCompletedTestCount] = useState<any>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [assignments, setAssignments] = useState<AssignmentsData[]>([])
  const [, setvideodata] = useState<any>([])
  const history = useHistory()
  const [subjectScore, setsubjectScore] = useState<any>({
    subjectName: 'No Subject',
    marksPercentage: 0,
    correctAnswers: 0,
    totalMarks: 0,
    scoredMarks: 0,
    incorrecctAnswers: 0,
    skippedAnswers: 0
  })

  useEffect(() => {
    getAssignedTest({ page: 1, limit: 200 })
      .then((res) => {
        setAssignedTest(res.data)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))

    getStudentDashboardAPI({
      page: 1,
      limit: 250
    }).then((res) => {
      if (res) {
        if (res?.data?.submittedTests?.[0] != undefined) {
          setSubmitedTest(res?.data?.submittedTests)
        }

        setUpcomingTest(res?.data?.upcomingTests)
        setPerformance({
          overallPerformance: res?.data?.overallPerformance
            ? Math.round(res?.data?.overallPerformance)
            : 0,
          maxAveragePercentage: res?.data?.maxAveragePercentage
            ? Math.round(res?.data?.maxAveragePercentage)
            : 0,
          classAveragePercentage: res?.data?.classAveragePercentage
            ? Math.round(res?.data?.classAveragePercentage)
            : 0,
          studentPercentages: res?.data?.studentPercentages?.map(
            (data: any) => data.percentageScore
          )
        })
        setSummeryData(res?.data?.assignmentsSubmitted)

        const course = res?.data?.trendingCourses?.map((data: any) => {
          let percentage =
            (data.publishedChaptersCount / data.totalChapters) * 100
          return {
            SubjectLogo: data.subjectIcon || Maths,
            SubjectName: data.subjectName,
            LessonStatus: `${data.publishedChaptersCount} of ${data.totalChapters}`,
            LessonPercent: percentage,
            _id: data.subjectId,
            graphColor:
              percentage <= 25
                ? '#D83547'
                : percentage <= 50
                ? '#3D7587'
                : percentage <= 75
                ? '#faa405'
                : percentage <= 100
                ? '#08f563'
                : ''
          }
        })

        if (res?.data?.topSubjectScore) {
          setsubjectScore(res?.data?.topSubjectScore)
        }

        setTrendCourse(course)
        setInstituteTest(res?.data?.monthWiseCountInstituteTest)
        setpracticeTest(res?.data?.monthWiseCountPracticeTest)
        setSummaryTest({
          percentage: Math.round(res?.data?.submittedTestsPercentage),
          total: res?.data?.submittedTestsCount
        })
      }
    })

    getStudentTestCount().then((res) => {
      function rearrangeArray(data: any) {
        if (!Array.isArray(data)) {
          console.error(
            'Expected an array for the data parameter, but received:',
            data
          )
          return [] // Return an empty array if the data isn't an array
        }

        const startIndex = data?.findIndex((item) => item.month === 1)

        if (startIndex === -1) return data // If no such month is found, return the data as is

        const rearranged = [
          ...data.slice(startIndex),
          ...data.slice(0, startIndex)
        ]
        return rearranged
      }

      const arrangecreatedTest = rearrangeArray(res?.data)

      // Ensure arrangecreatedTest is an array before attempting to map
      if (arrangecreatedTest && Array.isArray(arrangecreatedTest)) {
        setCompletedTestCount(arrangecreatedTest.map((d) => d?.completed || 0))
        setInCompletedTestCount(
          arrangecreatedTest.map((d) => d?.unattempted || 0)
        )
      } else {
        console.error(
          'arrangecreatedTest is invalid or not an array:',
          arrangecreatedTest
        )
      }
    })

    const payload = {
      page: 1,
      limit: 200
    }
    getSubjectsDataCourseId(payload)
      .then((res) => {
        const newSubject = res?.data?.map((item: any) => {
          return {
            id: item._id,
            label: item.name,
            value: ''
          }
        })
        setSubjectData((prev) => [...prev, ...newSubject])
      })
      .catch((err) => CustomToastMessage(err.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    getAllReviewAssignmentData({
      page: 1,
      limit: 50
    })
      .then((res) => {
        if (res) {
          setAssignments(res.data)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }, [])

  useEffect(() => {
    if (selectedSubjectId) {
      getStudentSubjectAverage(selectedSubjectId)
        .then((res) => {
          console.log(res)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
    }

    getStudentAssignmentTypeBarChart()
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
        const arrangeAssignment = rearrangeArray(res?.data)
        // const audio = arrangeAssignment?.map((d) => d?.audio)
        // const video = arrangeAssignment?.map((d) => d?.video)
        // const ppt = arrangeAssignment?.map((d) => d?.presentation)
        // const pro = arrangeAssignment?.map((d) => d?.project)
        setvideodata(arrangeAssignment)

        // setaudioData(audio)
        // setpptxData(ppt)
        // setprojectData(pro)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
  }, [selectedSubjectId])

  const [submitedTest, setSubmitedTest] = useState<any>([
    {
      _id: '0',
      testName: 'No Test Avalible',
      totalTestMarks: 0,
      percentageScore: 0
    }
  ])

  const [, setUpcomingTest] = useState([
    {
      _id: '0',
      institute_test_name: 'No Test Avalible',
      test_duration: 0,
      test_start_time: 0,
      studentPercentages: [0]
    }
  ])

  const [performance, setPerformance] = useState({
    overallPerformance: 0,
    maxAveragePercentage: 0,
    classAveragePercentage: 0,
    studentPercentages: [0]
  })
  const [, setSummeryData] = useState({
    percentage: 0,
    total: 0
  })
  const [, setSummaryTest] = useState<any>({
    percentage: 0,
    total: 0
  })

  const [, setTrendCourse] = useState<any>([
    {
      SubjectLogo: '',
      SubjectName: '',
      LessonStatus: '0 of 0',
      LessonPercent: '0',
      graphColor: '',
      _id: '0'
    }
  ])
  const [, setInstituteTest] = useState<any>([
    {
      year: 0,
      month: 0,
      count: 0
    }
  ])
  const [, setpracticeTest] = useState<any>([
    {
      subjectName: 'Maths-1',
      courseName: 'NEET',
      createdAt: '50',
      topicName: 'Compounds',
      year: 0,
      month: 0,
      count: 0
    }
  ])

  const filteredTest = assignedTest?.filter((item) =>
    moment(item.test_start_time).isSameOrAfter(moment(), 'day')
  )

  return (
    <PageContainer scroll>
      <FirstRow>
        <Peformance style={{ paddingTop: '18px' }}>
          <Between>
            <BlockSpace style={{ paddingTop: '7px' }}>
              <Flex style={{ width: '125px', flexDirection: 'row' }}>
                <Font14> Overall Assessment Average</Font14>
                <FireIcon />
              </Flex>
              <Flex>
                <UpArrow> &uarr;</UpArrow>
                <Font12 style={{ marginTop: '5px' }}>
                  Topper {performance.maxAveragePercentage}% <br /> Class
                  average {performance.classAveragePercentage}%
                </Font12>
              </Flex>
            </BlockSpace>
            <FlexEnd>
              <Flex style={{ margin: '20px' }}>
                <Font25 style={{ lineHeight: '25px', marginRight: '10px' }}>
                  {performance?.overallPerformance}%
                </Font25>
                <CircleIcon style={{ marginRight: '5px' }} />
              </Flex>
              <div>
                <ApexChart9
                  TestSubmitted={performance?.studentPercentages}
                  Height={80}
                  Width={120}
                />
              </div>
            </FlexEnd>
          </Between>
        </Peformance>

        <Peformance style={{ padding: '6px 0px 6px 20px' }}>
          <Between>
            <BlockSpace style={{ padding: '21px 0px 12px 0px' }}>
              <Font14 style={{ width: '115px' }}>
                Overall Assessment Subject Average
              </Font14>
              <Font25>
                {subjectScore?.subjectName}{' '}
                {subjectScore?.marksPercentage.toFixed(2)}%
              </Font25>
            </BlockSpace>
            <BlockSpace style={{ padding: '21px 0px 12px 0px', margin: '3px' }}>
              <Select className="custom-select">
                {isLoading ? (
                  <Spinner animation={'border'} />
                ) : (
                  <Select className="custom-select" key={`key_${isLoading}`}>
                    {/* <select onChange={(e) => setSelectedSubjectId(e.target.value)}
                    > */}
                    <select
                      onBlur={(e) => setSelectedSubjectId(e.target.value)}
                    >
                      {subjectData?.map((data) => (
                        <>
                          <option value={data?.id} key={`key_${data.id}`}>
                            {data?.label}
                          </option>
                        </>
                      ))}
                    </select>
                  </Select>
                )}
              </Select>
              <ApexChart7
                Count={subjectScore?.marksPercentage?.toFixed(2)}
                Color={'#09F8FF'}
                BackColor={'#fff'}
                Height={150}
                Width={140}
              />
            </BlockSpace>
          </Between>
        </Peformance>
      </FirstRow>
      <Heading>Summary of Assessment</Heading>
      <Flex style={{ width: '100%', gap: '20px' }}>
        <SummaryGraphs style={{ alignItems: 'center' }}>
          <ApexChart10
            completed={completedTestCount}
            skipped={inCompletedTestCount}
          />
        </SummaryGraphs>
        <SmallCom>
          <TableTitle style={{ marginBottom: '15px' }}>
            <TestTitle>Upcoming Tests</TestTitle>
            <Icons
              onClick={() =>
                history.push({
                  pathname: `${ROUTES_V2.STUDENT_ASSESSMENT}`
                })
              }
            >
              <DotArrowIcon />
            </Icons>
          </TableTitle>
          <TabMenuContainer>
            {filteredTest.length > 0 ? (
              filteredTest?.map((data: any, index: any) => (
                <TableTitle key={`key_${index}`}>
                  {index == 0 ? (
                    <BlockAlign style={{ marginTop: '50px' }}>
                      <BigCircle>
                        <SmallCircle />
                      </BigCircle>
                      <DotLine />
                    </BlockAlign>
                  ) : index == filteredTest.length - 1 ? (
                    <BlockAlign style={{ marginBottom: '30px' }}>
                      <DotLine />
                      <BigCircle>
                        <SmallCircle />
                      </BigCircle>
                    </BlockAlign>
                  ) : (
                    <BlockAlign>
                      <DotLine />
                      <BigCircle>
                        <SmallCircle />
                      </BigCircle>
                      <DotLine />
                    </BlockAlign>
                  )}
                  <LatestTest>
                    <TableTitle>
                      <TestName>{data?.institute_test_name}</TestName>
                      <Marks style={{ marginTop: '5px' }}>
                        {data.total_marks || 0} Marks
                      </Marks>
                    </TableTitle>
                    <TableTitle style={{ marginTop: '5px' }}>
                      <AvgScore>
                        {' '}
                        {moment(data.test_start_time).format(
                          'DD MMM, YYYY'
                        )} - {moment(data.test_end_time).format('DD MMM, YYYY')}
                      </AvgScore>
                    </TableTitle>
                  </LatestTest>
                </TableTitle>
              ))
            ) : (
              <Nodata>No Data Available</Nodata>
            )}
          </TabMenuContainer>
        </SmallCom>
      </Flex>
      <Heading style={{ marginTop: '15px' }}>Summary of Assignment</Heading>
      <Flex style={{ width: '100%', gap: '20px' }}>
        <SummaryGraphs style={{ alignItems: 'center' }}>
          {/* <ColumnApexChart01
            height={380}
            data={[
              // {
              //   name: 'Audio',
              //   data: audioData
              // },
              {
                name: 'Video',
                data: videodata
              }
              // {
              //   name: 'Project',
              //   data: projectData
              // },
              // {
              //   name: 'Presentation',
              //   data: pptxData
              // }
            ]}
          /> */}
        </SummaryGraphs>
        <SmallCom>
          <TableTitle style={{ marginBottom: '10px' }}>
            <TestTitle>Upcoming Assignment</TestTitle>
            <Icons
              onClick={() =>
                history.push({
                  pathname: `${ROUTES_V2.STUDENT_ASSIGNMENT}`,
                  state: { isSubmittedTests: true }
                })
              }
            >
              <DotArrowIcon />
            </Icons>
          </TableTitle>
          <TabMenuContainer>
            {assignments?.length > 0 ? (
              assignments?.map((data: any, index: any) => (
                <TableTitle key={`key_${index}`}>
                  {index == 0 ? (
                    <BlockAlign style={{ marginTop: '50px' }}>
                      <BigCircle>
                        <SmallCircle />
                      </BigCircle>
                      <DotLine />
                    </BlockAlign>
                  ) : index == submitedTest.length - 1 ? (
                    <BlockAlign style={{ marginBottom: '30px' }}>
                      <DotLine />
                      <BigCircle>
                        <SmallCircle />
                      </BigCircle>
                    </BlockAlign>
                  ) : (
                    <BlockAlign>
                      <DotLine />
                      <BigCircle>
                        <SmallCircle />
                      </BigCircle>
                      <DotLine />
                    </BlockAlign>
                  )}
                  <LatestTest>
                    <TableTitle>
                      <TestName>{data.name}</TestName>
                      <Marks style={{ marginTop: '5px', fontSize: '15px' }}>
                        {moment(data.deadLine).format('Do MMM, YYYY')}
                      </Marks>
                    </TableTitle>
                    <TableTitle style={{ marginTop: '5px' }}>
                      {/* <AvgScore>Type - {data.type}</AvgScore> */}
                    </TableTitle>
                  </LatestTest>
                </TableTitle>
              ))
            ) : (
              <Nodata>No Data Available</Nodata>
            )}
          </TabMenuContainer>
        </SmallCom>
      </Flex>
    </PageContainer>
  )
}

export default StudentsDashboard
