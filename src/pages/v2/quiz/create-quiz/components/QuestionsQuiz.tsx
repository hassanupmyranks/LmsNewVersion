import styled from 'styled-components'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AddRemoveButtonV2 from '../../../../../components/V2/Button/AddRemoveButton'
import { Blue } from '../../../../../const/V2/stylingVariables'
import { OptionDetails, ReviewQuestion } from '../../../../../utils/types'
import MarkdownV2 from '../../../assessment/addQuestions/components/QuestionReader'
import { getReplaceImage } from '../helper'
import InputNumber from '../../../../../components/V2/Form/InputNumber'
import MathJaxWrapper from '../../../../../components/V2/MathJaxWrapper/MathJax'
import MaterialPopup from '../../../learn/components/MaterialPopup'
import { TextMaterialFrame } from '../../../learn/components/styledComponents'
import { Checkbox } from '../../../learn/publishMaterials/PublishTable'
import { ReactComponent as CheckedSvg } from '../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../../assets/svg/un-check-icon.svg'
import SelectButtonV2 from '../../../../../components/V2/Button/SelectButton'
import { Flex } from '../../../../../components/V2/styledComponents'

const QuestionsQuiz = ({
  question,
  viewDetail,
  reviewQuestion,
  teacherQuizQuestion,
  handleSelectQuestions,
  handleOpenQuestions,
  addQuestionsOpen,
  selectedQuestions,
  type,
  viewType,
  view,
  setReviewQuestion,
  handleQuestionMarksChange,
  questionIndex,
  page
}: {
  question: any
  reviewQuestion?: any
  viewDetail?: any
  teacherQuizQuestion?: any
  handleSelectQuestions?: (id: string, Marks: number, type: string) => void
  handleOpenQuestions?: (id: string) => void
  addQuestionsSelected?: string[]
  addQuestionsOpen?: string[]
  selectedQuestions?: any[]
  required?: boolean
  type?: string
  viewType?: string
  view?: boolean
  setReviewQuestion?: Dispatch<SetStateAction<ReviewQuestion[]>>
  handleQuestionMarksChange?:
    | ((number: number, id: string) => void | undefined)
    | undefined
  questionIndex?: number
  page?: string
}) => {
  const [Marks, setMarks] = useState<any>(1)

  const handleMarksChange = (val: any) => {
    setMarks(val)
    setReviewQuestion?.((prevState) => {
      if (Array.isArray(prevState)) {
        return prevState?.map((state) => {
          if (state.questionId === question._id) {
            return { ...state, teacherMarks: val }
          } else {
            return state
          }
        })
      } else {
        return prevState
      }
    })
  }

  const [url, setUrl] = useState('')
  const [isPdfView, setIsPdfView] = useState(false)
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 550) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }
    window.addEventListener('resize', handleResize)
    // Run once to handle initial load
    handleResize()
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <QuestionsOptionsItems
      key={`question_${question?._id}`}
      style={{ padding: selectedQuestions ? '10px 20px' : '0px' }}
    >
      {page === 'create quiz' ? (
        <QuestionType>
          Question type -{' '}
          {question?.type?.charAt(0).toUpperCase() + question?.type?.slice(1)}
        </QuestionType>
      ) : (
        <QuestionType style={{ paddingLeft: '40px' }}>
          Question type -{' '}
          {question?.type?.charAt(0).toUpperCase() + question?.type?.slice(1)}
        </QuestionType>
      )}

      <QuestionsItems>
        <Flex>
          <Flex>
            <h5 style={{ margin: '0px', padding: '0px 20px 0px 0px' }}>
              {questionIndex === 0 ? 1 : questionIndex ? questionIndex + 1 : ''}
            </h5>
          </Flex>
          {!viewDetail && handleSelectQuestions && (
            <Checkbox
              style={{ cursor: 'pointer' }}
              onClick={() =>
                handleSelectQuestions(question._id, Marks, question.type)
              }
            >
              {(selectedQuestions || []).findIndex(
                (item) => item.questionId === question._id
              ) !== -1 ? (
                <CheckedSvg />
              ) : (
                <UnCheckedSvg />
              )}
            </Checkbox>
          )}
          <QuestionOptionsItems>
            <h5>
              <MarkdownV2 maxWidth="100%" maxHeight="100%">
                {question?.question && typeof question.question === 'string'
                  ? getReplaceImage(
                      question?.question
                        // .replace(/\\/g, '')
                        // ?.replaceAll(/(?<!<)\//g, '')
                        ?.replaceAll(/<answer>/g, '____')
                        ?.replaceAll(/[{}]/g, '')
                        ?.replaceAll(/tex/g, '')
                        ?.replaceAll(/'/g, ''),
                      question?.solutionImage
                    )
                  : ''}
              </MarkdownV2>
            </h5>
          </QuestionOptionsItems>
        </Flex>
        <Actions>
          {reviewQuestion ? (
            type == 'Assignment' || viewType == 'assignment' ? (
              ''
            ) : (
              <AssignMarks>
                <InputNumber
                  required
                  value={reviewQuestion?.marks ?? 1}
                  label={view ? 'Assigned Marks' : 'Assign Marks'}
                  onChange={(e) => {
                    if (handleQuestionMarksChange) {
                      handleQuestionMarksChange(e, question._id)
                    }
                    handleMarksChange(e)
                  }}
                  showButtons={true}
                />
              </AssignMarks>
            )
          ) : viewDetail ? (
            type == 'Assignment' || viewType == 'assignment' ? (
              ''
            ) : (
              <AssignMarks>
                <InputNumber
                  value={teacherQuizQuestion?.marks}
                  label={view ? 'Assigned Marks' : 'Assign Marks'}
                  showButtons={false}
                  readOnly
                />
              </AssignMarks>
            )
          ) : type == 'Assignment' || viewType == 'assignment' ? (
            ''
          ) : (
            <AssignMarks>
              <InputNumber
                required
                value={reviewQuestion?.marks ?? 1}
                label={view ? 'Assigned Marks' : 'Assign Marks'}
                onChange={(e) => {
                  if (handleQuestionMarksChange) {
                    handleQuestionMarksChange(e, question._id)
                  }
                  handleMarksChange(e)
                }}
                showButtons={true}
              />
            </AssignMarks>
          )}
          <div style={{ display: 'flex', gap: '20px' }}>
            {!viewDetail && handleSelectQuestions && (
              <SelectButtonV2
                {...{
                  label:
                    (selectedQuestions || []).findIndex(
                      (item) => item.questionId === question._id
                    ) !== -1
                      ? 'Selected'
                      : 'Select',
                  isSelected: (selectedQuestions || []).some(
                    (item) => item.questionId === question._id
                  ),
                  onClick: () => {
                    handleSelectQuestions(question._id, Marks, question.type)
                  }
                }}
              />
            )}
            {handleOpenQuestions && (
              <AddRemoveButtonV2
                {...{
                  isSelected: addQuestionsOpen?.includes(question?._id),
                  label: 'question',
                  onClick: () => handleOpenQuestions(question?._id)
                }}
              />
            )}
          </div>
        </Actions>
      </QuestionsItems>
      <QuestionOptionContainer>
        {addQuestionsOpen && addQuestionsOpen.includes(question?._id) && (
          <>
            {question.options && question.options?.length > 0 && (
              <>
                <OptionLabel>
                  {' '}
                  <p>Options</p>
                </OptionLabel>
                <QuestionsOptions>
                  {question?.options?.map((ptn: OptionDetails, index: any) => (
                    <ChildOptions
                      key={`answer_${index}`}
                      isActive={
                        question.answer.length > 0
                          ? question?.answer?.includes(ptn.number)
                          : ptn.number === question.answer
                      }
                    >
                      <MathJaxWrapper>
                        <h3 dangerouslySetInnerHTML={{ __html: ptn?.option }} />
                        {/* <MarkdownV2>
                            {ptn?.option
                              ? getReplaceImage(
                                ptn?.option
                                  .replace(/\\/g, '')
                                  ?.replaceAll(/[{}]/g, '')
                                  ?.replaceAll(/tex/g, '')
                                  ?.replaceAll(/'/g, ''),
                                question.solutionImage
                              )
                              : ''}
                          </MarkdownV2> */}
                        {/* </h3> */}
                      </MathJaxWrapper>
                    </ChildOptions>
                  ))}
                </QuestionsOptions>
              </>
            )}

            {question.type && question?.answer && (
              <div className="mt-2">
                <ExplanationHeading>Correct Answer:</ExplanationHeading>
                <ExplanationDescription>
                  <p>
                    {question.type === 'multiple_mcq' ||
                    question.type === 'multiple_mcq_any' ? (
                      question?.answer
                        ?.map((item: any) => {
                          return question?.options[item]?.option
                        })
                        ?.join(', ')
                    ) : question.type === 'tf' ? (
                      String(question?.answer)
                    ) : question.type === 'number-range' ? (
                      question?.answer?.join(', ')
                    ) : question.type === 'mcq' ||
                      question.type === 'number' ||
                      question.type === 'assertion' ? (
                      question?.answer + 1
                    ) : question.type === 'fill-blank' ? (
                      question?.answer?.map((item: any) => (
                        <span key={`key_${item}`}>{item + 1}</span>
                      ))
                    ) : (
                      <MarkdownV2>{Number(question?.answer) + 1}</MarkdownV2>
                    )}
                  </p>
                </ExplanationDescription>
              </div>
            )}

            {question?.solution && question?.solution && (
              <QuestionsExplanation>
                <ExplanationHeading>Explanation:</ExplanationHeading>
                <ExplanationDescription>
                  <MathJaxWrapper>
                    <p
                      dangerouslySetInnerHTML={{ __html: question.solution }}
                    />
                    {/* <MarkdownV2>
                            {ptn?.option
                              ? getReplaceImage(
                                ptn?.option
                                  .replace(/\\/g, '')
                                  ?.replaceAll(/[{}]/g, '')
                                  ?.replaceAll(/tex/g, '')
                                  ?.replaceAll(/'/g, ''),
                                question.solutionImage
                              )
                              : ''}
                          </MarkdownV2> */}
                    {/* </h3> */}
                  </MathJaxWrapper>
                  {/* <p>
                    <MarkdownV2>
                      {question.solution
                        ? getReplaceImage(
                          question.solution
                            ?.replace(/\\/g, '')
                            ?.replaceAll(/<answer>/g, '____')
                            ?.replaceAll(/[{}]/g, '')
                            ?.replaceAll(/tex/g, '')
                            ?.replaceAll(/'/g, ''),
                          question.solutionImage
                        )
                        : ''}
                    </MarkdownV2>
                  </p> */}
                </ExplanationDescription>
              </QuestionsExplanation>
            )}

            <QuestionsExplanation>
              {reviewQuestion?.answer && reviewQuestion?.answer && (
                <div>
                  <ExplanationHeading>Student Answer:</ExplanationHeading>
                  <ExplanationDescription>
                    <p>
                      {question.type === 'mcq' ? (
                        Number(reviewQuestion?.answer?.studentAnswer) + 1
                      ) : question.type === 'multiple_mcq' ||
                        question.type === 'multiple_mcq_any' ? (
                        reviewQuestion?.answer?.studentAnswer
                          ?.map((item: any) => {
                            return question?.options[item].option
                          })
                          ?.join(', ')
                      ) : question.type !== 'hots' ? (
                        <MarkdownV2>
                          {reviewQuestion?.answer?.studentAnswer}
                        </MarkdownV2>
                      ) : (
                        reviewQuestion?.answer?.studentAnswer?.map(
                          (ans: any) => (
                            <MarkdownV2 key={`key_${ans.answer}`}>
                              {ans.answer}
                            </MarkdownV2>
                          )
                        )
                      )}
                      {reviewQuestion?.answer?.attachments[0] && (
                        <button
                          onClick={() => {
                            setUrl(reviewQuestion?.answer?.attachments[0])
                            setIsPdfView(true)
                          }}
                          style={{
                            border: 'none',
                            background: 'none',
                            padding: 0,
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            src={reviewQuestion?.answer?.attachments[0]}
                            alt="Review Attachment"
                            width="100px"
                            height="150px"
                          />
                        </button>
                      )}
                      {isPdfView && url !== '' && (
                        <MaterialPopup
                          width={isSmall ? '90%' : '63%'}
                          height="95%"
                          child={PdfViewer(url)}
                          onClick={() => {
                            setIsPdfView(false)
                            setUrl('')
                          }}
                        />
                      )}
                    </p>
                  </ExplanationDescription>
                </div>
              )}
            </QuestionsExplanation>

            {question?.type === 'case' &&
              question.subQuestions &&
              question.subQuestions.length > 0 &&
              question.subQuestions?.map((subQuestion: any, subInd: number) => (
                <SubQuestionsContainer key={`key_${subInd}`}>
                  <QuestionOptionsItems>
                    <h4>
                      {' '}
                      {`Q.${subInd + 1}`}
                      <MarkdownV2 maxWidth="250px">
                        {subQuestion?.question &&
                        typeof question.question === 'string'
                          ? getReplaceImage(
                              question?.question
                                ?.replaceAll(/<answer>/g, '____')
                                ?.replaceAll(/[{}]/g, '')
                                ?.replaceAll(/tex/g, '')
                                ?.replaceAll(/'/g, ''),
                              question?.solutionImage
                            )
                          : ''}
                      </MarkdownV2>
                    </h4>
                  </QuestionOptionsItems>

                  {subQuestion.options && subQuestion.options?.length > 0 && (
                    <>
                      <OptionLabel>
                        {' '}
                        <p>Options</p>
                      </OptionLabel>
                      <QuestionsOptions>
                        {subQuestion?.options?.map(
                          (ptn: OptionDetails, index: any) => (
                            <ChildOptions
                              key={`answer_${index}`}
                              isActive={
                                subQuestion.answer.length > 0
                                  ? subQuestion?.answer?.includes(ptn.number)
                                  : ptn.number === subQuestion.answer
                              }
                            >
                              <h3>
                                <MarkdownV2>
                                  {ptn?.option
                                    ? getReplaceImage(
                                        ptn?.option
                                          ?.replaceAll(/[{}]/g, '')
                                          ?.replaceAll(/tex/g, '')
                                          ?.replaceAll(/'/g, ''),
                                        subQuestion.solutionImage
                                      )
                                    : ''}
                                </MarkdownV2>
                              </h3>
                            </ChildOptions>
                          )
                        )}
                      </QuestionsOptions>
                    </>
                  )}
                  {subQuestion.type && subQuestion?.answer && (
                    <div className="mt-2">
                      <ExplanationHeading>Correct Answer:</ExplanationHeading>
                      <ExplanationDescription>
                        <p>
                          {subQuestion.type === 'multiple_mcq' ||
                          subQuestion.type === 'multiple_mcq_any' ? (
                            subQuestion?.answer
                              ?.map((item: any) => {
                                return subQuestion?.options[item]?.option
                              })
                              ?.join(', ')
                          ) : subQuestion.type === 'tf' ? (
                            String(subQuestion?.answer)
                          ) : subQuestion.type === 'number-range' ? (
                            subQuestion?.answer?.join(', ')
                          ) : subQuestion.type === 'mcq' ||
                            subQuestion.type === 'number' ||
                            subQuestion.type === 'assertion' ? (
                            subQuestion?.answer
                          ) : subQuestion.type === 'fill-blank' ? (
                            subQuestion?.answer?.map((item: any) => (
                              <span key={`key_${item}`}>{item}</span>
                            ))
                          ) : (
                            <MarkdownV2>{subQuestion?.answer}</MarkdownV2>
                          )}
                        </p>
                      </ExplanationDescription>
                    </div>
                  )}
                  {subQuestion?.solution && (
                    <QuestionsExplanation>
                      <SubExplanationHeading>
                        Explanation:
                      </SubExplanationHeading>
                      <SubExplanationDescription>
                        <p>
                          <MarkdownV2>
                            {subQuestion.solution
                              ? getReplaceImage(
                                  subQuestion.solution
                                    ?.replaceAll(/[{}]/g, '')
                                    ?.replaceAll(/tex/g, '')
                                    ?.replaceAll(/'/g, ''),
                                  subQuestion.solutionImage
                                )
                              : ''}
                          </MarkdownV2>
                        </p>
                      </SubExplanationDescription>
                    </QuestionsExplanation>
                  )}
                </SubQuestionsContainer>
              ))}
          </>
        )}
      </QuestionOptionContainer>
    </QuestionsOptionsItems>
  )
}

export default QuestionsQuiz

const PdfViewer = (selectedPdf: any) => {
  return <TextMaterialFrame src={`${selectedPdf}#toolbar=0`} loading="lazy" />
}

const QuestionsOptionsItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 0px;
  background: rgba(222, 242, 255, 0.22);
  position: relative;
`
export const QuestionType = styled.p`
  color: #197bbd;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.28px;
  padding-left: 80px;
`
const QuestionsItems = styled.div`
  font-family: DM Sans;
  letter-spacing: -0.68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`

const QuestionOptionsItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;

  h5 {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    display: flex;
    padding-left: 10px;
    gap: 10px;
    align-items: center;
    margin-bottom: 5px;
    p {
      font-size: 18px;
      font-weight: 500;
    }

    .katex .base {
      white-space: wrap !important;
      width: fit-content !important;
    }
  }

  h4 {
    color: ${Blue};
    font-size: 14px;
    font-weight: 400;
    display: flex;
    padding-left: 10px;
    gap: 10px;
    // align-items: center;
    margin-bottom: 5px;
    p {
      font-size: 14px;
      font-weight: 500;
    }

    .katex .base {
      white-space: wrap !important;
      width: fit-content !important;
    }
  }

  table p font {
    color: ${Blue};
    font-size: 18px;
    font-weight: 500;
    display: inline;
  }
`
const QuestionOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const OptionLabel = styled.div`
  p {
    font-family: DM Sans;
    font-weight: 500;
    padding-left: 10px;
    padding-bottom: 5px;
    font-size: 14px;
    color: #2b3674;
  }
`
const AssignMarks = styled.div`
  p {
    color: ${Blue};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.28px;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
`
const QuestionsOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
  padding-left: 10px;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
`

const ChildOptions = styled.div<{ isActive: boolean }>`
  min-height: 57px;
  border-radius: 16px;
  border: 1px solid;
  border-color: ${(props) =>
    props?.isActive ? 'rgba(79, 159, 128, 1)' : '#A3AED0'};
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  background: ${(props) =>
    props?.isActive ? 'rgba(230, 248, 241, 1)' : '#fff'};

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &:hover {
    border-color: rgba(79, 159, 128, 1);
    background: rgba(230, 248, 241, 1);
  }

  h3 {
    color: ${Blue};
    font-size: 14px;
    font-weight: 500;
    display: flex;
    // align-items: center;
    margin-bottom: 0px;
  }

  mjx-container[jax='CHTML'][display='true'] {
    margin: 0px !important;
  }
`

const QuestionsExplanation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

const ExplanationHeading = styled.div`
  padding-left: 10px;
  font-family: DM Sans;
  font-weight: 500;
  font-size: 15px;
  color: #2b3674;
`

const ExplanationDescription = styled.div`
  padding-left: 10px;

  p {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 15px;
    color: #2b3674;
  }

  h2 {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 15px;
    color: #2b3674;
  }

  h1 {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 15px;
    color: #2b3674;
  }

  .mb {
    margin-bottom: 10px;
  }
`

const SubQuestionsContainer = styled.div`
  padding: 5px 20px;
`

const SubExplanationHeading = styled.div`
  padding-left: 10px;
  font-family: DM Sans;
  font-weight: 500;
  font-size: 14px;
  color: #2b3674;
`

const SubExplanationDescription = styled.div`
  padding-left: 10px;

  p {
    font-family: DM Sans;
    font-weight: 500;
    font-size: 14px;
    color: #2b3674;
  }

  .mb {
    margin-bottom: 10px;
  }
`
