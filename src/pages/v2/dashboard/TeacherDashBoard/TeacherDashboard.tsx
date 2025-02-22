import {
  Flex,
  Icons,
  MenuBar,
  TableTitle,
  TableTitleText,
  Test,
  AlignGraphOne,
  Flex1
} from './styledComponents'
import { ReactComponent as DotArrowIcon } from '../../../../assets/svg/dotArrow.svg'
import ListView from '../../../../components/V2/Form/ReviewList/ReviewList'
import { useHistory } from 'react-router'
import ROUTES_V2 from '../../../../const/V2/routes'
import { useEffect, useState } from 'react'
import {
  getAllAssesmentTestType,
  getAllReviewAssignmentData,
  getNewAllTestData,
  getTeacherAssesmentDashboardApi,
  getTeacherDashboardApi
} from '../../../../helpers/V2/apis'
import { ReactComponent as AddTeacherIcon } from '../../../../assets/svg/add-teacher.svg'
import { EmptyContainer } from '../../../../components/V2/Form/NoData'
import GradeTabs from './GradeTab'
import LastestAssignment from './LatestAssignment'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import ApexChart5 from './TeacherAssignmentGraph'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'

const TeachersDashboard = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const history = useHistory()

  const Teacherbatches = userInfoV2?.batches
  const [reviewAssignment, setReviewAssignment] = useState<any[]>([])
  const [selectedbatch, setSelectedBatch] = useState<any>()
  const [classAverage, setAssignClassAverage] = useState([])
  const [topStudentAverage, setAssignTopStudentAverage] = useState([])
  const [selectedTestType, setSelectedTestType] = useState<any>()
  const [selectedTestTypeOptions, setSelectedTestTypeOptions] = useState<any[]>(
    []
  )
  const [selectedTestTypeLoad, setIsselectedTestTypeLoad] = useState(false)
  const [assesmentClassAverage, setAssesmentclassAverage] = useState([])
  const [assesmentTopStudentAverage, setAssesmemtTopStudentAverage] = useState(
    []
  )
  const [latesstAssesment, setLatesstAssesment] = useState<any[]>([])

  const [assessmentMonths, setAssessmentMonths] = useState([
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ])
  const [asignmentMonths, setAsignmentMonths] = useState<string[]>([])

  const [isAssessmentLoading, setIsAssessmentLoading] = useState(false)
  const [isReviewAssignmentLoading, setIsReviewAssignmentLoading] =
    useState(false)
  const [isAssignmentLoading, setIsAssignmentLoading] = useState(false)
  const [isLatestAssessmentLoading, setIsLatestAssessmentLoading] =
    useState(false)

  useEffect(() => {
    if (userInfoV2?.batches.length > 0 && userInfoV2?.batches[0]?.batchId) {
      setSelectedBatch(userInfoV2?.batches[0]?.batchId)
    }
  }, [userInfoV2?.batches])

  const reviewAssignemnt = () => {
    history.push(ROUTES_V2.REVIEW_ASSIGNMENT)
  }

  const reviewAssessment = () => {
    history.push(ROUTES_V2.TESTS)
  }

  useEffect(() => {
    setIsselectedTestTypeLoad(true)
    getAllAssesmentTestType({
      page: 1,
      limit: 200
    })
      .then((data) => {
        const typeData = data.data.map((el: any) => {
          return {
            id: el,
            label: el,
            value: ''
          }
        })
        setSelectedTestType({ id: data?.data[0], label: data?.data[0] })
        setSelectedTestTypeOptions(typeData)
      })
      .finally(() => setIsselectedTestTypeLoad(false))
  }, [])

  useEffect(() => {
    if (selectedbatch) {
      setIsReviewAssignmentLoading(true)
      getAllReviewAssignmentData({
        page: 1,
        limit: 100,
        batchId: selectedbatch,
        forReview: true
      })
        .then((res) => {
          if (res) {
            const fiterData = res?.data?.filter(
              (data: any) => data.reviewCompleted === false
            )
            setReviewAssignment(fiterData)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsReviewAssignmentLoading(false))
    }
  }, [selectedbatch])

  useEffect(() => {
    if (selectedbatch) {
      setIsAssignmentLoading(true)
      getTeacherDashboardApi({
        batchId: selectedbatch
      })
        .then((res) => {
          const monthMap: { [key: number]: string } = {
            1: 'Jan',
            2: 'Feb',
            3: 'Mar',
            4: 'Apr',
            5: 'May',
            6: 'Jun',
            7: 'Jul',
            8: 'Aug',
            9: 'Sep',
            10: 'Oct',
            11: 'Nov',
            12: 'Dec'
          }

          const NewMonths: string[] = []
          const newClassAverage: any = res?.data?.map(
            (data: any) => data?.classAverage
          )
          const newTopStudentAverage: any = res?.data?.map(
            (data: any) => data?.topStudentAvg
          )

          res?.data?.map((list: any) => {
            const monthName = monthMap[list.month]
            if (monthName) {
              NewMonths.push(monthName)
            }
          })
          setAsignmentMonths(NewMonths)
          setAssignTopStudentAverage(newTopStudentAverage)
          setAssignClassAverage(newClassAverage)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsAssignmentLoading(false))
    }
  }, [selectedbatch])

  useEffect(() => {
    if (selectedbatch && selectedTestType?.id) {
      setIsAssessmentLoading(true)
      getTeacherAssesmentDashboardApi({
        batchId: selectedbatch,
        type: selectedTestType?.id
      })
        .then((res) => {
          if (res?.data) {
            const newClassAverage: any = []
            const newTopStudentAverage: any = []
            const NewAssessmentMonths: string[] = []

            const monthMap: { [key: number]: string } = {
              1: 'Jan',
              2: 'Feb',
              3: 'Mar',
              4: 'Apr',
              5: 'May',
              6: 'Jun',
              7: 'Jul',
              8: 'Aug',
              9: 'Sep',
              10: 'Oct',
              11: 'Nov',
              12: 'Dec'
            }

            res?.data?.map((list: any) => {
              newClassAverage.push(list.classAverage)
              newTopStudentAverage.push(list.topStudentAvg)

              const monthName = monthMap[list.month]
              if (monthName) {
                NewAssessmentMonths.push(monthName)
              }
            })

            setAssessmentMonths(NewAssessmentMonths)
            setAssesmentclassAverage(newClassAverage)
            setAssesmemtTopStudentAverage(newTopStudentAverage)
          }
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsAssessmentLoading(false))
    }
  }, [selectedbatch, selectedTestType?.id])

  useEffect(() => {
    if (selectedbatch) {
      setIsLatestAssessmentLoading(true)
      getNewAllTestData({
        limit: 10,
        batchIds: [selectedbatch]
      })
        .then((res) => {
          if (res?.data) {
            setLatesstAssesment(res?.data)
          }
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsLatestAssessmentLoading(false))
    }
  }, [selectedbatch])

  return (
    <MenuBar style={{ marginLeft: '0px' }}>
      <Flex1>
        <GradeTabs
          Batch={Teacherbatches}
          onClick={(data: any) => {
            setSelectedBatch(data)
          }}
          selectedBatch={selectedbatch}
        />
      </Flex1>
      <Flex1>
        <Test
          style={{
            marginRight: '26px',
            marginLeft: '16px',
            position: 'relative'
          }}
        >
          <Flex
            style={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <TableTitleText>Assessment Summary</TableTitleText>
            <SearchableDropdown
              style={{ width: '250px' }}
              isLoader={selectedTestTypeLoad}
              label={'Select Assesment Type'}
              placeHolder={'Please Select Assesment Type'}
              options={selectedTestTypeOptions}
              onSelect={(Type) => {
                setSelectedTestType(Type)
              }}
              selectedValue={selectedTestType}
              isClear={selectedTestType?.id ? true : false}
              required
              fullWidth
            />
          </Flex>
          <Flex style={{ width: '100%', height: '80%' }}>
            <AlignGraphOne style={{ marginTop: '20px' }}>
              {isAssessmentLoading && (
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    position: 'absolute',
                    top: '50%',
                    left: '45%'
                  }}
                  animation={'border'}
                />
              )}

              {assesmentClassAverage.length > 0 &&
              assesmentTopStudentAverage.length > 0 ? (
                <ApexChart5
                  classAverage={assesmentClassAverage}
                  topStudentAverage={assesmentTopStudentAverage}
                  categories={assessmentMonths}
                />
              ) : (
                !isAssessmentLoading && (
                  <EmptyContainer
                    icon={<AddTeacherIcon />}
                    text={'There are currently no assesments.'}
                  />
                )
              )}
            </AlignGraphOne>
          </Flex>
        </Test>

        <Test style={{ marginRight: '26px', marginLeft: '16px' }}>
          <TableTitle style={{ width: '100%', gap: '20px' }}>
            <TableTitleText>Assignment Summary</TableTitleText>
          </TableTitle>
          <Flex style={{ width: '100%', height: '80%', position: 'relative' }}>
            <AlignGraphOne style={{ marginTop: '20px' }}>
              {isAssignmentLoading && (
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    position: 'absolute',
                    top: '50%',
                    left: '45%'
                  }}
                  animation={'border'}
                />
              )}

              {classAverage?.length > 0 && topStudentAverage?.length > 0 && (
                <ApexChart5
                  classAverage={classAverage}
                  topStudentAverage={topStudentAverage}
                  categories={asignmentMonths}
                />
              )}
              {/* <TeacherAssignmentGraph inputData={assignmentGraphData} /> */}
            </AlignGraphOne>
          </Flex>
        </Test>
      </Flex1>
      <Flex1>
        <Test
          style={{
            marginRight: '26px',
            marginLeft: '16px',
            position: 'relative'
          }}
        >
          <TableTitle style={{ marginBottom: '10px', gap: '10px' }}>
            <TableTitleText>Review Assignments</TableTitleText>
            <Icons onClick={reviewAssignemnt}>
              <DotArrowIcon />
            </Icons>
          </TableTitle>
          {isReviewAssignmentLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '50%',
                left: '45%'
              }}
              animation={'border'}
            />
          )}
          {reviewAssignment?.length > 0 ? (
            <ListView list={reviewAssignment} />
          ) : (
            <EmptyContainer
              icon={<AddTeacherIcon />}
              text={'There are currently no assignments to review.'}
            />
          )}
        </Test>

        <Test
          style={{
            marginRight: '26px',
            marginLeft: '16px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <TableTitle style={{ marginBottom: '10px', gap: '10px' }}>
            <TableTitleText>Latest Assessments</TableTitleText>
            <Icons onClick={reviewAssessment}>
              <DotArrowIcon />
            </Icons>
          </TableTitle>
          {isLatestAssessmentLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '50%',
                left: '45%'
              }}
              animation={'border'}
            />
          )}
          {latesstAssesment?.length > 0 ? (
            <LastestAssignment TabData={latesstAssesment} />
          ) : (
            !isLatestAssessmentLoading && (
              <EmptyContainer
                icon={<AddTeacherIcon />}
                text={'There are currently no assesments.'}
              />
            )
          )}
        </Test>
      </Flex1>
    </MenuBar>
  )
}

export default TeachersDashboard
