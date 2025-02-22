import { Dispatch, SetStateAction } from 'react'
export interface DataItem {
  id: string
  label: string
  value: {
    id: string
    value: string
    label: string
    url: string
  }
}
export interface InstuteImageprops {
  setImage: Dispatch<SetStateAction<File | undefined>>
  setImageInstute: Dispatch<SetStateAction<File | undefined>>
  image: File | undefined
  imageInstute: File | undefined
  instituteLogodefault: any
  instituteImagedefault: any
}
export interface InstituteInformationProps {
  contactNumber: number
  setContactNumber: Dispatch<SetStateAction<number>>
  instituteName: string
  setInstituteName: Dispatch<SetStateAction<string>>
  contactName: string
  setContactName: Dispatch<SetStateAction<string>>
  instituteUserName: string
  setInstituteUserName: Dispatch<SetStateAction<string>>
  institutePassword: string
  setInstitutePassword: Dispatch<SetStateAction<string>>
  instituteLocation: string
  setInstituteLocation: Dispatch<SetStateAction<string>>
  onClick: () => void
  branchStudentLimit: number
  setBranchStudentLimit: Dispatch<SetStateAction<number>>
  onIdsChange: (ids: string[]) => void
  data: DataItem[]
}

export interface AddBranchProps {
  branchData: DataItem[]
  EditBranchId: string
  CreatedInstituteId: any
  CreatedInstituteName: any
  onClick: () => void
  onBranchCourse: (ids: string[]) => void
  branchName: string
  setBranchName: Dispatch<SetStateAction<string>>
  studentLimit: number
  setStudentLimit: Dispatch<SetStateAction<number>>
  branchLocation: string
  setBranchLocation: Dispatch<SetStateAction<string>>

  branchUserName: string
  setBranchUserName: Dispatch<SetStateAction<string>>
  branchPassword: string
  setBranchPassword: Dispatch<SetStateAction<string>>
  branchContactName: string
  setBranchContactName: Dispatch<SetStateAction<string>>
  branchContactNumber: number
  setBranchContactNumber: Dispatch<SetStateAction<number>>
}
export interface ListBranchProps {
  setddBranchBachId: Dispatch<SetStateAction<string>>
  CreatedInstituteId: any
  setEditBranchId: Dispatch<SetStateAction<string>>
}
export interface AddBatchProps {
  setBatchEdit: Dispatch<SetStateAction<string>>
  teacherName: string
  setTeacherName: Dispatch<SetStateAction<string>>
  batchEdit: string
}

export interface ListBatchProps {
  CreatedInstituteId: any
  addBranchBachId: string
  setBatchEdit: Dispatch<SetStateAction<string>>
}
