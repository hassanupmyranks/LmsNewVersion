import { useEffect, useState } from 'react'
import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import {
  AlignCenter,
  Block,
  ButtonContainer,
  FileType,
  PageWrapper,
  Pending,
  Table,
  TableRow,
  TableRowFirst,
  TableRowLast,
  TableWrapper,
  UploadAssignment,
  UploadUI,
  Uploaded,
  WordTitle
} from './styledComponents'
import FileDragDropComponent from '../../../../components/V2/FileDragAndDrop'
import {
  GetAllUploadedFiles,
  getQuestionBankDetailsChapter,
  getQuestionBankDetailsCourses,
  getQuestionBankDetailsSubjects,
  getQuestionBankDetailsTopics,
  questionUploadInBulk
} from '../../../../helpers/V2/apis'
import { Spinner } from 'react-bootstrap'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import {
  CloseButton,
  DeleteButton,
  DeleteIconContainer,
  DeleteText,
  Percentage,
  ProgressBar,
  ProgressBarContainer,
  SecondHalfProgressBar,
  SuccessProgressBar,
  SuccessProgressBarPara,
  WrongMessage
} from '../addQuestions/components/styledComponents'
import { SocketResponse } from '../../../../utils/types'
import Delete from '../../../../assets/Delete.png'
import {
  AlignFiles,
  Anchor,
  Files,
  Format,
  Text
} from '../studentBulkUpload/styledComponents'
import File from '../../../../assets/word_photo.jpg'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'

const QuestionBulkUpload = () => {
  const [data, setData] = useState<any>([])
  const [courseData, setCourseData] = useState<any[]>([])
  const [subjectData, setSubjectData] = useState<any>([])
  const [subjectLoading, setSubjectLoading] = useState<boolean>(false)
  const [chapterLoading, setChapterLoading] = useState<boolean>(false)
  const [chapterData, setChapterData] = useState<any[]>([])
  const [topicData, setTopicData] = useState<any[]>([])
  const [topicLoading, setTopicLoading] = useState<boolean>(false)
  const [selectedCourse, setSelectedCourse] = useState<any>()
  const [selectedSubject, setSelectedSubject] = useState<any>()
  const [selectedChapter, setSelectedChapter] = useState<any>()
  const [selectedTopic, setSelectedTopic] = useState<any>()
  const [processingId, setProcessingId] = useState<string>('')
  const [file, setFile] = useState<any>()
  const [isSubmit, setIsSubmit] = useState(false)
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0
  })
  const formData = new FormData()
  formData.append('courseId', selectedCourse?.id)

  if (selectedSubject?.id) {
    formData.append('subjectId', selectedSubject?.id)
  }
  if (selectedChapter?.id) {
    formData.append('chapterId', selectedChapter?.id)
  }

  if (selectedTopic?.id) {
    formData.append('topicId', selectedTopic?.id)
  }
  formData.append('sharable', 'false')
  formData.append('file', file)

  const [isCourseLoad, setIsCourseLoad] = useState(false)
  const [coursePage, setCoursePage] = useState(1)
  const [totalCourse, setTotalCourse] = useState(0)
  const [chapterPage, setChapterPage] = useState(1)
  const [totalChapter, setTotalChapter] = useState(0)
  const [topicPage, setTopicPage] = useState(1)
  const [totalTopics, setTotalTopics] = useState(0)

  useEffect(() => {
    setIsCourseLoad(true)
    getQuestionBankDetailsCourses({
      limit: 110,
      page: coursePage
    })
      .then((res: any) => {
        setTotalCourse(res.total)
        setCourseData((prev) => [...prev, ...res.data])
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsCourseLoad(false))
  }, [coursePage])

  useEffect(() => {
    if (selectedCourse?.id) {
      setSubjectLoading(true)
      getQuestionBankDetailsSubjects({
        courseId: selectedCourse?.id,
        limit: 100
      })
        .then((res: any) => {
          setSubjectData(res)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch(() => setSubjectLoading(false))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedCourse?.id])

  useEffect(() => {
    if (selectedSubject?.id) {
      setChapterLoading(true)
      getQuestionBankDetailsChapter({
        subjectId: selectedSubject?.id,
        limit: 100,
        page: chapterPage
      })
        .then((res: any) => {
          setTotalChapter(res.total)
          setChapterData((prev) => [...prev, ...res.data])
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Chapters under this Subject',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setChapterLoading(false))
    }
  }, [selectedSubject?.id, chapterPage])

  useEffect(() => {
    if (selectedChapter?.id) {
      setTopicLoading(true)
      getQuestionBankDetailsTopics({
        chapterId: selectedChapter?.id,
        limit: 100,
        page: topicPage
      })
        .then((res: any) => {
          setTotalTopics(res.total)
          setTopicData((prev) => [...prev, ...res.data])
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setTopicLoading(false))
    }
  }, [selectedChapter?.id, topicPage, selectedChapter])

  useEffect(() => {
    GetAllUploadedFiles('questions').then((res) => {
      setData(res.data)
    })
  }, [])

  const Cdata: any =
    Array.isArray(courseData) &&
    courseData.map((item: any) => ({
      id: item._id,
      label: item.name
    }))

  const Sdata: any =
    Array.isArray(subjectData) &&
    subjectData.map((item: any) => ({
      id: item._id,
      label: item.name
    }))
  const Cadata: any =
    Array.isArray(chapterData) &&
    chapterData.map((item: any) => ({
      id: item._id,
      label: item.name
    }))

  const Tdata: any =
    Array.isArray(topicData) &&
    topicData.map((item: any) => ({
      id: item._id,
      label: item.name
    }))

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const options: any = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const formatTime = (dateString: any) => {
    const date = new Date(dateString)
    const options: any = {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    return date.toLocaleTimeString('en-US', options)
  }

  useEffect(() => {
    if (processingId) {
      const websocket = new WebSocket(
        `${process.env.REACT_APP_SOCKET_BASEURL_V2}/?processingId=${processingId}&type=questionDocUpload`
      )

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (!data.isError) {
          setSocketResponse(data)
          if (data.finished) {
            CustomToastMessage(`File Sent Successfully!`, 'success')
            setIsDisable(false)
            setSelectedCourse('')
            setSelectedSubject('')
            setSelectedChapter('')
            setSelectedTopic('')
            setFile(undefined)
            GetAllUploadedFiles('questions')
              .then((res) => {
                setData(res.data)
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }
      }
      return () => {
        websocket.close()
      }
    }
  }, [processingId])

  const toggleUploadQuestion = () => {
    setIsSubmit(true)
    setIsDisable(true)
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
    questionUploadInBulk(formData)
      .then((response) => {
        setProcessingId(response.data.processingId)
      })
      .catch((error) => {
        setIsDisable(false)
        CustomToastMessage(error.response.data.message, 'error')
      })
      .finally(() => setIsSubmit(false))
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
  }

  const handleScrollWithGetCourse = (total: number, length: number) => {
    if (total > length) {
      setCoursePage(coursePage + 1)
    }
  }
  const handleScrollWithGetChapter = (total: number, length: number) => {
    if (total > length) {
      setChapterPage(chapterPage + 1)
    }
  }
  const handleScrollWithGetTopics = (total: number, length: number) => {
    if (total > length) {
      setTopicPage(topicPage + 1)
    }
  }

  return (
    <PageWrapper>
      <UploadUI>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            width: '100%'
          }}
        >
          <SearchableDropdown
            style={{ width: '240px' }}
            label={'Select Grade'}
            placeHolder={'Select Grade'}
            isLoader={isCourseLoad}
            options={Cdata}
            total={totalCourse}
            length={Cdata.length}
            isClear={selectedCourse?.label ? true : false}
            handleScrollInfinite={(total, length) =>
              handleScrollWithGetCourse(total, length)
            }
            onSelect={(selected) => {
              setSelectedCourse(selected)
              setSubjectData([])
              setSelectedSubject({ label: '', id: '' })
            }}
            selectedValue={selectedCourse}
          />
          <SearchableDropdown
            style={{ marginBottom: '5px', width: '48%' }}
            label={'Select Subject'}
            placeHolder={'Select Subject'}
            isClear={selectedSubject?.id ? true : false}
            options={Sdata}
            onSelect={(selected) => {
              setSelectedSubject(selected)
              setChapterData([])
              setSelectedChapter({ label: '', id: '' })
            }}
            isLoader={subjectLoading}
            selectedValue={selectedSubject}
          ></SearchableDropdown>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            width: '100%'
          }}
        >
          <SearchableDropdown
            style={{ width: '48%' }}
            label={'Select Chapter'}
            placeHolder={'Select Chapter'}
            options={Cadata}
            total={totalChapter}
            length={Cadata.length}
            isClear={selectedChapter?.label ? true : false}
            handleScrollInfinite={(total, length) =>
              handleScrollWithGetChapter(total, length)
            }
            onSelect={(selected) => {
              setSelectedChapter(selected)
              setTopicData([])
              setSelectedTopic({ label: '', id: '' })
            }}
            isLoader={chapterLoading}
            selectedValue={selectedChapter}
          ></SearchableDropdown>
          <SearchableDropdown
            style={{ width: '48%' }}
            label={'Select Topic'}
            placeHolder={'Select Topic'}
            options={Tdata}
            total={totalTopics}
            length={Tdata.length}
            isClear={selectedTopic?.label ? true : false}
            handleScrollInfinite={(total, length) =>
              handleScrollWithGetTopics(total, length)
            }
            onSelect={(selected) => {
              setSelectedTopic(selected)
            }}
            isLoader={topicLoading}
            selectedValue={selectedTopic}
          ></SearchableDropdown>
        </div>
        <UploadAssignment>
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
                    {`Upload failed for ${
                      socketResponse.notUploadedCount
                    } questions out of ${
                      socketResponse.notUploadedCount +
                      socketResponse.uploadedCount
                    }, please try again for them!
                     `}
                  </WrongMessage>

                  <CloseButton onClick={handleClose}>Close</CloseButton>
                  <CloseButton>
                    <a style={{ all: 'unset' }} href={socketResponse.filePath}>
                      Download Error File
                    </a>
                  </CloseButton>
                </ProgressBarContainer>
              )
            ) : (
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
          <Block>
            <AlignCenter>
              <WordTitle>Upload Attachment</WordTitle>
              <FileType>(Must be MS Word file)</FileType>
            </AlignCenter>
            <FileDragDropComponent
              onFileChange={(ExcelFile) => {
                setFile(ExcelFile)
              }}
              values={file}
              setValues={setFile}
            />
          </Block>
          <ButtonContainer>
            <ButtonV2
              onClick={toggleUploadQuestion}
              disabled={isDisable || isSubmit}
            >
              {isDisable ? (
                <Spinner
                  style={{
                    width: '20px',
                    height: '20px'
                  }}
                  animation={'border'}
                />
              ) : (
                'Upload'
              )}
            </ButtonV2>
          </ButtonContainer>
        </UploadAssignment>
        <AlignFiles>
          <Format>Note : Use this file format</Format>
          <Files>
            <div>
              <Anchor
                href={`${process.env.PUBLIC_URL}/Question_Bulk_Format.docx`}
                download="Question_Bulk_Upload_Format.docx"
              >
                <img src={File} alt="File" height={'60px'} />
              </Anchor>
              <Text>Question</Text>
            </div>
          </Files>
        </AlignFiles>
      </UploadUI>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Date</th>
              <th>Time</th>
              <th>FileName</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableRowFirst>{index + 1}</TableRowFirst>
                <td style={{ minWidth: '90px' }}>
                  {formatDate(item.createdAt)}
                </td>
                <td style={{ minWidth: '90px' }}>
                  {formatTime(item.createdAt)}
                </td>
                <td style={{ minWidth: '90px' }}>{item.filename}</td>
                <TableRowLast>
                  {item.uploaded ? (
                    <Uploaded>Uploaded</Uploaded>
                  ) : (
                    <Pending>Pending</Pending>
                  )}
                </TableRowLast>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </PageWrapper>
  )
}

export default QuestionBulkUpload
