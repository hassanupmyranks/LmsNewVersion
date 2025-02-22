export interface FinalPayloadV2 {
  firstName: string
  lastName: string
  mobile: string
  fatherName: string
  motherName: string
  parentMobile: string
  dob: string
  gender: string
  nationality: string
  community: string
  aadharNo: string
  address: string
  city: string
  pincode: string
  username: string
  password: string
  year: string
  academicYear: string
  registrationType: string
  admissionNo: string
  satsNo: string
  instituteId: string
  branchId: string
  batchId: string
  profile: string
}
export interface FinalPayloadResponceV2 {
  firstName: ''
  lastName: ''
  mobile: ''
  fatherName: ''
  motherName: ''
  parentMobile: ''
  dob: ''
  gender: ''
  nationality: ''
  community: ''
  aadharNo: ''
  address: ''
  city: ''
  pincode: ''
  username: ''
  password: ''
  year: ''
  academicYear: ''
  registrationType: ''
  admissionNo: ''
  satsNo: ''
  instituteId: ''
  branchId: ''
  batchId: ''
  profile: ''
}
export interface UserResponse {
  message: string
  data: {
    userExists: boolean
  }
}
export interface CheckUser {
  username: string
}
export interface UpdateUser {
  id: string
}
