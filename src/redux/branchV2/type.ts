export interface getBranchResponsedataV2 {
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
  instituteName: string

  instituteId: string

  address: string
  area: string
  city: string
  state: string
  pincode: number
  contactNo: number

  batchStudentLimit: number
}
export interface getBranchResponseV2 {
  data: getBranchResponsedataV2[]
  page: string
  limit: string
  loading: boolean
  error: string | null
}
