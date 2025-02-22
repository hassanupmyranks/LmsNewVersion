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
  getQuestionBankV2TopicsAPI,
  getNewAllTestData
} from '../../../../helpers/V2/apis'
import {
  NewSubjectDetails,
  RandomGenerateQuestionsDetails,
  SubTopicsDetails,
  SubjectTopicsDetails
} from '../../../../utils/types'
import { RootState } from '../../../../redux/store'
import { useHistory, useParams } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import { formattedTime } from '../../../../helpers/V2/formattedTime'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'

const TeacherAddQuestions = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  let { testId, courseId }: any = useParams()

  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

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

  const [isChapterAPILoading, setIsChapterAPILoading] = useState(false)

  const handleQuestionStatisticsOnClick = (statistic: StatisticsProps) => {
    setHeaderTabs(statistic.name)
    dispatch(createTestDetails({ ...selector, isPreviewed: true }))
  }

  const handleSearchChange = (data: string) => {
    setSearch(data)
  }

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
              `No Questions available in this ${topic} `,
              'error'
            )
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setIsQuestionsLoading(false))
    } else {
      setDifficultyQuestions([])
      setQuestions([])
    }
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

  let testStartTime = formattedTime(selector.startDate, selector.startTime)
  let testEndTime = formattedTime(selector.endDate, selector.endTime)

  useEffect(() => {
    if (testId && courseId && !selector?.isTeacher) {
      getNewAllTestData({
        test_id: testId,
        course_id: courseId,
        user_id: user._id,
        skip: 0,
        limit: 1,
        show_only_user_created_tests: false
      })
        .then((res) => {
          const testSubjectDetails = res?.data[0]?.test_details

          if (testSubjectDetails) {
            const matchedSubject = testSubjectDetails.map((item: any) => {
              return item?.teacher_details?.teacher_id === user?._id && item
            })

            if (matchedSubject) {
              const newDetailed = matchedSubject.map((subject: any) => ({
                ...subject,
                sections: subject.sections?.map((section: any) => ({
                  ...section,
                  questions_list: section?.questions_list || []
                }))
              }))

              const removeData = res?.data?.map((item: any) => ({
                testName: item.institute_test_name,
                testPattern: item.test_pattern,
                courseId,
                test_id: testId,
                institute_id: '',
                testDuration: item.test_duration,
                isPasswordProtect: item.isPasswordProtect,
                isTeacher: true,
                password: '',
                subjectDetails: newDetailed,
                startDate: item.test_start_time
                  ? new Date(item.test_start_time)
                  : new Date(),
                selectedPattenDetails: undefined,
                endDate: item.test_end_time
                  ? new Date(item.test_end_time)
                  : new Date(),
                instructionText: item.instruction_text,
                totalQuestions: item.total_test_questions,
                totalMarks: item.total_marks,
                isEdit: true,
                isPreviewed: true
              }))[0]

              dispatch(createTestDetails(removeData))
            }
          }
        })
        .catch((error) => console.log({ error }))
    }
  }, [testId, courseId, dispatch, user._id, selector?.isTeacher])

  useEffect(() => {
    const useDetails: any = selector.subjectDetails
    if (useDetails && useDetails.length > 0) {
      const userSubjects: any = useDetails[0]
      let isShow = true
      if (userSubjects) {
        const totalQuestions = userSubjects?.sections?.reduce(
          (acc: any, items: any) => acc + items.questions_list.length,
          0
        )
        if (totalQuestions === userSubjects.total_questions_for_subject) {
          isShow = false
        }
      }
      setShowPreview(isShow)
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

  const handleAction = () => {
    if (showPreview) {
      CustomToastMessage(`Please select all questions`, 'error')
    } else {
      history.push(ROUTES_V2.TEACHER_TEST_PREVIEW)
      dispatch(createTestDetails({ ...selector, isPreviewed: true }))
    }
  }

  useEffect(() => {
    const { subjectDetails } = selector

    if (subjectDetails?.length > 0 && isAllTab) {
      const userSubjects = subjectDetails.filter(
        (item: NewSubjectDetails) =>
          item?.teacher_details?.teacher_id === user._id
      )

      if (userSubjects.length > 0) {
        const tmpData = userSubjects.map((item: any, index) => ({
          icon: item.subject_name,
          index,
          isActive: index === 0,
          name: item.subject_name,
          id: item.subject_id,
          totalQuestions: item.total_questions_for_subject
        }))

        setAllTabs(tmpData)
        setIsAllTab(false)
      }
    }
  }, [history, selector, isAllTab, user._id])

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

  const handleChapterChecked = (chapter: any) => {
    const isChecked = selectedChapters.indexOf(chapter._id)
    let tmpSelectedChapter = [...selectedChapters]
    if (isChecked !== -1) {
      tmpSelectedChapter = tmpSelectedChapter.filter((id) => id !== chapter._id)
    } else {
      tmpSelectedChapter.push(chapter._id)
    }

    setSelectedChapters(tmpSelectedChapter)

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

  const handleChildChaptersChecked = (childOptions: SubTopicsDetails) => {
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
    getQuestions(tmpSelectedTopics, 'Topic')
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
              selectedUnit={selectedUnit}
              topics={topics}
              isChapterAPILoading={isChapterAPILoading}
              handleUnitChecked={handleUnitSelection}
              handleChapterChecked={handleChapterChecked}
              handleGetQuestionsAPI={handleGetQuestionsAPI}
              isQuestionAPILoading={isQuestionAPILoading}
              allTabs={allTabs}
              isTopicsLoading={isTopicsLoading}
              chaptersAndTopics={chapters}
              handleChildChaptersChecked={handleChildChaptersChecked}
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
              selectedChildChaptersAndTopics={selectedTopics}
              currentDifficultyLevel={currentDifficultyLevel}
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
              handleChildChaptersChecked={handleChildChaptersChecked}
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

export default TeacherAddQuestions
