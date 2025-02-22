import {
  AddFormSections,
  DocumentSec,
  ImageQuestionContainer2,
  KeyChallengesContainer,
  MainContainer,
  OptionContainer,
  QuestionChallengesForm,
  QuestionText,
  TestTitle,
  UploadDocumentSec
} from '../analyticsStyled'
import { Flex, Grid } from '../../../../../../components/V2/styledComponents'
import { ReactComponent as CheckIcon } from '../../../../../../assets/svg/orange-check.svg'
import TextArea from './TextArea'
import { useEffect, useRef, useState } from 'react'
import SimpleButton from './SampleButton'

import { ReactComponent as DocumentFileIcon } from '../../../../../..//assets/svg/document-file-icon.svg'
import { useLocation } from 'react-router-dom'
import MathJaxWrapperStudent from '../../../MathJaxWrapperStudent/MathJax'
import { submitKeyChallenges } from '../../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../../components/V2/ToastMessage'
import BasicNumberInput from '../../../../../../components/V2/Form/BasicNumberInput'
import { FillInTheBlank } from '../../attemptTest/styledComponents'
import MathJaxWrapper from '../../../../../../components/V2/MathJaxWrapper/MathJax'
import { getReplaceInput } from '../../../../assessment/addQuestions/helper'
import { wrapEquationsWithSpan } from '../../../../../../helpers/V2/equationHelper'
import { questionsListDetails } from '../type'

const KeyChallengesQuestions = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const location: any = useLocation()
  const inputRef: any = useRef()

  const [submissionComment, setSubmissionComment] = useState('')
  const [file, setFile] = useState<File | undefined>()
  const [selectedQuestions, setSelectedQuestions] = useState<
    questionsListDetails | any
  >()
  const [isSubmit, setIsSubmit] = useState(false)
  const [courseId, setCourseId] = useState('')

  useEffect(() => {
    if (location.state) {
      setSelectedQuestions(location?.state?.selectedQuestions)
      setCourseId(location?.state?.courseId)
    } else {
      history.back()
    }
  }, [location.state])

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const submitHandler = () => {
    if (
      submissionComment &&
      file &&
      (selectedQuestions?.correctAnswer ||
        selectedQuestions?.correctAnswer === 0)
    ) {
      setIsSubmit(true)

      const newFormData: any = new FormData()
      newFormData.append('questionId', selectedQuestions?.questionId)
      newFormData.append('courseId', courseId)
      newFormData.append('studentAnswer', selectedQuestions?.correctAnswer)
      newFormData.append('answerDescription', submissionComment)
      if (file) {
        newFormData.append('file', file)
        submitKeyChallenges(newFormData)
          .then(() => {
            CustomToastMessage('Submitted successfully', 'success')
            history.back()
          })
          .catch((err) => {
            CustomToastMessage(`${err.message}`, 'error')
          })
          .finally(() => setIsSubmit(false))
      }
    }
  }

  useEffect(() => {
    if (selectedQuestions?.type === 'fill-blank') {
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
    <MainContainer>
      <Flex
        direction="column"
        alignItems="left"
        style={{ marginTop: '50px' }}
        gap="20px"
      >
        <TestTitle>Physics test </TestTitle>
        <KeyChallengesContainer>
          <ImageQuestionContainer2>
            <QuestionText>
              {selectedQuestions && (
                <MathJaxWrapperStudent>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: selectedQuestions?.question?.text
                    }}
                  />
                </MathJaxWrapperStudent>
              )}
            </QuestionText>

            <Flex direction="column" alignItems="left">
              {selectedQuestions &&
                (selectedQuestions?.type === 'assertion' ||
                  selectedQuestions?.type === 'mcq' ||
                  selectedQuestions?.type === 'multiple_mcq') && (
                  <Grid gap="16px" columns={2}>
                    {selectedQuestions.options?.map(
                      (option: any, index: number) => {
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
                              : option.v ===
                                Number(selectedQuestions.correctAnswer)
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
                                  __html: option.d?.text
                                }}
                              />
                            </MathJaxWrapperStudent>
                          </OptionContainer>
                        )
                      }
                    )}
                  </Grid>
                )}

              {selectedQuestions?.type === 'number' &&
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

              {selectedQuestions?.type === 'tf' &&
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
                            <p> {String(tf)}</p>
                          </MathJaxWrapperStudent>
                        </OptionContainer>
                      )
                    })}
                  </Grid>
                ))}

              {selectedQuestions?.type === 'fill-blank' &&
                (selectedQuestions.skipped ? (
                  <p className="text-danger"> You skipped the answer</p>
                ) : (
                  <FillInTheBlank ref={inputRef}>
                    <MathJaxWrapper>
                      <h5
                        dangerouslySetInnerHTML={{
                          __html: getReplaceInput(
                            wrapEquationsWithSpan(
                              selectedQuestions.question.text
                            )
                          )
                        }}
                      />
                    </MathJaxWrapper>
                  </FillInTheBlank>
                ))}

              {selectedQuestions?.type === 'number-range' &&
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
            </Flex>
          </ImageQuestionContainer2>

          <QuestionChallengesForm>
            <h4>Challenge Question</h4>
            <TextArea
              onChange={(e) => setSubmissionComment(e.target.value)}
              value={submissionComment}
              label=""
              placeholder="Write your notes here about your thoughts on correct answer"
            />

            <AddFormSections>
              <p>Add your proof document if required </p>
              <UploadDocumentSec>
                <DocumentSec onClick={handleFileSelect}>
                  <div>
                    <DocumentFileIcon />{' '}
                  </div>
                  <p>Document</p>
                  <input
                    type="file"
                    name="file"
                    hidden
                    ref={fileInputRef}
                    onChange={(event: any) => {
                      const { files } = event.target
                      setFile(files[0])
                    }}
                  />
                </DocumentSec>
              </UploadDocumentSec>
              {file?.name ? <span>{file?.name}</span> : ''}
            </AddFormSections>
            <div className="d-flex justify-content-end">
              <SimpleButton
                label={'Submit'}
                clickHandler={() => submitHandler()}
                disabled={isSubmit}
              />
            </div>
          </QuestionChallengesForm>
        </KeyChallengesContainer>
      </Flex>
    </MainContainer>
  )
}

export default KeyChallengesQuestions
