export interface Batch {
  batchId: string
  courseId: string
  subjectIds: string[]
}

export interface SubjectsData {
  subjectId: string
  subjectName: string
}

export interface GetCourseResponse {
  name: string
  _id: string
  subjects: SubjectsData[]
}
