import { useEffect, useState } from 'react'
import {
  ButtonV2,
  Grid,
  GridItem,
  PageContainer
} from '../../../components/V2/styledComponents'
import { BlueButton, White } from '../../../const/V2/stylingVariables'
import { Heading, InputBar } from '../addstudent/stylecomponent'

import {
  getNewAllStudentAPI,
  GetSingleStudentV2
} from '../../../redux/addStudentV2/api'
import { ReactComponent as RemoveIcon } from '../../../assets/svg/remove-minus.svg'

import {
  assignBatchToTeacherAPI,
  getBatchCourses,
  getNewAllBatchAPI,
  getNewAllBranchAPI,
  getNewAllInstituteAPI,
  getSingleCourse
} from '../../../helpers/V2/apis'
import { useHistory, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import TeacherPng from '../../../assets/Teacherreplace.jpeg'
import ImageSelector from '../../../components/V2/ImageSelector/imageSelector'
import Dropdownsmall from '../../../components/V2/Form/Dropdownsmall'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
  DropdownOptionData,
  SearchableDropdownOptionData
} from '../../../components/V2/Form/types'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import {
  // GetCourseResponse,
  // Batch,
  SubjectsData
} from './type'
import { SelectedSections, SelectionsContainer } from './stylecomponent'
import CourseAndSubjectItemCheckbox from './components/ItemCheckbox'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { GetSubjects, GetTeacherList } from './const'
import ROUTES_V2 from '../../../const/V2/routes'

const AssignTeacher = () => {
  const {
    instituteList,
    branchList,
    batchList,
    insLoading,
    branchLoading,
    batchLoading,
    user
  } = useSelector(
    (state: RootState) => ({
      instituteList: state.instituteV2.data,
      branchList: state.branchV2.data,
      batchList: state.batchV2.data,
      insLoading: state.instituteV2.loading,
      branchLoading: state.branchV2.loading,
      batchLoading: state.batchV2.loading,
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )

  const history = useHistory()

  const dispatch = useDispatch()
  const param: any = useParams()
  const [list, setList] = useState([GetTeacherList])

  const [branchCourse, setBranchCourse] = useState<any>({})
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [, setGetSubject] = useState([GetSubjects])

  const [isCourseAPILoading, setIsCourseAPILoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)
  const [submitAPILoading, setSubmitAPILoading] = useState(false)

  const [selectedInstitute, setSelectedInstitute] =
    useState<DropdownOptionData<string>>()
  const [selectedBranch, setSelectedBranch] =
    useState<DropdownOptionData<string>>()
  const [selectedBatch, setSelectedBatch] =
    useState<DropdownOptionData<string>>()
  const [selectedTeacher, setSelectedTeacher] =
    useState<SearchableDropdownOptionData>()

  const [batchDetails, setBatchDetails] = useState<any>([])
  const [lastSelectedBatchId, setLastSelectedBatchId] = useState<any>('')
  const [, setImage] = useState<File>()
  const [selectedSubjects, setSelectedSubjects] = useState<String[]>([])

  const [singleUserIsLoading, setSingleUserIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (selectedCourseId) {
      getSingleCourse(selectedCourseId).then((response) => {
        setGetSubject(response.data.data.subjects)
      })
    }
  }, [selectedCourseId])

  useEffect(() => {
    if (user.role === 'superAdmin') {
      if (selectedInstitute?.id) {
        dispatch(
          getNewAllBranchAPI({
            page: 1,
            limit: 120,
            instituteId: selectedInstitute?.id
          })
        )
      }
    }
  }, [dispatch, selectedInstitute?.id, user.role])

  useEffect(() => {
    if (selectedBranch?.id) {
      getNewAllStudentAPI({
        page: 1,
        limit: 1000,
        role: 'teacher',
        branchId: selectedBranch?.id
      })
        .then((res) => {
          if (res) {
            setList(res.data)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [dispatch, selectedBranch?.id])

  useEffect(() => {
    if (param?.id) {
      GetSingleStudentV2(param?.id)
        .then((res) => {
          setIsEdit(false)
          setSelectedTeacher({
            label: `${res.data.firstName} ${
              res.data.lastName ? res.data.lastName : ''
            }`,
            id: res.data._id
          })

          if (res.data.branchId) {
            setSelectedBranch({
              label: res.data.branchName,
              id: res.data.branchId,
              value: ''
            })
          }
          if (res.data.instituteId) {
            setSelectedInstitute({
              label: res.data.instituteName,
              id: res.data.instituteId,
              value: ''
            })
          }

          if (res) {
            const assignData = res.data
            if (assignData?.instituteId && assignData?.batches?.length > 0) {
              setIsEdit(true)

              const transformedData = assignData?.batches?.flatMap(
                (batch: any, index: number) => {
                  if (
                    index === 0 &&
                    batch.courses &&
                    batch.courses.length > 0
                  ) {
                    const firstCourseId = batch.courses[0]?.courseId
                    setLastSelectedBatchId(firstCourseId)
                    const courses = {
                      id: batch.courses[0]?.courseId,
                      label: batch.courses[0]?.courseName,
                      value: batch.courses[0]?.courseName
                    }
                    setSelectedBatch(courses)
                  }

                  return batch.courses.map((course: any) => {
                    return {
                      batchId: course.courseId,
                      batchName: course.courseName,
                      courseId: batch.batchId,
                      courseName: batch.batchName,
                      subjects: course.subjects
                    }
                  })
                }
              )
              setBatchDetails(transformedData)
            }
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [param?.id])

  const getTeacher = () => {
    setIsLoading(true)
    getNewAllStudentAPI({
      page: 1,
      limit: 200,
      role: 'teacher'
    })
      .then((res) => {
        if (res) {
          setList(res.data)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }

  const defaultValue = {
    id: '',
    label: '',
    value: ''
  }

  const instituteData = instituteList.map((item) => ({
    id: item._id,
    label: item.name,
    value: item.name
  }))

  const branchData = branchList.map((item) => ({
    id: item._id,
    label: item.name,
    value: item.name
  }))

  useEffect(() => {
    if (user.role == 'instituteAdmin') {
      setSelectedInstitute({
        id: user.instituteId,
        value: user.instituteName,
        label: user.instituteName
      })
      dispatch(
        getNewAllBranchAPI({
          page: 1,
          limit: 20,
          instituteId: user.instituteId
        })
      )
    }
    if (user.role === 'superAdmin') {
      dispatch(
        getNewAllInstituteAPI({
          page: 1,
          limit: 20
        })
      )
    }
    if (user.role == 'branchAdmin') {
      setSelectedInstitute({
        id: user.instituteId,
        value: user.instituteName,
        label: user.instituteName
      })
      setSelectedBranch({
        id: user.branchId,
        value: user.branchName,
        label: user.branchName
      })
    }
  }, [user, dispatch, selectedBatch?.id, selectedBranch?.id])

  const TeacherName: SearchableDropdownOptionData[] = list
    ? list.map((item) => ({
        id: item._id,
        label: `${item.firstName} ${item.lastName ? ` ${item.lastName}` : ''}`,
        url: item.profileImage || TeacherPng
      }))
    : []

  const handleNameSelect = (name: SearchableDropdownOptionData) => {
    setSelectedTeacher(name)
    setSelectedTeacher({ label: '', id: '' })
    setBatchDetails([])
    setSelectedBatch(defaultValue)
    setIsEdit(false)
    setSingleUserIsLoading(true)
    getNewAllStudentAPI({
      id: String(name.id)
    })
      .then((res) => {
        if (res) {
          const assignData = res.data
          if (assignData?.instituteId && assignData?.batches?.length > 0) {
            setIsEdit(true)
            setSelectedInstitute({
              id: assignData?.instituteId,
              value: assignData?.instituteName,
              label: assignData?.instituteName
            })
            setSelectedBranch({
              id: assignData?.branchId,
              value: assignData?.branchName,
              label: assignData?.branchName
            })

            const transformedData = assignData?.batches?.flatMap(
              (batch: any, index: number) => {
                if (index === 0 && batch.courses && batch.courses.length > 0) {
                  const firstCourseId = batch.courses[0]?.courseId
                  setLastSelectedBatchId(firstCourseId)
                  const courses = {
                    id: batch.courses[0]?.courseId,
                    label: batch.courses[0]?.courseName,
                    value: batch.courses[0]?.courseName
                  }
                  setSelectedBatch(courses)
                }

                return batch.courses.map((course: any) => {
                  return {
                    batchId: course.courseId,
                    batchName: course.courseName,
                    courseId: batch.batchId,
                    courseName: batch.batchName,
                    subjects: course.subjects
                  }
                })
              }
            )
            setBatchDetails(transformedData)
          }
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setSingleUserIsLoading(false))
  }

  const handleBatchDropdownChange = (batchId: any) => {
    if (batchId !== lastSelectedBatchId) {
      setLastSelectedBatchId(batchId)
    }
  }

  const handleSubjectCheckboxChange = (
    subject?: SubjectsData,
    courseID?: string
  ) => {
    const prevBatchDetails = [...batchDetails]
    const newData = prevBatchDetails.map((detail: any) => {
      if (
        courseID === detail.courseId &&
        detail.batchId === lastSelectedBatchId
      ) {
        const existSubjectIndex = detail.subjects.findIndex(
          (subjectTemp: any) =>
            detail.batchId === lastSelectedBatchId &&
            subjectTemp.subjectId === subject?.subjectId
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
                  subjectId: subject?.subjectId,
                  subjectName: subject?.subjectName
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

  const handleAddCourseInBatch = (courseData: any) => {
    if (selectedBatch) {
      const prevBatchDetails = [...batchDetails]

      const hasCourse = prevBatchDetails.some(
        (batch: any) =>
          batch.batchId === lastSelectedBatchId &&
          batch.courseId === courseData.id
      )

      if (hasCourse) {
        const newBatchDetails = prevBatchDetails.filter(
          (item: any) =>
            item.batchId !== lastSelectedBatchId ||
            item.courseId !== courseData.id
        )
        setBatchDetails(newBatchDetails)
      } else {
        prevBatchDetails.push({
          batchId: selectedBatch.id,
          batchName: selectedBatch.label,
          courseId: courseData.id,
          courseName: courseData?.name,
          subjects: []
        })
        setBatchDetails(prevBatchDetails)
      }
    }
  }

  const handleRemoveBatch = (courseId: string, batchId: string) => {
    setBatchDetails((prevBatchDetails: any) =>
      prevBatchDetails.filter(
        (batch: any) =>
          !(batch.batchId === batchId && batch.courseId === courseId)
      )
    )
  }

  useEffect(() => {
    const allSubjectIds = batchDetails?.flatMap((item: any) =>
      item.subjects.map((subject: any) => ({
        batchId: item.courseId,
        subjectId: subject.subjectId,
        subjectName: subject.subjectName
      }))
    )

    setSelectedSubjects(allSubjectIds)
  }, [batchDetails, lastSelectedBatchId])

  const submitHandler = () => {
    setIsSubmit(true)
    if (
      selectedTeacher?.label &&
      selectedInstitute?.id &&
      selectedBranch?.id &&
      selectedBatch?.id
    ) {
      setIsSubmit(false)

      const newBatchDetails = batchDetails?.filter(
        (item: any) =>
          item.batchId &&
          item.courseId &&
          item.subjects &&
          item.subjects.length > 0
      )

      const apiPayload: any = newBatchDetails?.map((item: any) => ({
        batchId: item.courseId,
        courseId: item.batchId,
        subjectIds:
          item.subjects?.map((subject: any) => subject.subjectId) || []
      }))

      setSubmitAPILoading(true)
      assignBatchToTeacherAPI({
        teacherId: String(selectedTeacher?.id),
        instituteId: String(selectedInstitute?.id),
        branchId: String(selectedBranch?.id),
        batches: apiPayload
      })
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          history.push(ROUTES_V2.TEACHER_LIST)
          setBatchDetails([])
          setSelectedTeacher(defaultValue)
          if (user.role === 'superAdmin') {
            setSelectedInstitute(defaultValue)
            setSelectedBranch(defaultValue)
          }
          if (user.role === '') setSelectedBatch(defaultValue)
          getTeacher()
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubmitAPILoading(false))
    }
  }

  const [screenSize, setScreenSize] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth) {
        setScreenSize(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (selectedBatch?.id) {
      dispatch(
        getNewAllBatchAPI({
          page: 1,
          limit: 20,

          courseId: selectedBatch?.id,
          branchIds: [String(selectedBranch?.id)],
          course: true
        })
      )
    }
  }, [selectedBatch?.id, selectedBranch?.id, dispatch])

  const batchAndSubjects = batchList?.flatMap((batch) => {
    return batch?.courses?.map((course: any) => ({
      id: batch._id,
      name: batch.name,
      subjects: course?.subjects?.map((subject: any) => ({
        batchId: batch._id,
        subjectId: subject.subjectId,
        subjectName: subject.subjectName
      }))
    }))
  })

  useEffect(() => {
    if (selectedBranch?.id) {
      setIsCourseAPILoading(true)
      getBatchCourses({
        branchId: String(selectedBranch?.id)
      })
        .then((res) => {
          if (res) {
            const Course = res?.data?.map((data: any) => ({
              id: data?._id,
              label: data?.name,
              value: data?.name
            }))
            setBranchCourse(Course)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsCourseAPILoading(false))
    }
  }, [selectedBranch?.id])

  return (
    <PageContainer style={{ overflowY: 'auto' }}>
      <Grid
        columns={screenSize > 992 ? 12 : screenSize < 768 ? 1 : 10}
        gap="20px"
      >
        <GridItem
          columnSpan={screenSize < 768 ? 6 : 5}
          rowSpan={40}
          style={{
            backgroundColor: White,
            borderRadius: '20px'
          }}
        >
          <InputBar>
            <Heading
              style={{
                padding: '5px 5px 5px 5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              Assign Teachers
              <div className="">
                {' '}
                <ButtonV2
                  style={{ padding: '6px 20px' }}
                  disabled={submitAPILoading}
                  onClick={() => submitHandler()}
                >
                  {isEdit ? 'Update' : 'Assign'}
                </ButtonV2>
              </div>
            </Heading>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ width: '20%' }}>
                <ImageSelector
                  onImageSelected={(file: File) => {
                    setImage(file)
                  }}
                  defaultvalue={selectedTeacher?.url || TeacherPng}
                ></ImageSelector>
              </div>
              <div style={{ width: '70%', marginLeft: '5px' }}>
                <Dropdownsmall
                  isLoading={insLoading}
                  fullWidth
                  required
                  label={'Select Institute / School'}
                  placeholder={'Select Institute / School'}
                  options={
                    user.role == 'instituteAdmin'
                      ? []
                      : user.role == 'branchAdmin'
                      ? []
                      : instituteData
                  }
                  onSelect={(option) => {
                    setSelectedInstitute(option)
                    setSelectedBranch(defaultValue)
                  }}
                  selectedValue={selectedInstitute}
                  error={
                    selectedInstitute?.id || !isSubmit
                      ? ''
                      : 'Field is required'
                  }
                />
              </div>
            </div>

            <Dropdownsmall
              isLoading={branchLoading}
              label={'Select Branch'}
              required
              placeholder={'Select Branch'}
              options={user.role == 'branchAdmin' ? [] : branchData}
              onSelect={(option) => {
                setSelectedBranch(option)
                // setSelectedBatch(defaultValue)
                setBatchDetails([])
                // setCourse([])
              }}
              selectedValue={selectedBranch}
              error={selectedBranch?.id || !isSubmit ? '' : 'Field is required'}
            />
            <SearchableDropdown
              label={'Teacher Name'}
              required
              isLoader={isLoading}
              options={TeacherName}
              fullWidth
              onSelect={handleNameSelect}
              placeHolder={'Please Select Teacher Name'}
              selectedValue={selectedTeacher}
              error={
                selectedTeacher?.label || !isSubmit ? '' : 'Field is required'
              }
            />
            <SelectionsContainer>
              {singleUserIsLoading && (
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    marginTop: '20px'
                  }}
                  animation={'border'}
                />
              )}
              {batchDetails &&
                batchDetails.map((bth: any) =>
                  bth?.courseId ? (
                    <SelectedSections key={bth.batchId}>
                      <span>
                        {' '}
                        {bth.batchName} - ({bth?.courseName},{' '}
                        {bth?.subjects?.map((subject: any, index: number) => (
                          <>
                            <span className="ms-2">{subject?.subjectName}</span>
                            {index < bth.subjects.length - 1 && ', '}
                          </>
                        ))}
                        )
                      </span>
                      <RemoveIcon
                        onClick={() =>
                          handleRemoveBatch(bth.courseId, bth.batchId)
                        }
                      />
                    </SelectedSections>
                  ) : null
                )}
            </SelectionsContainer>
          </InputBar>
        </GridItem>
        <GridItem
          columnSpan={screenSize < 768 ? 6 : screenSize > 992 ? 3 : 5}
          rowSpan={40}
          style={{
            backgroundColor: White,
            borderRadius: '20px'
          }}
        >
          <InputBar style={{ overflowY: 'auto', height: '700px' }}>
            <Heading style={{ padding: '5px 10px 10px 10px' }}>
              Choose Grade
            </Heading>
            <Dropdownsmall
              placeholder={'Select Grade'}
              isLoading={isCourseAPILoading}
              required
              options={branchCourse}
              onSelect={(option) => {
                handleBatchDropdownChange(option.id)
                setSelectedBatch(option)
                // setCourse([])
              }}
              error={selectedBatch?.id || !isSubmit ? '' : 'Field is required'}
              selectedValue={selectedBatch}
              label={'Select Grade'}
            />

            {batchLoading ? (
              <div className="d-flex justify-content-center">
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
              batchAndSubjects?.map((Course: any) =>
                Course && Course?.id ? (
                  <CourseAndSubjectItemCheckbox
                    key={`course_and_subject_${Course.id}`}
                    {...{
                      children: Course?.subjects,
                      isChecked:
                        batchDetails?.some(
                          (item: any) =>
                            item?.batchId === lastSelectedBatchId &&
                            item?.courseId === Course?.id
                        ) || false,
                      label: Course?.name,
                      selectedSubjects,
                      childCheck: true,
                      onCheck: () => {
                        handleAddCourseInBatch(Course)
                        setSelectedCourseId(Course?.id)
                      },
                      onChildCheck: (data) => {
                        if (Course?.id) {
                          handleSubjectCheckboxChange(data, Course.id)
                        }
                      }
                    }}
                  />
                ) : (
                  ''
                )
              )
            )}
          </InputBar>
        </GridItem>
      </Grid>
    </PageContainer>
  )
}

export default AssignTeacher
