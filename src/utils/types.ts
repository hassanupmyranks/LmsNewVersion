import { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table'
import { String } from 'lodash'
import {
  Dispatch,
  FunctionComponent,
  InputHTMLAttributes,
  SVGProps,
  SetStateAction
} from 'react'

export interface GetCourseDetailsPayload {
  topic_id?: string
  subject_id?: string
  course_id?: string
  list_type: 'topics' | 'subjects' | 'courses'
  skip: number
  limit: number
}

export interface CourseDetails {
  name: string
  _id: string
  instructionText?: string
}

export interface SubjectDetails {
  courseId: string
  name: string
  _id: string
}

export interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  required?: boolean
  onChange?: (num: number) => void
  withHandler?: boolean
  value: number
  error?: string
  max?: number
  min?: number
  Update?: boolean
  showButtons?: boolean
}

export interface PatternSectionDetails {
  section_name: string
  question_type: string[]
  marks_per_question: number
  questions_from: number
  questions_to: number
  negative_mark: number
  optional_question: number
}

export interface PatternSubjectDetails {
  subject_id: string
  subject_name: string
  total_questions_for_subject: number
}

export interface CalendarSectionDetails {
  label: string
  title: string
  onChangeDate: (selectedvalue: Date) => void
  onChangeTime: (value: string) => void
  defaultDate: string
  defaultTime: string
  minDate: Date
  maxDate: Date
  color: string
  disabled?: boolean
}
export interface CalendarSectionDetailss {
  label: string
  title: string
  onChangeDate: (selectedvalue: Date) => void
  defaultDate: string
  minDate: Date
  maxDate: Date
  color: string
  disabled?: boolean
}
interface CreatePatternSectionPayload extends PatternSectionDetails {
  questions_list: []
}

export interface CreatePatterSubjectPayload extends PatternSubjectDetails {
  sections: CreatePatternSectionPayload[]
}

interface CourseDetailsPayload {
  course_id: string
  course_name: string
}

export interface CreatePatternPayload {
  test_name: string
  course_details: CourseDetailsPayload
  subjects_details: CreatePatterSubjectPayload[]
  total_questions: number
  total_marks: number
  test_duration: number
  instruction_text: string
}

export interface UpdatePatternPayload extends CreatePatternPayload {
  test_id: string
  is_active?: boolean
}
export interface singleQuestionPreview {
  id: number
  active: boolean
  question: string
}

export interface UploadFileProps {
  width: string
}

export interface FileUploaderProps {
  onFileChange: (file: File | undefined) => void
  values: File | undefined
  setValues: Dispatch<SetStateAction<File | undefined>>
  width?: string
  accept?: string
  fileTypeName?: string
}

export interface listAuthorResponse {
  _id: string
  name: string
  profileImage: string
  createdAt: string
}

export interface GetPatternDataPayload {
  test_id?: string
  limit: number
  skip: number
  course_id?: string
  searchKey?: string
}

export interface GetPatternResponse extends CreatePatternPayload {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PopupMenuProps {
  Icon: JSX.Element
  label: string
  onClick: (_: string | number) => void
  disabled?: boolean | undefined
}

export interface ReactTableProps<T> {
  tableData: T[]
  columns: ColumnDef<T, any>[]
  sorting?: SortingState
  limit: number
  setSorting: OnChangeFn<SortingState>
  setPage: Dispatch<SetStateAction<number>>
  page: number
  setLimit: Dispatch<SetStateAction<number>>
  entries: number
  shadow?: any
  maxHeight?: string
}

export interface AddInstitutePayload {
  instituteName: string
  contactName: string
  contactNumber: number
  userName: string
  password: string
  instituteLocation: string
}
export interface ScrollReactTableProps<T> {
  tableData: T[]
  columns: ColumnDef<T, any>[]
  setData?: Dispatch<SetStateAction<never[]>>
}

export interface ReactTablePropsType<T extends { ReviewNow: string }> {
  tableData: T[]
  columns: ColumnDef<T, any>[]
  setData?: Dispatch<SetStateAction<never[]>>
}

export interface SubTopicsDetails extends BasicDetails {
  subTopics: any
  courseId: string
  subjectId: String
  parentTopicId: string
  isSelected?: any
  subjectName?: string
  questionCount?: number
}

export interface BasicDetails {
  name: string
  _id: string
}

export interface SubjectTopicsDetails {
  courseId: string
  subjectId: string
  questionCount?: number
  name: string
  _id: string
  subTopics: SubTopicsDetails[]
  isSelected?: any
}

export interface GetTopicQuestionsPayload {
  skip?: number
  page?: number
  limit?: number
  questionType?: string
  course_name?: string
  topic_id?: string
  subtopic_id?: string[]
  question_type?: string
  courseId?: string
  subtopicId?: string
  chapterId?: string[] | string
  subjectId?: string
  topicIds?: string[]
  unitId?: string[]
}

export interface GetQuestionsPayload {
  skip?: number
  page?: number
  limit?: number
  questionType?: string | any
  course_name?: string
  topic_id?: string
  subtopic_id?: string[]
  question_type?: string
  courseId?: string
  subtopicId?: string
  chapterId?: string[]
  subjectId?: string
  topicIds?: string[]
  unitId?: string[]
}

export interface SearchDropdownImageProps {
  url?: string
}

export interface QuestionsOptionsProps {
  id: number
  answer: string
  isActive: boolean
}

export interface SubjectPartsDetails {
  id: number
  part: string
  subject: string
  isSelected: boolean
}

export interface GetRandomGenerateQuestionsPayload {
  subjectId?: string
  number_of_questions_required?: number
  noOfQuestions?: number
  course_name?: string
  topicIds?: string[]
  difficultyLevel?: string[]
  questionTypes?: string[]
  unitId?: string[] | string
  chapterId?: string | string[]
  unitIds?: string[]
  chapterIds?: string[]
}

export interface GetAllPatternDataPayload {
  test_id?: string
  skip?: number
  page?: number
  limit?: number
}

export interface TextDetails {
  [x: string]: any
  text: string
}

export interface OptionDetails {
  [x: string]: any
  d: TextDetails
}

export interface SolutionImageDetails {
  _id: string
  url: string
}

export interface RandomGenerateQuestionsDetails {
  _id: string
  courseId: string
  topicId: string
  tags?: []
  difficulty?: string
  assets?: string[]
  type: string
  childQuestions: []
  question: TextDetails
  options: OptionDetails[]
  answer: any
  solution: TextDetails
  solutionImage: SolutionImageDetails[]
}

export interface GetTestDataPayload {
  test_id?: string
  course_id?: string
  user_id?: string
  limit?: number
  skip?: number
  show_only_user_created_tests?: boolean
  isCompleted?: boolean
  isAssigned?: boolean
  searchKey?: string
  withoutPattern?: boolean
  batchIds?: string[]
  isOffline?: boolean
}
export interface GetTestToppersPayload {
  testId?: string
  limit?: number
  page?: number
}

export interface GetTestSubjectPayload {
  are_all_questions_added_for_subject: boolean
  subject_name: string
  teacher_details: { teacher_name: string }
}

export interface GetTestDataResponse {
  course_id?: string
  institute_test_name: string
  password: string
  test_details: { subjects_details: GetTestSubjectPayload[] }
  test_duration: number
  test_end_time: string
  test_pattern: string
  enabled: boolean
  test_start_time: string
  total_marks: number
  _id: string
  institute_details: instituteDetails
  tableData: GetTestDataResponse
  result_announce: string
  result_announce_time: any
  branch_details: BranchDetails[]
  test_pattern_details?: {
    id: string
    name: string
  }
  batch_details: BatchDetails[]
  status: string
}

export interface TeacherDetails {
  institute_id: string
  institute_name: string
  branch_id: string
  branch_name: string
  teacher_id: string
  teacher_name: string
}

export interface NewSubjectDetails {
  sections: []
  subject_id: string
  subject_name: string
  total_questions_for_subject: number
  is_teacher_assigned: boolean
  teacher_details: TeacherDetails
  are_all_questions_added_for_subject: boolean
}

export interface QuestionsSectionsDetails {
  marks_per_question: number
  negative_mark: number
  optional_question: number
  question_type: string
  questions_from: number
  questions_list: RandomGenerateQuestionsDetails[]
  questions_to: number
  section_name: string
  total_questions_for_section: number
}

export interface GetTestPreviewDataPayload {
  test_id?: string
  limit?: number
  skip?: number
}

// total question
export interface QuestionSection {
  total_questions_for_section?: number
  marks_per_question?: number
}

// new types
export interface TestPreviewData {
  sections: SectionProps[]
  subject_name: string
  total_questions_for_subject: number
  teacher_details: TeacherDetailsProps
}
export interface QuestionProps {
  questionIndex: number
  data: Question
  sectionData: SectionProps
}
export interface SectionProps {
  marks_per_question: number
  negative_mark: number
  optional_question: number
  question_type: string
  questions_from: number
  questions_list: []
  questions_to: number
  section_name: string
}

export interface instituteDetails {
  institute_id: string
  institute_name: string
}
export interface BranchDetails {
  branch_id: string
  branch_name: string
}

export interface BatchDetails {
  batch_id: string
  batch_name: string
}

export interface updateUserProfilePayload {
  password: string
  oldPassword: string
  file: File | null
}
export interface CreateInstituteTestPayload {
  test_id?: string
  type?: string
  name?: string
  subjectId?: string
  institute_test_name?: string
  test_pattern?: string
  course_id?: string
  courseId?: string
  course_name?: string
  test_start_time?: string
  institute_id?: string
  test_end_time?: string
  test_duration_type?: string
  test_duration?: number
  total_test_questions?: number
  total_marks?: number
  addPassword?: boolean
  add_password?: boolean
  password?: string | null
  instruction_text?: string | undefined
  test_details?: {
    subjects_details: NewSubjectDetails[]
  }
  questions?: any[]
  questions_list?: Question
  section_name?: string
  total_questions_for_section?: number
  institute_details?: instituteDetails
  branch_details?: BranchDetails[]
  batch_details?: BatchDetails[]
  created_by?: string
  test_pattern_details?: {
    id: string
    name: string
  }
  test_type?: string
  withoutPattern?: boolean
  isOffline?: boolean
  hasOfflineQuestions?: boolean
}

type Dimension = {
  text: string
}

export interface Option {
  d: Dimension
  v: number
}

type Solution = {
  text: string
}
type solutionImage = {
  url: string
  _id: string
}

export interface Question {
  flatMap(arg0: (question: any, questionIndex: number) => JSX.Element): unknown
  _id: string
  matrixSize: {
    rows: number
    columns: number
  }
  tags: string[]
  difficulty: string
  assets: string[]
  type: string
  partialMarking: boolean
  hasRelatedQuestions: boolean
  childQuestions: any[] // Adjust the type as needed
  question: {
    text: string
  }
  options: Option[]
  answer: number
  solution: Solution
  solutionImage: solutionImage[]
  comprehension: string
  topicId: string
  subTopicId: string
  __v: number
  disabled: boolean
}

export interface GetTeacherPayload {
  institute_id: string
  user_role: string
}

export interface GetInstituteBranchPayload {
  institute_id: string
}

export interface GetInstituteBatchPayload {
  Institute_id: string
  branch_id: string
}

export interface GetCoursePayload {
  course_id: string
  subject_id?: string
  chapter_id?: string
  topic_id?: string
}

export interface TeacherPublishTopicPayload {
  teacher_id?: string
  method?: string
  instituteId?: string
  branchId?: string
  batchId?: any
  courseId?: string
  subjectId?: string
  chapterId?: string
  topicId?: string
  batchIds?: string[]
  subjectIds?: string[]
  chapterIds?: string[]
  topicIds?: string[]
}

export interface InstituteDetails {
  address: string
  area: string
  batch: InstituteDetails[]
  branches: InstituteDetails[]
  city: string
  code: string
  institute_id: string
  logo: string
  name: string
  state: string
  status: string
  student_limit: string
  teacher_limit: string
  user_name: string
  user_role: string
  branch_id?: string

  batchCount: number
  branchCount: number
  branchStudentLimit: number
  branchTeacherLimit: number
  isActive: boolean
  teacherCount: number
  _id: number
}

export interface NewBranchDetails {
  _id: string
  instituteId: string
  name: string
  logo: string
  address: string
  area: string
  city: string
  state: string
  isActive: true
  studentLimit: number
  teacherLimit: number
  instituteName: string
  teacherCount: string
}

export interface NewBatchDetails {
  _id: string
  batchId: string
  branchId: string
  isActive: true
  studentLimit: 1000
  name: string
  batchName: string
  branchName: string
  instituteId: string
  instituteName: string
}

export interface SocketResponse {
  finished: boolean
  filePath: string
  notUploadedCount: number
  uploadedCount: number
  isError: boolean
  message: string
  progress: string | number
  uploadedQRCodes?: any
}
export interface UploadQuestions {
  author: string
  processingId: string
}
export interface PublishDetailsPayload {
  id: number
  topic_id?: number
  topic_name?: string
  subject_id?: string
  subject_name?: string
  status: boolean
}
export interface PublishPayload {
  id?: string | number
  name?: string
  status?: boolean
  index?: number
}
export interface PublishTableProps {
  dataList?: PublishPayload[] | any
  // topicsList?: PublishDetailsPayload[] | any
  // handlePublished?: Dispatch<PublishDetailsPayload> | any
  total?: number
  length?: number
  handleScrollInfinite?: (b: any, d: any) => void
  headerName: string
  publishList?: any[]
  onCheck: () => void
  isChecked?: boolean
  onChildCheck: (d: any) => void
  view?: string
}

export interface LabPublishTableProps {
  subjectsList: PublishDetailsPayload[]
  handlePublished: Dispatch<PublishDetailsPayload>
}

export interface sectionsPayload {
  section_name: string
  questions: string[]
}

export interface UpdateQuestionsCreatedTestAPIPayload {
  test_id: string
  teacher_id: string
  subject_id: string
  sections: sectionsPayload[]
  are_all_questions_added_for_subject: boolean
}

export interface PaginationPayload {
  page: number
  limit: number
  gameType?: string
  branchId?: string
}

export interface SubjectsDataCourseIdPayload {
  page: number
  limit: number
  courseId?: string
}

export interface GetSubjectPayload extends PaginationPayload {
  courseId?: string | number
  batchIds?: string[] | any
  batchId?: string | any
}

export interface GetChapterPayload extends PaginationPayload {
  subjectId?: string | number
  courseId?: string
  searchKey?: string
  batchIds?: string[]
  mode?: string
}

export interface CreateChapterPayload {
  subjectId?: string
  name: string
  sequence: string | number
}

export interface GetTopicPayload extends PaginationPayload {
  chapterId?: any
  isLMS?: Boolean
  batchIds?: string[]
  subjectId?: any
  courseId?: any
  searchKey?: string
}

export interface GetMaterialPayload {
  courseId?: string
  subjectId?: string
  topicId?: string
  chapterId?: string
  type?: 'teaching' | 'study' | 'experiment'
  limit: number
  page?: number
  searchKey?: string
}
export interface GetSubjectResponse {
  SubjectId: string
  SubjectName: string
}

export interface GetChapterResponse {
  ChapterId: string
  ChapterName: string
}

export interface VideoMaterialProps {
  MaterialType: string
  MaterialId: string
  MaterialSequence: number
  MaterialPath: string
  MaterialName: string
  MaterialThumbnail: string
}

export interface LabVideoMaterialProps {
  ExperimentLink: string
  ExperimentLinkThumb: string
  ExperimentName: string
  ExperimentSequence: number
}
export interface CourseDetailProps {
  id: string
  name: string
  type: string
}

export interface SubjectDetailProps {
  id: string
  name: string
}

export interface LearnModuleTextMaterial {
  TeachingMaterialName: string
  TeachingMaterialLink: string
  TeachingMaterialID: string
  TeachingMaterialSequence: number
  TeachingMaterialType: string
}

export interface CreateUserForTeacherParam {
  firstName: string
  lastName: string
  role: string
  username: string
  password: string
  gender: string | undefined
  email: string
  mobile: string
  bloodGroup: string
  emergencyContactNumber: string
  dob: Date | null
  educationalBackground: string
  previousInstituteName: string
  collegeName: string
  collegeCityName: string
  address: string
  city: string
  pincode: number
  experience: number
  dateOfJoining: Date | null
  department: string
  designation: string
  bankAccountNo: string
  bankIfsc: string
  bankName: string
  pfAccountNumber: number
  contractType: string
  contractStartDate: Date | null
  panNumber: string
  aadharNo: string
  epsAccountNumber: number
  profileImage: File
}

export interface GetSubjectUnderCourse {
  subjectId: string
  subjectName: string
  subjectIcon: string
}

export interface GetCourseResponse {
  _id: string
  name: string
  description?: string
  type: string
  icon: string
  subjects: [GetSubjectUnderCourse]
  createdAt: string
}

// export interface GetCoursesPayload {
//   page?: number
//   limit?: number
// }

export interface AddCourseProps {
  name: string
  icon: File | string
  // type: string
  _id: string
}

export interface ResetType {
  icon?: boolean
}

export interface ResetProfileType {
  profileImage?: boolean
}

export enum FinalpayloadAddCourse {
  name = 'name'
  // type = 'type'
}

export enum FinalpayloadCreateSubject {
  name = 'name',
  courseId = 'courseId',
  sequence = 'sequence'
}

export enum FinalpayloadCreateSubTopic {
  name = 'name',
  sequence = 'sequence',
  courseId = 'courseId',
  subjectId = 'subjectId',
  chapterId = 'chapterId',
  topicId = 'topicId'
}

export enum FinalpayloadCreateTopic {
  name = 'name',
  sequence = 'sequence',
  // courseId = 'courseId',
  // subjectId = 'subjectId',
  chapterId = 'chapterId'
}
export interface EditDeleteProps {
  id: string
}

export interface SideMenuSubItemDetails {
  id: string
  link: string
  label: string
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  childSubMenu?: SideMenuSubItemDetails[]
  activePaths?: string[]
}

export interface SideMenuItemDetails {
  id: string
  link: string
  label: string
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
  activePaths: string[]
  childMenu: SideMenuSubItemDetails[]
}

export interface GetHeaderTabsPayload {
  tabs: string[]
}

export interface GetNewAllBatchAPIPayload {
  limit?: number
  page?: number
  branchId?: string | any
  branchIds?: string[] | any
  instituteId?: string | any
  courseId?: string | any
  course?: boolean
}
export interface GetNewAllInstituteAPIPayload {
  limit?: number
  page?: number
  searchKey?: string
}

export interface GetAllHolidaysPayload {
  month: number
  year: number
}
export interface GetSingleHolidayPayload {
  id: string
}
export interface GetNewAllBranchAPIPayload {
  limit?: number
  page?: number
  instituteId?: string | any
  searchKey?: string
}

export interface TeacherDetailsProps {
  institute_id: string
  institute_name: string
  branch_id: string
  branch_name: string
  teacher_id: string
  teacher_name: string
}

export interface AllUserAPIPayload {
  page: number
  limit: number
  role: string
  instituteId?: string
  branchId?: string
  questionBankCourse?: string
  subjectId?: string
}

export interface BatchApiPayload {
  page: number
  limit: number
  branchIds?: string[]
  courseId?: string | any
  subjectId?: string
  instituteId?: string | any
  searchKey?: string
  course?: boolean
}
export interface GetReviewAssignmentData {
  limit: number
  skip?: number
  page?: number
  instituteId?: number | string
  branchId?: number | string
  courseId?: number | string
  chapterId?: number | string
  batchId?: string | string[] | number
  subjectId?: number | string
  date?: any
  searchkey?: string
  admin_created?: boolean
  assignmentId?: number | string
  type?: string
  forReview?: boolean
}
export interface BranchApiPayload {
  page: number
  limit: number
  instituteId?: string
}

export interface GetQuestionBankDetailsPayload {
  courseId?: string
  subjectId?: string
  unitId?: string
  type?: 'topics' | 'courses' | 'subjects'
  limit?: number
}

export interface QuestionBulkUploadPayload {
  instituteId?: string
  branchId?: string
  courseId: string
  topicId: string
  sharable: boolean
  subTopicId?: string
  author?: string
  numberOfQuestions?: number
  file: string
}

export interface UploadedQuestionsPayload {
  page: number
  limit: number
  processId: string
}
export interface GetNewAllStudentPayload {
  role?: string
  limit?: number
  page?: number
  id?: string
  instituteId?: string | any
  batchId?: string | any
  searchKey?: string
  branchId?: string | any
  subjectId?: string | any
  courseId?: string | any
}

export interface GetNewAllstudentResponce {
  skip: any
  _id: string
  username: string
  firstName: string
  lastName: string
  instituteName: string
  batchName: string
  isActive: boolean
  gender: string
  mobile: string
  profileImage: string
  dateOfJoining: string
  branchName: string
}

export interface GetNewAllTeacherResponce {
  skip: any
  _id: string
  username: string
  firstName: string
  lastName: string
  instituteName: string
  batchName: string
  branchName: string
  isActive: boolean
  gender: string
  mobile: string
  profileImage: string
  dateOfJoining: string
  courseName: string
}

export interface GetNewAllBranchResponce {
  skip: any
  _id: string
  username: string
  name: string
  lastName: string
  instituteName: string
  batchCount: string
  isActive: boolean
  address: string
  mobile: string
  dateOfJoining: string
}
export interface GetNewAllBatchResponce {
  skip: any
  _id: string
  username: string
  name: string
  lastName: string
  instituteName: string
  branchName: string
  batchCount: string
  isActive: boolean
  studentCount: any
  contactNo: string
  teacherCount: number
}
export interface GetStudentPaylode {
  isActive: boolean
}

export interface TestDeletePayload {
  user_id?: string
  test_id: string
}

export interface TestEnabledPayload {
  test_id: string
  enabled: boolean
}

export interface AssignedTestPayload {
  page?: number
  limit?: number
  testId?: string
  courseId?: string
  testDate?: Date
}

export interface CreateSubjectProps {
  name: string
  icon: File | string
  courseId: string
  _id: string
}

export interface CreateTopicsProps {
  name: string
  chapterId: string
  sequence: number
}

export interface CreateSubTopicsProps {
  name: string
  topicId: string
  sequence: number
}

export interface CreateChapterProps {
  name: string
  subjectId: string
  sequence: any
}

export interface CreateSubTopicProps {
  name: string
  topicId: string
  sequence: any
}

export interface CreateTopicProps {
  name: string
  chapterId: string
  sequence: any
}

export interface GetSubjectsResponse {
  name: string
  courseName: string
  icon: string
  createdAt: string
  _id: string
}

export interface AddAssignmentPayload {
  name: string
  deadLine: string
  batchId?: string
  attachment: string
  courseId?: string
  subjectId?: string
  description?: string
  chapterId?: string
  topicId?: string
  subTopicId?: string
}

export interface GetTestsSubmittedData {
  _id: string
  averageScore: number
  count: number
  institute_test_name: string
  test_pattern_details: any
  course_name: string
  batch_details: any
  test_duration: number
  submittedOn: string
  submissionPercentage: string
  total_marks: number
  institute_details: any
  branch_details: any
  testStartedCount: number
  test_end_time: any
}

export const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  username: '',
  password: '',
  gender: undefined,
  email: '',
  mobile: '',
  bloodGroup: '',
  emergencyContactNumber: '',
  dob: new Date(),
  educationalBackground: '',
  previousInstituteName: '',
  collegeName: '',
  collegeCityName: '',
  address: '',
  city: '',
  pincode: 0,
  experience: 0,
  dateOfJoining: new Date(),
  department: '',
  designation: '',
  bankAccountNo: '',
  bankIfsc: '',
  bankName: '',
  pfAccountNumber: 0,
  contractType: '',
  contractStartDate: new Date(),
  panNumber: '',
  aadharNo: '',
  epsAccountNumber: 0,
  profileImage: new File([], '')
}

export interface CreateTeacherResponce {
  firstName: string
  lastName: string
  role: string
  username: string
  password: string
  gender: string | undefined
  email: string
  mobile: number
  bloodGroup: string
  emergencyContactNumber: number
  dob: Date
  educationalBackground: string
  previousInstituteName: string
  collegeName: string
  collegeCityName: string
  address: string
  city: string
  pincode: number
  experience: number
  dateOfJoining: Date
  department: string
  designation: string
  bankAccountNo: number
  bankIfsc: string
  bankName: string
  pfAccountNumber: number
  contractType: string
  contractStartDate: Date
  panNumber: string
  aadharNo: number
  epsAccountNumber: number
  profileImage: File
}
export interface GetBatchCourse {
  batchId?: string
  branchId?: string
}
export interface GetCourseId {
  instituteId?: string
}
export interface GetBatchCourseId {
  branchId?: string
}
export interface TeacherResponceV2 {
  firstName?: number
  instituteName?: number
  username?: number
  profileImage?: number
  _id?: number
}

export interface GetInstituteResponse {
  _id: string
  name: string
  logo: string
  batchCount: number
  branchCount: number
  teacherCount: number
  instituteImage?: any
}

export interface GetBranchResponse {
  _id: string
  name: string
  logo: string
  batchCount: number
  teacherCount: number
  branchImage?: any
}

export interface ListElementsDetails {
  label: string
  para?: string
  image?: string
  options?: PopupMenuProps[]
  id: string
}
export interface ListOfElementsProps {
  heading?: string
  ElementsList: ListElementsDetails[]
  setValues: string | object
}

export interface EditAuthorProps {
  name?: string
  _id: string
}

export interface AddAuthorProps {
  name: string
  profileImage: File | string
  _id: string
}

export interface AddOrEditHolidayProps {
  id?: string
  name: string
  description: string
  academicYear?: string
  date: string
  instituteId: string
}

export enum FinalPayloadField {
  name = 'name'
}

export interface ListAuthorProps {
  limit?: number
}

export interface ListAuthorResponse {
  _id: string
  name: string
  createdAt: string
}

export interface CourseInstitute {
  id: string
  name: string
}
export interface AssignTestToInstitutePayload {
  testId: string
  // user_id: string
  batches: string[]
  batch_details?: BatchDetails[]
  branch_details?: BranchDetails[]
  institute_details?: instituteDetails
}
export interface AssignTimeTableToInstitutePayload {
  branchId?: string
  courseId?: string
  startTime?: string
  endTime?: string
  breakTimings?: {
    type: string
    duration: number
    afterSession: number
  }[]
  totalNoOfSessionsPerDay?: number
  batchIds?: string[]
}

export interface UpdateTimeTableToInstitutePayload {
  branchId?: string
  courseId?: string
  startTime?: string
  endTime?: string
  breakTimings?: {
    type: string
    duration: number
    afterSession: number
  }[]
  totalNoOfSessionsPerDay?: number
  batchIds?: string[]
}

export interface AssignNoPatternTestPayload {
  testId: string
  batchIds: string[]
  branchId: string
  instituteId: string
  startTime: any
  endTime: any
  duration: number
}

export interface AssignBatch {
  batchId: string
  courseId: string
  subjectIds: string[]
}
export interface AssignBatchToTeacherPayload {
  teacherId: string
  instituteId: string
  branchId: string
  batches: AssignBatch[]
}

export interface SubmitAssignmentPayload {
  assignmentId: string
  file?: string
  submissionComment?: string
  answers: { answer: any; questionId: string; skipped: boolean }[]
}
export interface AddBatch {
  courseId: string
  subjectIds: string[]
}
export interface AddBatchPayload {
  name: string
  branchId: string
  instituteId?: string
  courses: AddBatch[]
  questionBankCourseIds?: string[]
}

export interface EditBatchPayload {
  name?: string
  courses: AddBatch[]
  questionBankCourseIds?: string[]
}

export interface GetAllBatch {
  limit?: number
  page?: number
  instituteId?: string | any
  branchIds?: string[] | any
}

export interface QuestionDetails {
  questionId: string
  answer: string
  timeTakenForQuestion: number
}
export interface SectionDetails {
  sectionName: string
  questionType: string[]
  questionsList: QuestionDetails[]
  allQuestions: any[]
  solutionImages: []
}

export interface AttemptedTestSubjectDetails {
  subjectId: string
  // subjectName: string
  // teacherId?: string | null
  // scoredMarks: number
  // correctAnswers: number
  // incorrectAnswers: number
  // skippedAnswers: number
  sections: SectionDetails[]
}

export interface SubmitAttemptedTestPayload {
  testId: string
  // testName: string
  // testPatternName: string
  testStartTime: string
  testEndTime: string
  // totalScoredMarks: number
  // courseDetails: {
  //   courseId: string
  //   courseName: string
  // }
  // batchName: string
  // testCreatedBy: string
  // testType: string
  // totalDuration: number
  // totalTestMarks: number
  testDetails: {
    subjectDetails: AttemptedTestSubjectDetails[]
  }
}
export interface ManageContentPayload {
  courseId?: string
  subjectId?: string
  chapterId?: string
  topicId?: string
  page: number
  limit: number
  published?: boolean
}
export interface ManageContentPublishTableProps {
  manageContentData: PublishDetailsPayload[]
  handlePublished: Dispatch<PublishDetailsPayload>
}

export interface ReviewQuestion {
  questionId: string
  teacherMarks: number
  isCorrect: boolean
}
export interface ReviewQuizPayload {
  quizId: string
  studentId: string
  questions: ReviewQuestion[]
  // correctAnswers: number
  // inCorrectAnswers: number
  // scoredMarks: number
  // isReviewed: boolean
}

export interface GetReviewBatchPayload {
  page: number
  limit: number
  branchId?: string
  branchIds: string[]
  courseId: string
  subjectId: string | number | undefined
}

export interface reviewedSubmittedAssignmentAPIPayload {
  review: string
  reviewComment: string
}

export interface GetStudentDashboardPayload {
  page?: number
  limit?: number
}
export interface GetAllMyTestPayload {
  skip?: number
  limit: number
  page?: number
  testId?: number
}

export interface ResultAnnouncementPayload {
  test_id: string
  result_announce: string
  result_announce_time?: string
}

export interface CreatePracticeTestPayload {
  testName: string
  difficulty: string
  duration: number
  singleQuestionMark: number
  negativeMark: number
  courseId: string
  totalTestQuestions?: number
  totalMarks?: number
  subjectId?: string
  unitId?: string
  chapterId?: string
  topicIds?: string[]
  subjects: any
}

export interface SubmitPracticeTestPayload {
  testId: string
  testStartTime: string
  testEndTime: string
  duration: number
  courseDetails: any
  testDetails: {
    questionsList: QuestionDetails[]
  }
}

export interface GetNewAllToppersResponce {
  _id?: string
  username?: string
  firstName?: string
  lastName?: string
  totalCorrectAnswers?: Number
  totalIncorrectAnswers?: Number
  totalDuration?: string
  topSkillSubject?: string
  topSkillPercentage?: Number
  totalSkippedAnswers?: Number
  totalQuestion?: Number
  percentageScore?: Number
  profileImage?: string
  totalTestMarks?: Number
  totalScoredMarks?: Number
  highestMarkSubjectDetails?: {
    subjectName?: string
    scoredMarks?: any
    correctAnswers?: string
    totalMarks?: any
  }
}
export interface GetAnalyticsPayload {
  testId: string
  isPracticeTest?: boolean
}

export interface ResultAnalytics {
  _id: string
  testName: string
  testType: string
  totalScoredMarks: number
  totalTestMarks: number
  totalSkippedAnswers: number
  highestMarkSubjectDetails: {
    subjectName: string
    marks: number
    correctAnswers: number
  }
  potentialScore: number
  percentageScore: number
  averageTimeForSingleQuestion: number
  totalIncorrectAnswers: number
  totalCorrectAnswers: number
  courseDetails: any
  courseId: string
  courseName: string
}

export interface GetSubmitAttemptedTestPayload {
  testId: string
  isPracticeTest: boolean
  courseId: string
}

export interface createDuplicateTestPayload {
  test_id: string
  institute_test_name: string
  test_duration?: number
  test_start_time?: string
  test_end_time?: string
  instruction_text: string
}

export interface createDuplicateNoPatternTestPayload {
  testId: string
  name: string
  duration?: number
  startTime?: string
  endTime?: string
  instruction?: string
}

export interface checkUserNameAPIPayload {
  username: string
}

export interface SendOTPPayload {
  username: string
  mobile: string
  action: string
}

export interface VerifyOtpAPIPayload {
  username: string
  mobile: string
  otp: string
}

export interface ForgotPasswordAPIPayload {
  password: string
  confirmPassword: string
}

export interface BoardsAPIPayload {
  page: number
  limit: number
  instituteId?: string
}

export interface GetSubTopicAPIPayload {
  page: number
  limit: number
  topicId?: any
  chapterId?: any
  subjectId?: any
  courseId?: any
  searchKey?: string
}

export interface UpdateQrCodePayload {
  qrCodeId: string
  topicId?: string
  chapterId?: string
  filePath?: string
  type?: string
}

export interface GenerateQrCodeAPIPayload {
  qrCodeId: string
  topicId: string
  filePath?: string
  type?: string
}

export interface GetQrCodePayload {
  page: number
  limit: number
  fromDate?: string
  toDate?: string
  courseId?: string
  subjectId?: string
  chapterId?: string
  topicId?: string
  subTopicId?: string
  searchKey?: string
  type?: string
}

export interface CourseMappingPayload {
  courseId: string
  questionBankCourseIds: string[]
}

export interface GetTopicsResponse {
  hasMaterial: boolean
  _id: string
  name: string
  sequence: number
  courseId: string
  courseName: string
  subjectId: string
  subjectName: string
  chapterId: string
  chapterName: string
  subTopicCount: number
  materialCount: number
}
export interface GetAllAssesmentTestTypePayload {
  skip?: number
  page?: number
  limit?: number
}
export interface getDashboardDataPayload {
  instituteId?: string
  courseId?: string
  branchId?: string
}

export interface getTeacherDashboardDataPayload {
  batchId?: string
  type?: string
}

export interface CreateLessonPlanModule {
  chapterId: string
  sessionCount: number
  classActivities: string[] | any
}

export interface CreateSession {
  batchId: any
  subjectId: any
  materialIds: string[]
  sessionDate: any
}

export interface CompletedSessionPayload {
  status?: string
  batchId?: any
  subjectId?: any
  materialIds?: string[]
  sessionDate?: any
  publish?: boolean
}

export interface getStudentPerformancePayload {
  batchId?: any
}

export interface getStudentPerformanceListPayload {
  batchId?: any
  page?: number
  limit?: number
}
