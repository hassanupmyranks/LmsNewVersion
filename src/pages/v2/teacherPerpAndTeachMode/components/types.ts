export interface Topics {
  topicId: string
  topicName: string
  subTopics: []
}

export interface Chapters {
  chapterId: string
  chapterName: string
  topics: Topics[]
}

export interface Materials {
  materialId: string
  name: string
  path: string
  fileType: string
  chapterId: string
  topicId: string
}

export interface GetSessionData {
  _id: string
  teacherId: string
  teacherName: string
  batchId: string
  batchName: string
  sessionNo: number
  status: string
  deleted: false
  courseId: string
  courseName: string
  subjectId: string
  subjectName: string
  chapters: Chapters[]
  materials: Materials[]
  createdAt: string
  sessionDate: string
}
