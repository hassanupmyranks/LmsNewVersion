import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainerV2 } from '../../../../components/V2/Form/styledComponents'
import { PageContainer } from '../../../../components/V2/styledComponents'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import ActionBar from './components/ActionBar'
import QuestionStatistics from './components/QuestionStatistics'
import { ActionBarActionProp, StatisticsProps, TabsProp } from './types'
import { QuestionContainer } from './components/styledComponents'
import { statisticsData } from './staticDataFile'
import DifficultyLevelContainer from './components/DifficultyLevelContainer'
import RandomlyGeneratedQuestions from './components/RandomlyGeneratedQuestions'
import UploadQuestionsContainer from './components/UploadQuestionsContainer'
import {
  getQuestionV2BankUnitAPI,
  getQuestionBankV2GetAllQuestionAPI,
  getQuestionV2BankChaptersAPI,
  getQuestionBankV2TopicsAPI
} from '../../../../helpers/V2/apis'
import {
  NewSubjectDetails,
  RandomGenerateQuestionsDetails,
  SubTopicsDetails,
  SubjectTopicsDetails
} from '../../../../utils/types'
import { RootState } from '../../../../redux/store'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import { formattedTime } from '../../../../helpers/V2/formattedTime'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'

const AddQuestions = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const [allTabs, setAllTabs] = useState<TabsProp[]>([
    {
      icon: 'physics',
      index: 0,
      isActive: true,
      name: 'Physics'
    },
    {
      icon: 'chemistry',
      index: 1,
      isActive: false,
      name: 'Chemistry'
    }
  ])

  const [allActions] = useState<ActionBarActionProp[]>([
    {
      index: 0,
      caption: 'Preview',
      url: ''
    }
  ])

  const [isTopicsLoading, setIsTopicsLoading] = useState(false)
  const [isChapterAPILoading, setIsChapterAPILoading] = useState(false)

  const [search, setSearch] = useState<string>('')

  const [headerTabs, setHeaderTabs] = useState('Custom Selection')

  const [statistics] = useState<StatisticsProps[]>(statisticsData)
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [unit, setUnit] = useState<SubjectTopicsDetails[]>([])
  const [selectedUnit, setSelectedUnit] = useState<string[]>([])
  const [chapters, setChapters] = useState<SubjectTopicsDetails[]>([])
  const [topics, setTopic] = useState<SubjectTopicsDetails[]>([])
  const [questions, setQuestions] = useState<RandomGenerateQuestionsDetails[]>(
    []
  )
  const [difficultyQuestions, setDifficultyQuestions] = useState<
    RandomGenerateQuestionsDetails[]
  >([])
  const [currentDifficultyLevel, setCurrentDifficultyLevel] =
    useState<string>('0')
  const [isAllTab, setIsAllTab] = useState(true)
  const [showPreview, setShowPreview] = useState(true)
  const [isQuestionAPILoading, setIsQuestionsLoading] = useState(false)

  const handleQuestionStatisticsOnClick = (statistic: StatisticsProps) => {
    setHeaderTabs(statistic.name)
    dispatch(createTestDetails({ ...selector, isPreviewed: true }))
  }

  const handleSearchChange = (data: string) => {
    setSearch(data)
  }

  let testStartTime = formattedTime(selector.startDate, selector.startTime)
  let testEndTime = formattedTime(selector.endDate, selector.endTime)

  const getQuestions = (topicIds: string[], topic: string) => {
    let tmp_question_type: any = []
    const activeTab = allTabs.find((tabs) => tabs.isActive)
    if (activeTab) {
      const selectedSubject: any = selector.subjectDetails.find(
        (details: NewSubjectDetails) => details.subject_name === activeTab.name
      )

      if (selectedSubject) {
        selectedSubject.sections.forEach((section: any) => {
          if (section?.question_type && Array.isArray(section.question_type)) {
            tmp_question_type = tmp_question_type.concat(section.question_type)
          }
        })
      }
    }
    const unitId: any = topic === 'Unit' ? topicIds : ''
    const chapterId: any = topic === 'Chapter' ? topicIds : ''
    const topicId: any = topic === 'Topic' ? topicIds : ''

    if (unitId || chapterId || topicId.length > 0) {
      setDifficultyQuestions([])
      setQuestions([])
      setIsQuestionsLoading(true)
      const payload = {
        limit: 50,
        unitId: unitId,
        chapterId: chapterId,
        topicIds: topicId,
        questionType: tmp_question_type
      }

      getQuestionBankV2GetAllQuestionAPI(payload)
        .then((res) => {
          setDifficultyQuestions(res)
          setQuestions(res)
          if (res.length <= 0) {
            CustomToastMessage(
              `No Questions available in this ${topic}`,
              'error'
            )
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setIsQuestionsLoading(false))
    }
    // else {
    //   setDifficultyQuestions([])
    //   setQuestions([])
    // }
  }

  useEffect(() => {
    let tmp_question_type: any = []

    const activeSubject: any = allTabs.find((tabs) => tabs.isActive)
    if (activeSubject) {
      const selectedSubject: any = selector.subjectDetails.find(
        (details: NewSubjectDetails) =>
          details.subject_name === activeSubject.name
      )

      if (selectedSubject) {
        selectedSubject.sections.forEach((section: any) => {
          if (section?.question_type && Array.isArray(section.question_type)) {
            tmp_question_type = tmp_question_type.concat(section.question_type)
          }
        })
      }
      if (tmp_question_type.length > 0) {
        setIsQuestionsLoading(true)
        const payload = {
          limit: 50,
          subjectId: activeSubject.id,
          questionType: tmp_question_type
        }
        getQuestionBankV2GetAllQuestionAPI(payload)
          .then((res) => {
            setDifficultyQuestions(res)
            setQuestions(res)
            if (res.length <= 0) {
              CustomToastMessage(`No Questions available`, 'error')
            }
          })
          .catch((error) => console.log({ error }))
          .finally(() => setIsQuestionsLoading(false))
      }
    }
  }, [allTabs, selector.subjectDetails])

  useEffect(() => {
    const useDetails = selector.subjectDetails
    if (useDetails && useDetails.length > 0) {
      useDetails.forEach((subject: NewSubjectDetails) => {
        if (
          !subject.is_teacher_assigned &&
          !subject.teacher_details?.teacher_id
        ) {
          let isShow = true
          const totalQuestions = subject.sections.reduce(
            (acc, items: any) => acc + items.questions_list.length,
            0
          )

          if (totalQuestions === subject.total_questions_for_subject) {
            isShow = false
          }
          setShowPreview(isShow)
        }
      })
    }
  }, [selector.subjectDetails])

  useEffect(() => {
    if (questions && questions.length > 0) {
      if (currentDifficultyLevel === '0') {
        setDifficultyQuestions(questions)
      } else {
        const newQuestions = questions?.filter(
          (question: any) => question.difficulty === currentDifficultyLevel
        )

        setDifficultyQuestions(newQuestions)
      }
    }
  }, [currentDifficultyLevel, questions])

  const handleAction = () => {
    if (showPreview) {
      CustomToastMessage(`Please select all questions`, 'error')
    } else {
      history.push(ROUTES_V2.CREATE_TEST_PREVIEW)
      dispatch(createTestDetails({ ...selector, isPreviewed: true }))
    }
  }

  useEffect(() => {
    if (selector.subjectDetails && selector.subjectDetails.length > 0) {
      if (isAllTab) {
        let isFirst = true
        let newSubjectDetails: any = selector.subjectDetails.reduce(
          (acc: any, item: any, index) => {
            if (!item?.teacher_details?.teacher_id) {
              acc.push({
                icon: item.subject_name,
                index,
                isActive: isFirst,
                name: item.subject_name,
                id: item.subject_id,
                totalQuestions: item.total_questions_for_subject
              })
              isFirst = false
            }
            return acc
          },
          []
        )
        setIsAllTab(false)
        setAllTabs(newSubjectDetails)
      }
    } else {
      history.push(ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST)
    }
  }, [history, selector, isAllTab])

  const handleSelectionTab = (tab: TabsProp) => {
    setHeaderTabs('Custom Selection')
    const activeTab = allTabs.find((tabs) => tabs.isActive)
    if (activeTab) {
      const selectedSubject: any = selector.subjectDetails.find(
        (details: NewSubjectDetails) => details.subject_name === activeTab.name
      )

      if (selectedSubject) {
        const totalQuestions = selectedSubject.sections.reduce(
          (total: any, section: any) => total + section.questions_list.length,
          0
        )

        if (totalQuestions === selectedSubject.total_questions_for_subject) {
          const newTabs = allTabs.map((t) =>
            t.index === tab.index
              ? { ...t, isActive: true }
              : { ...t, isActive: false }
          )
          setAllTabs(newTabs)
          setDifficultyQuestions([])
          setQuestions([])
          setSelectedUnit([])
          setSelectedChapters([])
          setSelectedTopics([])
          dispatch(createTestDetails({ ...selector, isPreviewed: true }))
        } else {
          CustomToastMessage(
            'Please select all questions for the subject',
            'error'
          )
        }
      }
    }
  }

  const handleUnitSelection = (unit: any) => {
    const isChecked = selectedUnit.indexOf(unit._id)
    let tmpSelectedUnits = [...selectedUnit]
    if (isChecked !== -1) {
      tmpSelectedUnits = tmpSelectedUnits.filter((id) => id !== unit._id)
    } else {
      tmpSelectedUnits.push(unit._id)
    }

    setSelectedUnit(tmpSelectedUnits)
    getQuestions(tmpSelectedUnits, 'Unit')

    if (unit?._id) {
      setSelectedChapters([])
      setSelectedTopics([])
      setChapters([])

      setIsChapterAPILoading(true)
      getQuestionV2BankChaptersAPI({
        unitId: unit?._id,
        limit: 20
      })
        .then((res) => {
          if (res) {
            setChapters(res)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsChapterAPILoading(false))
    }
  }

  const handleChapterChecked = (chapter: any) => {
    const isChecked = selectedChapters.indexOf(chapter._id)
    let tmpSelectedChapter = [...selectedChapters]
    if (isChecked !== -1) {
      tmpSelectedChapter = tmpSelectedChapter.filter((id) => id !== chapter._id)
    } else {
      tmpSelectedChapter.push(chapter._id)
    }

    // setSelectedChapters([tmpSelectedChapter[tmpSelectedChapter.length - 1]])
    setSelectedChapters(tmpSelectedChapter)

    // if (isChecked !== -1) {
    //   getQuestions([selectedUnit[0]], 'Unit')
    // } else {
    //   getQuestions(
    //     [tmpSelectedChapter[tmpSelectedChapter.length - 1]],
    //     'Chapter'
    //   )
    // }
    if (isChecked !== -1) {
      getQuestions(selectedUnit, 'Unit')
    } else {
      getQuestions(tmpSelectedChapter, 'Chapter')
    }

    setSelectedTopics([])
    setTopic([])

    if (chapter._id) {
      getQuestionBankV2TopicsAPI({
        chapterId: chapter._id,
        limit: 20
      })
        .then((res) => {
          if (res) {
            setTopic(res)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
    }
  }

  const handleTopicsChecked = (childOptions: SubTopicsDetails) => {
    const isChecked = selectedTopics.indexOf(childOptions._id)
    let tmpSelectedTopics = [...selectedTopics]
    if (isChecked !== -1) {
      tmpSelectedTopics = tmpSelectedTopics.filter(
        (id) => id !== childOptions._id
      )
    } else {
      tmpSelectedTopics.push(childOptions._id)
    }

    setSelectedTopics(tmpSelectedTopics)
    if (tmpSelectedTopics.length <= 0) {
      getQuestions(selectedChapters, 'Chapter')
    } else {
      getQuestions(tmpSelectedTopics, 'Topic')
    }
  }

  useEffect(() => {
    if (selector.courseId) {
      setIsTopicsLoading(true)
      const activeSubject: any = allTabs.find((tabs) => tabs.isActive)
      if (activeSubject?.id) {
        getQuestionV2BankUnitAPI({
          courseId: selector.courseId,
          subjectId: activeSubject.id,
          limit: 50
        })
          .then((res) => {
            if (res[0]?._id) {
              setUnit(res)
            }
          })
          .catch((error) =>
            console.log({ 'Error Get Question Bank Details': error })
          )
          .finally(() => setIsTopicsLoading(false))
      }
    }
  }, [selector.courseId, allTabs])

  const handleGetQuestionsAPI = () => {
    let page = 1
    if (questions.length > 0) {
      page = Math.floor(questions.length / 50) + 1
    }

    setIsQuestionsLoading(true)
    let payload: any = {
      limit: 50,
      page: page,
      unitId: selectedUnit[0],
      chapterId: selectedChapters[0]
    }
    if (selectedTopics.length > 0) {
      payload = {
        limit: 50,
        page: page,
        unitId: selectedUnit[0],
        chapterId: selectedChapters[0],
        topicIds: selectedTopics
      }
    }

    getQuestionBankV2GetAllQuestionAPI(payload)
      .then((res) => {
        setDifficultyQuestions((prev) => [...prev, ...res])
        setQuestions((prev) => [...prev, ...res])
      })
      .catch((error) =>
        console.log({ 'Error Get Questions Chapter And Topic': error })
      )
      .finally(() => setIsQuestionsLoading(false))
  }

  useEffect(() => {
    dispatch(updateTopHeader(topHeaderValues.createTestPattern))
  }, [dispatch])

  return (
    <PageContainer>
      <FormContainerV2>
        <ActionBar
          tabs={allTabs}
          actions={allActions}
          handleAction={handleAction}
          handleSelectionTab={handleSelectionTab}
        />
        <QuestionStatistics
          handleOnClick={handleQuestionStatisticsOnClick}
          handleSearchChange={handleSearchChange}
          search={search}
          statistics={statistics}
          startTime={new Date(testStartTime)}
          endTime={new Date(testEndTime)}
          totalMarks={selector?.totalMarks}
          totalTestQuestion={selector?.totalQuestions}
        />
        <QuestionContainer>
          {headerTabs === 'Custom Selection' && (
            <DifficultyLevelContainer
              units={unit}
              isChapterAPILoading={isChapterAPILoading}
              selectedUnit={selectedUnit}
              topics={topics}
              handleUnitChecked={handleUnitSelection}
              handleChapterChecked={handleChapterChecked}
              handleGetQuestionsAPI={handleGetQuestionsAPI}
              isQuestionAPILoading={isQuestionAPILoading}
              allTabs={allTabs}
              isTopicsLoading={isTopicsLoading}
              chaptersAndTopics={chapters}
              handleChildChaptersChecked={handleTopicsChecked}
              selectedChaptersAndTopics={selectedChapters}
              selectedChildChaptersAndTopics={selectedTopics}
              questions={difficultyQuestions}
              currentDifficultyLevel={currentDifficultyLevel}
              setCurrentDifficultyLevel={setCurrentDifficultyLevel}
            />
          )}
          {headerTabs === 'Generate Randomly' && (
            <RandomlyGeneratedQuestions
              allTabs={allTabs}
              currentDifficultyLevel={currentDifficultyLevel}
              selectedChildChaptersAndTopics={selectedTopics}
              selectedUnit={selectedUnit}
              selectedChapters={selectedChapters}
            />
          )}
          {headerTabs === 'Upload Questions' && (
            <UploadQuestionsContainer
              units={unit}
              topics={topics}
              isChapterAPILoading={isChapterAPILoading}
              handleUnitChecked={handleUnitSelection}
              handleChapterChecked={handleChapterChecked}
              isQuestionAPILoading={isQuestionAPILoading}
              allTabs={allTabs}
              selectedUnit={selectedUnit}
              isTopicsLoading={isTopicsLoading}
              chaptersAndTopics={chapters}
              handleChildChaptersChecked={handleTopicsChecked}
              selectedChaptersAndTopics={selectedChapters}
              selectedChildChaptersAndTopics={selectedTopics}
              handleChaptersChecked={handleChapterChecked}
            />
          )}
        </QuestionContainer>
      </FormContainerV2>
    </PageContainer>
  )
}

export default AddQuestions
