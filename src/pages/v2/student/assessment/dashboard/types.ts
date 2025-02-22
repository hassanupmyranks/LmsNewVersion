export interface AssignedBy {
  firstName: string
  role: string
  _id: string
}

export interface AssignedTest {
  assigned_by: AssignedBy[]
  batch_details: object[]
  branch_details: object[]
  course_id: string
  course_name: string
  created_by: string
  institute_details: object
  institute_test_name: string
  instruction_text: string
  password: string
  result_announce: string
  result_announce_time: string
  test_details: object
  test_duration: number
  test_end_time: string
  test_pattern_details: {
    id: string
    name: string
  }
  test_start_time: string
  test_type: string
  total_marks: number
  total_test_questions: number
  _id: string
  attempted: boolean
}

export interface Subject {
  courseId: string
  name: string
  icon: string
  __v: number
  _id: string
}

export interface MyTest {
  _id: string
  testName: string
  courseId: string
  duration: number
  totalMarks: number
  createdAt: string
  totalQuestions?: number
}
