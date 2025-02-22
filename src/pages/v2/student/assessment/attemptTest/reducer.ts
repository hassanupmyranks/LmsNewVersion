import { AttemptedQuestion, Payload } from './types'

const attemptedQuestionReducer = (
  state: AttemptedQuestion[],
  action: { type: string; payload: Payload }
) => {
  const { type, payload } = action
  switch (type) {
    case 'selectAnswer': {
      if (state?.length) {
        return state.some(
          (item) => item.selectedSubject === payload.activeSubject
        )
          ? state?.map((ele) => ({
              ...ele,
              subjectName: payload.subjectName,
              ...(payload.activeSubject === ele.selectedSubject && {
                sections: ele.sections.some(
                  (section) => section.sectionName === payload.activeSection
                )
                  ? ele.sections.map((sec) => ({
                      ...sec,
                      questionType: payload.questionType,
                      ...(sec.sectionName === payload.activeSection && {
                        questionsList: sec.questionsList.some(
                          (item) => item.questionId === payload.questionId
                        )
                          ? sec.questionsList.map((question) => ({
                              ...question,
                              ...(question.questionId ===
                                payload.questionId && {
                                answer: payload.answer,
                                timeTakenForQuestion:
                                  payload.timeTakenForQuestion,
                                status: payload.status,
                                isCorrect: payload.isCorrect
                              })
                            }))
                          : [
                              ...sec.questionsList,
                              {
                                answer: payload.answer,
                                questionId: payload.questionId,
                                timeTakenForQuestion:
                                  payload.timeTakenForQuestion,
                                status: payload.status,
                                isCorrect: payload.isCorrect
                              }
                            ]
                      })
                    }))
                  : [
                      ...ele.sections,

                      {
                        sectionName: payload.activeSection,
                        questionType: payload.questionType,
                        questionsList: [
                          {
                            answer: payload.answer,
                            questionId: payload.questionId,
                            timeTakenForQuestion: payload.timeTakenForQuestion,
                            status: payload.status,
                            isCorrect: payload.isCorrect
                          }
                        ]
                      }
                    ]
              })
            }))
          : ([
              ...state,

              {
                selectedSubject: payload.activeSubject,
                subjectName: payload.subjectName,
                sections: [
                  {
                    sectionName: payload.activeSection,
                    questionType: payload.questionType,
                    questionsList: [
                      {
                        questionId: payload.questionId,
                        timeTakenForQuestion: payload.timeTakenForQuestion,
                        answer: payload.answer,
                        status: payload.status,
                        isCorrect: payload.isCorrect
                      }
                    ]
                  }
                ]
              }
            ] as AttemptedQuestion[])
      } else {
        return [
          {
            selectedSubject: payload.activeSubject,
            subjectName: payload.subjectName,
            sections: [
              {
                sectionName: payload.activeSection,
                questionType: payload.questionType,
                questionsList: [
                  {
                    questionId: payload.questionId,
                    timeTakenForQuestion: payload.timeTakenForQuestion,
                    answer: payload.answer,
                    status: payload.status,
                    isCorrect: payload.isCorrect
                  }
                ]
              }
            ]
          }
        ]
      }
    }
    default:
      return state
  }
}

export default attemptedQuestionReducer
