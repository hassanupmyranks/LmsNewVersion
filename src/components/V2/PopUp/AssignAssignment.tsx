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
import {
  BatchDetails,
  InstituteDetails,
  NewBatchDetails,
  NewBranchDetails
} from '../../../utils/types'
import {
  assignAssignment,
  getBatchAPI,
  getBatchCourses,
  getBranchAPI,
  getInstitutesAPI
} from '../../../helpers/V2/apis'
import { useEffect, useMemo, useState } from 'react'
import { getNumber } from '../../../pages/v2/assessment/addQuestions/helper'
import { DropdownOptionData, SearchableDropdownOptionData } from '../Form/types'

import MultiselectDropdown from '../Form/MultiselectDropdown'
import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import { CustomToastMessage } from '../ToastMessage'
import { RootState } from '../../../redux/store'
import { shallowEqual, useSelector } from 'react-redux'
import CalenderSelectInput from '../Calender'
import InputV2 from '../Form/Input'

const AssignAssignmentPopup = ({
  setPopup,
  testId,
  AssignmentType,
  assignmentData
}: {
  setPopup: (d: boolean) => void
  testId: string
  AssignmentType: string
  assignmentData: any
}) => {
  const [institutes, setInstitutes] = useState<SearchableDropdownOptionData[]>(
    []
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

  const [branch, setBranch] = useState<any[]>([])
  const [course, setCourse] = useState<any[]>([])
  const [courseApiLoading, setCourseApiLoading] = useState(false)
  const [batch, setBatch] = useState<any[]>([])

  const [selectedInstitute, setSelectedInstitute] = useState({
    institute_id: '',
    institute_name: ''
  })
  const [selectedBranch, setSelectedBranch] = useState({
    id: '',
    label: ''
  })
  const [selectedCourse, setSelectedCourse] = useState({
    id: '',
    label: ''
  })
  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])
  const [institutesApiLoading, setInstitutesAPILoading] = useState(false)

  const [branchApiLoading, setBranchApiLoading] = useState(false)

  const [batchApiLoading, setBatchApiLoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)

  const [selectInstitute, setSelectInstitute] = useState(defaultValue)
  const [startDate, setStartDate] = useState<any>(new Date())
  const [testDuration, setTestDuration] = useState<number>()

  const dateValue = new Date()
  const minDate = new Date(
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDate()
  )

  const maxDate = new Date(
    dateValue.getFullYear(),
    dateValue.getMonth() + 2,
    dateValue.getDate()
  )

  const getBranch = (instituteId: string) => {
    const payload = {
      page: 1,
      limit: 150,
      instituteId: instituteId
    }
    setBranchApiLoading(true)
    getBranchAPI(payload)
      .then((res) => {
        const newBranch = res?.data?.map((branch: NewBranchDetails) => {
          return {
            value: `${getNumber(Number(branch.teacherCount))} Teachers`,
            label: branch.name,
            id: branch?._id
          }
        })
        setBranch(newBranch)
      })
      .catch((err) => console.log(err))
      .finally(() => setBranchApiLoading(false))
  }

  useEffect(() => {
    if (selectedBranch?.id && selectedCourse?.id) {
      const payload = {
        page: 1,
        limit: 50,
        courseId: selectedCourse?.id,
        branchIds:
          userInfoV2.role === 'teacher'
            ? [userInfoV2.branchId]
            : userInfoV2.role === 'branchAdmin'
            ? [userInfoV2.branchId]
            : [String(selectedBranch?.id)]
      }
      setBatchApiLoading(true)
      getBatchAPI(payload)
        .then((res) => {
          const newBatch = res?.data?.map((batch: NewBatchDetails) => {
            return {
              label: batch.name,
              id: batch?._id
            }
          })
          setBatch(newBatch)
        })
        .catch((err) => console.log(err))
        .finally(() => setBatchApiLoading(false))
    }
  }, [userInfoV2, selectedBranch, selectedCourse])

  useEffect(() => {
    if (assignmentData) {
      if (assignmentData.batches && assignmentData.batches.length > 0) {
        const newBatchs = assignmentData.batches?.map(
          (batch: NewBatchDetails) => {
            return {
              label: batch.batchName,
              id: batch?.batchId
            }
          }
        )
        setSelectedBatch(newBatchs)
      }
      if (assignmentData.branchId) {
        setSelectedBranch({
          id: assignmentData.branchId,
          label: assignmentData.branchName
        })
      }
      if (assignmentData.courseId) {
        setSelectedCourse({
          id: assignmentData.courseId,
          label: assignmentData.courseName
        })
      }
      if (assignmentData.instituteId) {
        setSelectedInstitute({
          institute_id: String(assignmentData.instituteId),
          institute_name: assignmentData.instituteName
        })
        getBranch(String(assignmentData.instituteId))
        setSelectInstitute({
          id: assignmentData.instituteId,
          label: assignmentData.instituteName
        })
      }
    }
  }, [assignmentData])

  useEffect(() => {
    if (userInfoV2.role === 'instituteAdmin') {
      setSelectInstitute({
        label: userInfoV2.instituteName,
        id: userInfoV2.instituteId
      })
      getBranch(userInfoV2.instituteId)
    }

    if (userInfoV2.role === 'superAdmin') {
      setInstitutesAPILoading(true)
      getInstitutesAPI({ page: 1, limit: 150 })
        .then((data) => {
          const newInstitutes = data?.data?.map((item: InstituteDetails) => {
            return {
              value: `${getNumber(
                Number(item.teacherCount)
              )} Teachers | ${getNumber(item.branchCount)} Branches `,
              label: item.name,
              id: item?._id
            }
          })
          setInstitutes(newInstitutes)
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInstitutesAPILoading(false))
    }

    if (userInfoV2.role === 'teacher' || userInfoV2.role === 'branchAdmin') {
      setCourseApiLoading(true)
      getBatchCourses({
        branchId: String(userInfoV2?.branchId)
      })
        .then((res) => {
          if (res) {
            const Course = res?.data?.map((data: any) => ({
              id: data?._id,
              label: data?.name,
              value: data?.name
            }))
            setCourse(Course)
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setCourseApiLoading(false))
    }
  }, [userInfoV2])

  const submitHandler = () => {
    if (selectedBatch.length > 0) {
      setIsSubmit(true)
      const newBatch = selectedBatch.map((item) => item.id)

      const testPayload = {
        id: testId,
        batches: newBatch,
        duration: testDuration,
        deadline: startDate
      }
      const projectPayload = {
        id: testId,
        batches: newBatch,
        deadline: startDate
      }
      assignAssignment(
        AssignmentType === 'project' ? projectPayload : testPayload
      )
        .then(() => {
          setSelectedCourse({
            id: '',
            label: ''
          })
          setCourse([])
          setSelectedBranch({ id: '', label: '' })
          setBranch([])
          setBatch([])
          setSelectedBatch([])
          CustomToastMessage(`Successfully Assigned!`, 'success')
          setPopup(false)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmit(false))
    }
  }

  const SelectedInstitute = (selectedValue: SearchableDropdownOptionData) => {
    setSelectInstitute({
      id: String(selectedValue.id),
      label: selectedValue.label
    })
    setSelectedBranch({ id: '', label: '' })
    setBranch([])
    setBatch([])
    setSelectedBatch([])
    setCourse([])
    setSelectedCourse({
      id: '',
      label: ''
    })
    if (selectedValue.id) {
      getBranch(String(selectedValue.id))
    }
    setSelectedInstitute({
      institute_id: String(selectedValue.id),
      institute_name: selectedValue.label
    })
  }

  const SelectedBranch = (selectedValue: any) => {
    setSelectedBranch({
      id: '',
      label: ''
    })
    setBatch([])
    setSelectedBatch([])
    if (selectedValue.id) {
      setCourseApiLoading(true)
      getBatchCourses({
        branchId: String(selectedValue.id)
      })
        .then((res) => {
          if (res) {
            const Course = res?.data?.map((data: any) => ({
              id: data?._id,
              label: data?.name,
              value: data?.name
            }))
            setCourse(Course)
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setCourseApiLoading(false))
    }
    setSelectedBranch(selectedValue)
  }

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Assign Assignment</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>

        {userInfoV2.role === 'superAdmin' && (
          <SearchInputWrapper>
            <SearchableDropdown
              label="Select Institute / School"
              placeHolder="Enter or select institute / school"
              options={institutes}
              onSelect={SelectedInstitute}
              selectedValue={selectInstitute}
              isClear={selectedInstitute.institute_name ? true : false}
              defaultValue=""
              required
              isLoader={institutesApiLoading}
              error={
                selectedInstitute.institute_name || !isSubmit
                  ? ''
                  : 'field is required'
              }
            />
          </SearchInputWrapper>
        )}

        {(userInfoV2.role === 'superAdmin' ||
          userInfoV2.role === 'instituteAdmin') && (
          <SearchInputWrapper>
            <SearchableDropdown
              selectedValue={selectedBranch}
              isLoader={branchApiLoading}
              label="Select Branch"
              placeHolder="Enter or select branch"
              options={branch}
              isClear={selectedBranch.id ? true : false}
              onSelect={(data) => {
                SelectedBranch(data)
                setCourse([])
                setBatch([])
                setSelectedCourse({
                  id: '',
                  label: ''
                })
              }}
              fullWidth
              required
            />
          </SearchInputWrapper>
        )}
        <SearchInputWrapper>
          <SearchableDropdown
            selectedValue={selectedCourse}
            isLoader={courseApiLoading}
            label="Select Course"
            placeHolder="Enter or select Course"
            options={course}
            isClear={selectedCourse.id ? true : false}
            onSelect={(data: any) => {
              setSelectedCourse(data)
              setBatch([])
              setSelectedBatch([])
            }}
            fullWidth
            required
          />
        </SearchInputWrapper>
        <MultiselectDropdown
          selectedValue={selectedBatch}
          isLoading={batchApiLoading}
          label="Select Batch / Section (Select multiple)"
          placeholder="Enter or select Batch / Section"
          options={getDropDownOptions(batch, 'id', 'label')}
          isClear={selectedBatch.length > 0}
          onSelect={(data) => {
            setSelectedBatch(data)
          }}
          fullWidth
          required
        />
        {AssignmentType === 'assignmentTest' && (
          <InputV2
            label="Duration"
            required
            full
            type="number"
            value={testDuration}
            error={testDuration || !isSubmit ? '' : 'Field is required'}
            placeholder="Enter test duration"
            onChange={(e) => setTestDuration(Number(e.target.value))}
          />
        )}
        <CalenderSelectInput
          minDate={minDate}
          maxDate={maxDate}
          label={'Select Deadline'}
          placeholder={'Please Select Deadline'}
          value={startDate?.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
          onChangeDate={(val: any) => {
            setStartDate(val)
          }}
        >
          {startDate}
        </CalenderSelectInput>
        <ButtonWrapper>
          <ButtonV2 onClick={() => submitHandler()} disabled={isSubmit}>
            Assign
          </ButtonV2>
        </ButtonWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default AssignAssignmentPopup
