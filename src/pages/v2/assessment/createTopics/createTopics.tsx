import InputV2 from '../../../../components/V2/Form/Input'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  AllAddCourse2,
  CreateCourseWrapper,
  Heading,
  ButtonWrap
} from './styledComponents'
import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  createTopics,
  getAllCourses,
  getChapterData,
  getSingleTopic,
  getSubjectData,
  updateTopics
} from '../../../../helpers/V2/apis'
import {
  CreateTopicsProps,
  FinalpayloadCreateTopic,
  GetCourseResponse
} from '../../../../utils/types'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
// import CreateSubjectValidation from './helper'
// import { hasFormError } from '../../../../helpers/formValidation'
// import { LoaderIcon } from 'react-hot-toast'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
// import {
//   DropdownContainer,
//   DropdownOption,
//   DropdownPopup
// } from '../../../../components/V2/Table/PopupMenu'
// import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
// import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon-red.svg'
// import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import { LoaderAlign } from '../createSubjects/styledComponents'
import { LoaderIcon } from 'react-hot-toast'
import CreateTopicValidation from './helper'
import { hasFormError } from '../../../../helpers/V2/formValidation'
import ROUTES_V2 from '../../../../const/V2/routes'

const topicinfo = {
  name: '',
  chapterId: '',
  sequence: 0
}

const CreateTopics = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [course, setCourse] = useState('')
  const [isCourseLoading, setIsCourseLoading] = useState(false)
  const [isSubjectLoading, setIsSubjectLoading] = useState(false)
  const [isChapterLoading, setIsChapterLoading] = useState(false)
  const [courseList, setCourseList] = useState<[GetCourseResponse]>()
  const [errors, setErrors] = useState({} as Record<string, string>)
  const [subjectList, setSubjectList] = useState<any>()
  const [chapterList, setChapterList] = useState<any>()
  const [createSubject, setCreateSubject] =
    useState<CreateTopicsProps>(topicinfo)
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [defaultChapter, setDefaultChapter] =
    useState<SearchableDropdownOptionData>()
  const [selectedCourse, setSelectedCourse] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [selectedChapter, setSelectedChapter] =
    useState<SearchableDropdownOptionData>()

  const { id }: any = useParams()

  const history = useHistory()

  useEffect(() => {
    setIsCourseLoading(true)
    getAllCourses()
      .then((response) => {
        setCourseList(response.data.data)
      })
      .finally(() => setIsCourseLoading(false))
  }, [])

  useEffect(() => {
    if (selectedCourse?.id) {
      setIsSubjectLoading(true)
      getSubjectData({
        courseId: selectedCourse?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          setSubjectList(response)
        })
        .finally(() => setIsSubjectLoading(false))
    }
  }, [selectedCourse])

  useEffect(() => {
    if (selectedSubject && selectedSubject?.id) {
      setIsChapterLoading(true)
      getChapterData({
        subjectId: selectedSubject?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          setChapterList(response?.data)
        })
        .finally(() => setIsChapterLoading(false))
    }
  }, [selectedSubject])

  const FinalCourseList: SearchableDropdownOptionData[] = courseList
    ? courseList.map((course) => ({
        id: course._id,
        label: course.name
      }))
    : []
  const FinalSubjectList: SearchableDropdownOptionData[] = subjectList
    ? subjectList.map((subject: any) => ({
        id: subject._id,
        label: subject.name
      }))
    : []
  const FinalChapterList: SearchableDropdownOptionData[] = chapterList
    ? chapterList.map((chapter: any) => ({
        id: chapter._id,
        label: chapter.name
      }))
    : []

  const handleCourseSelect = (courses: SearchableDropdownOptionData) => {
    setSelectedCourse(courses)
    setDefaultChapter({ label: '', id: '' })
    setSelectedSubject({ id: '', label: '', value: '' })
    setSelectedChapter({ id: '', label: '', value: '' })
    setSubjectList([])
    setChapterList([])
    if (courses && courses.id) {
      setCreateSubject({
        ...createSubject
      })
    }
  }

  const handleSubjectSelect = (subject: SearchableDropdownOptionData) => {
    setSelectedSubject(subject)
    setDefaultChapter({ label: '', id: '' })
    setSelectedChapter({ id: '', label: '', value: '' })
    setChapterList([])
    if (subject && subject.id) {
      setCreateSubject({
        ...createSubject
      })
    }
  }

  const handleChapterSelect = (chapter: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedChapter(chapter)
    if (chapter && chapter.id) {
      setCreateSubject({
        ...createSubject,
        chapterId: chapter.id as string
      })
    }
  }

  const [showDropDownIndex, setShowDropDownIndex] = useState(null)
  console.log(showDropDownIndex)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))

  const createTopic = () => {
    const validationError = CreateTopicValidation(createSubject, errors)
    if (hasFormError(validationError)) {
      setErrors(validationError)
      setCourse('')
      CustomToastMessage('Please Enter the Required Fields', 'error')
    } else {
      setIsLoading(true)
      if (isEdit) {
        updateTopics(
          {
            name: createSubject.name,
            chapterId: selectedChapter?.id
              ? selectedChapter?.id
              : defaultChapter?.id,
            sequence: createSubject.sequence
          },
          id
        )
          .then((res) => {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.LIST_TOPICS)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        createTopics({
          name: createSubject.name,
          chapterId: selectedChapter?.id,
          sequence: createSubject.sequence
        })
          .then((response) => {
            CustomToastMessage(response.data.message, 'success')
            history.push(ROUTES_V2.LIST_TOPICS)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    }
  }

  const validateField = (field: {
    type: FinalpayloadCreateTopic
    value: any
  }): void => {
    setErrors(CreateTopicValidation(createSubject, errors, field))
  }

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      getSingleTopic({ id: id })
        .then((response) => {
          setSelectedChapter({
            label: response.data.chapterName,
            id: response.data.chapterId
          })
          setCreateSubject(response?.data)
          setSelectedCourse({
            label: response.data.courseName,
            id: response.data.courseId
          })
          setSelectedSubject({
            label: response.data.subjectName,
            id: response.data.subjectId
          })
          setDefaultChapter({
            label: response.data.chapterName,
            id: response.data.chapterId
          })
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [id])

  return (
    <AllAddCourse2>
      {userInfoV2.role === 'instituteAdmin' ? (
        ''
      ) : userInfoV2.role === 'branchAdmin' ? (
        ''
      ) : (
        <CreateCourseWrapper>
          <Heading>{id ? 'Edit Topic' : 'Create New Topic'}</Heading>
          <Flex gap="20px" style={{ marginBottom: '20px' }} wrap>
            <SearchableDropdown
              label="Select Grade"
              required
              options={FinalCourseList}
              // error={course === '' ? errors.courseId : ''}
              onSelect={handleCourseSelect}
              placeHolder={'Please Select Grade'}
              isLoader={isCourseLoading}
              selectedValue={selectedCourse}
              isClear={selectedCourse?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
            <SearchableDropdown
              label="Select Subject"
              required
              options={FinalSubjectList}
              // error={course === '' ? errors.courseId : ''}
              isLoader={isSubjectLoading}
              onSelect={handleSubjectSelect}
              placeHolder={'Please Select Subject'}
              selectedValue={selectedSubject}
              isClear={selectedSubject?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
          </Flex>
          <Flex gap="20px" style={{ marginBottom: '20px' }} wrap>
            <SearchableDropdown
              label="Select Chapter"
              required
              options={FinalChapterList}
              isLoader={isChapterLoading}
              error={course === '' ? errors.chapterId : ''}
              onSelect={handleChapterSelect}
              placeHolder={'Please Select Chapter'}
              selectedValue={selectedChapter}
              isClear={selectedChapter?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
            <InputV2
              label="Topic Name"
              required
              placeholder="Enter Topic name"
              onBlur={() => {
                validateField({
                  type: FinalpayloadCreateTopic.name,
                  value: createSubject.name
                })
              }}
              error={errors.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCreateSubject({ ...createSubject, name: event.target.value })
              }}
              value={createSubject.name}
              full
            ></InputV2>
          </Flex>
          <Flex gap="20px" style={{ width: '50%', paddingRight: '10px' }}>
            <InputV2
              label="Topic Sequence"
              required
              placeholder="Enter Topic Sequence"
              onBlur={() => {
                validateField({
                  type: FinalpayloadCreateTopic.sequence,
                  value: createSubject.sequence
                })
              }}
              error={errors.sequence}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCreateSubject({
                  ...createSubject,
                  sequence: Number(event.target.value)
                })
              }}
              value={createSubject.sequence === 0 ? '' : createSubject.sequence}
              full
            ></InputV2>
          </Flex>
          <ButtonWrap>
            <div>
              {isLoading ? (
                <LoaderAlign>
                  <LoaderIcon />
                </LoaderAlign>
              ) : (
                <ButtonV2 disabled={isLoading} onClick={createTopic}>
                  {isEdit ? 'Update' : 'Save & Add More'}
                </ButtonV2>
              )}
            </div>
          </ButtonWrap>
        </CreateCourseWrapper>
      )}
    </AllAddCourse2>
  )
}

export default CreateTopics
