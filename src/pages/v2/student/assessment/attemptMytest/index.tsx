import { Flex } from '../../../../../components/V2/styledComponents'
import { MainContainer, TestTitle, Button } from './attemptedStyled'
import Questions from './components/Questions'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { ReactComponent as ShopWatchIcon } from '../../../../../assets/svg/stopwatch-icon.svg'
import { BlueButton } from '../attemptTest/styledComponents'
import QuestionsNumber from './components/QuestionsNumber'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { Spinner } from 'react-bootstrap'
import { PrimaryBlue } from '../../../../../const/V2/stylingVariables'
import { submitPracticeTestAPI } from '../../../../../helpers/V2/apis'
import WarningSubmitPopUp from '../../../../../components/V2/PopUp/WarningSubmitPopUp'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../../const/V2/routes'
import attemptedMyQuestionReducer from './reducer'
import { Action, AnsweredQuestion, State } from './types'
import { Title } from '../dashboard/components/styledComponents'

const AttemptedMyTest = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('')

  const [selectedQuestions, setSelectedQuestions] = useState<any>({})

  const [allSectionsQuestion, setAllSectionsQuestions] = useState<any>([])
  const [isSubmitAPILoading, setIsSubmitAPILoading] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const history = useHistory()
  const [testDurHours, setTestDurHours] = useState<number>(0)
  const [testDurMinutes, setTestDurMinutes] = useState<number>(0)
  const [testDurSeconds, setTestDurSeconds] = useState<number>(0)
  const [timeTaken, setTimeTaken] = useState<number>(0)

  const myTestData = useSelector((state: RootState) => state?.myTest?.data[0])

  const initialQuestionsList = myTestData?.questionsList?.map(
    (question: any) => ({
      questionId: question._id,
      timeTakenForQuestion: 0,
      answer: null,
      status: null,
      isCorrect: false
    })
  )

  const initialState: State = {
    questionsList: initialQuestionsList
  }

  const [attemptedTestData, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(attemptedMyQuestionReducer, initialState)

  const currentQuestionAnswer = useMemo(() => {
    return attemptedTestData?.questionsList?.find(
      (question: any) => question?.questionId === currentQuestionId ?? -1
    )
  }, [attemptedTestData, currentQuestionId])

  useEffect(() => {
    if (myTestData) {
      let allQuestionsListItem: any = myTestData?.questionsList ?? []
      setCurrentQuestionId(allQuestionsListItem[0]?._id)
      setSelectedQuestions(allQuestionsListItem[0])
      setAllSectionsQuestions(allQuestionsListItem)
    }
  }, [myTestData])

  useEffect(() => {
    setTimeTaken(0)
  }, [currentQuestionId])

  useEffect(() => {
    const totalMinutes = myTestData?.duration
    setTestDurHours(Math.floor(totalMinutes / 60))
    setTestDurMinutes(Math.floor(totalMinutes % 60))
    setTestDurSeconds(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitTest = () => {
    const payload = {
      testId: myTestData?._id,
      testStartTime: String(new Date()),
      testEndTime: String(new Date()),
      duration: myTestData.duration,
      courseDetails: {
        id: myTestData.courseId
      },
      testDetails: {
        questionsList: attemptedTestData.questionsList.map(
          (question: AnsweredQuestion) => ({
            answer: question.answer,
            questionId: question.questionId,
            skipped: question.answer || question.answer === 0 ? false : true,
            timeTakenForQuestion: question.timeTakenForQuestion
          })
        )
      }
    }

    setIsSubmitAPILoading(true)
    submitPracticeTestAPI(payload)
      .then((res) => {
        setIsWarning(false)
        CustomToastMessage('Test submitted successfully', 'success')
        history.push({
          pathname: `${ROUTES_V2.STUDENT_TEST_RESULT}/${res?.data?.testId}`,
          search: `?isPracticeTest=${true}`
        })
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsSubmitAPILoading(false))
  }

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

  const handleNextQuestion = (currentQuestionId: string) => {
    const tmpAllQuestions = [...allSectionsQuestion]
    tmpAllQuestions.forEach((qs, index) => {
      if (qs._id === currentQuestionId && index < tmpAllQuestions.length - 1) {
        const nextQuestion = tmpAllQuestions[index + 1]
        setSelectedQuestions(nextQuestion)
        setCurrentQuestionId(nextQuestion._id)
      }
    })
  }

  const handlePrevQuestion = (currentQuestionId: string) => {
    const tmpAllQuestions = [...allSectionsQuestion]
    tmpAllQuestions.forEach((qs, index) => {
      if (qs._id === currentQuestionId && index > 0) {
        const nextQuestion = tmpAllQuestions[index - 1]
        setSelectedQuestions(nextQuestion)
        setCurrentQuestionId(nextQuestion._id)
      }
    })
  }

  const handleSelectQuestion = (selectedQuestionId: string) => {
    const tmpAllQuestions = [...allSectionsQuestion]
    tmpAllQuestions.forEach((qs, index) => {
      if (qs._id === selectedQuestionId) {
        const nextQuestion = tmpAllQuestions[index]
        setSelectedQuestions(nextQuestion)
        setCurrentQuestionId(nextQuestion._id)
      }
    })
  }

  const onSubmitClick = () => {
    setIsWarning(true)
  }

  const commonPayloadValues = () => ({
    questionId: currentQuestionId ?? '',
    timeTakenForQuestion:
      (currentQuestionAnswer?.timeTakenForQuestion ?? 0) + timeTaken,
    isCorrect: currentQuestionAnswer?.isCorrect
  })

  return (
    <MainContainer>
      <Flex justifyContent="space-between">
        <TestTitle>{myTestData?.testName}</TestTitle>
        <Flex
          direction="column"
          gap="2px"
          style={{ paddingRight: '48px', width: '116px' }}
        >
          <ShopWatchIcon />
          <Title fontSize="14px" fontWeight={700}>
            {`${testDurHours < 10 ? `0${testDurHours}` : testDurHours}:${
              testDurMinutes < 10 ? `0${testDurMinutes}` : testDurMinutes
            }:${testDurSeconds < 10 ? `0${testDurSeconds}` : testDurSeconds}`}
          </Title>
        </Flex>
      </Flex>

      <div style={{ position: 'relative' }}>
        <QuestionsNumber
          currentQuestionId={currentQuestionId}
          allSectionsQuestion={attemptedTestData?.questionsList}
          handleSelectQuestion={handleSelectQuestion}
        />
        {selectedQuestions && (
          <Questions
            selectedQuestions={selectedQuestions}
            dispatch={dispatch}
            allSectionsQuestion={allSectionsQuestion}
            currentQuestionAnswer={currentQuestionAnswer}
            handleNextQuestion={handleNextQuestion}
            currentQuestionId={currentQuestionId}
            timeTaken={timeTaken}
          />
        )}
      </div>
      <Flex justifyContent="space-between">
        <Button onClick={() => handlePrevQuestion(currentQuestionId)}>
          Previous
        </Button>
        {isWarning && (
          <WarningSubmitPopUp
            setIsWarning={setIsWarning}
            isLoading={isSubmitAPILoading}
            onClick={() => (!isSubmitAPILoading ? handleSubmitTest() : '')}
            text="Are you sure you want to submit this test?"
          />
        )}

        <Flex gap="18px">
          <Button
            aria-disabled={isSubmitAPILoading}
            onClick={() => (!isSubmitAPILoading ? onSubmitClick() : '')}
          >
            {isSubmitAPILoading ? (
              <Spinner
                style={{
                  height: '20px',
                  width: '20px',
                  color: `${PrimaryBlue}`
                }}
                animation={'border'}
              />
            ) : (
              <span>Submit</span>
            )}
          </Button>
          {currentQuestionId !==
            allSectionsQuestion[allSectionsQuestion.length - 1]?._id && (
            <BlueButton
              onClick={() => {
                handleNextQuestion(currentQuestionId)
                dispatch({
                  type: 'selectAnswer',
                  payload: {
                    ...commonPayloadValues(),
                    answer: currentQuestionAnswer?.answer,
                    status:
                      currentQuestionAnswer?.answer !== undefined &&
                      currentQuestionAnswer?.answer !== null
                        ? 'answered'
                        : 'skip'
                  }
                })
              }}
            >
              Next Question
            </BlueButton>
          )}
        </Flex>
      </Flex>
    </MainContainer>
  )
}

export default AttemptedMyTest
