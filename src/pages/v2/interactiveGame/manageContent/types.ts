export interface SubjectCardProps {
  active?: boolean
  subjectName: string
  details: string
  logo: string | null
  onSelectSubject: () => void
}

export interface GetLearnModuleSubjectResponse {
  chapterCount: number
  _id: string
  name: string
  courseId: string
  courseName: string
  createdAt: string
  __v: number
  icon: string | null
  materialCount: number
}

export interface GetLearnModuleChapterResponse {
  courseId: string
  courseName: string
  name: string
  sequence: number
  subjectId: string
  subjectName: string
  __v: number
  _id: string
}
export interface LabVideoMaterialProps {
  _id: string
  name: string
  path: string
  thumbnail: string
  fileType: string
  materialType: string
  sequence: string
  courseId: string
  courseName: string
  subjectId: string
  subjectName: string
}

export interface VideoMaterialProps extends LabVideoMaterialProps {
  chapterId: string
  chapterName: string
  topicId: string
  topicName: string
  subTopicId: string
  subTopicName: string
}
export interface CourseDetailProps {
  _id: string
  name: string
  type: string
}

export interface SubjectDetailProps {
  id: string
  name: string
}

export interface LearnModuleTextMaterial {
  _id: string
  name: string
  path: string
  fileType: string
  materialType: string
  sequence: string
  courseId: string
  courseName: string
  subjectId: string
  subjectName: string
  chapterId: string
  chapterName: string
  topicId: string
  topicName: string
}

export interface SelectedVideoProps {
  videoTitle: string
  videoUrl: string
  videoThumbnail: string
}

export interface SelectedPptxProps {
  PptxTitle: string
  PptxUrl: string
}

export interface SelectedPdfProps {
  PdfTitle: string
  PdfUrl: string
}
