import { useEffect, useState } from 'react'
import ItemCheckbox from '../../../components/V2/Form/ItemCheckbox'
import {
  Flex,
  Grid,
  GridItem,
  PageContainer,
  WrapperCard
} from '../../../components/V2/styledComponents'
import {
  ChaptersContainer,
  ContainerHeading,
  ContainerBody
} from '../assessment/addQuestions/components/styledComponents'
import GradeAndSubjectCard from './components/GradeAndSubjectCard'
import {
  TeachingVideos,
  TeachingVideosAudios
} from './components/TeachingVideos'
//import TeachingSolutions from './components/TeachingSolutions'
import TeachingHighLights from './components/TeachingHighLights'
import {
  getChapterData,
  getMaterialData,
  getSubjectData,
  getTopicData
} from '../../../helpers/V2/apis'

import styled from 'styled-components'
import { Blue, BlueButton } from '../../../const/V2/stylingVariables'
import LabVideo from './components/LabVideo'
import { SubTopicsDetails } from '../../../utils/types'
import {
  CourseDetailProps,
  SubjectDetailProps,
  GetLearnModuleSubjectResponse,
  GetLearnModuleChapterResponse,
  VideoMaterialProps,
  LearnModuleTextMaterial
} from './types'
import { Spinner } from 'react-bootstrap'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import {
  // Games,
  TeachingSolutions,
  TeachingStudyMaterial
} from './components/TeachingSolutions'

const Learn = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [courseDetail, setCourseDetail] = useState<CourseDetailProps>({
    _id: '',
    name: ''
  })

  const [subjectDetail, setSubjectDetail] = useState<SubjectDetailProps>({
    id: '',
    name: '',
    isLab: false
  })
  const [chapterId, setChapterId] = useState<string>('')
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false)
  const [subjectData, setSubjectData] = useState<
    GetLearnModuleSubjectResponse[]
  >([])
  const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false)
  const [chapterData, setChapterData] = useState<
    GetLearnModuleChapterResponse[]
  >([])
  const [isTopicLoading, setIsTopicLoading] = useState<boolean>(false)
  const [subTopicData, setSubTopicData] = useState<SubTopicsDetails[]>([])
  const [isMaterialLoading, setIsMaterialLoading] = useState<boolean>(false)
  const [videoMaterial, setVideoMaterial] = useState<VideoMaterialProps[]>([])
  const [audioMaterial, setAudioMaterial] = useState<VideoMaterialProps[]>([])
  const [pdfMaterial, setPdfMaterial] = useState<LearnModuleTextMaterial[]>([])
  const [pptxMaterial, setPptxMaterial] = useState<LearnModuleTextMaterial[]>(
    []
  )
  const [selectedSubTopic, setSelectedSubTopic] = useState<string[]>([])

  const handleChaptersChecked = (
    option: GetLearnModuleChapterResponse,
    checked: boolean
  ) => {
    const newData = chapterData.map((item) =>
      item._id === option._id ? { ...option, isSelected: !checked } : item
    )
    setChapterData(newData)
  }
  const emptyAllMaterial = () => {
    setVideoMaterial([])
    setPdfMaterial([])
    setPptxMaterial([])
    setAudioMaterial([])
  }

  const handleChildChaptersChecked = (
    childId: string,
    childChecked: boolean
  ) => {
    if (subTopicData && subTopicData.length > 0) {
      let childItems: SubTopicsDetails[] = [...subTopicData]
      let filteredData: string[] = []
      childItems = childItems?.map((child: SubTopicsDetails, ind: number) => {
        if (childId === child._id) {
          childItems[ind].isSelected = !childChecked
          if (childChecked) {
            filteredData = []
            setSelectedSubTopic(filteredData)
          } else {
            filteredData = [child._id]
            setSelectedSubTopic(filteredData)
          }
        }
        return child
      })
      handleSubTopicSelected('topic', filteredData)
      setSubTopicData(childItems)
    }
  }

  const handleCourseSelected = (id: string) => {
    setIsSubjectLoading(true)
    setCourseDetail({
      _id: '',
      name: ''
    })
    setSubjectDetail({
      id: '',
      name: '',
      isLab: false
    })
    setSubjectData([])
    setChapterData([])
    setSubTopicData([])
    emptyAllMaterial()
    getSubjectData({
      page: 1,
      limit: 100,
      courseId: id
    })
      .then((res) => {
        setSubjectData(res)
        setIsSubjectLoading(false)

        if (res.length <= 0) {
          CustomToastMessage(
            'There are no chapters, topics and materials',
            'error'
          )
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubjectLoading(false))
  }

  const handleSubjectSelected = (id: string) => {
    setChapterData([])
    setChapterId('')
    emptyAllMaterial()
    if (subjectDetail.isLab === true) {
      setIsMaterialLoading(true)
      getMaterialData({
        courseId: courseDetail._id,
        subjectId: id,
        type: userInfoV2.role === 'student' ? 'study' : 'teaching',
        limit: 100
      })
        .then((res) => {
          setVideoMaterial(res)
          setIsMaterialLoading(false)
        })
        .catch((error) => {
          setIsMaterialLoading(false),
            CustomToastMessage(error.response.data.message, 'error')
        })
    } else {
      setIsChapterLoading(true)
      getChapterData({
        subjectId: id,
        page: 1,
        limit: 100
      })
        .then((res) => {
          setChapterData(res.data)
          setSubTopicData([])
          emptyAllMaterial()
          setIsChapterLoading(false)
        })
        .catch(() => setIsChapterLoading(false))
    }
  }

  const handleChapterSelected = (id: string) => {
    setIsTopicLoading(true)
    setSubTopicData([])
    emptyAllMaterial()
    getTopicData({
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

  const handleSubTopicSelected = (type: string, id: string[]) => {
    emptyAllMaterial()
    if (id[0]) {
      setIsMaterialLoading(true)
      Promise.all([
        getMaterialData({
          courseId: courseDetail._id,
          subjectId: subjectDetail.id,
          topicId: type === 'topic' ? id[0] : '',
          chapterId: type === 'chapter' ? id[0] : '',
          type: userInfoV2.role === 'student' ? 'study' : 'teaching',
          limit: 100
        })
        // getMaterialData({
        //   courseId: courseDetail._id,
        //   topicId: type === 'topic' ? id[0] : '',
        //   chapterId: type === 'chapter' ? id[0] : '',
        //   subjectId: subjectDetail.id,
        //   type: 'study',
        //   limit: 100
        // })
      ])
        .then(([res1]) => {
          if (res1?.data.length > 0) {
            setPptxMaterial(
              res1?.data?.filter(
                (item: LearnModuleTextMaterial) => item.fileType === 'pptx'
              )
            )
            setPdfMaterial(
              res1?.data?.filter(
                (item: LearnModuleTextMaterial) => item.fileType === 'pdf'
              )
            )
            setVideoMaterial(
              res1?.data?.filter(
                (item: LearnModuleTextMaterial) => item.fileType === 'video'
              )
            )
            setAudioMaterial(
              res1?.data?.filter(
                (item: LearnModuleTextMaterial) => item.fileType === 'audio'
              )
            )
            // setVideoMaterial(res2)
            setIsMaterialLoading(false)
          } else {
            CustomToastMessage('No materials found', 'error')
          }
        })
        .catch((Error) => {
          CustomToastMessage(Error.message, 'error')
          setIsMaterialLoading(false)
        })
    }
  }

  const [isSmall, setIsSmall] = useState(false)

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

  return (
    <PageContainer scroll>
      <GradeAndSubjectCard
        onSelectGrade={handleCourseSelected}
        onSelectSubject={handleSubjectSelected}
        {...{
          courseDetail,
          subjectDetail,
          subjectData,
          setCourseDetail,
          setSubjectDetail
        }}
        loader={isSubjectLoading}
      />
      {subjectDetail.isLab === true ? (
        <WrapperCard
          style={{
            marginTop: '18px',
            aspectRatio: '4/3',
            position: 'relative'
          }}
        >
          <P>{`${courseDetail.name} ${
            subjectDetail.name ? `| ${subjectDetail.name}` : ''
          }`}</P>
          {isMaterialLoading ? (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '45%',
                left: '45%'
              }}
              animation={'border'}
            />
          ) : (
            <LabVideo videos={videoMaterial} />
          )}
        </WrapperCard>
      ) : (
        <Grid
          columns={9}
          gap="12px"
          style={{ height: '100%', marginTop: '18px' }}
        >
          <GridItem
            columnSpan={isSmall ? 12 : 3}
            style={{ height: '100%', minHeight: '330px' }}
          >
            <WrapperCard
              style={{
                height: '100%',
                // overflowY: 'hidden',
                position: 'relative'
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
                  <P style={{ paddingBottom: '16px' }}>{`${courseDetail.name} ${
                    subjectDetail.name ? `| ${subjectDetail.name}` : ''
                  }`}</P>
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
                    <ContainerBody style={{ maxHeight: 'max-content' }}>
                      {chapterData.map(
                        (item: GetLearnModuleChapterResponse) => (
                          <ItemCheckbox
                            key={`chapters_and_topics_${item._id}`}
                            {...{
                              children: subTopicData,
                              isChecked: item._id === chapterId,
                              label: item.name,
                              onCheck: (isChecked) => {
                                handleChaptersChecked(item, isChecked)
                                handleSubTopicSelected('chapter', [item._id])
                                handleChapterSelected(item._id)
                                setSelectedSubTopic([])
                                if (chapterId === item._id) {
                                  setChapterId('')
                                  setSubTopicData([])
                                  emptyAllMaterial()
                                } else {
                                  setChapterId(item._id)
                                }
                              },
                              onChildCheck: ({ _id, isSelected }) =>
                                handleChildChaptersChecked(_id, isSelected)
                            }}
                            isLoading={isTopicLoading}
                            selectedChildChaptersAndTopics={selectedSubTopic}
                          />
                        )
                      )}
                    </ContainerBody>
                  </ChaptersContainer>
                </Flex>
              )}
            </WrapperCard>
          </GridItem>
          {userInfoV2?.role !== 'superAdmin' &&
            userInfoV2?.role !== 'student' &&
            videoMaterial?.length > 0 && (
              <>
                <GridItem
                  columnSpan={isSmall ? 12 : 2}
                  full
                  style={{ height: '100%' }}
                >
                  <TeachingVideos
                    videos={videoMaterial}
                    isLoading={isMaterialLoading}
                  />
                </GridItem>
                <GridItem
                  columnSpan={isSmall ? 12 : 2}
                  full
                  style={{ height: '100%' }}
                >
                  <TeachingVideos
                    audio
                    videos={audioMaterial}
                    isLoading={isMaterialLoading}
                  />
                </GridItem>

                <GridItem
                  columnSpan={isSmall ? 12 : 2}
                  style={{ height: '100%', maxHeight: '800px', gap: '5px' }}
                >
                  <div style={{ height: '35%' }}>
                    <TeachingHighLights
                      isStudent={''}
                      highLights={pptxMaterial}
                      isLoading={isMaterialLoading}
                      isSmall={isSmall}
                    />
                  </div>

                  <div style={{ height: '50%' }}>
                    <TeachingSolutions
                      isStudent={''}
                      solutions={pdfMaterial}
                      isLoading={isMaterialLoading}
                      isSmall={isSmall}
                    />
                  </div>
                </GridItem>
              </>
            )}
          {userInfoV2?.role === 'student' && (
            <>
              <GridItem
                columnSpan={isSmall ? 12 : 2}
                full
                style={{ height: '100%' }}
              >
                <TeachingVideosAudios
                  videos={videoMaterial}
                  isLoading={isMaterialLoading}
                />
              </GridItem>
              <GridItem
                columnSpan={isSmall ? 12 : 2}
                full
                style={{ height: '100%' }}
              >
                <TeachingStudyMaterial
                  studyMaterial={pdfMaterial}
                  isSmall={isSmall}
                  isLoading={isMaterialLoading}
                />
              </GridItem>
              {/* <GridItem
                columnSpan={isSmall ? 12 : 2}
                full
                style={{ height: '100%' }}
              >
                <Games
                  games={pdfMaterial}
                  isLoading={isMaterialLoading}
                  isSmall={isSmall}
                />
              </GridItem> */}
            </>
          )}
        </Grid>
      )}
    </PageContainer>
  )
}

export default Learn

const P = styled.p`
  color: ${Blue};
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.4px;
`
