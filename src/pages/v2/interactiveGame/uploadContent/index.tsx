import React, { useEffect, useState } from 'react'
import {
  SocketResponse,
  SubTopicsDetails,
  SubjectTopicsDetails
} from '../../../../utils/types'

import {
  ButtonV2,
  Flex,
  Grid,
  GridItem,
  PageContainer,
  WrapperCard
} from '../../../../components/V2/styledComponents'
import {
  // DurationLabel,
  // DurationPickerContainer,
  FormContainerV2,
  HeadingTitle,
  // HeadingTitleSpan,
  Text2
  // TimeInput
  // MyTimeWrapper
} from './StyledCompontents'
// import InputV2 from '../../../../components/V2/Form/Input'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import {
  ChaptersContainer,
  CloseButton,
  ContainerBody,
  ContainerHeading,
  // DeleteButton,
  // DeleteIconContainer,
  // DeleteText,
  Percentage,
  ProgressBar,
  ProgressBarContainer,
  SecondHalfProgressBar,
  SuccessProgressBar,
  SuccessProgressBarPara,
  UploadQuestionPartTwo,
  // UploadQuestionPartTwo,
  WrongMessage
} from '../../assessment/addQuestions/components/styledComponents'
import { Spinner } from 'react-bootstrap'
// import DurationPicker from 'react-duration-picker'
import './style.css'
import {
  BulkUploadGameDataWithQRCode,
  getChapterData,
  getLearnCourseData,
  getSubjectsDataCourseId,
  getTopicData
  // getGameTypes
} from '../../../../helpers/V2/apis'
import { GetLearnModuleChapterResponse } from '../manageContent/types'
import SingleSelectItemCheckBox from '../../../../components/V2/Form/SingleSelectItemCheckBox'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import FileDragDropComponent from './FileDragDropComponent'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import Delete from '../../../../assets/Delete.png'

import {
  AlignFiles,
  Anchor,
  Format
} from '../../assessment/studentBulkUpload/styledComponents'
import File from '../../../../assets/File.png'

const UploadContent = () => {
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0
  })

  const defaultValues = {
    value: '',
    label: '',
    id: 0
  }

  const history = useHistory()
  const [gameTypeID, setGameTypeID] = useState<any>()
  const [gameType, setGameType] = useState<any>(defaultValues)
  const [courses, setCourses] = useState<SubjectTopicsDetails[]>([])
  const [subjects, setSubjects] = useState<SubjectTopicsDetails[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>({})
  const [selectedSubject, setSelectedSubject] = useState<any>([])
  const [selectedChapter, setSelectedChapter] = useState<any>([])
  const [file, setFile] = useState<any>()
  const [chapterData, setChapterData] = useState<
    GetLearnModuleChapterResponse[]
  >([])
  const [subTopicData, setSubTopicData] = useState<SubTopicsDetails[]>([])
  const [chapterId, setChapterId] = useState<string>('')
  const [isTopicLoading, setIsTopicLoading] = useState<boolean>(false)
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>([])
  const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false)
  const [isCourseLoading, setIsCourseLoading] = useState<boolean>(false)
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  // const [progress, setProgress] = useState<number | string>(0)
  const [submitAPILoading, setSubmitAPILoading] = useState<boolean>(false)
  const [processingId, setProcessingId] = useState<any>()
  useEffect(() => {
    if (gameType.id) {
      setIsCourseLoading(true)
      getLearnCourseData({ page: 1, limit: 120, gameType: gameType.id })
        .then((res) => {
          setCourses(res)
          setIsCourseLoading(false)
        })
        .catch((error) => {
          setIsCourseLoading(false)
          CustomToastMessage(error.message, 'error')
        })
    }
  }, [gameType.id])

  const handleCourseChecked = async (item: any) => {
    setSelectedCourse(item)
    setIsSubjectLoading(true)
    await getSubjectsDataCourseId({
      page: 1,
      limit: 100,
      courseId: item._id
    })
      .then((res) => {
        setIsSubjectLoading(false)
        setSubjects(res.data)
      })
      .catch((error) => {
        setIsSubjectLoading(false)

        console.log('error', error)
      })
    // debugger
  }
  const handleCourseChildChecked = (item: any) => {
    setIsChapterLoading(true)
    setSelectedSubject(item)
    getChapterData({
      subjectId: item._id,
      page: 1,
      limit: 100
    })
      .then((res) => {
        setIsChapterLoading(false)
        setChapterData(res.data)
      })
      .catch((error) => {
        setIsChapterLoading(false)

        console.log('error', error)
      })
  }

  const handleChildChaptersChecked = (item: any) => {
    setSelectedSubTopic(item)
  }
  // useEffect(() => {
  //   getGameTypes().then((res) => {
  //     setGameData(res)
  //   })
  // }, [])
  const GAME_TYPES = {
    'FILL IN THE BLANKS': 'fillInTheBlanks',
    MCQ: 'mcq',
    'DRAG & DROP': 'dragAndDrop',
    'MATCH THE FOLLOWING': 'matchTheFollowing',
    'TRUE OR FALSE': 'trueFalse',
    'JUMBLE WORD': 'jumbleWord',
    'LISTEN & FILL': 'listenAndFill',
    'SEARCH THE WORD': 'searchWord',
    PUZZLE: 'puzzle'
  }

  const gameTypeArray = Object.entries(GAME_TYPES).map(([key, value]) => ({
    gameType: key,
    gameId: value
  }))

  const GameData = gameTypeArray?.map((item: any) => ({
    value: item.gameType,
    label: item.gameType,
    id: item.gameId
  }))

  const handleChapterSelected = (id: string) => {
    setIsTopicLoading(true)
    setSubTopicData([])

    getTopicData({
      isLMS: false,
      chapterId: id,
      page: 1,
      limit: 100
    })
      .then((res) => {
        setSubTopicData(res?.data)
        setIsTopicLoading(false)
      })
      .catch(() => setIsTopicLoading(false))
  }
  const handleSelect = (batch: SearchableDropdownOptionData) => {
    if (batch.label === '') {
      setCourses([])
      setGameType(defaultValues)
      setSubTopicData([])
      setChapterData([])
      setSubjects([])
    } else {
      setGameType(batch)
      setGameTypeID(batch.id)
    }
  }

  const downloadErrorFile = (url: string) => {
    try {
      const link = document.createElement('a')
      link.target = ''
      link.href = url

      document.body.appendChild(link)

      link.click()
      document.body.removeChild(link)

      CustomToastMessage(
        `Some thing went wrong please check error file`,
        'error'
      )
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  useEffect(() => {
    if (processingId) {
      const websocket = new WebSocket(
        `${process.env.REACT_APP_SOCKET_BASEURL_V2}/?processingId=${processingId}`
      )

      websocket.onopen = () => {}

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setSocketResponse(data)
        // setProgress(data.progress)
        if (data.progress === 100) {
          if (data.filePath) {
            setSubmitAPILoading(false)
            downloadErrorFile(data.filePath)
          } else {
            history.push(ROUTES_V2.PUBLISH_GAME)
          }
        }
      }

      return () => {
        websocket.close()
      }
    }
  }, [processingId, history])

  const handleSubmitForm = () => {
    setIsError(true)
    setSubmitAPILoading(true)
    const formData = new FormData()
    formData.append('gameType', gameType.id)
    chapterId &&
      !selectedSubTopic._id &&
      formData.append('chapterId', chapterId)
    selectedSubTopic._id && formData.append('topicId', selectedSubTopic._id)
    formData.append('file', file)
    BulkUploadGameDataWithQRCode(formData)
      .then((response) => {
        CustomToastMessage(response.message, 'success')
        setProcessingId(response.data.processingId)
        // resetFormData()
        // setProgress(socketResponse?.progress)
      })
      .catch((error) => {
        CustomToastMessage(error?.response?.data?.message, 'error')
        setSubmitAPILoading(false)
      })
  }

  // const resetFormData = () => {
  //   setSubmitAPILoading(false)
  //   setSelectedCourse({})
  //   setSelectedChapter([])
  //   setSelectedSubject([])
  //   setSelectedSubTopic([])
  //   setGameTypeID({})
  //   setFile(undefined)
  //   setTimeout(() => {
  //     history.push(ROUTES_V2.PUBLISH_GAME)
  //     // setProgress(0)
  //   }, 3000)
  // }

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
    setSelectedSubTopic('')
    setSelectedChapter('')
    setSelectedSubject('')
    setSelectedCourse('')
    setFile(undefined)
    setSubmitAPILoading(false)
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <PageContainer>
      <FormContainerV2>
        <Grid columns={12} gap="20px">
          <GridItem columnSpan={windowWidth >= 992 ? 3 : 12}>
            <WrapperCard
              style={{
                height: '100%',
                overflowY: 'hidden',
                padding: '0px',
                position: 'relative',
                minHeight: '300px'
              }}
            >
              {isCourseLoading ? (
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    position: 'relative',
                    top: '50%',
                    left: '50%'
                    // transform: 'translate(-50%, -50%)'
                  }}
                  animation={'border'}
                />
              ) : (
                <Flex
                  direction="column"
                  alignItems="start"
                  style={{ height: '100%', overflowY: 'hidden' }}
                >
                  <ChaptersContainer
                    style={{
                      height: '100%',
                      overflowY: 'auto',
                      flexGrow: 1,
                      width: '100%'
                    }}
                  >
                    <SearchableDropdown
                      label="Select Game Type"
                      selectedValue={gameType}
                      onSelect={(batch) => {
                        handleSelect(batch)
                      }}
                      placeHolder="Select Game Type"
                      isLoader={false}
                      required
                      options={GameData}
                      error={
                        !gameTypeID && !gameTypeID?.id && isError
                          ? 'field is required'
                          : ''
                      }
                      isClear={gameType?.value ? true : false}
                      style={{ marginTop: '15px' }}
                    />
                    {courses.length === 0 ? (
                      ''
                    ) : (
                      <ContainerHeading style={{ flexDirection: 'column' }}>
                        <h4>Choose Grade and Subject</h4>
                      </ContainerHeading>
                    )}
                    <ContainerBody>
                      {courses.map((item: any) => (
                        <SingleSelectItemCheckBox
                          key={`course_and_subject_${item._id}`}
                          {...{
                            children: subjects,
                            isChecked: item._id === selectedCourse._id,
                            label: item.name,
                            onCheck: () => {
                              setSubjects([])
                              if (item._id == selectedCourse._id) {
                                setSelectedCourse({})
                                setChapterData([])
                              } else {
                                handleCourseChecked(item)
                              }
                            },
                            onChildCheck: (item) => {
                              if (item._id == selectedSubject._id) {
                                setSelectedSubject([])
                                setChapterData([])
                              } else {
                                handleCourseChildChecked(item)
                              }
                            }
                          }}
                          isLoading={isSubjectLoading}
                          selectedChildChaptersAndTopics={selectedSubject}
                        />
                      ))}
                    </ContainerBody>
                  </ChaptersContainer>
                </Flex>
              )}
            </WrapperCard>
          </GridItem>
          <GridItem columnSpan={windowWidth >= 992 ? 3 : 12}>
            <WrapperCard
              style={{
                height: '100%',
                overflowY: 'hidden',
                padding: '0px',
                position: 'relative',
                minHeight: '300px'
              }}
            >
              {isChapterLoading ? (
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
              ) : (
                <Flex
                  direction="column"
                  alignItems="start"
                  style={{ height: '100%', overflowY: 'hidden' }}
                >
                  <ChaptersContainer
                    style={{
                      height: '100%',
                      overflowY: 'auto',
                      flexGrow: 1,
                      width: '100%'
                    }}
                  >
                    <ContainerHeading style={{ flexDirection: 'column' }}>
                      <h3>Choose Chapters ({chapterData.length})</h3>
                      <p>Choose Chapters and Topics</p>
                    </ContainerHeading>
                    <ContainerBody>
                      {chapterData.map((itm: GetLearnModuleChapterResponse) => (
                        <SingleSelectItemCheckBox
                          key={`chapters_and_topics_${itm._id}`}
                          {...{
                            children: subTopicData,
                            isChecked: itm._id === selectedChapter._id,
                            label: itm.name,
                            onCheck: () => {
                              setSelectedChapter(itm)
                              handleChapterSelected(itm._id)

                              if (selectedChapter._id === itm._id) {
                                setSelectedChapter([])
                                setChapterId('')
                                setSubTopicData([])
                              } else {
                                setChapterId(itm._id)
                              }
                            },
                            onChildCheck: (item) => {
                              if (item._id == selectedSubTopic._id) {
                                setSelectedSubTopic([])
                              } else {
                                handleChildChaptersChecked(item)
                              }
                            }
                          }}
                          isLoading={isTopicLoading}
                          selectedChildChaptersAndTopics={selectedSubTopic}
                        />
                      ))}
                    </ContainerBody>
                  </ChaptersContainer>
                </Flex>
              )}
            </WrapperCard>
          </GridItem>
          <GridItem columnSpan={windowWidth >= 992 ? 4 : 12}>
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '20px',
                gap: '13px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px'
              }}
            >
              <Flex direction="column">
                <HeadingTitle style={{ justifyContent: 'center' }}>
                  Upload File
                </HeadingTitle>
                <UploadQuestionPartTwo style={{ width: '100%', margin: '0px' }}>
                  <FileDragDropComponent
                    onFileChange={(ExcelFile) => {
                      setFile(ExcelFile)
                    }}
                    values={file}
                    setValues={setFile}
                    width="100%"
                  />
                </UploadQuestionPartTwo>
                {gameType.value === undefined || gameType.value === '' ? (
                  ''
                ) : (
                  <div>
                    <Format style={{ marginTop: '10px' }}>
                      Note : Use this file Format
                    </Format>
                    <AlignFiles>
                      <Anchor
                        href={`${process.env.PUBLIC_URL}${
                          gameType.value === 'JUMBLE WORD'
                            ? '/JumbleWord.xlsx'
                            : gameType.value === 'FILL IN THE BLANKS'
                            ? '/FillInTheBlanks.xlsx'
                            : gameType.value === 'DRAG & DROP'
                            ? '/DragDrop.xlsx'
                            : gameType.value === 'MCQ'
                            ? '/MCQ.xlsx'
                            : gameType.value === 'TRUE OR FALSE'
                            ? '/TrueFalse.xlsx'
                            : gameType.value === 'MATCH THE FOLLOWING'
                            ? '/MatchTheFollowing.xlsx'
                            : gameType.value === 'LISTEN & FILL'
                            ? '/ListenFill.xlsx'
                            : gameType.value === 'SEARCH THE WORD'
                            ? '/searchWord.xlsx'
                            : gameType.value === 'PUZZLE'
                            ? '/Puzzle.xlsx'
                            : ''
                        }`}
                        download={'Game_Content_Format.xlsx'}
                      >
                        <img src={File} alt="File" height={'60px'} />
                      </Anchor>
                      <Text2>{gameType.value}</Text2>
                    </AlignFiles>
                  </div>
                )}
              </Flex>
              <ProgressBarContainer>
                {Number(socketResponse.progress) === 100 ? (
                  socketResponse.notUploadedCount === 0 ? (
                    <div>
                      <SuccessProgressBar></SuccessProgressBar>
                      <SuccessProgressBarPara>
                        Game QRCodes from file are shown below
                      </SuccessProgressBarPara>
                    </div>
                  ) : (
                    <ProgressBarContainer>
                      <WrongMessage>
                        {`Upload failed, please try again!
                      ${socketResponse.uploadedCount} of ${
                          socketResponse.notUploadedCount +
                          socketResponse.uploadedCount
                        } Game QRCodes were uploaded`}
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
                      <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ProgressBarContainer>
                  )}
              </ProgressBarContainer>
              <ButtonV2
                onClick={() => {
                  handleSubmitForm()
                }}
                style={{
                  display: 'flex',
                  width: '100px',
                  justifyContent: 'center',
                  marginTop: '50px'
                }}
              >
                {submitAPILoading ? 'Please Wait...' : 'Upload'}
              </ButtonV2>
            </div>
          </GridItem>
        </Grid>
      </FormContainerV2>
    </PageContainer>
  )
}

export default UploadContent
