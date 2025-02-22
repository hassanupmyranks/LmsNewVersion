export interface CourseInfoV2 {
  _id: string
  name: string
  type: string
}

export interface CourseDetails {
  courseId: string
  courseName: string
}
export interface BatchDetails {
  batchId: string
  batchName: string
}
export interface UserInfoV2 {
  role:
    | 'superAdmin'
    | 'teacher'
    | 'student'
    | 'instituteAdmin'
    | 'branchAdmin'
    | 'PARENT'
    | 'STAFF'
    | 'STUDENT'
    | ''
  firstName: string
  gender: string
  email: string
  mobile: string
  admissionNo: string
  instituteId: string
  branchId: string
  batchId: string
  isActive: boolean
  dob: string
  bloodGroup: string
  courseId: any
  nationality: string
  religion: string
  aadharNo: string
  panNumber: string
  passportNo: string
  passportExpiry: string
  address: string
  city: string
  state: string
  batchName: string
  pincode: string
  countryOfIssue: string
  emergencyContactNumber: string
  emergencyContactPerson: string
  parentMobile: string
  spouseName: string
  fatherName: string
  motherName: string
  fatherMobile: string
  bankName: string
  bankBranch: string
  bankIfsc: string
  bankAccountNo: string
  pfAccountNumber: string
  epsAccountNumber: string
  community: string
  registrationType: string
  remarks: string
  satsNo: string
  dateOfJoining: string
  contractStartDate: string
  contractType: string
  experience: string
  courses: Array<CourseInfoV2>
  completionYear: string
  academicYear: string
  class: string
  hostelId: string
  transportationId: string
  from: string
  to: string
  designation: string
  department: string
  previousInstituteName: string
  collegeName: string
  collegeCityName: string
  rollNo: string
  year: string
  caste: string
  areaName: string
  educationalBackground: string
  questionBankCourses: Array<CourseDetails>
  batches: Array<BatchDetails>
  // erp
  academicId: string
  branchType: string
  className: string
  divisionName: string
  semYearNo: string
  studentRegistrationId: string
  blcId: string
  blcDivisionId: string
  staffRegistrationId: string
  registrationNo: string

  // for new response data
  _id: string
  username: string
  deleted?: boolean
  isEmailVerified?: boolean
  isMobileVerified?: boolean
  instituteName: string
  branchName: string
  createdBy: string
  profileImage: string
}

// Define a type for the slice state
interface UserStateV2 {
  isLoggedIn: boolean
  isLoading: boolean
  userName: string
  password: string
  coursePhp: string
  device: string
  userInfoV2: UserInfoV2
  hasError: boolean
}

// Define the initial state using that type
export const initialState: UserStateV2 = {
  isLoggedIn: false,
  isLoading: false,
  userName: '',
  coursePhp: '',
  password: '',
  device: '',
  hasError: false,
  userInfoV2: {
    role: '',
    firstName: '',
    gender: '',
    email: '',
    batchName: '',
    mobile: '',
    admissionNo: '',
    instituteId: '',
    branchId: '',
    batchId: '',
    isActive: true,
    dob: '',
    bloodGroup: '',
    courseId: [],
    nationality: '',
    religion: '',
    aadharNo: '',
    panNumber: '',
    passportNo: '',
    passportExpiry: '',
    address: '',
    state: '',
    pincode: '',
    countryOfIssue: '',
    emergencyContactNumber: '',
    emergencyContactPerson: '',
    spouseName: '',
    fatherName: '',
    motherName: '',
    fatherMobile: '',
    bankName: '',
    bankBranch: '',
    bankIfsc: '',
    bankAccountNo: '',
    pfAccountNumber: '',
    epsAccountNumber: '',
    community: '',
    registrationType: '',
    remarks: '',
    satsNo: '',
    dateOfJoining: '',
    contractStartDate: '',
    contractType: '',
    experience: '',
    courses: [],
    completionYear: '',
    academicYear: '',
    class: '',
    hostelId: '',
    transportationId: '',
    from: '',
    to: '',
    designation: '',
    department: '',
    previousInstituteName: '',
    collegeName: '',
    collegeCityName: '',
    rollNo: '',
    year: '',
    caste: '',
    areaName: '',
    educationalBackground: '',
    city: '',
    parentMobile: '',
    questionBankCourses: [],
    academicId: '',
    branchType: '',
    className: '',
    divisionName: '',
    semYearNo: '',

    studentRegistrationId: '',
    blcId: '',
    blcDivisionId: '',
    staffRegistrationId: '',
    registrationNo: '',
    batches: [],
    // for new response data
    _id: '',
    username: '',
    deleted: false,
    isEmailVerified: false,
    isMobileVerified: false,
    instituteName: '',
    branchName: '',
    createdBy: '',
    profileImage: ''
  }
}

export interface AuthenticatePayload {
  loginDevice: 'mobile' | 'website'
}
export interface LoginPayloadV2 {
  username: string
  password: string
  instituteId?: string | Number
}
