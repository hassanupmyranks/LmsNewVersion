import { useEffect, useRef, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  Flex,
  FormHeading,
  PageContainer,
  SuccessButtonV2,
  WrapperCard
} from '../../../../components/V2/styledComponents'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import ROUTES_V2 from '../../../../const/V2/routes'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import {
  AddQuestionsContainerHeading,
  CommonSection,
  HeadAddQuestions,
  HeadTitle,
  Line,
  NoQuestions,
  QuestionsContainer
} from './components/styledComponents'
import {
  //   addAssignmentAPI,
  NewCreateInstituteTest,
  getQuestionBankV2GetAllQuestionAPI,
  getUploadedQuestions,
  questionBulkUpload,
  updateInstituteTestAPI
  //   updateAssignment
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useLocation } from 'react-router-dom'
import QuestionsQuiz from './components/TestWOP'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import Dropdownsmall from '../../../../components/V2/Form/Dropdownsmall'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import { RootState } from '../../../../redux/store'
import { ReactComponent as DifficultySvg } from '../../../../assets/svg/difficulty.svg'
import { ReactComponent as UploadSvg } from '../../../../assets/svg/upload.svg'
import { StatisticsText } from '../../assessment/addQuestions/components/QuestionStatistics'
import {
  CloseButton,
  DeleteButton,
  DeleteIconContainer,
  DeleteText,
  DragBox,
  HorizontalElements,
  Percentage,
  ProgressBar,
  ProgressBarContainer,
  QuestionFileHeading,
  SecondHalfProgressBar,
  ShareableContainer,
  SuccessProgressBar,
  SuccessProgressBarPara,
  UploadDevWidth,
  UploadFileContainer,
  UploadFilePara,
  UploadQuestionPartOne,
  UploadQuestionPartTwo,
  UploadQuestionSaveButtonContainer,
  WrongMessage
} from '../../assessment/addQuestions/components/styledComponents'
import FileDragDropComponent from '../../../../components/V2/FileDragAndDrop'
import {
  AlignFiles,
  Anchor,
  Files,
  Format,
  Text
} from '../../assessment/studentBulkUpload/styledComponents'
import { Button } from '../../../../components/V2/CourseCard/styledComponents'
import { SocketResponse } from '../../../../utils/types'
import Delete from '../../../../assets/Delete.png'
import FileURL from '../../../../assets/word_photo.jpg'
import QuestionsPopUp from '../../../../components/V2/PopUp/UploadedQuestionsPopup'

const questionTypes = [
  { code: 'aq', name: 'All Question' },
  { code: 'multiple_mcq', name: 'Multiple Choice (Multiple Answer)' },
  { code: 'tf', name: 'True/False' },
  { code: 'assertion', name: 'Assertion' },
  { code: 'fill-blank', name: 'Fill in the Blank' },
  { code: 'number', name: 'Numeric' },
  { code: 'mcq', name: 'Multiple Choice (Single Answer)' },
  { code: 'descriptive', name: 'Descriptive' },
  { code: 'multiple_mcq_any', name: 'Multiple Choice Any (Multiple Answers)' },
  { code: 'vsa', name: 'Very Short Answer' },
  { code: 'sa', name: 'Short Answer' },
  { code: 'la', name: 'Long Answer' },
  { code: 'hots', name: 'Hots' },
  { code: 'passage', name: 'Passage' },
  { code: 'case', name: 'Case' }
]
interface Question {
  questionId: string
  mark: number
}

interface NewData {
  questionType: string[]
  questions: Question[]
}

const QuestionsWithoutPattern = () => {
  const { selector, userInfo } = useSelector((state: RootState) => ({
    selector: state.createScheduleAssignTest,
    userInfo: state.userV2.userInfoV2
  }))
  const history = useHistory()
  //   const params: any = useParams()
  const dispatch = useDispatch()
  const containerRef: any = useRef()

  const location: any = useLocation()
  const name: any = location.state && location.state.name
  const Data = location?.state?.allData
  const BulkUploadData = location?.state
  const newCourseId = location?.state?.courseId
  const assesType: any = location.state && location.state.type
  const subjectId: any = location.state && location.state.subjectId
  const editQuestions: any = location.state && location.state.questions

  const edit: any = location.state && location.state.edit
  const view: any = location.state && location.state.viewMode
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [isLoading, setLoading] = useState(false)
  const [isCreatedLoading, setIsCreatedLoading] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [addQuestionsSelected] = useState<string[]>([])
  const [addQuestionsOpen, setAddQuestionsOpen] = useState<string[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>(
    editQuestions ? editQuestions : []
  )
  const [selectedQuestionsData, setSelectedQuestionsData] = useState<any[]>([])
  const [filterQuestion, setFilterQuestion] =
    useState<DropdownOptionData<{ code: string; name: string }>>()
  const handleSelectQuestions = (
    questionId: string,
    Marks: number,
    questionData: any
  ) => {
    const isChecked = selectedQuestions?.findIndex(
      (item) => item.questionId === questionId
    )
    const QuestionCheck = selectedQuestions.some(
      (item) => item.questionId === questionId
    )

    const newSelectedQuestions = [...selectedQuestions]
    // const newSelectedQuestionsData = [...selectedQuestionsData]
    if (isChecked !== -1) {
      newSelectedQuestions.splice(isChecked, 1)
      if (QuestionCheck) {
        const filteredData = selectedQuestionsData?.filter(
          (item: any) => item?._id !== questionId
        )

        setSelectedQuestionsData(filteredData)
      }
    } else {
      newSelectedQuestions.push({
        questionId: questionId,
        mark: Marks ?? 0
      })
      if (!QuestionCheck) {
        setSelectedQuestionsData([...selectedQuestionsData, questionData])
      }
    }
    setSelectedQuestions(newSelectedQuestions)
    // setSelectedQuestionsData(newSelectedQuestionsData)
  }
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0
  })
  const [processingId, setProcessingId] = useState<string>('')
  const [file, setFile] = useState<File | undefined>()
  const [isChecked, setChecked] = useState(false)
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isPopup, setIsPopup] = useState<boolean>(false)
  const [questionSelection, setQuestionSelection] = useState('custom')

  const allTabs: any = []
  const validator = () => {
    if (file === undefined) {
      CustomToastMessage('Please upload file', 'error')
    }
  }

  useEffect(() => {
    setProcessingId('')
    setChecked(false)
    setFile(undefined)
    setQuestions([])
    setSocketResponse({
      finished: false,
      filePath: '',
      notUploadedCount: 0,
      uploadedCount: 0,
      isError: false,
      message: '',
      progress: 0
    })
  }, [])

  useEffect(() => {
    try {
      if (processingId) {
        const websocket = new WebSocket(
          `${process.env.REACT_APP_SOCKET_BASEURL_V2}/?processingId=${processingId}&type=questionDocUpload`
        )
        websocket.onmessage = (event) => {
          const data = JSON.parse(event.data)
          if (!data.isError) {
            setSocketResponse(data)
            if (data.finished) {
              CustomToastMessage(`Successfully uploaded!`, 'success')
              setIsDisable(false)
              getUploadedQuestions({
                page: 1,
                limit: 100,
                processId: processingId
              })
                .then((res) => {
                  setQuestions(res?.data)
                  setIsPopup(true)
                })
                .catch((error) => {
                  CustomToastMessage(error.message, 'error')
                })
                .finally(() => {
                  setIsSubmit(false)
                  setIsDisable(false)
                })
            }
          } else {
            CustomToastMessage(
              `Doesn't have required number of questions`,
              'error'
            )
            setIsSubmit(false)
            setIsDisable(false)
          }
        }
        return () => {
          websocket.close()
        }
      }
    } catch (error) {
      console.error(error)
      setIsSubmit(false)
      setIsDisable(false)
    }
  }, [processingId, selector.courseId])

  useEffect(() => {
    setLoading(true)
    const payload = {
      subjectId: subjectId,
      limit: 100
    }
    getQuestionBankV2GetAllQuestionAPI(payload)
      .then((res) => {
        if (res) {
          setQuestions(res)
        }
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false))
  }, [subjectId])

  const handleSwitchChange = () => {
    setChecked(!isChecked)
  }

  useEffect(() => {
    if (
      Data?.subjectDetails &&
      Data?.subjectDetails[0] &&
      Data?.subjectDetails[0]?.sections &&
      Data?.subjectDetails[0]?.sections[0] &&
      Array.isArray(Data?.subjectDetails[0]?.sections[0]?.questions_list)
    ) {
      const ConvertData =
        Data?.subjectDetails[0]?.sections[0]?.questions_list?.map(
          (data: any) => data
        )
      setSelectedQuestionsData(ConvertData)
    }
  }, [Data])
  const handleOpenQuestions = (selectedId: string) => {
    const isChecked = addQuestionsOpen.indexOf(selectedId)
    const newOpenedQuestions = [...addQuestionsOpen]
    if (isChecked !== -1) {
      newOpenedQuestions.splice(isChecked, 1)
    } else {
      newOpenedQuestions.push(selectedId)
    }
    setAddQuestionsOpen(newOpenedQuestions)
  }

  let totalMarks = selectedQuestions.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.mark
  }, 0)
  const handlePublishAction = () => {
    const newSelectedQuestions = [...selectedQuestions]
    let newData: NewData = {
      questionType: [],
      questions: []
    }

    if (newSelectedQuestions) {
      newSelectedQuestions.forEach((item: any) => {
        const newquestions = {
          questionId: item.questionId,
          mark: item.mark,
          questionType: item.type
        }
        newData.questions.push(newquestions)

        if (!newData.questionType.includes(item.type)) {
          newData.questionType.push(item.type)
        }
      })
    }

    // const newFormData: any = new FormData()
    // if (!edit) {
    //   newFormData.append('type', type)
    // }
    // newFormData.append('name', name)
    // newFormData.append('deadLine', testDeadline)
    // newFormData.append('subjectId', subjectId)
    // if (chapterId) {
    //   newFormData.append('chapterId', chapterId)
    // }
    // if (topicId) {
    //   newFormData.append('topicId', topicId)
    // }
    // if (subTopicId) {
    //   newFormData.append('subTopicId', subTopicId)
    // }

    //   newFormData.append('mark', totalMarks)

    // if (selectedQuestions.length > 0) {
    //   if (edit) {
    // newFormData.append('questionIds', JSON.stringify(selectedQuestions))
    //   } else {
    //   newFormData.append('questions', JSON.stringify(selectedQuestions))
    //   }
    // }

    const deepClone = (obj: [] | Object) => {
      return JSON.parse(JSON.stringify(obj))
    }
    const clonedData = deepClone(Data)
    // Data.subjectDetails[0].sections[0].questions_list = [
    //   ...Data.subjectDetails[0].sections[0].questions_list,
    //   ...selectedQuestionsData
    // ]
    // clonedData.subjectDetails[0].sections[0].questions_list = [
    //   ...clonedData.subjectDetails[0].sections[0].questions_list,
    //   ...selectedQuestionsData
    // ]
    if (
      clonedData.subjectDetails &&
      clonedData.subjectDetails[0] &&
      clonedData.subjectDetails[0].sections &&
      clonedData.subjectDetails[0].sections[0] &&
      Array.isArray(clonedData.subjectDetails[0].sections[0].questions_list)
    ) {
      clonedData.subjectDetails[0].sections[0].questions_list = [
        // ...clonedData.subjectDetails[0].sections[0].questions_list,
        ...selectedQuestionsData
      ]
    }
    // const test_details: any = deepClone(Data.subjectDetails)

    const test_details: any = deepClone(clonedData.subjectDetails)
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

    let testType = 'SUPERADMIN_TEST'

    if (user.role === 'teacher') {
      testType = 'TEACHER_TEST'
    }

    if (user.role === 'student') {
      testType = 'PRACTICE_TEST'
    }

    setIsCreatedLoading(true)
    if (edit) {
      updateInstituteTestAPI({
        test_id: Data.test_id,
        institute_test_name: Data.testName,
        // test_pattern_details: {
        //   id: Data.testPatternId,
        //   name: Data.testPattern
        // },
        subjectId: Data.subjectId,
        course_id: newCourseId,
        course_name: Data.course_name,
        test_duration_type: 'FIXED',
        test_duration: Data.testDuration,
        total_test_questions: Data.totalQuestions,
        total_marks: Data.totalMarks,
        // add_password: Data.isPasswordProtect ? true : false,
        // password: Data.password,
        instruction_text: Data.instructionText,
        created_by: Data._id,
        test_details: {
          subjects_details: test_details
        },
        test_type: testType
      })
        // updateInstituteTestAPI({
        //   test_id: Data.test_id,
        //   name: name,
        //   subjectId: subjectId,
        //   // withoutPattern: true,
        //   type: assesType,
        //   questions: selectedQuestions.length > 0 ? selectedQuestions : [],
        //   test_type: testType
        // })
        .then((res) => {
          if (res.status === 200 || res.status === 'success') {
            CustomToastMessage(`Successfully updated!`, 'success')
          } else {
            CustomToastMessage(`${res.data}`, 'error')
          }
          history.push(ROUTES_V2.TESTS)
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err.message}`, 'error')
        })
        .finally(() => setIsCreatedLoading(false))
    } else {
      NewCreateInstituteTest({
        name: name,
        subjectId: subjectId,
        withoutPattern: true,
        type: assesType,
        isOffline: selector.isOffline,
        hasOfflineQuestions: selector.hasOfflineQuestions,
        questions: selectedQuestions.length > 0 ? selectedQuestions : []
      })
        .then((res) => {
          CustomToastMessage(res?.data?.message, 'success')
          history.push(ROUTES_V2.TESTS)
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err.message}`, 'error')
        })
        .finally(() => setIsCreatedLoading(false))
    }
  }

  useEffect(() => {
    dispatch(
      updateTopHeader(topHeaderValues['teacher'][ROUTES_V2.ADD_ASSIGNMENTS])
    )
  }, [dispatch])

  const handleFileUploadAPICall = () => {
    validator()

    setProcessingId('')
    setSocketResponse((prevState) => ({
      ...prevState,
      finished: false,
      filePath: '',
      notUploadedCount: 0,
      uploadedCount: 0,
      isError: false,
      message: '',
      progress: 0
    }))

    try {
      if (file) {
        // const activeTab = allTabs.find((tabs) => tabs.isActive)
        // if (activeTab) {
        // const selectedSubject: any = selector.subjectDetails
        // .find(
        //   (details: NewSubjectDetails) =>
        //     details.subject_name === activeTab.name
        // )

        const newFormData: any = new FormData()
        if (userInfo.instituteId) {
          newFormData.append('instituteId', userInfo.instituteId)
        }
        if (userInfo.branchId) {
          newFormData.append('branchId', userInfo.branchId)
        }
        newFormData.append('courseId', selector.courseId)
        newFormData.append('file', file, file.name)
        newFormData.append('subjectId', selector.subjectDetails[0].subject_id)
        // newFormData.append('unitId', selectedUnit)
        // newFormData.append('chapterId', selectedChaptersAndTopics)

        // newFormData.append(
        //   'numberOfQuestions',
        //   selectedSubject.total_questions_for_subject
        // )

        // if (selectedChildChaptersAndTopics.length <= 0) {
        //   CustomToastMessage('Please select the topic', 'error')
        // } else {
        //   newFormData.append('topicId', selectedChildChaptersAndTopics)

        newFormData.append('sharable', isChecked)
        // if (author !== '') {
        //   newFormData.append('author', author)
        // }
        setIsSubmit(true)
        setIsDisable(true)
        questionBulkUpload(newFormData)
          .then((response) => {
            CustomToastMessage(response.message, 'success')
            setProcessingId(response.data.processingId)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
            console.log(error)
            setIsDisable(false)
            setIsSubmit(false)
          })
        // }
        // }
      }
    } catch (error) {
      setIsSubmit(false)
      setIsDisable(false)
      console.error(error)
    }
  }

  const handleClose = () => {
    setSocketResponse((prevState) => {
      return {
        ...prevState,
        finished: false,
        filePath: '',
        notUploadedCount: 0,
        uploadedCount: 0,
        isError: false,
        message: '',
        progress: 0
      }
    })
    setProcessingId('')
    setFile(undefined)
    setQuestions([])
  }

  const isUpload = true

  return (
    <PageContainer>
      <WrapperCard fullHeight={true}>
        <Flex justifyContent="space-between">
          <FormHeading>Select Questions</FormHeading>
          <Flex gap="10px" style={{ cursor: 'pointer' }}>
            <DifficultySvg
              onClick={() => {
                setQuestionSelection('custom')
              }}
            />
            <StatisticsText
              onClick={() => {
                setQuestionSelection('custom')
              }}
            >
              Custom Selection
            </StatisticsText>
            <UploadSvg
              onClick={() => {
                setQuestionSelection('bulk')
              }}
            />
            <StatisticsText
              onClick={() => {
                setQuestionSelection('bulk')
              }}
            >
              Upload Questions
            </StatisticsText>
          </Flex>
          <Flex gap="30px">
            {view === 'view'
              ? ''
              : questionSelection === 'custom' && (
                  <SuccessButtonV2 onClick={handlePublishAction}>
                    {isCreatedLoading && (
                      <Spinner
                        style={{
                          width: '44px',
                          height: '44px',
                          color: `${BlueButton}`,
                          position: 'absolute',
                          zIndex: 1,
                          top: '50%',
                          left: '45%'
                        }}
                        animation={'border'}
                      />
                    )}
                    {edit ? 'Update Test' : 'Create Test'}
                  </SuccessButtonV2>
                )}
          </Flex>
        </Flex>
        {questionSelection === 'custom' ? (
          <CommonSection>
            <AddQuestionsContainerHeading>
              <HeadAddQuestions>
                <HeadTitle>
                  <h3>Total Questions - {questions?.length}</h3>
                  <Flex>
                    <Line></Line>
                    <h3>Selected Questions - {selectedQuestions?.length}</h3>
                  </Flex>
                  <Flex>
                    <Line></Line>
                    <h3>Assigned Marks - {totalMarks}</h3>
                  </Flex>
                </HeadTitle>
                <div style={{ marginLeft: '20px' }}>
                  <Dropdownsmall
                    label=""
                    selectedValue={filterQuestion}
                    placeholder="Select Question type"
                    onSelect={(data: any) => {
                      setFilterQuestion(data)
                      setLoading(true)
                      getQuestionBankV2GetAllQuestionAPI({
                        subjectId: subjectId,
                        //   chapterId: chapterId,
                        //   topicId: topicId,
                        //   subTopicId: subTopicId,
                        limit: 100,
                        questionType: data.value.code !== 'aq' && [
                          `${data.value.code}`
                        ]
                      })
                        .then((res) => {
                          if (res) {
                            setQuestions(res)
                            setLoading(false)
                          }
                        })
                        .finally(() => setLoading(false))
                    }}
                    options={getDropDownOptions(questionTypes, 'code', 'name')}
                  ></Dropdownsmall>
                </div>
              </HeadAddQuestions>
            </AddQuestionsContainerHeading>

            <QuestionsContainer ref={containerRef}>
              {isLoading && (
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
              {questions && questions.length > 0
                ? questions.map((qs: any) => (
                    <QuestionsQuiz
                      key={`question_${qs._id}`}
                      {...{
                        isQuize: true,
                        question: qs,
                        teacherQuizQuestion: qs,
                        handleSelectQuestions: handleSelectQuestions,
                        selectedQuestions: selectedQuestions,
                        handleOpenQuestions: handleOpenQuestions,
                        addQuestionsSelected,
                        addQuestionsOpen
                        //   type: type
                      }}
                    />
                  ))
                : !isLoading && (
                    <NoQuestions style={{ textAlign: 'center' }}>
                      {' '}
                      Questions Not Available{' '}
                    </NoQuestions>
                  )}
            </QuestionsContainer>
          </CommonSection>
        ) : questionSelection === 'bulk' ? (
          <UploadDevWidth
            style={{ maxWidth: '100%', width: '100%', marginTop: '10px' }}
          >
            <UploadFileContainer>
              <UploadQuestionPartOne>
                <HorizontalElements>
                  <QuestionFileHeading>
                    Upload Question File
                  </QuestionFileHeading>
                  <UploadFilePara>(Must be MS Word file)</UploadFilePara>
                </HorizontalElements>
                <ProgressBarContainer>
                  {Number(socketResponse.progress) === 100 ? (
                    socketResponse.notUploadedCount === 0 ? (
                      <div>
                        <SuccessProgressBar></SuccessProgressBar>
                        <SuccessProgressBarPara>
                          Questions from file are shown below
                        </SuccessProgressBarPara>
                      </div>
                    ) : (
                      <ProgressBarContainer>
                        <WrongMessage>
                          {`Upload failed, please try again!
                      ${socketResponse.uploadedCount} of ${
                            socketResponse.notUploadedCount +
                            socketResponse.uploadedCount
                          } questions were uploaded`}
                        </WrongMessage>

                        <CloseButton onClick={handleClose}>Close</CloseButton>
                        <CloseButton>
                          <a
                            style={{ all: 'unset' }}
                            href={socketResponse.filePath}
                          >
                            DownLoad Error File
                          </a>
                        </CloseButton>
                      </ProgressBarContainer>
                    )
                  ) : (
                    <div>
                      <Flex style={{ width: '100%' }}>
                        <SecondHalfProgressBar
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '0px'
                          }}
                        >
                          <ProgressBar
                            width={socketResponse.progress}
                            style={{ top: '0px' }}
                          ></ProgressBar>
                        </SecondHalfProgressBar>
                        <Percentage>{`${socketResponse.progress}%`}</Percentage>
                      </Flex>
                      <ShareableContainer>
                        {'Shareable'}
                        <DragBox>
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              checked={isChecked}
                              onChange={handleSwitchChange}
                            />
                          </Form>
                        </DragBox>
                      </ShareableContainer>
                    </div>
                  )}
                  {socketResponse.progress === 100 ? (
                    <Percentage>{`${socketResponse.progress}%`}</Percentage>
                  ) : (
                    ''
                  )}
                  {Number(socketResponse.progress) === 100 &&
                    socketResponse.notUploadedCount === 0 && (
                      <ProgressBarContainer>
                        <DeleteButton onClick={handleClose}>
                          <DeleteIconContainer>
                            <img src={Delete} alt="Delete" />
                          </DeleteIconContainer>
                          <DeleteText>Delete</DeleteText>
                        </DeleteButton>
                      </ProgressBarContainer>
                    )}
                </ProgressBarContainer>
                {/* <div className="w-100 mt-5">
              <AuthorHeading>Select Author</AuthorHeading>
              <DropDownContainer>
                <SearchableDropdown
                  label={''}
                  isClear={selectedAuthor.label ? true : false}
                  options={optionValues}
                  selectedValue={selectedAuthor}
                  onSelect={(data: any) => {
                    setSelectedAuthor(data)
                    setAuthor(String(data.id))
                  }}
                  fullWidth={false}
                  placeHolder={'Please select author'}
                />
              </DropDownContainer>
            </div> */}
              </UploadQuestionPartOne>
              <UploadQuestionPartTwo>
                <FileDragDropComponent
                  onFileChange={(ExcelFile) => {
                    setFile(ExcelFile)
                  }}
                  values={file}
                  setValues={setFile}
                />
                <AlignFiles>
                  <Format>Note : Use this file format</Format>
                  <Files>
                    <div>
                      <Anchor
                        href={`${process.env.PUBLIC_URL}/Question_Bulk_Format.docx`}
                        download="Question_Bulk_Upload_Format.docx"
                      >
                        <img src={FileURL} alt="File" height={'60px'} />
                      </Anchor>
                      <Text>Question</Text>
                    </div>
                  </Files>
                </AlignFiles>
                <UploadQuestionSaveButtonContainer>
                  <Button
                    onClick={handleFileUploadAPICall}
                    disabled={isDisable || isSubmit}
                  >
                    {isSubmit ? (
                      <Spinner
                        style={{
                          width: '20px',
                          height: '20px',
                          margin: '5px auto 0'
                        }}
                        animation={'border'}
                      />
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </UploadQuestionSaveButtonContainer>
              </UploadQuestionPartTwo>
            </UploadFileContainer>
            {/* <PageContainer> */}
            {/* <div>
            <AuthorHeading>Select Author</AuthorHeading>
            <DropDownContainer>
              <SearchableDropdown
                label={'Select Author'}
                options={optionValues}
                selectedValue={selectedAuthor}
                onSelect={(data: any) => {
                  setSelectedAuthor(data)
                  setAuthor(String(data.id))
                }}
                required={true}
                fullWidth={false}
                placeHolder={'Please select author'}
              />
            </DropDownContainer>
          </div> */}

            {/* </PageContainer> */}
          </UploadDevWidth>
        ) : (
          ''
        )}
        {isPopup && (
          <QuestionsPopUp
            {...{
              setPopup: () => setIsPopup(false),
              questions,
              allTabs,
              setQuestions,
              isUpload,
              BulkUploadData
            }}
          />
        )}
      </WrapperCard>
    </PageContainer>
  )
}

export default QuestionsWithoutPattern
