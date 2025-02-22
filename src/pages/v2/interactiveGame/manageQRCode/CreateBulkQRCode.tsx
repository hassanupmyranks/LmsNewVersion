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
import { FormContainerV2 } from '../uploadContent/StyledCompontents'
import {
  ChaptersContainer,
  CloseButton,
  ContainerBody,
  ContainerHeading,
  Percentage,
  ProgressBar,
  ProgressBarContainer,
  SecondHalfProgressBar,
  SuccessProgressBar,
  SuccessProgressBarPara,
  UploadQuestionPartTwo,
  WrongMessage
} from '../../assessment/addQuestions/components/styledComponents'
import { Spinner } from 'react-bootstrap'
import {
  bulkUploadQrCodeAPI,
  getChapterData,
  getLearnCourseData,
  getSubjectsDataCourseId,
  getTopicData
} from '../../../../helpers/V2/apis'
import { GetLearnModuleChapterResponse } from '../manageContent/types'
import SingleSelectItemCheckBox from '../../../../components/V2/Form/SingleSelectItemCheckBox'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import FileDragDropComponent from '../uploadContent/FileDragDropComponent'
import {
  AlignCenter,
  AlignFiles,
  Anchor,
  Format,
  WordTitle
} from '../../assessment/studentBulkUpload/styledComponents'
import File from '../../../../assets/File.png'
import File3 from '../../../../assets/download.png'
import styled from 'styled-components'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const CreateBulkQRCode = () => {
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
  const [isTopicLoading, setIsTopicLoading] = useState<boolean>(false)
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>([])
  const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false)
  const [isCourseLoading, setIsCourseLoading] = useState<boolean>(false)
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false)
  const [socketResponse, setSocketResponse] = useState<SocketResponse>({
    finished: false,
    filePath: '',
    notUploadedCount: 0,
    uploadedCount: 0,
    isError: false,
    message: '',
    progress: 0,
    uploadedQRCodes: ''
  })
  const [submitAPILoading, setSubmitAPILoading] = useState<boolean>(false)
  const [processingId, setProcessingId] = useState<any>()

  useEffect(() => {
    setIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res) => {
        setCourses(res)
        setIsCourseLoading(false)
      })
      .catch((error) => {
        setProcessingId('')
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => setIsCourseLoading(false))
  }, [])

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

  const handleChapterSelected = (id: string) => {
    setIsTopicLoading(true)
    setSubTopicData([])
    getTopicData({
      chapterId: id,
      page: 1,
      limit: 120
    })
      .then((res) => {
        setSubTopicData(res?.data)
        setIsTopicLoading(false)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => {
        setIsTopicLoading(false)
      })
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
        'Some thing went wrong please check error file',
        'error'
      )
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }
  useEffect(() => {
    if (processingId) {
      const websocket = new WebSocket(
        `${process.env.REACT_APP_SOCKET_BASEURL_V2}/?processingId=${processingId}&type=qrCodeUpload`
      )

      websocket.onopen = () => {}

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)

        setSocketResponse((prev) => ({
          ...prev,
          ...data,
          uploadedQRCodes: data.uploadedQRCodes || []
        }))

        if (data.progress === 100 && data.filePath) {
          downloadErrorFile(data.filePath)
        }
      }

      return () => {
        websocket.close()
      }
    }
  }, [processingId])

  const handleSubmit = () => {
    setSubmitAPILoading(true)
    const newFormData: any = new FormData()
    selectedChapter._id &&
      !selectedSubTopic._id &&
      newFormData.append('chapterId', selectedChapter._id)
    selectedSubTopic._id && newFormData.append('topicId', selectedSubTopic._id)
    newFormData.append('file', file)
    bulkUploadQrCodeAPI(newFormData)
      .then((res) => {
        setProcessingId(res.data.processingId)
        CustomToastMessage(res.message, 'success')
      })
      .catch((error) => {
        CustomToastMessage(error?.message, 'error')
      })
      .finally(() => setSubmitAPILoading(false))
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
        progress: 0,
        uploadedQRCodes: ''
      }
    })
    setProcessingId('')
    setSelectedSubTopic('')
    setSelectedChapter('')
    setSelectedSubject('')
    setSelectedCourse('')
    setFile(undefined)
    setSubjects([])
    setChapterData([])
    setSubTopicData([])
  }

  const generateZipFile = async () => {
    const zip = new JSZip()

    try {
      for (const qrCode of socketResponse?.uploadedQRCodes || []) {
        try {
          const response = await fetch(qrCode.qrCodePath)
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ${qrCode.qrCodeId}: ${response.statusText}`
            )
          }
          const blob = await response.blob()
          zip.file(`${qrCode.qrCodeId}.png`, blob)
        } catch (error) {
          console.error(
            `Error fetching or processing QR code ${qrCode.qrCodeId}:`,
            error
          )
          continue
        }
      }

      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, 'QRcodes.zip')
    } catch (error) {
      console.error('Error generating the ZIP file:', error)
    }
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
                      flexGrow: 1,
                      width: '100%'
                    }}
                  >
                    <ContainerHeading style={{ flexDirection: 'column' }}>
                      <h3>Choose Grade</h3>
                      <p>Choose Grade and Subject</p>
                    </ContainerHeading>
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
                      flexGrow: 1,
                      width: '100%'
                    }}
                  >
                    <ContainerHeading style={{ flexDirection: 'column' }}>
                      <h3>Choose Chapters ({chapterData.length})</h3>
                      <p>Choose Chapters, Topics and Sub-Topics</p>
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
                                setSubTopicData([])
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
              <div>
                <AlignCenter style={{ justifyContent: 'center' }}>
                  <WordTitle>Upload Attachment</WordTitle>
                </AlignCenter>
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

                <div>
                  <Format style={{ marginTop: '10px', textAlign: 'center' }}>
                    Note : Use this file Format
                  </Format>
                  <AlignFiles style={{ marginTop: '10px' }}>
                    <Anchor
                      href={`${process.env.PUBLIC_URL}/BulkQRUpload.xlsx`}
                      download="Bulk_QRUpload_Format.xlsx"
                    >
                      <img src={File} alt="File" height={'60px'} />
                    </Anchor>
                  </AlignFiles>
                </div>
              </div>
              <ProgressBarContainer>
                {Number(socketResponse.progress) === 100 ? (
                  socketResponse.notUploadedCount === 0 ? (
                    <div>
                      <SuccessProgressBar></SuccessProgressBar>
                      <SuccessProgressBarPara>
                        QRCodes from file are shown below
                      </SuccessProgressBarPara>
                    </div>
                  ) : (
                    <ProgressBarContainer>
                      <WrongMessage>
                        {`Upload failed for ${
                          socketResponse.notUploadedCount
                        } QRCodes out of ${
                          socketResponse.notUploadedCount +
                          socketResponse.uploadedCount
                        }, please try again for them!
                     `}
                      </WrongMessage>

                      <CloseButton onClick={handleClose}>Close</CloseButton>
                      <CloseButton>
                        <a
                          style={{ all: 'unset' }}
                          href={socketResponse.filePath}
                        >
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
                      <CloseButton onClick={handleClose}>Close</CloseButton>
                    </ProgressBarContainer>
                  )}
              </ProgressBarContainer>
              <ButtonV2
                onClick={() => {
                  setSubmitAPILoading(true)
                  handleSubmit()
                }}
                disabled={submitAPILoading}
                style={{
                  display: 'flex',
                  width: '100px',
                  justifyContent: 'center',
                  margin: '15px 0px'
                }}
              >
                {submitAPILoading ? 'Please Wait...' : 'Upload'}
              </ButtonV2>
              {socketResponse?.uploadedQRCodes?.length > 0 ? (
                <div
                  style={{ width: '100%', height: 'auto', overflow: 'auto' }}
                >
                  <table
                    style={{ width: '100%', height: 'auto', overflow: 'auto' }}
                  >
                    <thead style={{ height: '40px', position: 'sticky' }}>
                      <TR1>
                        <TH>SI.No</TH>
                        <TH>QR CodeId</TH>
                        <TH>QR Code</TH>
                      </TR1>
                    </thead>
                    <TBody>
                      {socketResponse?.uploadedQRCodes?.map(
                        (item: any, index: any) => (
                          <TR2 key={index}>
                            <TD>{index + 1}</TD>
                            <TD>{item?.qrCodeId}</TD>
                            <TD>
                              <img
                                src={item?.qrCodePath}
                                alt="File"
                                height={'34px'}
                              />
                            </TD>
                          </TR2>
                        )
                      )}
                    </TBody>
                  </table>
                </div>
              ) : (
                ''
              )}
              {socketResponse?.uploadedQRCodes.length > 0 ? (
                <Anchor onClick={generateZipFile}>
                  <div
                    style={{
                      backgroundColor: '#197BBD',
                      width: '38px',
                      height: '35px',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '20px',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={File3} alt="File" height="30px" />
                  </div>
                </Anchor>
              ) : (
                ''
              )}
            </div>
          </GridItem>
        </Grid>
      </FormContainerV2>
    </PageContainer>
  )
}

export default CreateBulkQRCode

export const TH = styled.th`
  font-size: 16px;
`
export const TD = styled.td`
  font-size: 16px;
`
export const TR1 = styled.tr`
  background-color: #e3f0f8;
  height: 40px;
  display: table;
  width: 100%;
  table-layout: fixed;
  font-size: 30px;
`
export const TBody = styled.tbody`
  display: block;
  max-height: 200px;
  overflow: auto;
  width: 100%;
`
export const TR2 = styled.tr`
  background-color: #f8f9fa;
  height: 40px;
  display: table;
  width: 100%;
  table-layout: fixed;
  font-size: 30px;
`
