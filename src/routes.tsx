import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/v2/login'

import {
  CreateTestPattern,
  Dashboard,
  TestPreview,
  PatternsTable,
  TestsTable,
  AddInstituteForm,
  ReviewAssignment,
  AddCoursesV2,
  CreateSubjects,
  AddStudent,
  AddAssignments,
  StudentListV2,
  ReviewAssignmentMain,
  CourseCardList,
  AssignTeacherV2,
  AddTeacherPage,
  InstituteCardList,
  AddAndListAuthor,
  TeachersDashboard,
  QuestionCorner,
  ManageContent,
  UploadContent,
  CreateQuiz,
  QuestionBulkUpload,
  StudentBulkUploading,
  StudentsDashboard,
  InstituteDashboard,
  InstituteBranchList,
  BranchDashboard,
  BatchList,
  TopRankersList,
  MaterialUploading,
  BranchCardList,
  ManageQRCodeList,
  CreateQRCode,
  CreateBulkQRCode,
  CreateTopics,
  CreateSubTopics,
  BulkUploadTopics,
  BulkUploadSubTopics,
  ListTopic,
  ListSubTopic,
  AssignmentQuestion,
  QuestionsWithoutPattern,
  NoPatternTestsTable,
  SubmittedNoPatternTestsTable,
  TimeTable,
  LiveSession,
  LeavePlanner,
  LessonPlanner,
  TimeTableMaster,
  TimeTableMasterAssign,
  EditTeacher,
  ViewMaterial,
  CRMSupport,
  AcademicYearPlanner,
  SubmitAssignment,
  StudentPerformance,
  TeacherPerformance,
  AddLeave,
  ExamMarkEntry,
  OfflineExamMarkEntry,
  QuizList
} from './pages/v2'

import ROUTES_V2 from './const/V2/routes'
import CreateScheduleAssignTest from './pages/v2/assessment/pattern/CreateScheduleAssignTest'
import MaterialsV2 from './pages/v2/learn/publishMaterials/MaterialsV2'
import AddQuestions from './pages/v2/assessment/addQuestions/AddQuestions'
import LearnV2 from './pages/v2/learn/Learn'
import LoginOut from './pages/v2/logout'
import TeacherAddQuestion from './pages/v2/assessment/addQuestions/TeacherAddQuestions'
import TeacherTestsTable from './pages/v2/assessment/table/teacherTests'
import TeacherTestPreview from './pages/v2/assessment/TestPreview/TeacherPreview'
import SubmittedTestsTable from './pages/v2/assessment/table/submittedTests'
import UserProfile from './pages/v2/user/updateProfile'
import StudentAssignments from './pages/v2/student/assignments'
import StudentAssessment from './pages/v2/student/assessment/dashboard'
import AttemptTest from './pages/v2/student/assessment/attemptTest'
import ReviewQuizStudents from './pages/v2/quiz/review-quiz/ReviewQuizStudents'
import ReviewQuiz from './pages/v2/quiz/review-quiz/ReviewQuiz'
import { PRODUCT_TYPE } from './utils/env'
import TeacherAnalytics from './pages/v2/assessment/analytics/TeacherAnalytics'
import TestResultContainer from './pages/v2/student/assessment/dashboard/components/resultContainer'
import StudentAnalytics from './pages/v2/student/assessment/analytics'
import KeyChallengesQuestions from './pages/v2/student/assessment/analytics/components/submitKeyChallenges'
import TestStats from './pages/v2/assessment/analytics/TestStats'
import AttemptedMyTest from './pages/v2/student/assessment/attemptMytest'
import StudentPracticeTestAnalytics from './pages/v2/student/assessment/analytics/practiceTestAnalytics'
import ForgotPasswordPage from './pages/v2/forgotPassword'
import ResetPasswordPage from './pages/v2/resetPassword'
import BranchForm from './pages/v2/dashboard/addEditBranch/AddEditBranchForm'
import BoardsComponents from './pages/v2/settings/boards'
import BatchForm from './pages/v2/dashboard/addEditBatch/batchForm'
import StudentFormMaster from './pages/v2/settings/studentSettings'
import TeacherFormMaster from './pages/v2/settings/teacherSettings'
import ChapterDetails from './pages/v2/assessment/chaptersDetails'
import ChaptersUploading from './pages/v2/assessment/ChaptersUpload/chapterUpload'
import ChaptersList from './pages/v2/ChapterList/chapterlists'
import ErpLoginPage from './pages/v2/ErpLogin'
import ModulesSetings from './pages/v2/settings/modules'
import InstituteModulesSettings from './pages/v2/settings/modules/instituteModuleSettings'
import AssignmentTest from './pages/v2/student/assignments/assignmentsTest/assignmentTest'
import NoModuleFoundPage from './pages/v2/noModuleFoundPage'
import ListAssignment from './pages/v2/addAssignment/ListAssignment'
import CourseMapping from './pages/v2/settings/courseMapping'
import ViewChapterDetails from './pages/v2/assessment/chaptersDetails/viewChapters'
import ViewBatchDetails from './pages/v2/batchList/viewBatchDetails'
import ViewTopicDetails from './pages/v2/assessment/createTopics/viewTopicDetails'
import ViewSubTopicDetails from './pages/v2/assessment/createSubTopics/viewsubTopicDetails'
import TeacherDetails from './pages/v2/AddTeacher/viewTeacherDetails'
import StudentDetails from './pages/v2/addstudent/viewStudentDetails'
import AssessmentTestDetails from './pages/v2/assessment/addQuestions/viewTestDetails'
import TeacherListV2 from './pages/v2/TeacherList'
import AddEditLessonPlanner from './pages/v2/settings/LessonPlanner/components/addEditLessonPlanner'
import PrepMode from './pages/v2/teacherPerpAndTeachMode/PrepMode'
import TeachMode from './pages/v2/teacherPerpAndTeachMode/TeachMode'
import FinalPageTeachMode from './pages/v2/teacherPerpAndTeachMode/FinalPage'
import QuestionCornerBulkUpload from './pages/v2/assessment/questionCornerBulkUpload'
import AttemptedQuiz from './pages/v2/student/Quiz/components/AttemptedQuiz'
import MaterialsList from './pages/v2/assessment/MaterialUpload/materilsList'
import AddMaterial from './pages/v2/assessment/MaterialUpload/addMaterial'

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={ROUTES_V2.LOGIN}
        component={PRODUCT_TYPE === 'ERP' ? ErpLoginPage : LoginPage}
      />
      <Route path={ROUTES_V2.NOMODULES_FOUND} component={NoModuleFoundPage} />
      <Route exact path={ROUTES_V2.LOGOUT} component={LoginOut} />
      <Route
        exact
        path={ROUTES_V2.FORGOT_PASSWORD}
        component={ForgotPasswordPage}
      />
      <Route
        exact
        path={ROUTES_V2.RESET_PASSWORD}
        component={ResetPasswordPage}
      />
      <Route
        exact
        path={ROUTES_V2.CREATE_TEST_PATTERN}
        component={CreateTestPattern}
      />
      <Route
        exact
        path={`${ROUTES_V2.ADD_INSTITUTE}`}
        component={AddInstituteForm}
      />
      <Route
        exact
        path={`${ROUTES_V2.EDIT_INSTITUTE}/:id`}
        component={AddInstituteForm}
      />
      <Route exact path={`${ROUTES_V2.ADD_BRANCH}`} component={BranchForm} />
      <Route
        exact
        path={`${ROUTES_V2.EDIT_BRANCH}/:id`}
        component={BranchForm}
      />
      <Route exact path={`${ROUTES_V2.ADD_BATCH}`} component={BatchForm} />
      <Route exact path={`${ROUTES_V2.EDIT_BATCH}/:id`} component={BatchForm} />
      <Route
        exact
        path={`${ROUTES_V2.EDIT_TEST_PATTERN}/:id`}
        component={CreateTestPattern}
      />
      <Route
        path={ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST}
        component={CreateScheduleAssignTest}
      />
      <Route
        path={`${ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST}/:testId/:courseId`}
        component={AssessmentTestDetails}
      />
      <Route
        path={`${ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST}/:testId/:courseId`}
        component={CreateScheduleAssignTest}
      />

      <Route path={ROUTES_V2.LEARN} component={LearnV2} />
      <Route path={ROUTES_V2.MATERIALS} component={MaterialsV2} />
      <Route path={ROUTES_V2.ADD_MATERIALS} component={AddMaterial} />
      <Route path={ROUTES_V2.CONTENT_MATERIALS} component={MaterialsList} />
      <Route exact path={ROUTES_V2.ADD_QUESTION} component={AddQuestions} />
      <Route
        path={ROUTES_V2.TEACHER_ADD_QUESTION}
        component={TeacherAddQuestion}
      />
      <Route path={ROUTES_V2.DASHBOARD} component={Dashboard} />
      <Route path={ROUTES_V2.CREATE_TEST_PREVIEW} component={TestPreview} />
      <Route
        path={ROUTES_V2.TEACHER_TEST_PREVIEW}
        component={TeacherTestPreview}
      />
      <Route path={ROUTES_V2.TEST_PREVIEW} component={TestPreview} />
      <Route path={ROUTES_V2.PATTERNS} component={PatternsTable} />
      <Route
        path={ROUTES_V2.NO_PATTERN_TESTS}
        component={NoPatternTestsTable}
      />
      <Route
        path={ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS}
        component={NoPatternTestsTable}
      />
      <Route
        path={ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS}
        component={NoPatternTestsTable}
      />
      <Route
        path={ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS}
        component={SubmittedNoPatternTestsTable}
      />
      <Route path={ROUTES_V2.TESTS} component={TestsTable} />
      <Route path={`${ROUTES_V2.EXAM_MARK_ENTRY}`} component={ExamMarkEntry} />
      <Route
        path={ROUTES_V2.OFFLINE_ASSESSMENT}
        component={OfflineExamMarkEntry}
      />
      <Route path={ROUTES_V2.ASSIGNED_TESTS} component={TestsTable} />
      <Route path={ROUTES_V2.UNASSIGNED_TESTS} component={TestsTable} />
      <Route
        path={ROUTES_V2.REVIEW_ASSIGNMENT}
        component={ReviewAssignmentMain}
      />
      <Route
        path={`${ROUTES_V2.REVIEW_ASSIGNMENT_STUDENT}/:id`}
        component={ReviewAssignment}
      />
      <Route path={ROUTES_V2.CUSTOM_TESTS} component={TeacherTestsTable} />
      <Route path={ROUTES_V2.SUBMITTED_TESTS} component={SubmittedTestsTable} />
      <Route path={ROUTES_V2.ADDSTUDENT} component={AddStudent} />
      <Route path={ROUTES_V2.STUDENT_LIST} component={StudentListV2} />
      <Route
        path={ROUTES_V2.STUDENT_ASSESSMENT}
        component={StudentAssessment}
      />
      <Route path={ROUTES_V2.ATTEMPT_TEST} component={AttemptTest} />
      <Route path={ROUTES_V2.ATTEMPT_MY_TEST} component={AttemptedMyTest} />
      <Route path={ROUTES_V2.ASSIGNMENT_TEST} component={AssignmentTest} />
      <Route
        path={`${ROUTES_V2.ASSIGN_TEACHER}/:id`}
        component={AssignTeacherV2}
      />
      <Route path={ROUTES_V2.TEACHER_LIST} component={TeacherListV2} />
      <Route path={ROUTES_V2.ADD_TEACHER} component={AddTeacherPage} />
      <Route path={`${ROUTES_V2.EDIT_TEACHER}/:id`} component={EditTeacher} />
      <Route
        path={`${ROUTES_V2.VIEW_TEACHER}/:id`}
        component={TeacherDetails}
      />
      <Route path={`${ROUTES_V2.EDIT_STUDENT}/:id`} component={AddStudent} />
      <Route
        path={`${ROUTES_V2.VIEW_STUDENT}/:id`}
        component={StudentDetails}
      />
      <Route path={ROUTES_V2.ADD_COURSE_V2} component={AddCoursesV2} />
      <Route
        path={`${ROUTES_V2.EDIT_COURSE_V2}/:id`}
        component={AddCoursesV2}
      />
      <Route path={ROUTES_V2.CREATE_SUBJECTS} component={CreateSubjects} />
      <Route path={ROUTES_V2.CREATE_TOPICS} component={CreateTopics} />
      <Route path={`${ROUTES_V2.EDIT_TOPICS}/:id`} component={CreateTopics} />
      <Route
        path={`${ROUTES_V2.VIEW_TOPICS}/:id`}
        component={ViewTopicDetails}
      />
      <Route path={ROUTES_V2.BULK_UPLOAD_TOPICS} component={BulkUploadTopics} />
      <Route
        path={ROUTES_V2.BULK_UPLOAD_SUB_TOPICS}
        component={BulkUploadSubTopics}
      />
      <Route path={ROUTES_V2.CREATE_SUB_TOPICS} component={CreateSubTopics} />
      <Route
        path={`${ROUTES_V2.EDIT_SUB_TOPICS}/:id`}
        component={CreateSubTopics}
      />
      <Route
        path={`${ROUTES_V2.VIEW_SUB_TOPICS}/:id`}
        component={ViewSubTopicDetails}
      />
      <Route path={ROUTES_V2.LIST_TOPICS} component={ListTopic} />
      <Route path={ROUTES_V2.LIST_SUB_TOPICS} component={ListSubTopic} />
      <Route
        path={`${ROUTES_V2.EDIT_CHAPTERS}/:id`}
        component={ChapterDetails}
      />
      <Route path={ROUTES_V2.CHAPTERS} component={ChaptersList} />
      <Route path={`${ROUTES_V2.CREATE_CHAPTERS}`} component={ChapterDetails} />
      <Route
        path={`${ROUTES_V2.VIEW_CHAPTER_DETAILS}/:id`}
        component={ViewChapterDetails}
      />
      <Route
        path={`${ROUTES_V2.VIEW_BATCH_DETAILS}/:id`}
        component={ViewBatchDetails}
      />
      <Route
        path={ROUTES_V2.CHAPTERS_BULK_UPLOAD}
        component={ChaptersUploading}
      />
      <Route path={ROUTES_V2.BOARDS} component={BoardsComponents} />
      <Route path={ROUTES_V2.MENU_MASTER} component={ModulesSetings} />
      <Route
        path={ROUTES_V2.INSTITUTE_MODULES_SETTINGS}
        component={InstituteModulesSettings}
      />

      <Route
        path={ROUTES_V2.STUDENT_FORM_MASTER}
        component={StudentFormMaster}
      />
      <Route
        path={ROUTES_V2.TEACHER_FORM_MASTER}
        component={TeacherFormMaster}
      />
      <Route
        path={`${ROUTES_V2.QUESTIONS_WITHOUT_PATTERN}/:id`}
        component={QuestionsWithoutPattern}
      />
      <Route
        path={ROUTES_V2.QUESTIONS_WITHOUT_PATTERN}
        component={QuestionsWithoutPattern}
      />
      <Route
        path={`${ROUTES_V2.EDIT_ASSIGNMENTS}/:id`}
        component={AddAssignments}
      />
      <Route path={ROUTES_V2.ADD_ASSIGNMENTS} component={AddAssignments} />
      <Route path={ROUTES_V2.USERPROFILE} component={UserProfile} />
      <Route path={ROUTES_V2.COURSE_CARD_LIST} component={CourseCardList} />
      <Route
        path={ROUTES_V2.INSTITUTE_CARD_LIST}
        component={InstituteCardList}
      />
      <Route path={ROUTES_V2.BRANCH_CARD_LIST} component={BranchCardList} />
      <Route path={ROUTES_V2.TIME_TABLE} component={TimeTable} />
      <Route
        path={ROUTES_V2.ACADEMIC_YEAR_PLANNER}
        component={AcademicYearPlanner}
      />
      <Route path={ROUTES_V2.CRM_SUPPORT} component={CRMSupport} />
      <Route path={ROUTES_V2.LIVE_SESSION} component={LiveSession} />
      <Route path={ROUTES_V2.LEAVE_PLANNER} component={LeavePlanner} />
      <Route path={ROUTES_V2.ADD_HOLIDAY} component={AddLeave} />
      <Route path={ROUTES_V2.EDIT_HOLIDAY} component={AddLeave} />
      <Route path={ROUTES_V2.LESSON_PLANNER} component={LessonPlanner} />
      <Route
        path={ROUTES_V2.CREATE_LESSON_PLANNER}
        component={AddEditLessonPlanner}
      />
      <Route
        path={`${ROUTES_V2.EDIT_LESSON_PLANNER}/:id`}
        component={AddEditLessonPlanner}
      />
      <Route path={ROUTES_V2.TIME_TABLE_MASTER} component={TimeTableMaster} />
      <Route
        path={ROUTES_V2.TIME_TABLE_MASTER_ASSIGN}
        component={TimeTableMasterAssign}
      />
      <Route path={ROUTES_V2.UPLOAD_GAME} component={UploadContent} />
      <Route path={ROUTES_V2.PUBLISH_GAME} component={ManageContent} />
      <Route path={ROUTES_V2.QRCODE_LIST} component={ManageQRCodeList} />
      <Route path={ROUTES_V2.CREATE_QRCODE} component={CreateQRCode} />
      <Route path={`${ROUTES_V2.EDIT_QRCODE}/:id`} component={CreateQRCode} />
      <Route path={ROUTES_V2.CREATE_BULK_QRCODE} component={CreateBulkQRCode} />
      <Route path={ROUTES_V2.ALL_AUTHOR} component={AddAndListAuthor} />
      <Route
        path={ROUTES_V2.TEACHERS_DASHBOARD}
        component={TeachersDashboard}
      />
      <Route
        path={ROUTES_V2.STUDENT_ASSIGNMENT}
        component={StudentAssignments}
      />
      <Route
        path={`${ROUTES_V2.STUDENT_SUBMIT_ASSIGNMENT}/:id`}
        component={SubmitAssignment}
      />
      <Route
        path={ROUTES_V2.INSTITUTE_DASHBOARD}
        component={InstituteDashboard}
      />
      <Route path={ROUTES_V2.BRANCH_DASHBOARD} component={BranchDashboard} />
      <Route path={ROUTES_V2.BATCH_LIST} component={BatchList} />
      <Route path={ROUTES_V2.Quiz} component={QuestionCorner} />
      <Route path={ROUTES_V2.STUDENT_QUIZ_LIST} component={QuizList} />
      <Route
        path={`${ROUTES_V2.STUDENT_QUIZ_SUBMIT}/:id`}
        component={AttemptedQuiz}
      />
      <Route path={ROUTES_V2.ASSIGNMENT_LIST} component={ListAssignment} />
      <Route
        path={`${ROUTES_V2.ASSIGNMENT_QUESTION}/:id`}
        component={AssignmentQuestion}
      />
      <Route
        path={ROUTES_V2.ASSIGNMENT_QUESTION}
        component={AssignmentQuestion}
      />

      <Route path={ROUTES_V2.TEACHERS_CREATE_QUIZ} component={CreateQuiz} />
      <Route path={ROUTES_V2.TEACHERS_REVIEW_QUIZ} component={ReviewQuiz} />
      <Route
        path={ROUTES_V2.TEACHERS_REVIEW_QUIZ_STUDENTS}
        component={ReviewQuizStudents}
      />
      <Route
        path={`${ROUTES_V2.STUDENT_TEST_RESULT}/:id`}
        component={TestResultContainer}
      />
      <Route
        path={`${ROUTES_V2.STUDENT_ANALYTICS}/:id`}
        component={StudentAnalytics}
      />
      <Route
        path={`${ROUTES_V2.PRACTICE_ANALYTICS}/:id`}
        component={StudentPracticeTestAnalytics}
      />
      <Route
        path={ROUTES_V2.CHALLENGES_QUESTIONS}
        component={KeyChallengesQuestions}
      />
      <Route
        path={ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD}
        component={QuestionCornerBulkUpload}
      />
      <Route
        path={ROUTES_V2.QUESTION_BULK_UPLOAD}
        component={QuestionBulkUpload}
      />
      <Route path={ROUTES_V2.TOP_RANKERS_LIST} component={TopRankersList} />
      <Route
        path={ROUTES_V2.STUDENTS_BULK_UPLOADS}
        component={StudentBulkUploading}
      />
      <Route path={ROUTES_V2.MATERIAL_UPLOAD} component={MaterialUploading} />
      <Route
        path={ROUTES_V2.INSTITUTE_BRANCH}
        component={InstituteBranchList}
      />
      <Route
        path={ROUTES_V2.STUDENTS_DASHBOARD}
        component={StudentsDashboard}
      />
      <Route
        exact
        path={ROUTES_V2.TEACHER_ANALYTICS}
        component={TeacherAnalytics}
      />
      <Route exact path={ROUTES_V2.VIEW_MATERIAL} component={ViewMaterial} />
      <Route
        exact
        path={ROUTES_V2.STUDENT_PERFORMANCE}
        component={StudentPerformance}
      />
      <Route exact path={ROUTES_V2.TEST_STATS} component={TestStats} />
      <Route exact path={ROUTES_V2.COURSE_MAPPING} component={CourseMapping} />
      <Route
        exact
        path={ROUTES_V2.TEACHER_PERFORMANCE}
        component={TeacherPerformance}
      />
      <Route exact path={ROUTES_V2.PREP_MODE} component={PrepMode} />
      <Route
        exact
        path={`${ROUTES_V2.PREP_MODE_EDIT}/:id`}
        component={PrepMode}
      />
      <Route exact path={ROUTES_V2.TEACH_MODE} component={TeachMode} />
      <Route
        exact
        path={`${ROUTES_V2.FINAL_PAGE_TEACH_MODE}/:id`}
        component={FinalPageTeachMode}
      />
      <Route path="/" component={RedirectToHomePage} />
    </Switch>
  )
}

export default Routes

const RedirectToHomePage = () => {
  return <Redirect to={ROUTES_V2.LOGIN} />
}
