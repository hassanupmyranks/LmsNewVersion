import styled from 'styled-components'
import { useEffect, useState } from 'react'
import {
  AlignHeading,
  Heading,
  PopUpContainer,
  RemoveIcon
} from '../styledComponents'
import {
  NewSubjectDetails,
  QuestionsSectionsDetails,
  RandomGenerateQuestionsDetails,
  SectionProps,
  SubjectPartsDetails
} from '../../../../utils/types'
import { CustomToastMessage } from '../../ToastMessage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { deepClone } from '../../../../pages/v2/assessment/addQuestions/helper'
import { TabsProp } from '../../../../pages/v2/assessment/addQuestions/types'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'
import QuestionsV2 from './Question/Questions'
import {
  DeleteQuestion,
  NewCreateInstituteTest
} from '../../../../helpers/V2/apis'
import { ButtonV2 } from '../../styledComponents'
import ROUTES_V2 from '../../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { Spinner } from 'react-bootstrap'

const QuestionsPopUp = ({
  setPopup,
  questions,
  allTabs,
  isUpload,
  BulkUploadData
}: {
  setPopup: (d: boolean) => void
  questions: any
  allTabs: TabsProp[]
  isUpload?: boolean
  BulkUploadData?: any
}) => {
  const dispatch = useDispatch()
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const [newQuestions, setNewQuestions] = useState(questions)
  const [addQuestionsSelected, setAddQuestionsSelected] = useState<string[]>([])
  const [addQuestionsOpen] = useState<string[]>([])
  const [subjectParts, setSubjectParts] = useState<SubjectPartsDetails[]>([])
  const [isCreatedLoading, setIsCreatedLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    if (selector?.subjectDetails && selector.subjectDetails.length > 0) {
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
          setSubjectParts(newSubjectPart)
        }
      }
    }
  }, [selector, allTabs])

  const addQuestionsList = (questionDetails: any) => {
    dispatch(
      createTestDetails({ ...selector, subjectDetails: questionDetails })
    )
  }
  let selectedQuestions: any
  const handleSelectQuestions = (selectedId: string) => {
    const isChecked = addQuestionsSelected.indexOf(selectedId)

    const newSelectedQuestionsIds =
      isChecked !== -1
        ? addQuestionsSelected.filter((id) => id !== selectedId)
        : [...addQuestionsSelected, selectedId]

    setAddQuestionsSelected(newSelectedQuestionsIds)

    if (selector?.subjectDetails && selector.subjectDetails.length > 0) {
      const newAddQuestions = newQuestions.filter(
        (question: any) => question._id === selectedId
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

  selectedQuestions = addQuestionsSelected.map((item) => {
    return { questionId: item, mark: 0 }
  })
  // const [isLoading, setIsLoading] = useState(false)

  const handleDeleteQuestions = (id: string) => {
    // setIsLoading(true)
    DeleteQuestion(id)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          const newArray = newQuestions.filter((item: any) => item._id !== id)
          setNewQuestions(newArray)
        }
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
    // .finally(() => setIsLoading(false))
  }
  // console.log(isLoading, 'isLoading')

  // const handleAction = () => {
  //   history.push(ROUTES_V2.CREATE_TEST_PREVIEW)
  //   dispatch(createTestDetails({ ...selector, isPreviewed: true }))
  // }

  const SaveTest = () => {
    setIsCreatedLoading(true)
    NewCreateInstituteTest({
      name: BulkUploadData.name,
      subjectId: BulkUploadData.subjectId,
      withoutPattern: true,
      type: BulkUploadData.type,
      isOffline: selector.isOffline,
      hasOfflineQuestions: selector.hasOfflineQuestions,
      questions: selectedQuestions ? selectedQuestions : []
    })
      .then((res) => {
        CustomToastMessage(res?.data?.message, 'success')
        history.push(ROUTES_V2.TESTS)
      })
      .catch((err) => {
        CustomToastMessage(`Error: ${err.message}`, 'error')
      })
      .finally(() => setIsCreatedLoading(false))
  }

  return (
    <>
      <PopUpContainer>
        {/* {isQuestionsKey && <PdfStudentQuestion QuestionsFiles={questions} />} */}
        <PopUpBox width={false}>
          <AlignHeading>
            <div></div>
            <Heading>Questions</Heading>
            <RemoveIcon onClick={() => setPopup(false)} />
          </AlignHeading>
          <QuestionsContainer>
            {newQuestions &&
              newQuestions.length > 0 &&
              newQuestions.map((qs: RandomGenerateQuestionsDetails) => {
                return (
                  <QuestionsV2
                    key={`question_${qs._id}`}
                    {...{
                      question: qs,
                      handleSelectQuestions: handleSelectQuestions,
                      handleDeleteQuestions,
                      addQuestionsSelected,
                      addQuestionsOpen
                    }}
                  />
                )
              })}
          </QuestionsContainer>
          {isUpload && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <ButtonV2
                // onClick={() => handleAction()}
                onClick={() => SaveTest()}
                width="300px"
              >
                {/* Preview */}
                {isCreatedLoading && (
                  <Spinner
                    style={{
                      width: '44px',
                      height: '44px',
                      color: `${BlueButton}`,
                      position: 'absolute',
                      zIndex: 1,
                      top: '50%',
                      left: '45%'
                    }}
                    animation={'border'}
                  />
                )}
                Preview & Save Test
              </ButtonV2>
            </div>
          )}
        </PopUpBox>
      </PopUpContainer>
    </>
  )
}

export default QuestionsPopUp

const PopUpBox = styled.div<{ width?: boolean }>`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  height: 90%;
  width: 80%;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;

  @media (max-width: 992px) {
    height: 90%;
    width: 95%;
  }

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    border-radius: 0px;
  }
`

export const QuestionsContainer = styled.div`
  max-height: 85%;
  overflow-y: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 5px;
`
