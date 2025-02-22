export interface AnsweredQuestion {
  questionId: string
  answer: any
  timeTakenForQuestion: number
  status: string | null
  isCorrect: boolean
}

export interface State {
  questionsList: AnsweredQuestion[]
}

export interface Action {
  type: string
  payload: any
}
