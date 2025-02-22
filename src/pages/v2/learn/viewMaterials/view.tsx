import { useEffect, useState } from 'react'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { FormContainerV2 } from '../../../../components/V2/Form/styledComponents'
import {
  Grid,
  GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { FlexLocal } from '../publishMaterials/StyledComponenet'
import {
  getChapterData,
  getLearnCourseData,
  getMaterialData,
  getSubjectData,
  getTopicData
} from '../../../../helpers/V2/apis'
import {
  CourseDetailProps,
  LearnModuleTextMaterial,
  VideoMaterialProps
} from '../types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import PublishTable from '../publishMaterials/PublishTable'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { TeachingVideos } from '../components/TeachingVideos'
import TeachingHighLights from '../components/TeachingHighLights'
import { TeachingSolutions } from '../components/TeachingSolutions'

const ViewMaterial = () => {
  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const [selectedGrade, setSelectedGrade] = useState(defaultValues)
  const [gradeOptions, setGradeOptions] = useState<[]>([])
  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)
  const [selectedSubject, setSelectedSubject] = useState({
    ...defaultValues,
    isLab: false
  })
  const [subjectOptions, setSubjectOptions] = useState<[]>([])
  const [subjectApiLoading, setSubjectApiLoading] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState(defaultValues)
  const [isChapterApiLoading, setIsChapterApiLoading] = useState<boolean>(false)
  const [chaptersOptions, setChaptersOptions] = useState<[]>([])
  const [selectedTopic, setSelectedTopic] = useState(defaultValues)
  const [topicLoading, setTopicLoading] = useState(false)
  const [topicsOptions, setTopicsOptions] = useState<[]>([])
  const [dataList, setDataList] = useState<any[]>([])
  const [headerName, setHeaderName] = useState('')
  const [videoMaterial, setVideoMaterial] = useState<VideoMaterialProps[]>([])
  const [pdfMaterial, setPdfMaterial] = useState<LearnModuleTextMaterial[]>([])
  const [pptxMaterial, setPptxMaterial] = useState<LearnModuleTextMaterial[]>(
    []
  )
  const [isMaterialLoading, setIsMaterialLoading] = useState<boolean>(false)
  const [isSmall, setIsSmall] = useState(false)

  const [isTopics, setIsTopics] = useState(false)
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
    SetIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 200 })
      .then((res: CourseDetailProps[]) => {
        const options: any = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: ''
          }
        })
        if (res.length <= 0) {
          CustomToastMessage('No grades available', 'error')
        }
        setGradeOptions(options)
        SetIsCourseLoading(false)
      })
      .catch(() => SetIsCourseLoading(false))
  }, [])
  useEffect(() => {
    if (selectedGrade.id && !selectedSubject?.id) {
      setSubjectApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: selectedGrade.id
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
          if (headerName === 'Subject Name') {
            const subjectList = res?.map((data: any, index: any) => ({
              id: data._id,
              name: data.name,
              index: index + 1
            }))
            setDataList(subjectList)
          }

          if (res.length <= 0) {
            CustomToastMessage(
              'There are not subjects under this grade',
              'error'
            )
          }
        })
        .catch(() => {})
        .finally(() => setSubjectApiLoading(false))
    }
  }, [selectedGrade.id, headerName, selectedSubject?.id])

  useEffect(() => {
    if (selectedSubject?.id && !selectedChapter?.id) {
      setChaptersOptions([])
      setIsChapterApiLoading(true)
      getChapterData({
        subjectId: selectedSubject?.id,
        page: 1,
        limit: 200
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setChaptersOptions(options)
          if (headerName === 'Chapter Name') {
            const chapterList = res?.data?.map((data: any, index: any) => ({
              id: data._id,
              name: data.name,
              index: index + 1
            }))
            setDataList(chapterList)
          }
          if (res?.data?.length <= 0) {
            CustomToastMessage(
              'There are not chapters under this subject',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsChapterApiLoading(false))
    }
  }, [selectedSubject?.id, headerName, selectedChapter?.id])

  useEffect(() => {
    if (selectedSubject.id && selectedChapter?.id && !selectedTopic?.id) {
      setTopicLoading(true)
      getTopicData({
        chapterId: selectedChapter?.id,
        page: 1,
        limit: 200
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setTopicsOptions(options)

          if (headerName === 'Topic Name') {
            const topicList = res?.data?.map((data: any, index: any) => ({
              id: data._id,
              name: data.name,
              index: index + 1
            }))
            setDataList(topicList)
          }

          if (res?.data?.length > 0) {
            setIsTopics(true)
            // CustomToastMessage(
            //   'There are not topics under this chapter',
            //   'error'
            // )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => {
          setTopicLoading(false)
        })
    }
  }, [selectedSubject.id, selectedChapter?.id, headerName, selectedTopic?.id])

  useEffect(() => {
    if (selectedTopic.id || (selectedChapter?.id && !isTopics)) {
      setIsMaterialLoading(true)
      getMaterialData({
        topicId: selectedTopic.id,
        chapterId: selectedChapter?.id,
        limit: 100
      })
        .then((res) => {
          const data = res?.data.filter(
            (video: any) => video.fileType === 'video'
          )
          setVideoMaterial(data)
          const dataPpt = res?.data.filter(
            (video: any) => video.fileType === 'pptx'
          )
          const dataPdf = res?.data.filter(
            (video: any) => video.fileType === 'pdf'
          )

          setPptxMaterial(dataPpt)
          setPdfMaterial(dataPdf)
        })
        .catch((error) => {
          setIsMaterialLoading(false),
            CustomToastMessage(error.response.data.message, 'error')
        })
        .finally(() => setIsMaterialLoading(false))
    }
  }, [selectedTopic.id, selectedChapter?.id, isTopics])

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
          <SearchableDropdown
            label="Select Grade"
            selectedValue={selectedGrade}
            onSelect={(data: any) => {
              setSelectedGrade(data)
              setSelectedSubject({ ...defaultValues, isLab: false })
              setSelectedChapter(defaultValues)
              setDataList([])
              setIsTopics(false)
              setHeaderName('Subject Name')
              setSelectedTopic(defaultValues)
            }}
            isClear={selectedGrade.id ? true : false}
            placeHolder="Grade Name"
            isLoader={isCourseLoading}
            required
            options={gradeOptions}
            fullWidth
          />
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
              setDataList([])
              setSelectedChapter(defaultValues)
              setSelectedTopic(defaultValues)
              setIsTopics(false)
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
              setSelectedChapter({
                id: String(chapter.id),
                value: String(chapter.value),
                label: chapter.label
              })
              setDataList([])
              setSelectedTopic(defaultValues)
              setIsTopics(false)
            }}
            placeHolder="Chapter Name"
            isLoader={isChapterApiLoading}
            required
            options={chaptersOptions}
            fullWidth
          />
          {isTopics && (
            <SearchableDropdown
              label="Select Topic"
              selectedValue={selectedTopic}
              isClear={selectedTopic.id ? true : false}
              onSelect={(chapter) => {
                setSelectedTopic({
                  id: String(chapter.id),
                  value: String(chapter.value),
                  label: chapter.label
                })
                setDataList([])
              }}
              placeHolder="Topic Name"
              isLoader={topicLoading}
              required
              options={topicsOptions}
              fullWidth
            />
          )}
        </FlexLocal>
        {topicLoading || isChapterApiLoading || subjectApiLoading ? (
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
          ''
        )}
        {dataList && dataList.length > 0 && !selectedTopic?.id && (
          <PublishTable
            {...{
              onCheck: () => {},
              headerName,
              dataList,
              view: 'view',
              length: dataList.length,
              onChildCheck: () => {}
            }}
          />
        )}
        {(selectedTopic.id || (selectedChapter?.id && !isTopics)) && (
          <Grid
            columns={6}
            gap="12px"
            style={{
              marginTop: '18px',
              background: '#F4F7FE'
            }}
          >
            <GridItem
              columnSpan={isSmall ? 12 : 2}
              full
              style={{ margin: '10px' }}
            >
              <TeachingVideos
                videos={videoMaterial}
                isLoading={isMaterialLoading}
              />
            </GridItem>
            <GridItem columnSpan={isSmall ? 12 : 2} style={{ margin: '10px' }}>
              <TeachingHighLights
                highLights={pptxMaterial}
                isLoading={isMaterialLoading}
                isSmall={isSmall}
              />
            </GridItem>
            <GridItem columnSpan={isSmall ? 12 : 2} style={{ margin: '10px' }}>
              <TeachingSolutions
                solutions={pdfMaterial}
                isLoading={isMaterialLoading}
                isSmall={isSmall}
              />
            </GridItem>
          </Grid>
        )}
      </FormContainerV2>
    </PageContainer>
  )
}
export default ViewMaterial
