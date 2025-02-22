import { useEffect, useRef, useState } from 'react'
import QuestionsV2 from '../../../../../components/V2/Question/Questions'
import {
  NewSubjectDetails,
  QuestionsSectionsDetails,
  RandomGenerateQuestionsDetails,
  SectionProps,
  SubTopicsDetails,
  SubjectPartsDetails,
  SubjectTopicsDetails
} from '../../../../../utils/types'
import { difficultyLevel } from '../const'
import {
  AddQuestionsContainerHeading,
  Checkbox,
  CheckboxContainer,
  CommonSection,
  ContainerHeading,
  DifficultyLevel,
  DifficultyLevelItem,
  DifficultyLevelItemName,
  HeadAddQuestions,
  QuestionActionContainer,
  QuestionsContainer,
  SelectedQuestionsContainer
} from './styledComponents'
import ChapterAndTopicSection from './ChaptersAndTopicSection'
import { ReactComponent as CheckedSvg } from '../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../../assets/svg/un-checked-checkbox.svg'
import { RootState } from '../../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { createTestDetails } from '../../../../../redux/create_schedule_assign_test/actions'
import { deepClone } from '../helper'
import { TabsProp } from '../types'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../../const/V2/stylingVariables'
import { ButtonV2 } from '../../../../../components/V2/styledComponents'
import WarningPopUp from '../../../../../components/V2/PopUp/WarningPopup'

import debounce from 'lodash/debounce' // You need to install lodash

const DifficultyLevelContainer = ({
  units,
  selectedUnit,
  chaptersAndTopics,
  topics,
  handleChildChaptersChecked,
  handleUnitChecked,
  selectedChaptersAndTopics,
  selectedChildChaptersAndTopics,
  isTopicsLoading,
  allTabs,
  questions,
  currentDifficultyLevel,
  setCurrentDifficultyLevel,
  handleGetQuestionsAPI,
  isQuestionAPILoading,
  handleChapterChecked,
  isChapterAPILoading
}: {
  units?: any
  selectedUnit?: any
  handleUnitChecked: any
  topics?: any
  chaptersAndTopics: SubjectTopicsDetails[]
  selectedChaptersAndTopics: string[]
  selectedChildChaptersAndTopics: string[]
  handleChildChaptersChecked: (childOptions: SubTopicsDetails) => void
  handleChapterChecked: (d: any) => void
  isTopicsLoading: boolean
  allTabs: TabsProp[]
  questions: RandomGenerateQuestionsDetails[]
  currentDifficultyLevel: string
  setCurrentDifficultyLevel: (level: string) => void
  handleGetQuestionsAPI: () => void
  isQuestionAPILoading: boolean
  isChapterAPILoading: boolean
}) => {
  const containerRef: any = useRef()
  const [conformationPopup, setConformationPopup] = useState(false)

  const [subjectParts, setSubjectParts] = useState<SubjectPartsDetails[]>([])
  const [checkedSubjectPart, setCheckedSubjectPart] = useState(true)
  const [addQuestionsSelected, setAddQuestionsSelected] = useState<string[]>([])
  const [addQuestionsOpen, setAddQuestionsOpen] = useState<string[]>([])

  const [totalQuestions, setTotalQuestions] = useState(0)
  const [subjectSelectedQuestions, setSubjectSelectedQuestions] = useState(0)
  const [, setSelectedSectionQuestionsType] = useState<any>([])
  const [difficultyLevelCounting, setDifficultyLevelCounting] = useState<any>({
    All: 0,
    'Very Easy': 0,
    Easy: 0,
    Medium: 0,
    Difficult: 0,
    'Very Difficult': 0
  })

  const dispatch = useDispatch()

  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const addQuestionsList = (questionDetails: any) => {
    dispatch(
      createTestDetails({ ...selector, subjectDetails: questionDetails })
    )
  }

  const handleSelectionTab = (part: any) => {
    const newTabs: any = subjectParts.map((t) =>
      t.id === part.id
        ? { ...t, isSelected: true }
        : { ...t, isSelected: false }
    )

    setSubjectParts(newTabs)

    const activeTab: any = allTabs.find((tabs) => tabs.isActive)
    const selectedSubject: any = selector.subjectDetails.find(
      (details: NewSubjectDetails) => details.subject_name === activeTab.name
    )
    let tmp_question_type: any = []
    selectedSubject.sections.forEach((section: any) => {
      if (section.section_name === part.part) {
        tmp_question_type = section.question_type
      }
    })
    setSelectedSectionQuestionsType(tmp_question_type)
  }

  useEffect(() => {
    setCheckedSubjectPart(true)
  }, [allTabs])

  useEffect(() => {
    if (
      checkedSubjectPart &&
      selector?.subjectDetails &&
      selector.subjectDetails.length > 0
    ) {
      const activeTab = allTabs.find((tabs) => tabs.isActive)
      if (activeTab) {
        const selectedSubject: any = selector.subjectDetails.find(
          (details: NewSubjectDetails) =>
            details.subject_name === activeTab.name
        )

        if (selectedSubject) {
          const newSubjectPart = selectedSubject.sections.map(
            (section: SectionProps, index: number) => ({
              id: index + 1,
              part: section?.section_name,
              subject: selectedSubject.subject_name,
              isSelected: index === 0
            })
          )
          setCheckedSubjectPart(false)
          setSubjectParts(newSubjectPart)
          let firstSelectedSection: any = newSubjectPart.find(
            (section: any) => section.isSelected
          )
          let tmp_question_type: any = []
          selectedSubject.sections.map((section: any) => {
            if (section.section_name === firstSelectedSection.part) {
              tmp_question_type = section.question_type
            }
          })
          setSelectedSectionQuestionsType(tmp_question_type)
        }
      }
    }
  }, [selector, allTabs, checkedSubjectPart])

  useEffect(() => {
    const tempAllSelectedQuestions =
      selector?.subjectDetails?.flatMap((subject) =>
        subject.sections?.flatMap((section: any) =>
          section.questions_list.map(
            (question: RandomGenerateQuestionsDetails) => question._id
          )
        )
      ) || []
    setAddQuestionsSelected(tempAllSelectedQuestions)
  }, [selector])

  const handleSelectQuestions = (selectedId: string) => {
    const isChecked = addQuestionsSelected.indexOf(selectedId)

    const newSelectedQuestionsIds =
      isChecked !== -1
        ? addQuestionsSelected.filter((id) => id !== selectedId)
        : [...addQuestionsSelected, selectedId]

    setAddQuestionsSelected(newSelectedQuestionsIds)

    if (selector?.subjectDetails && selector.subjectDetails.length > 0) {
      const newAddQuestions = questions.filter(
        (question) => question._id === selectedId
      )

      const newAddQuestionsIds = newSelectedQuestionsIds.filter(
        (id) => id === selectedId
      )

      const newDetails = deepClone(selector.subjectDetails)

      if (newDetails) {
        newDetails.forEach((item: NewSubjectDetails) => {
          const activeTab = allTabs.find((tabs) => tabs.isActive)

          if (
            activeTab &&
            activeTab.name === item?.subject_name &&
            item?.sections &&
            item?.sections.length > 0
          ) {
            item.sections.forEach((sectionItem: QuestionsSectionsDetails) => {
              const selectedPart = subjectParts.find(
                (part) =>
                  part.isSelected && part.part === sectionItem.section_name
              )

              if (selectedPart) {
                const updatedQuestionsList =
                  newAddQuestionsIds.length !== 0
                    ? sectionItem.questions_list.concat(newAddQuestions)
                    : sectionItem.questions_list.filter(
                        ({ _id }: RandomGenerateQuestionsDetails) =>
                          _id !== selectedId
                      )
                const partTotalQuestions =
                  sectionItem?.questions_to - sectionItem?.questions_from + 1
                if (
                  updatedQuestionsList.length <=
                    item.total_questions_for_subject &&
                  updatedQuestionsList.length <= partTotalQuestions
                ) {
                  sectionItem.questions_list = updatedQuestionsList
                  sectionItem.total_questions_for_section =
                    updatedQuestionsList.length
                  item.are_all_questions_added_for_subject = true
                } else {
                  item.are_all_questions_added_for_subject = true
                  CustomToastMessage(
                    `Max allowed ${partTotalQuestions} questions from ${sectionItem.section_name} `,
                    'error'
                  )
                  const newSelectedQuestionsIds = addQuestionsSelected.filter(
                    (id) => id !== selectedId
                  )
                  setAddQuestionsSelected(newSelectedQuestionsIds)
                }
              }
            })
          }
        })

        addQuestionsList(newDetails)
      }
    }
  }

  useEffect(() => {
    if (selector.subjectDetails && selector.subjectDetails.length > 0) {
      const newDetails = deepClone(selector.subjectDetails)
      const activeSubject: any = allTabs.find((tabs) => tabs.isActive)

      const newDifficultyLevelCounting = {
        All: 0,
        'Very Easy': 0,
        Easy: 0,
        Medium: 0,
        Difficult: 0,
        'Very Difficult': 0
      }

      newDetails.forEach((item: NewSubjectDetails) => {
        if (
          activeSubject?.name === item?.subject_name &&
          item?.sections &&
          item?.sections?.length > 0
        ) {
          setTotalQuestions(item.total_questions_for_subject)

          let QuestionsLength = 0

          item?.sections?.forEach((sectionItem: QuestionsSectionsDetails) => {
            sectionItem?.questions_list?.forEach(
              (question: RandomGenerateQuestionsDetails) => {
                switch (question.difficulty) {
                  case '1':
                    newDifficultyLevelCounting['Very Easy'] += 1
                    break
                  case '2':
                    newDifficultyLevelCounting.Easy += 1
                    break
                  case '3':
                    newDifficultyLevelCounting.Medium += 1
                    break
                  case '4':
                    newDifficultyLevelCounting.Difficult += 1
                    break
                  case '5':
                    newDifficultyLevelCounting['Very Difficult'] += 1
                    break
                  case null:
                    newDifficultyLevelCounting['Very Easy'] += 1
                    break
                  default:
                    break
                }
              }
            )

            QuestionsLength += sectionItem?.questions_list?.length
            newDifficultyLevelCounting.All = QuestionsLength
          })

          setDifficultyLevelCounting(newDifficultyLevelCounting)
          setSubjectSelectedQuestions(QuestionsLength)
        }
      })
    }
  }, [selector.subjectDetails, allTabs])

  const handleOpenQuestions = (selectedId: string) => {
    const isChecked = addQuestionsOpen.indexOf(selectedId)
    const newOpenedQuestions = [...addQuestionsOpen]
    if (isChecked !== -1) {
      newOpenedQuestions.splice(isChecked, 1)
    } else {
      newOpenedQuestions.push(selectedId)
    }
    setAddQuestionsOpen(newOpenedQuestions)
  }

  const debouncedScroll = useRef<any>(null)

  useEffect(() => {
    const container = containerRef.current
    // let handleGetQuestions: any = null

    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight

      if (scrollHeight < scrollTop + (clientHeight + 3)) {
        // handleGetQuestions = setTimeout(() => {
        handleGetQuestionsAPI()
        // }, 2000)
      }
    }, 1000)

    debouncedScroll.current = handleScroll

    container.addEventListener('scroll', handleScroll)

    return () => {
      // clearTimeout(handleGetQuestions)
      container.removeEventListener('scroll', handleScroll)
      debouncedScroll.current.cancel() // Cancel any pending debounced calls
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, handleGetQuestionsAPI])

  const handleRemoveQuestionsForSubject = () => {
    const newDetails = deepClone(selector?.subjectDetails || [])
    const activeTab = allTabs.find((tabs) => tabs.isActive)
    if (newDetails && activeTab?.name) {
      const updatedDetails = newDetails.map((item: NewSubjectDetails) => {
        if (
          activeTab.name === item.subject_name &&
          item.sections &&
          item.sections.length > 0
        ) {
          return {
            ...item,
            sections: item.sections.map(
              (sectionItem: QuestionsSectionsDetails) => ({
                ...sectionItem,
                questions_list: [],
                total_questions_for_section: 0
              })
            ),
            are_all_questions_added_for_subject: false
          }
        }
        return item
      })
      setConformationPopup(false)
      setAddQuestionsSelected([])
      dispatch(
        createTestDetails({ ...selector, subjectDetails: updatedDetails })
      )
    }
  }

  return (
    <>
      {conformationPopup && (
        <WarningPopUp
          text="Are you sure you want to delete all questions?"
          setIsWarning={setConformationPopup}
          onDelete={() => handleRemoveQuestionsForSubject()}
        />
      )}
      <ChapterAndTopicSection
        isChapterAPILoading={isChapterAPILoading}
        units={units}
        topics={topics}
        selectedUnits={selectedUnit}
        selectedChapters={selectedChaptersAndTopics} // Pass selected chapters here
        selectedTopics={selectedChildChaptersAndTopics} // Pass selected topics here
        handleUnitChecked={handleUnitChecked}
        isTopicsLoading={isTopicsLoading}
        chaptersAndTopics={chaptersAndTopics}
        handleChildChaptersChecked={handleChildChaptersChecked}
        selectedChildChaptersAndTopics={selectedChildChaptersAndTopics}
        handleChapterChecked={handleChapterChecked}
      />
      <QuestionActionContainer>
        <CommonSection>
          <ContainerHeading>
            <h3>
              Difficulty <p>(Set Difficulty for the questions)</p>
            </h3>
            {selector.isEdit && (
              <ButtonV2 onClick={() => setConformationPopup(true)}>
                Remove All
              </ButtonV2>
            )}
          </ContainerHeading>
          <DifficultyLevel>
            {difficultyLevel.map((difficultyLevel) => (
              <DifficultyLevelItem
                isActivated={
                  currentDifficultyLevel === difficultyLevel.level_id
                }
                key={`difficulty_level_item_${difficultyLevel.level_id}`}
              >
                <span
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => {
                    setCurrentDifficultyLevel(difficultyLevel.level_id)
                  }}
                  onClick={() => {
                    setCurrentDifficultyLevel(difficultyLevel.level_id)
                  }}
                >
                  &nbsp;
                </span>
                <DifficultyLevelItemName>
                  {difficultyLevel.level} (
                  {difficultyLevelCounting[difficultyLevel.level]})
                </DifficultyLevelItemName>
              </DifficultyLevelItem>
            ))}
          </DifficultyLevel>
        </CommonSection>
        {selector.isPreviewed &&
          selector?.subjectDetails?.some((subject) => {
            // Check if there's at least one selected section with questions in it
            return subject?.sections?.some((section: any) => {
              const selectedSection = subjectParts?.find(
                (s: any) => s?.isSelected && s?.part === section?.section_name
              )
              return selectedSection && section?.questions_list?.length > 0
            })
          }) && (
            <CommonSection>
              <AddQuestionsContainerHeading>
                <HeadAddQuestions>
                  <h3>Selected Questions</h3>
                  <CheckboxContainer>
                    {subjectParts &&
                      subjectParts?.length > 0 &&
                      subjectParts?.map((item) => (
                        <Checkbox
                          key={`subject_part_${item.id}`}
                          onClick={() => {
                            handleSelectionTab(item)
                          }}
                        >
                          {item.isSelected ? <CheckedSvg /> : <UnCheckedSvg />}
                          <span>
                            {' '}
                            {item.subject} - {item.part}
                          </span>
                        </Checkbox>
                      ))}
                  </CheckboxContainer>
                </HeadAddQuestions>
                <p>
                  Selected - {subjectSelectedQuestions} of {totalQuestions || 0}
                </p>
              </AddQuestionsContainerHeading>
              <SelectedQuestionsContainer>
                {selector?.subjectDetails &&
                  selector?.subjectDetails.length > 0 &&
                  selector?.subjectDetails?.map(
                    (subject: NewSubjectDetails) => {
                      const activeSubject = allTabs.find(
                        (tabs) =>
                          tabs.isActive && tabs.name === subject.subject_name
                      )
                      if (!activeSubject) return null // Render nothing if the active subject doesn't match
                      return subject?.sections?.flatMap(
                        (questionArr: SectionProps) => {
                          const selectedSection = subjectParts?.find(
                            (section: any) =>
                              section.isSelected &&
                              section.part === questionArr.section_name
                          )
                          if (selectedSection) {
                            return questionArr?.questions_list?.map(
                              (
                                question: RandomGenerateQuestionsDetails,
                                questionIndex: number
                              ) => (
                                <QuestionsV2
                                  key={`question_${questionIndex}`}
                                  {...{
                                    question,
                                    handleSelectQuestions,
                                    handleOpenQuestions,
                                    addQuestionsSelected,
                                    addQuestionsOpen
                                  }}
                                />
                              )
                            )
                          }
                          return null // Return null if the selected section is not found
                        }
                      )
                    }
                  )}
              </SelectedQuestionsContainer>
            </CommonSection>
          )}
        <CommonSection>
          <AddQuestionsContainerHeading>
            <HeadAddQuestions>
              <h3>Add Questions</h3>
              <CheckboxContainer>
                {subjectParts?.length > 0 &&
                  subjectParts.map((item) => (
                    <Checkbox
                      key={`subject_part_${item.id}`}
                      onClick={() => handleSelectionTab(item)}
                    >
                      {item.isSelected ? <CheckedSvg /> : <UnCheckedSvg />}
                      <span>
                        {item.subject} - {item.part}
                      </span>
                    </Checkbox>
                  ))}
              </CheckboxContainer>
            </HeadAddQuestions>
            <p>
              Selected - {subjectSelectedQuestions} of {totalQuestions || 0}
            </p>
          </AddQuestionsContainerHeading>

          <QuestionsContainer ref={containerRef}>
            {isQuestionAPILoading ? (
              <div className="d-flex justify-content-center mt-3">
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`
                  }}
                  animation={'border'}
                />
              </div>
            ) : questions &&
              Array.isArray(questions) &&
              questions.length > 0 ? (
              questions.map((qs) => (
                <QuestionsV2
                  key={`question_${qs._id}`}
                  question={qs}
                  handleSelectQuestions={handleSelectQuestions}
                  handleOpenQuestions={handleOpenQuestions}
                  addQuestionsSelected={addQuestionsSelected}
                  addQuestionsOpen={addQuestionsOpen}
                />
              ))
            ) : (
              <h3
                className="text-center mt-4"
                style={{ color: '#aaa', fontFamily: 'DM Sans' }}
              >
                No questions available
              </h3>
            )}
          </QuestionsContainer>
        </CommonSection>
      </QuestionActionContainer>
    </>
  )
}

export default DifficultyLevelContainer
