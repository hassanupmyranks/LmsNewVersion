import {
  AlignCenter,
  Flex,
  FlexReverse,
  Form,
  // FullHeading,
  // HeadingWrapper,
  MyContainer,
  PageAllign,
  UploadAssignment,
  WordTitle,
  FileType
} from './styledComponents'
import { ReactComponent as AddAssignmentOnLogoSVG } from '../../../assets/svg/add-assignmentOn.svg'
import { ReactComponent as AddAssignmentOffLogoSVG } from '../../../assets/svg/add-assignmentOff.svg'
import { ReactComponent as ReviewAssignmentOnLogoSVG } from '../../../assets/svg/review-assignmentOn.svg'
import { ReactComponent as ReviewAssignmentOffLogoSVG } from '../../../assets/svg/review-assignmentOff.svg'
import { useEffect, useState } from 'react'
import InputV2 from '../../../components/V2/Form/Input'
import { ButtonV2 } from '../../../components/V2/styledComponents'
import styled from 'styled-components'
import {
  PrimaryBlue,
  SecondaryGray600
} from '../../../const/V2/stylingVariables'
import {
  addAssignmentAPI,
  getChapterData,
  getLearnCourseData,
  getSingleAssignment,
  getSubjectData,
  getSubTopicAPI,
  getTopicData,
  updateAssignment
} from '../../../helpers/V2/apis'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import FileDragDropComponent from '../interactiveGame/uploadContent/FileDragDropComponent'
import GradeMethod from '../../../components/Grade/grade'
// import CalenderInput from './components/DeadlineCalender'
interface HeadingProps {
  isActive: boolean
}

const AddAssignments = () => {
  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const history = useHistory()
  const params: any = useParams()

  const [isEdit] = useState(params.id ? true : false)

  const [limit, setLimit] = useState<number>(100)
  const [file, setFile] = useState<File | undefined>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  const [marks, setMarks] = useState<any>()
  const [description, setDescription] = useState('')
  // const [date, setDate] = useState<any>(new Date())
  const [selectedGrade, setSelectedGrade] = useState<any>(defaultValues)
  const [selectedSubject, setSelectedSubject] = useState(defaultValues)
  const [selectedChapter, setSelectedChapter] = useState(defaultValues)
  const [selectedTopic, setSelectedTopic] = useState(defaultValues)
  const [selectedSubTopic, setSelectedSubTopic] = useState(defaultValues)
  const [grades, setGrades] = useState<[]>([])
  const [subjects, setSubjects] = useState<[]>([])
  const [chapters, setChapters] = useState<[]>([])
  const [topics, setTopics] = useState<[]>([])
  const [subTopics, setSubTopics] = useState<[]>([])
  const [isLoading1, setIsLoading1] = useState(false)
  const [isCourseLoadingAPI, SetIsCourseLoading] = useState<boolean>(false)
  const [isSubjectLoading, SetIsSubjectLoading] = useState<boolean>(false)
  const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false)
  const [isTopicLoading, setIsTopicLoading] = useState<boolean>(false)
  const [isSubTopicLoading, setIsSubTopicLoading] = useState<boolean>(false)
  // const [selectedType, setSelectedType] = useState<any>()
  const [selectedScoreType, setSelectedScoreType] = useState<any>()
  const [, setSelectedQuestions] = useState<any>()
  const [fileType, setFileType] = useState('')
  // const AssignmentTypes = [
  //   { id: 'project', label: 'Project' },
  //   { id: 'audio', label: 'Audio' },
  //   { id: 'video', label: 'Video' },
  //   { id: 'presentation', label: 'Presentation' }
  // ]

  const ScoreTypes = [
    { id: 'marks', label: 'Marks' },
    { id: 'grade', label: 'Grade' }
  ]

  useEffect(() => {
    if (isEdit) {
      getSingleAssignment(params.id)
        .then((response) => {
          // setSelectedType({
          //   id:
          //     response?.data?.type === 'assignmentTest'
          //       ? 'assignmentTest'
          //       : 'project',
          //   label:
          //     response?.data?.type === 'assignmentTest' ? 'Test' : 'Project'
          // })
          // if (response.data.type) {
          //   setSelectedType({
          //     id:
          //       response?.data?.type === 'assignmentTest'
          //         ? 'assignmentTest'
          //         : response?.data?.type === 'audio'
          //         ? 'audio'
          //         : response?.data?.type === 'video'
          //         ? 'video'
          //         : response?.data?.type === 'presentation'
          //         ? 'presentation'
          //         : 'project',
          //     label:
          //       response?.data?.type === 'assignmentTest'
          //         ? 'Test'
          //         : response?.data?.type === 'audio'
          //         ? 'Audio'
          //         : response?.data?.type === 'video'
          //         ? 'Video'
          //         : response?.data?.type === 'presentation'
          //         ? 'Presentation'
          //         : 'Project'
          //   })
          // }
          setTitle(response?.data?.name)
          // setDate(response?.data?.deadLine)
          setSelectedSubject({
            value: '',
            label: response?.data?.subjectName,
            id: response?.data?.subjectId
          })
          setSelectedGrade({
            value: '',
            label: response?.data?.courseName,
            id: response?.data?.courseId
          })
          setSelectedChapter({
            value: '',
            label: response?.data?.chapterName,
            id: response?.data?.chapterId
          })
          setSelectedTopic({
            value: '',
            label: response?.data?.topicName,
            id: response?.data?.topicId
          })
          setSelectedSubTopic({
            value: '',
            label: response?.data?.subTopicName,
            id: response?.data?.subTopicId
          })
          setSelectedScoreType({
            id: response?.data?.scoreFormat === 'marks' ? 'marks' : 'grade',
            label: response?.data?.scoreFormat === 'marks' ? 'Marks' : 'Grade'
          })
          setMarks(response?.data?.totalMarks)
          setDescription(response?.data?.description)
          setSelectedQuestions(response?.data?.questions)
          setFile(response?.data?.attachment)
          setFileType(response?.data?.attachmentType)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }, [params.id, isEdit])

  useEffect(() => {
    SetIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res: any) => {
        const options: any = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: '',
            type: el.type
          }
        })
        setGrades(options)
        SetIsCourseLoading(false)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => SetIsCourseLoading(false))
  }, [user.branchId])

  const handleGradeSelect = (grade: any) => {
    setSelectedGrade(grade)
    setSelectedSubject(defaultValues)
    setSelectedChapter(defaultValues)
    setSelectedTopic(defaultValues)
    setSelectedSubTopic(defaultValues)
    setSubjects([])
    setChapters([])
    setTopics([])
    setSubTopics([])
    if (grade?.id) {
      SetIsSubjectLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: grade.id
      })
        .then((res) => {
          const options = res?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setSubjects(options)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => SetIsSubjectLoading(false))
    }
  }

  const handleSubjectSelect = (subject: any) => {
    setSelectedSubject(subject)
    setSelectedChapter(defaultValues)
    setSelectedTopic(defaultValues)
    setSelectedSubTopic(defaultValues)
    setChapters([])
    setTopics([])
    setSubTopics([])
    if (subject?.id) {
      setIsChapterLoading(true)
      getChapterData({
        subjectId: subject?.id,
        page: 1,
        limit: 100
      })
        .then((res) => {
          const newChapter = res?.data?.map((chapter: any) => {
            return {
              value: '',
              label: chapter?.name,
              id: chapter?._id
            }
          })
          setChapters(newChapter)
          if (res?.data?.length <= 0) {
            CustomToastMessage(
              'There are no Chapters under this Subject',
              'error'
            )
          }
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => {
          setIsChapterLoading(false)
        })
    }
  }

  const handleChapterSelect = (chapter: any) => {
    setSelectedChapter(chapter)
    setSelectedTopic(defaultValues)
    setSelectedSubTopic(defaultValues)
    setTopics([])
    setSubTopics([])
    if (chapter?.id) {
      setIsTopicLoading(true)
      getTopicData({
        chapterId: chapter?.id,
        page: 1,
        limit: 100
      })
        .then((res) => {
          const newTopic = res?.data?.map((topic: any) => {
            return {
              value: '',
              label: topic?.name,
              id: topic?._id
            }
          })
          setTopics(newTopic)
          if (res?.data?.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
        })
        .catch((err) => CustomToastMessage(err, 'error'))
        .finally(() => setIsTopicLoading(false))
    }
  }

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic)
    setSelectedSubTopic(defaultValues)
    setSubTopics([])
    if (topic?.id) {
      setIsSubTopicLoading(true)
      getSubTopicAPI({
        topicId: topic?.id,
        page: 1,
        limit: 100
      })
        .then((res) => {
          const newSubTopic = res?.data?.map((subTopic: any) => {
            return {
              value: '',
              label: subTopic?.name,
              id: subTopic?._id
            }
          })
          setSubTopics(newSubTopic)
          if (res?.data?.length <= 0) {
            CustomToastMessage(
              'There are no Sub-Topics under this Topic',
              'error'
            )
          }
        })
        .catch((err) => CustomToastMessage(err, 'error'))
        .finally(() => setIsSubTopicLoading(false))
    }
  }
  const submitHandler = () => {
    if (title && selectedGrade?.id && selectedSubject?.id) {
      setIsSubmit(false)
      const newFormData: any = new FormData()
      // if (!isEdit) {
      //   newFormData.append('type', selectedType?.id)
      // }
      newFormData.append('name', title)
      // if (date) {
      //   newFormData.append('deadLine', date)
      // }
      newFormData.append('subjectId', selectedSubject?.id)
      if (selectedScoreType?.id) {
        newFormData.append('scoreFormat', selectedScoreType?.id)
      }
      if (selectedScoreType?.id === 'marks') {
        newFormData.append('totalMarks', marks)
      }
      if (description) {
        newFormData.append('description', description)
      }
      if (selectedChapter?.id) {
        newFormData.append('chapterId', selectedChapter?.id)
      }
      if (isEdit && !selectedChapter?.id) {
        newFormData.append('chapterId', 'null')
      }
      if (selectedTopic?.id) {
        newFormData.append('topicId', selectedTopic?.id)
      }
      if (isEdit && !selectedTopic?.id) {
        newFormData.append('topicId', 'null')
      }
      if (selectedSubTopic?.id) {
        newFormData.append('subTopicId', selectedSubTopic?.id)
      }
      if (isEdit && !selectedSubTopic?.id) {
        newFormData.append('subTopicId', 'null')
      }
      if (file) {
        newFormData.append('attachment', file)
      }

      if (isEdit) {
        setIsLoading1(true)
        updateAssignment(newFormData, params.id)
          .then((res) => {
            setLimit(limit + 1)
            setTitle('')
            setSelectedGrade(defaultValues)
            setSelectedSubject(defaultValues)
            // setSelectedType(defaultValues)
            setSelectedScoreType(defaultValues)
            setMarks(null)
            setDescription('')
            setFile(undefined)
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.ASSIGNMENT_LIST)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => setIsLoading1(false))
      } else {
        setIsLoading1(true)
        addAssignmentAPI(newFormData)
          .then((res) => {
            setLimit(limit + 1)
            setTitle('')
            setSelectedGrade(defaultValues)
            setSelectedSubject(defaultValues)
            // setSelectedType(defaultValues)
            setSelectedScoreType(defaultValues)
            setMarks(null)
            setDescription('')
            setFile(undefined)
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.ASSIGNMENT_LIST)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => setIsLoading1(false))
      }
      // } else {
      //   CustomToastMessage('Please select Document file', 'error')
      // }
    } else {
      setIsSubmit(true)
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
    <MyContainer>
      <PageAllign>
        {/* <FullHeading>
          <HeadingWrapper
            onClick={() => {
              history.push(ROUTES_V2.ADD_ASSIGNMENTS)
            }}
          >
            <AddAssignmentLogo isActive={true} />
            <Heading isActive={true}>
              {isEdit ? 'Edit Assignment' : 'Add Assignment'}
            </Heading>
          </HeadingWrapper>
        </FullHeading> */}
        <Form style={{ height: '100%' }}>
          <Flex
            style={{
              margin: '10px 0px',
              gap: '10px',
              flexDirection: isSmall ? 'column' : 'row'
            }}
          >
            {/* <SearchableDropdown
              label={'Assignment Type'}
              placeHolder={'Please Select Assignment Type'}
              options={AssignmentTypes}
              onSelect={(Type) => {
                setSelectedType(Type)
              }}
              selectedValue={selectedType}
              isClear={selectedType?.id ? true : false}
              required
              fullWidth
              error={selectedType?.id || !isSubmit ? '' : 'field is required'}
            /> */}
            <InputV2
              label={'Assignment Title'}
              required
              placeholder="Please enter assignment title"
              full
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={title || !isSubmit ? '' : 'field is required'}
            />
          </Flex>
          <Flex
            style={{
              margin: '10px 0px',
              gap: '10px',
              flexDirection: isSmall ? 'column' : 'row'
            }}
          >
            <SearchableDropdown
              label={'Select Grade'}
              placeHolder={'Please Select'}
              options={grades}
              onSelect={handleGradeSelect}
              selectedValue={selectedGrade}
              isClear={selectedGrade?.id ? true : false}
              required
              isLoader={isCourseLoadingAPI}
              fullWidth
              error={selectedGrade?.id || !isSubmit ? '' : 'field is required'}
            />
            <SearchableDropdown
              label={'Select Subjects'}
              placeHolder={'Please Select'}
              options={subjects}
              onSelect={handleSubjectSelect}
              selectedValue={selectedSubject}
              isClear={selectedSubject?.id ? true : false}
              isLoader={isSubjectLoading}
              required
              fullWidth
              error={
                selectedSubject?.value || !isSubmit ? '' : 'field is required'
              }
            />
          </Flex>
          {
            // selectedType?.label === 'Test'
            //   ?
            <Flex
              style={{
                margin: '10px 0px',
                gap: '10px',
                flexDirection: isSmall ? 'column' : 'row'
              }}
            >
              <SearchableDropdown
                label={'Select Chapter'}
                placeHolder={'Please Select Chapter'}
                options={chapters}
                onSelect={handleChapterSelect}
                selectedValue={selectedChapter}
                isClear={selectedChapter?.id ? true : false}
                isLoader={isChapterLoading}
                fullWidth
                error={
                  selectedChapter?.id || !isSubmit ? '' : 'field is required'
                }
              />
              <SearchableDropdown
                label={'Select Topic'}
                placeHolder={'Please Select Topic'}
                options={topics}
                onSelect={handleTopicSelect}
                selectedValue={selectedTopic}
                isClear={selectedTopic?.id ? true : false}
                isLoader={isTopicLoading}
                fullWidth
                error={
                  selectedTopic?.id || !isSubmit ? '' : 'field is required'
                }
              />
            </Flex>
          }{' '}
          <Flex
            style={{
              margin: '10px 0px',
              gap: '10px',
              flexDirection: isSmall ? 'column' : 'row'
            }}
          >
            <SearchableDropdown
              label={'Select Sub-Topic'}
              placeHolder={'Please Select Sub-Topic'}
              options={subTopics}
              onSelect={(subTop: any) => {
                setSelectedSubTopic(subTop)
              }}
              selectedValue={selectedSubTopic}
              isClear={selectedSubTopic?.id ? true : false}
              isLoader={isSubTopicLoading}
              fullWidth
              error={
                selectedSubTopic?.id || !isSubmit ? '' : 'field is required'
              }
            />
          </Flex>
          <Flex
            style={{
              gap: '10px',
              flexDirection: isSmall ? 'column' : 'row'
            }}
          >
            <SearchableDropdown
              label={'Score Format'}
              placeHolder={'Please Select Score Format'}
              options={ScoreTypes}
              onSelect={(Type) => {
                setSelectedScoreType(Type)
              }}
              selectedValue={selectedScoreType}
              isClear={selectedScoreType?.id ? true : false}
              required
              fullWidth
              error={
                selectedScoreType?.id || !isSubmit ? '' : 'field is required'
              }
              style={{ marginBottom: '10px' }}
              toolTipText={<GradeMethod />}
            />
            {selectedScoreType?.label === 'Marks' ? (
              <InputV2
                label={'Total Marks'}
                required
                placeholder="Please Enter Total Marks"
                full
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                error={marks || !isSubmit ? '' : 'field is required'}
              />
            ) : (
              ''
            )}
          </Flex>
          {/* <CalenderInput
            label="Select Deadline*"
            value={date}
            onChange={(date: any) => {
              setDate(date ? date.toISOString() : '')
            }}
            placeholder={''}
            onChangeDate={function (date: Date): void {
              setDate(date ? date.toISOString() : '')
            }}
            HidePastDate
          /> */}
          <InputV2
            label={'Description'}
            placeholder="Enter Description of this Assignment"
            full
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* {selectedType?.label === 'Project' ||
          selectedType?.label === 'Video' ||
          selectedType?.label === 'Presentation' ||
          selectedType?.label === 'Audio' ? ( */}
          <UploadAssignment>
            <AlignCenter>
              <WordTitle>Upload Attachment</WordTitle>
              <FileType>
                PNG / PDF / DOCS / XLSX / PPTX / VIDEO / AUDIO File Should not
                Exceed more than 5MB
              </FileType>
            </AlignCenter>
            <FileDragDropComponent
              onFileChange={(ExcelFile) => {
                setFile(ExcelFile)
              }}
              values={file}
              setValues={setFile}
              fileTypeName={fileType}
              // accept={
              //   selectedType?.label === 'Video'
              //     ? 'video/*'
              //     : selectedType?.label === 'Audio'
              //     ? 'audio/*'
              //     : selectedType?.label === 'Presentation'
              //     ? '.ppt, .pptx, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation'
              //     : ''
              // }
            />
          </UploadAssignment>
          <FlexReverse style={{ marginTop: '20px' }}>
            {/* {selectedType?.label === 'Project' ||
            selectedType?.label === 'Video' ||
            selectedType?.label === 'Presentation' ||
            selectedType?.label === 'Audio' ? (
           
            ) : (
              ''
            )} */}
            <ButtonV2 disabled={isLoading1} onClick={() => submitHandler()}>
              {isEdit ? 'Update' : 'Save'}
            </ButtonV2>
            {/* {selectedType?.label === 'Test' ? (
              <ButtonV2
                onClick={() => {
                  if (
                    !selectedGrade?.id ||
                    !selectedSubject?.id ||
                    title === ''
                  ) {
                    if (title === '') {
                      CustomToastMessage('Please give the test title', 'error')
                    } else {
                      CustomToastMessage('Select Grades And Subject', 'error')
                    }
                  } else {
                    history.push({
                      pathname: isEdit
                        ? `${ROUTES_V2.ASSIGNMENT_QUESTION}/${params.id}`
                        : `${ROUTES_V2.ASSIGNMENT_QUESTION}`,
                      state: {
                        // type: selectedType?.id,
                        name: title,
                        // deadline: date,
                        courseId: selectedGrade?.id,
                        subjectId: selectedSubject?.id,
                        chapterId: selectedChapter?.id,
                        topicId: selectedTopic?.id,
                        subTopicId: selectedSubTopic?.id,
                        scoreFormat: selectedScoreType?.id,
                        description: description,
                        edit: isEdit,
                        questions: selectedQuestions
                      }
                    })
                  }
                }}
              >
                {isEdit ? 'Update Questions' : 'Select Questions'}
              </ButtonV2>
            ) : (
              ''
            )} */}
          </FlexReverse>
        </Form>
      </PageAllign>
    </MyContainer>
  )
}

export default AddAssignments

export const AddAssignmentLogo = styled(
  ({ isActive, ...props }: HeadingProps) =>
    isActive ? (
      <AddAssignmentOnLogoSVG {...props} />
    ) : (
      <AddAssignmentOffLogoSVG {...props} />
    )
)<HeadingProps>`
  height: 22px;
  width: 22px;
  margin-right: 6px;
`

export const ReviewAssignmentLogo = styled(
  ({ isActive, ...props }: HeadingProps) =>
    isActive ? (
      <ReviewAssignmentOnLogoSVG {...props} />
    ) : (
      <ReviewAssignmentOffLogoSVG {...props} />
    )
)<HeadingProps>`
  height: 22px;
  width: 22px;
  margin-right: 8px;
`
export const Heading = styled.p<HeadingProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.isActive ? PrimaryBlue : SecondaryGray600)};
  font-family: 'DM Sans';
`
