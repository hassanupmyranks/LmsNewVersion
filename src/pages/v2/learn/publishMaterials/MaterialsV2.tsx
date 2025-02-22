import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { FormContainerV2 } from '../../../../components/V2/Form/styledComponents'
import {
  ButtonV2,
  Flex,
  Grid,
  GridItem,
  // Grid,
  // GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import {
  getAllBranchAPI,
  getAllInstituteAPI,
  getBatchAPI,
  getChapterData,
  getLearnCourseData,
  getMaterialData,
  getSubjectData,
  getTopicData,
  publishMaterialAPI,
  teacherPublishedTopicAPI
} from '../../../../helpers/V2/apis'
import PublishTable from './PublishTable'
import { NewBatchDetails, PublishDetailsPayload } from '../../../../utils/types'
import LabPublishTable from './LabPublishTable'
import { Form, Spinner } from 'react-bootstrap'
import { Blue, BlueButton } from '../../../../const/V2/stylingVariables'
import {
  CourseDetailProps,
  LearnModuleTextMaterial,
  VideoMaterialProps
} from '../types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { FlexLocal } from './StyledComponenet'
import { TeachingVideos } from '../components/TeachingVideos'
// import TeachingHighLights from '../components/TeachingHighLights'
import { TeachingSolutions } from '../components/TeachingSolutions'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const MaterialsV2 = () => {
  const TextParaLabel = styled.p`
    font-family: 'DM Sans', sans-serif;
    color: ${Blue};
    font-size: 14px;
    font-weight: 500;
  `
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )

  const [dataList, setDataList] = useState<any[]>([])
  const [headerName, setHeaderName] = useState('')
  const [gradeOptions, setGradeOptions] = useState<[]>([])

  const [subjectOptions, setSubjectOptions] = useState<[]>([])
  const [batchOptions, setBatchOptions] = useState<any>([])
  const [chaptersOptions, setChaptersOptions] = useState<[]>([])
  const [topicsOptions, setTopicsOptions] = useState<[]>([])
  const [subjectsList, setSubjectsList] = useState<PublishDetailsPayload[]>([])

  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const [selectedGrade, setSelectedGrade] = useState(defaultValues)
  const [selectedBatch1, setSelectedBatch1] = useState(defaultValues)
  const [selectedBatch, setSelectedBatch] = useState<any>([])
  const [selectedSubject, setSelectedSubject] = useState({
    ...defaultValues,
    isLab: false
  })

  const [selectedChapter, setSelectedChapter] = useState(defaultValues)
  const [selectedTopic, setSelectedTopic] = useState(defaultValues)
  const [checkedPublished, setCheckedPublished] = useState(false)

  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)
  const [batchApiLoading, setBatchApiLoading] = useState(false)
  const [subjectApiLoading, setSubjectApiLoading] = useState(false)
  const [isChapterApiLoading, setIsChapterApiLoading] = useState<boolean>(false)
  const [isTopicApiLoading, setIsTopicApiLoading] = useState(false)
  const [topicLoading, setTopicLoading] = useState(false)
  const [topicPage, setTopicPage] = useState(1)
  const [totalTopics, setTotalTopics] = useState(0)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [insLoading, setInsLoading] = useState(false)
  const [selectedInstitute, setSelectedInstitute] = useState(defaultValues)
  const [branchData, setBranchData] = useState<any[]>([])
  const [branchLoading, setBranchLoading] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(defaultValues)
  const [publishList, setPublishlist] = useState<any[]>([])
  const [reloadTrigger, setReloadTrigger] = useState(false)
  const [videoMaterial, setVideoMaterial] = useState<VideoMaterialProps[]>([])
  const [audioMaterial, setAudioMaterial] = useState<VideoMaterialProps[]>([])
  const [pdfMaterial, setPdfMaterial] = useState<LearnModuleTextMaterial[]>([])
  // const [pptxMaterial, setPptxMaterial] = useState<LearnModuleTextMaterial[]>(
  //   []
  // )
  const [isMaterialLoading, setIsMaterialLoading] = useState<boolean>(false)
  const [isSmall, setIsSmall] = useState(false)
  const [emptyHeaderName, setEmptyHeaderName] = useState('')
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
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

  useEffect(() => {
    if (user.role === 'superAdmin') {
      setInsLoading(true)
      getAllInstituteAPI({
        page: 1,
        limit: 150
      })
        .then((res: any) => {
          const institute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setInstituteData(institute)
          setDataList([])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))
    }
  }, [user.role])

  useEffect(() => {
    if (selectedInstitute?.id || user.role === 'instituteAdmin') {
      const payload = {
        page: 1,
        limit: 50,
        instituteId: selectedInstitute?.id || user.instituteId
      }
      setBranchLoading(true)
      getAllBranchAPI(payload)
        .then((res: any) => {
          const branch = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setBranchData(branch)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Branches under this Institute',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute?.id, user])

  useEffect(() => {
    if (selectedBranch?.id || user.branchId) {
      SetIsCourseLoading(true)
      getLearnCourseData({
        page: 1,
        limit: 120,
        branchId: selectedBranch?.id ? selectedBranch?.id : user.branchId
      })
        .then((res: CourseDetailProps[]) => {
          const options: any = res?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setGradeOptions(options)
          if (res.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
          SetIsCourseLoading(false)
        })
        .catch(() => SetIsCourseLoading(false))
    }
  }, [selectedBranch?.id, user.branchId])

  const getSubjectDetails = (valueId: any) => {
    setSubjectsList([])
    setSubjectOptions([])
    if (valueId) {
      if (valueId.length > 0) {
        const batchesIDS = [
          ...valueId.map((element: any) => String(element.id))
        ]
        setIsTopicApiLoading(true)
        getSubjectData({
          page: 1,
          limit: 100,
          courseId: selectedGrade.id,
          batchIds: batchesIDS
        })
          .then((res) => {
            const newSubjects = res?.map((el: any, ind: number) => {
              return {
                id: ind + 1,
                subject_id: el._id,
                subject_name: el.name,
                status: el.published
              }
            })
            setSubjectsList(newSubjects)
            if (res.length <= 0) {
              CustomToastMessage(
                'There are no Subjects under this Grade',
                'error'
              )
            }
            setIsTopicApiLoading(false)
          })
          .catch(() => setIsTopicApiLoading(false))
          .finally(() => setSubjectApiLoading(false))
      } else {
        CustomToastMessage('Please select the Batch / Section', 'error')
      }
    }
  }

  useEffect(() => {
    if (selectedSubject?.id && !selectedChapter?.id) {
      setChaptersOptions([])
      setIsChapterApiLoading(true)
      getChapterData({
        subjectId: selectedSubject?.id,
        page: 1,
        limit: 100,
        batchIds: [selectedBatch1?.id]
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          if (res.data.length <= 0) {
            setEmptyHeaderName('subject')
            CustomToastMessage(
              'There are no Chapters under this Subject',
              'error'
            )
          }
          setChaptersOptions(options)
          if (checkedPublished && headerName === 'Chapter Name') {
            const chapterList = res?.data
              ?.filter((table: any) => table.published === true)
              ?.map((data: any, index: any) => ({
                id: data._id,
                name: data.name,
                status: data.published,
                index: index + 1
              }))
            setDataList(chapterList)
          } else if (headerName === 'Chapter Name') {
            const chapterList = res?.data?.map((data: any, index: any) => ({
              id: data._id,
              name: data.name,
              status: data.published,
              index: index + 1
            }))
            setDataList(chapterList)
          }
          setTotalTopics(res.total)
        })
        .catch(() => console.log(false))
        .finally(() => setIsChapterApiLoading(false))
    }
  }, [
    selectedSubject?.id,
    selectedBatch1?.id,
    checkedPublished,
    headerName,
    reloadTrigger,
    selectedChapter?.id
  ])

  useEffect(() => {
    if (selectedSubject.id && selectedChapter?.id && !selectedTopic?.id) {
      setIsTopicApiLoading(true)
      setTopicLoading(true)
      getTopicData({
        chapterId: selectedChapter?.id,
        page: topicPage,
        limit: 20,
        batchIds: [selectedBatch1?.id]
      })
        .then((res) => {
          setTotalTopics(res.total)
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })

          if (res.data.length <= 0) {
            setEmptyHeaderName('chapter')
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
          setTopicsOptions(options)

          if (checkedPublished && headerName === 'Topic Name') {
            const topicList = res?.data
              ?.filter((table: any) => table.published === true)
              ?.map((data: any, index: any) => ({
                id: data._id,
                name: data.name,
                status: data.published,
                index: index + 1
              }))
            setDataList(topicList)
          } else if (headerName === 'Topic Name') {
            const topicList = res?.data?.map((data: any, index: any) => ({
              id: data._id,
              name: data.name,
              status: data.published,
              index: index + 1
            }))
            setDataList(topicList)
          }
          setTotalTopics(res.total)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => {
          setIsTopicApiLoading(false), setTopicLoading(false)
        })
    }
  }, [
    topicPage,
    selectedSubject.id,
    selectedChapter?.id,
    selectedBatch,
    selectedBatch1?.id,
    checkedPublished,
    headerName,
    reloadTrigger,
    selectedTopic?.id
  ])

  const handlePublished = () => {
    if (headerName === 'Subject Name') {
      const payload: any = {
        batchId: String(selectedBatch1.id),
        subjectIds: publishList
      }
      publishMaterialAPI(payload)
        .then(() => {
          CustomToastMessage('Successfully published', 'success')
          setPublishlist([])
          setReloadTrigger((prev) => !prev)
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
    }

    if (headerName === 'Chapter Name') {
      const payload: any = {
        batchId: String(selectedBatch1.id),
        chapterIds: publishList
      }
      publishMaterialAPI(payload)
        .then(() => {
          CustomToastMessage('Successfully published', 'success')
          setPublishlist([])
          setReloadTrigger((prev) => !prev)
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
    }
    if (headerName === 'Topic Name') {
      const payload: any = {
        batchId: String(selectedBatch1.id),
        topicIds: publishList
      }
      publishMaterialAPI(payload)
        .then(() => {
          CustomToastMessage('Successfully published', 'success')
          setPublishlist([])
          setReloadTrigger((prev) => !prev)
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
    }
  }

  const handleLabPublished = (data: any) => {
    teacherPublishedTopicAPI({
      courseId: String(selectedGrade.id),
      subjectId: data.subject_id,
      batchIds: [...selectedBatch.map((element: any) => String(element.id))]
    })
      .then(() => {
        getSubjectDetails(selectedBatch)
        CustomToastMessage('Successfully published', 'success')
      })
      .catch((err) => CustomToastMessage(err.response.data.message, 'error'))
  }
  useEffect(() => {
    if (selectedGrade.id) {
      const payload = {
        page: 1,
        limit: 100,
        branchIds: selectedBranch.id
          ? [String(selectedBranch.id)]
          : [String(user.branchId)],
        courseId: selectedGrade.id,
        course: true
      }

      setBatchApiLoading(true)
      getBatchAPI(payload)
        .then((res) => {
          const newBatch = res?.data?.map((batch: NewBatchDetails) => {
            return {
              value: '',
              label: batch.name,
              id: batch?._id
            }
          })
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Batches under this Grade', 'error')
          }
          setBatchOptions(newBatch)
          setBatchApiLoading(false)
        })
        .catch((err) => console.log(err))
        .finally(() => setBatchApiLoading(false))
    }
  }, [selectedBranch.id, selectedGrade.id, user.branchId])

  useEffect(() => {
    if (selectedBatch1.id && !selectedSubject?.id) {
      setSubjectApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: selectedGrade.id,
        batchIds: [selectedBatch1?.id]
      })
        .then((res) => {
          const options = res
            ?.filter((data: any) => data.isLab === false)
            ?.map((el: any) => {
              return {
                id: el._id,
                label: el.name,
                value: ''
              }
            })
          setSubjectOptions(options)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Batch',
              'error'
            )
          }
          if (checkedPublished && headerName === 'Subject Name') {
            const subjectList = res
              ?.filter((table: any) => table.published === true)
              ?.map((data: any, index: any) => ({
                id: data._id,
                name: data.name,
                status: data.published,
                index: index + 1
              }))
            setDataList(subjectList)
          } else if (headerName === 'Subject Name') {
            const subjectList = res?.map((data: any, index: any) => ({
              id: data._id,
              name: data.name,
              status: data.published,
              index: index + 1
            }))
            setDataList(subjectList)
          }
          setTotalTopics(res.total)
        })
        .catch(() => setIsTopicApiLoading(false))
        .finally(() => setSubjectApiLoading(false))
    }
  }, [
    selectedGrade.id,
    selectedBatch1.id,
    checkedPublished,
    headerName,
    reloadTrigger,
    selectedSubject?.id
  ])

  const getTopicsWithScroll = (total: number, length: number) => {
    if (total > length) {
      setTopicPage(topicPage + 1)
    }
  }
  const [checked, setChecked] = useState('')
  const handlePublishList = (data: any) => {
    setPublishlist((prevList) => {
      if (prevList.includes(data)) {
        return prevList.filter((item) => item !== data)
      } else {
        return [...prevList, data]
      }
    })
  }

  const handleHeader = () => {
    if (checked) {
      setChecked('')
      setPublishlist([])
    } else {
      const ids = dataList
        .filter((data) => data?.status === false)
        .map((item) => item.id)
      setPublishlist(ids)
      setChecked('SubjectData')
    }
  }

  useEffect(() => {
    if (
      selectedTopic.id ||
      emptyHeaderName === 'subject' ||
      emptyHeaderName === 'chapter'
    ) {
      setEmptyHeaderName('Topic')
      setIsMaterialLoading(true)
      getMaterialData({
        ...(user.role === 'teacher' && { courseId: selectedGrade.id }),
        ...(emptyHeaderName === 'subject'
          ? { subjectId: selectedSubject?.id }
          : emptyHeaderName === 'chapter'
          ? { chapterId: selectedChapter?.id }
          : { topicId: selectedTopic?.id }),
        limit: 100,
        type: 'study'
      })
        .then((res) => {
          const data = res?.data?.filter(
            (video: any) => video.fileType === 'video'
          )
          setVideoMaterial(data)
          const audioData = res?.data?.filter(
            (video: any) => video.fileType === 'audio'
          )
          setAudioMaterial(audioData)
          // const dataPpt = res?.data?.filter(
          //   (video: any) => video.fileType === 'pptx'
          // )
          const dataPdf = res?.data?.filter(
            (video: any) => video.fileType === 'pdf'
          )

          // setPptxMaterial(dataPpt)
          setPdfMaterial(dataPdf)
        })
        .catch((error) => {
          setIsMaterialLoading(false),
            CustomToastMessage(error.response.data.message, 'error')
        })
        .finally(() => setIsMaterialLoading(false))
    }
  }, [
    selectedTopic.id,
    user.role,
    selectedGrade.id,
    selectedSubject?.id,
    emptyHeaderName,
    selectedChapter?.id
  ])

  useEffect(() => {
    if (!selectedTopic?.id && selectedChapter?.id) {
      setHeaderName('Topic Name')
    } else if (!selectedChapter?.id && selectedSubject?.id) {
      setHeaderName('Chapter Name')
    } else if (!selectedSubject?.id) {
      setHeaderName('Subject Name')
    }
  }, [selectedTopic?.id, selectedChapter?.id, selectedSubject?.id])

  return (
    <PageContainer>
      <FormContainerV2>
        <FlexLocal>
          {user.role === 'superAdmin' && (
            <SearchableDropdown
              label="Select Institute"
              selectedValue={selectedInstitute}
              onSelect={(data: any) => {
                setSelectedInstitute(data),
                  setSelectedBatch1(defaultValues),
                  setSelectedBranch(defaultValues),
                  setSelectedSubject({ ...defaultValues, isLab: false }),
                  setSelectedChapter(defaultValues),
                  setPublishlist([]),
                  setDataList([]),
                  setHeaderName(''),
                  setSelectedGrade(defaultValues),
                  setSelectedTopic(defaultValues),
                  setEmptyHeaderName('')
                setBranchData([])
                setGradeOptions([])
                setBatchOptions([])
                setSubjectOptions([])
                setChaptersOptions([])
                setTopicsOptions([])
              }}
              isClear={selectedInstitute.id ? true : false}
              placeHolder="Institute Name"
              isLoader={insLoading}
              required
              options={instituteData}
              fullWidth
            />
          )}

          {(user.role === 'superAdmin' || user.role === 'instituteAdmin') && (
            <SearchableDropdown
              label="Select Branch"
              selectedValue={selectedBranch}
              onSelect={(data: any) => {
                setSelectedBranch(data)
                setSelectedBatch1(defaultValues),
                  setSelectedSubject({ ...defaultValues, isLab: false }),
                  setSelectedChapter(defaultValues),
                  setPublishlist([]),
                  setDataList([]),
                  setHeaderName(''),
                  setSelectedGrade(defaultValues),
                  setSelectedTopic(defaultValues),
                  setEmptyHeaderName('')
                setGradeOptions([])
                setBatchOptions([])
                setChaptersOptions([])
                setSubjectOptions([])
                setTopicsOptions([])
              }}
              isClear={selectedBranch.id ? true : false}
              placeHolder="branch Name"
              isLoader={branchLoading}
              required
              options={branchData}
              fullWidth
            />
          )}

          <SearchableDropdown
            label="Select Grade"
            selectedValue={selectedGrade}
            onSelect={(data: any) => {
              setSelectedGrade(data),
                setSelectedBatch1(defaultValues),
                setSelectedSubject({ ...defaultValues, isLab: false }),
                setSelectedChapter(defaultValues),
                setPublishlist([]),
                setDataList([]),
                setHeaderName(''),
                setSelectedTopic(defaultValues),
                setEmptyHeaderName('')
              setBatchOptions([])
              setSubjectOptions([])
              setTopicsOptions([])
              setChaptersOptions([])
            }}
            isClear={selectedGrade.id ? true : false}
            placeHolder="Grade Name"
            isLoader={isCourseLoading}
            required
            options={gradeOptions}
            fullWidth
          />

          <SearchableDropdown
            label="Select Batch / Section"
            selectedValue={selectedBatch1}
            onSelect={(data: any) => {
              setSelectedBatch1(data),
                setHeaderName('Subject Name'),
                setPublishlist([]),
                setDataList([])
              setSubjectOptions([])
              setChaptersOptions([])
              setTopicsOptions([])
              setSelectedSubject({ ...defaultValues, isLab: false }),
                setSelectedChapter(defaultValues)
              setSelectedTopic(defaultValues), setEmptyHeaderName('')
            }}
            isClear={selectedBatch1.id ? true : false}
            placeHolder="Batch / Section Name"
            isLoader={batchApiLoading}
            required
            options={batchOptions}
            fullWidth
          />
          {subjectOptions && (
            <>
              <SearchableDropdown
                label="Select Subject"
                selectedValue={selectedSubject}
                isClear={selectedSubject.id ? true : false}
                onSelect={(e) => {
                  setSelectedSubject({
                    id: String(e.id),
                    value: String(e.value),
                    label: e.label,
                    isLab: e.isLab ?? false
                  })
                  setHeaderName('Chapter Name')
                  setTopicPage(1)
                  setSelectedBatch([])
                  setPublishlist([]), setDataList([])
                  setSelectedChapter(defaultValues)
                  setSelectedTopic(defaultValues), setEmptyHeaderName('')
                  setChaptersOptions([])
                  setTopicsOptions([])
                }}
                placeHolder="Subject Name"
                isLoader={subjectApiLoading}
                required
                options={subjectOptions}
                fullWidth
              />
              <SearchableDropdown
                label="Select Chapter"
                selectedValue={selectedChapter}
                isClear={selectedChapter.id ? true : false}
                onSelect={(chapter) => {
                  setHeaderName('Topic Name')
                  setTopicPage(1)
                  setSelectedChapter({
                    id: String(chapter.id),
                    value: String(chapter.value),
                    label: chapter.label
                  }),
                    setPublishlist([]),
                    setDataList([]),
                    setSelectedTopic(defaultValues),
                    setEmptyHeaderName('')
                  setTopicsOptions([])
                }}
                placeHolder="Chapter Name"
                isLoader={isChapterApiLoading}
                required
                options={chaptersOptions}
                fullWidth
              />
              <SearchableDropdown
                disabled={topicsOptions.length <= 0 ? true : false}
                label="Select Topic"
                selectedValue={selectedTopic}
                isClear={selectedTopic.id ? true : false}
                onSelect={(chapter) => {
                  setTopicPage(1)
                  setSelectedTopic({
                    id: String(chapter.id),
                    value: String(chapter.value),
                    label: chapter.label
                  }),
                    setPublishlist([]),
                    setDataList([]),
                    setEmptyHeaderName('')
                }}
                placeHolder="Topic Name"
                isLoader={topicLoading}
                required
                options={topicsOptions}
                fullWidth
              />
            </>
          )}
        </FlexLocal>
        {(!selectedTopic?.id || emptyHeaderName === '') && (
          <Flex style={{ marginTop: '10px' }} justifyContent="space-between">
            <div></div>
            <Flex gap="6px" alignItems="center">
              <Form.Check
                checked={checkedPublished}
                type="switch"
                id="reverse-radio-1"
                onClick={() => setCheckedPublished(!checkedPublished)}
              />
              <TextParaLabel>Show Only Published</TextParaLabel>
            </Flex>
            <ButtonV2
              style={{ padding: '6px 20px' }}
              disabled={publishList.length <= 0 ? true : false}
              onClick={() => handlePublished()}
            >
              Publish
            </ButtonV2>
          </Flex>
        )}
        {/* <Grid columns={12} gap="20px">
          <GridItem columnSpan={6}>
            {selectedGrade.label &&
              selectedSubject?.label &&
              selectedBatch?.label &&
              selectedChapter.label && (
                <TextPara>
                  {selectedBatch?.label} | {selectedGrade?.label} |{' '}
                  {selectedSubject?.label} | {selectedChapter?.label}{' '}
                </TextPara>
              )}

            {selectedGrade.label &&
              selectedBatch?.label &&
              selectedSubject.isLab === true && (
                <TextPara>
                  {selectedBatch?.label} | {selectedGrade?.label}
                </TextPara>
              )}
          </GridItem>
        </Grid> */}
        {isTopicApiLoading && (
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

        {dataList && dataList.length > 0 && !selectedTopic?.id && (
          <PublishTable
            {...{
              onCheck: () => handleHeader(),
              isChecked: checked ? true : false,
              publishList: publishList,
              headerName,
              dataList,
              total: totalTopics,
              length: dataList.length,
              handlePublished,
              handleScrollInfinite: (total: number, length: number) =>
                getTopicsWithScroll(total, length),
              onChildCheck: (data) => handlePublishList(data)
            }}
          />
        )}
        {(selectedTopic?.id || emptyHeaderName != '') && (
          <Grid
            columns={12}
            gap="12px"
            style={{ marginTop: '18px', background: '#F4F7FE' }}
          >
            <GridItem
              columnSpan={isSmall ? 12 : 3}
              full
              style={{ margin: '10px' }}
            >
              <TeachingVideos
                videos={videoMaterial}
                isLoading={isMaterialLoading}
              />
            </GridItem>
            <GridItem
              columnSpan={isSmall ? 12 : 3}
              full
              style={{ margin: '10px' }}
            >
              <TeachingVideos
                audio
                videos={audioMaterial}
                isLoading={isMaterialLoading}
              />
            </GridItem>
            {/* <GridItem columnSpan={isSmall ? 12 : 3} style={{ margin: '10px' }}>
              <TeachingHighLights
                highLights={pptxMaterial}
                isLoading={isMaterialLoading}
                isSmall={isSmall}
              />
            </GridItem> */}
            <GridItem columnSpan={isSmall ? 12 : 3} style={{ margin: '10px' }}>
              <TeachingSolutions
                solutions={pdfMaterial}
                isLoading={isMaterialLoading}
                isSmall={isSmall}
                isTeacher
              />
            </GridItem>
          </Grid>
        )}
        {subjectsList &&
          subjectsList.length > 0 &&
          selectedSubject.isLab === true && (
            <LabPublishTable
              {...{
                subjectsList,
                handlePublished: handleLabPublished
              }}
            />
          )}
      </FormContainerV2>
    </PageContainer>
  )
}

export default MaterialsV2
