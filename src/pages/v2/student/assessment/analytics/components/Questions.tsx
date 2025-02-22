import {
  WrapperCard,
  Grid,
  Flex
} from '../../../../../../components/V2/styledComponents'
import { FillInTheBlank, Wrapper } from '../../attemptTest/styledComponents'

import { ReactComponent as CheckIcon } from '../../../../../../assets/svg/orange-check.svg'
import {
  ExpP,
  ImageQuestionContainer,
  OptionContainer,
  QuestionText
} from '../analyticsStyled'
// import QuestionsImage from '../../../../../../assets/images/triangle-Image.png'
import { Button } from '../../dashboard/components/styledComponents'

import MathJaxWrapperStudent from '../../../MathJaxWrapperStudent/MathJax'
import { questionsListDetails } from '../type'
import BasicNumberInput from '../../../../../../components/V2/Form/BasicNumberInput'
import MathJaxWrapper from '../../../../../../components/V2/MathJaxWrapper/MathJax'
import { getReplaceInput } from '../../../../assessment/addQuestions/helper'
import { wrapEquationsWithSpan } from '../../../../../../helpers/V2/equationHelper'
import { useEffect, useRef } from 'react'

interface QuestionsProps {
  selectedQuestions: questionsListDetails
  handleKeyChallenges: (d: any) => void
}

const Questions = ({
  selectedQuestions,
  handleKeyChallenges
}: QuestionsProps) => {
  const inputRef: any = useRef()

  useEffect(() => {
    if (selectedQuestions.type === 'fill-blank') {
      if (inputRef?.current) {
        const userData = selectedQuestions.correctAnswer || []

        const container: HTMLDivElement | null = inputRef.current

        if (container) {
          const inputs: HTMLInputElement[] = Array.from(
            container.querySelectorAll('input.replaceInput')
          )

          const inputValues: string[] = inputs.map((input) => input.value)

          userData?.forEach((value: any, index: number) => {
            if (inputs[index]) {
              inputs[index].value = value
            }
          })

          inputs.forEach((input, index) => {
            input.addEventListener('input', (event) => {
              const newValue = (event.target as HTMLInputElement).value
              inputValues[index] = newValue
            })
          })
        }
      }
    }
  }, [selectedQuestions])

  return (
    <Wrapper>
      <WrapperCard style={{ borderRadius: '40px', maxHeight: '62vh' }}>
        <Flex
          gap="36px"
          alignItems="start"
          style={{ marginTop: '30px', paddingInline: '36px' }}
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
                            selectedQuestions?.question?.text
                          )
                        }}
                      />
                    </MathJaxWrapperStudent>
                  )}
                </QuestionText>
              )}
              {!selectedQuestions.skipped && (
                <Button to={`#`} onClick={handleKeyChallenges}>
                  Key Challenges
                </Button>
              )}
            </ImageQuestionContainer>
          )}
          <Flex direction="column" alignItems="left" style={{ width: '50%' }}>
            {((selectedQuestions.type !== 'assertion' &&
              selectedQuestions.type === 'assertion') ||
              selectedQuestions.type === 'mcq' ||
              selectedQuestions.type === 'multiple_mcq') && (
              <Grid gap="16px" columns={2}>
                {selectedQuestions.options?.map((option, index) => {
                  const isSelected =
                    selectedQuestions.type === 'mcq' ||
                    selectedQuestions.type === 'assertion'
                      ? option.v === Number(selectedQuestions.answer)
                      : selectedQuestions.answer.includes(option.v)

                  const isUserSelected =
                    selectedQuestions.type === 'mcq' ||
                    selectedQuestions.type === 'assertion'
                      ? selectedQuestions.skipped
                        ? false
                        : option.v === Number(selectedQuestions.correctAnswer)
                      : selectedQuestions.correctAnswer.includes(option.v)

                  const isAnswered = isUserSelected
                    ? `linear-gradient(108.91deg, #FBC088 0%, #FFAF64 112.5%)`
                    : '#65c1ff'

                  return (
                    <OptionContainer
                      isSelected={isSelected}
                      isAnswered={isAnswered}
                      key={`id_${index}`}
                    >
                      {!selectedQuestions.skipped && isUserSelected && (
                        <CheckIcon />
                      )}
                      <MathJaxWrapperStudent key={`id_${index}`}>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: wrapEquationsWithSpan(option.d?.text)
                          }}
                        />
                      </MathJaxWrapperStudent>
                    </OptionContainer>
                  )
                })}
              </Grid>
            )}

            {selectedQuestions.type === 'number' &&
              (selectedQuestions.skipped ? (
                <p className="text-danger"> You skipped the answer</p>
              ) : (
                <BasicNumberInput
                  label="User Answer"
                  disabled
                  value={selectedQuestions?.correctAnswer}
                  full={true}
                />
              ))}

            {selectedQuestions.type === 'tf' &&
              (selectedQuestions.skipped ? (
                <p className="text-danger"> You skipped the answer</p>
              ) : (
                <Grid gap="16px" columns={2}>
                  {[true, false]?.map((tf, index) => {
                    const isSelected = tf === selectedQuestions.answer
                    const isUserSelected = selectedQuestions.skipped
                      ? false
                      : selectedQuestions.correctAnswer === tf

                    const isAnswered = isUserSelected
                      ? `linear-gradient(108.91deg, #FBC088 0%, #FFAF64 112.5%)`
                      : '#65c1ff'

                    return (
                      <OptionContainer
                        isSelected={isSelected}
                        isAnswered={isAnswered}
                        key={`id_${index}`}
                      >
                        {!selectedQuestions.skipped && isUserSelected && (
                          <CheckIcon />
                        )}
                        <MathJaxWrapperStudent key={`id_${index}`}>
                          <p> {String(tf).toUpperCase()}</p>
                        </MathJaxWrapperStudent>
                      </OptionContainer>
                    )
                  })}
                </Grid>
              ))}

            {selectedQuestions.type === 'fill-blank' &&
              (selectedQuestions.skipped ? (
                <p className="text-danger"> You skipped the answer</p>
              ) : (
                <FillInTheBlank ref={inputRef}>
                  <MathJaxWrapper>
                    <h5
                      dangerouslySetInnerHTML={{
                        __html: getReplaceInput(
                          wrapEquationsWithSpan(selectedQuestions.question.text)
                        )
                      }}
                    />
                  </MathJaxWrapper>
                </FillInTheBlank>
              ))}

            {selectedQuestions.type === 'number-range' &&
              (selectedQuestions.skipped ? (
                <p className="text-danger"> You skipped the answer</p>
              ) : (
                <div className="d-flex gap-3 align-items-center">
                  <BasicNumberInput
                    label="From"
                    disabled
                    value={
                      selectedQuestions?.correctAnswer
                        ? selectedQuestions?.correctAnswer[0]
                        : 0
                    }
                    full={true}
                  />
                  <BasicNumberInput
                    label="To"
                    disabled
                    value={
                      selectedQuestions?.correctAnswer
                        ? selectedQuestions?.correctAnswer[1]
                        : 0
                    }
                    full={true}
                  />
                </div>
              ))}

            <Flex gap="44px" direction="column" style={{ marginTop: '20px' }}>
              {selectedQuestions?.solution && (
                <ExpP>
                  {' '}
                  Explanation:
                  <p>
                    <MathJaxWrapperStudent>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: wrapEquationsWithSpan(
                            selectedQuestions?.solution?.text
                          )
                        }}
                      />
                    </MathJaxWrapperStudent>
                  </p>
                </ExpP>
              )}
            </Flex>
          </Flex>
        </Flex>
      </WrapperCard>
    </Wrapper>
  )
}

export default Questions
