import { useEffect, useState } from 'react'
import InputV2 from '../../../../../components/V2/Form/Input'
import { Flex } from '../../../../../components/V2/styledComponents'
import { GetCourseResponse, SubjectsData } from '../../../AddTeacher/type'
import { Button, Container, P } from './styledComponents'
import { AddBatchProps } from './types'
import {
  AddBatchV2,
  EditBatch,
  GetSingleBatch,
  getAllBranchAPI,
  getAllInstituteAPI,
  getQuestionBankV2CoursesAPI,
  getSingleCourse,
  getcourseByBranchId
} from '../../../../../helpers/V2/apis'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../../const/V2/stylingVariables'
import CourseAndSubjectItemCheckbox from '../../../AddTeacher/components/ItemCheckbox'
import { GetSubjects } from '../../../AddTeacher/const'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import MultiselectDropdownSmall from '../../../../../components/V2/Form/MultiselectDropdownSmall'
import { getDropDownOptions } from '../../../../../helpers/V2/dropdown'
import { DropdownOptionData } from '../../../assignment/Review/ReviewAssignment/Types'
import { CourseInstitute, NewBranchDetails } from '../../../../../utils/types'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../../const/V2/routes'
import SearchableDropdown from '../../../../../components/V2/Form/SearchableDropdown'

const AddBatch = ({
  teacherName,
  setTeacherName,
  batchEdit,
  setBatchEdit
}: AddBatchProps) => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [batchDetails, setBatchDetails] = useState<any>([])
  const [Course, setCourse] = useState<GetCourseResponse[]>([])
  const [isCourseAPILoading, setIsCourseAPILoading] = useState(false)
  const [isQBankCourseAPILoading, setIsQBankCourseAPILoading] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<String[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [, setGetSubject] = useState([GetSubjects])
  const [dataUpdate, setDataUpdate] = useState<any>(false)
  const [batchQuestionCourse, setBatchQuestionCourse] = useState<any[]>([])
  const [selectedQuestionCourse, setSelectedQuestionCourse] = useState<
    DropdownOptionData<CourseInstitute>[]
  >([])

  const [isSubmitAPILoading, setIsSubmitAPILoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [insLoading, setInsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [branchListPage, setBranchListPage] = useState(1)
  const [branchLoading, setBranchLoading] = useState(false)
  const [branchData, setBranchData] = useState<any[]>([])
  const [selectedBranch, setSelectedBranch] = useState<any>()
  const [branchTotal, setBranchTotal] = useState(0)

  const [selectedInstitute, setSelectedInstitute] = useState({
    id: '',
    label: ''
  })

  const history = useHistory()

  useEffect(() => {
    if (batchEdit) {
      setDataUpdate(true)
    } else {
      setDataUpdate(false)
    }
  }, [batchEdit])

  useEffect(() => {
    if (batchDetails && batchDetails.length > 0) {
      setIsQBankCourseAPILoading(true)
      getQuestionBankV2CoursesAPI({
        limit: 100,
        courseId: batchDetails[0]?.courseId
      })
        .then((response) => {
          const courses = response?.data?.map((course: any) => ({
            id: course._id,
            value: course._id,
            label: course.name,
            url: ''
          }))

          setBatchQuestionCourse(courses)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsQBankCourseAPILoading(false))
    }
  }, [batchDetails])

  useEffect(() => {
    if (batchEdit) {
      GetSingleBatch(batchEdit)
        .then((res) => {
          if (res) {
            const UpdateCourse = res.data?.questionBankCourses?.map(
              (u: any) => ({
                id: u.courseId,
                label: u.courseName,
                value: u.courseName,
                url: ''
              })
            )
            setSelectedQuestionCourse(UpdateCourse)
            setSelectedInstitute({
              id: res.data.instituteId,
              label: res.data.instituteName
            })
            setSelectedBranch({
              id: res.data.branchId,
              label: res.data.branchName
            })
            getcourseByBranchId({
              branchId: res.data.branchId
            })
              .then((res) => {
                if (res) {
                  setCourse(res.data)
                }
              })
              .catch((error) => console.log({ error }))
            // .finally(() => setIsCourseAPILoading(false))
            setBatchDetails(res.data.courses)
            setTeacherName(res.data.name)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [batchEdit, setTeacherName])

  useEffect(() => {
    const allSubjectIds: string[] = []
    batchDetails.forEach((item: any) => {
      if (item.subjects && item.subjects.length > 0) {
        item.subjects.forEach((subject: any) => {
          if (subject.subjectId) {
            allSubjectIds.push(subject.subjectId)
          }
        })
      }
    })
    setSelectedSubjects(allSubjectIds)
  }, [batchDetails])

  useEffect(() => {
    if (selectedCourseId) {
      getSingleCourse(selectedCourseId)
        .then((response) => {
          setGetSubject(response.data.data.subjects)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [selectedCourseId])

  const handleAddCourseInBatch = (courseData: any) => {
    setBatchDetails([
      {
        courseId: courseData._id,
        courseName: courseData?.name,
        subjects: []
      }
    ])
  }

  const handleSubjectCheckboxChange = (
    subject: SubjectsData,
    courseID: string
  ) => {
    const prevBatchDetails = [...batchDetails]
    const newData = prevBatchDetails.map((detail: any) => {
      if (courseID === detail.courseId) {
        const existSubjectIndex = detail.subjects.findIndex(
          (subjectTemp: any) => subjectTemp.subjectId === subject.subjectId
        )

        const updatedSubjects =
          existSubjectIndex !== -1
            ? [
                ...detail.subjects.slice(0, existSubjectIndex),
                ...detail.subjects.slice(existSubjectIndex + 1)
              ]
            : [
                ...detail.subjects,
                {
                  subjectId: subject.subjectId,
                  subjectName: subject.subjectName
                }
              ]
        return {
          ...detail,
          subjects: updatedSubjects
        }
      }
      return detail
    })
    setBatchDetails(newData)
  }

  const submitHandler = (isTeacherAssign: boolean) => {
    setIsSubmitting(true)

    if (selectedBranch.id && selectedInstitute.id) {
      setIsSubmitting(false)

      const newBatchDetails = batchDetails.filter(
        (item: any) =>
          item.courseId && item.subjects && item.subjects.length > 0
      )

      const areAllValid = newBatchDetails?.every(
        (item: any) =>
          item.courseId && item.subjects && item.subjects.length > 0
      )

      if (batchEdit) {
        if (areAllValid && newBatchDetails.length > 0) {
          const EditapiPayload: any = newBatchDetails?.map((item: any) => ({
            courseId: item.courseId,
            subjectIds:
              item.subjects?.map((subject: any) => subject.subjectId) || []
          }))
          const addQuestionCourse = selectedQuestionCourse.map(
            (data) => data.id
          )
          const EditData = {
            // name: teacherName,
            courses: EditapiPayload,
            questionBankCourseIds: addQuestionCourse
          }
          setIsSubmitAPILoading(true)
          EditBatch(batchEdit, EditData)
            .then((res) => {
              {
                userInfoV2.role === 'branchAdmin' ? '' : setCourse([])
              }

              if (isTeacherAssign) {
                history.push(ROUTES_V2.ASSIGN_TEACHER)
              } else {
                history.push(ROUTES_V2.BATCH_LIST)
              }

              CustomToastMessage(res.message, 'success')
              setSelectedQuestionCourse([])
              setBatchDetails([])
              setSelectedSubjects([])
              setTeacherName('')
              setBatchEdit('')
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
            .finally(() => setIsSubmitAPILoading(false))
        } else {
          CustomToastMessage('Please select the  Grade, and Subjects', 'error')
        }
      } else {
        if (areAllValid && newBatchDetails.length > 0) {
          const apiPayload: any = newBatchDetails?.map((item: any) => ({
            courseId: item.courseId,
            subjectIds:
              item.subjects?.map((subject: any) => subject.subjectId) || []
          }))
          const addQuestionCourse = selectedQuestionCourse.map(
            (data) => data.id
          )
          setIsSubmitAPILoading(true)
          AddBatchV2({
            branchId: selectedBranch.id,
            name: teacherName,
            courses: apiPayload,
            questionBankCourseIds: addQuestionCourse
          })
            .then((res) => {
              {
                userInfoV2.role === 'branchAdmin' ? '' : setCourse([])
              }
              if (isTeacherAssign) {
                history.push(ROUTES_V2.ASSIGN_TEACHER)
              } else {
                history.push(ROUTES_V2.BATCH_LIST)
              }
              CustomToastMessage(res.message, 'success')
              setBatchDetails([])
              setSelectedSubjects([])
              setTeacherName('')
              setSelectedQuestionCourse([])
              setSelectedInstitute({ id: '', label: '' })
              setSelectedBranch({ id: '', label: '' })
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
            .finally(() => setIsSubmitAPILoading(false))
        } else {
          CustomToastMessage('Please select the  Grade, and Subjects', 'error')
        }
      }
    }
  }

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
          newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name
            }
          })
          setInstituteData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))
    }

    if (userInfoV2.role === 'instituteAdmin') {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
    }

    if (userInfoV2.role === 'branchAdmin') {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
    }
  }, [userInfoV2])

  useEffect(() => {
    if (selectedInstitute.id && userInfoV2.role !== 'branchAdmin') {
      setBranchLoading(true)
      getAllBranchAPI({
        page: 1,
        limit: 150,
        instituteId: selectedInstitute.id
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
  }, [selectedInstitute.id, userInfoV2.role])

  const handleGetCourses = (branchId: string) => {
    setIsCourseAPILoading(true)
    getcourseByBranchId({
      branchId: branchId
    })
      .then((res) => {
        if (res) {
          setCourse(res.data)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsCourseAPILoading(false))
  }

  useEffect(() => {
    if (userInfoV2.role === 'branchAdmin' && userInfoV2.branchId) {
      setSelectedInstitute({
        id: userInfoV2.instituteId,
        label: userInfoV2.instituteName
      })
      setSelectedBranch({
        id: userInfoV2.branchId,
        label: userInfoV2.branchName
      })
      setIsCourseAPILoading(true)
      getcourseByBranchId({
        branchId: userInfoV2.branchId
      })
        .then((res) => {
          if (res) {
            setCourse(res.data)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsCourseAPILoading(false))
    }
  }, [userInfoV2])

  const handleInfiniteScrollBranch = (total: number, length: number) => {
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
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }

  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // Run once to handle initial load
    handleResize()

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Flex gap="20px" direction={isSmall ? 'column' : 'row'}>
      <Container>
        {/* <P fontSize={20} style={{ paddingBottom: '10px' }}>
          {batchEdit ? 'Edit' : 'Add'} Batch / Section
        </P> */}
        <Flex
          style={{
            flexDirection: 'row',
            gap: '10px',
            width: '100%',
            height: '100%',
            alignItems: 'start'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {userInfoV2.role === 'superAdmin' && (
              <SearchableDropdown
                style={{ width: '100%' }}
                isLoader={insLoading}
                label={'Institute / School'}
                placeHolder={'Please Select Institute / School'}
                options={instituteData}
                error={
                  selectedInstitute?.id || !isSubmitting
                    ? ''
                    : 'Feild is required'
                }
                isClear={!!selectedInstitute?.id}
                onSelect={(option: any) => {
                  setSelectedInstitute(option)
                  setSelectedBranch({
                    id: '',
                    label: ''
                  })
                  setBatchDetails([])
                }}
                selectedValue={selectedInstitute}
              />
            )}
            {userInfoV2.role !== 'branchAdmin' && (
              <SearchableDropdown
                style={{ width: '100%' }}
                handleScrollInfinite={(first, second) => {
                  handleInfiniteScrollBranch(first, second)
                }}
                total={branchTotal}
                length={branchData.length}
                isLoader={branchLoading}
                label={'Select Branch'}
                placeHolder={'Please Select Branch'}
                options={branchData}
                error={
                  selectedInstitute?.id || !isSubmitting
                    ? ''
                    : 'Feild is required'
                }
                isClear={selectedBranch?.id ? true : false}
                onSelect={(option) => {
                  setSelectedBranch(option)
                  setBatchDetails([])
                  setCourse([])
                  if (option.id) {
                    handleGetCourses(String(option.id))
                  }
                }}
                selectedValue={selectedBranch}
              />
            )}
            <div style={{ width: '100%' }}>
              <InputV2
                required
                full
                label={
                  batchEdit
                    ? 'Update Batch / Section Name'
                    : 'Batch / Section Name'
                }
                placeholder="Batch / Section Name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.currentTarget.value)}
                readOnly={batchEdit ? true : false}
              />
            </div>

            <div className="d-flex w-100 justify-content-between mt-3">
              <span style={{ paddingLeft: '0px' }} />

              <Button
                style={{
                  fontSize: '14px',
                  paddingInline: '2px',
                  textAlign: 'center',
                  minWidth: '70px'
                }}
                disabled={!teacherName || isSubmitAPILoading}
                onClick={() => submitHandler(false)}
              >
                {batchEdit ? 'Update' : 'Save'}
              </Button>
              {/* <span style={{ paddingLeft: '20px' }}>
                <Button
                  style={{
                    fontSize: '14px',
                    textAlign: 'center'
                  }}
                  disabled={!teacherName || isSubmitAPILoading}
                  onClick={() => submitHandler(true)}
                >
                  {'Continue...'}
                </Button>
              </span> */}
            </div>
          </div>
        </Flex>
      </Container>

      <Container style={{ padding: '20px' }}>
        <div style={{ width: '100%' }}>
          <div style={{ height: '415px' }}>
            <P
              fontSize={15}
              style={{
                width: '100%'
              }}
            >
              {batchEdit ? 'Edit' : 'Add'} Grade & Subjects
            </P>
            <div
              style={{
                overflowY: 'auto',
                height: '375px',
                paddingRight: '6px'
              }}
            >
              {isCourseAPILoading && Course.length <= 0 ? (
                <div className="d-flex justify-content-center mt-5">
                  <Spinner
                    style={{
                      width: '30px',
                      height: '30px',
                      color: `${BlueButton}`
                    }}
                    animation={'border'}
                  />
                </div>
              ) : (
                Course.map((Course) => (
                  <CourseAndSubjectItemCheckbox
                    key={`course_and_subject_${Course._id}`}
                    {...{
                      children: Course?.subjects || [],

                      isChecked:
                        batchDetails?.some(
                          (item: any) => item.courseId === Course._id
                        ) || false,
                      label: Course.name,
                      selectedSubjects,
                      onCheck: () => {
                        setBatchDetails([])
                        handleAddCourseInBatch(Course)
                        setSelectedCourseId(Course._id)
                      },
                      onChildCheck: (data) => {
                        handleSubjectCheckboxChange(data, Course._id)
                      }
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
      {batchDetails && batchDetails.length > 0 && (
        <Container style={{ padding: '20px', width: '30%' }}>
          <div style={{ width: '100%' }}>
            <MultiselectDropdownSmall
              Update={dataUpdate}
              label={`${
                batchEdit ? 'Edit' : 'Add'
              } Question Bank Grades (Select Multiple)`}
              placeholder={'Select Question Bank Grades'}
              isLoading={isQBankCourseAPILoading}
              options={getDropDownOptions(batchQuestionCourse, 'id', 'label')}
              onSelect={(data) => {
                setSelectedQuestionCourse(data)
              }}
              // isClear={selectedQuestionCourse.length > 0 ? true : false}
              selectedValue={selectedQuestionCourse}
            />
          </div>
        </Container>
      )}
    </Flex>
  )
}

export default AddBatch
