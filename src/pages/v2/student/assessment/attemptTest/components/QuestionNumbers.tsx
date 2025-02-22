import { Flex } from '../../../../../../components/V2/styledComponents'
import {
  QuestionCountDiv,
  QuestionNumber,
  SkipStatus,
  ReviewStatus
} from '../styledComponents'
import { ReactComponent as UpDownIcon } from '../../../../../../assets/svg/up-&-down-arrow.svg'
import { AllQuestionList, AnsweredQuestion, SectionPayload } from '../types'
import { Dispatch, SetStateAction } from 'react'
import { AssignedTestResponse } from '../../../../../../redux/studentV2/types'

const QuestionNumbers = ({
  allQuestions,
  showAllQuestion,
  currentQuestionId,
  setCurrentQuestionId,
  currentQuestionAnswer,
  dispatch,
  timeTaken,
  setTimeTaken,
  subjectAndSection,
  setShowAllQuestion,
  selectedSubject,
  selectedSection,
  assignedTestData
}: {
  allQuestions: Array<AllQuestionList>
  showAllQuestion: boolean
  currentQuestionId: string
  setCurrentQuestionId: Dispatch<SetStateAction<string>>
  currentQuestionAnswer: AnsweredQuestion | undefined
  dispatch?: any
  timeTaken: number
  setTimeTaken: Dispatch<SetStateAction<number>>
  subjectAndSection: SectionPayload
  setShowAllQuestion: Dispatch<SetStateAction<boolean>>
  selectedSubject: string
  selectedSection: string
  assignedTestData?: AssignedTestResponse
}) => {
  const currentSection = allQuestions
    .find((subject) => subject.subjectId === selectedSubject)
    ?.allQuestion.find(
      (subject) => subject.sectionName === selectedSection
    )?.sectionQuestion
  return (
    <QuestionCountDiv show={showAllQuestion}>
      <Flex justifyContent="center">
        <Flex
          wrap={showAllQuestion}
          justifyContent="flex-star"
          alignItems="center"
          gap="12px"
        >
          {currentSection?.map((value, index) => {
            const currRow = Math.floor(
              (currentSection?.findIndex(
                (question) => question.questionId === currentQuestionId
              ) ?? 0) / 14
            )
            const first = 14 * currRow
            const last = 14 * (currRow + 1)
            return showAllQuestion || (first <= index && index < last) ? (
              <QuestionNumber
                key={`Question_${value.questionNumber}`}
                isSelect={
                  value.questionId ===
                  currentSection?.find(
                    (question) => question.questionId === currentQuestionId
                  )?.questionId
                }
                isAnswered={
                  subjectAndSection?.questionsList?.find(
                    (question) => question?.questionId === value.questionId
                  )?.answer !== null
                }
                onClick={() => {
                  setCurrentQuestionId(value.questionId)
                  if (assignedTestData) {
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        activeSubject: selectedSubject,
                        subjectName:
                          assignedTestData.test_details.find(
                            (subject) => subject.subject_id === selectedSubject
                          )?.subject_name || '',
                        questionType:
                          assignedTestData.test_details
                            .find(
                              (subject) =>
                                subject.subject_id === selectedSubject
                            )
                            ?.sections.find(
                              (section) =>
                                section.section_name === selectedSection
                            )?.question_type || [],
                        activeSection: selectedSection,
                        questionId: currentQuestionAnswer?.questionId,
                        timeTakenForQuestion:
                          (currentQuestionAnswer?.timeTakenForQuestion ?? 0) +
                          timeTaken,
                        answer: currentQuestionAnswer?.answer,
                        status:
                          currentQuestionAnswer?.answer !== undefined
                            ? 'answered'
                            : 'visited',
                        isCorrect: assignedTestData?.test_details
                          .find(
                            (subject) => subject.subject_id === selectedSubject
                          )
                          ?.sections.find(
                            (section) =>
                              section.section_name === selectedSection
                          )
                          ?.questions_list[
                            currentSection?.findIndex(
                              (question) =>
                                question.questionId === currentQuestionId
                            ) ?? 0
                          ]?.answer?.includes?.(currentQuestionAnswer?.answer!)
                      }
                    })
                    setTimeTaken(0)
                  }
                }}
              >
                {value.questionNumber}
                {subjectAndSection?.questionsList?.find(
                  (question) => question?.questionId === value.questionId
                )?.status === 'skip' && <SkipStatus />}
                {subjectAndSection?.questionsList?.find(
                  (question) => question?.questionId === value.questionId
                )?.status === 'review' && <ReviewStatus />}
              </QuestionNumber>
            ) : (
              <></>
            )
          })}
        </Flex>
        {allQuestions.length > 14 && (
          <UpDownIcon
            style={{ cursor: 'pointer', minWidth: '40px' }}
            onClick={() => setShowAllQuestion(!showAllQuestion)}
          />
        )}
      </Flex>
    </QuestionCountDiv>
  )
}

export default QuestionNumbers
