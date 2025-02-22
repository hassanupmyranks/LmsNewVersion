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
  StudentName2,
  QuestionOptionContainer
} from './styledComponents'

import moment from 'moment'
import { ReviewQuestion } from '../../../../utils/types'
import QuestionsReview from './QuestionsReview'

const ReviewSection = ({
  Reviewed,
  type,
  questionAnswers,
  setReviewQuestion
}: {
  Reviewed: boolean
  type: string
  questionAnswers?: any
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
    if (questionAnswers && questionAnswers?.answers?.length > 0) {
      const defaultReviewQuestion: ReviewQuestion[] =
        questionAnswers?.answers?.map((question: any) => {
          return {
            questionId: question.questionId,
            teacherMarks: question.marks,
            isCorrect: Array.isArray(question.answer)
              ? question.answer?.sort().join(',') ===
                question.answer?.sort().join(',')
              : question.correctAnswer?.[0] === question?.answer
          }
        })
      defaultReviewQuestion?.filter(
        (question) => question.isCorrect && (correctAnswer += 1)
      )
      setCorrectAnswer(questionAnswers?.totalCorrectAnswers)
      setInCorrectAnswer(questionAnswers?.totalIncorrectAnswers)
      setReviewQuestion(defaultReviewQuestion)
    }
  }, [questionAnswers, setReviewQuestion])

  return (
    <QuizReview>
      <ReviewQuizHeading>
        {type == 'assignment' ? 'Review Assignment' : 'Review Test'}
      </ReviewQuizHeading>
      <ProfileWrapper>
        <div className="d-flex flex-column gap-1 align-items-center">
          <img
            src={questionAnswers?.submittedBy?.profileImage}
            alt=""
            width="100px"
            height="100px"
            style={{ borderRadius: '50%' }}
          />
          <DetailsWrapper>
            <StudentName2>{questionAnswers?.submittedBy?.name}</StudentName2>
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
          <Scored>Scored {questionAnswers?.scoredMarks}</Scored>
          <AttemptQuestions>Attempted Questions</AttemptQuestions>
          <QuestionsTotal>
            {inCorrectAnswer + correctAnswer || 0} of{' '}
            {questionAnswers?.answers?.length || 0}
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
        {(questionAnswers?.answers && questionAnswers.answers?.length) ?? 0}{' '}
        answers needs your review
      </AnsweresText>
      <QuestionOptionContainer>
        {questionAnswers &&
          questionAnswers.answers &&
          questionAnswers.answers.length > 0 &&
          questionAnswers.answers.map((qs: any) => (
            <QuestionsReview
              key={`question_${qs.questionId}`}
              {...{
                questionId: qs.questionId,
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

export default ReviewSection
