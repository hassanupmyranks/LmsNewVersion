export interface QuizDataType {
  _id: string
  courseDetails: DetailsType
  intituteDetails: DetailsType
  branchDetails: DetailsType
  batchDetails: DetailsType
  createdBy: DetailsType
  subjectDetails: DetailsType
  questions: any[]
  totalMarks: number
  totalQuestions: number
  quizType: string
  isActive: boolean
  duration: number
  name: string
}

export interface DetailsType {
  id: string
  name: string
}
export interface OptionType {
  option: string
  number: number
}

export interface questionIdType {
  _id: string
  type: string
  taskType: string
  courseId: string
  subjectId: string
  chapterId: string
  topicId: string
  question: string
  options: OptionType[]
  answer: number
  solution: string
  deleted: false
  processingId: string
  difficulty: number
  subQuestions: []
}

export interface questionDataType {
  questionId: questionIdType
  marks: number
  questionType: string
}

export interface allQuestionSubmitPayload {
  answer: number | null | any
  questionId: string
  skipped: boolean
}
