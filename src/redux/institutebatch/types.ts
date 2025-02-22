export interface getBatchResponsedataV2 {
  _id: string
  name: string
  isActive: boolean
  courseIds: string[]
  studentLimit: number
  __v: number
  branchId: string
  startDate: string
  endDate: string
  endTime: string
  teachers: []
  published: []
  instituteName: string
  branchName: string
}
export interface getInstituteBatchResponseV2 {
  data: getBatchResponsedataV2[]
  page: string
  limit: string
  loading: boolean
  error: string | null
}
