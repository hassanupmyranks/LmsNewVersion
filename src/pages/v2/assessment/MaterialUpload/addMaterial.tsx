import InputV2 from '../../../../components/V2/Form/Input'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  addMaterialsAPI,
  getAllCourses,
  getChapterData,
  getSingleSubTopic,
  getSubjectData,
  getSubTopicAPI,
  getTopicData
} from '../../../../helpers/V2/apis'
import { GetCourseResponse } from '../../../../utils/types'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import { LoaderAlign } from '../createSubjects/styledComponents'
import { LoaderIcon } from 'react-hot-toast'
import ROUTES_V2 from '../../../../const/V2/routes'
import { AllAddCourse2 } from '../createSubTopics/styledComponents'
import styled from 'styled-components'
import { Blue, White } from '../../../../const/V2/stylingVariables'

const AddMaterial = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const { id }: any = useParams()
  const history = useHistory()
  const [, setCourse] = useState('')
  const [courseList, setCourseList] = useState<[GetCourseResponse]>()
  const [subjectList, setSubjectList] = useState<any>()
  const [chapterList, setChapterList] = useState<any>()
  const [topicList, setTopicList] = useState<any>()
  const [subTopicList, setSubTopicList] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedCourse, setSelectedCourse] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [selectedChapter, setSelectedChapter] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [selectedTopic, setSelectedTopic] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [selectedSubTopic, setSelectedSubTopic] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [chapterLoading, setChapterLoading] = useState(false)
  const [topicLoading, setTopicLoading] = useState(false)
  const [subTopicLoading, setSubTopicLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [selectedType, setSelectedType] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [selectedMaterialType, setSelectedMaterialType] =
    useState<SearchableDropdownOptionData>({ id: '', label: '' })
  const [pathUrl, setPathUrl] = useState('')

  const [materialName, setMaterialName] = useState('')
  const [, setShowDropDownIndex] = useState(null)
  const [sequence, setSequence] = useState(0)

  const formData = new FormData()
  formData.append('courseId', String(selectedCourse?.id))

  if (selectedSubject?.id) {
    formData.append('subjectId', String(selectedSubject?.id))
  }
  if (selectedChapter?.id) {
    formData.append('chapterId', String(selectedChapter?.id))
  }

  if (selectedTopic?.id) {
    formData.append('topicId', String(selectedTopic?.id))
  }
  if (selectedSubTopic?.id) {
    formData.append('subTopicId', String(selectedSubTopic?.id))
  }
  if (selectedType?.id) {
    formData.append('fileType', String(selectedType?.id))
  }
  if (selectedMaterialType?.id) {
    formData.append('materialType', String(selectedMaterialType?.id))
  }
  formData.append('path', pathUrl)
  formData.append('name', materialName)
  formData.append('sequence', String(sequence))

  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => setShowDropDownIndex(null))

  const fileType = [
    {
      id: 'video',
      label: 'Video',
      value: ''
    },
    {
      id: 'audio',
      label: 'Audio',
      value: ''
    },
    {
      id: 'pptx',
      label: 'Pptx',
      value: ''
    },
    {
      id: 'pdf',
      label: 'Pdf',
      value: ''
    }
  ]

  const materialType = [
    {
      id: 'teaching',
      label: 'Teaching',
      value: ''
    },
    {
      id: 'study',
      label: 'Study',
      value: ''
    }
  ]

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

  useEffect(() => {
    if (selectedTopic?.id) {
      setSubTopicLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        topicId: selectedTopic?.id ? selectedTopic?.id : ''
      }
      getSubTopicAPI(payload)
        .then((res: any) => {
          const newTopic = res?.data?.map((subTopic: any) => {
            return {
              label: subTopic.name,
              id: subTopic?._id,
              value: ''
            }
          })
          setSubTopicList(newTopic)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubTopicLoading(false))
    }
  }, [selectedTopic?.id])

  const handleCourseSelect = (courses: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedCourse(courses)
    setSelectedSubject({ id: '', label: '', value: '' })
    setSelectedChapter({ id: '', label: '', value: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setSubjectList([])
    setChapterList([])
    setTopicList([])
  }

  const handleSubjectSelect = (subject: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedSubject(subject)
    setSelectedChapter({ id: '', label: '', value: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setChapterList([])
    setTopicList([])
  }

  const handleChapterSelect = (chapter: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedChapter(chapter)
    setSelectedTopic({ id: '', label: '', value: '' })
    setTopicList([])
  }

  const handleTopicSelect = (topic: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedTopic(topic)
  }

  const handleSubTopicSelect = (topic: SearchableDropdownOptionData) => {
    setCourse('courseId')
    setSelectedSubTopic(topic)
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

  const CreateMaterial = () => {
    // const validationError = CreateSubTopicValidation(createSubject, errors)
    // if (hasFormError(validationError)) {
    setIsLoading(true)
    addMaterialsAPI(formData)
      .then((response) => {
        CustomToastMessage(response.data.message, 'success')
        history.push(ROUTES_V2.CONTENT_MATERIALS)
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }
  // }

  useEffect(() => {
    if (id) {
      setIsEdit(true)
      getSingleSubTopic({ id: id })
        .then((response) => {
          setSelectedTopic({
            label: response.data.topicName,
            id: response.data.topicId
          })
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
            {id ? 'Edit Material' : 'Add New Material'}
          </Heading>

          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <SearchableDropdown
              label="Select Grade"
              required
              options={FinalCourseList}
              isLoader={gradeLoading}
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
              onSelect={handleTopicSelect}
              placeHolder={'Please Select Topic'}
              selectedValue={selectedTopic}
              isClear={selectedTopic?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
          </Flex>
          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <SearchableDropdown
              label="Select Sub Topic"
              required
              options={subTopicList}
              isLoader={subTopicLoading}
              onSelect={handleSubTopicSelect}
              placeHolder={'Please Select Sub Topic'}
              selectedValue={selectedSubTopic}
              isClear={selectedSubTopic?.id ? true : false}
              fullWidth
            ></SearchableDropdown>
            <InputV2
              label="Material Name"
              required
              placeholder="Enter Material name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setMaterialName(event.target.value)
              }}
              value={materialName}
              full
            ></InputV2>
          </Flex>
          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <InputV2
              label="Material Sequence"
              required
              placeholder="Enter Material Sequence"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSequence(Number(event.target.value))
              }}
              value={sequence === 0 ? '' : sequence}
              full
            ></InputV2>
            <SearchableDropdown
              fullWidth
              label={'Select Type'}
              placeHolder={'Please Select Type'}
              options={fileType}
              isClear={selectedType?.id ? true : false}
              onSelect={(option) => {
                setSelectedType(option)
              }}
              selectedValue={selectedType}
            />
          </Flex>
          <Flex gap="20px" style={{ marginBottom: '20px' }}>
            <SearchableDropdown
              fullWidth
              label={'Select Material Type'}
              placeHolder={'Please Select Material Type'}
              options={materialType}
              isClear={selectedMaterialType?.id ? true : false}
              onSelect={(option) => {
                setSelectedMaterialType(option)
              }}
              selectedValue={selectedMaterialType}
            />
            <InputV2
              label="File Path"
              value={pathUrl}
              name="Url"
              placeholder="Please Enter File Path"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPathUrl(e.target.value)
              }
            />
          </Flex>
          <ButtonWrap>
            <div>
              {isLoading ? (
                <LoaderAlign>
                  <LoaderIcon />
                </LoaderAlign>
              ) : (
                <ButtonV2 disabled={isLoading} onClick={CreateMaterial}>
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

export default AddMaterial

export const CreateCourseWrapper = styled.div`
  height: 580px;
  width: 100%;
  background-color: ${White};
  border-radius: 1rem;
  padding: 25px;
  overflow-y: auto;

  @media (max-width: 1280px) {
    width: 48%;
    padding: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${Blue};
  margin-bottom: 15px;
`
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`
