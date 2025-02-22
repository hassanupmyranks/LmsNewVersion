interface questions {
  text: string
}

interface options {
  d: questions
  v: number
  _id: string
}

export interface questionsListDetails {
  questionId: string
  type: string
  answer: number | any
  question: questions
  options: options[]
  forReview: boolean
  correctAnswer: number | any
  solution: questions
  timeTakenForQuestion: number
  skipped: boolean
  isCorrect: boolean
  mark: number
}

export interface sectionsDetails {
  sectionName: string
  questionType: string[]
  totalQuestions: number
  questionsToAttempt: number
  totalMarks: number
  scoredMarks: number
  correctAnswers: number
  incorrectAnswers: number
  skippedAnswers: number
  forReview: boolean
  questionsList: questionsListDetails[]
  _id: string
}

export interface subjectDetails {
  subjectId: string
  subjectName: string
  teacherId: any | null
  totalQuestions: number
  questionsToAttempt: number
  totalMarks: number
  scoredMarks: number
  correctAnswers: number
  incorrectAnswers: number
  skippedAnswers: number
  forReview: boolean
  sections: sectionsDetails[]
}
