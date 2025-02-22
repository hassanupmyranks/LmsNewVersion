import {
  WrapperCard,
  Grid,
  Flex
} from '../../../../../../components/V2/styledComponents'

import { ReactComponent as CheckIcon } from '../../../../../../assets/svg/orange-check.svg'
import { ReactComponent as TimerIcon } from '../../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../../assets/svg/skip-icon.svg'

import MathJaxWrapperStudent from '../../../MathJaxWrapperStudent/MathJax'

import BasicNumberInput from '../../../../../../components/V2/Form/BasicNumberInput'
import MathJaxWrapper from '../../../../../../components/V2/MathJaxWrapper/MathJax'
import { getReplaceInput } from '../../../../assessment/addQuestions/helper'
import { wrapEquationsWithSpan } from '../../../../../../helpers/V2/equationHelper'
import { useEffect, useRef } from 'react'
import {
  FillInTheBlank,
  OptionContainer,
  Wrapper
} from '../../../assessment/attemptTest/styledComponents'
import { ImageQuestionContainer } from '../../../assessment/analytics/analyticsStyled'
import { QuestionText } from '../../../assessment/attemptMytest/attemptedStyled'
import { TestDetailPara } from '../../../assessment/dashboard/components/styledComponents'

interface QuestionsProps {
  selectedQuestions: any
  dispatch: any
  currentQuestionAnswer: any
  allSectionsQuestion: any[]
  handleNextQuestion: (d: any) => void
  currentQuestionId: string
  timeTaken: number
}

const Questions = ({
  selectedQuestions,
  dispatch,
  currentQuestionAnswer,
  allSectionsQuestion,
  handleNextQuestion,
  currentQuestionId,
  timeTaken
}: QuestionsProps) => {
  const inputRef: any = useRef()

  useEffect(() => {
    if (selectedQuestions.type === 'fill-blank') {
      if (inputRef?.current) {
        const container: HTMLDivElement | null = inputRef.current

        if (container) {
          const inputs: HTMLInputElement[] = Array.from(
            container.querySelectorAll('input.replaceInput')
          )

          const inputValues: string[] = inputs.map((input) => input.value)

          if (
            currentQuestionAnswer?.answer &&
            currentQuestionAnswer?.answer?.length > 0
          ) {
            currentQuestionAnswer?.answer?.forEach(
              (value: any, index: number) => {
                if (inputs[index]) {
                  inputs[index].value = value
                }
              }
            )
          }

          inputs.forEach((input, index) => {
            input.addEventListener('input', (event) => {
              const newValue = (event.target as HTMLInputElement).value
              inputValues[index] = newValue

              dispatch({
                type: 'selectAnswer',
                payload: {
                  questionType: selectedQuestions?.type,
                  timeTakenForQuestion:
                    currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                  answer: inputValues,
                  status: 'answered',
                  questionId: selectedQuestions?.questionId
                }
              })
            })
          })
        }
      }
    }
  }, [selectedQuestions, currentQuestionAnswer, dispatch])

  return (
    <Wrapper>
      <WrapperCard style={{ borderRadius: '40px', height: '45vh' }}>
        <Flex
          gap="36px"
          alignItems="start"
          style={{ marginTop: '10px', paddingInline: '36px' }}
          justifyContent="space-between"
        >
          {!(selectedQuestions.type === 'fill-blank') && (
            <ImageQuestionContainer>
              {selectedQuestions?.question && (
                <QuestionText>
                  {selectedQuestions && (
                    <MathJaxWrapperStudent>
                      <p style={{ fontWeight: 'normal', lineHeight: '30px' }}>
                        <span style={{ fontWeight: 'bolder' }}>
                          {' '}
                          Question Type :&nbsp;
                        </span>
                        {selectedQuestions?.type === 'mcq'
                          ? 'MCQ'
                          : selectedQuestions?.type === 'multiple_mcq'
                          ? 'Multiple MCQ'
                          : selectedQuestions?.type === 'number-range'
                          ? 'Number Range'
                          : selectedQuestions?.type === 'assertion'
                          ? 'Assertion'
                          : selectedQuestions?.type === 'tf'
                          ? 'True/False'
                          : selectedQuestions?.type === 'number'
                          ? 'Number'
                          : selectedQuestions?.type === 'matrix'
                          ? 'Matrix'
                          : selectedQuestions?.type}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: wrapEquationsWithSpan(
                            selectedQuestions?.question
                          )
                        }}
                      />
                    </MathJaxWrapperStudent>
                  )}
                </QuestionText>
              )}
            </ImageQuestionContainer>
          )}
          <Flex direction="column" alignItems="left" style={{ width: '50%' }}>
            {(selectedQuestions.type === 'assertion' ||
              selectedQuestions.type === 'mcq' ||
              selectedQuestions.type === 'multiple_mcq') && (
              <Grid gap="16px" columns={2}>
                {selectedQuestions &&
                  selectedQuestions?.options?.map((option: any) => (
                    <OptionContainer
                      key={`${option.number}`}
                      isSelected={
                        option.number === currentQuestionAnswer.answer
                      }
                      onClick={() => {
                        let answerArray = currentQuestionAnswer?.answer || []

                        if (selectedQuestions.type === 'multiple_mcq') {
                          if (answerArray?.includes(option.number)) {
                            answerArray = answerArray.filter(
                              (item: any) => item !== option.number
                            )
                          } else {
                            answerArray.push(option.number)
                          }
                        }
                        dispatch({
                          type: 'selectAnswer',
                          payload: {
                            questionType: selectedQuestions?.type,
                            timeTakenForQuestion:
                              currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                            answer:
                              selectedQuestions.type === 'multiple_mcq'
                                ? answerArray
                                : option.number,
                            status: 'answered',
                            questionId: selectedQuestions?.questionId
                          }
                        })
                      }}
                    >
                      {option.number === currentQuestionAnswer.answer && (
                        <CheckIcon />
                      )}
                      {option && (
                        <MathJaxWrapperStudent>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: wrapEquationsWithSpan(option.option)
                            }}
                          />
                        </MathJaxWrapperStudent>
                      )}
                    </OptionContainer>
                  ))}
              </Grid>
            )}

            {selectedQuestions.type === 'number' && (
              <BasicNumberInput
                label="User Answer"
                disabled
                value={currentQuestionAnswer?.answer}
                full={true}
                onChange={(e) => {
                  const numberValue = Number(e.target.value)
                  dispatch({
                    type: 'selectAnswer',
                    payload: {
                      questionType: selectedQuestions?.type,
                      timeTakenForQuestion:
                        currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                      answer: numberValue,
                      status: 'answered',
                      questionId: selectedQuestions?.questionId
                    }
                  })
                }}
              />
            )}

            {selectedQuestions.type === 'tf' && (
              <Grid gap="16px" columns={2}>
                {[true, false]?.map((tf, index) => {
                  const isSelected = tf === currentQuestionAnswer?.answer
                  return (
                    <OptionContainer
                      isSelected={isSelected}
                      key={`id_${index}`}
                      onClick={() => {
                        dispatch({
                          type: 'selectAnswer',
                          payload: {
                            questionType: selectedQuestions?.type,
                            timeTakenForQuestion:
                              currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                            answer: tf,
                            status: 'answered',
                            questionId: selectedQuestions?.questionId
                          }
                        })
                      }}
                    >
                      {isSelected && <CheckIcon />}
                      <MathJaxWrapperStudent key={`id_${index}`}>
                        <p> {String(tf).toUpperCase()}</p>
                      </MathJaxWrapperStudent>
                    </OptionContainer>
                  )
                })}
              </Grid>
            )}

            {selectedQuestions.type === 'fill-blank' && (
              <FillInTheBlank ref={inputRef}>
                <MathJaxWrapper>
                  <h5
                    dangerouslySetInnerHTML={{
                      __html: getReplaceInput(
                        wrapEquationsWithSpan(selectedQuestions.question)
                      )
                    }}
                  />
                </MathJaxWrapper>
              </FillInTheBlank>
            )}

            {selectedQuestions.type === 'number-range' && (
              <div className="d-flex gap-3 align-items-center">
                <BasicNumberInput
                  label="From"
                  value={
                    currentQuestionAnswer?.answer !== null
                      ? currentQuestionAnswer?.answer[0]
                      : 0
                  }
                  full={true}
                  onChange={(e) => {
                    const numberValue = Number(e.target.value)
                    let tmpValue = []
                    tmpValue[0] = numberValue
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        questionType: selectedQuestions?.type,
                        timeTakenForQuestion:
                          currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                        answer: tmpValue,
                        status: 'answered',
                        questionId: selectedQuestions?.questionId
                      }
                    })
                  }}
                />
                <BasicNumberInput
                  label="To"
                  value={
                    currentQuestionAnswer?.answer !== null
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
                        questionType: selectedQuestions?.type,
                        timeTakenForQuestion:
                          currentQuestionAnswer?.timeTakenForQuestion ?? 0,
                        answer: tmpValue,
                        status: 'answered',
                        questionId: selectedQuestions?.questionId
                      }
                    })
                  }}
                />
              </div>
            )}

            {allSectionsQuestion.length !== 0 && (
              <Flex gap="44px" style={{ marginTop: '48px' }}>
                <Flex
                  style={{ cursor: 'pointer' }}
                  gap="12px"
                  onClick={() => {
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        timeTakenForQuestion:
                          (currentQuestionAnswer?.timeTakenForQuestion ?? 0) +
                          timeTaken,
                        status: 'review',
                        answer: currentQuestionAnswer?.answer,
                        questionId: selectedQuestions?.questionId
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
                    dispatch({
                      type: 'selectAnswer',
                      payload: {
                        answer: currentQuestionAnswer?.answer,
                        timeTakenForQuestion:
                          (currentQuestionAnswer?.timeTakenForQuestion ?? 0) +
                          timeTaken,
                        status: 'skip',
                        questionId: selectedQuestions?.questionId
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
