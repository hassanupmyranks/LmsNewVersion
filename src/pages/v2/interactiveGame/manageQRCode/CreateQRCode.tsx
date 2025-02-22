import React, { useEffect, useState } from 'react'
import { SubTopicsDetails, SubjectTopicsDetails } from '../../../../utils/types'

import {
  ButtonV2,
  Flex,
  Grid,
  GridItem,
  PageContainer,
  WrapperCard
} from '../../../../components/V2/styledComponents'
import { FormContainerV2 } from '../uploadContent/StyledCompontents'
import InputV2 from '../../../../components/V2/Form/Input'
import {
  ChaptersContainer,
  ContainerBody,
  ContainerHeading
} from '../../assessment/addQuestions/components/styledComponents'
import { Spinner } from 'react-bootstrap'
import {
  generateQrCodeAPI,
  getChapterData,
  getLearnCourseData,
  getSingleQRCodeAPI,
  getSubjectsDataCourseId,
  getTopicData,
  updateQrCodeAPI
} from '../../../../helpers/V2/apis'
import { GetLearnModuleChapterResponse } from '../manageContent/types'
import SingleSelectItemCheckBox from '../../../../components/V2/Form/SingleSelectItemCheckBox'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import File from '../../../../assets/download.png'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useLocation } from 'react-router-dom'
import { RemoveIcon } from '../../../../components/V2/PopUp/styledComponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'

const CreateQRCode = () => {
  const location: any = useLocation()

  const [inputValue, setInputValue] = useState('')
  const [courses, setCourses] = useState<SubjectTopicsDetails[]>([])
  const [subjects, setSubjects] = useState<SubjectTopicsDetails[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>({})
  const [selectedSubject, setSelectedSubject] = useState<any>({})
  const [selectedChapter, setSelectedChapter] = useState<any>({})
  const [chapterData, setChapterData] = useState<
    GetLearnModuleChapterResponse[]
  >([])
  const [subTopicData, setSubTopicData] = useState<SubTopicsDetails[]>([])
  const [isTopicLoading, setIsTopicLoading] = useState<boolean>(false)
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>([])
  const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false)
  const [isCourseLoading, setIsCourseLoading] = useState<boolean>(false)
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false)
  const [submitAPILoading, setSubmitAPILoading] = useState<boolean>(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [selectedType, setSelectedType] =
    useState<SearchableDropdownOptionData>()
  const [qrCheck, setQrCheck] = useState('')
  useEffect(() => {
    setIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res) => {
        setCourses(res)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
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
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubjectLoading(false))
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
        setChapterData(res.data)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsChapterLoading(false))
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
      limit: 100
    })
      .then((res) => {
        setSubTopicData(res?.data)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => {
        setIsTopicLoading(false)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleSubmit = () => {
    setSubmitAPILoading(true)
    if (!isEdit) {
      generateQrCodeAPI({
        qrCodeId: inputValue,
        ...(selectedChapter._id &&
          !selectedSubTopic._id && { chapterId: selectedChapter._id }),
        ...(selectedSubTopic._id && { topicId: selectedSubTopic._id }),
        filePath: videoUrl,
        type: selectedType?.id
      })
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          setQrCodeUrl(res.data.qrCodePath)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubmitAPILoading(false))
    } else {
      const queryId: any = location?.pathname?.split('/')?.filter(Boolean)
      let newId = queryId[3]
      updateQrCodeAPI(newId, {
        ...(selectedChapter._id &&
          !selectedSubTopic._id && { chapterId: selectedChapter._id }),
        ...(selectedSubTopic._id && { topicId: selectedSubTopic._id }),
        filePath: videoUrl,
        type: selectedType?.id,
        ...(qrCheck !== inputValue && { qrCodeId: inputValue })
      })
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          setQrCodeUrl(res.data.qrCodePath)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubmitAPILoading(false))
    }
  }

  const handleDownload = (url: string, id: string) => {
    // Add cache-busting query string to the URL
    const cacheBusterUrl = `${url}?cb=${new Date().getTime()}`

    fetch(cacheBusterUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Prevent caching
        Pragma: 'no-cache' // For older HTTP/1.0 clients
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.blob()
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `${id}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(downloadUrl) // Release object URL after use
      })
      .catch((error) => {
        console.error('There was an error with the download:', error)
      })
  }

  const ClearData = () => {
    setInputValue('')
    setSelectedCourse({})
    setSelectedSubject({})
    setSelectedChapter({})
    setSelectedSubTopic({})
    setQrCodeUrl('')
    setVideoUrl('')
    setSubjects([])
    setChapterData([])
    setSubTopicData([])
    setSelectedType({ id: '', label: '', value: '' })
  }

  useEffect(() => {
    const queryId: any = location?.pathname?.split('/')?.filter(Boolean)
    let newId = queryId[3]
    console.log(newId, 'newId')
    if (newId) {
      setIsEdit(true)
      getSingleQRCodeAPI(newId)
        .then((res) => {
          console.log(res, 'res res res res')
          // history.push(ROUTES_V2.QRCODE_LIST)
          handleCourseChecked({
            _id: res.data.courseId,
            name: res.data.courseName
          })
          handleCourseChildChecked({
            _id: res.data.subjectId,
            name: res.data.subjectName
          })
          setSelectedChapter({
            _id: res.data.chapterId,
            name: res.data.chapterName
          })
          handleChapterSelected(res.data.chapterId)
          setSelectedSubTopic({
            _id: res.data.topicId,
            name: res.data.topicName
          })
          setQrCheck(res.data.qrCodeId)
          setVideoUrl(res.data.filePath)
          setInputValue(res.data.qrCodeId)
          if (res.data.type) {
            setSelectedType({
              id: res.data.type,
              label:
                res.data.type.charAt(0).toUpperCase() + res.data.type.slice(1),
              value: ''
            })
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setSubmitAPILoading(false))
    }
  }, [location])
  const QrType = [
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
      id: 'ppt',
      label: 'PPT',
      value: ''
    },
    {
      id: 'game',
      label: 'Game',
      value: ''
    }
  ]

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
                    left: '45%'
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
                      // overflowY: 'auto',
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
                      // overflowY: 'auto',
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
                              console.log(itm)
                              console.log(selectedChapter)
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
                alignItems: 'center',
                minHeight: '300px'
              }}
            >
              <SearchableDropdown
                fullWidth
                label={'Select Type'}
                placeHolder={'Please Select Type'}
                options={QrType}
                isClear={selectedType?.id ? true : false}
                onSelect={(option) => {
                  setSelectedType(option)
                }}
                selectedValue={selectedType}
              />
              <InputV2
                label="QR Code ID"
                value={inputValue}
                name="qrCodeId"
                placeholder="Please Enter QR Code ID"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e)
                }
              />
              <InputV2
                label="File Path"
                value={videoUrl}
                name="videoUrl"
                placeholder="Please Enter File Path"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setVideoUrl(e.target.value)
                }
              />
              <ButtonV2
                onClick={() => handleSubmit()}
                disabled={submitAPILoading}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px'
                }}
              >
                {isEdit && !submitAPILoading
                  ? 'Update QRCode'
                  : submitAPILoading
                  ? 'Please Wait...'
                  : 'Generate QRCode'}
              </ButtonV2>
              {qrCodeUrl && (
                <Flex gap="10px">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    height={'100px'}
                    width={'100px'}
                  />
                  <div
                    style={{
                      height: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end'
                    }}
                  >
                    <div style={{ paddingRight: '6px' }}>
                      <RemoveIcon onClick={() => ClearData()} />
                    </div>
                    <button
                      // href="#"
                      // download="Download.png"
                      onClick={() => handleDownload(qrCodeUrl, inputValue)}
                      type="button"
                      // target="_blanck"sss
                      style={{
                        display: 'flex',
                        border: 'none',
                        background: '#fff',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none' // Remove underline from link
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#197BBD',
                          width: '38px',
                          height: '35px',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                          // marginTop: '20px'
                        }}
                      >
                        <img src={File} alt="File" height="30px" />
                      </div>
                    </button>
                  </div>
                </Flex>
              )}
            </div>
          </GridItem>
        </Grid>
      </FormContainerV2>
    </PageContainer>
  )
}

export default CreateQRCode
