import ROUTES_V2 from './routes'
import { SideMenuItemDetails } from '../../utils/types'

import { ReactComponent as AssessmentSvg } from '../../assets/svg/menu-item-assessment.svg'
import { ReactComponent as DashboardSvg } from '../../assets/svg/menu-item-dashboard.svg'
import { ReactComponent as LogoutSvg } from '../../assets/svg/menu-item-logout.svg'
import { ReactComponent as CoursesSvg } from '../../assets/svg/courses-icon.svg'
import { ReactComponent as SubjectSvg } from '../../assets/svg/subjects-icon.svg'
import { ReactComponent as StudentsSvg } from '../../assets/svg/students-icon.svg'
import { ReactComponent as InstitutesSvg } from '../../assets/svg/institutes-icon.svg'
import { ReactComponent as TeachersSvg } from '../../assets/svg/teachers-icon.svg'
import { ReactComponent as ManageContent } from '../../assets/svg/content-game.svg'
import { ReactComponent as AssessmentIcon } from '../../assets/svg/assessment-icon.svg'
import { ReactComponent as AssignmentIcon } from '../../assets/svg/student-assignment-icon.svg'
import { ReactComponent as DashBoardIcon } from '../../assets/svg/dashboard-icon.svg'
import { ReactComponent as PatternIconSvg } from '../../assets/svg/pattern-icon.svg'
import { ReactComponent as TestsIconSvg } from '../../assets/svg/tests-icon.svg'
import { ReactComponent as LearnIconSvg } from '../../assets/svg/learn-icon.svg'
import { ReactComponent as MaterialIconSvg } from '../../assets/svg/materials-icon.svg'
import { ReactComponent as AssignmentIconSvg } from '../../assets/svg/assignment-icon.svg'
import { ReactComponent as QuizIconSvg } from '../../assets/svg/quiz.svg'
import { ReactComponent as QuestionBulkUploadIconSvg } from '../../assets/svg/question-bulk-upload.svg'
import { ReactComponent as settingsIcon } from '../../assets/svg/sidebar-settings.svg'
import { ReactComponent as examStudentIcon } from '../../assets/svg/examStudentIcon.svg'
import { ReactComponent as sidebarQrIcon } from '../../assets/svg/sidebar-qr-icon.svg'
import { ReactComponent as instituteSchoolIcon } from '../../assets/svg/institute-school-icon.svg'

export const SideMenuItems: Record<string, SideMenuItemDetails[]> = {
  superAdmin: [
    {
      id: 'dashboard',
      Icon: DashboardSvg,
      label: 'Dashboard',
      link: ROUTES_V2.DASHBOARD,
      activePaths: [ROUTES_V2.DASHBOARD],
      childMenu: []
    },
    {
      id: 'instituteManagement',
      Icon: instituteSchoolIcon,
      label: 'Institute/School Management',
      link: ROUTES_V2.INSTITUTE_CARD_LIST,
      activePaths: [ROUTES_V2.INSTITUTE_CARD_LIST],
      childMenu: [
        {
          id: 'institute',
          Icon: InstitutesSvg,
          label: 'Institute/School',
          link: ROUTES_V2.INSTITUTE_CARD_LIST
        },
        {
          id: 'branch',
          Icon: InstitutesSvg,
          label: 'Branch',
          link: ROUTES_V2.BRANCH_CARD_LIST
        },
        {
          id: 'batch',
          Icon: InstitutesSvg,
          label: 'Batch/Section',
          link: ROUTES_V2.BATCH_LIST
        },
        {
          id: 'student',
          Icon: StudentsSvg,
          label: 'Student',
          link: ROUTES_V2.STUDENT_LIST
        },
        {
          id: 'teacher',
          Icon: TeachersSvg,
          label: 'Teacher',
          link: ROUTES_V2.TEACHER_LIST
        },
        {
          id: 'timeTable',
          Icon: InstitutesSvg,
          label: 'Time Table',
          link: ROUTES_V2.TIME_TABLE
        },
        {
          id: 'liveSession',
          Icon: InstitutesSvg,
          label: 'Live Session',
          link: ROUTES_V2.LIVE_SESSION
        }
      ]
    },
    {
      id: 'contentUpload',
      Icon: MaterialIconSvg,
      label: 'Content Upload',
      link: ROUTES_V2.CONTENT_MATERIALS,
      activePaths: [ROUTES_V2.CONTENT_MATERIALS],
      childMenu: [
        {
          id: 'materialUpload',
          Icon: SubjectSvg,
          label: 'Material Upload',
          link: ROUTES_V2.CONTENT_MATERIALS
        },
        {
          id: 'chapterMaster',
          Icon: SubjectSvg,
          label: 'Chapter Master',
          link: ROUTES_V2.CHAPTERS
        },
        {
          id: 'topicMaster',
          Icon: SubjectSvg,
          label: 'Topic Master',
          link: ROUTES_V2.LIST_TOPICS
        },
        {
          id: 'subTopicMaster',
          Icon: SubjectSvg,
          label: 'SubTopic Master',
          link: ROUTES_V2.LIST_SUB_TOPICS
        }
      ]
    },
    {
      id: 'manageBookQRCode',
      Icon: sidebarQrIcon,
      label: 'Manage Book QR Code',
      link: ROUTES_V2.PUBLISH_GAME,
      activePaths: [ROUTES_V2.PUBLISH_GAME],
      childMenu: [
        {
          id: 'videoQRCode',
          Icon: ManageContent,
          label: 'Video QR Code',
          link: ROUTES_V2.QRCODE_LIST
        },
        {
          id: 'gameQRCode',
          Icon: ManageContent,
          label: 'Game QR Code',
          link: ROUTES_V2.PUBLISH_GAME
        }
      ]
    },
    {
      id: 'publishMaterial',
      Icon: LearnIconSvg,
      label: 'Publish Material',
      link: ROUTES_V2.MATERIALS,
      activePaths: [ROUTES_V2.MATERIALS],
      childMenu: []
    },
    {
      id: 'material',
      Icon: MaterialIconSvg,
      label: 'Material',
      link: ROUTES_V2.MATERIALS,
      activePaths: [ROUTES_V2.MATERIALS, ROUTES_V2.VIEW_MATERIAL],
      childMenu: [
        {
          id: 'viewMaterial',
          Icon: PatternIconSvg,
          label: 'View Material',
          link: ROUTES_V2.VIEW_MATERIAL
        },
        {
          id: 'publishMaterial',
          Icon: PatternIconSvg,
          label: 'Publish Material',
          link: ROUTES_V2.MATERIALS
        }
      ]
    },
    {
      id: 'assignment',
      Icon: AssignmentIconSvg,
      label: 'Assignment',
      link: ROUTES_V2.ASSIGNMENT_LIST,
      activePaths: [ROUTES_V2.ASSIGNMENT_LIST],
      childMenu: []
    },
    {
      id: 'assessment',
      Icon: examStudentIcon,
      label: 'Assessment',
      link: ROUTES_V2.TESTS,
      activePaths: [
        ROUTES_V2.PATTERNS,
        ROUTES_V2.TESTS,
        ROUTES_V2.CREATE_TEST_PATTERN,
        ROUTES_V2.EDIT_TEST_PATTERN,
        ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST
      ],
      childMenu: [
        {
          id: 'pattern',
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          link: ROUTES_V2.PATTERNS
        },
        {
          id: 'allAssessments',
          Icon: TestsIconSvg,
          label: 'All Assessments',
          link: ROUTES_V2.TESTS
        },
        {
          id: 'assignedAssessments',
          Icon: TestsIconSvg,
          label: 'Assigned Assessments',
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          id: 'unAssignedAssessments',
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessments',
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          id: 'ongoingFinishedAssessments',
          Icon: TestsIconSvg,
          label: 'Ongoing & Finished Assessments',
          link: ROUTES_V2.SUBMITTED_TESTS
        }
        // {
        //   id: 'questionBulkUpload',
        //   Icon: QuestionBulkUploadIconSvg,
        //   label: 'Question Bulk Upload',
        //   link: ROUTES_V2.QUESTION_BULK_UPLOAD
        // }
      ]
    },
    {
      id: 'questionBulkUpload',
      Icon: MaterialIconSvg,
      label: 'Question Bulk Upload',
      link: ROUTES_V2.QUESTION_BULK_UPLOAD,
      activePaths: [
        ROUTES_V2.QUESTION_BULK_UPLOAD,
        ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
      ],
      childMenu: [
        {
          id: 'assessmentQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Assessment',
          link: ROUTES_V2.QUESTION_BULK_UPLOAD
        },
        {
          id: 'questionCornerQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Question Corner',
          link: ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
        }
      ]
    },
    {
      id: 'settings',
      Icon: settingsIcon,
      label: 'Settings',
      link: ROUTES_V2.COURSE_CARD_LIST,
      activePaths: [
        ROUTES_V2.COURSE_CARD_LIST,
        ROUTES_V2.CREATE_SUBJECTS,
        ROUTES_V2.STUDENT_FORM_MASTER,
        ROUTES_V2.TEACHER_FORM_MASTER,
        ROUTES_V2.MENU_MASTER
      ],
      childMenu: [
        {
          id: 'courseMaster',
          Icon: CoursesSvg,
          label: 'Grade Master',
          link: ROUTES_V2.COURSE_CARD_LIST
        },
        {
          id: 'subjectMaster',
          Icon: SubjectSvg,
          label: 'Subject Master',
          link: ROUTES_V2.CREATE_SUBJECTS
        },
        {
          id: 'studentFormMaster',
          Icon: TestsIconSvg,
          label: 'Student Form Master',
          link: ROUTES_V2.STUDENT_FORM_MASTER
        },
        {
          id: 'teacherFormMaster',
          Icon: TestsIconSvg,
          label: 'Teacher Form Master',
          link: ROUTES_V2.TEACHER_FORM_MASTER
        },
        {
          id: 'leavePlanner',
          Icon: TestsIconSvg,
          label: 'Holiday Planner',
          link: ROUTES_V2.LEAVE_PLANNER
        },
        {
          id: 'lessonPlanner',
          Icon: TestsIconSvg,
          label: 'Lesson Planner',
          link: ROUTES_V2.LESSON_PLANNER
        },
        {
          id: 'timeTableMaster',
          Icon: TestsIconSvg,
          label: 'Time Table Master',
          link: ROUTES_V2.TIME_TABLE_MASTER
        },
        {
          id: 'menuMaster',
          Icon: TestsIconSvg,
          label: 'Menu Master',
          link: ROUTES_V2.MENU_MASTER
        },
        {
          id: 'questionBankCourseMapping',
          Icon: TestsIconSvg,
          label: 'Grade Mapping',
          link: ROUTES_V2.COURSE_MAPPING
        }
      ]
    },
    {
      id: 'CRMSupport',
      Icon: AssessmentSvg,
      label: 'CRM Support',
      link: ROUTES_V2.CRM_SUPPORT,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'logout',
      Icon: LogoutSvg,
      label: 'Logout',
      link: ROUTES_V2.LOGOUT,
      activePaths: [],
      childMenu: []
    }
  ],
  teacher: [
    {
      id: 'dashboard',
      Icon: DashboardSvg,
      label: 'Dashboard',
      link: ROUTES_V2.TEACHERS_DASHBOARD,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'timeTable',
      Icon: instituteSchoolIcon,
      label: 'Time Table',
      link: ROUTES_V2.TIME_TABLE,
      activePaths: [ROUTES_V2.TIME_TABLE],
      childMenu: [
        {
          id: 'timeTable',
          Icon: InstitutesSvg,
          label: 'Class Table',
          link: ROUTES_V2.TIME_TABLE
        }
        // {
        //   id: 'liveSession',
        //   Icon: InstitutesSvg,
        //   label: 'Live Session',
        //   link: ROUTES_V2.LIVE_SESSION
        // }
      ]
    },
    // {
    //   id: 'learnModule',
    //   Icon: LearnIconSvg,
    //   label: 'Learn Module',
    //   link: ROUTES_V2.LEARN,
    //   activePaths: [ROUTES_V2.LEARN],
    //   childMenu: []
    // },
    {
      id: 'material',
      Icon: MaterialIconSvg,
      label: 'Material',
      link: ROUTES_V2.LEARN,
      activePaths: [ROUTES_V2.LEARN],
      childMenu: [
        {
          id: 'publishMaterial',
          Icon: SubjectSvg,
          label: 'Student Materials',
          link: ROUTES_V2.MATERIALS
        },
        {
          id: 'viewMaterial',
          Icon: SubjectSvg,
          label: 'Teacher Materials',
          link: ROUTES_V2.LEARN
        }
      ]
    },
    {
      id: 'assignment',
      Icon: AssignmentIconSvg,
      label: 'Assignment',
      link: ROUTES_V2.ASSIGNMENT_LIST,
      activePaths: [ROUTES_V2.ASSIGNMENT_LIST],
      childMenu: [
        {
          id: 'addAssignment',
          Icon: AssignmentIconSvg,
          label: 'Add Assignment',
          link: ROUTES_V2.ADD_ASSIGNMENTS
        },
        {
          id: 'reviewAssignment',
          Icon: AssignmentIconSvg,
          label: 'Review Assignment',
          link: ROUTES_V2.REVIEW_ASSIGNMENT
        }
      ]
    },
    {
      id: 'assessment',
      Icon: AssessmentSvg,
      label: 'Assessment',
      link: ROUTES_V2.TESTS,
      activePaths: [
        ROUTES_V2.PATTERNS,
        ROUTES_V2.TESTS,
        ROUTES_V2.CREATE_TEST_PATTERN,
        ROUTES_V2.EDIT_TEST_PATTERN,
        ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST
      ],
      childMenu: [
        {
          id: 'allAssessments',
          Icon: TestsIconSvg,
          label: 'All Assessments',
          link: ROUTES_V2.TESTS
        },
        {
          id: 'assignedAssessments',
          Icon: TestsIconSvg,
          label: 'Assigned Assessments',
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          id: 'unAssignedAssessments',
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessments',
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          id: 'ongoingFinishedAssessments',
          Icon: TestsIconSvg,
          label: 'Ongoing & Finished Assessments',
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        // {
        //   id: 'questionBulkUpload',
        //   Icon: QuestionBulkUploadIconSvg,
        //   label: 'Question Bulk Upload',
        //   link: ROUTES_V2.QUESTION_BULK_UPLOAD
        // },
        {
          id: 'offlineAssessment',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Offline Assessment',
          link: ROUTES_V2.OFFLINE_ASSESSMENT
        }
      ]
    },
    {
      id: 'performanceAnalysis',
      Icon: AssessmentSvg,
      label: 'Performance Analysis',
      link: ROUTES_V2.TEACHER_PERFORMANCE,
      activePaths: [
        ROUTES_V2.TEACHER_PERFORMANCE,
        ROUTES_V2.STUDENT_PERFORMANCE
      ],
      childMenu: [
        {
          id: 'teacherPerformance',
          Icon: AssessmentSvg,
          label: 'My Performance',
          link: ROUTES_V2.TEACHER_PERFORMANCE
        },
        {
          id: 'studentPerformance',
          Icon: AssessmentSvg,
          label: 'Student Performance',
          link: ROUTES_V2.STUDENT_PERFORMANCE
        }
      ]
    },
    {
      id: 'questionBulkUpload',
      Icon: MaterialIconSvg,
      label: 'Question Bulk Upload',
      link: ROUTES_V2.QUESTION_BULK_UPLOAD,
      activePaths: [
        ROUTES_V2.QUESTION_BULK_UPLOAD,
        ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
      ],
      childMenu: [
        {
          id: 'assessmentQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Assessment',
          link: ROUTES_V2.QUESTION_BULK_UPLOAD
        },
        {
          id: 'questionCornerQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Question Corner',
          link: ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
        }
      ]
    },
    {
      id: 'questionCorner',
      Icon: DashboardSvg,
      label: 'Question Corner',
      link: ROUTES_V2.Quiz,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'reports',
      Icon: QuizIconSvg,
      label: 'Reports',
      link: '',
      activePaths: [],
      childMenu: [
        {
          id: 'myPerformance ',
          Icon: PatternIconSvg,
          label: 'My Performance ',
          link: ''
        },
        {
          id: 'studentPerformance',
          Icon: TestsIconSvg,
          label: 'Student Performance',
          link: ''
        }
      ]
    },
    {
      id: 'CRMSupport',
      Icon: AssessmentSvg,
      label: 'CRM Support',
      link: ROUTES_V2.CRM_SUPPORT,
      activePaths: [],
      childMenu: []
    },

    {
      id: 'logout',
      Icon: LogoutSvg,
      label: 'Logout',
      link: ROUTES_V2.LOGOUT,
      activePaths: [],
      childMenu: []
    }
  ],
  student: [
    {
      id: 'dashboard',
      Icon: DashBoardIcon,
      label: 'Dashboard',
      link: ROUTES_V2.STUDENTS_DASHBOARD,
      activePaths: [ROUTES_V2.STUDENTS_DASHBOARD],
      childMenu: []
    },
    {
      id: 'learnModule',
      Icon: LearnIconSvg,
      label: 'Learn Module',
      link: ROUTES_V2.LEARN,
      activePaths: [ROUTES_V2.LEARN],
      childMenu: []
    },
    {
      id: 'assignment',
      Icon: AssignmentIcon,
      label: 'Assignment',
      link: ROUTES_V2.STUDENT_ASSIGNMENT,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'assessment',
      Icon: AssessmentIcon,
      label: 'Assessment',
      link: ROUTES_V2.STUDENT_ASSESSMENT,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'questionCorner',
      Icon: AssessmentIcon,
      label: 'Question Corner',
      link: ROUTES_V2.STUDENT_QUIZ_LIST,
      activePaths: [],
      childMenu: [
        {
          id: 'allQuestionCorner',
          Icon: PatternIconSvg,
          label: 'All',
          link: ''
        }
      ]
    }

    // ...(PRODUCT_TYPE === 'ERP'
    //   ? [
    //       {
    //         Icon: AssignmentIcon,
    //         label: strings.parent.Exam_Time_table.title,
    //         link: ROUTES.EXAM_TIME_TABLE,
    //         activePaths: []
    //       },
    //       {
    //         Icon: AssignmentIcon,
    //         label: strings.parent.eNoticeorSpecial.eNoticeSpecialRemarks,
    //         link: ROUTES.E_NOTICE_OR_SPECIAL_REMARKS,
    //         activePaths: []
    //       },
    //       {
    //         Icon: AssignmentIcon,
    //         label: strings.parent.Events_Reminder.subTitle,
    //         link: ROUTES.EVENTS_REMAINDER,
    //         activePaths: []
    //       },
    //       {
    //         Icon: AssignmentIcon,
    //         label: strings.parent.Exam_Report.title,
    //         link: ROUTES.EXAM_REPORT,
    //         activePaths: []
    //       }
    //     ]
    //   : [])
  ],
  instituteAdmin: [
    {
      id: 'dashboard',
      Icon: DashboardSvg,
      label: 'Dashboard',
      link: ROUTES_V2.DASHBOARD,
      activePaths: [ROUTES_V2.DASHBOARD],
      childMenu: []
    },
    {
      id: 'instituteManagement',
      Icon: instituteSchoolIcon,
      label: 'Institute/School Management',
      link: ROUTES_V2.BRANCH_CARD_LIST,
      activePaths: [ROUTES_V2.BRANCH_CARD_LIST],
      childMenu: [
        {
          id: 'branch',
          Icon: InstitutesSvg,
          label: 'Branch',
          link: ROUTES_V2.BRANCH_CARD_LIST
        },
        {
          id: 'batch',
          Icon: InstitutesSvg,
          label: 'Batch/Section',
          link: ROUTES_V2.BATCH_LIST
        },
        {
          id: 'student',
          Icon: StudentsSvg,
          label: 'Student',
          link: ROUTES_V2.STUDENT_LIST
        },
        {
          id: 'teacher',
          Icon: TeachersSvg,
          label: 'Teacher',
          link: ROUTES_V2.TEACHER_LIST
        },
        {
          id: 'timeTable',
          Icon: InstitutesSvg,
          label: 'Time Table',
          link: ROUTES_V2.TIME_TABLE
        },
        {
          id: 'liveSession',
          Icon: InstitutesSvg,
          label: 'Live Session',
          link: ROUTES_V2.LIVE_SESSION
        }
      ]
    },
    {
      id: 'material',
      Icon: MaterialIconSvg,
      label: 'Material',
      link: ROUTES_V2.MATERIALS,
      activePaths: [ROUTES_V2.MATERIALS],
      childMenu: [
        {
          id: 'viewMaterial',
          Icon: PatternIconSvg,
          label: 'View Material',
          link: ROUTES_V2.VIEW_MATERIAL
        },
        {
          id: 'publishMaterial',
          Icon: PatternIconSvg,
          label: 'Publish Material',
          link: ROUTES_V2.MATERIALS
        }
      ]
    },
    {
      id: 'assignment',
      Icon: AssignmentIconSvg,
      label: 'Assignment',
      link: ROUTES_V2.ASSIGNMENT_LIST,
      activePaths: [ROUTES_V2.ASSIGNMENT_LIST],
      childMenu: []
    },
    {
      id: 'assessment',
      Icon: examStudentIcon,
      label: 'Assessment',
      link: ROUTES_V2.TESTS,
      activePaths: [
        ROUTES_V2.PATTERNS,
        ROUTES_V2.TESTS,
        ROUTES_V2.CREATE_TEST_PATTERN,
        ROUTES_V2.EDIT_TEST_PATTERN,
        ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST
      ],
      childMenu: [
        {
          id: 'pattern',
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          link: ROUTES_V2.PATTERNS
        },
        {
          id: 'allAssessments',
          Icon: TestsIconSvg,
          label: 'All Assessments',
          link: ROUTES_V2.TESTS
        },
        {
          id: 'assignedAssessments',
          Icon: TestsIconSvg,
          label: 'Assigned Assessments',
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          id: 'unAssignedAssessments',
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessments',
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          id: 'ongoingFinishedAssessments',
          Icon: TestsIconSvg,
          label: 'Ongoing & Finished Assessments',
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          id: 'questionBulkUpload',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Question Bulk Upload',
          link: ROUTES_V2.QUESTION_BULK_UPLOAD
        }
      ]
    },
    {
      id: 'questionBulkUpload',
      Icon: MaterialIconSvg,
      label: 'Question Bulk Upload',
      link: ROUTES_V2.QUESTION_BULK_UPLOAD,
      activePaths: [
        ROUTES_V2.QUESTION_BULK_UPLOAD,
        ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
      ],
      childMenu: [
        {
          id: 'assessmentQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Assessment Questions',
          link: ROUTES_V2.QUESTION_BULK_UPLOAD
        },
        {
          id: 'questionCornerQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Question Corner',
          link: ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
        }
      ]
    },
    {
      id: 'settings',
      Icon: settingsIcon,
      label: 'Settings',
      link: ROUTES_V2.STUDENT_FORM_MASTER,
      activePaths: [
        ROUTES_V2.COURSE_CARD_LIST,
        ROUTES_V2.CREATE_SUBJECTS,
        ROUTES_V2.STUDENT_FORM_MASTER,
        ROUTES_V2.TEACHER_FORM_MASTER,
        ROUTES_V2.MENU_MASTER
      ],
      childMenu: [
        {
          id: 'courseMaster',
          Icon: CoursesSvg,
          label: 'Grade Master',
          link: ROUTES_V2.COURSE_CARD_LIST
        },
        {
          id: 'subjectMaster',
          Icon: SubjectSvg,
          label: 'Subject Master',
          link: ROUTES_V2.CREATE_SUBJECTS
        },
        {
          id: 'studentFormMaster',
          Icon: TestsIconSvg,
          label: 'Student Form Master',
          link: ROUTES_V2.STUDENT_FORM_MASTER
        },
        {
          id: 'teacherFormMaster',
          Icon: TestsIconSvg,
          label: 'Teacher Form Master',
          link: ROUTES_V2.TEACHER_FORM_MASTER
        },
        {
          id: 'leavePlanner',
          Icon: TestsIconSvg,
          label: 'Holiday Planner',
          link: ROUTES_V2.LEAVE_PLANNER
        },
        {
          id: 'academicPlanner',
          Icon: TestsIconSvg,
          label: 'Academic Year Planner',
          link: ROUTES_V2.ACADEMIC_YEAR_PLANNER
        },
        {
          id: 'lessonPlanner',
          Icon: TestsIconSvg,
          label: 'Lesson Planner',
          link: ROUTES_V2.LESSON_PLANNER
        },
        {
          id: 'timeTableMaster',
          Icon: TestsIconSvg,
          label: 'Time Table Master',
          link: ROUTES_V2.TIME_TABLE_MASTER
        },
        {
          id: 'menuMaster',
          Icon: TestsIconSvg,
          label: 'Menu Master',
          link: ROUTES_V2.MENU_MASTER
        },
        {
          id: 'questionBankCourseMapping',
          Icon: TestsIconSvg,
          label: 'Grade Mapping',
          link: ROUTES_V2.COURSE_MAPPING
        }
      ]
    },
    {
      id: 'learnModule',
      Icon: LearnIconSvg,
      label: 'Learn Module',
      link: ROUTES_V2.LEARN,
      activePaths: [ROUTES_V2.LEARN],
      childMenu: []
    },
    {
      id: 'publishMaterial',
      Icon: LearnIconSvg,
      label: 'Publish Material',
      link: ROUTES_V2.MATERIALS,
      activePaths: [ROUTES_V2.MATERIALS],
      childMenu: []
    },
    {
      id: 'performanceAnalysis',
      Icon: AssessmentSvg,
      label: 'Performance Analysis',
      link: ROUTES_V2.TEACHER_PERFORMANCE,
      activePaths: [ROUTES_V2.TEACHER_PERFORMANCE],
      childMenu: [
        {
          id: 'teacherPerformance',
          Icon: AssessmentSvg,
          label: 'Teacher Performance',
          link: ROUTES_V2.TEACHER_PERFORMANCE
        }
      ]
    },
    {
      id: 'CRMSupport',
      Icon: AssessmentSvg,
      label: 'CRM Support',
      link: ROUTES_V2.CRM_SUPPORT,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'logout',
      Icon: LogoutSvg,
      label: 'Logout',
      link: ROUTES_V2.LOGOUT,
      activePaths: [],
      childMenu: []
    }
  ],
  branchAdmin: [
    {
      id: 'dashboard',
      Icon: DashboardSvg,
      label: 'Dashboard',
      link: ROUTES_V2.DASHBOARD,
      activePaths: [ROUTES_V2.DASHBOARD],
      childMenu: []
    },
    {
      id: 'instituteManagement',
      Icon: instituteSchoolIcon,
      label: 'Institute/School Management',
      link: ROUTES_V2.BATCH_LIST,
      activePaths: [ROUTES_V2.BATCH_LIST],
      childMenu: [
        {
          id: 'batch',
          Icon: InstitutesSvg,
          label: 'Batch/Section',
          link: ROUTES_V2.BATCH_LIST
        },
        {
          id: 'student',
          Icon: StudentsSvg,
          label: 'Student',
          link: ROUTES_V2.STUDENT_LIST
        },
        {
          id: 'teacher',
          Icon: TeachersSvg,
          label: 'Teacher',
          link: ROUTES_V2.TEACHER_LIST
        },
        {
          id: 'timeTable',
          Icon: InstitutesSvg,
          label: 'Time Table',
          link: ROUTES_V2.TIME_TABLE
        },
        {
          id: 'liveSession',
          Icon: InstitutesSvg,
          label: 'Live Session',
          link: ROUTES_V2.LIVE_SESSION
        }
      ]
    },
    {
      id: 'contentUpload',
      Icon: MaterialIconSvg,
      label: 'Content Upload',
      link: ROUTES_V2.MATERIAL_UPLOAD,
      activePaths: [ROUTES_V2.MATERIAL_UPLOAD],
      childMenu: [
        {
          id: 'materialUpload',
          Icon: SubjectSvg,
          label: 'Material Upload',
          link: ROUTES_V2.MATERIAL_UPLOAD
        },
        {
          id: 'chapterMaster',
          Icon: SubjectSvg,
          label: 'Chapter Master',
          link: ROUTES_V2.CHAPTERS
        },
        {
          id: 'topicMaster',
          Icon: SubjectSvg,
          label: 'Topic Master',
          link: ROUTES_V2.LIST_TOPICS
        },
        {
          id: 'subTopicMaster',
          Icon: SubjectSvg,
          label: 'SubTopic Master',
          link: ROUTES_V2.LIST_SUB_TOPICS
        }
      ]
    },
    {
      id: 'manageBookQRCode',
      Icon: DashboardSvg,
      label: 'Manage Book QR Code',
      link: ROUTES_V2.PUBLISH_GAME,
      activePaths: [ROUTES_V2.PUBLISH_GAME],
      childMenu: [
        {
          id: 'videoORCode',
          Icon: ManageContent,
          label: 'Video QR Code',
          link: ROUTES_V2.QRCODE_LIST
        },
        {
          id: 'gameORCode',
          Icon: ManageContent,
          label: 'Game QR Code',
          link: ROUTES_V2.PUBLISH_GAME
        }
      ]
    },
    {
      id: 'material',
      Icon: MaterialIconSvg,
      label: 'Material',
      link: ROUTES_V2.MATERIALS,
      activePaths: [ROUTES_V2.MATERIALS],
      childMenu: [
        {
          id: 'viewMaterial',
          Icon: PatternIconSvg,
          label: 'View Material',
          link: ROUTES_V2.VIEW_MATERIAL
        },
        {
          id: 'publishMaterial',
          Icon: PatternIconSvg,
          label: 'Publish Material',
          link: ROUTES_V2.MATERIALS
        }
      ]
    },
    {
      id: 'assignment',
      Icon: AssignmentIconSvg,
      label: 'Assignment',
      link: ROUTES_V2.ASSIGNMENT_LIST,
      activePaths: [ROUTES_V2.ASSIGNMENT_LIST],
      childMenu: []
    },
    {
      id: 'assessment',
      Icon: examStudentIcon,
      label: 'Assessment',
      link: ROUTES_V2.TESTS,
      activePaths: [
        ROUTES_V2.PATTERNS,
        ROUTES_V2.TESTS,
        ROUTES_V2.CREATE_TEST_PATTERN,
        ROUTES_V2.EDIT_TEST_PATTERN,
        ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST
      ],
      childMenu: [
        {
          id: 'pattern',
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          link: ROUTES_V2.PATTERNS
        },
        {
          id: 'allAssessments',
          Icon: TestsIconSvg,
          label: 'All Assessments',
          link: ROUTES_V2.TESTS
        },
        {
          id: 'assignedAssessments',
          Icon: TestsIconSvg,
          label: 'Assigned Assessments',
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          id: 'unAssignedAssessments',
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessments',
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          id: 'ongoingFinishedAssessments',
          Icon: TestsIconSvg,
          label: 'Ongoing & Finished Assessments',
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          id: 'questionBulkUpload',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Question Bulk Upload',
          link: ROUTES_V2.QUESTION_BULK_UPLOAD
        }
      ]
    },
    {
      id: 'questionBulkUpload',
      Icon: MaterialIconSvg,
      label: 'Question Bulk Upload',
      link: ROUTES_V2.QUESTION_BULK_UPLOAD,
      activePaths: [
        ROUTES_V2.QUESTION_BULK_UPLOAD,
        ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
      ],
      childMenu: [
        {
          id: 'assessmentQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Assessment',
          link: ROUTES_V2.QUESTION_BULK_UPLOAD
        },
        {
          id: 'questionCornerQuestions',
          Icon: QuestionBulkUploadIconSvg,
          label: 'Question Corner',
          link: ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD
        }
      ]
    },
    {
      id: 'settings',
      Icon: AssessmentSvg,
      label: 'Settings',
      link: ROUTES_V2.STUDENT_FORM_MASTER,
      activePaths: [
        ROUTES_V2.COURSE_CARD_LIST,
        ROUTES_V2.CREATE_SUBJECTS,
        ROUTES_V2.STUDENT_FORM_MASTER,
        ROUTES_V2.TEACHER_FORM_MASTER,
        ROUTES_V2.MENU_MASTER
      ],
      childMenu: [
        {
          id: 'courseMaster',
          Icon: CoursesSvg,
          label: 'Grade Master',
          link: ROUTES_V2.COURSE_CARD_LIST
        },
        {
          id: 'subjectMaster',
          Icon: SubjectSvg,
          label: 'Subject Master',
          link: ROUTES_V2.CREATE_SUBJECTS
        },
        {
          id: 'studentFormMaster',
          Icon: TestsIconSvg,
          label: 'Student Form Master',
          link: ROUTES_V2.STUDENT_FORM_MASTER
        },
        {
          id: 'teacherFormMaster',
          Icon: TestsIconSvg,
          label: 'Teacher Form Master',
          link: ROUTES_V2.TEACHER_FORM_MASTER
        },
        {
          id: 'leavePlanner',
          Icon: TestsIconSvg,
          label: 'Holiday Planner',
          link: ROUTES_V2.LEAVE_PLANNER
        },
        {
          id: 'academicPlanner',
          Icon: TestsIconSvg,
          label: 'Academic Year Planner',
          link: ROUTES_V2.ACADEMIC_YEAR_PLANNER
        },
        {
          id: 'lessonPlanner',
          Icon: TestsIconSvg,
          label: 'Lesson Planner',
          link: ROUTES_V2.LESSON_PLANNER
        },
        {
          id: 'timeTableMaster',
          Icon: TestsIconSvg,
          label: 'Time Table Master',
          link: ROUTES_V2.TIME_TABLE_MASTER
        },
        {
          id: 'menuMaster',
          Icon: TestsIconSvg,
          label: 'Menu Master',
          link: ROUTES_V2.MENU_MASTER
        }
      ]
    },
    {
      id: 'performanceAnalysis',
      Icon: AssessmentSvg,
      label: 'Performance Analysis',
      link: ROUTES_V2.TEACHER_PERFORMANCE,
      activePaths: [ROUTES_V2.TEACHER_PERFORMANCE],
      childMenu: [
        {
          id: 'teacherPerformance',
          Icon: AssessmentSvg,
          label: 'Teacher Performance',
          link: ROUTES_V2.TEACHER_PERFORMANCE
        }
      ]
    },
    {
      id: 'learnModule',
      Icon: LearnIconSvg,
      label: 'Learn Module',
      link: ROUTES_V2.LEARN,
      activePaths: [ROUTES_V2.LEARN],
      childMenu: []
    },
    {
      id: 'CRMSupport',
      Icon: AssessmentSvg,
      label: 'CRM Support',
      link: ROUTES_V2.CRM_SUPPORT,
      activePaths: [],
      childMenu: []
    },
    {
      id: 'logout',
      Icon: LogoutSvg,
      label: 'Logout',
      link: ROUTES_V2.LOGOUT,
      activePaths: [],
      childMenu: []
    }
  ]
}
