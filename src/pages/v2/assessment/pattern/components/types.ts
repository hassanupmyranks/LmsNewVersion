import { Dispatch, SetStateAction } from 'react'
import {
  CourseDetails,
  PatternSectionDetails,
  PatternSubjectDetails,
  SubjectDetails
} from '../../../../../utils/types'
import { DropdownOptionData } from '../../../../../components/V2/Form/types'

export interface SectionTabProps {
  label: string
  isActive?: boolean
  activeSectionTab: string
  sectionDetails: Record<string, PatternSectionDetails[]>
  subject: PatternSubjectDetails
  setSectionDetails: Dispatch<
    SetStateAction<Record<string, PatternSectionDetails[]>>
  >
  selectedSubject: DropdownOptionData<SubjectDetails>[]
  setActiveSectionTab: Dispatch<SetStateAction<string>>
  setSelectedSubject: Dispatch<
    SetStateAction<DropdownOptionData<SubjectDetails>[]>
  >
  setSubjectDetails: Dispatch<SetStateAction<PatternSubjectDetails[]>>
  index: number
  setSelectedSubjectIds: Dispatch<SetStateAction<string[]>>
  indexOfCurrSubject: number
  subjectDetails: PatternSubjectDetails[]
}

export interface SectionFormProps {
  index: number
  sectionData: PatternSectionDetails
  activeSectionTab: string
  showError: boolean
  setSectionDetails: Dispatch<
    SetStateAction<Record<string, PatternSectionDetails[]>>
  >
  setSubjectDetails: Dispatch<SetStateAction<PatternSubjectDetails[]>>
  selectedCourse: DropdownOptionData<CourseDetails> | undefined
  sectionDetails: Record<string, PatternSectionDetails[]>
  indexOfCurrSubject: number
  subjectDetails: PatternSubjectDetails[]
  setNumberOfQuestionChange: Dispatch<SetStateAction<number>>
}
