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
  BranchDetails,
  InstituteDetails,
  NewBatchDetails,
  NewBranchDetails
} from '../../../utils/types'
import {
  assignTestsToInstituteAPI,
  getBatchAPI,
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
import CalendarInput from '../CalendarInput/Calendar'
import {
  addFifteenMinutesCurrentTime,
  getSelectedTime
} from '../../../pages/v2/assessment/pattern/helper'
import { format } from 'date-fns'
import { assignedTestFormattedTime } from '../../../helpers/V2/formattedTime'
import InputV2 from '../Form/Input'

const AssignInstitutePopup = ({
  setPopup,
  testId,
  reassignData
}: // assignText
{
  setPopup: (d: boolean) => void
  testId: string
  reassignData?: any
  // assignText: string
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

  const [batch, setBatch] = useState<any[]>([])

  const [selectedInstitute, setSelectedInstitute] = useState({
    institute_id: '',
    institute_name: ''
  })
  const [selectedBranch, setSelectedBranch] = useState<
    DropdownOptionData<BranchDetails>[] | any
  >([])
  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])
  const [institutesApiLoading, setInstitutesAPILoading] = useState(false)

  const [branchApiLoading, setBranchApiLoading] = useState(false)

  const [batchApiLoading, setBatchApiLoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)

  const [selectInstitute, setSelectInstitute] = useState(defaultValue)
  const [startDate, setStartDate] = useState<any>(new Date())
  const [testStartTime, setTestStartTime] = useState<any>(
    `${addFifteenMinutesCurrentTime(new Date())}`
  )

  const [endDate, setEndDate] = useState<any>(new Date())
  const [testEndTime, setTestEndTime] = useState<any>(
    `${addFifteenMinutesCurrentTime(new Date())}`
  )
  const [testDuration, setTestDuration] = useState<any>()

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
            id: branch?._id
          }
        })
        setBranch(newBranch)
      })
      .catch((err) => console.log(err))
      .finally(() => setBranchApiLoading(false))
  }

  const getBatch = (branchId: string[]) => {
    const payload = {
      page: 1,
      limit: 50,
      branchIds: branchId
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

  useEffect(() => {
    if (reassignData?.test_duration) {
      setTestDuration(reassignData.test_duration)
    }

    if (reassignData?.test_end_time) {
      setEndDate(new Date(reassignData?.test_end_time))
      const newEndDate = {
        title: `${
          new Date(reassignData?.test_end_time).getHours() % 12 === 0
            ? 12
            : new Date(reassignData?.test_end_time).getHours() % 12
        }`,
        firstName: `${new Date(
          reassignData?.test_end_time
        ).getMinutes()}`.padStart(2, '0'),
        lastName:
          new Date(reassignData?.test_end_time).getHours() >= 12 ? 'PM' : 'AM'
      }
      setTestEndTime(
        `${newEndDate.title}:${newEndDate.firstName} ${newEndDate.lastName}`
      )
    }

    if (reassignData?.test_start_time) {
      setStartDate(new Date(reassignData?.test_start_time))
      const newStartTime = {
        title: `${
          new Date(reassignData?.test_start_time).getHours() % 12 === 0
            ? 12
            : new Date(reassignData?.test_start_time).getHours() % 12
        }`,
        firstName: `${new Date(
          reassignData?.test_start_time
        ).getMinutes()}`.padStart(2, '0'),
        lastName:
          new Date(reassignData?.test_start_time).getHours() >= 12 ? 'PM' : 'AM'
      }
      setTestStartTime(
        `${newStartTime.title}:${newStartTime.firstName} ${newStartTime.lastName}`
      )
    }

    if (reassignData && reassignData?.institute_details?.institute_name) {
      setSelectInstitute({
        id: reassignData?.institute_details?.institute_id,
        label: reassignData?.institute_details?.institute_name
      })

      setSelectedInstitute(reassignData?.institute_details)
      let newB = reassignData?.branch_details.map((item: any) => {
        return {
          id: item.branch_id,
          label: item.branch_name
        }
      })
      setSelectedBranch(newB)
      const branchIDs = reassignData?.branch_details.map((item: any) =>
        String(item.branch_id)
      )
      if (userInfoV2.role === 'superAdmin') {
        getBranch(reassignData?.institute_details?.institute_id)
        getBatch(branchIDs)
      }
      if (userInfoV2.role === 'branchAdmin') {
        getBatch(branchIDs)
      }

      if (
        reassignData?.batch_details &&
        reassignData?.batch_details.length > 0
      ) {
        const newBatch = reassignData?.batch_details.map((item: any) => {
          return {
            id: item.batch_id,
            label: item.batch_name
          }
        })
        setSelectedBatch(newBatch)
      }
    }
  }, [reassignData, userInfoV2])

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
      getInstitutesAPI({ page: 1, limit: 50 })
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
  }, [userInfoV2])

  const submitHandler = () => {
    if (
      selectedInstitute.institute_id &&
      selectedBranch.length > 0 &&
      testDuration
    ) {
      let testStartTimeNew = assignedTestFormattedTime(startDate, testStartTime)
      let testEndTimeNew = assignedTestFormattedTime(endDate, testEndTime)

      setIsSubmit(true)
      const newBatch = selectedBatch.map((item) => item.id)

      const payload = {
        testId: testId,
        batches: newBatch,
        test_start_time: testStartTimeNew,
        test_end_time: testEndTimeNew,
        test_duration: testDuration
      }
      assignTestsToInstituteAPI(payload)
        .then(() => {
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
    setSelectedBranch([])
    setBranch([])
    setBatch([])
    setSelectedBatch([])
    if (selectedValue.id) {
      getBranch(String(selectedValue.id))
    }
    setSelectedInstitute({
      institute_id: String(selectedValue.id),
      institute_name: selectedValue.label
    })
  }

  const SelectedBranch = (selectedValue: any) => {
    setSelectedBranch([])
    setBatch([])
    setSelectedBatch([])
    if (selectedValue.length > 0) {
      const branchIDs = selectedValue.map((item: any) => `${item.id}`)
      getBatch(branchIDs)
    }
    setSelectedBranch(selectedValue)
  }

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Assign Test</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <SearchInputWrapper>
          <SearchableDropdown
            label="Select Institute / School"
            placeHolder="Enter or select institute / school"
            options={institutes}
            onSelect={SelectedInstitute}
            selectedValue={selectInstitute}
            isClear={
              selectedInstitute.institute_name &&
              !(
                userInfoV2.role === 'instituteAdmin' ||
                userInfoV2.role === 'branchAdmin'
              )
                ? true
                : false
            }
            defaultValue=""
            disabled={
              userInfoV2.role === 'instituteAdmin' ||
              userInfoV2.role === 'branchAdmin'
            }
            required
            isLoader={institutesApiLoading}
            error={
              selectedInstitute.institute_name || !isSubmit
                ? ''
                : 'field is required'
            }
          />
        </SearchInputWrapper>
        <SearchInputWrapper>
          <MultiselectDropdown
            selectedValue={selectedBranch}
            isLoading={branchApiLoading}
            label="Select Branch (Select multiple)"
            placeholder="Enter or select branch"
            options={getDropDownOptions(branch, 'id', 'label')}
            isClear={
              selectedBranch.length > 0 && !(userInfoV2.role === 'branchAdmin')
            }
            onSelect={(data) => {
              SelectedBranch(data)
            }}
            fullWidth
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
        />
        <InputV2
          label="Durations"
          required
          full
          type="number"
          value={testDuration}
          error={testDuration || !isSubmit ? '' : 'Field is required'}
          placeholder="Enter test duration"
          onChange={(e) => setTestDuration(e.target.value)}
        />
        <CalendarInput
          label="Select Start date and Time"
          title="Start date - Time"
          defaultDate={String(format(startDate, 'do MMMM, yyyy')) || ''}
          defaultTime={testStartTime || ''}
          onChangeDate={(val: any) => {
            setStartDate(val)

            if (new Date(val) > new Date(endDate)) {
              setEndDate(val)
            }
          }}
          onChangeTime={(val: any) => {
            let timeFormat = getSelectedTime(val)
            setTestStartTime(timeFormat)
          }}
          minDate={minDate}
          maxDate={maxDate}
          color="#1377B9"
        />
        <CalendarInput
          label="Select End date and Time"
          title="End date - Time"
          defaultDate={String(format(endDate, 'do MMMM, yyyy')) || ''}
          defaultTime={testEndTime || ''}
          onChangeDate={(val) => {
            setEndDate(val)
          }}
          onChangeTime={(val: any) => {
            let timeFormat = getSelectedTime(val)
            setTestEndTime(timeFormat)
          }}
          minDate={
            new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate()
            )
          }
          maxDate={maxDate}
          color="#1377B9"
        />
        <ButtonWrapper>
          <ButtonV2 onClick={() => submitHandler()} disabled={isSubmit}>
            Assign
          </ButtonV2>
        </ButtonWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default AssignInstitutePopup
