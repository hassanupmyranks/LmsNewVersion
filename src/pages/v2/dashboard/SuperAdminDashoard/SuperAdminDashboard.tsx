import {
  MenuBar,
  Teachers,
  Barheader,
  Barheadtext,
  Icons,
  Flex,
  AlignGraphOne,
  Flex2,
  Count,
  CountValue,
  CountsWrapper,
  Count2,
  Content2New,
  Batch,
  // Heading14700,
  TopPerformersContainer,
  TabContainer,
  Tab
} from './styledComponents'
import ListView from '../../../../components/V2/ListMenu/List'
// import TrendExam from '../../../../components/V2/ExamMenu/Exam'
// import ApexChart1 from '../GraphOne'
// import ApexChart2 from '../HorizontalBarChart'
// import ApexChart3 from '../VerticalBarChart'
// import ApexChart4 from '../circleChart'
// import { ReactComponent as InstituteIcon } from '../../../../assets/svg/institutes-icon.svg'
// import NoImage from '../../../../assets/NoLogo.png'
import { ReactComponent as AddTeacherIcon } from '../../../../assets/svg/add-teacher.svg'
import {
  getAllBranchAPI,
  getAllInstituteAPI,
  getAllUserAPI,
  getCourses,
  getDashboardAvgScoresGraph,
  getDashboardSuperAdminAPI,
  getDashboardtopPerformers
} from '../../../../helpers/V2/apis'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import ROUTES_V2 from '../../../../const/V2/routes'
// import useOnClickOutside from '../../../../hooks/useOnClickOutside'
// import { DropdownPopup } from '../../../../components/V2/ListMenu/ListMenu'
// import { DropdownOption } from '../../../../components/V2/Table/PopupMenu'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
// import { TeacherName } from '../../student/assessment/dashboard/components/styledComponents'
import { NoData } from '../TeacherDashBoard/styledComponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { NewBranchDetails } from '../../../../utils/types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import {
  PageTitle,
  PageTitle2
} from '../../../../components/V2/Header/styledComponents'
import { EmptyContainer } from '../../../../components/V2/Form/NoData'
import ApexChart3 from '../VerticalBarChart'
// import ApexChart4 from '../circleChart'
import ListMenuForTopPerformers from '../../../../components/V2/ListMenu/ListMenuForTopPerformers'

interface TopPerformerslistData {
  _id: string
  totalScoredMarks: number
  totalAssignmentMarks: number
  totalAssessmentMarks: number
  studentId: string
  name: string
  profileImage: string
  courseName: string
  branchName: string
}

interface TopTopPerformersData {
  assessmentToppers: any[]
  assignmentToppers: any[]
}

interface TopPerformanceAvglistData {
  _id: string
  branchName: string
  totalAssignments: number
  branchId: string
  avgScoredMarks: number
  avgTotalMarks: number
  courseName: string
  courseId: string
}

const SuperAdminDashboard = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [TeacherList, setTeacherList] = useState([])
  const [activeUsers, setActiveUsers] = useState([])
  const [instituteListPage, setInstituteListPage] = useState(1)
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [instituteTotal, setInstituteTotal] = useState(0)
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [branchListPage, setBranchListPage] = useState(1)
  const [branchLoading, setBranchLoading] = useState(false)
  const [branchData, setBranchData] = useState<any[]>([])
  const [selectedBranch, setSelectedBranch] = useState<any>({
    id: '',
    label: ''
  })
  const [branchTotal, setBranchTotal] = useState(0)
  const [dataLoading, setDataLoading] = useState(false)
  const [selectedGradeTopPerformers, setSelectedGradeTopPerformers] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [selectedGradeAvgScore, setSelectedGradeAvgScore] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])

  const [activeTopPerformersTab, setActiveTopPerformersTab] = useState<
    'assessment' | 'assignment'
  >('assessment')
  const [activeAvgScoreTab, setActiveAvgScoreTab] = useState<
    'assessment' | 'assignment'
  >('assessment')
  const [topPerformersList, setTopPerformersList] = useState<any[]>([])
  const [topPerformersFulldata, setTopPerformersFulldata] = useState<
    TopTopPerformersData | any
  >()
  const [graphData, setGraphData] = useState<any>()

  const [topPerformanceAvgFulldata, setTopPerformanceAvgFulldata] =
    useState<any>()
  const [topPerformanceAvgList, setTopPerformanceAvgList] = useState<any[]>([])

  // const formatDate = (dateString: any) => {
  //   const months = [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec'
  //   ]
  //   const date = new Date(dateString)
  //   const day = date.getDate()
  //   const month = months[date.getMonth()]
  //   const year = date.getFullYear()
  //   return `${day}.${month}.${year}`
  // }

  const history = useHistory()

  const AddTeacherPage = () => {
    history.push(ROUTES_V2.ADD_TEACHER)
  }

  // const ExamPatterns = () => {
  //   history.push(ROUTES_V2.PATTERNS)
  // }
  // const [showDropDown, setShowDropDown] = useState(false)
  // const closeDropDown = () => {
  //   setShowDropDown(false)
  // }
  // const popupRef = useRef<HTMLDivElement>(null)
  // useOnClickOutside(popupRef, () => setShowDropDown(false))
  // const HandleView = () => {
  //   history.push(ROUTES_V2.TESTS)
  // }

  useEffect(() => {
    if (
      selectedInstitute?.id ||
      userInfoV2.role === 'instituteAdmin' ||
      userInfoV2.role === 'branchAdmin'
    ) {
      setDataLoading(true)
      getAllUserAPI({
        page: 1,
        limit: 200,
        role: 'teacher',
        instituteId:
          String(selectedInstitute?.id) || String(userInfoV2?.instituteId),
        branchId: selectedBranch?.id
          ? String(selectedBranch?.id)
          : userInfoV2?.branchId
          ? userInfoV2?.branchId
          : ''
      })
        .then((res) => {
          if (res && res.data) {
            setTeacherList(res.data)
          }
        })
        .finally(() => setDataLoading(false))
    }
  }, [userInfoV2, selectedInstitute?.id, selectedBranch?.id])

  useEffect(() => {
    let newGrade: any = []
    if (selectedBranch?.id || selectedInstitute?.id) {
      setGradeLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        instituteId: selectedInstitute?.id,
        branchId: selectedBranch?.id ? selectedBranch?.id : ''
      }
      getCourses(payload)
        .then((res: any) => {
          newGrade = res?.data?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setGradeData(newGrade)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }, [selectedBranch?.id, userInfoV2.role, selectedInstitute])

  useEffect(() => {
    let newInstitute: any = []
    if (userInfoV2.role === 'superAdmin') {
      setInsLoading(true)
      const payload = {
        page: 1,
        limit: 150
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
          setInstituteTotal(res.total)
          newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setInstituteData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))
    }
    if (userInfoV2.role === 'instituteAdmin') {
      getAllBranchAPI({
        page: 1,
        limit: 150,
        instituteId: userInfoV2.instituteId
      })
        .then((res: any) => {
          setBranchTotal(res.total)
          const newInstitute = res?.data?.map((item: NewBranchDetails) => {
            return {
              id: item._id,
              label: item.name
            }
          })
          setBranchData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
    if (userInfoV2.role === 'instituteAdmin') {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
    }
    if (userInfoV2.role === 'branchAdmin') {
      setSelectedBranch({
        id: userInfoV2.branchId,
        label: userInfoV2.branchName
      })
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
    }
  }, [userInfoV2])

  // const monthNames = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Oct',
  //   'Nov',
  //   'Dec'
  // ]

  let ActiveBranchNames: any = []
  if (selectedBranch?.id) {
    ActiveBranchNames = activeUsers?.map((item: any) => item?.courseName)
  } else {
    ActiveBranchNames = activeUsers?.map((item: any) => item?.branchName)
  }
  const studentCounts = activeUsers?.map((item: any) => item.studentCount)

  let BranchNamesFortopPerAvg: any = []
  if (selectedBranch?.id) {
    BranchNamesFortopPerAvg =
      topPerformanceAvgList && topPerformanceAvgList.length > 0
        ? topPerformanceAvgList?.map(
            (item: TopPerformanceAvglistData) => item.courseName
          )
        : []
  } else {
    BranchNamesFortopPerAvg =
      topPerformanceAvgList && topPerformanceAvgList.length > 0
        ? topPerformanceAvgList?.map(
            (item: TopPerformanceAvglistData) => item.branchName
          )
        : []
  }

  const AverageScores =
    topPerformanceAvgList && topPerformanceAvgList.length > 0
      ? topPerformanceAvgList?.map(
          (item: TopPerformanceAvglistData) => item.avgScoredMarks
        )
      : []

  // const lastObject: any = activeUsers?.slice(-1)[0]
  // const ActiveGrowthPercentage = lastObject?.growthPercentage
  // const count = lastObject?.count
  // const TestCreated = (graphData && graphData.createdTests) || []
  // const TestSubmitted = (graphData && graphData.submittedTests) || []
  // const PopularCourses = (graphData && graphData.popularCourses) || []
  // const TrendingExamPatterns =
  //   (graphData && graphData.trendingExamPatterns) || []
  // const [chartDimensions, setChartDimensions] = useState({
  //   width: window.innerWidth > 580 ? 350 : 240,
  //   height: window.innerWidth > 580 ? 220 : 200
  // })

  // const [chartDimensions2, setChartDimensions2] = useState({
  //   width: window.innerWidth > 410 ? 400 : 330,
  //   height: window.innerWidth > 410 ? 200 : 200
  // })
  // useEffect(() => {
  //   const handleResize = () => {
  //     setChartDimensions2({
  //       width: window.innerWidth > 410 ? 400 : 330,
  //       height: window.innerWidth > 410 ? 200 : 200
  //     })
  //   }
  //   window.addEventListener('resize', handleResize)
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  // const startMonth = 4
  // function rearrangeArray(data: any, startMonth: any) {
  //   if (!Array.isArray(data)) {
  //     console.error(
  //       'Expected an array for the data parameter, but received:',
  //       data
  //     )
  //     return []
  //   }
  //   const startIndex = data.findIndex((item: any) => item.month === startMonth)
  //   if (startIndex === -1) return data
  //   const rearranged = [...data.slice(startIndex), ...data.slice(0, startIndex)]
  //   return rearranged
  // }
  // const arrangecreatedTest = rearrangeArray(TestCreated, startMonth)
  // // const TestCreatedGraph = arrangecreatedTest?.map((item: any) => item.count)
  // const arrangesubmittedTest = rearrangeArray(TestSubmitted, startMonth)
  // const TestSubmittedGraph = arrangesubmittedTest?.map(
  //   (item: any) => item.count
  // )
  // const PopularCoursesNames = PopularCourses?.map((item: any) =>
  //   item.courseName === null ? 'No Name' : item.courseName
  // )
  // const PopularCoursesCount = PopularCourses?.map((item: any) => item.testCount)
  // const currentDate = new Date()
  // const currentYear = currentDate.getFullYear()
  // const currentMonth = currentDate.getMonth() + 1
  // const TestCreatedMonth = TestCreated?.filter(
  //   (item: any) => item.year === currentYear && item.month === currentMonth
  // )
  // const TestSubmittedMonth = TestSubmitted?.filter(
  //   (item: any) => item.year === currentYear && item.month === currentMonth
  // )
  // const countOfTestCreatedMonth =
  //   TestCreatedMonth?.length > 0 ? TestCreatedMonth[0].count : 0
  // const countOfTestSubmittedMonth =
  //   TestSubmittedMonth?.length > 0 ? TestSubmittedMonth[0].count : 0
  // const growthPercentageOfTestCreatedMonth =
  //   TestCreatedMonth?.length > 0 ? TestCreatedMonth[0].growthPercentage : 0
  // const growthPercentageOfTestSubmittedMonth =
  //   TestSubmittedMonth?.length > 0 ? TestSubmittedMonth[0].growthPercentage : 0

  // const names =
  //   userInfoV2.role == 'instituteAdmin'
  //     ? ['branches', 'batches']
  //     : userInfoV2.role == 'branchAdmin'
  //       ? ['batches']
  //       : ['institutes', 'branches', 'batches']

  // const label =
  //   userInfoV2.role == 'instituteAdmin'
  //     ? ['branches', 'class-sections']
  //     : userInfoV2.role == 'branchAdmin'
  //       ? ['class-sections']
  //       : ['ins / sch', 'branches', 'class-sections']

  // const counts = topPerformersList?.map((key) => graphData?.[key]?.count ?? 0)

  // const growthPercentage = topPerformersList.map(
  //   (key) => graphData?.[key]?.growthPercentage ?? 'Total'
  // )

  function calculatePercentage(part: number, total: number) {
    let percentage = Math.floor((part / total) * 100)
    return [percentage, 100 - percentage]
  }

  // const AnalyticsList = (id: any) => {
  //   history.push(`${ROUTES_V2.TEACHER_ANALYTICS}?id=${id}`)
  // }

  const handleScrollInfinite = (total: number, length: number) => {
    if (total > length) {
      setInstituteListPage(instituteListPage + 1)
      setInsLoading(true)
      const payload = {
        page: instituteListPage + 1,
        limit: 50
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
          const newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setInstituteData((prev) => [...prev, ...newInstitute])
        })
        .catch((err: any) => console.log(err))
        .finally(() => setInsLoading(false))
    }
  }

  const handleInfiniteScroll = (total: number, length: number) => {
    if (total > length) {
      setBranchListPage(branchListPage + 1)
      setBranchLoading(true)
      const payload = {
        page: branchListPage + 1,
        limit: 50
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          const newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setBranchData((prev) => [...prev, ...newInstitute])
        })
        .catch((err: any) => console.log(err))
        .finally(() => setBranchLoading(false))
    }
  }

  useEffect(() => {
    if (selectedInstitute?.id) {
      getDashboardSuperAdminAPI({
        instituteId: String(selectedInstitute?.id),
        branchId: selectedBranch?.id ? String(selectedBranch?.id) : ''
      })
        .then((res: any) => {
          setGraphData(res.data)
          if (selectedBranch?.id) {
            setActiveUsers(res.data?.gradeStudentCounts)
          } else {
            setActiveUsers(res.data?.branchStudentCounts)
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute, selectedBranch])

  useEffect(() => {
    if (selectedInstitute?.id && selectedGradeTopPerformers?.id) {
      getDashboardtopPerformers({
        courseId: String(selectedGradeTopPerformers?.id),
        instituteId: String(selectedInstitute?.id),
        branchId: selectedBranch?.id ? String(selectedBranch?.id) : ''
      })
        .then((res: any) => {
          setTopPerformersFulldata(res.data)
          setTopPerformersList(res.data?.assessmentToppers)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute, selectedGradeTopPerformers, selectedBranch])

  useEffect(() => {
    if (
      selectedInstitute?.id &&
      (selectedBranch?.id || selectedGradeAvgScore?.id)
    ) {
      getDashboardAvgScoresGraph({
        courseId: String(selectedGradeAvgScore?.id),
        instituteId: String(selectedInstitute?.id),
        branchId: selectedBranch?.id ? String(selectedBranch?.id) : ''
      })
        .then((res: any) => {
          setTopPerformanceAvgFulldata(res.data)
          if (selectedBranch?.id) {
            setTopPerformanceAvgList(res.data?.courseWiseAvgScoreAssessment)
          } else {
            setTopPerformanceAvgList(res.data?.branchWiseAvgScoreAssessment)
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute, selectedGradeAvgScore, selectedBranch])

  const handleTabForTopperformer = (activeTab: 'assessment' | 'assignment') => {
    setActiveTopPerformersTab(activeTab)
    if (activeTab === 'assignment') {
      setTopPerformersList(topPerformersFulldata?.assignmentToppers)
    } else {
      setTopPerformersList(topPerformersFulldata?.assessmentToppers)
    }
  }

  const handleTabForPerformanceAvg = (
    activeTab: 'assessment' | 'assignment'
  ) => {
    setActiveAvgScoreTab(activeTab)
    if (activeTab === 'assignment') {
      setTopPerformanceAvgList(
        selectedBranch?.id
          ? topPerformanceAvgFulldata?.courseWiseAvgScoreAssignment
          : topPerformanceAvgFulldata?.branchWiseAvgScoreAssignment
      )
    } else {
      setTopPerformanceAvgList(
        selectedBranch?.id
          ? topPerformanceAvgFulldata?.courseWiseAvgScoreAssessment
          : topPerformanceAvgFulldata?.branchWiseAvgScoreAssessment
      )
    }
  }

  const [resWidth, setResWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setResWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <MenuBar>
      {userInfoV2.role !== 'branchAdmin' && (
        <Flex2 style={{ gap: '10px', marginBottom: '20px' }}>
          {userInfoV2.role === 'superAdmin' && (
            <SearchableDropdown
              style={{ width: '290px' }}
              handleScrollInfinite={(first, second) => {
                handleScrollInfinite(first, second)
              }}
              total={instituteTotal}
              length={instituteData.length}
              isLoader={insLoading}
              label={'Select Institute / School'}
              placeHolder={'Please Select Institute / School'}
              options={instituteData}
              isClear={selectedInstitute?.id ? true : false}
              onSelect={(option) => {
                setGraphData('')
                setSelectedBranch({ id: '', label: '' })
                setBranchData([])
                setSelectedGradeTopPerformers({ id: '', label: '' })
                setSelectedGradeAvgScore({ id: '', label: '' })
                setActiveTopPerformersTab('assessment')
                setActiveAvgScoreTab('assessment')
                setTopPerformersFulldata({})
                setTopPerformersList([])
                setGradeData([])
                setSelectedInstitute(option)
                if (option?.id) {
                  setBranchLoading(true)
                  getAllBranchAPI({
                    page: 1,
                    limit: 150,
                    instituteId: option?.id
                  })
                    .then((res: any) => {
                      setBranchTotal(res.total)
                      const newInstitute = res?.data?.map(
                        (item: NewBranchDetails) => {
                          return {
                            id: item._id,
                            label: item.name
                          }
                        }
                      )
                      if (res.data.length <= 0) {
                        CustomToastMessage(
                          'There are no Branches under this Institite',
                          'error'
                        )
                      }
                      setBranchData(newInstitute)
                    })
                    .catch((err: any) =>
                      CustomToastMessage(err.message, 'error')
                    )
                    .finally(() => setBranchLoading(false))
                }
              }}
              selectedValue={selectedInstitute}
            />
          )}
          <SearchableDropdown
            style={{ width: '290px' }}
            handleScrollInfinite={(first, second) => {
              handleInfiniteScroll(first, second)
            }}
            total={branchTotal}
            length={branchData.length}
            isLoader={branchLoading}
            label={'Select Branch'}
            placeHolder={'Please Select Branch'}
            options={branchData}
            isClear={selectedBranch?.id ? true : false}
            onSelect={(option) => {
              setSelectedBranch(option)
              setActiveTopPerformersTab('assessment')
              setActiveAvgScoreTab('assessment')
              setSelectedGradeTopPerformers({ id: '', label: '' })
              setSelectedGradeAvgScore({ id: '', label: '' })
              setActiveTopPerformersTab('assessment')
              setActiveAvgScoreTab('assessment')
              setTopPerformersFulldata({})
              setTopPerformersList([])
              setGradeData([])
            }}
            selectedValue={selectedBranch}
          />
        </Flex2>
      )}
      {dataLoading && (
        <Spinner
          style={{
            width: '44px',
            height: '44px',
            color: `${BlueButton}`,
            position: 'absolute',
            top: '45%',
            left: '45%'
          }}
          animation={'border'}
        />
      )}
      {graphData ? (
        <Flex>
          <CountsWrapper>
            <Count>
              {' '}
              <Barheadtext style={{ color: '#0d6199', lineHeight: '26px' }}>
                Teacher Count
              </Barheadtext>
              <CountValue>{graphData?.teacherCount}</CountValue>
            </Count>
            <Count2>
              {' '}
              <Barheadtext style={{ color: '#0d6199', lineHeight: '26px' }}>
                Student Count
              </Barheadtext>
              <CountValue>{graphData?.studentCount}</CountValue>
            </Count2>
          </CountsWrapper>
          <Flex2>
            {graphData ? (
              // <Flex2>
              <Batch>
                <Flex
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Content2New>Overall Student Count</Content2New>
                  {/* <Content3New>
                  {typeof ActiveGrowthPercentage === 'number'
                    ? `${Math.round(ActiveGrowthPercentage)}%`
                    : ''}
                </Content3New> */}
                </Flex>
                <Flex style={{ display: 'flex' }}>
                  {/* <Content1>{count}</Content1>
                <Content2New style={{ margin: '15px 0px 0px 5px' }}>
                  Active Students
                </Content2New> */}
                </Flex>
                <AlignGraphOne>
                  <ApexChart3
                    width={resWidth}
                    Count={studentCounts}
                    Months={ActiveBranchNames}
                  />
                </AlignGraphOne>
              </Batch>
            ) : (
              // </Flex2>

              //       {/* <CardContainer>
              //   <InstituteImage
              //     src={'/assets/images/newinstitute.jpg'}
              //     onClick={() => {
              //       if (userInfoV2.role == 'instituteAdmin') {
              //         history.push(
              //           `${ROUTES_V2.ADD_INSTITUTE}/${userInfoV2.instituteId}`
              //         )
              //       }
              //       if (userInfoV2.role == 'branchAdmin') {
              //         history.push(
              //           `${ROUTES_V2.ADD_INSTITUTE}/${userInfoV2.branchId}`
              //         )
              //       }
              //     }}
              //   />
              //   <LogoContainer>
              //     <LogoImage
              //       src={
              //         DBInstitute?.logo && DBInstitute?.logo.startsWith('https')
              //           ? DBInstitute?.logo
              //           : NoImage
              //       }
              //       alt="img"
              //     />
              //   </LogoContainer>
              //   <DetailsContainer>
              //     <Heading>{DBInstitute?.name}</Heading>
              //     <LogoCountsContainer>
              //       <IconContainer>
              //         <InstituteIcon />
              //       </IconContainer>
              //       <Para>{`${DBInstitute?.teacherCount} teachers | ${DBInstitute?.branchCount} Branches | ${DBInstitute?.batchCount} Class-Sections`}</Para>
              //     </LogoCountsContainer>
              //   </DetailsContainer>
              // </CardContainer> */}
              //       {/* <Question>
              //     <WhiteBackground>
              //       <MyFlex>
              //         <FireLogoContainer>
              //           <FireLogo />
              //         </FireLogoContainer>
              //         <div>
              //           <Barheadtext style={{ fontSize: '18px', color: '#2B3674' }}>
              //             Latest Submitted Test
              //           </Barheadtext>
              //         </div>
              //       </MyFlex>
              //       {latestSubmittedTest?.length > 0 ? (
              //         <Heading20700>
              //           <div style={{ display: 'block' }}>
              //             <div
              //               style={{
              //                 fontSize: '16px',
              //                 lineHeight: '22px',
              //                 color: '#197BBD'
              //               }}
              //             >
              //               {latestSubmittedTest &&
              //                 latestSubmittedTest.length > 0 &&
              //                 latestSubmittedTest[0]?.testName}{' '}
              //             </div>
              //             <div
              //               style={{
              //                 fontSize: '14px'
              //               }}
              //             >
              //               {latestSubmittedTest &&
              //                 latestSubmittedTest.length > 0 &&
              //                 latestSubmittedTest[0]?.courseName}
              //             </div>
              //           </div>
              //           <div
              //             style={{ display: 'flex', justifyContent: 'flex-end' }}
              //           >
              //             <div
              //               style={{
              //                 fontSize: ' 12px',
              //                 color: '#798197'
              //               }}
              //             >
              //               {latestSubmittedTest &&
              //                 latestSubmittedTest.length > 0 &&
              //                 latestSubmittedTest[0]?.instituteName}{' '}
              //               -
              //             </div>
              //             <div
              //               style={{
              //                 fontSize: '12px',
              //                 color: '#798197',
              //                 marginLeft: '5px'
              //               }}
              //             >
              //               {latestSubmittedTest &&
              //                 latestSubmittedTest.length > 0 &&
              //                 latestSubmittedTest[0]?.branchName}
              //             </div>
              //           </div>
              //         </Heading20700>
              //       ) : (
              //         <Center>
              //           <NoData>No data Available</NoData>
              //         </Center>
              //       )}
              //     </WhiteBackground>
              //     <DimBackground>
              //       <MyFlex style={{ justifyContent: 'space-between' }}>
              //         <TeacherName style={{ marginRight: '10px' }}>
              //           {latestSubmittedTest &&
              //           latestSubmittedTest?.length > 0 &&
              //           latestSubmittedTest[0]?.testType === 'TEACHER_TEST'
              //             ? 'Teacher'
              //             : latestSubmittedTest[0]?.testType === 'SUPERADMIN_TEST'
              //             ? 'Super Admin'
              //             : latestSubmittedTest[0]?.testType ===
              //               'INSTITUTE_ADMIN_TEST'
              //             ? 'Institute Admin'
              //             : latestSubmittedTest[0]?.testType === 'BRANCH_ADMIN_TEST'
              //             ? 'Branch Admin'
              //             : ''}
              //         </TeacherName>
              //         <MyFlex>
              //           <ClockLogo />
              //           <Heading14700 style={{ marginRight: '5px' }}>
              //             {latestSubmittedTest &&
              //               latestSubmittedTest.length > 0 &&
              //               latestSubmittedTest[0]?.totalTestDuration}{' '}
              //             mins
              //           </Heading14700>
              //         </MyFlex>
              //         <Heading14700>
              //           {latestSubmittedTest &&
              //             latestSubmittedTest.length > 0 &&
              //             latestSubmittedTest[0]?.totalTestMarks}{' '}
              //           Marks
              //         </Heading14700>
              //       </MyFlex>
              //       <MyFlex
              //         style={{ marginTop: '20px', justifyContent: 'flex-end' }}
              //       >
              //         <ButtonV2
              //           onClick={() =>
              //             AnalyticsList(
              //               latestSubmittedTest &&
              //                 latestSubmittedTest.length > 0 &&
              //                 latestSubmittedTest[0]?.testId
              //             )
              //           }
              //         >
              //           Check Details
              //         </ButtonV2>
              //       </MyFlex>
              //     </DimBackground>
              //   </Question> */}
              ''
            )}
            {/* <Test>
            <Barheader>
              <Testbutton>
                <img
                  src={'/assets/images/calendar_today.svg'}
                  alt=""
                  style={{ marginRight: '5px' }}
                />
                <span style={{ lineHeight: '15px' }}>This month</span>
              </Testbutton>
              <Icons>
                <img src={'/assets/images/bar_chart.svg'} alt="" width="20px" />
              </Icons>
            </Barheader>
            <Flex style={{ display: 'flex', marginTop: '15px' }}>
              <GraphInfo>
                <GraphValue>
                  <Content1>{countOfTestCreatedMonth}</Content1>
                  <Content2>Test Created</Content2>
                  <Flex>
                    <Content3>
                      {growthPercentageOfTestCreatedMonth === null
                        ? 'Total \u2191'
                        : `${growthPercentageOfTestCreatedMonth.toFixed(2)}%`}
                    </Content3>
                    <AlignCreateSubmit>
                      <Create />
                    </AlignCreateSubmit>
                  </Flex>
                </GraphValue>
                <div>
                  <Content1>{countOfTestSubmittedMonth}</Content1>
                  <Content2>Test Submitted</Content2>
                  <Flex>
                    <Content3>
                      {growthPercentageOfTestSubmittedMonth === null
                        ? 'Total \u2191'
                        : `${growthPercentageOfTestSubmittedMonth.toFixed(2)}%`}
                    </Content3>
                    <AlignCreateSubmit>
                      <Submit />
                    </AlignCreateSubmit>
                  </Flex>
                </div>
              </GraphInfo>
              {graphData?.createdTests?.length > 0 ||
              graphData?.submittedTests?.length > 0 ? (
                <AlignGraphOne>
                  <ApexChart1
                    TestCreated={TestCreatedGraph}
                    TestSubmitted={TestSubmittedGraph}
                    Height={chartDimensions.height}
                    Width={chartDimensions.width}
                  />
                </AlignGraphOne>
              ) : (
                <Center>
                  <NoData>No data Available</NoData>
                </Center>
              )}
            </Flex>
          </Test> */}
            <Teachers>
              <Barheader style={{ margin: '0px 18px 15px 18px' }}>
                <Barheadtext style={{ fontSize: '18px', color: '#2B3674' }}>
                  Newly Added Teachers
                </Barheadtext>
                <Icons onClick={AddTeacherPage}>
                  <img
                    src={'/assets/images/add_circle.svg'}
                    alt=""
                    width="20px"
                  />
                </Icons>
              </Barheader>
              {TeacherList?.length > 0 ? (
                <ListView list={TeacherList} />
              ) : (
                <EmptyContainer
                  icon={<AddTeacherIcon />}
                  text={'No Teachers Added yet!'}
                />
              )}
            </Teachers>
          </Flex2>
          {/* <Institute>
            <Barheader style={{ margin: '0px 18px 0px 18px' }}>
              <Barheadtext style={{ fontSize: '18px', color: '#2B3674' }}>
                Trending Assessment Patterns
              </Barheadtext>
              <ViewButton
                style={{ color: '#197BBD', backgroundColor: '#ffff' }}
                onClick={ExamPatterns}
              >
                View All
              </ViewButton>
            </Barheader>
            {TrendingExamPatterns?.length > 0 ? (
              <TrendExam exam={TrendingExamPatterns} />
            ) : (
              // <Center>
              //   <NoData>No data Available</NoData>
              // </Center>
              <EmptyContainer
                icon={<AddTeacherIcon />}
                text={'No Assessment Patterns created yet!'}
              />
            )}
          </Institute> */}
          {/* <Course>
            <Barheader>
              <Barheadtext>Popular Courses</Barheadtext>
              <div>
                <Barheadtext1>Number of Total Exams created</Barheadtext1>
                <Icons>
                  <img
                    src={'/assets/images/bar_chart.svg'}
                    alt=""
                    width="20px"
                  />
                </Icons>
              </div>
            </Barheader>
            {graphData?.popularCourses?.length > 0 ? (
              <AlignGraphOne style={{ marginTop: '10px' }}>
                <ApexChart2
                  Names={PopularCoursesNames}
                  Count={PopularCoursesCount}
                  Height={chartDimensions2.height}
                  Width={chartDimensions2.width}
                />
              </AlignGraphOne>
            ) : (
              // <Center>
              //   <NoData>No data Available</NoData>
              // </Center>
              <EmptyContainer
                icon={<AddTeacherIcon />}
                text={'No Popular courses added yet!'}
              />
            )}
          </Course> */}
        </Flex>
      ) : (
        <Flex
          style={{
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {!dataLoading && (
            <PageTitle>
              Select an Institute to view Dashboard Analytics
            </PageTitle>
          )}
        </Flex>
      )}
      {/* <Flex> */}
      {/* <Utest>
          <Barheader style={{ marginBottom: '15px' }}>
            <Barheadtext style={{ color: '#2B3674' }}>
              Upcoming Tests
            </Barheadtext>
            {!showDropDown && (
              <Icons
                onClick={() => {
                  setShowDropDown(true)
                }}
              >
                <img
                  src={'/assets/images/HorizontalDots.svg'}
                  alt=""
                  width="20px"
                />
              </Icons>
            )}

            {showDropDown && (
              <DropdownPopup style={{ width: '95px' }} ref={popupRef}>
                <DropdownOption
                  style={{ padding: '6px', color: 'black', fontSize: '15px' }}
                  selected={'Edit'}
                >
                  <Flex
                    onClick={() => {
                      HandleView()
                      closeDropDown()
                    }}
                  >
                    View All
                  </Flex>
                </DropdownOption>
              </DropdownPopup>
            )}
          </Barheader>
          {TestList?.length > 0 ? (
            <TableWrapper>
              <Table>
                <TableHeader>
                  <TableRowHead>
                    {headertabel?.map((header, index) => (
                      <td
                        style={{ textAlign: 'left' }}
                        key={`complete-session-header-${index}`}
                      >
                        {header}
                      </td>
                    ))}
                  </TableRowHead>
                </TableHeader>
                <tbody>
                  {TestList?.map((item: any, index: any) => (
                    <TableRowBody key={index}>
                      <TD>{item?.institute_test_name}</TD>
                      <TD>
                        {item?.questions_added_for_test ? (
                          <Completed>Completed</Completed>
                        ) : (
                          <Pending>Pending</Pending>
                        )}
                      </TD>
                      <TD>{item?.total_marks}</TD>
                      <TD>
                        {item?.createdAt
                          ? formatDate(item?.createdAt)
                          : 'undefined'}
                      </TD>
                    </TableRowBody>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          ) : (
            <Center>
              <NoData>No data Available</NoData>
            </Center>
          )}
        </Utest> */}
      {selectedInstitute?.id && graphData && (
        <Flex2>
          <Batch style={{ height: '450px' }}>
            <Flex
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                flexDirection: 'row',
                gap: '10px'
              }}
            >
              {' '}
              <Barheadtext
                style={{
                  fontSize: '18px',
                  color: '#2B3674',
                  // width: '130px',
                  display: 'flex',
                  textAlign: 'center',
                  marginLeft: '10px'
                }}
              >
                Top Performers
              </Barheadtext>
              {/* <Heading14700>Top performers</Heading14700> */}
              <SearchableDropdown
                style={{
                  width: '200px',
                  marginTop: '6px',
                  marginRight: '10px'
                }}
                isLoader={gradeLoading}
                label={'Select Grade'}
                placeHolder={'Please Select Grade'}
                options={gradeData}
                isClear={selectedGradeTopPerformers?.id ? true : false}
                onSelect={(option: any) => {
                  setSelectedGradeTopPerformers(option)
                }}
                selectedValue={selectedGradeTopPerformers}
              />
            </Flex>
            {selectedGradeTopPerformers?.id ? (
              <>
                <Flex>
                  <TabContainer>
                    <Tab
                      onClick={() => handleTabForTopperformer('assessment')}
                      active={activeTopPerformersTab === 'assessment'}
                    >
                      {' '}
                      Assessment Toppers
                    </Tab>
                    <Tab
                      onClick={() => handleTabForTopperformer('assignment')}
                      active={activeTopPerformersTab === 'assignment'}
                    >
                      Assignment Toppers
                    </Tab>
                  </TabContainer>
                </Flex>
                {(topPerformersList && topPerformersList.length) > 0 ? (
                  <TopPerformersContainer>
                    {topPerformersList.map(
                      (item: TopPerformerslistData, ind) => (
                        <ListMenuForTopPerformers
                          key={`ind_${ind}`}
                          firstName={item.name}
                          courseName={item.courseName}
                          branchName={item.branchName}
                          profileImage={item.profileImage}
                          // Names={label}
                          // Count={counts}
                          percentages={calculatePercentage(
                            item.totalScoredMarks,
                            item.totalAssignmentMarks
                          )}
                          DataRole={userInfoV2.role}
                        />
                      )
                    )}
                  </TopPerformersContainer>
                ) : (
                  <PageTitle2>No data for {activeTopPerformersTab}</PageTitle2>
                )}
              </>
            ) : (
              <NoData
                style={{
                  height: '330px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Select a Grade to view Top Performers
              </NoData>
            )}
          </Batch>

          <Batch style={{ height: '450px' }}>
            <Flex
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                flexDirection: 'row',
                gap: '10px'
              }}
            >
              <Barheadtext
                style={{
                  fontSize: '18px',
                  color: '#2B3674',
                  width: '100%',
                  display: 'flex',
                  textAlign: 'center',
                  marginLeft: '10px'
                }}
              >
                Branch wise Top Performance Average
              </Barheadtext>
              {/* <Heading14700>Branch wise Top Performance Average </Heading14700> */}
              {!selectedBranch?.id && (
                <SearchableDropdown
                  style={{ width: '200px', marginRight: '10px' }}
                  isLoader={gradeLoading}
                  label={'Select Grade'}
                  placeHolder={'Please Select Grade'}
                  options={gradeData}
                  isClear={selectedGradeAvgScore?.id ? true : false}
                  onSelect={(option: any) => {
                    setSelectedGradeAvgScore(option)
                    setActiveAvgScoreTab('assessment')
                  }}
                  selectedValue={selectedGradeAvgScore}
                />
              )}
              {/* <Content3New>
                {typeof ActiveGrowthPercentage === 'number'
                  ? `${Math.round(ActiveGrowthPercentage)}%`
                  : ''}
              </Content3New> */}
            </Flex>
            {selectedGradeAvgScore?.id || selectedBranch?.id ? (
              <>
                <Flex>
                  <TabContainer>
                    <Tab
                      onClick={() => handleTabForPerformanceAvg('assessment')}
                      active={activeAvgScoreTab === 'assessment'}
                    >
                      {' '}
                      Assessment Average Scores
                    </Tab>
                    <Tab
                      onClick={() => handleTabForPerformanceAvg('assignment')}
                      active={activeAvgScoreTab === 'assignment'}
                    >
                      Assignment Average Scores
                    </Tab>
                  </TabContainer>
                </Flex>
                <AlignGraphOne>
                  {AverageScores.length > 0 ? (
                    <ApexChart3
                      Count={AverageScores}
                      Months={BranchNamesFortopPerAvg}
                    />
                  ) : (
                    <PageTitle2>No data for {activeAvgScoreTab}</PageTitle2>
                  )}
                </AlignGraphOne>
              </>
            ) : (
              <NoData
                style={{
                  height: '330px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                Select an Grade to view Top Performance Average
              </NoData>
              // <PageTitle2>
              //   Select an Grade to view Top Performance Average
              // </PageTitle2>
            )}
          </Batch>
        </Flex2>
      )}
    </MenuBar>
  )
}

export default SuperAdminDashboard
