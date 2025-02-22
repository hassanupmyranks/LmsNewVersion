import { Solution } from '../../../../../redux/studentV2/types'

export interface Option {
  d: {
    text: string
  }
  v: number
}

export interface QuestionDetails {
  questionNumber: number
  question: string
  questionId: string
  options: Option[]
  solutionImages: Solution[]
}

export interface AllQuestionList {
  subjectId: string
  allQuestion: Array<{
    sectionName: string
    sectionQuestion: QuestionDetails[]
  }>
}

export interface AnsweredQuestion {
  questionId: string
  answer: number | any
  timeTakenForQuestion: number
  status: 'skip' | 'review' | 'answered'
  isCorrect: boolean | undefined
}
export interface SectionPayload {
  _id: string
  sectionName: string
  questionType?: string[]
  questionsList: AnsweredQuestion[]
}
export interface AttemptedQuestion {
  selectedSubject: string
  subjectName: string
  questionType: string[]
  sections: SectionPayload[]
}

export interface Payload {
  activeSubject: string
  subjectName?: string
  activeSection: string
  questionId: string
  timeTakenForQuestion: number
  questionType?: string[]
  answer?: number
  status: 'skip' | 'review' | 'answered' | 'visited'
  isCorrect: boolean | undefined
}

export interface SectionCorrectAnswerProps {
  countOfCorrectAns: number
  countOfInCorrectAns: number
  markPerQuestion: number
  negativeMark: number
}

export interface CorrectInCorrectAnswerProps {
  countOfCorrectAns: number
  countOfInCorrectAns: number
  markPerQuestion: number
  negativeMark: number
}
