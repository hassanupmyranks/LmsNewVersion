import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import Profile from '../../../assets/no_user.png'
import {
  ClassContainer,
  GraphContainer,
  Menucontainer,
  PageTitle,
  PercentageLable,
  SearchContainer
} from '../StudentPerformance/StyledComponent'
import {
  GraphandTableContainer1,
  GraphandTableContainer2,
  TecherProfile
} from './StyledComponet'
import TeacherGradeTable from './TeacherGradeListTable'
import PorstionCompletedGraph from './PortionCompletedGraph'
import { TableTitleText } from '../dashboard/TeacherDashBoard/styledComponents'
import MissedAessionsTable from './MissedSessionTable'
import Table from './PortionTable'
import MissedSessionRadialbar from './MissedSessionRadialBar'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { useEffect, useState } from 'react'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { CourseDetailProps, NewBranchDetails } from '../../../utils/types'
import {
  getAllAssesmentTestType,
  getAllBranchAPI,
  getAllUserAPI,
  missionSessionPerformanceAPI,
  teacherPerformanceAPI,
  teacherSubjectwiseBytypeAPI,
  teacherSubjectwiseTestBytypeAPI,
  getLearnCourseData,
  getSubjectData
} from '../../../helpers/V2/apis'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { SearchableDropdownOptionData } from '../assignment/Review/ReviewAssignment/Types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { NewUserDetails } from '../../../components/V2/PopUp/AssignTeacherPopup'
import BarChart from './BarGraph'

const TeacherPerformance = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const [branchLoading, setBranchLoading] = useState(false)
  const [branchData, setBranchData] = useState<any[]>([])
  const [selectedBranch, setSelectedBranch] = useState<any>({
    id: '',
    label: ''
  })

  const [teacher, setTeachers] = useState<SearchableDropdownOptionData[]>([])
  const [teacherApiLoading, setTeacherAPILoading] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<
    SearchableDropdownOptionData | any
  >()

  const [selectedGrade, setSelectedGrade] = useState<any>(defaultValues)
  const [gradeOptions, setGradeOptions] = useState<[]>([])
  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)

  const [selectedSubject, setSelectedSubject] = useState<any>(defaultValues)
  const [subjectOptions, setSubjectOptions] = useState<any[]>([])
  const [subjectLoading, setSubjectLoading] = useState(false)

  const [teacherBatches, setTeacherBatches] = useState<any>([])
  const [teacherCourses, setTeacherCourses] = useState<any>([])
  const [batchOverallPercentage, setBatchOverallPercentage] = useState([])
  const [batchLabels, setBatchLabels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSessionLoading, setSessionIsLoading] = useState(false)
  const [gradesOverallData, setGradesOverallData] = useState<any>([])
  const [batchWiseMissedSessions, setBatchWiseMissedSessions] = useState<any>(
    []
  )
  const [yearlyBatchWiseMissedSessions, setYearlyBatchWiseMissedSessions] =
    useState<any>([])

  const [selectedTestTypeLoad, setIsselectedTestTypeLoad] = useState(false)
  const [selectedTestType, setSelectedTestType] = useState<any>()
  const [selectedTestTypeOptions, setSelectedTestTypeOptions] = useState<any[]>(
    []
  )

  // const [assessmentBatches, setAssessmentBatches] = useState<any>([])
  // const Grade = [
  //   { name: '6A', value: 60 },
  //   { name: '7C', value: 20 },
  //   { name: '6F', value: 50 }
  // ]

  const [assesmentClassAverage, setAssesmentclassAverage] = useState([])
  const [assesmentTopStudentAverage, setAssesmemtTopStudentAverage] = useState(
    []
  )
  const [assessmentBatchesName, setAssessmentBatchName] = useState([])
  const [totalAssessments, setTotalAssessments] = useState([])

  const [assignmentClassAverage, setAssignmentClassAverage] = useState([])
  const [assignmentTopStudentAverage, setAssignmentTopStudentAverage] =
    useState([])
  const [assignmentBatchesName, setAssignmentBatchName] = useState([])
  const [totalAssignments, setTotalAssignments] = useState([])

  useEffect(() => {
    if (userInfoV2.role === 'instituteAdmin') {
      getAllBranchAPI({
        page: 1,
        limit: 150,
        instituteId: userInfoV2.instituteId
      })
        .then((res: any) => {
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
    } else {
      setSelectedBranch({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
    }
  }, [userInfoV2])

  useEffect(() => {
    if (selectedSubject?.id && userInfoV2.role !== 'teacher') {
      const payload = {
        page: 1,
        limit: 150,
        role: 'teacher',
        subjectId: selectedSubject?.id
      }
      setTeacherAPILoading(true)
      getAllUserAPI(payload)
        .then((res) => {
          if (res && res.data.length > 0) {
            const newTeacher = res.data.map((teacher: NewUserDetails) => {
              return {
                label: teacher.firstName,
                id: teacher?._id
              }
            })
            setTeachers(newTeacher)
            setTeacherAPILoading(false)
          }
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => setTeacherAPILoading(false))
    }
  }, [selectedSubject?.id, userInfoV2])

  useEffect(() => {
    if (
      userInfoV2.branchId ||
      (userInfoV2.role === 'instituteAdmin' && selectedBranch?.id)
    ) {
      SetIsCourseLoading(true)
      getLearnCourseData({
        page: 1,
        limit: 120,
        branchId: userInfoV2.branchId
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
  }, [userInfoV2, selectedBranch])

  // setSessionIsLoading(true)
  // teacherSubjectwiseBytypeAPI()
  //   .then((res) => {
  //     let tmpBathes: any = []
  //     res.data.map((item: any) => {
  //       tmpBathes.push({
  //         name: item.batchName,
  //         value: item.classAverage

  useEffect(() => {
    if (selectedGrade.id) {
      setSubjectLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        courseId: selectedGrade.id
      }
      getSubjectData(payload)
        .then((res: any) => {
          const newSubject = res?.map((subject: any) => {
            return {
              label: subject.name,
              id: subject?._id,
              value: ''
            }
          })
          setSubjectOptions(newSubject)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedGrade.id])

  useEffect(() => {
    if (
      userInfoV2.role == 'teacher' ||
      ((userInfoV2.role === 'branchAdmin' ||
        userInfoV2.role === 'instituteAdmin') &&
        selectedTeacher?.id)
    ) {
      setSessionIsLoading(true)
      missionSessionPerformanceAPI({ teacherId: selectedTeacher?.id })
        .then((res) => {
          setBatchWiseMissedSessions(res.batchWiseMissedSessions)
          setYearlyBatchWiseMissedSessions(res.yearlyBatchWiseMissedSessions)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSessionIsLoading(false))

      setIsLoading(true)
      teacherPerformanceAPI({ teacherId: selectedTeacher?.id })
        .then((res) => {
          let newBatches: any = []
          let newCourses: any = []
          let batchPercentage: any = []
          let batchNames: any = []

          setGradesOverallData(res.data)
          res.data.map((course: any) => {
            newCourses.push({
              courseId: course.courseId,
              courseName: course.courseName,
              batchesLength: course.batches.length
            })
            course.batches.map((batch: any) => {
              newBatches.push(batch)
              batchPercentage.push(Number(batch.overAllCompletionPercentage))
              batchNames.push(batch.batchName)
            })
          })
          setBatchLabels(batchNames)
          setBatchOverallPercentage(batchPercentage)
          setTeacherCourses(newCourses)
          setTeacherBatches(newBatches)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))

      setSessionIsLoading(true)
      teacherSubjectwiseBytypeAPI({ teacherId: selectedTeacher?.id })
        .then((res) => {
          let tmpBathes: any = []
          res.data.map((item: any) => {
            tmpBathes.push(`${item.subjectName}, ${item.batchName}`)
          })
          const newClassAverage: any = res?.data?.map((datas: any) =>
            datas?.classAverage.toFixed(2)
          )
          const newTopStudentAverage: any = res?.data?.map((items: any) =>
            items?.topStudentAvg.toFixed(2)
          )
          const totalAssign: any = res?.data?.map((items: any) =>
            items?.totalAssignments.toFixed(2)
          )
          setTotalAssignments(totalAssign)
          setAssignmentTopStudentAverage(newTopStudentAverage)
          setAssignmentClassAverage(newClassAverage)
          setAssignmentBatchName(tmpBathes)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSessionIsLoading(false))
    }
  }, [userInfoV2, selectedTeacher])

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
    if (
      userInfoV2.role == 'teacher' ||
      ((userInfoV2.role === 'branchAdmin' ||
        userInfoV2.role === 'instituteAdmin') &&
        selectedTeacher?.id)
    ) {
      if (selectedTestType?.id) {
        teacherSubjectwiseTestBytypeAPI({
          type: selectedTestType?.id,
          teacherId: selectedTeacher?.id
        })
          .then((data) => {
            let btName: any = []
            data.data.map((item: any) => {
              btName.push(`${item.subjectName}, ${item.batchName}`)
            })
            const newClassAverage: any = data?.data?.map((datas: any) =>
              datas?.classAverage.toFixed(2)
            )
            const newTopStudentAverage: any = data?.data?.map((items: any) =>
              items?.topStudentAvg.toFixed(2)
            )
            const totalAssessments: any = data?.data?.map((items: any) =>
              items?.totalAssessments.toFixed(2)
            )
            setTotalAssessments(totalAssessments)
            setAssesmemtTopStudentAverage(newTopStudentAverage)
            setAssesmentclassAverage(newClassAverage)
            setAssessmentBatchName(btName)
          })
          .finally(() => setIsselectedTestTypeLoad(false))
      }
    }
  }, [selectedTestType?.id, userInfoV2, selectedTeacher])

  return (
    <PageContainer>
      <Menucontainer style={{ gap: '20px' }}>
        <Flex gap="10px">
          {userInfoV2.role === 'instituteAdmin' && (
            <SearchableDropdown
              style={{ width: '290px' }}
              isLoader={branchLoading}
              label={'Select Branch'}
              placeHolder={'Please Select Branch'}
              options={branchData}
              isClear={selectedBranch?.id ? true : false}
              onSelect={(option) => {
                setSelectedBranch(option)
              }}
              selectedValue={selectedBranch}
            />
          )}
          {userInfoV2.role !== 'teacher' && (
            <>
              <SearchableDropdown
                label="Select Grade"
                selectedValue={selectedGrade}
                onSelect={(data) => {
                  setSelectedGrade(data)
                  setSelectedSubject(defaultValues)
                  setSubjectOptions([])
                  setTeacherBatches([])
                  setTeacherCourses([])
                  setBatchOverallPercentage([])
                  setBatchLabels([])
                  setGradesOverallData([])
                  setBatchWiseMissedSessions([])
                  setYearlyBatchWiseMissedSessions([])
                }}
                isClear={selectedGrade.id ? true : false}
                placeHolder="Grade Name"
                isLoader={isCourseLoading}
                required
                options={gradeOptions}
              />

              <SearchableDropdown
                label="Select Subject"
                selectedValue={selectedSubject}
                onSelect={(data) => {
                  setSelectedSubject(data)
                  setTeacherBatches([])
                  setTeacherCourses([])
                  setBatchOverallPercentage([])
                  setBatchLabels([])
                  setGradesOverallData([])
                  setBatchWiseMissedSessions([])
                  setYearlyBatchWiseMissedSessions([])
                }}
                isClear={selectedSubject.id ? true : false}
                placeHolder="Subject Name"
                isLoader={subjectLoading}
                required
                options={subjectOptions}
              />
              <SearchableDropdown
                label="Select Teacher"
                placeHolder="Enter or select Teacher"
                options={teacher}
                onSelect={(data) => {
                  setSelectedTeacher(data)
                  setTeacherBatches([])
                  setTeacherCourses([])
                  setBatchOverallPercentage([])
                  setBatchLabels([])
                  setGradesOverallData([])
                  setBatchWiseMissedSessions([])
                  setYearlyBatchWiseMissedSessions([])
                }}
                isLoader={teacherApiLoading}
                selectedValue={selectedTeacher}
                isClear={selectedTeacher?.id ? true : false}
                required
              />
            </>
          )}
        </Flex>
        {(isLoading || isSessionLoading) && (
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
        {!isLoading &&
        !isSessionLoading &&
        batchOverallPercentage &&
        batchOverallPercentage.length > 0 &&
        batchWiseMissedSessions &&
        batchWiseMissedSessions.length > 0 ? (
          <>
            <SearchContainer>
              <GraphContainer>
                <ClassContainer style={{ width: '20%', alignItems: 'center' }}>
                  <TecherProfile src={Profile} alt="" />
                </ClassContainer>
                <ClassContainer style={{ width: '70%' }}>
                  <PercentageLable>
                    Teacher Name:{' '}
                    {selectedTeacher?.label
                      ? selectedTeacher?.label
                      : userInfoV2.firstName}
                  </PercentageLable>
                </ClassContainer>
              </GraphContainer>

              {teacherCourses && teacherCourses.length > 0 && (
                <GraphContainer>
                  <TeacherGradeTable
                    courses={teacherCourses}
                    batches={teacherBatches}
                  />
                </GraphContainer>
              )}
            </SearchContainer>
            <SearchContainer>
              <GraphandTableContainer1>
                <TableTitleText>Session-wise Completion</TableTitleText>
                {batchOverallPercentage &&
                  batchOverallPercentage.length > 0 && (
                    <PorstionCompletedGraph
                      seriesData={batchOverallPercentage}
                      labels={batchLabels}
                    />
                  )}
              </GraphandTableContainer1>
              <GraphandTableContainer2>
                {gradesOverallData && gradesOverallData.length > 0 && (
                  <Table grades={gradesOverallData} />
                )}
              </GraphandTableContainer2>
            </SearchContainer>
            <SearchContainer>
              <GraphContainer
                style={{
                  height: '400px',
                  flexDirection: 'column'
                }}
              >
                <TableTitleText>Session Completion Status</TableTitleText>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap',
                    overflow: 'auto'
                  }}
                >
                  {batchWiseMissedSessions &&
                    batchWiseMissedSessions.length > 0 &&
                    batchWiseMissedSessions.map(
                      (session: any, index: number) => (
                        <MissedSessionRadialbar
                          key={`ind_${index}`}
                          TotalCount={session?.totalSessionCount}
                          MissedCound={session?.missedSessionCount}
                          Percentage={(
                            (100 * session?.missedSessionCount) /
                            session?.totalSessionCount
                          ).toFixed(2)}
                          Grade={session?.batchName}
                        />
                      )
                    )}
                </div>
              </GraphContainer>
              <GraphContainer style={{ flexDirection: 'column' }}>
                <TableTitleText>Missed Sessions</TableTitleText>

                {yearlyBatchWiseMissedSessions &&
                  yearlyBatchWiseMissedSessions.length > 0 && (
                    <MissedAessionsTable
                      yearlyBatchWiseMissedSessions={
                        yearlyBatchWiseMissedSessions
                      }
                    />
                  )}
              </GraphContainer>
            </SearchContainer>
            <SearchContainer>
              <GraphContainer style={{ flexDirection: 'column' }}>
                <Flex
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <TableTitleText>Assesment Assigned</TableTitleText>
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
                {assessmentBatchesName && assessmentBatchesName.length > 0 && (
                  <BarChart
                    classAverage={assesmentClassAverage}
                    topStudentAverage={assesmentTopStudentAverage}
                    categories={assessmentBatchesName}
                    totals={totalAssessments}
                  />
                  // <AssesmentAndAssignmentBarGraph data={assessmentBatches} />
                )}
              </GraphContainer>
              <GraphContainer style={{ flexDirection: 'column' }}>
                <TableTitleText>Assignment Assigned</TableTitleText>
                {totalAssignments && totalAssignments.length > 0 && (
                  <BarChart
                    classAverage={assignmentClassAverage}
                    topStudentAverage={assignmentTopStudentAverage}
                    categories={assignmentBatchesName}
                    totals={totalAssignments}
                  />
                  // <AssesmentAndAssignmentBarGraph data={assignmentBatches} />
                )}
              </GraphContainer>
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
              {!isLoading &&
                !isSessionLoading &&
                'Select teacher to view teacher Performance Analytics'}
            </PageTitle>
          </Flex>
        )}
      </Menucontainer>
    </PageContainer>
  )
}

export default TeacherPerformance
