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
  Uploaded,
  SuccessfulUploadMessage,
  FileCircle,
  MainMessage,
  WordTitle,
  PageWrapper,
  Format,
  Anchor,
  Text,
  Files,
  AlignFiles
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
  MaterialUpload,
  getAllCourses,
  getChapterData,
  getSubTopicAPI,
  getSubjectData,
  getTopicData
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import File from '../../../../assets/File.png'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'

const MaterialUploading = () => {
  // const [data, setData] = useState<any>([])
  // const [course, setCourse] = useState('')
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const [file, setFile] = useState<any>()
  const [processingId, setProcessingId] = useState<string>('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [courseList, setCourseList] = useState<any>([])
  const [selectedCourse, setSelectedCourse] = useState<any>()
  const [selectedSubject, setSelectedSubject] = useState<any>()
  const [selectedChapter, setSelectedChapter] = useState<any>()
  const [selectedTopic, setSelectedTopic] = useState<any>()
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>()
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0
  })
  const [isCourseLoading, setIsCourseLoading] = useState<any>(false)
  const [isSubjectLoading, setIssubjectLoading] = useState<any>(false)

  const [isChapterLoading, setIsChapterLoading] = useState<any>(false)

  const [isTopicLoading, setIsTopicLoading] = useState<any>(false)

  const [isSubTopicLoading, setsubTopicLoading] = useState<any>(false)

  const [materialLevel, setMaterialLevel] = useState('')
  const [data, setData] = useState<any>([])

  const [subjectList, setSubjectList] = useState<any>()
  const [chapterList, setChapterList] = useState<any>()
  const [topicList, setTopicList] = useState<any>()
  const [subTopicList, setSubTopicList] = useState<any>()

  const formData = new FormData()
  selectedSubject?.id && formData.append('subjectId', selectedSubject?.id)
  selectedChapter?.id && formData.append('chapterId', selectedChapter?.id)
  selectedTopic?.id && formData.append('topicId', selectedTopic?.id)
  selectedSubTopic?.id && formData.append('subTopicId', selectedSubTopic?.id)
  materialLevel && formData.append('materialLevel', materialLevel)

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
    if (selectedCourse?.id) {
      setIssubjectLoading(true)
      getSubjectData({
        courseId: selectedCourse?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          setSubjectList(response)
          if (response.length <= 0) {
            CustomToastMessage(
              'There are no subjects under this grade',
              'error'
            )
          }
        })
        .finally(() => setIssubjectLoading(false))
    }
  }, [selectedCourse])

  useEffect(() => {
    if (selectedSubject?.id) {
      setIsChapterLoading(true)
      getChapterData({
        subjectId: selectedSubject?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          setChapterList(response?.data)
          if (response.data.length <= 0) {
            CustomToastMessage(
              'There are no chapters under this subject',
              'error'
            )
          }
        })
        .finally(() => setIsChapterLoading(false))
    }
  }, [selectedSubject])

  useEffect(() => {
    if (selectedChapter?.id) {
      setIsTopicLoading(true)
      getTopicData({
        chapterId: selectedChapter?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          const res = response.data
          setTopicList(res)
          if (response.data.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this chapter',
              'error'
            )
          }
        })
        .finally(() => setIsTopicLoading(false))
    }
  }, [selectedChapter])

  useEffect(() => {
    if (selectedTopic?.id) {
      setsubTopicLoading(true)
      getSubTopicAPI({
        topicId: selectedTopic?.id,
        page: 1,
        limit: 100
      })
        .then((response) => {
          const res = response.data
          setSubTopicList(res)
          if (response.data.length <= 0) {
            CustomToastMessage(
              'There are no Sub-Topics under this Topic',
              'error'
            )
          }
        })
        .finally(() => setsubTopicLoading(false))
    }
  }, [selectedTopic])

  useEffect(() => {
    GetAllUploadedFiles('materials').then((res) => {
      setData(res.data)
    })
  }, [])

  const handleCourseSelect = (courses: SearchableDropdownOptionData) => {
    // setCourse('courseId')
    setSelectedCourse(courses)
    setMaterialLevel('')
    // setDefaultTopic({ label: '', id: '' })
    setSelectedSubject({ id: '', label: '', value: '' })
    setSelectedChapter({ id: '', label: '', value: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setSelectedSubTopic({ id: '', label: '', value: '' })
    setSubjectList([])
    setChapterList([])
    setTopicList([])
    setSubTopicList([])
    // if (courses && courses.id) {
    //   setCreateSubject({
    //     ...createSubject
    //   })
    // }
  }

  const handleSubjectSelect = (subject: SearchableDropdownOptionData) => {
    // setCourse('courseId')
    setSelectedSubject(subject)
    setMaterialLevel('subject')
    // setDefaultTopic({ label: '', id: '' })
    setSelectedChapter({ id: '', label: '', value: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setSelectedSubTopic({ id: '', label: '', value: '' })
    setChapterList([])
    setTopicList([])
    setSubTopicList([])
    // if (subject && subject.id) {
    //   setCreateSubject({
    //     ...createSubject
    //   })
    // }
  }

  const handleChapterSelect = (chapter: SearchableDropdownOptionData) => {
    // setCourse('courseId')
    setSelectedChapter(chapter)
    setMaterialLevel('chapter')
    // setDefaultTopic({ label: '', id: '' })
    setSelectedTopic({ id: '', label: '', value: '' })
    setSelectedSubTopic({ id: '', label: '', value: '' })
    setTopicList([])
    setSubTopicList([])
    // if (chapter && chapter.id) {
    //   setCreateSubject({
    //     ...createSubject
    //   })
    // }
  }

  const handleTopicSelect = (topic: SearchableDropdownOptionData) => {
    // setCourse('courseId')
    setSelectedTopic(topic)
    setMaterialLevel('topic')
    setSelectedSubTopic({ id: '', label: '', value: '' })
    setSubTopicList([])
    // setDefaultTopic({ label: '', id: '' })
    // if (topic && topic.id) {
    //   setCreateSubject({
    //     ...createSubject,
    //     topicId: topic.id as string
    //   })
    // }
  }

  const handleSubTopicSelect = (subTopic: SearchableDropdownOptionData) => {
    // setCourse('courseId')
    setSelectedSubTopic(subTopic)
    setMaterialLevel('subTopic')
    // setDefaultTopic({ label: '', id: '' })
    // if (topic && topic.id) {
    //   setCreateSubject({
    //     ...createSubject,
    //     topicId: topic.id as string
    //   })
    // }
  }

  const FinalCourseList: SearchableDropdownOptionData[] = courseList
    ? courseList.map((course: any) => ({
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
  const FinalSubTopicList: SearchableDropdownOptionData[] = subTopicList
    ? subTopicList.map((topic: any) => ({
        id: topic._id,
        label: topic.name
      }))
    : []

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
            GetAllUploadedFiles('materials')
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
    MaterialUpload(formData)
      .then((response) => {
        setProcessingId(response.data.processingId)
        setSelectedCourse('')
        setMaterialLevel('')
        setFile(undefined)
        setSelectedCourse({ id: '', label: '', value: '' })
        setSelectedSubject({ id: '', label: '', value: '' })
        setSelectedChapter({ id: '', label: '', value: '' })
        setSelectedTopic({ id: '', label: '', value: '' })
        setSelectedSubTopic({ id: '', label: '', value: '' })
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

  return (
    <PageWrapper>
      <UploadUI>
        <Flex gap="20px" style={{ marginBottom: '20px' }}>
          <SearchableDropdown
            label="Select Grade"
            required
            options={FinalCourseList}
            isLoader={isCourseLoading}
            // error={course === '' ? errors.courseId : ''}
            onSelect={handleCourseSelect}
            placeHolder={'Please Select Grade'}
            selectedValue={selectedCourse}
            isClear={selectedCourse?.id ? true : false}
            fullWidth
          ></SearchableDropdown>
          <SearchableDropdown
            label="Select Subject"
            required
            isLoader={isSubjectLoading}
            options={FinalSubjectList}
            // error={course === '' ? errors.courseId : ''}
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
            // required
            isLoader={isChapterLoading}
            options={FinalChapterList}
            // error={course === '' ? errors.courseId : ''}
            onSelect={handleChapterSelect}
            placeHolder={'Please Select Chapter'}
            selectedValue={selectedChapter}
            isClear={selectedChapter?.id ? true : false}
            fullWidth
          ></SearchableDropdown>
          <SearchableDropdown
            label="Select Topic"
            // required
            options={FinalTopicList}
            isLoader={isTopicLoading}
            // error={course === '' ? errors.courseId : ''}
            onSelect={handleTopicSelect}
            placeHolder={'Please Select Topic'}
            selectedValue={selectedTopic}
            isClear={selectedTopic?.id ? true : false}
            fullWidth
          ></SearchableDropdown>
        </Flex>
        <Flex style={{ width: '50%', paddingRight: '10px' }}>
          <SearchableDropdown
            label="Select Sub-Topic"
            // required
            isLoader={isSubTopicLoading}
            options={FinalSubTopicList}
            // error={course === '' ? errors.courseId : ''}
            onSelect={handleSubTopicSelect}
            placeHolder={'Please Select Sub-Topic'}
            selectedValue={selectedSubTopic}
            isClear={selectedSubTopic?.id ? true : false}
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
            <AlignFiles style={{ width: '85px' }}>
              <Anchor
                href={`${process.env.PUBLIC_URL}/StudyMaterialFormat.xlsx`}
                download="StudyMaterial_Upload_Format.xlsx"
              >
                <img src={File} alt="File" height={'60px'} />
              </Anchor>
              <Text>Study</Text>
            </AlignFiles>
            <AlignFiles>
              <Anchor
                href={`${process.env.PUBLIC_URL}/TeachingMaterialFormat.xlsx`}
                download="TeachingMaterial_Upload_Format.xlsx"
              >
                <img src={File} alt="File" height={'60px'} />
              </Anchor>
              <Text>Teaching</Text>
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
                <td>{formatDate(item.createdAt)}</td>
                <td>{formatTime(item.createdAt)}</td>
                <td>{item.filename}</td>
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

export default MaterialUploading
