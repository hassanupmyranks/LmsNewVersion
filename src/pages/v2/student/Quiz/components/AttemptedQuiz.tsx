import { useEffect, useState } from 'react'
import {
  getStudentQuizApi,
  SubmitQuizAPI
} from '../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { useHistory, useParams } from 'react-router-dom'
import {
  ButtonV2,
  Flex,
  PageContainer
} from '../../../../../components/V2/styledComponents'
import {
  Heading,
  QuestionSection,
  QuestionType,
  QuizButton,
  QuizContainer,
  QuizSec,
  Title
} from './Styledcomponents'
import QuizQuestion from './questions'
import { ReactComponent as ShopWatchIcon } from '../../../../../assets/svg/stopwatch-icon.svg'
import {
  allQuestionSubmitPayload,
  questionDataType,
  QuizDataType
} from './type'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../../const/V2/stylingVariables'
import ROUTES_V2 from '../../../../../const/V2/routes'

const AttemptedQuiz = () => {
  const params: any = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [quizData, setQuizData] = useState<QuizDataType>()
  const [testDurHours, setTestDurHours] = useState<number>(0)
  const [testDurMinutes, setTestDurMinutes] = useState<number>(0)
  const [testDurSeconds, setTestDurSeconds] = useState<number>(0)
  const [timeTaken, setTimeTaken] = useState<number>(0)
  const [selectedQuestion, setSelectedQuestion] = useState<questionDataType>()
  const [selectedQuestionNumber, setSelectedQuestionNumer] = useState<number>(1)
  const [questionList, setQuestionsList] = useState([])
  const [allQuestion, setAllQuestion] = useState<allQuestionSubmitPayload[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (questionList && questionList.length > 0) {
      let newAllQuestion: any = []
      newAllQuestion = questionList.map((que: questionDataType) => {
        return {
          answer: null,
          questionId: que.questionId?._id,
          skipped: true
        }
      })
      setAllQuestion(newAllQuestion)
    }
  }, [questionList])

  useEffect(() => {
    if (params?.id) {
      setIsLoading(true)
      getStudentQuizApi({
        quizId: params?.id
      })
        .then((response) => {
          setQuizData(response.data)
          setQuestionsList(response.data.questions)
          setSelectedQuestion(response.data.questions[0])
          setSelectedQuestionNumer(1)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [params?.id])

  useEffect(() => {
    const totalMinutes = Number(quizData?.duration)
    setTestDurHours(Math.floor(totalMinutes / 60))
    setTestDurMinutes(Math.floor(totalMinutes % 60))
    setTestDurSeconds(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTimeTaken(0)
  }, [selectedQuestion])

  useEffect(() => {
    let myInterval = setInterval(() => {
      setTimeTaken((prevState) => prevState + 1)
      setTestDurSeconds((prevState) => {
        if (prevState > 0) {
          return prevState - 1
        } else {
          setTestDurMinutes((prevStateMin) => {
            if (prevStateMin > 0) {
              return prevStateMin - 1
            } else {
              setTestDurHours((prevStateHours) => {
                if (prevStateHours > 0) {
                  return testDurHours - 1
                } else {
                  clearInterval(myInterval)
                  setTestDurSeconds(0)
                  if (
                    testDurHours === 0 &&
                    testDurMinutes === 0 &&
                    testDurSeconds === 0
                  ) {
                    handleSubmitTest()
                  }
                  return 0
                }
              })
              return testDurHours === 0 ? 0 : 59
            }
          })
          return 59
        }
      })
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDurHours])

  const handleNext = () => {
    if (questionList.length > selectedQuestionNumber) {
      setSelectedQuestionNumer(selectedQuestionNumber + 1)
      setSelectedQuestion(questionList[selectedQuestionNumber])
    }
  }

  const handlePrevious = () => {
    if (selectedQuestionNumber > 1) {
      setSelectedQuestionNumer(selectedQuestionNumber - 1)
      setSelectedQuestion(questionList[selectedQuestionNumber - 1 - 1])
    }
  }

  const handleSelectAnswer = (selectOption: any) => {
    let newAllQuestion = [...allQuestion]
    allQuestion.map((item, index) => {
      if (item.questionId === selectedQuestion?.questionId._id) {
        newAllQuestion[index] = {
          answer: selectOption.number,
          questionId: item.questionId,
          skipped: false
        }
      }
    })
    setAllQuestion(newAllQuestion)
  }

  const handleSubmitTest = () => {
    console.log(timeTaken, 'timeTaken', allQuestion)
    let newAllQuestion = allQuestion.map((item: any) => {
      // Delete answer if it's null
      if (item.answer === null) {
        delete item.answer
      }

      // Delete skipped if it's false
      if (item.skipped === false) {
        delete item.skipped
      }

      return item // Always return the modified item
    })

    setIsSubmitted(true)
    SubmitQuizAPI({
      quizId: params?.id,
      questions: JSON.stringify(newAllQuestion),
      totalTimeTaken: timeTaken
    })
      .then((res) => {
        console.log(res, 'resss')
        CustomToastMessage(res.message, 'success')
        history.push(ROUTES_V2.STUDENT_QUIZ_LIST)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubmitted(false))
  }

  return (
    <PageContainer>
      <QuizContainer>
        {isLoading && (
          <Spinner
            style={{
              width: '44px',
              height: '44px',
              color: `${BlueButton}`,
              position: 'absolute',
              top: '50%',
              left: '45%'
            }}
            animation={'border'}
          />
        )}
        {!isLoading && (
          <>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              style={{ marginLeft: '20px' }}
            >
              <QuestionType>{quizData?.name}</QuestionType>
              <QuestionType>
                {selectedQuestion?.questionType?.toLocaleUpperCase()}
              </QuestionType>

              <Flex
                direction="column"
                gap="2px"
                style={{ paddingRight: '48px', width: '116px' }}
              >
                <ShopWatchIcon />
                <Title fontSize="14px" fontWeight={700}>
                  {`${testDurHours < 10 ? `0${testDurHours}` : testDurHours}:${
                    testDurMinutes < 10 ? `0${testDurMinutes}` : testDurMinutes
                  }:${
                    testDurSeconds < 10 ? `0${testDurSeconds}` : testDurSeconds
                  }`}
                </Title>
              </Flex>
            </Flex>
            <QuestionSection>
              <QuizSec>
                <Heading> Question {selectedQuestionNumber}. </Heading>
                {selectedQuestion && (
                  <QuizQuestion
                    question={selectedQuestion}
                    allQuestion={allQuestion}
                    handleSelectAnswer={handleSelectAnswer}
                  />
                )}
              </QuizSec>
              <Flex
                gap="10px"
                justifyContent="space-between"
                style={{ width: '70%' }}
              >
                <div></div>
                <Flex gap="40px">
                  {selectedQuestionNumber == 1 ? (
                    ''
                  ) : (
                    <QuizButton onClick={() => handlePrevious()}>
                      Previous
                    </QuizButton>
                  )}
                  {questionList.length === selectedQuestionNumber ? (
                    ''
                  ) : (
                    <QuizButton onClick={() => handleNext()}>Next</QuizButton>
                  )}
                </Flex>
                <ButtonV2
                  disabled={isSubmitted}
                  onClick={() => handleSubmitTest()}
                >
                  Submit
                </ButtonV2>
              </Flex>
            </QuestionSection>
          </>
        )}
      </QuizContainer>
    </PageContainer>
  )
}

export default AttemptedQuiz
