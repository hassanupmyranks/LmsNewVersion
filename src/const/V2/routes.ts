const ROUTES_V2 = {
  LOGIN: '/',
  NOMODULES_FOUND: '/v2/no-modules-found',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CREATE_TEST_PATTERN: '/v2/test-pattern',
  EDIT_TEST_PATTERN: '/v2/test-pattern/edit',
  CREATE_SCHEDULE_ASSIGN_TEST: '/v2/create-schedule-assign-test',
  VIEW_SCHEDULE_ASSIGN_TEST: '/v2/schedule-assign-test/view',
  EDIT_SCHEDULE_ASSIGN_TEST: '/v2/schedule-assign-test/edit',
  DASHBOARD: '/v2/dashboard',
  TEST_PREVIEW: '/v2/assessment/tests/:testId',
  LOGOUT: '/v2/logout',
  ADD_QUESTION: '/v2/add-questions',
  PATTERNS: '/v2/assessment/patterns',
  TESTS: '/v2/assessment/tests',
  EXAM_MARK_ENTRY: '/v2/exam-mark-entry/view',
  OFFLINE_ASSESSMENT: '/v2/offline-exam-mark-entry',
  NO_PATTERN_TESTS: '/v2/assessment/no-pattern-tests',
  NO_PATTERN_ASSIGNED_TESTS: '/v2/assessment/no-pattern-assigned-tests',
  NO_PATTERN_UNASSIGNED_TESTS: '/v2/assessment/no-pattern-unassigned-tests',
  NO_PATTERN_SUBMITTED_TESTS: '/v2/assessment/no-pattern-submitted-tests',
  REVIEW_ASSIGNMENT_STUDENT: '/v2/review-assignment-student',
  LEARN: '/v2/dashboard/learn',
  MATERIALS: '/v2/materials',
  ADD_COURSE_V2: '/v2/add-courses',
  EDIT_COURSE_V2: '/v2/courses/edit',
  CREATE_TEST_PREVIEW: '/v2/assessment/tests/preview',
  TEACHER_TEST_PREVIEW: '/v2/assessment/test/preview',
  INSTITUTES: '/v2/institutes',
  ADD_INSTITUTE: '/v2/institute/add',
  EDIT_INSTITUTE: '/v2/institute/edit',
  PDFCONTAINER: '/v2/pdf',
  USERPROFILE: '/v2/user-profile',
  STUDENT_ASSIGNMENT: '/v2/student-assignment',
  STUDENT_SUBMIT_ASSIGNMENT: '/v2/submit-assignment',
  REVIEW_ASSIGNMENT: '/v2/assignment/review',
  CREATE_SUBJECTS: '/v2/create-subjects',
  CREATE_TOPICS: '/v2/create-topics',
  EDIT_TOPICS: '/v2/topics/edit',
  VIEW_TOPICS: '/v2/topics/view',
  BULK_UPLOAD_TOPICS: '/v2/bulk-upload-topics',
  CREATE_SUB_TOPICS: '/v2/create-sub-topics',
  EDIT_SUB_TOPICS: '/v2/sub-topics/edit',
  VIEW_SUB_TOPICS: '/v2/sub-topics/view',
  BULK_UPLOAD_SUB_TOPICS: '/v2/bulk-upload-sub-topics',
  LIST_TOPICS: '/v2/list-topics',
  LIST_SUB_TOPICS: '/v2/list-sub-topics',
  CREATE_CHAPTERS: '/v2/create-chapters',
  EDIT_CHAPTERS: '/v2/chapters/edit',
  VIEW_CHAPTER_DETAILS: '/v2/chapters-details/view',
  ADDSTUDENT: '/v2/addstudent',
  TEACHER_ADD_QUESTION: '/v2/add-questions/:testId/:courseId',
  ADD_ASSIGNMENTS: '/v2/add-assignments',
  EDIT_ASSIGNMENTS: '/v2/assignments/edit',
  CUSTOM_TESTS: '/v2/assessment/custom-tests',
  SUBMITTED_TESTS: '/v2/assessment/submitted-tests',
  STUDENT_LIST: '/v2/students-list',
  EDIT_STUDENT: '/v2/student/edit',
  VIEW_STUDENT: '/v2/student/view',
  COURSE_CARD_LIST: '/V2/course-card-list',
  TEACHER_LIST: '/v2/teachers',
  ADD_TEACHER: '/v2/add-teacher',
  EDIT_TEACHER: '/v2/teacher/edit',
  VIEW_TEACHER: '/v2/teacher/view',
  ASSIGN_TEACHER: '/v2/assign-teacher/view',
  STUDENT_ASSESSMENT: '/v2/assessment',
  ATTEMPT_TEST: '/v2/attempt-test',
  ATTEMPT_MY_TEST: '/v2/attempt-my-test',
  ASSIGNMENT_TEST: '/v2/assignment-test',
  INSTITUTE_CARD_LIST: '/v2/institute-card-list',
  BRANCH_CARD_LIST: '/V2/branch-card-list',
  TIME_TABLE: '/V2/time-table',
  ACADEMIC_YEAR_PLANNER: '/V2/academic-year-planner',
  CRM_SUPPORT: '/V2/CRM-support',
  LIVE_SESSION: '/V2/live-session',
  LEAVE_PLANNER: '/V2/leave-planner',
  ADD_HOLIDAY: '/V2/add-holiday',
  EDIT_HOLIDAY: '/V2/edit-holiday',
  LESSON_PLANNER: '/V2/lesson-planner',
  CREATE_LESSON_PLANNER: '/V2/create-lesson-planner',
  EDIT_LESSON_PLANNER: '/V2/lesson-planner/edit',
  ASSIGN_LESSON_PLANNER: '/V2/assign-lesson-plan',
  TIME_TABLE_MASTER: '/V2/time-table-master',
  TIME_TABLE_MASTER_ASSIGN: '/V2/time-table-master-assign',
  ALL_AUTHOR: '/v2/author',
  TEACHERS_DASHBOARD: '/v2/teachers-dashboard',
  Quiz: '/v2/quiz',
  STUDENT_QUIZ_LIST: '/v2/student-quiz-list',
  STUDENT_QUIZ_SUBMIT: '/v2/student-quiz-submit',
  ASSIGNMENT_QUESTION: '/v2/assignment-question',
  QUESTIONS_WITHOUT_PATTERN: '/v2/questions-without-pattern',
  ASSIGNMENT_LIST: '/v2/assignment-list',
  PUBLISH_GAME: '/v2/manage-content',
  QRCODE_LIST: '/v2/qr-code-list',
  CREATE_QRCODE: '/v2/qr-code',
  EDIT_QRCODE: '/v2/qr-code/edit',
  CREATE_BULK_QRCODE: '/v2/create-bulk-qr-code',
  UPLOAD_GAME: '/v2/upload-content',
  TEACHERS_CREATE_QUIZ: '/v2/create-quiz',
  TEACHERS_REVIEW_QUIZ: '/v2/review-quiz',
  TEACHERS_REVIEW_QUIZ_STUDENTS: '/v2/review-quiz-students',
  QUESTION_BULK_UPLOAD: '/v2/question-bulk-upload',
  STUDENTS_DASHBOARD: '/v2/students-dashboard',
  INSTITUTE_DASHBOARD: '/v2/institute-dashboard',
  STUDENTS_BULK_UPLOADS: '/v2/students-bulk-upload',
  INSTITUTE_BRANCH: '/v2/institutebranch',
  BRANCH_DASHBOARD: '/v2/branch-dashboard',
  BATCH_LIST: '/v2/class-section-list',
  TEACHER_ANALYTICS: '/v2/teacher-analytics',
  STUDENT_TEST_RESULT: '/v2/student-test-result',
  STUDENT_ANALYTICS: '/v2/student-analytics',
  PRACTICE_ANALYTICS: '/v2/practice-analytics',
  CHALLENGES_QUESTIONS: '/v2/challenges-questions',
  TEST_STATS: '/v2/test-stats',
  TOP_RANKERS_LIST: '/v2/top-rankers-list',
  MATERIAL_UPLOAD: '/v2/material-upload',
  ADD_MATERIALS: '/v2/add-material',
  CONTENT_MATERIALS: '/v2/content-upload-materials',
  ASSIGNED_TESTS: '/v2/assessment/assigned-test',
  UNASSIGNED_TESTS: '/v2/assessment/unassigned-test',
  ADD_BRANCH: '/v2/branch/add',
  EDIT_BRANCH: '/v2/branch/edit',
  ADD_BATCH: '/v2/batch/add',
  EDIT_BATCH: '/v2/batch/edit',
  VIEW_BATCH_DETAILS: '/v2/batch-details/view',
  BOARDS: '/v2/boards',
  INSTITUTESETTINGS: '/v2/institute-settings',
  STUDENT_FORM_MASTER: '/v2/student-form-master',
  TEACHER_FORM_MASTER: '/v2/teacher-form-master',
  CHAPTERS_BULK_UPLOAD: '/v2/chapter_bulk_upload',
  CHAPTERS: '/v2/chapters',
  MENU_MASTER: '/v2/menu-master',
  INSTITUTE_MODULES_SETTINGS: '/v2/institute-modules-settings',
  COURSE_MAPPING: '/v2/course-mapping',
  VIEW_MATERIAL: '/v2/view_material',
  STUDENT_PERFORMANCE: '/v2/student-performance',
  TEACHER_PERFORMANCE: '/v2/teacher-performance',
  PREP_MODE: '/v2/prep-Mode',
  TEACH_MODE: '/v2/teach-mode',
  FINAL_PAGE_TEACH_MODE: '/v2/final-teach-mode/view',
  PREP_MODE_EDIT: '/v2/prep-Mode/edit',
  QUESTION_CORNER_BULK_UPLOAD: '/v2/questions-corner-bulk-upload'
}

export default ROUTES_V2
