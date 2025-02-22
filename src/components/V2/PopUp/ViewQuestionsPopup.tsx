import styled from 'styled-components'
import {
  AlignHeading,
  Heading,
  RemoveIcon,
  PopUpContainer
} from './styledComponents'
import { useEffect, useState } from 'react'
import { PdfDownload } from '../../../pages/v2/assessment/PDFDownlode/StudentQuestion'
import MathJaxWrapper from '../MathJaxWrapper/MathJax'
import MarkdownV2 from '../../../pages/v2/assessment/PDFDownlode/QuestionReader'

const ViewQuestionsPopUp = ({
  setPopup,
  data
}: {
  setPopup: (d: boolean) => void
  data: any
}) => {
  const [questions, setQuestions] = useState<any>([])
  const [testDetails, setTestDetails] = useState<any>({})

  useEffect(() => {
    const questionsList: any[] = []
    if (data) {
      data?.test_details?.forEach((item: any) => {
        item?.sections?.forEach((section: any) => {
          // Use spread operator to append questions to the questionsList
          questionsList.push(...section?.questions_list)
        })
      })
      setQuestions(questionsList)
      setTestDetails(data)
    }
  }, [data])

  console.log(questions, 'questions')
  const getAnswerText = (question: any) => {
    if (question.type === 'mcq' || question.type === 'assertion') {
      const correctOption = question.options.find(
        (option: any) => option.v === question.answer
      )
      return correctOption ? correctOption.d.text : ''
    } else if (question.type === 'multiple_mcq') {
      let newAnswer: string[] = []

      question.options.map((option: any) => {
        console.log(question.answer.includes(option.v))
        if (question.answer.includes(option.v)) {
          newAnswer.push(option.d.text)
        }
      })
      return newAnswer
    } else {
      return question.answer
    }
  }

  return (
    <>
      <PopUpContainer>
        {/* {isQuestionsKey && <PdfStudentQuestion QuestionsFiles={questions} />} */}
        <PrintPopUpBox width={false}>
          <AlignHeading>
            <div></div>
            <Heading>Questions</Heading>
            <RemoveIcon onClick={() => setPopup(false)} />
          </AlignHeading>
          {questions && questions.length > 0 && (
            <PdfDownload>
              <div id="pdfContent">
                <TwoColumnContainer>
                  {questions.map((question: any, index: any) => (
                    <div
                      className="d-flex align-items-start gap-2 question"
                      key={index}
                      style={{
                        width: '100%',
                        fontSize: '14px',
                        marginTop: '5px'
                      }}
                    >
                      <b>{index + 1}.</b>
                      <div>
                        <div className="text">
                          {question?.question?.text && (
                            <MathJaxWrapper>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: question?.question?.text
                                }}
                              />
                            </MathJaxWrapper>
                          )}
                        </div>
                        {(question.type === 'mcq' ||
                          question.type === 'multiple_mcq') && (
                          <ol type="a" className="options">
                            {question.options.map(
                              (option: any, optionIndex: any) => (
                                <li key={optionIndex}>
                                  <MathJaxWrapper>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: option.d.text
                                      }}
                                    />
                                  </MathJaxWrapper>
                                </li>
                              )
                            )}
                          </ol>
                        )}

                        {question.type === 'fill-blank' && (
                          <p>
                            Fill in the blank:
                            {question?.question?.text && (
                              <MathJaxWrapper>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: question?.question?.text
                                  }}
                                />
                              </MathJaxWrapper>
                            )}
                          </p>
                        )}
                        {testDetails?.type == 'examtype' ? (
                          ''
                        ) : (
                          <p>
                            <strong>Answer:</strong>
                            {question.type === 'multiple_mcq' ? (
                              <MarkdownV2>
                                {getAnswerText(question)
                                  .map((item: any) => item)
                                  .join(', ')}
                              </MarkdownV2>
                            ) : (
                              <MarkdownV2>
                                {getAnswerText(question) &&
                                  getAnswerText(question)}
                              </MarkdownV2>
                            )}
                          </p>
                        )}
                        {testDetails?.type == 'examtype' ? (
                          ''
                        ) : (
                          <p>
                            <strong>Solution:</strong>
                            {question.solution.text && (
                              <MathJaxWrapper>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: question.solution.text
                                  }}
                                />
                              </MathJaxWrapper>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </TwoColumnContainer>
              </div>
            </PdfDownload>
          )}
        </PrintPopUpBox>
      </PopUpContainer>
    </>
  )
}

export default ViewQuestionsPopUp

const PrintPopUpBox = styled.div<{ width?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
const TwoColumnContainer = styled.div`
  column-count: 2;
  width: 100%;
  position: relative;
  overflow-y: auto;

  /* Add border between columns */
  &::after {
    content: '';
    width: 1px;
    background-color: black;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  table {
    max-width: 100%;
  }

  img {
    max-width: 100% !important;
  }

  mjx-container {
    font-size: 14px !important;
  }

  @media (max-width: 600px) {
    column-count: 1;

    &::after {
      display: none;
    }
  }
`
