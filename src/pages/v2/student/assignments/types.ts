export interface CreatedByObject {
  _id: string
  name: string
  firstName: string
  instituteName: string
  profileImage: string
}

export interface AssignmentsData {
  _id: string
  name: string
  attachment: string
  deadLine: string
  attachmentType: string
  batchId: string
  batchName: string
  courseId: string
  courseName: string
  subjectId: string
  subjectName: string
  createdBy: CreatedByObject
  reviewedCount: number
  studentCount: number
  createdAt: string
  submissionStatus: string
  status: string
  submissionId: string
  type: string
}

export interface ReviewedAssignment {
  _id: string
  name: string
  attachment: string
  assignmentAttachment: string
  assignmentAttachmentType: string
  deadLine: string
  batchId: string
  batchName: string
  courseId: string
  courseName: string
  subjectId: string
  subjectName: string
  createdBy: CreatedByObject
  reviewedCount: number
  studentCount: number
  createdAt: string
  submissionStatus: string
  submittedOn: string
  assignmentName: string
  submissionComment: string
  reviewComment: string
  review: string
  attachments: any
}
