import { useEffect, useRef, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {
  ButtonV2,
  WrapperCard
} from '../../../../components/V2/styledComponents'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import ROUTES_V2 from '../../../../const/V2/routes'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import {
  Flexx,
  HeadReviweLeft,
  HeadReviweRight,
  QuestionsContainer,
  ReviewQuizPageContainer,
  ReviweCommonHeading,
  ReviweCommonSection,
  ReviweContainerHeadingLeft,
  ReviweContainerHeadingRight,
  StudentsCardWrapper,
  StudentsReviewQuizWrapper
} from '../create-quiz/components/styledComponents'
import StudentsCard from './components/StudentsCard'
import ReviewQuizSection from './components/ReviewQuizSection'
import { ReviewQuizWrapper } from './components/styledComponents'
import { useHistory, useLocation } from 'react-router-dom'
import {
  getTeacherSubmittedQuizAPI,
  reviewQuiz
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { ReviewQuestion, ReviewQuizPayload } from '../../../../utils/types'
import moment from 'moment'

const ReviewQuizStudents = () => {
  const dispatch = useDispatch()
  const containerRef: any = useRef()

  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [SubmittedQuiz, setSubmittedQuiz] = useState<any>([])
  const [studentData, setStudentData] = useState<any>([])
  const [questionAnswers, setQuestionAnswers] = useState<any>(null)
  const [reviewQuestion, setReviewQuestion] = useState<ReviewQuestion[]>([])
  const [reviewQuizAttemptedAPILoading, setReviewQuizAttemptedAPILoading] =
    useState(false)

  const location: any = useLocation()
  const batchId: any = location.state && location.state.batchId
  const quizId: any = location.state && location.state.quizId
  const quizType: any = location.state && location.state.quizType
  const isReviewed: any = location.state && location.state.isReviewed

  const [isSubmittedAPILoading, setIsSubmittedAPILoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (batchId && quizId) {
      const payload = {
        batchId,
        quizId,
        viewBatchStudents: true
      }

      getTeacherSubmittedQuizAPI(payload)
        .then((res) => {
          const attemptedStudents = res
            ?.map((entry: any) =>
              entry.attemptedStudents.map((student: any) => ({
                ...student,
                quizStatus: 'Attempted'
              }))
            )
            .flat()
          const unattemptedStudents = res
            ?.map((entry: any) =>
              entry.unattemptedStudents.map((student: any) => ({
                ...student,
                quizStatus: 'Un Attempted'
              }))
            )
            .flat()
          setSubmittedQuiz(res)
          setStudentData([...attemptedStudents, ...unattemptedStudents])
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err}`, 'error')
        })
        .finally(() => setIsLoading(false))
    } else {
      history.push(ROUTES_V2.TEACHERS_REVIEW_QUIZ)
    }
  }, [batchId, quizId, history])

  useEffect(() => {
    dispatch(
      updateTopHeader(
        topHeaderValues['teacher'][ROUTES_V2.TEACHERS_REVIEW_QUIZ]
      )
    )
  }, [dispatch])

  const handleReviewStudent = (StudentID: string, Status: string) => {
    const payload = {
      studentId: StudentID,
      quizId: quizId
    }
    if (Status == 'Un Attempted') {
      CustomToastMessage('Student Un Attempted Quiz', 'error')
    } else {
      setReviewQuizAttemptedAPILoading(true)
      getTeacherSubmittedQuizAPI(payload)
        .then((res) => {
          setQuestionAnswers(res)
        })
        .catch((err) => {
          CustomToastMessage(`Error: ${err}`, 'error')
        })
        .finally(() => setReviewQuizAttemptedAPILoading(false))
    }
  }

  const handleOnClick = () => {
    // const correctAnswers = reviewQuestion.filter(
    //   (item) => item.isCorrect
    // ).length

    const payload: ReviewQuizPayload = {
      quizId: questionAnswers.quizDetails.id,
      studentId: questionAnswers.studentId._id,
      questions: reviewQuestion
      // correctAnswers: correctAnswers,
      // inCorrectAnswers: reviewQuestion.length - correctAnswers,
      // isReviewed: true,
      // scoredMarks: questionAnswers.scoredMarks,
    }
    setIsSubmittedAPILoading(true)
    reviewQuiz(payload)
      .then(() => {
        CustomToastMessage('Successfully reviewed', 'success')
        history.push(ROUTES_V2.TEACHERS_REVIEW_QUIZ)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsSubmittedAPILoading(false))
  }

  return (
    <ReviewQuizPageContainer>
      {isLoading && (
        <Spinner
          style={{
            width: '44px',
            height: '44px',
            color: `${BlueButton}`,
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            left: '45%'
          }}
          animation={'border'}
        />
      )}{' '}
      {
        <WrapperCard>
          <ReviweCommonHeading>
            <ReviweContainerHeadingLeft>
              <HeadReviweLeft>
                <h3>{SubmittedQuiz[0]?.quizName}</h3>
              </HeadReviweLeft>
              <HeadReviweLeft>
                <p>
                  {moment(SubmittedQuiz[0]?.createAt)?.format('Do MMM, YYYY')}
                </p>
              </HeadReviweLeft>
              <HeadReviweLeft>
                <p>{SubmittedQuiz[0]?.courseDetails?.name}</p>
              </HeadReviweLeft>
              <HeadReviweLeft>
                <p>{SubmittedQuiz[0]?.batchName}</p>
              </HeadReviweLeft>
            </ReviweContainerHeadingLeft>
            <ReviweContainerHeadingRight>
              <HeadReviweRight>
                <p>{SubmittedQuiz[0]?.questionType?.join(', ')}</p>
              </HeadReviweRight>
              <HeadReviweRight>
                <p>Attempted Average Score {SubmittedQuiz[0]?.averageScore}%</p>
              </HeadReviweRight>
              <HeadReviweRight>
                <p>
                  {SubmittedQuiz[0]?.attemptedStudentsCount} of{' '}
                  {SubmittedQuiz[0]?.attemptedStudentsCount +
                    SubmittedQuiz[0]?.unattemptedStudentsCount}{' '}
                  Students Attempted
                </p>
              </HeadReviweRight>
            </ReviweContainerHeadingRight>
          </ReviweCommonHeading>

          <ReviweCommonSection>
            <QuestionsContainer ref={containerRef}>
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
              <StudentsReviewQuizWrapper>
                <StudentsCardWrapper>
                  <StudentsCard
                    studentData={studentData}
                    handleReviewStudent={handleReviewStudent}
                  />
                </StudentsCardWrapper>
                <Flexx>
                  {reviewQuizAttemptedAPILoading ? (
                    <Spinner
                      style={{
                        width: '44px',
                        height: '44px',
                        color: `${BlueButton}`,
                        position: 'absolute',
                        top: '35%',
                        left: '65%'
                      }}
                      animation={'border'}
                    />
                  ) : (
                    questionAnswers && (
                      <ReviewQuizWrapper>
                        <ReviewQuizSection
                          questionAnswers={questionAnswers}
                          setReviewQuestion={setReviewQuestion}
                          type={quizType}
                          Reviewed={!isReviewed}
                        />
                      </ReviewQuizWrapper>
                    )
                  )}
                  {questionAnswers && (
                    <ButtonV2
                      disabled={isSubmittedAPILoading}
                      onClick={handleOnClick}
                    >
                      {quizType == 'assignment'
                        ? 'Assignment Reviewed'
                        : 'Test Reviewed'}
                    </ButtonV2>
                  )}
                </Flexx>
              </StudentsReviewQuizWrapper>
            </QuestionsContainer>
          </ReviweCommonSection>
        </WrapperCard>
      }
    </ReviewQuizPageContainer>
  )
}

export default ReviewQuizStudents
