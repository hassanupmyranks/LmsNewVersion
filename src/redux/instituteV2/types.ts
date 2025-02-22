export interface getInstituteResponsedataV2 {
  _id: string
  name: string
  isActive: boolean
  expiryDate: string
  courseIds: string[]
  branchStudentLimit: number
  branchTeacherLimit: number
  branchNonTeacherLimit: number
  studentLimit: number
  teacherLimit: number
  nonTeacherLimit: number
  __v: number
}
export interface getInstituteResponseV2 {
  data: getInstituteResponsedataV2[]
  page: string
  limit: string
  loading: boolean
  error: string | null
}
