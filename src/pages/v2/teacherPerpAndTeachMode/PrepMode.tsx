import { useEffect, useState } from 'react'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../components/V2/Form/types'
import {
  Flex,
  Grid,
  GridItem,
  PageContainer
} from '../../../components/V2/styledComponents'
import { ContainerBodyNew, FullPage, HeadingH3 } from './StyledComponent'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import {
  getChapterData,
  getCourses,
  getPrepModeMaterials,
  getSessionMaterials,
  getSubjectData,
  getTopicData,
  prepModeMaterials
} from '../../../helpers/V2/apis'
import SubjectCard from '../learn/components/SubjectCard'
import {
  GetLearnModuleChapterResponse,
  GetLearnModuleSubjectResponse,
  LearnModuleTextMaterial
} from '../learn/types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import ItemCheckbox from '../../../components/V2/Form/ItemCheckbox'
import { SubTopicsDetails } from '../../../utils/types'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { TeachingVideos } from './components/TeachingVideos'
import TeachingHighLights from './components/TeachingHighLights'
import { TeachingSolutions } from './components/TeachingSolutions'
import SimpleButton from '../../../components/V2/Button/SimpleButton'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import MoveToTeachMode from '../../../components/V2/PopUp/moveToTeachMode'

const PrepMode = () => {
  const param: any = useParams()
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [selectedGrade, setSelectedGrade] = useState<
    SearchableDropdownOptionData | any
  >({ id: '', label: '' })
  const [subjectData, setSubjectData] = useState<
    GetLearnModuleSubjectResponse[]
  >([])
  const [isSubjectLoading, setIsSubjectLoading] = useState<boolean>(false)
  const [subjectDetail, setSubjectDetail] = useState<any>({
    id: '',
    name: '',
    isLab: false
  })
  const [selectedTopic, setSelectedTopic] = useState<string[]>([])
  const [isChapterLoading, setIsChapterLoading] = useState<boolean>(false)
  const [chapterData, setChapterData] = useState<
    GetLearnModuleChapterResponse[]
  >([])

  const [isTopicLoading, setIsTopicLoading] = useState<boolean>(false)
  const [topicData, setTopicData] = useState<SubTopicsDetails[]>([])
  const [chapterId, setChapterId] = useState<string>('')
  const [isMaterialLoading, setIsMaterialLoading] = useState<boolean>(false)
  const [videoMaterial, setVideoMaterial] = useState<any[]>([])
  const [audioMaterial, setAudioMaterial] = useState<any[]>([])
  const [pdfMaterial, setPdfMaterial] = useState<any[]>([])
  const [pptxMaterial, setPptxMaterial] = useState<any[]>([])
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [materilsIds, setMaterialsIds] = useState<any>([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [selectedBatch, setSelectedBatch] = useState<any>({ id: '', label: '' })
  const handlePopupOpen = () => {
    setIsPopupOpen(true)
  }

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
    }
    getCourses(payload)
      .then((res: any) => {
        newGrade = res?.data?.data?.map((item: any) => {
          return {
            id: item._id,
            label: item.name,
            value: ''
          }
        })
        setGradeData(newGrade)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))

    setIsMaterialLoading(false)
  }, [])

  const handleCourseSelected = (id: string) => {
    setSubjectData([])
    if (id) {
      setIsSubjectLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: id
      })
        .then((res) => {
          setSubjectData(res)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubjectLoading(false))
    }
  }

  useEffect(() => {
    if (subjectDetail?.id) {
      setIsChapterLoading(true)
      getChapterData({
        subjectId: subjectDetail.id,
        page: 1,
        limit: 100
      })
        .then((res) => {
          setChapterData(res.data)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsChapterLoading(false))
    }
  }, [subjectDetail.id])

  const handleGetMaterials = (
    type: 'topic' | 'chapter',
    Id: any,
    gradeId?: string
  ) => {
    setIsMaterialLoading(true)
    let payload: any = {
      courseId: gradeId ? gradeId : selectedGrade?.id,
      [type === 'topic' ? 'topicId' : 'chapterId']: Id
    }
    getPrepModeMaterials(payload)
      .then((res) => {
        if (res.data.length <= 0) {
          CustomToastMessage('No Materials Found', 'error')
        }

        setPptxMaterial(
          res?.data?.filter(
            (item: LearnModuleTextMaterial) => item.fileType === 'pptx'
          )
        )
        setPdfMaterial(
          res?.data?.filter(
            (item: LearnModuleTextMaterial) => item.fileType === 'pdf'
          )
        )
        setVideoMaterial(
          res?.data?.filter(
            (item: LearnModuleTextMaterial) => item.fileType === 'video'
          )
        )
        setAudioMaterial(
          res?.data?.filter(
            (item: LearnModuleTextMaterial) => item.fileType === 'audio'
          )
        )
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsMaterialLoading(false))
  }

  const getTopics = (chapterID: string) => {
    if (chapterID) {
      setIsTopicLoading(true)
      getTopicData({
        chapterId: chapterID,
        page: 1,
        limit: 100
      })
        .then((res) => {
          setTopicData(res?.data)
          if (res?.data.length <= 0) {
            handleGetMaterials('chapter', chapterID)
            CustomToastMessage('No Topics Available', 'error')
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsTopicLoading(false))
    }
  }

  const handleChildChaptersChecked = (
    childId: string,
    childChecked: boolean
  ) => {
    if (topicData && topicData.length > 0) {
      let childItems: SubTopicsDetails[] = [...topicData]
      let filteredData: string[] = []
      childItems = childItems?.map((child: SubTopicsDetails, ind: number) => {
        if (childId === child._id) {
          childItems[ind].isSelected = !childChecked
          if (childChecked) {
            filteredData = []
            setSelectedTopic(filteredData)
          } else {
            filteredData = [child._id]
            setSelectedTopic(filteredData)
          }
        }
        return child
      })
      setTopicData(childItems)
    }
  }

  const submitHandler = () => {
    if (isEdit) {
      handlePopupOpen()
    } else {
      if (chapterId && materilsIds.length > 0) {
        handlePopupOpen()
        setIsSubmitted(true)
        let payload: any = {
          ...(selectedTopic?.length > 0
            ? { topicId: selectedTopic[0] }
            : { chapterId: chapterId }),
          materialIds: materilsIds
        }

        prepModeMaterials(payload)
          .then((res) => {
            CustomToastMessage(res.message, 'success')
            // handlePopupOpen()
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setIsSubmitted(false))
      } else {
        CustomToastMessage('Please select the materials to move', 'error')
      }
    }
  }

  const handleCheckedMaterials = (id: any) => {
    if (id) {
      const isChecked = materilsIds.indexOf(id)
      let newMaterilsIds = [...materilsIds]
      if (isChecked !== -1) {
        newMaterilsIds = newMaterilsIds.filter((nid) => nid !== id)
      } else {
        newMaterilsIds.push(id)
      }
      setMaterialsIds(newMaterilsIds)
    }
  }

  useEffect(() => {
    if (param?.id) {
      setIsEdit(true)
      setIsMaterialLoading(true)
      getSessionMaterials(param?.id)
        .then((res) => {
          if (res.data) {
            setSelectedGrade({
              id: res.data.courseId,
              label: res.data.courseName
            })
            setSubjectDetail({
              id: res.data.subjectId,
              name: res.data.subjectName
            })
            handleCourseSelected(res.data.courseId)
            setChapterId(res.data.chapters[0].chapterId)
            getTopics(res.data.chapters[0].chapterId)
            setStartDate(moment(res.data.sessionDate).toDate())
            setSelectedBatch({
              id: res.data.batchId,
              label: res.data.batchName
            })
            if (res.data.chapters[0].topics.length > 0) {
              setSelectedTopic([res.data.chapters[0].topics[0].topicId])
              handleGetMaterials(
                'topic',
                res.data.chapters[0].topics[0].topicId,
                res.data.courseId
              )
            }
            let newIds: any = []
            res.data.materials.map((material: any) => {
              newIds.push(material.materialId)
            })
            setMaterialsIds(newIds)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsMaterialLoading(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id])

  return (
    <PageContainer style={{ position: 'relative' }}>
      <FullPage>
        <Flex gap="10px">
          <SearchableDropdown
            style={{ width: '340px' }}
            isLoader={gradeLoading}
            label={'Select Grade'}
            placeHolder={'Please Select Grade'}
            options={gradeData}
            isClear={selectedGrade?.id ? true : false}
            onSelect={(option: any) => {
              setSelectedGrade(option)
              handleCourseSelected(option.id)
              setSubjectData([])
              setSubjectDetail({
                id: '',
                name: '',
                isLab: false
              })
              setChapterId('')
              setChapterData([])
              setTopicData([])
              setSelectedTopic([])
              setVideoMaterial([])
              setAudioMaterial([])
              setPdfMaterial([])
              setPptxMaterial([])
            }}
            selectedValue={selectedGrade}
          />
          <Flex
            gap="16px"
            style={{
              overflowX: 'auto',
              width: '100%',
              marginLeft: '0px',
              marginTop: '5px'
            }}
          >
            {isSubjectLoading ? (
              <Spinner
                style={{
                  width: '24px',
                  height: '24px',
                  color: `${BlueButton}`,
                  margin: '36px 100px 18px'
                }}
                animation={'border'}
              />
            ) : (
              subjectData &&
              subjectData?.map((subject: GetLearnModuleSubjectResponse) => {
                return (
                  <SubjectCard
                    onSelectSubject={() => {
                      setSubjectDetail({
                        ...subjectDetail,
                        id: subject._id,
                        name: subject.name
                      })

                      setChapterId('')
                      setChapterData([])
                      setTopicData([])
                      setSelectedTopic([])
                      setVideoMaterial([])
                      setAudioMaterial([])
                      setPdfMaterial([])
                      setPptxMaterial([])
                    }}
                    logo={subject.icon}
                    key={subject._id}
                    active={subject._id === subjectDetail.id}
                    details={`${subject.materialCount} ${
                      subject.isLab === true ? 'Videos' : 'Materials'
                    }`}
                    subjectName={subject.name}
                  />
                )
              })
            )}
          </Flex>
        </Flex>

        {isChapterLoading && (
          <div>
            <Spinner
              style={{
                width: '24px',
                height: '24px',
                color: `${BlueButton}`,
                margin: '36px 100px 18px'
              }}
              animation={'border'}
            />
          </div>
        )}
        <Flex direction="row">
          {chapterData && chapterData?.length > 0 && (
            <Flex direction="column">
              <HeadingH3 style={{ marginTop: '20px' }}>
                Chapters & Topics
              </HeadingH3>
              <ContainerBodyNew
                style={{
                  maxHeight: 'max-content',
                  width: '380px'
                }}
              >
                {chapterData.map((item: GetLearnModuleChapterResponse) => (
                  <ItemCheckbox
                    key={`chapters_and_topics_${item._id}`}
                    {...{
                      children: topicData,
                      isChecked: item._id === chapterId,
                      label: item.name,
                      onCheck: () => {
                        if (chapterId === item._id) {
                          setChapterId('')
                          setTopicData([])
                        } else {
                          getTopics(item._id)
                          setChapterId(item._id)
                        }
                      },
                      onChildCheck: ({ _id, isSelected }) => {
                        handleChildChaptersChecked(_id, isSelected)
                        handleGetMaterials('topic', _id)
                      }
                    }}
                    isLoading={isTopicLoading}
                    selectedChildChaptersAndTopics={selectedTopic}
                  />
                ))}
              </ContainerBodyNew>
            </Flex>
          )}
          {(videoMaterial.length > 0 ||
            audioMaterial.length > 0 ||
            pptxMaterial.length > 0 ||
            pdfMaterial.length > 0) && (
            <Grid columns={9} gap="12px" style={{ marginTop: '18px' }}>
              {userInfoV2?.role !== 'superAdmin' &&
                userInfoV2?.role !== 'student' && (
                  <>
                    <GridItem
                      columnSpan={3}
                      style={{ gap: '5px', height: '100%', minHeight: '220px' }}
                    >
                      <TeachingHighLights
                        isPrepMode={true}
                        handleCheckedMaterials={handleCheckedMaterials}
                        materilsIds={materilsIds}
                        isStudent={''}
                        highLights={pptxMaterial}
                        isLoading={isMaterialLoading}
                        isSmall={false}
                      />
                    </GridItem>
                    <GridItem
                      columnSpan={3}
                      full
                      style={{ height: '100%', minHeight: '220px' }}
                    >
                      <TeachingSolutions
                        isPrepMode={true}
                        isStudent={''}
                        handleCheckedMaterials={handleCheckedMaterials}
                        materilsIds={materilsIds}
                        solutions={pdfMaterial}
                        isLoading={isMaterialLoading}
                        isSmall={false}
                      />
                    </GridItem>
                    <GridItem
                      columnSpan={3}
                      full
                      style={{ height: '100%', minHeight: '220px' }}
                    >
                      <TeachingVideos
                        isPrepMode={true}
                        handleCheckedMaterials={handleCheckedMaterials}
                        materilsIds={materilsIds}
                        videos={videoMaterial}
                        isLoading={isMaterialLoading}
                      />
                    </GridItem>
                  </>
                )}
            </Grid>
          )}
        </Flex>
        <Flex
          justifyContent="end"
          alignItems="end"
          style={{
            marginTop: '20px',
            position: 'absolute',
            bottom: '7%',
            right: '3%'
          }}
        >
          <SimpleButton
            label={isEdit ? 'Update' : 'Move to teach mode'}
            clickHandler={() => submitHandler()}
            disabled={isSubmitted}
          />
          {isPopupOpen && (
            <MoveToTeachMode
              setPopup={() => {
                setIsPopupOpen(false)
              }}
              sessionId={param.id}
              isEdit={isEdit}
              newBatch={selectedBatch}
              startDate={startDate}
              setStartDate={setStartDate}
              gradeId={selectedGrade.id}
              SubjectId={subjectDetail.id}
              materialIds={materilsIds}
            />
          )}
        </Flex>
      </FullPage>
    </PageContainer>
  )
}

export default PrepMode
