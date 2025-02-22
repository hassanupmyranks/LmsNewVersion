import {
  WrapperCard,
  Grid,
  Flex
} from '../../../../../../components/V2/styledComponents'
// import MarkdownV2 from '../../../../assessment/PDFDownlode/QuestionReader'
// import { getReplaceImage } from '../../../../assessment/addQuestions/helper'
import { TestDetailPara } from '../../dashboard/components/styledComponents'
import { Wrapper, OptionContainer, FillInTheBlank } from '../styledComponents'

import { ReactComponent as CheckIcon } from '../../../../../../assets/svg/orange-check.svg'
import { ReactComponent as TimerIcon } from '../../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../../assets/svg/skip-icon.svg'
import { AllQuestionList, AnsweredQuestion } from '../types'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { AssignedTestResponse } from '../../../../../../redux/studentV2/types'
import MathJaxWrapperStudent from '../../../MathJaxWrapperStudent/MathJax'
import { CustomToastMessage } from '../../../../../../components/V2/ToastMessage'
import { wrapEquationsWithSpan } from '../../../../../../helpers/V2/equationHelper'
import MathJaxWrapper from '../../../../../../components/V2/MathJaxWrapper/MathJax'
import BasicNumberInput from '../../../../../../components/V2/Form/BasicNumberInput'
import { getReplaceInput } from '../../../../assessment/addQuestions/helper'

const Questions = ({
  allQuestions,
  currentQuestionId,
  currentQuestionAnswer,
  timeTaken,
  dispatch,
  setAllQuestions,
  selectedSubject,
  selectedSection,
  assignedTestData,
  handleNextQuestion,
  newAttemptedSectionsTestData
}: {
  allQuestions: Array<AllQuestionList>
  currentQuestionId: string
  currentQuestionAnswer: AnsweredQuestion | undefined | any
  timeTaken: number
  dispatch: any
  setAllQuestions: Dispatch<SetStateAction<Array<AllQuestionList>>>
  selectedSubject: string
  selectedSection: string
  assignedTestData: AssignedTestResponse
  handleNextQuestion: (value: string) => void
  newAttemptedSectionsTestData: any
}) => {
  const inputRef: any = useRef()
  const currentSection: any = allQuestions
    .find((subject) => subject.subjectId === selectedSubject)
    ?.allQuestion.find(
      (subject) => subject.sectionName === selectedSection
    )?.sectionQuestion

  const currentQuestionsTypes: any = assignedTestData?.test_details
    .find((subject) => subject.subject_id === selectedSubject)
    ?.sections.find((section) => section.section_name === selectedSection)
    ?.questions_list.find(
      (question) => question._id === currentQuestionId
    )?.type

  let currAnswer = assignedTestData?.test_details
    .find((subject) => subject.subject_id === selectedSubject)
    ?.sections.find((section) => section.section_name === selectedSection)
    ?.questions_list.find(
      (question) => question._id === currentQuestionId
    )?.answer

  const matchingSection = [...newAttemptedSectionsTestData]
    .flatMap((subject: any) =>
      subject?.selectedSubject === selectedSubject ? subject.sections : []
    )
    .find((section2: any) => section2.sectionName === selectedSection)

  const newAnswer = matchingSection?.questionsList.find(
    (question: any) => question?.questionId === currentQuestionId
  )

  useEffect(() => {
    if (inputRef?.current) {
      const container: HTMLDivElement | null = inputRef.current

      if (container) {
        const inputs: HTMLInputElement[] = Array.from(
          container.querySelectorAll('input.replaceInput')
        )

        const inputValues: string[] = inputs.map((input) => input.value)

        // Pre-fill input values from currentQuestionAnswer if available
        if (
          currentQuestionAnswer?.answer &&
          currentQuestionAnswer.answer.length > 0
        ) {
          currentQuestionAnswer.answer.forEach((value: any, index: number) => {
            if (inputs[index]) {
              inputs[index].value = value
            }
          })
        }

        inputs.forEach((input, index) => {
          input.addEventListener('input', (event) => {
            const newValue = (event.target as HTMLInputElement).value
            inputValues[index] = newValue

            // Ensure newAnswer is defined before dispatch
            if (!newAnswer) {
              console.error('newAnswer is undefined.')
              return
            }

            dispatch({
              type: 'selectAnswer',
              payload: {
                activeSubject: selectedSubject,
                activeSection: selectedSection,
                subjectName:
                  assignedTestData.test_details.find(
                    (subject) => subject.subject_id === selectedSubject
                  )?.subject_name || '',
                questionType:
                  assignedTestData.test_details
                    .find((subject) => subject.subject_id === selectedSubject)
                    ?.sections.find(
                      (section) => section.section_name === selectedSection
                    )?.question_type || [],
                timeTakenForQuestion:
                  currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                answer: inputValues !== newAnswer?.answer ? inputValues : null,
                status: inputValues !== newAnswer?.answer ? 'answered' : null,
                questionId:
                  currentSection?.[
                    currentSection.findIndex(
                      (question: any) =>
                        question.questionId === currentQuestionId
                    ) ?? 0
                  ]?.questionId,
                isCorrect: currAnswer === inputValues
              }
            })

            setAllQuestions((prevState) =>
              prevState.map((question, index) => ({
                ...question,
                ...((currentSection.findIndex(
                  (question: any) => question.questionId === currentQuestionId
                ) ?? 0) === index && {
                  status: 'answered'
                })
              }))
            )
          })
        })
      }
    }
  }, [
    dispatch,
    setAllQuestions,
    selectedSubject,
    selectedSection,
    assignedTestData,
    currentQuestionAnswer,
    newAnswer,
    currentQuestionId,
    currentSection,
    currAnswer
  ])

  return (
    <Wrapper>
      <WrapperCard style={{ borderRadius: '40px', minHeight: '45vh' }}>
        <Flex
          gap="36px"
          style={{ marginTop: '72px', paddingInline: '36px' }}
          justifyContent="space-between"
        >
          {currentQuestionsTypes !== 'fill-blank' && (
            <div style={{ width: '50%' }}>
              <MathJaxWrapper>
                <h5
                  dangerouslySetInnerHTML={{
                    __html: getReplaceInput(
                      wrapEquationsWithSpan(
                        currentSection?.find(
                          (question: any) =>
                            question.questionId === currentQuestionId
                        )?.question
                          ? currentSection?.find(
                              (question: any) =>
                                question.questionId === currentQuestionId
                            )?.question
                          : ''
                      )
                    )
                  }}
                />
              </MathJaxWrapper>
            </div>
          )}

          <Flex
            direction="column"
            alignItems="center"
            style={
              currentQuestionsTypes !== 'fill-blank'
                ? { width: '50%' }
                : { width: '100%' }
            }
          >
            <p
              style={{
                fontFamily: 'Poppins',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '20px',
                color: '#343434',
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              {allQuestions.length !== 0 &&
                currentQuestionsTypes === 'mcq' &&
                `Select a correct answer`}
            </p>

            {currentQuestionsTypes !== 'multiple_mcq' &&
              !(currentQuestionsTypes === 'tf') && (
                <Grid gap="16px" columns={2}>
                  {currentSection
                    ?.find(
                      (question: any) =>
                        question.questionId === currentQuestionId
                    )
                    ?.options.map((value: any) => (
                      <OptionContainer
                        key={`${value.d}_${value.v}`}
                        isSelected={currentQuestionAnswer?.answer === value.v}
                        onClick={() => {
                          let currSec: any = assignedTestData?.test_details
                            .find(
                              (subject) =>
                                subject.subject_id === selectedSubject
                            )
                            ?.sections.find(
                              (section) =>
                                section.section_name === selectedSection
                            )
                          if (
                            currSec?.optional_question === 0 ||
                            matchingSection?.attemptedQuestions <
                              currSec?.optional_question ||
                            (newAnswer?.answer !== null &&
                              newAnswer?.answer !== undefined)
                          ) {
                            dispatch({
                              type: 'selectAnswer',
                              payload: {
                                activeSubject: selectedSubject,
                                activeSection: selectedSection,
                                subjectName:
                                  assignedTestData.test_details.find(
                                    (subject) =>
                                      subject.subject_id === selectedSubject
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
                                timeTakenForQuestion:
                                  currentQuestionAnswer?.timeTakenForQuestion ??
                                  0,
                                answer:
                                  value.v !== newAnswer?.answer
                                    ? value.v
                                    : null,
                                status:
                                  value.v !== newAnswer?.answer
                                    ? 'answered'
                                    : null,
                                questionId:
                                  currentSection?.[
                                    currentSection.findIndex(
                                      (question: any) =>
                                        question.questionId ===
                                        currentQuestionId
                                    ) ?? 0
                                  ].questionId,
                                isCorrect: Array.isArray(currAnswer)
                                  ? currAnswer?.includes?.(value.v)
                                  : currAnswer === value.v
                              }
                            })
                            setAllQuestions((prevState) =>
                              prevState.map((question, index) => ({
                                ...question,
                                ...((currentSection.findIndex(
                                  (question: any) =>
                                    question.questionId === currentQuestionId
                                ) ?? 0) === index && {
                                  status: 'answered'
                                })
                              }))
                            )
                          } else {
                            CustomToastMessage(
                              `You have already attempted ${currSec?.optional_question} questions. If you want to attempt this question, please deselect one of the previously attempted questions`,
                              'error'
                            )
                          }
                        }}
                      >
                        {currentQuestionAnswer?.answer === value.v && (
                          <CheckIcon />
                        )}
                        {value.d?.text && (
                          <MathJaxWrapperStudent>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: wrapEquationsWithSpan(value.d?.text)
                              }}
                            />
                          </MathJaxWrapperStudent>
                        )}
                      </OptionContainer>
                    ))}
                </Grid>
              )}

            {currentQuestionsTypes === 'multiple_mcq' && (
              <Grid gap="16px" columns={2}>
                {currentSection
                  ?.find(
                    (question: any) => question.questionId === currentQuestionId
                  )
                  ?.options.map((value: any) => (
                    <OptionContainer
                      key={`${value.d}_${value.v}`}
                      isSelected={
                        currentQuestionAnswer?.answer &&
                        currentQuestionAnswer?.answer?.includes(value.v)
                      }
                      onClick={() => {
                        let answerArray = currentQuestionAnswer?.answer || []

                        if (answerArray.includes(value.v)) {
                          answerArray = answerArray.filter(
                            (item: any) => item !== value.v
                          )
                        } else {
                          answerArray.push(value.v)
                          console.log(answerArray, 'answerArray (value added)')
                        }
                        let currSec: any = assignedTestData?.test_details
                          .find(
                            (subject) => subject.subject_id === selectedSubject
                          )
                          ?.sections.find(
                            (section) =>
                              section.section_name === selectedSection
                          )

                        if (
                          currSec?.optional_question === 0 ||
                          matchingSection.attemptedQuestions <
                            currSec?.optional_question ||
                          (newAnswer.answer !== null &&
                            newAnswer.answer !== undefined)
                        ) {
                          dispatch({
                            type: 'selectAnswer',
                            payload: {
                              activeSubject: selectedSubject,
                              activeSection: selectedSection,
                              subjectName:
                                assignedTestData.test_details.find(
                                  (subject) =>
                                    subject.subject_id === selectedSubject
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
                              timeTakenForQuestion:
                                currentQuestionAnswer?.timeTakenForQuestion ??
                                0,
                              answer: answerArray,
                              status:
                                answerArray.length <= 0 ? null : 'answered',
                              questionId:
                                currentSection?.[
                                  currentSection.findIndex(
                                    (question: any) =>
                                      question.questionId === currentQuestionId
                                  ) ?? 0
                                ].questionId,
                              isCorrect: currAnswer === answerArray
                            }
                          })
                          setAllQuestions((prevState) =>
                            prevState.map((question, index) => ({
                              ...question,
                              ...((currentSection.findIndex(
                                (question: any) =>
                                  question.questionId === currentQuestionId
                              ) ?? 0) === index && {
                                status:
                                  answerArray.length <= 0 ? null : 'answered'
                              })
                            }))
                          )
                        } else {
                          CustomToastMessage(
                            `You have already attempted ${currSec?.optional_question} questions. If you want to attempt this question, please deselect one of the previously attempted questions`,
                            'error'
                          )
                        }
                      }}
                    >
                      {currentQuestionAnswer?.answer &&
                        currentQuestionAnswer?.answer?.includes(value.v) && (
                          <CheckIcon />
                        )}
                      {value.d?.text && (
                        <MathJaxWrapperStudent>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: wrapEquationsWithSpan(value.d?.text)
                            }}
                          />
                        </MathJaxWrapperStudent>
                      )}
                    </OptionContainer>
                  ))}
              </Grid>
            )}

            {currentQuestionsTypes === 'number' && (
              <BasicNumberInput
                label="Enter number"
                required
                value={currentQuestionAnswer?.answer}
                full={true}
                onChange={(e) => {
                  const numberValue = Number(e.target.value)
                  dispatch({
                    type: 'selectAnswer',
                    payload: {
                      activeSubject: selectedSubject,
                      activeSection: selectedSection,
                      subjectName:
                        assignedTestData.test_details.find(
                          (subject) => subject.subject_id === selectedSubject
                        )?.subject_name || '',
                      questionType:
                        assignedTestData.test_details
                          .find(
                            (subject) => subject.subject_id === selectedSubject
                          )
                          ?.sections.find(
                            (section) =>
                              section.section_name === selectedSection
                          )?.question_type || [],
                      timeTakenForQuestion:
                        currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                      answer:
                        numberValue !== newAnswer.answer ? numberValue : null,
                      status:
                        numberValue !== newAnswer.answer ? 'answered' : null,
                      questionId:
                        currentSection?.[
                          currentSection.findIndex(
                            (question: any) =>
                              question.questionId === currentQuestionId
                          ) ?? 0
                        ].questionId,
                      isCorrect: currAnswer === numberValue
                    }
                  })
                  setAllQuestions((prevState) =>
                    prevState.map((question, index) => ({
                      ...question,
                      ...((currentSection.findIndex(
                        (question: any) =>
                          question.questionId === currentQuestionId
                      ) ?? 0) === index && {
                        status: 'answered'
                      })
                    }))
                  )
                }}
              />
            )}

            {currentQuestionsTypes === 'fill-blank' && (
              <FillInTheBlank ref={inputRef}>
                <MathJaxWrapper>
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: getReplaceInput(
                        wrapEquationsWithSpan(
                          currentSection?.find(
                            (question: any) =>
                              question.questionId === currentQuestionId
                          )?.question
                            ? currentSection?.find(
                                (question: any) =>
                                  question.questionId === currentQuestionId
                              )?.question
                            : ''
                        )
                      )
                    }}
                  />
                </MathJaxWrapper>
              </FillInTheBlank>
            )}

            {currentQuestionsTypes === 'number-range' && (
              <div className="d-flex gap-3 align-items-center">
                <BasicNumberInput
                  label="Enter number"
                  required
                  value={
                    currentQuestionAnswer?.answer
                      ? currentQuestionAnswer?.answer[0]
                      : 0
                  }
                  full={true}
                  onChange={(e) => {
                    console.log(e, 'num')
                    const numberValue = Number(e.target.value)
                    let tmpValue = []
                    tmpValue[0] = numberValue
                    console.log(tmpValue, 'dddddd')
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        activeSubject: selectedSubject,
                        activeSection: selectedSection,
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
                        timeTakenForQuestion:
                          currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                        answer: tmpValue[0] !== 0 ? tmpValue : null,
                        // numberValue !== newAnswer.answer ? numberValue : null,
                        status: tmpValue[0] !== 0 ? 'answered' : null,
                        questionId:
                          currentSection?.[
                            currentSection.findIndex(
                              (question: any) =>
                                question.questionId === currentQuestionId
                            ) ?? 0
                          ].questionId,
                        isCorrect: currAnswer === numberValue
                      }
                    })
                    setAllQuestions((prevState) =>
                      prevState.map((question, index) => ({
                        ...question,
                        ...((currentSection.findIndex(
                          (question: any) =>
                            question.questionId === currentQuestionId
                        ) ?? 0) === index && {
                          status: 'answered'
                        })
                      }))
                    )
                  }}
                />
                <BasicNumberInput
                  label="Enter number"
                  required
                  value={
                    currentQuestionAnswer?.answer
                      ? currentQuestionAnswer?.answer[1]
                      : 0
                  }
                  full={true}
                  onChange={(e) => {
                    const numberValue = Number(e.target.value)
                    let tmpValue: any = currentQuestionAnswer?.answer || []
                    tmpValue[1] = numberValue

                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        activeSubject: selectedSubject,
                        activeSection: selectedSection,
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
                        timeTakenForQuestion:
                          currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                        answer: tmpValue[0] !== 0 ? tmpValue : null,
                        // numberValue !== newAnswer.answer ? numberValue : null,
                        status: tmpValue[0] !== 0 ? 'answered' : null,
                        questionId:
                          currentSection?.[
                            currentSection.findIndex(
                              (question: any) =>
                                question.questionId === currentQuestionId
                            ) ?? 0
                          ].questionId,
                        isCorrect: currAnswer === numberValue
                      }
                    })
                    setAllQuestions((prevState) =>
                      prevState.map((question, index) => ({
                        ...question,
                        ...((currentSection.findIndex(
                          (question: any) =>
                            question.questionId === currentQuestionId
                        ) ?? 0) === index && {
                          status: 'answered'
                        })
                      }))
                    )
                  }}
                />
              </div>
            )}

            {currentQuestionsTypes === 'tf' && (
              <Grid gap="16px" columns={2}>
                {[true, false].map((value: any) => (
                  <OptionContainer
                    key={`key_${value}`}
                    isSelected={currentQuestionAnswer?.answer === value}
                    onClick={() => {
                      let currSec: any = assignedTestData?.test_details
                        .find(
                          (subject) => subject.subject_id === selectedSubject
                        )
                        ?.sections.find(
                          (section) => section.section_name === selectedSection
                        )
                      if (
                        currSec?.optional_question === 0 ||
                        matchingSection.attemptedQuestions <
                          currSec?.optional_question ||
                        (newAnswer.answer !== null &&
                          newAnswer.answer !== undefined)
                      ) {
                        dispatch({
                          type: 'selectAnswer',
                          payload: {
                            activeSubject: selectedSubject,
                            activeSection: selectedSection,
                            subjectName:
                              assignedTestData.test_details.find(
                                (subject) =>
                                  subject.subject_id === selectedSubject
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
                            timeTakenForQuestion:
                              currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                            answer:
                              Boolean(value) !== newAnswer.answer
                                ? Boolean(value)
                                : null,
                            status:
                              Boolean(value) !== newAnswer.answer
                                ? 'answered'
                                : null,
                            questionId:
                              currentSection?.[
                                currentSection.findIndex(
                                  (question: any) =>
                                    question.questionId === currentQuestionId
                                ) ?? 0
                              ].questionId,
                            isCorrect:
                              currAnswer === Boolean(value) ? true : false
                          }
                        })
                        setAllQuestions((prevState) =>
                          prevState.map((question, index) => ({
                            ...question,
                            ...((currentSection?.findIndex(
                              (question: any) =>
                                question.questionId === currentQuestionId
                            ) ?? 0) === index && {
                              status: 'answered'
                            })
                          }))
                        )
                      } else {
                        CustomToastMessage(
                          `You have already attempted ${currSec?.optional_question} questions. If you want to attempt this question, please deselect one of the previously attempted questions`,
                          'error'
                        )
                      }
                    }}
                  >
                    {currentQuestionAnswer?.answer === Boolean(value) && (
                      <CheckIcon />
                    )}
                    {String(value).toUpperCase()}
                  </OptionContainer>
                ))}
              </Grid>
            )}

            {allQuestions.length !== 0 && (
              <Flex gap="44px" style={{ marginTop: '48px' }}>
                <Flex
                  style={{ cursor: 'pointer' }}
                  gap="12px"
                  onClick={() => {
                    let selectedAnswer = currentQuestionAnswer?.answer
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        activeSubject: selectedSubject,
                        activeSection: selectedSection,
                        timeTakenForQuestion:
                          (currentQuestionAnswer?.timeTakenForQuestion ?? 0) +
                          timeTaken,
                        status: 'review',
                        answer: selectedAnswer,
                        questionId:
                          currentSection?.[
                            currentSection.findIndex(
                              (question: any) =>
                                question.questionId === currentQuestionId
                            ) ?? 0
                          ].questionId,
                        isCorrect: Array.isArray(currAnswer)
                          ? currAnswer?.includes?.(selectedAnswer ?? -1)
                          : currAnswer === selectedAnswer
                      }
                    })
                    handleNextQuestion(currentQuestionId)
                  }}
                >
                  <TimerIcon />
                  <TestDetailPara fontSize="14px" fontWeight={500}>
                    Review Later
                  </TestDetailPara>
                </Flex>
                <Flex
                  style={{ cursor: 'pointer' }}
                  gap="12px"
                  onClick={() => {
                    let selectedAnswer = currentQuestionAnswer?.answer
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        activeSubject: selectedSubject,
                        activeSection: selectedSection,
                        answer: currentQuestionAnswer?.answer,
                        timeTakenForQuestion:
                          (currentQuestionAnswer?.timeTakenForQuestion ?? 0) +
                          timeTaken,
                        status: 'skip',
                        questionId:
                          currentSection?.[
                            currentSection.findIndex(
                              (question: any) =>
                                question?.questionId === currentQuestionId
                            ) ?? 0
                          ].questionId,
                        isCorrect: Array.isArray(currAnswer)
                          ? currAnswer?.includes?.(selectedAnswer ?? -1)
                          : currAnswer === selectedAnswer
                      }
                    })
                    handleNextQuestion(currentQuestionId)
                  }}
                >
                  <SkipIcon />
                  <TestDetailPara fontSize="14px" fontWeight={500}>
                    Skip Question
                  </TestDetailPara>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
      </WrapperCard>
    </Wrapper>
  )
}

export default Questions
