import ROUTES_V2 from './routes'

import { ReactComponent as CourseIconSvg } from '../../assets/svg/courses-icon.svg'
import { ReactComponent as SubjectIconSvg } from '../../assets/svg/subjects-icon.svg'
import { ReactComponent as StudentsIconSvg } from '../../assets/svg/students-icon.svg'
import { ReactComponent as InstituteIconSvg } from '../../assets/svg/institutes-icon.svg'
import { ReactComponent as TeachersIconSvg } from '../../assets/svg/teachers-icon.svg'
import { ReactComponent as PatternIconSvg } from '../../assets/svg/pattern-icon.svg'
import { ReactComponent as TestsIconSvg } from '../../assets/svg/tests-icon.svg'
import { ReactComponent as TestsSubmittedIconSvg } from '../../assets/svg/tests-submitted-icon.svg'

export const topHeaderValues: any = {
  superAdmin: {
    [ROUTES_V2.CREATE_TEST_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Create Assessment Pattern/Template',
      btnText: 'Create Pattern',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_TEST_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Edit Assessment Pattern/Template',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Create Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.DASHBOARD]: {
      backbBtn: false,
      mainTitle: 'Main Dashboard',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: InstituteIconSvg,
          label: 'Institutes / Schools',
          value: 100,
          link: ROUTES_V2.INSTITUTE_CARD_LIST
        },
        {
          Icon: InstituteIconSvg,
          label: 'Branches',
          value: 200,
          link: ROUTES_V2.BRANCH_CARD_LIST
        },
        {
          Icon: InstituteIconSvg,
          label: 'Batch/Section',
          value: 200,
          link: ROUTES_V2.BATCH_LIST
        },
        {
          Icon: StudentsIconSvg,
          label: 'Students',
          value: 100,
          link: ROUTES_V2.STUDENT_LIST
        },
        {
          Icon: TeachersIconSvg,
          label: 'Teachers',
          value: 30,
          link: ROUTES_V2.TEACHER_LIST
        }
      ]
    },
    [ROUTES_V2.ADD_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHER_ADD_QUESTION]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_TEST_PREVIEW]: {
      mainTitle: 'Preview Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PATTERNS]: {
      backbBtn: false,
      mainTitle: 'Assessment Pattern/Template',
      btnText: 'Create Pattern',
      btnUrl: ROUTES_V2.CREATE_TEST_PATTERN,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.TEACHER_ANALYTICS]: {
      backbBtn: true,
      mainTitle: 'Analytics',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        // {
        //   Icon: PatternIconSvg,
        //   label: 'Pattern/Template',
        //   value: 200,
        //   link: ROUTES_V2.PATTERNS
        // },
        // {
        //   Icon: TestsIconSvg,
        //   label: 'All Tests',
        //   value: 200,
        //   link: ROUTES_V2.TESTS
        // },
        // {
        //   Icon: TestsSubmittedIconSvg,
        //   label: 'Ongoing & Finished Assessment',
        //   value: 200,
        //   link: ROUTES_V2.SUBMITTED_TESTS
        // }
      ]
    },
    [ROUTES_V2.TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.COURSE_CARD_LIST]: {
      backbBtn: false,
      mainTitle: 'Grades',
      btnText: 'Add Grades',
      btnUrl: ROUTES_V2.ADD_COURSE_V2,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: CourseIconSvg,
          label: 'Grade',
          value: 200,
          link: ROUTES_V2.COURSE_CARD_LIST
        }
        // {
        //   Icon: SubjectIconSvg,
        //   label: 'Subjects',
        //   value: 200,
        //   link: ROUTES_V2.CREATE_SUBJECTS
        // }
      ]
    },
    [ROUTES_V2.ADD_COURSE_V2]: {
      backbBtn: true,
      mainTitle: 'Add Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_COURSE_V2]: {
      backbBtn: true,
      mainTitle: 'Edit Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SUBJECTS]: {
      backbBtn: false,
      mainTitle: 'Create Subjects',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        // {
        //   Icon: CourseIconSvg,
        //   label: 'Grades',
        //   value: 200,
        //   link: ROUTES_V2.COURSE_CARD_LIST
        // },
        {
          Icon: SubjectIconSvg,
          label: 'Subjects',
          value: 200,
          link: ROUTES_V2.CREATE_SUBJECTS
        }
      ]
    },
    [ROUTES_V2.ADDSTUDENT]: {
      backbBtn: true,
      mainTitle: 'Add Student',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Edit Student',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Student Details',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.INSTITUTE_CARD_LIST]: {
      backbBtn: false,
      mainTitle: 'Institute / School',
      btnText: 'Add Institute / School',
      btnUrl: `${ROUTES_V2.ADD_INSTITUTE}`,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Institutes / Schools',
        //   value: 100,
        //   link: ROUTES_V2.INSTITUTE_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Branches',
        //   value: 200,
        //   link: ROUTES_V2.BRANCH_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Batch/Section',
        //   value: 200,
        //   link: ROUTES_V2.BATCH_LIST
        // },
        // {
        //   Icon: StudentsIconSvg,
        //   label: 'Students',
        //   value: 100,
        //   link: ROUTES_V2.STUDENT_LIST
        // },
        // {
        //   Icon: TeachersIconSvg,
        //   label: 'Teachers',
        //   value: 30,
        //   link: ROUTES_V2.ASSIGN_TEACHER
        // }
      ]
    },
    [ROUTES_V2.BRANCH_CARD_LIST]: {
      backbBtn: false,
      mainTitle: 'Branches',
      btnText: 'Add Branch',
      btnUrl: `${ROUTES_V2.ADD_BRANCH}`,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Institutes / Schools',
        //   value: 100,
        //   link: ROUTES_V2.INSTITUTE_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Branches',
        //   value: 200,
        //   link: ROUTES_V2.BRANCH_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Batch/Section',
        //   value: 200,
        //   link: ROUTES_V2.BATCH_LIST
        // },
        // {
        //   Icon: StudentsIconSvg,
        //   label: 'Students',
        //   value: 100,
        //   link: ROUTES_V2.STUDENT_LIST
        // },
        // {
        //   Icon: TeachersIconSvg,
        //   label: 'Teachers',
        //   value: 30,
        //   link: ROUTES_V2.ASSIGN_TEACHER
        // }
      ]
    },
    [`${ROUTES_V2.ADD_INSTITUTE}`]: {
      backbBtn: true,
      mainTitle: 'Add Institute / School',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.EDIT_INSTITUTE}`]: {
      backbBtn: true,
      mainTitle: 'Edit Institute / School',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.EDIT_BRANCH}`]: {
      backbBtn: true,
      mainTitle: 'Edit Branch',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_BATCH]: {
      backbBtn: true,
      mainTitle: 'Edit Batch',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TIME_TABLE]: {
      backbBtn: false,
      mainTitle: 'Time Table',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LIVE_SESSION]: {
      backbBtn: false,
      mainTitle: 'Live Session',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LEAVE_PLANNER]: {
      backbBtn: false,
      mainTitle: 'Holiday Planner',
      btnText: 'Add Holiday',
      btnUrl: ROUTES_V2.ADD_HOLIDAY,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_HOLIDAY]: {
      backbBtn: true,
      mainTitle: 'Add Holiday',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_HOLIDAY]: {
      backbBtn: true,
      mainTitle: 'Edit Holiday',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LESSON_PLANNER]: {
      backbBtn: false,
      mainTitle: 'Lesson Planner',
      btnText2: 'Create',
      btnUrl2: ROUTES_V2.CREATE_LESSON_PLANNER,
      tabs: []
    },
    [ROUTES_V2.CREATE_LESSON_PLANNER]: {
      backbBtn: true,
      mainTitle: 'Create Lesson Planner',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_LESSON_PLANNER]: {
      backbBtn: true,
      mainTitle: 'Edit Lesson Planner',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGN_LESSON_PLANNER]: {
      backbBtn: true,
      mainTitle: 'Assign Lesson',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TIME_TABLE_MASTER]: {
      backbBtn: false,
      mainTitle: 'Time Table Master',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_BATCH_DETAILS]: {
      backbBtn: true,
      mainTitle: 'Batch Details',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.ADD_BRANCH}`]: {
      backbBtn: true,
      mainTitle: 'Add Branch',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.ADD_BATCH}`]: {
      backbBtn: true,
      mainTitle: 'Add Batch / Section',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BOARDS]: {
      backbBtn: false,
      mainTitle: 'Board',
      tabs: []
    },
    [ROUTES_V2.STUDENT_FORM_MASTER]: {
      backbBtn: false,
      mainTitle: 'Student Form Master',
      tabs: []
    },
    [ROUTES_V2.TEACHER_FORM_MASTER]: {
      backbBtn: false,
      mainTitle: 'Teacher Form Master',
      tabs: []
    },
    [ROUTES_V2.STUDENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Student List',
      btnText: 'Add Student',
      btnUrl: ROUTES_V2.ADDSTUDENT,
      btnText2: 'Bulk Upload Student',
      btnUrl2: ROUTES_V2.STUDENTS_BULK_UPLOADS,
      tabs: [
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Institutes / Schools',
        //   value: 100,
        //   link: ROUTES_V2.INSTITUTE_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Branches',
        //   value: 200,
        //   link: ROUTES_V2.BRANCH_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Batch/Section',
        //   value: 200,
        //   link: ROUTES_V2.BATCH_LIST
        // },
        // {
        //   Icon: StudentsIconSvg,
        //   label: 'Students',
        //   value: 100,
        //   link: ROUTES_V2.STUDENT_LIST
        // },
        // {
        //   Icon: TeachersIconSvg,
        //   label: 'Teachers',
        //   value: 30,
        //   link: ROUTES_V2.ASSIGN_TEACHER
        // }
      ]
    },
    [ROUTES_V2.CHAPTERS]: {
      backbBtn: false,
      mainTitle: 'Chapter List',
      btnText: 'Create Chapters',
      btnUrl: `${ROUTES_V2.CREATE_CHAPTERS}`,
      btnText2: 'Create Chapters in Bulk',
      btnUrl2: ROUTES_V2.CHAPTERS_BULK_UPLOAD,
      tabs: []
    },
    [ROUTES_V2.CHAPTERS_BULK_UPLOAD]: {
      backbBtn: true,
      mainTitle: 'Chapter Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_CHAPTERS]: {
      backbBtn: true,
      mainTitle: 'Create Chapter',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_CHAPTERS]: {
      backbBtn: true,
      mainTitle: 'Edit Chapter',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_CHAPTER_DETAILS]: {
      backbBtn: true,
      mainTitle: 'Chapter Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LIST_TOPICS]: {
      mainTitle: 'Topic List',
      btnText: 'Create Topic',
      btnUrl: ROUTES_V2.CREATE_TOPICS,
      btnText2: 'Create Topics In Bulk',
      btnUrl2: ROUTES_V2.BULK_UPLOAD_TOPICS,
      tabs: []
    },
    [ROUTES_V2.LIST_SUB_TOPICS]: {
      mainTitle: 'Sub-Topic List',
      btnText: 'Create Sub Topic',
      btnUrl: ROUTES_V2.CREATE_SUB_TOPICS,
      btnText2: 'Create Sub Topics In Bulk',
      btnUrl2: ROUTES_V2.BULK_UPLOAD_SUB_TOPICS,
      tabs: []
    },
    [ROUTES_V2.CONTENT_MATERIALS]: {
      mainTitle: 'Materials',
      btnText: 'Add Material',
      btnUrl: ROUTES_V2.ADD_MATERIALS,
      btnText2: 'Add Material In Bulk',
      btnUrl2: ROUTES_V2.MATERIAL_UPLOAD,
      tabs: []
    },
    [ROUTES_V2.ADD_MATERIALS]: {
      backbBtn: true,
      mainTitle: 'Add Material',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.EDIT_TOPICS}`]: {
      backbBtn: true,
      mainTitle: 'Edit Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.VIEW_TOPICS}`]: {
      backbBtn: true,
      mainTitle: 'Topic Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Sub Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Edit Sub Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Sub Topic Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BULK_UPLOAD_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Topics In Bulk',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BULK_UPLOAD_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Sub Topics In Bulk',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTIONS_WITHOUT_PATTERN]: {
      backbBtn: false,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.NO_PATTERN_TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.TEACHER_LIST]: {
      backbBtn: false,
      mainTitle: 'Teacher List',
      btnText: 'Add Teacher',
      btnUrl: ROUTES_V2.ADD_TEACHER,
      btnText2: 'Bulk Upload Teacher',
      btnUrl2: ROUTES_V2.STUDENTS_BULK_UPLOADS,
      tabs: [
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Institutes / Schools',
        //   value: 100,
        //   link: ROUTES_V2.INSTITUTE_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Branches',
        //   value: 200,
        //   link: ROUTES_V2.BRANCH_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Batch/Section',
        //   value: 200,
        //   link: ROUTES_V2.BATCH_LIST
        // },
        // {
        //   Icon: StudentsIconSvg,
        //   label: 'Students',
        //   value: 100,
        //   link: ROUTES_V2.STUDENT_LIST
        // },
        // {
        //   Icon: TeachersIconSvg,
        //   label: 'Teachers',
        //   value: 30,
        //   link: ROUTES_V2.ASSIGN_TEACHER
        // }
      ]
    },
    [ROUTES_V2.ASSIGNMENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Assignment List',
      btnText: 'Add Assignment',
      btnUrl: ROUTES_V2.ADD_ASSIGNMENTS,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Add Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },

    [ROUTES_V2.ASSIGNMENT_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Edit Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BATCH_LIST]: {
      backbBtn: false,
      mainTitle: 'Batches / Sections',
      btnText: 'Add Batch / Section',
      btnUrl: ROUTES_V2.ADD_BATCH,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Institutes / Schools',
        //   value: 100,
        //   link: ROUTES_V2.INSTITUTE_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Branches',
        //   value: 200,
        //   link: ROUTES_V2.BRANCH_CARD_LIST
        // },
        // {
        //   Icon: InstituteIconSvg,
        //   label: 'Batch/Section',
        //   value: 200,
        //   link: ROUTES_V2.BATCH_LIST
        // },
        // {
        //   Icon: StudentsIconSvg,
        //   label: 'Students',
        //   value: 100,
        //   link: ROUTES_V2.STUDENT_LIST
        // },
        // {
        //   Icon: TeachersIconSvg,
        //   label: 'Teachers',
        //   value: 30,
        //   link: ROUTES_V2.ASSIGN_TEACHER
        // }
      ]
    },
    [ROUTES_V2.ADD_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Add Teacher',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Edit Teacher',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Teacher Details',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGN_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Assign Teacher',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TOP_RANKERS_LIST]: {
      backbBtn: true,
      mainTitle: 'Back to test status',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.USERPROFILE]: {
      backbBtn: true,
      mainTitle: 'Profile',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Edit Test',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Test Details',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Question Corner Bulk Upload',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENTS_BULK_UPLOADS]: {
      backbBtn: true,
      mainTitle: 'User Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MATERIAL_UPLOAD]: {
      backbBtn: true,
      mainTitle: 'Material Upload',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PUBLISH_GAME]: {
      backbBtn: false,
      mainTitle: 'Game QRCode',
      topTitle: '',
      btnText: 'Create',
      btnUrl: ROUTES_V2.UPLOAD_GAME,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QRCODE_LIST]: {
      backbBtn: false,
      mainTitle: 'Video QR Code',
      topTitle: '',
      btnText: 'Create QRCode',
      btnUrl: ROUTES_V2.CREATE_QRCODE,
      btnText2: 'Create Bulk QRCode',
      btnUrl2: ROUTES_V2.CREATE_BULK_QRCODE,
      tabs: []
    },
    [ROUTES_V2.CREATE_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Create QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Edit QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.UPLOAD_GAME]: {
      backbBtn: true,
      mainTitle: 'Create Game QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_BULK_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Create Bulk QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.USERPROFILE]: {
      backbBtn: true,
      mainTitle: 'Profile',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MATERIAL_UPLOAD]: {
      backbBtn: true,
      mainTitle: 'Material Upload',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LEARN]: {
      mainTitle: 'Learn',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MENU_MASTER]: {
      backbBtn: false,
      mainTitle: 'Menu Master',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.COURSE_MAPPING]: {
      backbBtn: false,
      mainTitle: 'Grade Mapping',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MATERIALS]: {
      backbBtn: false,
      mainTitle: ' Publish Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_MATERIAL]: {
      backbBtn: false,
      mainTitle: 'View Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CRM_SUPPORT]: {
      backbBtn: false,
      mainTitle: 'CRM Support',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    }
  },

  student: {
    [ROUTES_V2.STUDENTS_DASHBOARD]: {
      backbBtn: false,
      mainTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        // {
        //   Icon: LearnIconSvg,
        //   label: 'Learn',
        //   value: 200,
        //   link: ROUTES_V2.LEARN
        // },
        // {
        //   Icon: MaterialIconSvg,
        //   label: 'Materials',
        //   value: 200,
        //   link: ROUTES_V2.MATERIALS
        // }
      ]
    },
    [ROUTES_V2.STUDENT_ASSESSMENT]: {
      backbBtn: false,
      mainTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ATTEMPT_TEST]: {
      backbBtn: false,
      mainTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LEARN]: {
      backbBtn: false,
      mainTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    }
  },
  instituteAdmin: {
    [ROUTES_V2.DASHBOARD]: {
      backbBtn: false,
      mainTitle: 'Main Dashboard',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_TEST_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Edit Assessment Pattern/Template',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.NO_PATTERN_TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.LEARN]: {
      mainTitle: 'Learn',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTIONS_WITHOUT_PATTERN]: {
      backbBtn: false,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PATTERNS]: {
      backbBtn: false,
      mainTitle: 'Assessment Pattern/Template',
      btnText: 'Create Pattern',
      btnUrl: ROUTES_V2.CREATE_TEST_PATTERN,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.ADD_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CHAPTERS_BULK_UPLOAD]: {
      backbBtn: true,
      mainTitle: 'Chapter Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MENU_MASTER]: {
      backbBtn: false,
      mainTitle: 'Menu Master',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHER_ADD_QUESTION]: {
      backbBtn: true,
      mainTitle: 'All Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_TEST_PREVIEW]: {
      backbBtn: false,
      mainTitle: 'Preview Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.ASSIGNMENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Assignment List',
      btnText: 'Add Assignment',
      btnUrl: ROUTES_V2.ADD_ASSIGNMENTS,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MATERIALS]: {
      backbBtn: false,
      mainTitle: ' Publish Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_MATERIAL]: {
      backbBtn: false,
      mainTitle: 'View Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.COURSE_CARD_LIST]: {
      backbBtn: false,
      mainTitle: 'Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: CourseIconSvg,
          label: 'Grade',
          value: 200,
          link: ROUTES_V2.COURSE_CARD_LIST
        }
      ]
    },
    [ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Question Corner Bulk Upload',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_COURSE_V2]: {
      backbBtn: true,
      mainTitle: 'Add Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_COURSE_V2]: {
      backbBtn: true,
      mainTitle: 'Edit Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SUBJECTS]: {
      backbBtn: false,
      mainTitle: 'Create Subjects',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: SubjectIconSvg,
          label: 'Subjects',
          value: 200,
          link: ROUTES_V2.CREATE_SUBJECTS
        }
      ]
    },
    [ROUTES_V2.CHAPTERS]: {
      mainTitle: 'Chapter List',
      btnText: 'Create Chapters',
      btnUrl: `${ROUTES_V2.CREATE_CHAPTERS}`,
      btnText2: 'Create Chapters in Bulk',
      btnUrl2: ROUTES_V2.CHAPTERS_BULK_UPLOAD,
      tabs: [
        {
          Icon: SubjectIconSvg,
          label: 'Chapters',
          value: 200,
          link: ROUTES_V2.CHAPTERS
        }
      ]
    },
    [ROUTES_V2.EDIT_CHAPTERS]: {
      backbBtn: true,
      mainTitle: 'Edit Chapter',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_CHAPTER_DETAILS]: {
      backbBtn: true,
      mainTitle: 'Chapter Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LIST_TOPICS]: {
      mainTitle: 'Topic List',
      btnText: 'Create Topic',
      btnUrl: ROUTES_V2.CREATE_TOPICS,
      btnText2: 'Create Topics In Bulk',
      btnUrl2: ROUTES_V2.BULK_UPLOAD_TOPICS,
      tabs: []
    },
    [ROUTES_V2.LIST_SUB_TOPICS]: {
      mainTitle: 'Sub-Topic List',
      btnText: 'Create Sub Topic',
      btnUrl: ROUTES_V2.CREATE_SUB_TOPICS,
      btnText2: 'Create Sub Topics In Bulk',
      btnUrl2: ROUTES_V2.BULK_UPLOAD_SUB_TOPICS,
      tabs: []
    },
    [ROUTES_V2.CREATE_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.EDIT_TOPICS}`]: {
      backbBtn: true,
      mainTitle: 'Edit Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.VIEW_TOPICS}`]: {
      backbBtn: true,
      mainTitle: 'Topic Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Sub Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Edit Sub Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Sub Topic Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BULK_UPLOAD_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Topics In Bulk',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BULK_UPLOAD_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Sub Topics In Bulk',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADDSTUDENT]: {
      backbBtn: true,
      mainTitle: 'Add Student',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Edit Student',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Student Details',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CHAPTERS_BULK_UPLOAD]: {
      backbBtn: true,
      mainTitle: 'Chapter Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.ADD_BRANCH}`]: {
      backbBtn: true,
      mainTitle: 'Add Branch',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.ADD_BATCH}`]: {
      backbBtn: true,
      mainTitle: 'Add Batch / Section',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.EDIT_BRANCH}`]: {
      backbBtn: true,
      mainTitle: 'Edit Branch',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_BATCH]: {
      backbBtn: true,
      mainTitle: 'Edit Batch / Section',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_BATCH_DETAILS]: {
      backbBtn: true,
      mainTitle: 'Batch / Section Details',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.REVIEW_ASSIGNMENT]: {
      backbBtn: true,
      mainTitle: 'Review Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Add Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGNMENT_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Edit Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Student List',
      btnText: 'Add Student',
      btnUrl: ROUTES_V2.ADDSTUDENT,
      btnText2: 'Bulk Upload Student',
      btnUrl2: ROUTES_V2.STUDENTS_BULK_UPLOADS,
      tabs: [
        {
          Icon: StudentsIconSvg,
          label: 'Students',
          value: 200,
          link: ROUTES_V2.STUDENT_LIST
        }
      ]
    },
    [ROUTES_V2.TEACHER_LIST]: {
      backbBtn: false,
      mainTitle: 'Teacher List',
      btnText: 'Add Teacher',
      btnUrl: ROUTES_V2.ADD_TEACHER,
      btnText2: 'Bulk Upload Teacher',
      btnUrl2: ROUTES_V2.STUDENTS_BULK_UPLOADS,
      tabs: [
        {
          Icon: TeachersIconSvg,
          label: 'Teachers',
          value: 200,
          link: ROUTES_V2.TEACHER_LIST
        }
      ]
    },
    [ROUTES_V2.EDIT_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Edit Teacher',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Teacher Details',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGN_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Assign Teacher',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHER_PERFORMANCE]: {
      backbBtn: false,
      mainTitle: 'Teacher Performance',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BRANCH_CARD_LIST]: {
      backbBtn: false,
      mainTitle: 'Branches',
      btnText: 'Add Branch',
      btnUrl: `${ROUTES_V2.ADD_BRANCH}`,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BATCH_LIST]: {
      backbBtn: false,
      mainTitle: 'Batches / Sections',
      btnText: 'Add Batch / Section',
      btnUrl: ROUTES_V2.ADD_BATCH,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Add Teacher',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.USERPROFILE]: {
      backbBtn: true,
      mainTitle: 'Profile',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Edit Assessment',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Test Details',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PUBLISH_GAME]: {
      backbBtn: false,
      mainTitle: 'Manage Content',
      topTitle: '',
      btnText: 'Create',
      btnUrl: ROUTES_V2.UPLOAD_GAME,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.UPLOAD_GAME]: {
      backbBtn: false,
      mainTitle: 'Upload Content',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.USERPROFILE]: {
      backbBtn: true,
      mainTitle: 'Profile',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QRCODE_LIST]: {
      backbBtn: false,
      mainTitle: 'Video QR Code',
      topTitle: '',
      btnText: 'Create QRCode',
      btnUrl: ROUTES_V2.CREATE_QRCODE,
      btnText2: 'Create Bulk QRCode',
      btnUrl2: ROUTES_V2.CREATE_BULK_QRCODE,
      tabs: []
    },
    [ROUTES_V2.CREATE_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Create QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Edit QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Edit Test',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENTS_BULK_UPLOADS]: {
      backbBtn: true,
      mainTitle: 'User Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_TEST_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Create Assessment Pattern/Template',
      btnText: 'Create Pattern',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Create Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.COURSE_MAPPING]: {
      backbBtn: false,
      mainTitle: 'Grade Mapping',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.INSTITUTE_MODULES_SETTINGS]: {
      backbBtn: false,
      mainTitle: 'Modules Settings',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TIME_TABLE]: {
      backbBtn: false,
      mainTitle: 'Time Table',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LIVE_SESSION]: {
      backbBtn: false,
      mainTitle: 'Live Session',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENT_FORM_MASTER]: {
      backbBtn: false,
      mainTitle: 'Student Form Master',
      tabs: []
    },
    [ROUTES_V2.TEACHER_FORM_MASTER]: {
      backbBtn: false,
      mainTitle: 'Teacher Form Master',
      tabs: []
    },
    [ROUTES_V2.TIME_TABLE_MASTER]: {
      backbBtn: false,
      mainTitle: 'Time Table Master',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ACADEMIC_YEAR_PLANNER]: {
      backbBtn: false,
      mainTitle: 'Academic Year Planner',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CRM_SUPPORT]: {
      backbBtn: false,
      mainTitle: 'CRM Support',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    }
  },
  branchAdmin: {
    [ROUTES_V2.DASHBOARD]: {
      backbBtn: false,
      mainTitle: 'Main Dashboard',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
      //   {
      //     Icon: CourseIconSvg,
      //     label: 'Grades',
      //     value: 200,
      //     link: ROUTES_V2.COURSE_CARD_LIST
      //   },
      //   {
      //     Icon: SubjectIconSvg,
      //     label: 'Subjects',
      //     value: 200,
      //     link: ROUTES_V2.CREATE_SUBJECTS
      //   },
      //   {
      //     Icon: StudentsIconSvg,
      //     label: 'Students',
      //     value: 200,
      //     link: ROUTES_V2.STUDENT_LIST
      //   },
      //   {
      //     Icon: SubjectIconSvg,
      //     label: 'Chapters',
      //     value: 200,
      //     link: ROUTES_V2.CHAPTERS
      //   },
      //   {
      //     Icon: InstituteIconSvg,
      //     label: 'Batches',
      //     value: 200,
      //     link: ROUTES_V2.BATCH_LIST
      //   },
      //   {
      //     Icon: TeachersIconSvg,
      //     label: 'Teachers',
      //     value: 200,
      //     link: ROUTES_V2.TEACHER_LIST
      //   }
      // ]
    },
    [ROUTES_V2.ASSIGNMENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Assignment List',
      btnText: 'Add Assignment',
      btnUrl: ROUTES_V2.ADD_ASSIGNMENTS,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.REVIEW_ASSIGNMENT]: {
      backbBtn: true,
      mainTitle: 'Review Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },

    [ROUTES_V2.ADD_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Add Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGNMENT_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Edit Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LEARN]: {
      mainTitle: 'Learn',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MENU_MASTER]: {
      backbBtn: false,
      mainTitle: 'Menu Master',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.NO_PATTERN_TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.PATTERNS]: {
      backbBtn: false,
      mainTitle: 'Assessment Pattern/Template',
      btnText: 'Create Pattern',
      btnUrl: ROUTES_V2.CREATE_TEST_PATTERN,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.ADD_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTIONS_WITHOUT_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHER_ADD_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Tests',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_TEST_PREVIEW]: {
      backbBtn: true,
      mainTitle: 'Preview Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Question Corner Bulk Upload',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: PatternIconSvg,
          label: 'Pattern/Template',
          value: 200,
          link: ROUTES_V2.PATTERNS
        },
        {
          Icon: TestsIconSvg,
          label: 'All Assessment',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        }
      ]
    },
    [ROUTES_V2.MATERIALS]: {
      backbBtn: false,
      mainTitle: ' Publish Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_MATERIAL]: {
      backbBtn: false,
      mainTitle: 'View Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.COURSE_CARD_LIST]: {
      backbBtn: true,
      mainTitle: 'Grades List',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: CourseIconSvg,
          label: 'Grade',
          value: 200,
          link: ROUTES_V2.COURSE_CARD_LIST
        }
      ]
    },
    [ROUTES_V2.ADD_COURSE_V2]: {
      backbBtn: true,
      mainTitle: 'Add Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_COURSE_V2]: {
      backbBtn: true,
      mainTitle: 'Edit Grades',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SUBJECTS]: {
      backbBtn: false,
      mainTitle: 'Create Subjects',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: SubjectIconSvg,
          label: 'Subjects',
          value: 200,
          link: ROUTES_V2.CREATE_SUBJECTS
        }
      ]
    },
    [ROUTES_V2.CHAPTERS]: {
      backbBtn: false,
      mainTitle: 'Chapter List',
      btnText: 'Create Chapters',
      btnUrl: `${ROUTES_V2.CREATE_CHAPTERS}`,
      btnText2: 'Create Chapters in Bulk',
      btnUrl2: ROUTES_V2.CHAPTERS_BULK_UPLOAD,
      tabs: [
        {
          Icon: SubjectIconSvg,
          label: 'Chapters',
          value: 200,
          link: ROUTES_V2.CHAPTERS
        }
      ]
    },
    [ROUTES_V2.LIST_TOPICS]: {
      mainTitle: 'Topic List',
      btnText: 'Create Topic',
      btnUrl: ROUTES_V2.CREATE_TOPICS,
      btnText2: 'Create Topics In Bulk',
      btnUrl2: ROUTES_V2.BULK_UPLOAD_TOPICS,
      tabs: []
    },
    [ROUTES_V2.LIST_SUB_TOPICS]: {
      mainTitle: 'Sub-Topic List',
      btnText: 'Create Sub Topic',
      btnUrl: ROUTES_V2.CREATE_SUB_TOPICS,
      btnText2: 'Create Sub Topics In Bulk',
      btnUrl2: ROUTES_V2.BULK_UPLOAD_SUB_TOPICS,
      tabs: []
    },
    [ROUTES_V2.CREATE_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.EDIT_TOPICS}`]: {
      backbBtn: true,
      mainTitle: 'Edit Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.VIEW_TOPICS}`]: {
      backbBtn: true,
      mainTitle: 'Topic Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Sub Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Edit Sub Topic',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Sub Topic Details',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BULK_UPLOAD_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Topics In Bulk',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.BULK_UPLOAD_SUB_TOPICS]: {
      backbBtn: true,
      mainTitle: 'Create Sub Topics In Bulk',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADDSTUDENT]: {
      backbBtn: true,
      mainTitle: 'Add Student',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Edit Student',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Student Details',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [`${ROUTES_V2.ADD_BATCH}`]: {
      backbBtn: true,
      mainTitle: 'Add Batch / Section',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_BATCH]: {
      backbBtn: true,
      mainTitle: 'Edit Batch / Sections',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_BATCH_DETAILS]: {
      backbBtn: true,
      mainTitle: 'Batch / Section Details',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Student List',
      btnText: 'Add Student',
      btnUrl: ROUTES_V2.ADDSTUDENT,
      btnText2: 'Bulk Upload Student',
      btnUrl2: ROUTES_V2.STUDENTS_BULK_UPLOADS,
      tabs: [
        // {
        //   Icon: CourseIconSvg,
        //   label: 'Grades',
        //   value: 200,
        //   link: ROUTES_V2.COURSE_CARD_LIST
        // },
        // {
        //   Icon: SubjectIconSvg,
        //   label: 'Subjects',
        //   value: 200,
        //   link: ROUTES_V2.CREATE_SUBJECTS
        // },
        // {
        //   Icon: SubjectIconSvg,
        //   label: 'Chapters',
        //   value: 200,
        //   link: ROUTES_V2.CHAPTERS
        // },
        {
          Icon: StudentsIconSvg,
          label: 'Students',
          value: 200,
          link: ROUTES_V2.STUDENT_LIST
        }
      ]
    },
    [ROUTES_V2.TEACHER_LIST]: {
      backbBtn: false,
      mainTitle: 'Teacher List',
      btnText: 'Add Teacher',
      btnUrl: ROUTES_V2.ADD_TEACHER,
      btnText2: 'Bulk Upload Teacher',
      btnUrl2: ROUTES_V2.STUDENTS_BULK_UPLOADS,
      tabs: [
        {
          Icon: TeachersIconSvg,
          label: 'Teachers',
          value: 200,
          link: ROUTES_V2.TEACHER_LIST
        }
      ]
    },
    [ROUTES_V2.BATCH_LIST]: {
      backbBtn: false,
      mainTitle: 'Batches / Sections',
      btnText: 'Add Batch / Section',
      btnUrl: ROUTES_V2.ADD_BATCH,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: InstituteIconSvg,
          label: 'Batch/Section',
          value: 200,
          link: ROUTES_V2.BATCH_LIST
        }
      ]
    },
    [ROUTES_V2.ADD_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Add Teacher',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Edit Teacher',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Teacher Details',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHER_PERFORMANCE]: {
      backbBtn: false,
      mainTitle: 'Teacher Performance',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGN_TEACHER]: {
      backbBtn: true,
      mainTitle: 'Assign Teacher',
      btnText: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.USERPROFILE]: {
      backbBtn: true,
      mainTitle: 'Profile',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Edit Test',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Test Details',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENTS_BULK_UPLOADS]: {
      backbBtn: true,
      mainTitle: 'User Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QRCODE_LIST]: {
      backbBtn: false,
      mainTitle: 'Video QR Code',
      topTitle: '',
      btnText: 'Create QRCode',
      btnUrl: ROUTES_V2.CREATE_QRCODE,
      btnText2: 'Create Bulk QRCode',
      btnUrl2: ROUTES_V2.CREATE_BULK_QRCODE,
      tabs: []
    },
    [ROUTES_V2.CREATE_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Create QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_QRCODE]: {
      backbBtn: true,
      mainTitle: 'Edit QRCode',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PUBLISH_GAME]: {
      backbBtn: false,
      mainTitle: 'Manage Content',
      topTitle: '',
      btnText: 'Create',
      btnUrl: ROUTES_V2.UPLOAD_GAME,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.UPLOAD_GAME]: {
      backbBtn: false,
      mainTitle: 'Upload Content',
      topTitle: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.USERPROFILE]: {
      backbBtn: true,
      mainTitle: 'Profile',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Edit Test',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Test Details',
      topTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_TEST_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Create Assessment Pattern/Template',
      btnText: 'Create Pattern',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_TEST_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Edit Assessment Pattern/Template',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Create Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.COURSE_MAPPING]: {
      backbBtn: false,
      mainTitle: 'Grade Mapping',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENT_ASSIGNMENT]: {
      backbBtn: false,
      mainTitle: '',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TIME_TABLE]: {
      backbBtn: false,
      mainTitle: 'Time Table',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LIVE_SESSION]: {
      backbBtn: false,
      mainTitle: 'Live Session',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENT_FORM_MASTER]: {
      backbBtn: false,
      mainTitle: 'Student Form Master',
      tabs: []
    },
    [ROUTES_V2.TEACHER_FORM_MASTER]: {
      backbBtn: false,
      mainTitle: 'Teacher Form Master',
      tabs: []
    },
    [ROUTES_V2.TIME_TABLE_MASTER]: {
      backbBtn: false,
      mainTitle: 'Time Table Master',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ACADEMIC_YEAR_PLANNER]: {
      backbBtn: false,
      mainTitle: 'Academic Year Planner',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.CRM_SUPPORT]: {
      backbBtn: false,
      mainTitle: 'CRM Support',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    }
  },
  teacher: {
    [ROUTES_V2.TEACHERS_DASHBOARD]: {
      backbBtn: false,
      mainTitle: 'Main Dashboard',
      btnText: 'Prep Mode',
      btnUrl: ROUTES_V2.PREP_MODE,
      btnText2: 'Teach mode',
      btnUrl2: ROUTES_V2.TEACH_MODE,
      tabs: []
    },
    [ROUTES_V2.TEACH_MODE]: {
      backbBtn: true,
      mainTitle: 'Teach mode',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PREP_MODE]: {
      backbBtn: true,
      mainTitle: 'Prep Mode',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PREP_MODE_EDIT]: {
      backbBtn: true,
      mainTitle: 'Edit Session',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.FINAL_PAGE_TEACH_MODE]: {
      backbBtn: true,
      mainTitle: 'Teach mode',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGNMENT_LIST]: {
      backbBtn: false,
      mainTitle: 'Assignment List',
      btnText: 'Add Assignment',
      btnUrl: ROUTES_V2.ADD_ASSIGNMENTS,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Add Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ADD_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Add Assignment',
      btnText: 'd',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.REVIEW_ASSIGNMENT]: {
      backbBtn: true,
      mainTitle: 'Review Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.REVIEW_ASSIGNMENT_STUDENT]: {
      backbBtn: true,
      mainTitle: 'Review Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EDIT_ASSIGNMENTS]: {
      backbBtn: true,
      mainTitle: 'Edit Assignment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGNMENT_QUESTION]: {
      backbBtn: false,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MATERIALS]: {
      backbBtn: false,
      mainTitle: 'Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.MATERIALS]: {
      backbBtn: false,
      mainTitle: 'Materials',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.EXAM_MARK_ENTRY]: {
      backbBtn: true,
      mainTitle: 'Exam Mark Entry',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHER_PERFORMANCE]: {
      backbBtn: false,
      mainTitle: 'My Performance',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.STUDENT_PERFORMANCE]: {
      backbBtn: false,
      mainTitle: 'Student Performance',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.OFFLINE_ASSESSMENT]: {
      backbBtn: false,
      mainTitle: 'Offline Assesment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.LEARN]: {
      backbBtn: false,
      mainTitle: 'Learn',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.PUBLISH_GAME]: {
      backbBtn: false,
      mainTitle: 'Manage Content',
      topTitle: '',
      btnText: 'Create',
      btnUrl: ROUTES_V2.UPLOAD_GAME,
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Offline Assesment',
          value: 200,
          link: ROUTES_V2.OFFLINE_ASSESSMENT
        }
      ]
    },
    [ROUTES_V2.CUSTOM_TESTS]: {
      backbBtn: false,
      mainTitle: 'Custom Assessment',
      btnText: 'Create Assessment',
      btnUrl: ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST,
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.QUESTION_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Assessment Question Bulk Upload',
      btnText: 'Bulk Upload',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTION_CORNER_BULK_UPLOAD]: {
      backbBtn: false,
      mainTitle: 'Question Corner Bulk Upload',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Un-Assigned Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.ADD_QUESTION]: {
      backbBtn: true,
      mainTitle: 'Select Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.NO_PATTERN_TESTS]: {
      backbBtn: false,
      mainTitle: 'All Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.PATTERNS]: {
      backbBtn: false,
      mainTitle: 'Assessment Pattern/Template',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.TEACHER_ANALYTICS]: {
      backbBtn: true,
      mainTitle: 'Analytics',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.SUBMITTED_TESTS]: {
      backbBtn: false,
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST]: {
      backbBtn: true,
      mainTitle: 'Create Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TOP_RANKERS_LIST]: {
      backbBtn: false,
      mainTitle: 'Back to test status',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },

    [ROUTES_V2.TEACHER_TEST_PREVIEW]: {
      backbBtn: true,
      mainTitle: 'Tests Preview',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHERS_CREATE_QUIZ]: {
      backbBtn: true,
      mainTitle: 'Create Questions',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.QUESTIONS_WITHOUT_PATTERN]: {
      backbBtn: true,
      mainTitle: 'Select Questions ',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.Quiz]: {
      backbBtn: false,
      mainTitle: 'Question Corner',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.TEACHERS_REVIEW_QUIZ]: {
      backbBtn: true,
      mainTitle: 'Review Question Corner',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.COURSE_MAPPING]: {
      backbBtn: false,
      mainTitle: 'Grade Mapping',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    },
    [ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS]: {
      mainTitle: 'Ongoing & Finished Assessment',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: [
        {
          Icon: TestsIconSvg,
          label: 'My Custom Assesment',
          value: 200,
          link: ROUTES_V2.CUSTOM_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assesment By Admin',
          value: 200,
          link: ROUTES_V2.TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Assigned Assessment',
          value: 200,
          link: ROUTES_V2.ASSIGNED_TESTS
        },
        {
          Icon: TestsIconSvg,
          label: 'Un-Assigned Assessment',
          value: 200,
          link: ROUTES_V2.UNASSIGNED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ongoing & Finished Assessment',
          value: 200,
          link: ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS
        },
        {
          Icon: TestsSubmittedIconSvg,
          label: 'Ofline Test',
          value: 200,
          link: ''
        }
      ]
    },
    [ROUTES_V2.CRM_SUPPORT]: {
      backbBtn: false,
      mainTitle: 'CRM Support',
      btnText: '',
      btnUrl: '',
      btnText2: '',
      btnUrl2: '',
      tabs: []
    }
  },
  parent: {}
}
