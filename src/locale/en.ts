const strings = {
  dashboard: {
    title: 'Dashboard',
    studentCount: 'Student Count',
    teacherCount: 'Teacher Count',
    staffCount: 'Staff Count'
  },
  course: {
    title: 'Course',
    courseList: 'Course Listing',
    addCourse: 'Add Course',
    des: 'Course Decription',
    courseId: 'Course Id',
    addSubject: 'Add Subjects',
    subjectList: 'Subject Listing',
    combination: 'Combination',
    selectCourse: 'Select Course',
    subDes: 'Subject Description',
    subjectId: 'Subject Id',
    subjectIcon: 'Subject Image',
    subjectName: 'Subject Name',
    addSubs: 'Add Subs',
    addCahpter: 'Add Chapter',
    viewSubs: 'View Subs',
    courseIcon: 'Course Image',
    placeholder: {
      courseName: 'Course Name'
    }
  },
  institute: {
    title: 'Institute',
    addInstitute: 'Add Institute',
    editInstitue: 'Edit Institute',
    viewInstitute: 'View Institute',
    instituteId: 'Institute Id',
    address: 'Address',
    area: 'Area',
    city: 'City',
    code: 'Institute Code',
    constactNo: 'Contact No',
    country: 'Country',
    courseName: 'Course Name',
    email: 'E-Mail',
    password: 'Password',
    expiDate: 'Institute Expiry on',
    logo: 'Institute Image',
    name: 'Institute Name',
    selectIns: 'Select Institute',
    nonTecLimit: 'Non-Teacher Limit',
    insPassword: 'Password',
    insUserName: 'Username',
    status: 'Status',
    active: 'ACTIVE',
    state: 'State',
    teachetLim: 'Teacher Limit',
    stuLimit: 'Student Limit',
    pincode: 'Zip Code',
    batchStudentLimit: 'Batch / Section Student Limit',
    branchStudentLimit: 'Branch Student Limit',
    branchTeacherLimit: 'Branch Teacher Limit',
    branchNonTeacherLimit: 'Branch Non Teacher Limit'
  },
  branch: {
    title: 'Branch',
    addBranch: 'Add Branch',
    editBranchTitle: 'Edit Branch',
    viewBranch: 'View Branch',
    instituteId: 'Institute Name',
    courseName: 'Course Name',
    expiDate: 'Branch Expiry on',
    logo: 'Branch Image',
    branchname: 'Branch Name',
    branchId: 'Branch Id',
    questionLimit: 'Question Limit'
  },
  batch: {
    title: 'Batch / Section',
    addBatch: 'Add Batch / Section',
    editBatch: 'Edit Batch / Section',
    instituteName: 'Institute Name',
    branch: 'Branch Name',
    batchId: 'Batch / Section Id',
    startDate: 'Start Date',
    endDate: 'End Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    courseName: 'Course Name',
    batchName: 'Batch / Section Name'
  },
  users: {
    title: 'Users',
    studentadmission: 'Student Admission',
    year: 'Year',
    acedmicYear: 'Academic Year',
    gender: 'Gender',
    role: 'Role',
    addnonTeacher: 'Add Staff',
    viewnonTeacher: 'View Staff',
    firstName: 'First Name',
    lastName: 'Last Name',
    mobileNu: 'Mobile Number',
    email: 'E-Mail',
    feeDescription: {
      title: 'Fee Description'
    },
    addTeacher: {
      title: 'Add Teacher',
      saveTeacherError: 'Unable to save details. Please try again later.',
      personalInfo: 'Personal Information',
      contactInfo: 'Contact Information',
      educationalqul: 'Educational Qualification',
      docToBeSubmitted: 'Documents to be Submitted',
      department: 'Department',
      designation: 'Desgination',
      gender: 'Gender',
      bloodGroup: 'Blood Group',
      fatherName: 'Father Name',
      spouseName: 'Spouse Name',
      DoB: 'Date of Birth',
      userNames: 'Username',
      password: 'Password',
      DOJoining: 'Date of Joining',
      profilePicture: 'Profile Picture',
      mobileNumber: 'Mobile Number',
      eMail: 'E-Mail',
      address: 'Address',
      pincode: 'Pin Code',
      state: 'State',
      city: 'City',
      area: 'Area',
      emergencyContact: 'Emergency Contact Number',
      emergencyContactPerson: 'Emergency Contact Person',
      educationalBackground: 'Educational Background',
      yearofCompletion: 'Year Of Completion',
      collageName: 'Collage Name',
      collageCity: 'Collage City',
      yofExperience: 'Year Of Experience',
      previousCompanyOrInsName: 'Previous Company/Institute Name',
      bankName: 'Bank Name',
      bankAccNumb: 'Bank Account Number',
      BankIfsc: 'Bank IFSC Number',
      bankBranch: 'Bank Branch',
      panNumber: 'PAN Number',
      pfAccNumber: 'PF Account Number',
      esiAccountNumber: 'ESI Account Number',
      passportNumber: 'Passport Number',
      countyIssue: 'Country of Issue',
      passportExpiry: 'Passport Expiry',
      contactType: 'Contract Type',
      contractStartDate: 'Contract Start Date'
    },
    viewTeacher: {
      title: 'View Teacher'
    },
    viewStaff: {
      title: 'View Staff'
    },
    viewStudent: {
      title: 'View Student'
    }
  },
  assign: {
    title: 'Assign',
    assignTeacher: {
      title: 'Assign Teacher',
      list: 'Assigned Teacher List'
    },
    assignLessonPlane: {
      title: 'Assign Lesson Plan'
    },
    publishMaterial: 'Publish Material',
    assignment: {
      title: 'Assignment'
    }
  },
  attenance: {
    title: 'Attendance',
    staffattenanace: {
      title: 'Staff Attendance'
    },
    teacherAttenanace: {
      title: 'Teacher Attendance'
    },
    studentAttenance: {
      title: 'Student Attendance'
    }
  },

  staff: {
    dashboard: {
      title: 'Dashboard'
    },
    myTasks: {
      title: 'My Tasks',
      assignedTasks: 'Assigned tasks',
      reports: 'Reports'
    },
    myLeave: {
      title: 'My Leave',
      leaveApplication: 'Leave Application',
      leaveStatus: 'Leave Status'
    }
  },
  academicCalendar: {
    title: 'Academic Calendar',
    add_leave_calendar: 'Add Leave Calendar',
    view_leave_calendar: 'View Leave Calendar',
    add_academic_calendar: 'Add Academic Calendar',
    view_academic_calendar: 'View Academic Calendar'
  },
  testSetup: {
    title: 'Test Setup',
    addTestName: {
      title: 'Add Test Name',
      testName: 'Test Name',
      testDescription: 'Test Description'
    },
    addTestType: {
      title: 'Add Test Type',
      testType: 'Test Type',
      addTestDescriptin: 'Test Type Description'
    },
    addTestComponent: {
      title: 'Add Test Section',
      componentName: 'Section Name',
      componentDescription: 'Section Description'
    },
    markSetting: {
      title: 'Mark Settings',
      selecttestName: 'Select Test Name',
      selectTestType: 'Select Test Type',
      selectComponent: 'Select Section Name',
      paperName: 'Paper Name',
      moreComponent: 'Does it contain more Component?'
    },
    testInstruction: {
      title: 'Add Test Instruction',
      selsctTestName: 'Select Test Name',
      testName: 'Test Name',
      duration: 'Test Duration(In minutes)'
    }
  },
  instituteSetting: {
    title: 'Institute Setting',
    list: 'Assigned Test List',
    add: 'Assign Test',
    instituteTestSetting: 'Institute Test Setting',
    qrCodeSetting: {
      title: 'QrCode Setting'
    },
    learnModuleSetting: {
      title: 'Learn module Setting'
    }
  },
  //Parent string data should be placed inside the parent Object
  parent: {
    studentDetails: {
      title: 'Student Details',
      title2: 'STUDENT DETAILS',
      studentProfile: 'Student Profile Photo Upload',
      photo: 'STUDENT PROFILE PHOTO',
      upload: 'UPLOAD IMAGES',
      note: 'IMPORTANT NOTE',
      profile: 'Student Profile',
      StudentProfile: {
        fatherDetails: 'FATHER DETAILS',
        motherDetails: 'MOTHER DETAILS',
        other: 'OTHER',
        sublingDetails: 'SIBLING DETAILS',
        gardianDetails:
          'GUARDIAN DETAILS(PERSON TO BE CONTACTED IN THE EVENT PARENTS ARE NOT REACHABLE)'
      }
    },
    feePayment: {
      title: 'Fee Payment',
      onlineFee: 'Online Fee Payment',
      studentFeeCard: 'Student Fee Card',
      onlineFees: {
        r: 'cd'
      },
      feeCard: {
        title: 'Fee Card',
        academyTitle: 'Academic Year',
        select: '2022-2023 (Current Academy Year)',
        studentNameTitle: 'Student Name',
        studentName: 'Asif Khan',
        fatherNameTitle: 'Father Name',
        fatherName: 'Ali Yusuf Khan'
      }
    },
    internalMessaging: {
      title: 'Internal Messaging System',
      messageTeacher: 'Message to Teacher',
      staffContacts: 'Staff Contacts List'
    },
    studentAttenance: {
      title: 'Student Attendance',
      subTitle: 'Student Attendance - Year Wise Report',
      yearReport: 'Year wise Report',
      selectAcedemeic: 'Select Academic Year',
      academicYear: 'Academic Year'
    },
    timeTable: {
      title: 'Time Table'
    },
    eNoticeorSpecial: {
      title: 'E-Notice or Special Remarks',
      eNoticeSpecialRemarks: 'E-Notice / Special Remarks'
    },
    homeWork: {
      select: 'Select Subject',
      subjectList: 'Subject',
      title: 'Home Work',
      fromDate: 'From Date',
      toDate: 'To Date'
    },
    Events_Reminder: {
      title: 'Events or Reminder',
      subTitle: 'Events/Reminder'
    },
    Exam_Time_table: {
      title: 'Exam Time Table'
    },
    Exam_Report: {
      title: 'Exam Report'
    }
  },
  //student string data should be placed inside the parent Object
  student: {
    dashboard: {
      title: 'Dashboard'
    },
    learn: {
      title: 'Learn',
      studentName: 'Student Name',
      teacherName: 'Teacher Name',
      branchName: 'Branch Name',
      courseName: 'Course Name'
    },
    result: {
      title: 'Completed Test Result Lists',
      result: 'Result',
      studentResult: 'Student Result',
      testName: 'Test Name',
      totalQuestion: 'Total Questions',
      totalAnsweredQues: 'Total Answered Questions',
      totalUnAnsweredQues: 'Total UnAnswered Questions',
      correctAnswers: 'Correct Answers',
      wrongAnswers: 'Wrong Answers',
      studentResultList: 'Student Result List',
      selectTest: 'Select Test'
    },
    assessment: {
      title: 'Assessment',
      attemptTest: 'Test to Attempt',
      upcomingTets: 'Upcomming Test',
      attemptedTest: 'Attempted Test',
      placeholder: {
        testType: 'Test Type'
      },
      attempt: {
        subjectWiseTest: 'Subject Wise Test',
        chapterWiseTest: 'Chapter Wise Test',
        chaptersTest: 'No of Chapters Test',
        noofQuestions: 'No Of Questions',
        duration: 'Durations',
        attempted: 'Attempted',
        pending: 'Pending',
        takeTest: 'Take Test'
      },
      test: {
        completed: 'Completed',
        marked: 'Marked for Review',
        read: 'Answered',
        unRead: 'UnAnswered',
        previous: 'Previous',
        next: 'Next',
        submit: 'Submit',
        markReview: 'Mark for review'
      }
    },
    myLeaves: {
      title: 'My Leaves',
      apply_leave: 'Apply Leave',
      leave_status: 'Leave Status'
    },
    assignment: {
      title: 'Assignment',
      date: 'Date',
      completedAssignemnt: 'Completed Assignment',
      newAssignement: 'New Assignment',
      viewAssignement: 'View Assignment',
      assignmentTitle: 'Assignement Title',
      assignmentDescription: 'Assignment Description',
      postedBy: 'Posted By',
      postedDate: 'Posted Date',
      attachment: 'Attachment',
      description: 'Description',
      attachmentUpload: 'Upload Attachment'
    },
    codeScanner: {
      title: 'Code Scanner'
    }
  },
  //teacher
  teacher: {
    dashboard: {
      title: 'Dashboard'
    },
    lessonPlane: {
      title: 'Lesson Plan'
    },
    assignment: {
      title: 'Assignment',
      postassignment: 'Post Assignment',
      viewassignment: 'View Assignment'
    },
    attendance: {
      title: 'Attendance',
      myLeaves: '  My Leaves',
      studentAttenance: 'Student Attendance'
    },
    publishMaterial: {
      mainTitle: 'Materials',
      title: 'Publish Materials',
      course: 'Course',
      subject: 'Subject',
      chapter: 'Chapter',
      topic: 'Topic'
    },
    publishedMaterial: {
      title: 'Published Materials',
      course: 'Course',
      subject: 'Subject',
      chapter: 'Chapter',
      topic: 'Topic'
    },
    assessment: {
      title: 'Assessment',
      subtitle: 'Test Details',
      difficulty: 'Difficulty Level',
      selectType: 'Question Type'
    }
  },

  //institute
  instituteAdmin: {
    testInstruction: {
      instruction: 'Instructions',
      duration: 'Duration',
      questionCount: 'No of Questions',
      noOfattempt: 'No of Attempt'
    },
    assesment: {
      title: 'Assesment',
      testList: 'Test List',
      draftList: 'Draft List',
      createTest: 'Create Test',
      testName: 'Test Name',
      instructions: 'Instructions',
      noOfTestCreated: 'No of Test Created',
      npOfQuestionsd: 'No of Questions Avaiable',
      studentsTracking: 'Students Tracking',
      proctoring: 'Proctoring',
      selectData: 'Select Date',
      selectTime: 'Select Time',
      noOfStudent: 'Max No of Students',
      markSetting: 'New Mark Setting',
      testDate: 'Select Date',
      duration: 'Duration (In Minutes)'
    },
    studentBulkUpload: {
      title: 'Student Bulk Upload',
      upload: 'Bulk Upload',
      list: 'Uploaded List'
    },
    questionsBulkUpload: {
      title: 'Questions Bulk Upload',
      list: 'Questions Uploads',
      topic: 'Topic',
      topic_placeholder: 'Select Topic',
      sub_topic: 'Sub Topic',
      sub_topic_placeholder: 'Select Sub Topic',
      subject: 'Subject',
      subject_placeholder: 'Select Subject',
      upload_questions: 'Upload Questions',
      author: 'Author'
    }
  },
  //--------------- ----------------------------------------------0ld----------------------------------
  login: {
    title: 'Login',
    description: 'Sign In to your account',
    submit: 'Submit',
    loginFailed:
      'Login failed. Please check the credentials or try after sometime.'
  },

  register: {
    noAccount: "Don't have an account yet?",
    signUp: 'SignUp'
  },

  validationMessages: {
    userName: {
      required: 'Username is required'
    },
    dob: 'MM-DD-YYYY',
    phone: {
      required: 'Phone number is required',
      numberOnly: 'Please enter only numbers',
      invalid: 'Please enter valid phone number'
    },
    email: {
      required: 'Email is required',
      invalid: 'Please enter valid email'
    },
    password: {
      required: 'Password is required',
      confirmPasswordRequired: 'Confirm Password is required',
      invalid:
        'Password must contain 8 characters, One uppercase, One lowercase, One number and one special case character',
      nonMatch: 'Passwords must match'
    },
    field: {
      required: 'Field is required'
    },
    limitation: {
      student_limit: 'No of Candidates Limit Exceeded'
    },
    batch: {
      selectInstitute: 'Select an Institute',
      selectBranch: 'Select a Branch',
      selectCourse: 'Select a Course',
      selectMaterial: 'Select a Material',
      selectStaus: 'Select a valid Status',
      saveBatchFailed: 'Error occured while saving the batch / section',
      deleteBatchFailed: 'Error Occured while deleting the batch / section'
    },
    course: {
      deleteCourseFailed: 'Error Occured while deleting the course',
      saveError: 'Error occured while saving the course'
    },
    session: {
      selectInstitute: 'Select an Institute',
      selectBranch: 'Select a Branch',
      selectCourse: 'Select a Course',
      selectBatch: 'Select a Batch / Section',
      selectSubject: 'Select a Subject',
      selectTeacher: 'Select a Teacher',
      selectPlatform: 'Select a Platform',
      saveSessionFailed: 'Error occured while saving the session'
    }
  },
  header: {
    logout: 'Logout'
  },
  menu: {
    admin: {
      selectCourse: 'Select Course',
      selectBranch: 'Select Branch',
      selectBatch: 'Select Batch / Section',
      selectSubject: 'Select Subject',
      selectChapter: 'Select Chapter',
      selectTopic: 'Select Topic'
    },
    lessonPlane: {
      title: 'Lesson Plan',
      assign_lesson_plan: 'Assign Lesson Plan',
      view_lesson_plan: 'View Lesson Plan',
      reports: 'Reports'
    }
  },

  modal: {
    test: {
      title: 'Submit Your Exam ?',
      subTitle: 'Once you submit the exam, you can not edit the answers'
    },
    otp: {
      title: 'SMS Verification',
      helpText: "Didn't receive the verification OTP?",
      resendAgain: 'Resend again'
    },
    deleteRecord: 'Are you sure you want to delete this record?',
    cancel: 'Cancel',
    submit: 'Submit',
    verify: 'Verify'
  },

  button: {
    back: 'Back',
    save: 'Save',
    apply: 'Apply',
    approve: 'Approve',
    reject: 'Reject',
    cancel: 'Cancel',
    evaluate: 'Evaluate',
    review: 'Review',
    done: 'Done',
    selectAll: 'Select All',
    dSelectAll: 'Deselect All',
    proceed: 'Proceed',
    createSectionText: 'Create Section',
    skipSectionText: 'Skip this step',
    download: 'Download',
    assign: 'Assign',
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit',
    add: 'Add'
  },

  fileUpload: {
    dragAndDropText: 'DRAG AND DROP FILE TO UPLOAD',
    upload: 'Upload File',
    docFilesOnly: 'UPLOAD ONLY .DOC FILES',
    imageOnly: 'UPLOAD ONLY .PNG/.JPG FILES',
    assignment: 'UPLOAD ONLY .PDF,.DOCX,.JPG,.JPEG,.SVG,.PNG FILES',
    xlxOnly: 'UPLOAD ONLY EXCEL FILES'
  },
  pendingRequests: {
    approve: {
      title: 'Unlock Exam(s)',
      description:
        'Out of 180 minutes, 0 minutes has already spent and 180 minutes remaining. To change the remaining time enter the new remaining time (in minutes) below:'
    },
    reject: {
      title: 'Rejecting Request',
      description: 'Are you sure you want to reject this request?'
    }
  }
}

export default strings
