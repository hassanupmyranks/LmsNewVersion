import { AnsweredQuestion } from '../attemptTest/types'

// const initialState = {
//   questionsList: []
// }

const attemptedMyQuestionReducer = (state: any, action: any) => {
  const { type, payload } = action
  switch (type) {
    case 'selectAnswer': {
      const questionsList = state.questionsList.map(
        (question: AnsweredQuestion) => {
          if (question.questionId === payload.questionId) {
            return {
              ...question,
              answer: payload.answer,
              timeTakenForQuestion: payload.timeTakenForQuestion,
              status: payload.status,
              isCorrect: payload.isCorrect
            }
          }
          return question
        }
      )

      if (
        !state.questionsList.some(
          (q: AnsweredQuestion) => q.questionId === payload.questionId
        )
      ) {
        questionsList.push({
          questionId: payload.questionId,
          answer: payload.answer,
          timeTakenForQuestion: payload.timeTakenForQuestion,
          status: payload.status,
          isCorrect: payload.isCorrect
        })
      }

      return {
        ...state,
        questionsList
      }
    }
    default:
      return state
  }
}

export default attemptedMyQuestionReducer
