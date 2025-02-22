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
  createSubTopics,
  getAllCourses,
  getChapterData,
  getSingleSubTopic,
  getSubjectData,
  getTopicData,
  updateSubTopics
} from '../../../../helpers/V2/apis'
import {
  CreateSubTopicsProps,
  FinalpayloadCreateSubTopic,
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
import CreateSubTopicValidation from './helper'
import { hasFormError } from '../../../../helpers/V2/formValidation'
import ROUTES_V2 from '../../../../const/V2/routes'

const subtopicinfo = {
  name: '',
  topicId: '',
  sequence: 0
}

const CreateSubTopics = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [course, setCourse] = useState('')
  const [courseList, setCourseList] = useState<[GetCourseResponse]>()
  const [errors, setErrors] = useState({} as Record<string, string>)
  const [subjectList, setSubjectList] = useState<any>()
  const [chapterList, setChapterList] = useState<any>()
  const [topicList, setTopicList] = useState<any>()
  const [createSubject, setCreateSubject] =
    useState<CreateSubTopicsProps>(subtopicinfo)
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [selectedChapter, setSelectedChapter] =
    useState<SearchableDropdownOptionData>()
  const [selectedTopic, setSelectedTopic] =
    useState<SearchableDropdownOptionData>()

  const [subjectLoading, setSubjectLoading] = useState(false)
  const [chapterLoading, setChapterLoading] = useState(false)
  const [topicLoading, setTopicLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const { id }: any = useParams()

  const history = useHistory()

  useEffect(() => {
    setGradeLoading(true)
    getAllCourses()
      .then((response) => {
        setCourseList(response.data.data)
      })
      .finally(() => setGradeLoading(false))
  }, [])

  useEffect(() => {
    if (selectedCourse?.id) {
      setSubjectLoading(true)

      getSubjectData({
        courseId: selectedCourse?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          setSubjectList(response)
        })
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedCourse])

  useEffect(() => {
    if (selectedSubject?.id) {
      setChapterLoading(true)
      getChapterData({
        subjectId: selectedSubject?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          setChapterList(response?.data)
        })
        .finally(() => setChapterLoading(false))
    }
  }, [selectedSubject])

  useEffect(() => {
    if (selectedChapter?.id) {
      setTopicLoading(true)
      getTopicData({
        chapterId: selectedChapter?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          const res = response.data
          setTopicList(res)
        })
        .finally(() => setTopicLoading(false))
    }
  }, [selectedChapter])

  const handleCourseSelect = (courses: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedCourse(courses)
    setSelectedSubject({ id: '', label: '', value: '' })
    setSelectedChapter({ id: '', label: '', value: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setSubjectList([])
    setChapterList([])
    setTopicList([])
    if (courses && courses.id) {
      setCreateSubject({
        ...createSubject
      })
    }
  }

  const handleSubjectSelect = (subject: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedSubject(subject)
    setSelectedChapter({ id: '', label: '', value: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setChapterList([])
    setTopicList([])
    if (subject && subject.id) {
      setCreateSubject({
        ...createSubject
      })
    }
  }

  const handleChapterSelect = (chapter: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedChapter(chapter)
    setSelectedTopic({ id: '', label: '', value: '' })
    setTopicList([])
    if (chapter && chapter.id) {
      setCreateSubject({
        ...createSubject
      })
    }
  }

  const handleTopicSelect = (topic: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedTopic(topic)
    if (topic && topic.id) {
      setCreateSubject({
        ...createSubject,
        topicId: topic.id as string
      })
    }
  }

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
  const FinalTopicList: SearchableDropdownOptionData[] = topicList
    ? topicList.map((topic: any) => ({
        id: topic._id,
        label: topic.name
      }))
    : []

  const [, setShowDropDownIndex] = useState(null)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))

  const CreateSubTopic = () => {
    const validationError = CreateSubTopicValidation(createSubject, errors)
    if (hasFormError(validationError)) {
      setErrors(validationError)
      setCourse('')
      CustomToastMessage('Please Enter the Required Fields', 'error')
    } else {
      setIsLoading(true)
      if (isEdit) {
        updateSubTopics(
          {
            name: createSubject.name,
            topicId: selectedTopic?.id,
            sequence: createSubject.sequence
          },
          id
        )
          .then((res) => {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.LIST_SUB_TOPICS)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setIsLoading(false))
      } else {
        createSubTopics({
          name: createSubject.name,
          topicId: selectedTopic?.id,
          sequence: createSubject.sequence
        })
          .then((response) => {
            CustomToastMessage(response.data.message, 'success')
            history.push(ROUTES_V2.LIST_SUB_TOPICS)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => setIsLoading(false))
      }
    }
  }

  const validateField = (field: {
    type: FinalpayloadCreateSubTopic
    value: any
  }): void => {
    setErrors(CreateSubTopicValidation(createSubject, errors, field))
  }

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      getSingleSubTopic({ id: id })
        .then((response) => {
          setSelectedTopic({
            label: response.data.topicName,
            id: response.data.topicId
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
          setSelectedChapter({
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
          <Heading style={{ marginBottom: '10px' }}>
            {id ? 'Edit Sub-Topic' : 'Create New Sub-Topic'}
          </Heading>

          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <SearchableDropdown
              label="Select Grade"
              required
              options={FinalCourseList}
              isLoader={gradeLoading}
              error={course === '' ? errors.courseId : ''}
              onSelect={handleCourseSelect}
              placeHolder={'Please Select Grade'}
              selectedValue={selectedCourse}
              isClear={selectedCourse?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
            <SearchableDropdown
              label="Select Subject"
              required
              options={FinalSubjectList}
              isLoader={subjectLoading}
              error={course === '' ? errors.courseId : ''}
              onSelect={handleSubjectSelect}
              placeHolder={'Please Select Subject'}
              selectedValue={selectedSubject}
              isClear={selectedSubject?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
          </Flex>
          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <SearchableDropdown
              label="Select Chapter"
              required
              options={FinalChapterList}
              isLoader={chapterLoading}
              error={course === '' ? errors.courseId : ''}
              onSelect={handleChapterSelect}
              placeHolder={'Please Select Chapter'}
              selectedValue={selectedChapter}
              isClear={selectedChapter?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
            <SearchableDropdown
              label="Select Topic"
              required
              options={FinalTopicList}
              isLoader={topicLoading}
              error={course === '' ? errors.courseId : ''}
              onSelect={handleTopicSelect}
              placeHolder={'Please Select Topic'}
              selectedValue={selectedTopic}
              isClear={selectedTopic?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
          </Flex>
          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <InputV2
              label="Sub-Topic Name"
              required
              placeholder="Enter Sub-Topic name"
              onBlur={() => {
                validateField({
                  type: FinalpayloadCreateSubTopic.name,
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
            <InputV2
              label="Sub-Topic Sequence"
              required
              placeholder="Enter Sub-Topic Sequence"
              onBlur={() => {
                validateField({
                  type: FinalpayloadCreateSubTopic.sequence,
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

            {/* <div style={{ width: '100%' }}></div> */}
          </Flex>
          <ButtonWrap>
            <div>
              {isLoading ? (
                <LoaderAlign>
                  <LoaderIcon />
                </LoaderAlign>
              ) : (
                <ButtonV2 disabled={isLoading} onClick={CreateSubTopic}>
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

export default CreateSubTopics
