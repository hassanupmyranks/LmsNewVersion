import { NewSubjectDetails } from '../../utils/types'

interface Time {
  title: string
  firstName: string
  lastName: string
}

export interface TestDetails {
  type: string
  testName: string
  testPattern?: string
  testPatternId?: string
  test_pattern_details?: {
    id: string
    name: string
  }
  courseId: string
  course_name?: string
  testDuration: number
  institute_id: string
  isPasswordProtect: boolean
  password: string | null
  subjectDetails: NewSubjectDetails[]
  startDate: Date
  startTime: Time
  endDate: Date
  endTime: Time
  instructionText: string
  totalQuestions: number
  totalMarks: number
  authorName?: string
  selectedPattenDetails?: undefined | any
  institute_details?: {
    institute_id: string
    institute_name: string
  }
  branch_details?: {
    branch_id: string
    branch_name: string
  }
  batch_details?: {
    batch_id: string
    batch_name: string
  }
  isTeacher?: boolean
  test_id?: string
  isEdit?: boolean
  isPreviewed?: boolean
  isTimeChange?: boolean
  withoutPattern?: boolean
  isOffline?: boolean
  hasOfflineQuestions?: boolean
}

export const initialState: TestDetails = {
  type: '',
  testName: '',
  testPattern: '',
  testPatternId: '',
  test_pattern_details: {
    id: '',
    name: ''
  },
  courseId: '',
  course_name: '',
  testDuration: +0,
  authorName: '',
  institute_id: '',
  isPasswordProtect: false,
  password: '',
  subjectDetails: [],
  startDate: new Date(),
  instructionText: '',
  totalQuestions: 0,
  totalMarks: 0,
  startTime: {
    firstName: '',
    lastName: '',
    title: ''
  },
  selectedPattenDetails: undefined,
  endDate: new Date(),
  endTime: {
    firstName: '',
    lastName: '',
    title: ''
  },
  institute_details: {
    institute_id: '',
    institute_name: ''
  },
  branch_details: {
    branch_id: '',
    branch_name: ''
  },
  batch_details: {
    batch_id: '',
    batch_name: ''
  },
  isTeacher: false,
  isEdit: false,
  isPreviewed: false,
  isTimeChange: false,
  withoutPattern: false,
  isOffline: false,
  hasOfflineQuestions: false
}
