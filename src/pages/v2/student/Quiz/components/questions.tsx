import MathJaxWrapper from '../../../../../components/V2/MathJaxWrapper/MathJax'
import { wrapEquationsWithSpan } from '../../../../../helpers/V2/equationHelper'
import {
  Option,
  OptionContainer,
  Question,
  QuestionContainer
} from './Styledcomponents'
import { allQuestionSubmitPayload, OptionType, questionDataType } from './type'
import { getReplaceInput } from '../../../assessment/addQuestions/helper'
import BasicNumberInput from '../../../../../components/V2/Form/BasicNumberInput'
import { useEffect, useRef } from 'react'
import TextArea from '../../../../../components/V2/Form/TextArea'

const QuizQuestion = ({
  question,
  allQuestion,
  handleSelectAnswer
}: {
  question: questionDataType
  allQuestion: allQuestionSubmitPayload[]
  handleSelectAnswer: (d: any) => void
}) => {
  const inputRef: any = useRef()

  useEffect(() => {
    if (inputRef?.current) {
      const container: HTMLDivElement | null = inputRef.current
      if (container) {
        const inputs: HTMLInputElement[] = Array.from(
          container.querySelectorAll('input.replaceInput')
        )
        const inputValues: string[] = inputs.map((input) => input.value)
        inputs.forEach((input, index) => {
          input.addEventListener('input', (event) => {
            const newValue = (event.target as HTMLInputElement).value
            inputValues[index] = newValue
          })
        })
        handleSelectAnswer({ number: inputValues })
      }
    }
  }, [inputRef, handleSelectAnswer])

  return (
    <div style={{ width: '100%' }}>
      {question?.questionId?.type !== 'fill-blank' && (
        <QuestionContainer>
          <Question
            dangerouslySetInnerHTML={{
              __html: wrapEquationsWithSpan(question?.questionId?.question)
            }}
          />
          {question?.questionId?.type !== 'number' &&
            question?.questionId?.type !== 'number-range' && (
              <OptionContainer>
                {question?.questionId?.options?.map(
                  (opt: OptionType, ind: number) => (
                    <Option
                      key={`key_${ind}`}
                      active={
                        allQuestion.some(
                          (ques) =>
                            ques.questionId === question?.questionId?._id &&
                            ques.answer === opt.number
                        ) || false
                      }
                      onClick={() => handleSelectAnswer(opt)}
                      dangerouslySetInnerHTML={{
                        __html: wrapEquationsWithSpan(opt?.option)
                      }}
                    />
                  )
                )}
              </OptionContainer>
            )}
          {question?.questionId?.type === 'number' && (
            <BasicNumberInput
              label="Enter number"
              required
              value={Number(
                allQuestion.find(
                  (ques: any) => ques.questionId === question?.questionId?._id
                )?.answer
              )}
              full={true}
              onChange={(e) => {
                const numberValue = Number(e.target.value)
                handleSelectAnswer({ number: numberValue })
              }}
            />
          )}
          {question?.questionId?.type === 'number-range' && (
            <div className="d-flex gap-3 align-items-center">
              {/* First Number Input */}
              <BasicNumberInput
                label="Enter number"
                required
                value={Number(
                  allQuestion.find(
                    (ques: any) => ques.questionId === question?.questionId?._id
                  )?.answer?.[0] ?? 0
                )} // Default to 0 if answer[0] is null or undefined
                full={true}
                onChange={(e) => {
                  console.log(e, 'num')
                  const numberValue = Number(e.target.value)
                  const currentAnswer: any = allQuestion.find(
                    (ques: any) => ques.questionId === question?.questionId?._id
                  )?.answer || [0, 0]
                  let newVal = [numberValue, currentAnswer[1]] // Preserve second value
                  handleSelectAnswer({ number: newVal })
                }}
              />
              {/* Second Number Input */}
              <BasicNumberInput
                label="Enter number"
                required
                value={Number(
                  allQuestion.find(
                    (ques: any) => ques.questionId === question?.questionId?._id
                  )?.answer?.[1] ?? 0
                )} // Default to 0 if answer[1] is null or undefined
                full={true}
                onChange={(e) => {
                  const numberValue = Number(e.target.value)
                  const currentAnswer: any = allQuestion.find(
                    (ques: any) => ques.questionId === question?.questionId?._id
                  )?.answer || [0, 0]
                  let newVal = [currentAnswer[0], numberValue] // Preserve first value
                  handleSelectAnswer({ number: newVal })
                }}
              />
            </div>
          )}
        </QuestionContainer>
      )}
      {question?.questionId?.type === 'fill-blank' && (
        <QuestionContainer>
          <Question ref={inputRef}>
            <MathJaxWrapper>
              <h5
                dangerouslySetInnerHTML={{
                  __html: getReplaceInput(question?.questionId?.question)
                }}
              />
            </MathJaxWrapper>
          </Question>
        </QuestionContainer>
      )}
      {(question?.questionId?.type === 'vsa' ||
        question?.questionId?.type === 'sa') && (
        <QuestionContainer>
          <TextArea
            label="Enter your answer"
            style={{ height: '30px' }}
            required
            value={
              allQuestion.find(
                (ques) => ques.questionId === question?.questionId?._id
              )?.answer || ''
            }
            placeholder="Enter your answer"
            onChange={(e) => {
              const numberValue = e.target.value
              handleSelectAnswer({ number: numberValue })
            }}
          />
        </QuestionContainer>
      )}
    </div>
  )
}

export default QuizQuestion
