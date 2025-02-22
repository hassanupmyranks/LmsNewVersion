import { ButtonV2, Flex } from '../../../../components/V2/styledComponents'
import {
  AlignCenter,
  Block,
  ButtonContainer,
  FileType,
  Pending,
  Table,
  TableRow,
  TableRowFirst,
  TableRowLast,
  TableWrapper,
  UploadAssignment,
  UploadUI,
  //   Uploaded,
  SuccessfulUploadMessage,
  FileCircle,
  MainMessage,
  WordTitle,
  PageWrapper,
  Format,
  Anchor,
  Text,
  Files,
  AlignFiles,
  Uploaded
} from '../studentBulkUpload/styledComponents'
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
  FileContainer,
  InnerContainer,
  MessageContainer,
  UploadFileMessageContainer
} from '../../../../components/V2/FileDragAndDrop/styledComponents'
import { Spinner } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import {
  GetAllUploadedFiles,
  SubtopicsBulkUpload,
  getAllCourses,
  getChapterData,
  getSubjectData,
  getTopicData
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import File from '../../../../assets/File.png'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'

const BulkUploadSubTopics = () => {
  const [data, setData] = useState<any>([])
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [file, setFile] = useState<any>()
  const [processingId, setProcessingId] = useState<string>('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [courseList, setCourseList] = useState<any>([])
  const [selectedCourse, setSelectedCourse] = useState<any>()
  const [isCourseLoading, setIsCourseLoading] = useState(false)

  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0
  })

  const [isSubjectLoading, setIsSubjectLoading] = useState(false)
  const [subjectOptions, setSubjectOptions] = useState<any>([])
  const [selectedSubject, setSelectedSubject] = useState<any>()

  const [isChapterLoading, setIsChapterLoading] = useState(false)
  const [chapterOptions, setChapterOptions] = useState<any>([])
  const [selectedChapter, setSelectedChapter] = useState<any>()

  const [isTopicLoading, setIsTopicLoading] = useState(false)
  const [topicOptions, setTopicOptions] = useState<any>([])
  const [selectedTopic, setSelectedTopic] = useState<any>()

  const formData = new FormData()
  formData.append('topicId', selectedTopic?.id)
  formData.append('file', file)

  useEffect(() => {
    setIsCourseLoading(true)
    getAllCourses()
      .then((res: any) => {
        setCourseList(res.data.data)
      })
      .finally(() => setIsCourseLoading(false))
  }, [])

  useEffect(() => {
    GetAllUploadedFiles('subTopics').then((res) => {
      setData(res.data)
    })
  }, [])

  const Cdata: any =
    Array.isArray(courseList) &&
    courseList?.map((item: any) => ({
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

  const onFileChange = (file: File) => {
    return file
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const onChangeEvent = (event: any) => {
    const { files } = event.target
    onFileChange(files)
    setFile(files[0])
  }
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    if (processingId) {
      const websocket = new WebSocket(
        `${process.env.REACT_APP_SOCKET_BASEURL_V2}/?processingId=${processingId}`
      )

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (!data.isError) {
          setSocketResponse(data)
          if (data.finished) {
            CustomToastMessage(`File Sent Successfully!`, 'success')
            setIsDisable(false)
            GetAllUploadedFiles('subTopics')
              .then((res) => {
                setSelectedTopic({ id: '', label: '' })
                setSelectedChapter({ id: '', label: '' })
                setSelectedCourse({ id: '', label: '' })
                setSelectedSubject({ id: '', label: '' })
                setTopicOptions([])
                setChapterOptions([])
                setSubjectOptions([])
                setChapterOptions([])
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

  useEffect(() => {
    if (file === undefined && fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [file])

  const toggleUploadUsers = () => {
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
    SubtopicsBulkUpload(formData)
      .then((response) => {
        setProcessingId(response.data.processingId)
        setSelectedCourse('')
        setFile(undefined)
      })
      .catch((error) => {
        setIsDisable(false)
        CustomToastMessage(error.message, 'error')
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

  const getSubjects = async (data: any) => {
    setIsSubjectLoading(true)
    getSubjectData({
      page: 1,
      limit: 100,
      courseId: data.id
    })
      .then((res) => {
        const options = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: ''
          }
        })
        setSubjectOptions(options)
        if (res.length <= 0) {
          CustomToastMessage('There are not subjects under this grade', 'error')
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubjectLoading(false))
  }

  const getChapters = (st: any) => {
    setIsChapterLoading(true)
    let payload: any = {
      page: 1,
      limit: 120,
      subjectId: st?.id
    }

    getChapterData(payload)
      .then((res) => {
        if (res) {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setChapterOptions(options)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Chapters under this Subject',
              'error'
            )
          }
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsChapterLoading(false))
  }

  const getTopics = (cd: any) => {
    setIsTopicLoading(true)
    getTopicData({
      page: 1,
      limit: 150,
      chapterId: cd.id
    })
      .then((res) => {
        const options = res?.data?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: ''
          }
        })
        setTopicOptions(options)
        if (res.length <= 0) {
          CustomToastMessage('There are not topics under this chapter', 'error')
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsTopicLoading(false))
  }

  return (
    <PageWrapper>
      <UploadUI>
        <Flex gap="20px" style={{ marginBottom: '20px' }}>
          <SearchableDropdown
            label={'Select Course'}
            placeHolder={'Please Select Course'}
            options={Cdata}
            onSelect={(selected) => {
              setSelectedCourse(selected)
              if (selected.id) {
                getSubjects(selected)
              }
              setChapterOptions([])
              setTopicOptions([])
              setSubjectOptions([])
              setSelectedChapter({ id: '', label: '' })
              setSelectedTopic({ id: '', label: '' })
              setSelectedSubject({ id: '', label: '' })
            }}
            required
            isLoader={isCourseLoading}
            isClear={selectedCourse?.id ? true : false}
            selectedValue={selectedCourse}
            fullWidth
          ></SearchableDropdown>
          <SearchableDropdown
            label="Select Subject"
            required
            options={subjectOptions}
            isLoader={isSubjectLoading}
            isClear={selectedSubject?.id ? true : false}
            //   error={course === '' ? errors.courseId : ''}
            onSelect={(d) => {
              setSelectedSubject(d)
              setChapterOptions([])
              setTopicOptions([])
              setSelectedChapter({ id: '', label: '' })
              setSelectedTopic({ id: '', label: '' })
              if (d.id) {
                getChapters(d)
              }
            }}
            placeHolder={'Please Select Subject'}
            selectedValue={selectedSubject}
            fullWidth
          ></SearchableDropdown>
        </Flex>
        <Flex gap="20px" style={{ marginBottom: '20px' }}>
          <SearchableDropdown
            label="Select Chapter"
            required
            options={chapterOptions}
            isLoader={isChapterLoading}
            //   error={course === '' ? errors.courseId : ''}
            isClear={selectedChapter?.id ? true : false}
            onSelect={(d) => {
              setSelectedChapter(d)
              setSelectedTopic({ id: '', label: '' })
              if (d.id) {
                getTopics(d)
              }
            }}
            placeHolder={'Please Select Chapter'}
            selectedValue={selectedChapter}
            fullWidth
          ></SearchableDropdown>
          <SearchableDropdown
            label="Select Topic"
            required
            options={topicOptions}
            isLoader={isTopicLoading}
            //   error={course === '' ? errors.courseId : ''}
            onSelect={(d) => setSelectedTopic(d)}
            isClear={selectedTopic?.id ? true : false}
            placeHolder={'Please Select Topic'}
            selectedValue={selectedTopic}
            fullWidth
          ></SearchableDropdown>
        </Flex>
        <UploadAssignment>
          <ProgressBarContainer>
            {Number(socketResponse.progress) === 100 ? (
              socketResponse.notUploadedCount === 0 ? (
                <div>
                  <SuccessProgressBar></SuccessProgressBar>
                  <SuccessProgressBarPara>
                    Material from file are shown below
                  </SuccessProgressBarPara>
                </div>
              ) : (
                <ProgressBarContainer>
                  <WrongMessage>
                    {`Upload failed for ${
                      socketResponse.notUploadedCount
                    } Material out of ${
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
              <FileType>(Must be MS Excel file)</FileType>
            </AlignCenter>
            <form style={{ maxWidth: '100%' }}>
              <input
                type="file"
                name="file"
                hidden
                ref={fileInputRef}
                onChange={onChangeEvent}
              />
              <FileContainer onClick={handleFileSelect}>
                <InnerContainer>
                  <FileCircle src={'/assets/images/excel.png'} alt="" />
                  <MessageContainer>
                    {file === undefined ? (
                      <UploadFileMessageContainer>
                        <MainMessage>Click to Select File</MainMessage>
                      </UploadFileMessageContainer>
                    ) : (
                      <SuccessfulUploadMessage>
                        {file?.name}
                      </SuccessfulUploadMessage>
                    )}
                  </MessageContainer>
                </InnerContainer>
              </FileContainer>
            </form>
          </Block>
          <ButtonContainer>
            <ButtonV2
              onClick={toggleUploadUsers}
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
          <Format>Note : Use this file formats</Format>
          <Files>
            <AlignFiles>
              <Anchor
                href={`${process.env.PUBLIC_URL}/ChapterUpload.xlsx`}
                download="Chapter_Upload_Format.xlsx"
              >
                <img src={File} alt="File" height={'60px'} />
              </Anchor>
              <Text>Subtopic Format</Text>
            </AlignFiles>
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

export default BulkUploadSubTopics
