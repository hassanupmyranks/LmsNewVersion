import SearchableDropdown from '../Form/SearchableDropdown'
import { ButtonV2 } from '../styledComponents'
import {
  PopUpBox,
  AlignHeading,
  Heading,
  RemoveIcon,
  SearchInputWrapper,
  ButtonWrapper,
  PopUpContainer
} from './styledComponents'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useEffect, useMemo, useState } from 'react'
import {
  getAllUserAPI,
  getBranchAPI,
  getInstitutesAPI
} from '../../../helpers/V2/apis'
import { SearchableDropdownOptionData } from '../Form/types'
import {
  InstituteDetails,
  NewBranchDetails,
  TeacherDetailsProps
} from '../../../utils/types'
import {
  deepClone,
  getNumber
} from '../../../pages/v2/assessment/addQuestions/helper'

export interface NewUserDetails {
  _id: string
  username: string
  firstName: string
  instituteName: string
  batchName: string
  isActive: true
}

const AssignTeacherPopUp = ({
  setIsPopUp,
  assignTeacherHandler,
  selectedSubject,
  TeacherCourseId
}: {
  setIsPopUp: (d: boolean) => void
  assignTeacherHandler: (d: TeacherDetailsProps) => void
  selectedSubject: number
  TeacherCourseId?: string
}) => {
  const selector = useSelector(
    (state: RootState) => state.createScheduleAssignTest
  )

  const {
    users: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      users: state.userV2
    }),
    shallowEqual
  )

  const defaultValue = useMemo(() => {
    return {
      label: '',
      id: ''
    }
  }, [])

  const newDetails = deepClone(selector.subjectDetails)

  const [subjectName] = useState(
    selectedSubject < newDetails.length
      ? newDetails[selectedSubject].subject_name
      : ''
  )
  const [institutes, setInstitutes] = useState<SearchableDropdownOptionData[]>(
    []
  )

  const [branch, setBranch] = useState<SearchableDropdownOptionData[]>([])
  const [teacher, setTeachers] = useState<SearchableDropdownOptionData[]>([])

  const [selectedInstitutes, setSelectedInstitutes] =
    useState<SearchableDropdownOptionData>()
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [selectedTeacher, setSelectedTeacher] =
    useState<SearchableDropdownOptionData>()
  const [institutesApiLoading, setInstitutesAPILoading] = useState(false)
  const [branchApiLoading, setBranchApiLoading] = useState(false)
  const [teacherApiLoading, setTeacherAPILoading] = useState(false)
  // const

  const [isSubmit, setIsSubmit] = useState(false)

  const [teacherDetails, setTeacherDetails] = useState<TeacherDetailsProps>({
    institute_id: '',
    institute_name: '',
    branch_id: '',
    branch_name: '',
    teacher_id: '',
    teacher_name: ''
  })

  useEffect(() => {
    let subjectData = deepClone(selector.subjectDetails)
    if (subjectData && subjectData[selectedSubject]?.teacher_details) {
      const newTeacherDetails = subjectData[selectedSubject].teacher_details
      setSelectedInstitutes({
        value: newTeacherDetails.institute_id,
        label: newTeacherDetails.institute_name,
        id: newTeacherDetails.institute_id
      })
      setSelectedBranch({
        value: newTeacherDetails.branch_id,
        label: newTeacherDetails.branch_name,
        id: newTeacherDetails.branch_id
      })
      setSelectedTeacher({
        value: newTeacherDetails.teacher_id,
        label: newTeacherDetails.teacher_name,
        id: newTeacherDetails.teacher_id
      })

      setTeacherDetails({
        institute_id: newTeacherDetails.institute_id,
        institute_name: newTeacherDetails.institute_name,
        branch_id: newTeacherDetails.branch_id,
        branch_name: newTeacherDetails.branch_name,
        teacher_id: newTeacherDetails.teacher_id,
        teacher_name: newTeacherDetails.teacher_name
      })
    }
  }, [selectedSubject, selector.subjectDetails])

  useEffect(() => {
    if (userInfoV2?.role === 'superAdmin') {
      setInstitutesAPILoading(true)
      getInstitutesAPI({ page: 1, limit: 30 })
        .then((data) => {
          const newInstitutes = data?.data?.map((item: InstituteDetails) => {
            return {
              value: `${getNumber(
                Number(item.teacherCount)
              )} Teachers | ${getNumber(
                item.branchCount
              )} Branches | ${getNumber(item.batchCount)} Sections`,
              label: item.name,
              id: item?._id,
              url: ''
            }
          })
          setInstitutes(newInstitutes)
          setInstitutesAPILoading(false)
        })
        .catch((err) => console.log(err))
    }
  }, [userInfoV2?.role])

  const getBranch = (instituteId: string) => {
    const payload = {
      page: 1,
      limit: 50,
      instituteId: instituteId
    }
    setBranchApiLoading(true)
    getBranchAPI(payload)
      .then((res) => {
        const newBranch = res?.data?.map((branch: NewBranchDetails) => {
          return {
            value: `${getNumber(Number(branch.teacherCount))} Teachers`,
            label: branch.name,
            id: branch?._id,
            url: ''
          }
        })
        setBranch(newBranch)
        setBranchApiLoading(false)
      })
      .catch((err) => console.log(err))
  }

  const getAllTeacher = (instituteId: string, branchId: string) => {
    const payload = {
      page: 1,
      limit: 1000,
      role: 'teacher',
      instituteId: instituteId ? instituteId : '',
      branchId: branchId,
      questionBankCourse: TeacherCourseId
    }
    setTeacherAPILoading(true)
    getAllUserAPI(payload)
      .then((res) => {
        if (res && res.data.length > 0) {
          const newTeacher = res.data.map((teacher: NewUserDetails) => {
            return {
              label: teacher.firstName,
              id: teacher?._id
            }
          })
          setTeachers(newTeacher)
          setTeacherAPILoading(false)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setTeacherAPILoading(false))
  }

  const SelectedBranch = (selectedValue: SearchableDropdownOptionData) => {
    setSelectedBranch(selectedValue)
    setSelectedTeacher(defaultValue)
    if (selectedValue.id) {
      getAllTeacher(String(selectedInstitutes?.id), String(selectedValue.id))
    } else {
      setTeachers([])
    }
    setTeacherDetails((prev) => {
      return {
        ...prev,
        branch_id: String(selectedValue.id),
        branch_name: selectedValue.label
      }
    })
  }

  const SelectedTeacher = (selectedValue: SearchableDropdownOptionData) => {
    setSelectedTeacher(selectedValue)
    setTeacherDetails((prev) => {
      return {
        ...prev,
        teacher_id: String(selectedValue.id),
        teacher_name: selectedValue.label
      }
    })
  }

  const SelectedInstitute = (selectedValue: SearchableDropdownOptionData) => {
    setSelectedInstitutes(selectedValue)
    setSelectedBranch(defaultValue)
    setSelectedTeacher(defaultValue)
    setTeacherDetails((prev) => {
      return {
        ...prev,
        institute_id: String(selectedValue.id),
        institute_name: selectedValue.label
      }
    })
    getBranch(String(selectedValue.id))
  }

  useEffect(() => {
    if (userInfoV2 && userInfoV2?.role === 'instituteAdmin') {
      setSelectedInstitutes({
        label: userInfoV2.instituteName,
        value: userInfoV2.instituteId,
        id: userInfoV2.instituteId
      })
      setTeacherDetails((prev) => {
        return {
          ...prev,
          institute_id: userInfoV2.instituteId,
          institute_name: userInfoV2.instituteName
        }
      })
      getBranch(String(userInfoV2.instituteId))
    }

    if (userInfoV2 && userInfoV2?.role === 'branchAdmin') {
      setSelectedInstitutes({
        label: userInfoV2.instituteName,
        value: userInfoV2.instituteId,
        id: userInfoV2.instituteId
      })
      setSelectedBranch({
        label: userInfoV2.branchName,
        value: userInfoV2.branchId,
        id: userInfoV2.branchId
      })

      setTeacherDetails((prev) => {
        return {
          ...prev,
          institute_id: userInfoV2.instituteId,
          institute_name: userInfoV2.instituteName,
          branch_name: userInfoV2.branchName,
          branch_id: userInfoV2.branchId
        }
      })
      getAllTeacher(userInfoV2.instituteId, String(userInfoV2.branchId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfoV2])

  const submitHandler = () => {
    setIsSubmit(true)
    if (
      teacherDetails.institute_name &&
      teacherDetails.branch_name &&
      teacherDetails?.teacher_id &&
      teacherDetails?.branch_id &&
      teacherDetails.teacher_name
    ) {
      setIsSubmit(false)
      assignTeacherHandler(teacherDetails)
      setIsPopUp(false)
    }
  }
  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Assign {subjectName} Teacher</Heading>
          <RemoveIcon onClick={() => setIsPopUp(false)} />
        </AlignHeading>
        {!(
          userInfoV2?.role === 'instituteAdmin' ||
          userInfoV2?.role === 'branchAdmin'
        ) && (
          <SearchInputWrapper>
            <SearchableDropdown
              label="Select Institute / School"
              placeHolder="Enter or select institute / school"
              options={institutes}
              onSelect={SelectedInstitute}
              selectedValue={selectedInstitutes}
              isClear={selectedInstitutes?.label ? true : false}
              required
              isLoader={institutesApiLoading}
              error={
                teacherDetails.institute_name || !isSubmit
                  ? ''
                  : 'field is required'
              }
            />
          </SearchInputWrapper>
        )}

        {!(userInfoV2?.role === 'branchAdmin') && (
          <SearchInputWrapper>
            <SearchableDropdown
              label="Select Branch"
              placeHolder="Enter or select branch"
              options={branch}
              onSelect={SelectedBranch}
              isLoader={branchApiLoading}
              selectedValue={selectedBranch}
              isClear={selectedBranch?.id ? true : false}
              required
              error={
                selectedBranch?.label || !isSubmit ? '' : 'field is required'
              }
            />
          </SearchInputWrapper>
        )}

        <SearchableDropdown
          label="Select Teacher"
          placeHolder="Enter or select Teacher"
          options={teacher}
          onSelect={SelectedTeacher}
          isLoader={teacherApiLoading}
          selectedValue={selectedTeacher}
          isClear={selectedTeacher?.id ? true : false}
          required
          error={selectedTeacher?.label || !isSubmit ? '' : 'field is required'}
        />
        <ButtonWrapper>
          <ButtonV2 onClick={() => submitHandler()}>Assign</ButtonV2>
        </ButtonWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default AssignTeacherPopUp
