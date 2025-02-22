export interface Solution {
  name: string
  type: string
  url: string
  __v: number
  _id: string
}

export interface Option {
  d: {
    text: string
  }
  v: number
}

export interface Question {
  answer: number[] | any
  assets: any[]
  childQuestions: any[]
  comprehension: string
  difficulty: string
  disabled: boolean
  hasRelatedQuestions: boolean
  matrixSize: { rows: number; columns: number }
  options: Option[]
  partialMarking: boolean
  question: { text: string }
  solution: { text: string }
  tags: string[]
  topicId: string
  type: string
  __v: number
  _id: string
}

export interface Section {
  _id: string
  all_questions: Question[]
  questions_list: Question[]
  marks_per_question: number
  negative_mark: number
  optional_question: number
  question_type: string[]
  questions_from: number
  questions_to: number
  section_name: string
  solutionImages: Solution[]
  total_questions_for_section: number
}

export interface TestDetails {
  are_all_questions_added_for_subject: boolean
  author_name: null
  is_teacher_assigned: boolean
  sections: Section[]
  subject_id: string
  subject_name: string
  teacher_details: { institute_name: ''; teacher_id: null; teacher_name: '' }
  total_questions_for_subject: number
}

export interface AssignedTestResponse {
  add_password: boolean
  batch_details: any[]
  branch_details: any[]
  course_id: string
  course_name: string
  createdAt: string
  created_by: { firstName: string; _id: string }
  institute_details: {
    institute_id: string
    institute_name: string
  }
  institute_test_name: string
  instruction_text: string
  is_active: boolean
  password: string
  result_announce: string
  result_announce_time: string
  test_details: TestDetails[]
  test_duration: number
  test_duration_type: string
  test_end_time: string
  test_pattern: null
  test_pattern_details: { id: string; name: string }
  test_start_time: string
  test_type: string
  total_marks: number
  total_test_questions: number
  updatedAt: string
  _id: string
}

export interface AssignedTestState {
  data: AssignedTestResponse[]
  isLoading: boolean
}

export interface MyTestState {
  data: any[]
  isLoading: boolean
}
