import { useEffect, useState } from 'react'
import {
  NewSubjectDetails,
  QuestionsSectionsDetails,
  RandomGenerateQuestionsDetails
} from '../../../../../utils/types'
import {
  AddQuestionsContainerHeading,
  QuestionsContainer,
  RandomGenerateSection
} from './styledComponents'
import SingleRandomlyGeneratedQuestion from './RandomlyGenerated'
import { getNewRandomQuestionsAPI } from '../../../../../helpers/V2/apis'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { createTestDetails } from '../../../../../redux/create_schedule_assign_test/actions'
import { deepClone } from '../helper'
import { TabsProp } from '../types'
import { BlueButton } from '../../../../../const/V2/stylingVariables'
import { Spinner } from 'react-bootstrap'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'

const RandomlyGeneratedQuestions = ({
  allTabs,
  selectedChildChaptersAndTopics,
  currentDifficultyLevel,
  selectedUnit,
  selectedChapters
}: {
  allTabs: TabsProp[]
  selectedChildChaptersAndTopics: string[]
  currentDifficultyLevel: string
  selectedUnit: string[]
  selectedChapters: string[]
}) => {
  const [questions, setQuestions] = useState<RandomGenerateQuestionsDetails[]>(
    []
  )
  const [randomGenerateQuestionsOpen, setRandomGenerateQuestionsOpen] =
    useState<string[]>([])

  const [isQuestionChange, setIsQuestionChange] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false)

  const [totalQuestions, setTotalQuestions] = useState(0)
  const [subjectSelectedQuestions, setSubjectSelectedQuestions] = useState(0)

  const dispatch = useDispatch()
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const handleRemovedQuestions = (index: number) => {
    let newArray = [...questions]
    const activeSubject: any = allTabs.find((tabs) => tabs.isActive)
    let difficultyLevel = ['all']

    if (currentDifficultyLevel === '1') {
      difficultyLevel = ['very easy']
    } else if (currentDifficultyLevel === '2') {
      difficultyLevel = ['easy']
    } else if (currentDifficultyLevel === '3') {
      difficultyLevel = ['medium']
    } else if (currentDifficultyLevel === '4') {
      difficultyLevel = ['difficult']
    } else if (currentDifficultyLevel === '5') {
      difficultyLevel = ['very difficult']
    }

    let tmp_question_type: any = []
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

    getNewRandomQuestionsAPI({
      subjectId: activeSubject.id,
      noOfQuestions: 1,
      unitIds: selectedUnit,
      chapterIds: selectedChapters,
      topicIds: selectedChildChaptersAndTopics,
      difficultyLevel: difficultyLevel,
      questionTypes: tmp_question_type
    })
      .then((res) => {
        setIsQuestionChange(true)

        newArray[index] = res[0]
        setQuestions(newArray)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
  }

  const handleOpenQuestions = (selectedId: string) => {
    const isChecked = randomGenerateQuestionsOpen.indexOf(selectedId)
    const newOpenedQuestions = [...randomGenerateQuestionsOpen]
    if (isChecked !== -1) {
      newOpenedQuestions.splice(isChecked, 1)
    } else {
      newOpenedQuestions.push(selectedId)
    }
    setRandomGenerateQuestionsOpen(newOpenedQuestions)
  }

  const handleArrangeQuestions = (
    firstQuestionId: number,
    secondQuestionId: number
  ) => {
    setIsQuestionChange(true)
    let arrangeQuestions = [...questions]
    let b = arrangeQuestions[firstQuestionId]
    arrangeQuestions[firstQuestionId] = arrangeQuestions[secondQuestionId]
    arrangeQuestions[secondQuestionId] = b

    setQuestions(arrangeQuestions)
  }

  useEffect(() => {
    if (isQuestionChange && questions && questions.length > 0) {
      const newDetails = deepClone(selector?.subjectDetails || [])
      const activeTab = allTabs.find((tabs) => tabs.isActive)
      if (newDetails && activeTab?.name) {
        const updatedDetails = newDetails.map((item: NewSubjectDetails) => {
          if (
            activeTab.name === item.subject_name &&
            item.sections &&
            item.sections.length > 0
          ) {
            // let tmpQ = 0; // Counter for total questions added
            let sectionQuestions = questions // Copy of questions array to be sliced

            return {
              ...item,
              sections: item.sections.map(
                (sectionItem: QuestionsSectionsDetails) => {
                  const sectionTotalQuestions =
                    sectionItem?.questions_to - sectionItem?.questions_from + 1

                  const questionsToAdd = sectionQuestions.slice(
                    0,
                    sectionTotalQuestions
                  )

                  sectionQuestions = sectionQuestions.slice(
                    sectionTotalQuestions
                  )

                  return {
                    ...sectionItem,
                    questions_list: questionsToAdd,
                    total_questions_for_section: sectionTotalQuestions
                  }
                }
              ),
              are_all_questions_added_for_subject: true
            }
          }
          return item
        })
        dispatch(
          createTestDetails({ ...selector, subjectDetails: updatedDetails })
        )
        setIsQuestionChange(false)
      }
    }
  }, [isQuestionChange, questions, selector, dispatch, allTabs])

  useEffect(() => {
    if (selector.subjectDetails && selector.subjectDetails.length > 0) {
      const newDetails = deepClone(selector.subjectDetails)
      const activeSubject: any = allTabs.find((tabs) => tabs.isActive)

      newDetails.forEach((item: NewSubjectDetails) => {
        if (
          activeSubject.name === item?.subject_name &&
          item?.sections &&
          item?.sections.length > 0
        ) {
          setTotalQuestions(item.total_questions_for_subject)

          let QuestionsLength = 0

          item.sections.forEach((sectionItem: QuestionsSectionsDetails) => {
            QuestionsLength += sectionItem.questions_list.length
          })
          setSubjectSelectedQuestions(QuestionsLength)
        }
      })
    }
  }, [selector.subjectDetails, allTabs])

  useEffect(() => {
    const activeSubject: any = allTabs.find((tabs) => tabs.isActive)
    let tmp_question_type: any = []
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
    }

    if (activeSubject.totalQuestions && selectedUnit && !isQuestionsLoaded) {
      let difficultyLevel = ['all']

      if (currentDifficultyLevel === '1') {
        difficultyLevel = ['very_easy']
      } else if (currentDifficultyLevel === '2') {
        difficultyLevel = ['easy']
      } else if (currentDifficultyLevel === '3') {
        difficultyLevel = ['medium']
      } else if (currentDifficultyLevel === '4') {
        difficultyLevel = ['difficult']
      } else if (currentDifficultyLevel === '5') {
        difficultyLevel = ['very_difficult']
      }
      setIsLoading(true)

      let payload: any = {
        subjectId: activeSubject.id,
        noOfQuestions: activeSubject.totalQuestions,
        difficultyLevel: difficultyLevel,
        questionTypes: tmp_question_type
      }

      if (selectedChildChaptersAndTopics.length > 0) {
        payload = {
          ...payload,
          topicIds: selectedChildChaptersAndTopics
        }
      }

      if (selectedChapters.length > 0) {
        payload = {
          ...payload,
          chapterIds: selectedChapters
        }
      }
      if (selectedUnit.length > 0) {
        payload = {
          ...payload,
          unitIds: selectedUnit
        }
      }

      getNewRandomQuestionsAPI(payload)
        .then((res) => {
          setIsQuestionChange(true)
          setQuestions(res)
          if (res.length <= 0) {
            CustomToastMessage(`No Questions Available`, 'error')
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => {
          setIsLoading(false)
          setIsQuestionsLoaded(true)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allTabs,
    selectedChildChaptersAndTopics,
    isQuestionsLoaded,
    currentDifficultyLevel,
    selectedUnit,
    selectedChapters
  ])

  return (
    <>
      <RandomGenerateSection>
        <AddQuestionsContainerHeading>
          <h3>Randomly Generated</h3>
          <p>
            Selected - {subjectSelectedQuestions || 0} of {totalQuestions || 0}
          </p>
        </AddQuestionsContainerHeading>
        <QuestionsContainer>
          {isLoading && (
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
          {questions &&
            questions.length > 0 &&
            questions.map(
              (qs: RandomGenerateQuestionsDetails, index: number) => (
                <SingleRandomlyGeneratedQuestion
                  key={`question_${index}`}
                  {...{
                    question: qs,
                    index,
                    totalLength: questions.length,
                    handleOpenQuestions,
                    handleArrangeQuestions,
                    randomGenerateQuestionsOpen,
                    handleRemovedQuestions
                  }}
                />
              )
            )}
        </QuestionsContainer>
      </RandomGenerateSection>
    </>
  )
}

export default RandomlyGeneratedQuestions
