import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
// import physics from '../../../../assets/svg/physics.svg'
import SimpleButton from '../../../../components/V2/Button/SimpleButton'
// import CalendarInput from '../../../../components/V2/CalendarInput/Calendar'
import Dropdown from '../../../../components/V2/Form/Dropdown'
import InputV2 from '../../../../components/V2/Form/Input'
import { FormContainerV2 } from '../../../../components/V2/Form/styledComponents'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'
import {
  ButtonV2,
  Flex,
  Grid,
  GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { Prompt, useHistory, useLocation, useParams } from 'react-router-dom'
import {
  Blue,
  PrimaryBlue,
  SecondaryGray600
} from '../../../../const/V2/stylingVariables'
import {
  NewCreateInstituteTest,
  getAllTestPatternData,
  // getLearnCourseData,
  getNewAllTestData,
  // getSubjectData,
  getQuestionBankV2SubjectsAPI,
  getQuestionBankV2CoursesAPI,
  updateInstituteTestAPI,
  // getNoPatternSingleTestData,
  getAllAssesmentTestType
} from '../../../../helpers/V2/apis'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'
import { RootState } from '../../../../redux/store'
import { Divider2 } from './CreateTestPattern'
import CreateAssignTestTable from './components/CreateAssignTestTable/CreateAssignTestTable'
import ROUTES_V2 from '../../../../const/V2/routes'
import AssignTeacherPopUp from '../../../../components/V2/PopUp/AssignTeacherPopup'
import {
  addFifteenMinutesCurrentTime,
  getOnlyTimeObjectFormat,
  getSelectedTime
} from './helper'
import {
  CreateInstituteTestPayload,
  TeacherDetailsProps
} from '../../../../utils/types'
import { deepClone } from '../addQuestions/helper'
import { ReactComponent as ChemistrySvg } from '../../../../assets/svg/chemistry.svg'
import { ReactComponent as PhysicsSvg } from '../../../../assets/svg/physics.svg'
import { ReactComponent as NewPhysicsIconSvg } from '../../../../assets/svg/new-physics-icon.svg'

import { ReactComponent as TeacherIcon } from '../../../../assets/svg/assign-teacher-icons.svg'
import { initialState } from '../../../../redux/create_schedule_assign_test/types'
import AssignTeacherButton from '../../../../components/V2/Button/AssignTeacherButton'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import CalendarInput from '../../../../components/V2/CalendarInput/Calendar'
import { format } from 'date-fns'
import { formattedTime } from '../../../../helpers/V2/formattedTime'
import InputPasswordV2 from '../../../../components/V2/Form/InputPassword'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  Checkbox,
  CheckboxContainer
} from '../../../../components/V2/Form/ItemCheckbox'
// import moment from 'moment'

const abortController = new AbortController()

export const TextPara = styled.p`
  font-weight: 500;
  padding-right: 10px;
  font-size: 14px;
  color: ${Blue};
`
export const SubjectsDiv = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  // height: 2rem;
  ${({ active }) =>
    active &&
    `
  height: auto
  align-items: center;
  // padding: 8px;
  border: 2px solid ${PrimaryBlue};
  border-radius: 20px;
  `}
`
export const BottomDiv = styled.div`
  border: 1px solid #e0e5f2;
  border-radius: 20px;
  padding: 16px;
`
export const MainSearchDiv = styled.div`
  box-shadow: 14px 17px 40px 4px rgba(112, 144, 176, 0.08);
  padding: 10px;
  border-radius: 50px;
`

export const SearchDiv = styled.div`
  display: flex;
  background: #f4f7fe;
  padding: 12px 20px 12px 20px;
  border-radius: 50px;
  width: fit-content;
`

export const SearchBox = styled.input`
  border: none;
  background: #f4f7fe;
  width: 100%;
  outline: none;

  ::-webkit-input-placeholder {
    color: #8f9bba;
    font-size: 14px;
  }
  :-ms-input-placeholder {
    color: #8f9bba;
    font-size: 14px;
  }
`

export const ImageDiv = styled.div`
  margin-right: 10px;
`

export const AssignTeacherSection = styled.div`
  display: flex;
  padding: 10px;
  gap: 8px;
  flex-direction: column;
  max-width: 200px;
  align-items: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  p {
    color: #1376b9;
    font-size: 15px;
    font-weight: 700;
  }
`

const RemoveBtn = styled.button`
  all: unset;
  background: #fde7e7;
  border-radius: 23px;
  align-items: center;
  text-align: center;
  max-width: 122px;
  padding: 8px;
  color: #cc1818;
  font-size: 15px;
  font-weight: 700;
`

const BottomRightSection = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  gap: 8px;
  // width: 100%;
`
const NoteSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #35383f;
  padding-left: 20px;
  p {
    font-size: 14px;
    font-weight: 700;
    color: #7a829d;

    span {
      color: ${Blue};
    }
  }
`
const BarLine = styled.div`
  width: 2px;
  height: 38px;
  background: #a3aed0;
`
const TeacherAssignContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin-top: 70px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: start;
  }
`
interface PatternData {
  instruction_text: string
  total_questions: Number
  total_marks: Number
  course_details: {
    course_id: string
    course_name: string
  }
  test_pattern_details: {
    id: string
    name: string
  }
  test_duration: number
  subjects_details: []
}

const CreateScheduleAssignTest = () => {
  const { viewMode }: any = useParams()

  const defaultValues = {
    value: '',
    label: '',
    id: 0
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const { testId, courseId }: any = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const id: any = queryParams.get('id')
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const [teacherAssignCount, setTeacherAssignCount] = useState(0)
  const [isAutoFilled, setIsAutoFilled] = useState(0)
  const [selectedType, setSelectedType] = useState<any>()
  const [grades, setGrades] = useState<[]>([])
  const [subjects, setSubjects] = useState<[]>([])
  const [isCourseLoadingAPI, SetIsCourseLoading] = useState<boolean>(false)
  const [isSubjectLoading, SetIsSubjectLoading] = useState<boolean>(false)
  const [selectedGrade, setSelectedGrade] = useState<any>(defaultValues)
  const [selectedMark, setSelectedMark] = useState<any>('')
  const [selectedSubject2, setSelectedSubject2] = useState(defaultValues)
  const [typeText, setTypeText] = useState<any>('')
  const [selectedTestType, setSelectedTestType] = useState<any>()
  const [selectedTestTypeOptions, setSelectedTestTypeOptions] = useState<any[]>(
    []
  )
  const [selectedTestTypeLoad, setIsselectedTestTypeLoad] = useState(false)
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [isPopUp, setIsPopUp] = useState(false)
  const [isShowUpdate, setIsShowUpdate] = useState(false)

  const [testStartTime, setTestStartTime] = useState<any>(
    `${addFifteenMinutesCurrentTime(new Date())}`
  )

  const [testEndTime, setTestEndTime] = useState<any>(
    `${addFifteenMinutesCurrentTime(new Date())}`
  )

  // const [endTimeSet, setEndTimeSet] = useState(new Date())
  // const [timeValidate, setTimeValidate] = useState(false)

  const newSubjectDetails = deepClone(selector.subjectDetails)

  const dateValue = new Date()
  const minDate = new Date(
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDate()
  )

  // max value of date to be more than 3 months
  const maxDate = new Date(
    dateValue.getFullYear(),
    dateValue.getMonth() + 2,
    dateValue.getDate()
  )

  const minDateForEndTest = selector.startDate
    ? new Date(
        selector.startDate.getFullYear(),
        selector.startDate.getMonth(),
        selector.startDate.getDate()
      )
    : new Date()

  const [selectedPattern, setSelectedPattern] =
    useState<DropdownOptionData<any>>()
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([])
  const [selectedSubject, setSelectedSubject] = useState<number>(0)
  const [isFieldsValidate, setIsFieldsValidate] = useState(false)
  const [isTestSubmit, setIsTestSubmit] = useState(false)

  const [isSmall, setIsSmall] = useState(false)
  const [totalPatterns, setTotalPatterns] = useState(0)
  const [isPatternsLoad, setIsPatternsLoad] = useState(false)
  const [patternDetails, setPatternDetails] = useState(false)
  const [questions, setQuestions] = useState([])
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const Optionsdropdown = [
    { id: 'existing', label: 'Pre-defined' },
    { id: 'own', label: 'Custom' }
  ]

  const changeHandler = useCallback(
    (fieldName: string, value: any) => {
      dispatch(createTestDetails({ ...selector, [fieldName]: value }))
    },
    [dispatch, selector]
  )

  // useEffect(() => {
  //   if (selector.startDate && selector.testDuration >= 0) {
  //     const defaultStartTime = {
  //       title: `${new Date(addFifteenMinutes(new Date())).getHours() % 12 === 0
  //         ? 12
  //         : new Date(addFifteenMinutes(new Date())).getHours() % 12
  //         }`,
  //       firstName: `${`${new Date(
  //         addFifteenMinutes(new Date())
  //       ).getMinutes()}`.padStart(2, '0')}`,
  //       lastName: `${new Date(addFifteenMinutes(new Date())).getHours() > 12 ? 'PM' : 'AM'
  //         }`
  //     }

  //     let testStartTimes = formattedTime(
  //       selector.startDate,
  //       selector.startTime?.firstName ? selector.startTime : defaultStartTime
  //     )

  //     if (!moment(testStartTimes).isValid()) {
  //       console.error('Invalid date format for testStartTimes:', testStartTimes)
  //       return
  //     }

  //     const parsedDate = moment(testStartTimes)
  //     // const indiaTimezone = 'Asia/Kolkata'
  //     // parsedDate.tz(indiaTimezone)

  //     const dateObject = parsedDate.toDate()

  //     const endTime = new Date(dateObject)
  //     // Add the test duration in minutes to the end time
  //     endTime.setMinutes(endTime.getMinutes() + selector.testDuration)

  //     const tmpTime = formatOnlyTime(endTime)

  //     const tmpTimeSplit = tmpTime.split(' ')

  //     const hoursMinutes = tmpTimeSplit[0]
  //     const amPm = tmpTimeSplit[1][0] + tmpTimeSplit[1][1]
  //     const [hours, minutes] = hoursMinutes.split(':')

  //     const tmpEndTime = {
  //       title: hours,
  //       firstName: minutes,
  //       lastName: amPm
  //     }

  //     let selectData = { ...selector }
  //     selectData['endTime'] = tmpEndTime
  //     selectData['endDate'] = endTime
  //     dispatch(createTestDetails(selectData))

  //     console.log(endTime, 'endTimeSet')

  //     setEndTimeSet(endTime)

  //     setTestEndTime(formatOnlyTime(endTime))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selector.startDate, selector.testDuration, selector.startTime])

  const patternSelectHandler = async (
    data: DropdownOptionData<PatternData>
  ) => {
    setSelectedPattern(data)
    let selectData = { ...selector }
    const subjects = data.value?.subjects_details
    if (subjects && subjects?.length > 0) {
      const subjectsWithTotalMarks: any = subjects?.map((subject: any) => {
        let totalMarks = 0

        const updatedSections = (subject?.sections || []).map(
          (section: any) => {
            let sectionTotalQuestions = 0

            if (section.optional_question > 0) {
              totalMarks +=
                section.optional_question * section.marks_per_question
            } else {
              sectionTotalQuestions =
                section.questions_to - section.questions_from + 1
              totalMarks += sectionTotalQuestions * section.marks_per_question
            }

            return {
              ...section,
              total_questions_for_section: sectionTotalQuestions
            }
          }
        )

        return {
          ...subject,
          are_all_questions_added_for_subject: false,
          is_teacher_assigned: false,
          sections: updatedSections,
          total_subject_marks: totalMarks
        }
      })

      selectData['selectedPattenDetails'] = data
      selectData['testPattern'] = String(data.label)
      selectData['testPatternId'] = String(data.id)
      selectData['instructionText'] = String(data.value?.instruction_text)
      selectData['totalQuestions'] = Number(data.value?.total_questions)
      selectData['totalMarks'] = Number(data.value?.total_marks)
      selectData['courseId'] = String(data.value?.course_details?.course_id)
      selectData['course_name'] = String(
        data.value?.course_details?.course_name
      )
      selectData['testDuration'] = Number(data.value.test_duration)
      selectData['subjectDetails'] = subjectsWithTotalMarks
      dispatch(createTestDetails(selectData))
    }
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
            label: el
            // value: el
          }
        })
        setSelectedTestTypeOptions(typeData)
      })
      .finally(() => {
        setIsselectedTestTypeLoad(false)
      })
  }, [])
  useEffect(() => {
    if (isAutoFilled === 0 && selectedType?.id === 'withpattern') {
      setIsPatternsLoad(true)
      getAllTestPatternData({
        test_id: id || '',
        limit: 20,
        skip: 0
      })
        .then((data) => {
          setTotalPatterns(data.total)
          const optionsData = data.data.map((el: any) => {
            return {
              id: el._id,
              label: el.test_name,
              value: el
            }
          })
          const selectedData = optionsData.find((item: any) => item.id === id)

          if (selectedData) {
            setSelectedPattern(selectedData)
            let selectData = { ...selector }
            const subjects = selectedData.value?.subjects_details
            if (subjects && subjects?.length > 0) {
              const subjectsWithTotalMarks: any = subjects?.map(
                (subject: any) => {
                  let totalMarks = 0

                  const updatedSections = (subject?.sections || []).map(
                    (section: any) => {
                      let sectionTotalQuestions = 0

                      if (section.optional_question > 0) {
                        totalMarks +=
                          section.optional_question * section.marks_per_question
                      } else {
                        sectionTotalQuestions =
                          section.questions_to - section.questions_from + 1
                        totalMarks +=
                          sectionTotalQuestions * section.marks_per_question
                      }

                      return {
                        ...section,
                        total_questions_for_section: sectionTotalQuestions
                      }
                    }
                  )

                  return {
                    ...subject,
                    are_all_questions_added_for_subject: false,
                    is_teacher_assigned: false,
                    sections: updatedSections,
                    total_subject_marks: totalMarks
                  }
                }
              )
              selectData['selectedPattenDetails'] = selectedData
              selectData['testPattern'] = String(selectedData.label)
              selectData['testPatternId'] = String(selectedData.id)
              selectData['instructionText'] = String(
                selectedData.value?.instruction_text
              )
              selectData['totalQuestions'] = Number(
                selectedData.value?.total_questions
              )
              selectData['totalMarks'] = Number(selectedData.value?.total_marks)
              selectData['courseId'] = String(
                selectedData.value?.course_details?.course_id
              )
              selectData['course_name'] = String(
                selectedData.value?.course_details?.course_name
              )
              selectData['testDuration'] = Number(
                selectedData.value.test_duration
              )
              selectData['subjectDetails'] = subjectsWithTotalMarks
              dispatch(createTestDetails(selectData))
            }
          } else {
            setDropdownOptions((prev) => [...prev, ...optionsData])
          }

          setIsAutoFilled(1)
        })
        .catch((error: any) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsPatternsLoad(false))
    }

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAutoFilled, selectedType?.id])

  useEffect(() => {
    if (selector && selector?.selectedPattenDetails) {
      setSelectedPattern(selector.selectedPattenDetails)
    }
    if (selector.startTime.title) {
      setTestStartTime(getSelectedTime(selector.startTime))
    }
  }, [selector])

  useEffect(() => {
    const teacherAssignCount = selector?.subjectDetails?.reduce(
      (count, subject: any) =>
        subject?.teacher_details?.teacher_id ? count + 1 : count,
      0
    )

    setTeacherAssignCount(teacherAssignCount || 0)
  }, [selector.subjectDetails])

  const handleAddQuestions = () => {
    // let testStartTimes = formattedTime(
    //   selector.startDate,
    //   selector.startTime.firstName
    //     ? selector.startTime
    //     : getOnlyTimeObjectFormat(testStartTime)
    // )
    // const isPast = isDateInPast(testStartTimes)
    // if (isPast) {
    //   setTimeValidate(isPast)
    // }

    if (
      selector.testName &&
      selector.testName.length <= 50 &&
      selector.testDuration > 0 &&
      selectedPattern
    ) {
      if (
        selector.isPasswordProtect &&
        selector.password &&
        (selector.password?.length ?? 0) >= 6
      ) {
        setIsFieldsValidate(false)
        history.push(ROUTES_V2.ADD_QUESTION)
        changeHandler(
          'startTime',
          selector.startTime.firstName
            ? selector.startTime
            : getOnlyTimeObjectFormat(testStartTime)
        )
      } else {
        setIsFieldsValidate(true)
      }
      if (!selector.isPasswordProtect && !selector.password) {
        setIsFieldsValidate(false)
        history.push(ROUTES_V2.ADD_QUESTION)
        changeHandler(
          'startTime',
          selector.startTime.firstName
            ? selector.startTime
            : getOnlyTimeObjectFormat(testStartTime)
        )
      } else {
        setIsFieldsValidate(true)
      }
    } else {
      setIsFieldsValidate(true)
    }
  }
  const assignTeacherHandler = (teacherData: TeacherDetailsProps) => {
    const newDetails = deepClone(selector.subjectDetails)

    if (newDetails && selectedSubject < newDetails.length) {
      newDetails[selectedSubject].is_teacher_assigned = true
      newDetails[selectedSubject].teacher_details = teacherData

      const subjectDetails = newDetails[selectedSubject]

      // Reset each section's questions_list and update related properties
      subjectDetails.sections.forEach((section: any) => {
        section.questions_list = [] // Clear the list
        section.total_questions_for_section = 0 // Reset the count
      })

      // Reset the subject's status for questions
      subjectDetails.are_all_questions_added_for_subject = false

      newDetails[selectedSubject] = subjectDetails
      // Apply the changes to the main state
      changeHandler('subjectDetails', newDetails)

      // changeHandler('subjectDetails', newDetails)
    }
  }

  const handleRemoveTeacher = (id: number) => {
    setIsShowUpdate(false)
    const newDetails = deepClone(selector.subjectDetails)

    if (newDetails && id < newDetails.length) {
      newDetails[id].is_teacher_assigned = false
      delete newDetails[id].teacher_details
      changeHandler('subjectDetails', newDetails)
    }
  }

  const testSubmitAPI = () => {
    let testStartTimes = formattedTime(
      selector.startDate,
      selector.startTime.firstName
        ? selector.startTime
        : getOnlyTimeObjectFormat(testStartTime)
    )
    // const isPast = isDateInPast(testStartTimes)
    // if (isPast) {
    //   setTimeValidate(isPast)
    // }

    let testPatternDetails: any = {
      id: selector.testPatternId,
      name: selector.testPattern
    }

    let testEndTimeNew = formattedTime(
      selector.endDate,
      selector.endTime.firstName ? selector.endTime : testEndTime
    )

    let testType = 'SUPERADMIN_TEST'

    if (user.role === 'teacher') {
      testType = 'TEACHER_TEST'
    }

    if (user.role === 'student') {
      testType = 'PRACTICE_TEST'
    }

    const test_details: any = deepClone(selector.subjectDetails)
    for (let index = 0; index < test_details.length; index++) {
      const test_detail: any = test_details[index]

      if (test_detail?.sections) {
        for (let j = 0; j < test_detail.sections.length; j++) {
          if (!Array.isArray(test_detail.sections[j].question_type)) {
            test_detail.sections[j].question_type = [
              test_detail.sections[j].question_type
            ]
          }
        }
      }

      test_details[index] = test_detail
    }

    let payload: CreateInstituteTestPayload | any = {
      institute_test_name: selector.testName,
      test_pattern_details: testPatternDetails,
      course_id: selector.courseId,
      course_name: selector.course_name,

      test_duration_type: 'FIXED',
      test_duration: selector.testDuration,
      total_test_questions: selector.totalQuestions,
      total_marks: selector.totalMarks,
      add_password: selector.isPasswordProtect ? true : false,
      password: selector.password,
      instruction_text: selector.instructionText,
      created_by: user._id,
      test_details: {
        subjects_details: selector.subjectDetails
      },
      test_type: testType,
      type: selector.type,
      isOffline: selector.isOffline,
      hasOfflineQuestions: selector.hasOfflineQuestions,
      ...(!selector.isEdit ? { withoutPattern: false } : {})
    }

    if (selector.isTimeChange) {
      payload = {
        ...payload,
        test_start_time: testStartTimes,
        test_end_time: testEndTimeNew
      }
    }

    setIsTestSubmit(true)
    if (selector.isEdit) {
      payload['test_id'] = testId
      delete payload.course_name
      updateInstituteTestAPI(payload)
        .then(() => {
          CustomToastMessage(`Successfully updated!`, 'success')
          dispatch(createTestDetails(initialState))
          history.push(ROUTES_V2.TESTS)
        })
        .catch((error) => CustomToastMessage(error?.message, 'error'))
        .finally(() => setIsTestSubmit(false))
    } else {
      NewCreateInstituteTest(payload)
        .then(() => {
          CustomToastMessage(`Successfully Created!`, 'success')
          dispatch(createTestDetails(initialState))
          history.push(ROUTES_V2.TESTS)
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsTestSubmit(false))
    }
    setIsFieldsValidate(false)
  }

  const handleAssignTest = () => {
    if (
      selector.testName &&
      selector.testName.length <= 50 &&
      selector.testDuration > 0 &&
      selectedPattern
    ) {
      if (
        selector.isPasswordProtect &&
        selector.password &&
        (selector.password?.length ?? 0) >= 6
      ) {
        testSubmitAPI()
      } else {
        setIsFieldsValidate(true)
      }
      if (!selector.isPasswordProtect && !selector.password) {
        testSubmitAPI()
      } else {
        setIsFieldsValidate(true)
      }
    } else {
      setIsFieldsValidate(true)
    }
  }
  const handleTestSubmit = () => {
    if (selector.testName && selector.testName.length <= 50) {
      let payload: CreateInstituteTestPayload | any = {
        name: selector.testName,
        isOffline: selector.isOffline,
        hasOfflineQuestions: selector.hasOfflineQuestions,
        courseId: selectedGrade?.id,
        totalMark: selectedMark,
        type: selector.type
      }

      setIsTestSubmit(true)
      if (selector.isEdit) {
        payload['test_id'] = testId
        updateInstituteTestAPI(payload)
          .then(() => {
            CustomToastMessage(`Successfully updated!`, 'success')
            dispatch(createTestDetails(initialState))
            history.push(ROUTES_V2.TESTS)
          })
          .catch((error) => CustomToastMessage(error?.message, 'error'))
          .finally(() => setIsTestSubmit(false))
      } else {
        NewCreateInstituteTest(payload)
          .then(() => {
            CustomToastMessage(`Successfully Created!`, 'success')
            dispatch(createTestDetails(initialState))
            history.push(ROUTES_V2.TESTS)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => setIsTestSubmit(false))
      }
    }
  }

  useEffect(() => {
    if (selectedOption?.id === 'own' || selectedType?.id === 'withoutpattern') {
      SetIsCourseLoading(true)
      getQuestionBankV2CoursesAPI({ page: 1, limit: 120 })
        .then((res: any) => {
          const options: any = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setGrades(options)
          SetIsCourseLoading(false)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => SetIsCourseLoading(false))
    }
  }, [user.branchId, selectedOption?.id, selectedType?.id])

  const handleGradeSelect = (grade: any) => {
    changeHandler('courseId', grade.id)
    setSelectedGrade(grade)
    setSelectedSubject2(defaultValues)
    setSubjects([])
    if (grade.id) {
      SetIsSubjectLoading(true)
      getQuestionBankV2SubjectsAPI({
        page: 1,
        limit: 100,
        courseId: grade.id
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setSubjects(options)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => SetIsSubjectLoading(false))
    }
  }

  useEffect(() => {
    if (selector.isEdit && !selector.withoutPattern) {
      setSelectedType({ id: 'withpattern', label: 'Assessment With Pattern' })
      getNewAllTestData({
        test_id: testId,
        // course_id: courseId,
        skip: 0,
        limit: 525,
        show_only_user_created_tests: false,
        withoutPattern: false
      })
        .then((res) => {
          const questionArray =
            res?.data[0]?.test_details[0]?.sections[0]?.questions_list?.map(
              (item: any) => ({
                questionId: item._id,
                mark: item?.mark
              })
            )

          setQuestions(questionArray)
          setSelectedTestType({
            value: res?.data[0]?.type,
            label: res?.data[0]?.type,
            id: res?.data[0]?.type
          })
          setTypeText(res?.data[0]?.type)
          setSelectedGrade({
            value: res?.data[0]?.course_name,
            label: res?.data[0]?.course_name,
            id: res?.data[0]?.course_id
          })
          setSelectedSubject2({
            value: res?.data[0]?.test_details[0]?.subject_name,
            label: res?.data[0]?.test_details[0]?.subject_name,
            id: res?.data[0]?.test_details[0]?.subject_id
          })
          setPatternDetails(res?.data[0]?.test_pattern_details ? true : false)
          const testSubjectDetails = res?.data[0]?.test_details
          if (testSubjectDetails) {
            const newDetailed = testSubjectDetails.map((item: any) => {
              delete item.author_name
              if (!item.is_teacher_assigned) {
                delete item.teacher_details
              }
              return {
                ...item,
                sections: item.sections.map((section: any) => {
                  const { questions_list, solutionImages, ...restOfSection } =
                    section
                  console.log(solutionImages, 'solutionImages')
                  return {
                    ...restOfSection,
                    questions_list: questions_list || []
                  }
                })
              }
            })
            const start: Date = res?.data[0]?.test_start_time || new Date()
            const end: Date = res?.data[0]?.test_end_time || new Date()

            if (res?.data[0]?.test_start_time || res?.data[0]?.test_end_time) {
              changeHandler('isTimeChange', true)
            }

            const newStartDate = start
              ? {
                  title: `${
                    new Date(start).getHours() % 12 === 0
                      ? 12
                      : new Date(start).getHours() % 12
                  }`,
                  firstName: `${new Date(start).getMinutes()}`.padStart(2, '0'),
                  lastName: new Date(start).getHours() >= 12 ? 'PM' : 'AM'
                }
              : ''

            const newEndDate = end
              ? {
                  title: `${
                    new Date(end).getHours() % 12 === 0
                      ? 12
                      : new Date(end).getHours() % 12
                  }`,
                  firstName: `${new Date(end).getMinutes()}`.padStart(2, '0'),
                  lastName: new Date(end).getHours() >= 12 ? 'PM' : 'AM'
                }
              : ''

            changeHandler('startTime', newStartDate)
            changeHandler('endTime', newEndDate)

            if (newStartDate && newEndDate) {
              setTestStartTime(getSelectedTime(newStartDate))
              setTestEndTime(getSelectedTime(newEndDate))
            }

            const removeData = res?.data?.map((item: any) => ({
              testName: item?.institute_test_name,
              courseId: item?.course_id,
              test_id: testId,
              testDuration: item?.test_duration,
              isPasswordProtect: item?.add_password ? true : false,
              password: item.password,
              subjectDetails: newDetailed,
              endTime: newEndDate,
              startTime: newStartDate,
              startDate: item?.test_start_time
                ? new Date(item?.test_start_time)
                : new Date(),
              testPatternId: item?.test_pattern_details?.id,
              testPattern: item.test_pattern_details?.name,
              selectedPattenDetails: {
                id: item?.test_pattern_details?.id,
                label: item?.test_pattern_details?.name,
                value: {
                  subjects_details: newDetailed
                }
              },
              endDate: item?.test_end_time
                ? new Date(item?.test_end_time)
                : new Date(),
              instructionText: item?.instruction_text,
              totalQuestions: item?.total_test_questions,
              totalMarks: item?.total_marks,
              isEdit: true,
              isPreviewed: true,
              type: item?.type,
              withoutPattern: item?.withoutPattern
            }))[0]
            dispatch(createTestDetails(removeData))
          }
        })
        .catch((error) => console.log({ error }))
    } else if (selector.isEdit && selector.withoutPattern) {
      setSelectedType({
        id: 'withoutpattern',
        label: 'Assessment Without Pattern'
      })
      // getNoPatternSingleTestData({
      //   testId: testId,
      //   withoutPattern: true
      // })
      getNewAllTestData({
        test_id: testId,
        // course_id: courseId,
        skip: 0,
        limit: 525,
        // show_only_user_created_tests: false,
        withoutPattern: true
      })
        .then((res) => {
          // setSelectedGrade(
          //   res.data?.map((data: any) => ({
          //     value: data?.course_name,
          //     label: data?.course_name,
          //     id: data?.course_id
          //   }))
          // )
          const start: Date = res?.data?.startTime || new Date()
          const end: Date = res?.data?.endTime || new Date()

          if (res?.data?.startTime || res?.data?.endTime) {
            changeHandler('isTimeChange', true)
          }
          const questionArray =
            res?.data[0]?.test_details[0]?.sections[0]?.questions_list?.map(
              (item: any) => ({
                questionId: item._id,
                mark: item?.mark
              })
            )
          setQuestions(questionArray)
          const newStartDate = start
            ? {
                title: `${
                  new Date(start).getHours() % 12 === 0
                    ? 12
                    : new Date(start).getHours() % 12
                }`,
                firstName: `${new Date(start).getMinutes()}`.padStart(2, '0'),
                lastName: new Date(start).getHours() >= 12 ? 'PM' : 'AM'
              }
            : ''

          const newEndDate = end
            ? {
                title: `${
                  new Date(end).getHours() % 12 === 0
                    ? 12
                    : new Date(end).getHours() % 12
                }`,
                firstName: `${new Date(end).getMinutes()}`.padStart(2, '0'),
                lastName: new Date(end).getHours() >= 12 ? 'PM' : 'AM'
              }
            : ''

          changeHandler('startTime', newStartDate)
          changeHandler('endTime', newEndDate)

          if (newStartDate && newEndDate) {
            setTestStartTime(getSelectedTime(newStartDate))
            setTestEndTime(getSelectedTime(newEndDate))
          }
          setSelectedTestType({
            value: res?.data[0]?.type,
            label: res?.data[0]?.type,
            id: res?.data[0]?.type
          })
          setTypeText(res?.data[0]?.type)
          setSelectedGrade({
            value: res?.data[0]?.course_name,
            label: res?.data[0]?.course_name,
            id: res?.data[0]?.course_id
          })
          setSelectedSubject2({
            value: res?.data[0]?.test_details[0]?.subject_name,
            label: res?.data[0]?.test_details[0]?.subject_name,
            id: res?.data[0]?.test_details[0]?.subject_id
          })
          const testSubjectDetails = res?.data[0]?.test_details
          const newDetailed = testSubjectDetails.map((item: any) => {
            delete item.author_name
            if (!item.is_teacher_assigned) {
              delete item.teacher_details
            }
            return {
              ...item,
              sections: item.sections.map((section: any) => {
                const { questions_list, solutionImages, ...restOfSection } =
                  section
                console.log(solutionImages, 'solutionImages')
                return {
                  ...restOfSection,
                  questions_list: questions_list || []
                }
              })
            }
          })
          const removeData = res?.data?.map((item: any) => ({
            testName: item?.institute_test_name,
            courseId: item?.course_id,
            course_name: item?.course_name,
            test_id: testId,
            testDuration: item?.test_duration,
            endTime: newEndDate,
            startTime: newStartDate,
            startDate: item?.test_start_time
              ? new Date(item?.test_start_time)
              : new Date(),
            endDate: item?.test_end_time
              ? new Date(item?.test_end_time)
              : new Date(),
            instructionText: item?.instruction_text,
            totalQuestions: item?.total_test_questions,
            totalMarks: item?.total_marks,
            isEdit: true,
            isPreviewed: true,
            type: item?.type,
            subjectDetails: newDetailed
            // withoutPattern: item?.withoutPattern
          }))[0]
          dispatch(createTestDetails(removeData))
        })
        .catch((error) => console.log({ error }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    testId,
    courseId,
    dispatch,
    user._id,
    selector.isEdit,
    selector.withoutPattern
  ])

  const iconMap: { [key: string]: JSX.Element } = {
    physics: <NewPhysicsIconSvg />,
    chemistry: <ChemistrySvg />,
    maths: <PhysicsSvg />,
    mathematics: <PhysicsSvg />,
    science: <PhysicsSvg />,
    biology: <PhysicsSvg />
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
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

  const handleScrollWithGetCourse = (total: number, length: number) => {
    if (total > length) {
      setIsPatternsLoad(true)
      getAllTestPatternData({
        test_id: id || '',
        limit: 20,
        skip: length
      })
        .then((data) => {
          setTotalPatterns(data.total)
          const optionsData = data.data.map((el: any) => {
            return {
              id: el._id,
              label: el.test_name,
              value: el
            }
          })
          setDropdownOptions((prev) => [...prev, ...optionsData])
        })
        .catch((error: any) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsPatternsLoad(false))
    }
  }
  const AssessmentTypes = [
    { id: 'withpattern', label: 'Assessment With Pattern' },
    { id: 'withoutpattern', label: 'Assessment Without Pattern' }
  ]
  const TeacherCourseId = selectedPattern?.value?.course_details?.course_id
  return (
    <>
      {isPopUp && (
        <AssignTeacherPopUp
          {...{
            selectedSubject,
            setIsPopUp,
            assignTeacherHandler,
            TeacherCourseId
          }}
        />
      )}

      <PageContainer>
        <FormContainerV2>
          <Grid columns={isSmall ? 1 : 12} gap="20px">
            <GridItem columnSpan={5}>
              <Flex gap="20px" direction="column" alignItems="baseline">
                <SearchableDropdown
                  isLoader={selectedTestTypeLoad}
                  label={'Select Assesment Type'}
                  placeHolder={
                    'Please Select Assesment Type / Enter Assesment Type'
                  }
                  options={selectedTestTypeOptions}
                  onSelect={(Type) => {
                    setSelectedTestType(Type)
                    setTypeText(Type?.id)
                    changeHandler('type', Type?.id)
                  }}
                  onChange={(value) => {
                    setTypeText(value)
                    changeHandler('type', value)
                  }}
                  selectedValue={selectedTestType}
                  isClear={selectedTestType?.id ? true : false}
                  required
                  fullWidth
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%'
                  }}
                >
                  <InputV2
                    label="Test Name"
                    full
                    value={selector.testName}
                    required
                    error={
                      selector.testName && selector.testName.length > 50
                        ? 'Maximum length exceeded (50 characters max)'
                        : selector.testName || !isFieldsValidate
                        ? ''
                        : 'Field is required'
                    }
                    placeholder="JEE Test For Falcon Group"
                    onChange={(e) => {
                      changeHandler('testName', e.target.value)
                      setIsDirty(true)
                      setIsShowUpdate(true)
                    }}
                  />
                  <CheckboxContainer
                    className="checkbox"
                    onClick={() => {
                      changeHandler('isOffline', !selector.isOffline)
                      if (selector.isOffline) {
                        setSelectedOption('')
                        setSelectedPattern(undefined)
                        setSelectedType(null)
                        setSelectedGrade(null)
                        setDropdownOptions([])
                        dispatch(createTestDetails({})) // Reset the test details in the Redux store
                      }
                    }}
                    isChecked={selector.isOffline || false}
                    style={{
                      border: 'none',
                      padding: '0px',
                      gap: '0px',
                      marginTop: '30px',
                      boxShadow: 'none'
                    }}
                  >
                    <Checkbox style={{ backgroundColor: 'white' }}>
                      {selector.isOffline ? <CheckedSvg /> : <UnCheckedSvg />}
                    </Checkbox>
                    <span>IsOffline</span>
                  </CheckboxContainer>
                </div>

                {selector.isOffline && (
                  <SearchableDropdown
                    label="Select Question Sourse"
                    selectedValue={selectedOption}
                    fullWidth
                    isClear={selectedOption?.label ? true : false}
                    onSelect={(data) => {
                      setSelectedOption(data)
                      changeHandler(
                        'hasOfflineQuestions',
                        data.id == 'own' ? true : false
                      )
                    }}
                    placeHolder="Select an option"
                    options={Optionsdropdown}
                    required
                  />
                )}

                {!selector.isEdit && (
                  <>
                    {(!selectedOption || selectedOption?.id === 'existing') && (
                      <SearchableDropdown
                        label="Select Pattern Type"
                        placeHolder="Please Select Pattern Type"
                        options={AssessmentTypes}
                        onSelect={(Type) => {
                          setSelectedType(Type)
                        }}
                        selectedValue={selectedType}
                        isClear={selectedType?.id}
                        required
                        fullWidth
                      />
                    )}
                    {selectedOption?.id === 'own' && (
                      <>
                        <SearchableDropdown
                          label="Select Grade"
                          placeHolder="Please Select Grade"
                          options={grades}
                          onSelect={(Grade) => {
                            setSelectedGrade(Grade)
                          }}
                          selectedValue={selectedGrade}
                          isClear={!!selectedGrade?.id}
                          required
                          fullWidth
                        />
                        <InputV2
                          label="Total Marks Of Offline Test"
                          full
                          value={selectedMark}
                          error={
                            !Number(selectedMark)
                              ? 'Enter a valid number > 0'
                              : ''
                          }
                          placeholder="Enter Total Marks"
                          onChange={(e) => {
                            setSelectedMark(e.target.value)
                            changeHandler('totalMarks', e.target.value)
                            setIsDirty(true)
                            setIsShowUpdate(true)
                          }}
                        />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%'
                          }}
                        >
                          <SimpleButton
                            disabled={isTestSubmit}
                            label="Create Test"
                            clickHandler={() => {
                              setIsDirty(false)
                              setTimeout(() => handleTestSubmit())
                            }}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}

                {selectedType?.id === 'withpattern' ||
                (selector.isEdit && patternDetails) ? (
                  <Dropdown
                    label="Select Test Pattern"
                    selectedValue={selectedPattern}
                    isLoading={isPatternsLoad}
                    total={totalPatterns}
                    length={dropdownOptions.length}
                    handleScrollInfinite={(total, length) =>
                      handleScrollWithGetCourse(total, length)
                    }
                    onSelect={(e) => {
                      patternSelectHandler(e)
                      setIsDirty(true)
                      setIsShowUpdate(true)
                    }}
                    placeholder="Select Test Pattern"
                    required
                    options={dropdownOptions}
                    fullWidth
                  />
                ) : (
                  ''
                )}
                {selectedType?.id === 'withoutpattern' ||
                (selector.isEdit && !patternDetails) ? (
                  <SearchableDropdown
                    label={'Select Grade'}
                    placeHolder={'Please Select Grade'}
                    options={grades}
                    onSelect={handleGradeSelect}
                    selectedValue={selectedGrade}
                    isClear={selectedGrade?.id ? true : false}
                    required
                    isLoader={isCourseLoadingAPI}
                    fullWidth
                  />
                ) : (
                  ''
                )}
                {selectedType?.id === 'withoutpattern' ||
                (selector.isEdit && !patternDetails) ? (
                  <SearchableDropdown
                    label={'Select Subject'}
                    placeHolder={'Please Select Subject'}
                    options={subjects}
                    onSelect={(subject: any) => {
                      setSelectedSubject2(subject)
                      const subDet = [
                        {
                          subject_id: subject.id,
                          subject_name: subject.label
                        }
                      ]
                      changeHandler('subjectDetails', subDet)
                    }}
                    selectedValue={selectedSubject2}
                    isClear={selectedSubject2?.id ? true : false}
                    isLoader={isSubjectLoading}
                    required
                    fullWidth
                  />
                ) : (
                  ''
                )}
                {selectedType?.id === 'withoutpattern' ||
                (selector.isEdit && !patternDetails) ? (
                  <ButtonV2
                    style={{ alignSelf: 'flex-end', marginTop: '10px' }}
                    onClick={() => {
                      if (!selectedGrade?.id || !selectedSubject2?.id) {
                        CustomToastMessage('Select Grades And Subject', 'error')
                      } else if (!typeText) {
                        CustomToastMessage(
                          'Select/Enter the Assesment type',
                          'error'
                        )
                      } else {
                        setIsDirty(false)
                        history.push({
                          pathname:
                            // edit ? `${ROUTES_V2.QUESTIONS_WITHOUT_PATTERN}/${params.id}` :
                            `${ROUTES_V2.QUESTIONS_WITHOUT_PATTERN}`,
                          state: {
                            allData: selector,
                            name: selector.testName,
                            courseId: selectedGrade?.id,
                            subjectId: selectedSubject2?.id,
                            edit: selector.isEdit,
                            type: typeText,
                            ...(viewMode === 'view' && { viewMode: viewMode }),
                            ...(selector.isEdit && { questions: questions })
                          }
                        })
                      }
                    }}
                  >
                    {viewMode === 'view'
                      ? 'View Questions'
                      : selector.isEdit
                      ? 'Edit Questions'
                      : 'Select Questions'}
                  </ButtonV2>
                ) : (
                  ''
                )}
                {/* <InputNumber
                  required
                  withHandler
                  error={
                    selector.testDuration > 0 || !isFieldsValidate
                      ? ''
                      : 'field is required'
                  }
                  label="Total Test Duration"
                  value={selector.testDuration}
                  onChange={(val) => {
                    changeHandler('testDuration', val)
                    setIsDirty(true)
                    setIsShowUpdate(true)
                  }}
                /> */}
              </Flex>
            </GridItem>
            <Divider2></Divider2>
            <GridItem columnSpan={5}>
              <Flex
                justifyContent="center"
                direction="column"
                style={{ width: '100%', height: '100%' }}
              >
                {selector.isEdit && (
                  <>
                    <CalendarInput
                      label="Select Start date and Time"
                      title="Start date - Time"
                      defaultDate={
                        selector?.startDate
                          ? String(format(selector.startDate, 'do MMMM, yyyy'))
                          : ''
                      }
                      defaultTime={testStartTime || ''}
                      onChangeDate={(val) => {
                        setIsDirty(true)

                        setIsShowUpdate(true)
                        let selectData = { ...selector }

                        selectData['startDate'] = val
                        selectData['isTimeChange'] = true
                        dispatch(createTestDetails(selectData))
                      }}
                      onChangeTime={(val) => {
                        setIsDirty(true)
                        setIsShowUpdate(true)

                        let selectData: any = { ...selector }

                        selectData['startTime'] = val
                        selectData['isTimeChange'] = true
                        dispatch(createTestDetails(selectData))
                        // if (val) {
                        //   changeHandler('isTimeChange', true)
                        // }
                      }}
                      minDate={minDate}
                      maxDate={maxDate}
                      color="#1377B9"
                    />
                    {/* {isFieldsValidate && timeValidate && (
                      <RequiredError>
                        Please Select Upcoming Date & Time
                      </RequiredError>
                    )} */}
                    <br />
                    <CalendarInput
                      // disabled={true}
                      label="Select End date and Time"
                      title="End date - Time"
                      defaultDate={
                        selector.endDate
                          ? String(format(selector.endDate, 'do MMMM, yyyy'))
                          : ''
                      }
                      defaultTime={testEndTime || ''}
                      onChangeDate={(val) => {
                        changeHandler('endDate', val)
                      }}
                      onChangeTime={(val: any) => {
                        changeHandler('endTime', val)
                        setTestEndTime(getSelectedTime(val))
                      }}
                      minDate={minDateForEndTest}
                      maxDate={maxDate}
                      color="#1377B9"
                    />
                  </>
                )}
                {selectedType?.id === 'withpattern' ||
                (selector.isEdit && patternDetails) ? (
                  <Flex
                    className="mt-3 w-100"
                    gap="10px"
                    direction="column"
                    alignItems="baseline"
                  >
                    <div className="d-flex align-items-center">
                      <TextPara>Enable Password Protection</TextPara>
                      <Form.Check
                        checked={selector.isPasswordProtect}
                        type="switch"
                        id="reverse-radio-1"
                        onChange={(e) => {
                          changeHandler('isPasswordProtect', e.target.checked)
                          setIsDirty(true)
                          setIsShowUpdate(true)
                        }}
                      />
                    </div>
                    <InputPasswordV2
                      label="Set Password (Min Length 6 characters)"
                      value={selector.password ?? ''}
                      placeholder="Enter Password"
                      password={true}
                      error={
                        selector.isPasswordProtect && !selector.password
                          ? 'Field is required'
                          : selector.isPasswordProtect &&
                            (selector.password?.length ?? 0) < 6
                          ? 'Password must be at least 6 characters'
                          : ''
                      }
                      onChange={(e) =>
                        changeHandler('password', e.target.value)
                      }
                      type="Password"
                      disabled={!selector.isPasswordProtect}
                      style={{
                        cursor: selector.isPasswordProtect
                          ? 'text'
                          : 'not-allowed'
                      }}
                    />
                  </Flex>
                ) : (
                  ''
                )}
              </Flex>
            </GridItem>
          </Grid>
          {selectedType?.id === 'withpattern' && (
            <Grid
              columns={isSmall ? 1 : 12}
              hidden={!selectedPattern?.value}
              style={{ marginTop: '30px' }}
            >
              <GridItem columnSpan={isSmall ? 12 : 9}>
                <BottomDiv>
                  <div className="d-flex justify-content-between align-items-center mb-1 w-100">
                    <div
                      className="d-flex gap-2 align-items-center"
                      style={{
                        width: isSmall ? '100%' : '80%',
                        overflowX: 'auto'
                      }}
                    >
                      {selectedPattern?.value.subjects_details.map(
                        (el: any, ind: number) => (
                          <>
                            {ind !== 0 && <BarLine />}
                            <SubjectsDiv
                              key={ind}
                              onClick={() => setSelectedSubject(ind)}
                              style={{ cursor: 'pointer' }}
                              active={ind === selectedSubject}
                            >
                              {iconMap[el.subject_name.toLocaleLowerCase()]}
                              <TextPara
                                className="d-flex align-items-center "
                                style={{
                                  padding: '0 15px',
                                  color:
                                    ind === selectedSubject
                                      ? Blue
                                      : SecondaryGray600,
                                  fontSize: '15px',
                                  fontWeight: 700,
                                  textWrap: 'nowrap'
                                }}
                              >
                                {el.subject_name}
                                {ind % 2 === 0 ? (
                                  <Divider2
                                    style={{
                                      display: 'inline',
                                      paddingLeft: '1rem'
                                    }}
                                  ></Divider2>
                                ) : null}
                              </TextPara>
                            </SubjectsDiv>
                          </>
                        )
                      )}
                    </div>
                    {user.role !== 'teacher' && (
                      <MainSearchDiv className="display-none-mobile">
                        <SearchDiv>
                          <SearchBox placeholder="Search Sections, Question Type" />
                        </SearchDiv>
                      </MainSearchDiv>
                    )}
                  </div>
                  {selectedPattern?.value ? (
                    <CreateAssignTestTable
                      selectedData={selectedPattern?.value}
                      selectedSubject={selectedSubject}
                      // selectedSections={selector.subjectDetails}
                      // setSelectedSections={dispatchSubjectDetails}
                    />
                  ) : null}

                  {user.role !== 'teacher' && (
                    <TeacherAssignContainer>
                      {newSubjectDetails &&
                        newSubjectDetails[selectedSubject]?.teacher_details &&
                        newSubjectDetails[selectedSubject]?.teacher_details
                          ?.teacher_name && (
                          <AssignTeacherSection>
                            <UserDiv>
                              <TeacherIcon />{' '}
                              <p>
                                {
                                  newSubjectDetails[selectedSubject]
                                    ?.teacher_details?.teacher_name
                                }
                              </p>
                            </UserDiv>
                            <RemoveBtn
                              onClick={() =>
                                handleRemoveTeacher(selectedSubject)
                              }
                            >
                              Remove
                            </RemoveBtn>
                          </AssignTeacherSection>
                        )}
                      <AssignTeacherButton
                        label={
                          newSubjectDetails &&
                          newSubjectDetails[selectedSubject]?.teacher_details &&
                          newSubjectDetails[selectedSubject]?.teacher_details
                            ?.teacher_name
                            ? `Re-Assign ${newSubjectDetails[selectedSubject]?.subject_name} Teacher`
                            : `Assign ${newSubjectDetails[selectedSubject]?.subject_name} Teacher`
                        }
                        clickHandler={() => setIsPopUp(!isPopUp)}
                      />
                    </TeacherAssignContainer>
                  )}
                </BottomDiv>
              </GridItem>
              <GridItem
                className="d-flex align-items-end justify-content-end"
                columnSpan={3}
              >
                <BottomRightSection>
                  {user.role !== 'teacher' && (
                    <NoteSections>
                      Note:
                      {newSubjectDetails.map((selectSubject: any) => (
                        <p key={selectSubject?.subject_name}>
                          {selectSubject?.teacher_details &&
                          selectSubject?.teacher_details?.teacher_name ? (
                            `${selectSubject.teacher_details?.teacher_name} will add Questions for ${selectSubject.subject_name}`
                          ) : (
                            <span>
                              Admin Can still add questions for{' '}
                              {selectSubject.subject_name}
                            </span>
                          )}
                        </p>
                      ))}
                    </NoteSections>
                  )}

                  <div className="d-flex justify-content-end">
                    {selector.isEdit &&
                      !(
                        selector?.subjectDetails.length === teacherAssignCount
                      ) &&
                      isShowUpdate && (
                        <div className="d-flex me-4">
                          <SimpleButton
                            disabled={isTestSubmit}
                            label="Update"
                            clickHandler={() => {
                              setIsDirty(false)
                              setTimeout(() => handleAssignTest())
                            }}
                          />
                        </div>
                      )}
                    <SimpleButton
                      disabled={isTestSubmit}
                      label={
                        selector?.subjectDetails.length === teacherAssignCount
                          ? `${selector.isEdit ? 'Update' : 'Save'}`
                          : `${
                              viewMode === 'view'
                                ? 'View'
                                : selector.isEdit
                                ? 'Edit'
                                : 'Add'
                            }  Questions`
                      }
                      clickHandler={() => {
                        setIsDirty(false)
                        setTimeout(() => {
                          selector?.subjectDetails.length === teacherAssignCount
                            ? handleAssignTest()
                            : handleAddQuestions()
                        }, 10)
                      }}
                    />
                  </div>
                </BottomRightSection>
              </GridItem>
            </Grid>
          )}
        </FormContainerV2>
      </PageContainer>

      <Prompt
        when={isDirty}
        message="If you leave this page, any unsaved data will be lost. Are you sure you want to leave?"
      />
    </>
  )
}

export default CreateScheduleAssignTest
