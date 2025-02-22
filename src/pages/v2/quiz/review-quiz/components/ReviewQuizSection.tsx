import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  AnsweresText,
  AttemptQuestions,
  CorrectIncorrect,
  CorrectSpan,
  DetailsWrapper,
  IncorrectSpan,
  ProfileWrapper,
  QuestionsTotal,
  QuizReview,
  ReviewQuizAttemptedSpan,
  ReviewQuizHeading,
  ReviewQuizUnAttemptedSpan,
  Scored,
  ScoredWrapper,
  StatusAndDate,
  StatusAndDateWrapper,
  StudentName,
  QuestionOptionContainer
} from './styledComponents'
import QuestionsQuiz from '../../create-quiz/components/QuestionsQuiz'
import { ReviewQuestion } from '../../../../../utils/types'
import moment from 'moment'

const ReviewQuizSection = ({
  Reviewed,
  type,
  questionAnswers,
  setReviewQuestion
}: {
  Reviewed: boolean
  type: string
  questionAnswers: any
  setReviewQuestion: Dispatch<SetStateAction<ReviewQuestion[]>>
}) => {
  const Attempted: any = true
  const [addQuestionsOpen, setAddQuestionsOpen] = useState<string[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [inCorrectAnswer, setInCorrectAnswer] = useState<number>(0)

  const handleOpenQuestions = (selectedId: string) => {
    const isChecked = addQuestionsOpen.indexOf(selectedId)
    const newOpenedQuestions = [...addQuestionsOpen]
    if (isChecked !== -1) {
      newOpenedQuestions.splice(isChecked, 1)
    } else {
      newOpenedQuestions.push(selectedId)
    }
    setAddQuestionsOpen(newOpenedQuestions)
  }
  useEffect(() => {
    let correctAnswer = 0
    const defaultReviewQuestion: ReviewQuestion[] =
      questionAnswers.questions?.map((question: any) => {
        return {
          questionId: question.questionId?._id,
          teacherMarks: question.marks,
          isCorrect: Array.isArray(question.questionId.answer)
            ? question.answer.answer?.sort().join(',') ===
              question.questionId.answer?.sort().join(',')
            : question.answer.studentAnswer?.[0] ===
              question?.questionId?.answer
        }
      })
    defaultReviewQuestion?.filter(
      (question) => question.isCorrect && (correctAnswer += 1)
    )
    setCorrectAnswer(questionAnswers?.totalCorrectAnswers)
    setInCorrectAnswer(questionAnswers?.totalInCorrectAnswers)
    setReviewQuestion(defaultReviewQuestion)
  }, [questionAnswers, setReviewQuestion])

  return (
    <QuizReview>
      <ReviewQuizHeading>
        {type == 'assignment' ? 'Review Assignment' : 'Review Test'}
      </ReviewQuizHeading>
      <ProfileWrapper>
        <div className="d-flex flex-column gap-1 align-items-center">
          <img
            src={questionAnswers?.studentId?.profileImage}
            alt=""
            width="100px"
            height="100px"
            style={{ borderRadius: '50%' }}
          />
          <DetailsWrapper>
            <StudentName>{questionAnswers?.studentId?.firstName}</StudentName>
            {/* <StudentNumber>
            Father’s Number {questionAnswers?.studentId?.mobile}
          </StudentNumber> */}
          </DetailsWrapper>
        </div>
        <StatusAndDateWrapper>
          {Attempted ? (
            <ReviewQuizAttemptedSpan>Attempted</ReviewQuizAttemptedSpan>
          ) : (
            <ReviewQuizUnAttemptedSpan>Un-Attempted</ReviewQuizUnAttemptedSpan>
          )}
          <StatusAndDate>
            Submitted Date -{' '}
            {moment(questionAnswers?.createAt)?.format('Do MMM, YYYY')}
          </StatusAndDate>
        </StatusAndDateWrapper>
        <ScoredWrapper>
          <Scored>Scored {questionAnswers?.scoredPercentage}</Scored>
          <AttemptQuestions>Attempted Questions</AttemptQuestions>
          <QuestionsTotal>
            {questionAnswers?.totalAttemptedQuestionsCount || 0} of{' '}
            {questionAnswers?.totalQuestions}
          </QuestionsTotal>
        </ScoredWrapper>
      </ProfileWrapper>
      <CorrectIncorrect>
        <img src={'/assets/images/incorrect.png'} alt="" width="16px" />
        <IncorrectSpan>{inCorrectAnswer} incorrect</IncorrectSpan>
        <img
          src={'/assets/images/correct.png'}
          alt=""
          width="16px"
          style={{ marginLeft: '10px' }}
        />
        <CorrectSpan>{correctAnswer} correct</CorrectSpan>
      </CorrectIncorrect>
      <AnsweresText>
        {questionAnswers.questions?.length ?? 0} answers needs your review
      </AnsweresText>
      <QuestionOptionContainer>
        {questionAnswers.questions &&
          questionAnswers.questions.length > 0 &&
          questionAnswers.questions.map((qs: any) => (
            <QuestionsQuiz
              key={`question_${qs._id}`}
              {...{
                question: qs.questionId,
                reviewQuestion: qs,
                handleOpenQuestions: handleOpenQuestions,
                addQuestionsOpen,
                setReviewQuestion,
                viewType: type,
                view: Reviewed
              }}
            />
          ))}
      </QuestionOptionContainer>
    </QuizReview>
  )
}

export default ReviewQuizSection
