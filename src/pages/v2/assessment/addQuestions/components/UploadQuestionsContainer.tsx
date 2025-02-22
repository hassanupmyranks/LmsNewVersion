import { Form, Spinner } from 'react-bootstrap'
import {
  NewSubjectDetails,
  // QuestionsSectionsDetails,
  RandomGenerateQuestionsDetails,
  SocketResponse,
  SubTopicsDetails,
  SubjectTopicsDetails
  // listAuthorResponse
} from '../../../../../utils/types'
import ChapterAndTopicSection from './ChaptersAndTopicSection'
import {
  CloseButton,
  DeleteButton,
  DeleteIconContainer,
  DeleteText,
  DragBox,
  HorizontalElements,
  MainContainer,
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
} from './styledComponents'
import FileDragDropComponent from '../../../../../components/V2/FileDragAndDrop'
import { useEffect, useState } from 'react'
import Delete from '../../../../../assets/Delete.png'
import {
  // getAuthorListAPI,
  getUploadedQuestions,
  questionBulkUpload
} from '../../../../../helpers/V2/apis'
// import {
//   AuthorHeading,
//   DropDownContainer
// PageContainer
// } from '../../../../../components/V2/Author/styledComponents'
// import SearchableDropdown from '../../../../../components/V2/Form/SearchableDropdown'
import { Button } from '../../../../../components/V2/CourseCard/styledComponents'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
// import { createTestDetails } from '../../../../../redux/create_schedule_assign_test/actions'
// import { deepClone } from '../helper'
import { TabsProp } from '../types'
// import NoImage from '../../../../../assets/noimage.png'
import {
  AlignFiles,
  Anchor,
  Files,
  Format,
  Text
} from '../../studentBulkUpload/styledComponents'
import FileURL from '../../../../../assets/word_photo.jpg'
import QuestionsPopUp from '../../../../../components/V2/PopUp/UploadedQuestionsPopup'
import { Flex } from '../../../../../components/V2/styledComponents'

const UploadQuestionsContainer = ({
  selectedUnit,
  chaptersAndTopics,
  handleChildChaptersChecked,
  selectedChaptersAndTopics,
  selectedChildChaptersAndTopics,
  isTopicsLoading,
  allTabs,
  units,
  topics,
  handleUnitChecked,
  handleChapterChecked,
  isChapterAPILoading
}: {
  units?: any
  handleUnitChecked: any
  topics?: any
  handleChapterChecked: (d: any) => void
  isQuestionAPILoading: boolean
  selectedChaptersAndTopics: string[]
  selectedUnit?: any
  selectedChildChaptersAndTopics: string[]
  chaptersAndTopics: SubjectTopicsDetails[]
  handleChaptersChecked: (
    data: SubjectTopicsDetails,
    isSelected?: boolean
  ) => void
  handleChildChaptersChecked: (childOption: SubTopicsDetails) => void
  isTopicsLoading: boolean
  allTabs: TabsProp[]
  isChapterAPILoading: boolean
}) => {
  const [isChecked, setChecked] = useState(false)
  const [file, setFile] = useState<File | undefined>()
  // const [authorList, setAuthorList] = useState<listAuthorResponse[]>([])
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
  const [author, setAuthor] = useState<string>('')

  const [isSubmit, setIsSubmit] = useState(false)

  const { selector, userInfo } = useSelector((state: RootState) => ({
    selector: state.createScheduleAssignTest,
    userInfo: state.userV2.userInfoV2
  }))
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [isPopup, setIsPopup] = useState<boolean>(false)

  const handleSwitchChange = () => {
    setChecked(!isChecked)
  }

  const [, setIsQuestionChange] = useState(false)
  const [questions, setQuestions] = useState<RandomGenerateQuestionsDetails[]>(
    []
  )

  // const [selectedAuthor, setSelectedAuthor] = useState({
  //   value: '',
  //   label: '',
  //   id: '',
  //   url: ''
  // })

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   getAuthorListAPI()
  //     .then((response) => {
  //       setAuthorList(response.data.data)
  //     })
  //     .catch((error) => console.log({ error }))
  // }, [])

  // const optionValues = useMemo(() => {
  //   return authorList.map((eachAuthor) => {
  //     const joiningDate = new Date(eachAuthor.createdAt)
  //     return {
  //       value: `Data added - ${joiningDate.getDate()}nd,${joiningDate.toLocaleString(
  //         'en-US',
  //         { month: 'short' }
  //       )} ${joiningDate.getFullYear()}`,
  //       label: eachAuthor.name,
  //       id: eachAuthor._id,
  //       url: eachAuthor?.profileImage ? eachAuthor.profileImage : NoImage
  //     }
  //   })
  // }, [authorList])

  // const isAuthorValid = optionValues.map((option) => option.id).includes(author)

  const validator = () => {
    if (file === undefined) {
      CustomToastMessage('Please upload file', 'error')
    }
  }

  useEffect(() => {
    setProcessingId('')
    setAuthor('')
    setChecked(false)
    setFile(undefined)
    setIsQuestionChange(false)
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
    // setSelectedAuthor({
    //   value: '',
    //   label: '',
    //   id: '',
    //   url: ''
    // })
  }, [allTabs])

  // useEffect(() => {
  //   if (isQuestionChange && questions && questions.length > 0) {
  //     const newDetails = deepClone(selector?.subjectDetails || [])
  //     const activeTab = allTabs.find((tabs) => tabs.isActive)
  //     if (newDetails && activeTab?.name) {
  //       const updatedDetails = newDetails.map((item: NewSubjectDetails) => {
  //         if (
  //           activeTab.name === item.subject_name &&
  //           item.sections &&
  //           item.sections.length > 0
  //         ) {
  //           if (questions.length >= item.total_questions_for_subject) {
  //             // let tmpQ = 0; // Counter for total questions added
  //             let sectionQuestions = questions // Copy of questions array to be sliced

  //             return {
  //               ...item,
  //               sections: item.sections.map(
  //                 (sectionItem: QuestionsSectionsDetails) => {
  //                   const sectionTotalQuestions =
  //                     sectionItem?.questions_to -
  //                     sectionItem?.questions_from +
  //                     1

  //                   const questionsToAdd = sectionQuestions.slice(
  //                     0,
  //                     sectionTotalQuestions
  //                   )

  //                   sectionQuestions = sectionQuestions.slice(
  //                     sectionTotalQuestions
  //                   )

  //                   return {
  //                     ...sectionItem,
  //                     questions_list: questionsToAdd,
  //                     total_questions_for_section: sectionTotalQuestions
  //                   }
  //                 }
  //               ),
  //               are_all_questions_added_for_subject: true
  //             }
  //           } else {
  //             CustomToastMessage(
  //               `At least ${item.total_questions_for_subject} questions required in Document`,
  //               'error'
  //             )
  //           }
  //         }
  //         return item
  //       })

  //       dispatch(
  //         createTestDetails({ ...selector, subjectDetails: updatedDetails })
  //       )
  //       setIsQuestionChange(false)
  //     }
  //   }
  // }, [isQuestionChange, questions, selector, dispatch, allTabs])

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
                  setIsQuestionChange(true)
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
        const activeTab = allTabs.find((tabs) => tabs.isActive)
        if (activeTab) {
          const selectedSubject: any = selector.subjectDetails.find(
            (details: NewSubjectDetails) =>
              details.subject_name === activeTab.name
          )

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

          newFormData.append(
            'numberOfQuestions',
            selectedSubject.total_questions_for_subject
          )

          // if (selectedChildChaptersAndTopics.length <= 0) {
          //   CustomToastMessage('Please select the topic', 'error')
          // } else {
          //   newFormData.append('topicId', selectedChildChaptersAndTopics)

          newFormData.append('sharable', isChecked)
          if (author !== '') {
            newFormData.append('author', author)
          }
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
        }
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

  return (
    <MainContainer>
      <ChapterAndTopicSection
        units={units}
        topics={topics}
        isChapterAPILoading={isChapterAPILoading}
        selectedUnits={selectedUnit}
        selectedChapters={selectedChaptersAndTopics} // Pass selected chapters here
        selectedTopics={selectedChildChaptersAndTopics} // Pass selected topics here
        handleUnitChecked={handleUnitChecked}
        isTopicsLoading={isTopicsLoading}
        chaptersAndTopics={chaptersAndTopics}
        handleChildChaptersChecked={handleChildChaptersChecked}
        selectedChildChaptersAndTopics={selectedChildChaptersAndTopics}
        handleChapterChecked={handleChapterChecked}
      />

      <UploadDevWidth>
        <UploadFileContainer>
          <UploadQuestionPartOne>
            <HorizontalElements>
              <QuestionFileHeading>Upload Question File</QuestionFileHeading>
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

      {isPopup && (
        <QuestionsPopUp
          {...{
            setPopup: () => setIsPopup(false),
            questions,
            allTabs,
            setQuestions
          }}
        />
      )}
    </MainContainer>
  )
}

export default UploadQuestionsContainer
