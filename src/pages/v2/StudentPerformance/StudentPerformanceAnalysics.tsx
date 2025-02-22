import { useEffect, useState } from 'react'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { PageContainer } from '../../../components/V2/styledComponents'
import {
  ClassContainer,
  Flex,
  GradeLable,
  GraphContainer,
  Lable,
  Menucontainer,
  PageTitle,
  PercentageLable,
  SearchContainer
} from './StyledComponent'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
  getBatchAPI,
  getLearnCourseData,
  getStudentPerformanceAPI,
  getStudentPerformanceListAPI
} from '../../../helpers/V2/apis'
import { CourseDetailProps } from '../learn/types'
import { NewBatchDetails } from '../../../utils/types'
import PerformanceTable from './PerformanceTable'
import PerformanceChart from './PerformanceChart'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { Spinner } from 'react-bootstrap'

const defaultValues = {
  value: '',
  label: '',
  id: ''
}

// const defaultStudentPerformance = {
//   totalStudents: 'N/A',
//   assessmentAvg: '',
//   assignmentAvg: '',
//   classAvg: ''
// }

const StudentPerformance = () => {
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )
  const [selectedGrade, setSelectedGrade] = useState(defaultValues)
  const [gradeOptions, setGradeOptions] = useState<[]>([])
  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)
  const [selectedBatch1, setSelectedBatch1] = useState(defaultValues)
  const [batchApiLoading, setBatchApiLoading] = useState(false)
  const [studentPerfApiLoading, setStudentPerfApiLoading] = useState(false)
  const [batchOptions, setBatchOptions] = useState<any>([])
  const [studentPerformance, setStudentPerformance] = useState<any>([])
  const [studPerformanceList, setStudPerformanceList] = useState<any>([])
  const [graphData, setGraphData] = useState<any>()

  useEffect(() => {
    if (user.branchId) {
      SetIsCourseLoading(true)
      getLearnCourseData({
        page: 1,
        limit: 120,
        branchId: user.branchId
      })
        .then((res: CourseDetailProps[]) => {
          const options: any = res?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setGradeOptions(options)
          if (res.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
          SetIsCourseLoading(false)
        })
        .catch(() => SetIsCourseLoading(false))
    }
  }, [user.branchId])

  useEffect(() => {
    if (selectedGrade.id) {
      const payload = {
        page: 1,
        limit: 100,
        branchIds: [String(user.branchId)],
        courseId: selectedGrade.id,
        course: true
      }

      setBatchApiLoading(true)
      getBatchAPI(payload)
        .then((res) => {
          const newBatch = res?.data?.map((batch: NewBatchDetails) => {
            return {
              value: '',
              label: batch.name,
              id: batch?._id
            }
          })
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Batches under this Grade', 'error')
          }
          setBatchOptions(newBatch)
          setBatchApiLoading(false)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setBatchApiLoading(false))
    }
  }, [selectedGrade.id, user.branchId])

  useEffect(() => {
    if (selectedBatch1.id) {
      setStudentPerfApiLoading(true)
      const payload = {
        batchId: selectedBatch1.id
      }
      getStudentPerformanceAPI(payload)
        .then((res) => {
          // console.log('res,res',res)
          setGraphData(res.data)
          const newStudentPerformance = {
            totalStudents: res.data.batch?.studentCount,
            batchName: res.data.batch?.batchName,
            courseName: res.data.batch?.courseName,
            assessmentAvg: res.data.assessment,
            assignmentAvg: res.data.assignment,
            classAvg: res.data.classAverage
          }
          setStudentPerformance(newStudentPerformance)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Student Performance Data under this Batch',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setStudentPerfApiLoading(false))
    }
  }, [selectedBatch1])

  // console.log('studentPerformance',studentPerformance)

  useEffect(() => {
    if (selectedBatch1.id) {
      const payload = {
        batchId: selectedBatch1.id,
        page: 1,
        limit: 10
      }
      getStudentPerformanceListAPI(payload)
        .then((res) => {
          console.log('getStudentPerformanceListAPI', res)
          const studPerfList: any = res?.data?.map((el: any) => {
            return {
              studentId: el.studentId,
              studentNameList: el.studentName,
              profileImage: el.profileImage,
              assignmentsSubmittedList: el.assignmentsSubmitted,
              totalAssignmentsList: el.totalAssignments,
              assessmentsSubmittedList: el.assessmentsSubmitted,
              totalAssessmentsList: el.totalAssessments,
              overallAvgPercentage: el.overallAvgPercentage
            }
          })
          setStudPerformanceList(studPerfList)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Student Performance Data under this Batch',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
      // .finally(() => setBatchApiLoading(false))
    }
  }, [selectedBatch1])

  return (
    <PageContainer>
      <Menucontainer style={{ gap: '20px' }}>
        <SearchContainer>
          <SearchableDropdown
            label="Select Grade"
            selectedValue={selectedGrade}
            onSelect={(data: any) => {
              setSelectedGrade(data)
              setSelectedBatch1(defaultValues)
              setStudentPerformance([])
              setStudPerformanceList([])
            }}
            isClear={selectedGrade.id ? true : false}
            placeHolder="Grade Name"
            isLoader={isCourseLoading}
            required
            options={gradeOptions}
          />
          <SearchableDropdown
            label="Select Batch / Section"
            selectedValue={selectedBatch1}
            onSelect={(data: any) => {
              setSelectedBatch1(data)
              setStudentPerformance([])
              setStudPerformanceList([])
            }}
            isClear={selectedBatch1.id ? true : false}
            placeHolder="Batch / Section Name"
            isLoader={batchApiLoading}
            required
            options={batchOptions}
          />
        </SearchContainer>

        {studentPerfApiLoading && (
          <Spinner
            style={{
              width: '44px',
              height: '44px',
              color: `${BlueButton}`,
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}
            animation={'border'}
          />
        )}
        {graphData ? (
          <>
            <SearchContainer style={{ padding: '0px' }}>
              <GraphContainer style={{ padding: '0px' }}>
                <ClassContainer style={{ width: '50%', alignItems: 'left' }}>
                  <GradeLable style={{ fontSize: '20px', paddingLeft: '20px' }}>
                    Batch :&nbsp;&nbsp;{' '}
                    <Lable style={{ fontSize: '20px' }}>
                      {studentPerformance.batchName}{' '}
                    </Lable>
                  </GradeLable>
                  <GradeLable style={{ fontSize: '20px', paddingLeft: '20px' }}>
                    Grade :&nbsp;&nbsp;{' '}
                    <Lable style={{ fontSize: '20px' }}>
                      {studentPerformance.courseName}
                    </Lable>{' '}
                  </GradeLable>
                </ClassContainer>
              </GraphContainer>
              <GraphContainer style={{ padding: '0px' }}>
                <ClassContainer>
                  <PercentageLable>
                    Total Student:&nbsp;&nbsp;{' '}
                    <Lable>{studentPerformance.totalStudents || 'N/A'}</Lable>
                  </PercentageLable>
                  <PercentageLable>
                    OverAll Assignment Avg: &nbsp;&nbsp;
                    <Lable>
                      {studentPerformance.assignmentAvg
                        ? `${studentPerformance.assignmentAvg}%`
                        : 'N/A'}
                    </Lable>
                  </PercentageLable>
                  <PercentageLable>
                    OverAll Assesment Avg:&nbsp;&nbsp;
                    <Lable>
                      {studentPerformance.assessmentAvg
                        ? `${studentPerformance.assessmentAvg}%`
                        : 'N/A'}
                    </Lable>
                  </PercentageLable>
                </ClassContainer>
              </GraphContainer>
              <GraphContainer style={{ padding: '0px' }}>
                <PerformanceChart performancePercentage={studentPerformance} />
              </GraphContainer>
            </SearchContainer>
            <SearchContainer style={{ padding: '0px' }}>
              <PerformanceTable studentPerformanceList={studPerformanceList} />
            </SearchContainer>
          </>
        ) : (
          <Flex
            style={{
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <PageTitle>
              {!studentPerfApiLoading &&
                'Select Grade and batch to view Student Performance Analytics'}
            </PageTitle>
          </Flex>
        )}
      </Menucontainer>
    </PageContainer>
  )
}
export default StudentPerformance
