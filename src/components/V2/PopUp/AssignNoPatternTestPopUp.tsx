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
  assignNoPatternTestAPI,
  getBatchAPI,
  getBranchAPI,
  getInstitutesAPI
} from '../../../helpers/V2/apis'
import { useEffect, useState } from 'react'
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

const AssignNoPatternTestPopUp = ({
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

  const [branch, setBranch] = useState<any[]>([])
  const [batch, setBatch] = useState<any[]>([])
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])
  const [institutesApiLoading, setInstitutesAPILoading] = useState(false)
  const [branchApiLoading, setBranchApiLoading] = useState(false)
  const [batchApiLoading, setBatchApiLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
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

  useEffect(() => {
    if (userInfoV2.role === 'instituteAdmin') {
      setSelectedInstitute({
        label: userInfoV2.instituteName,
        value: userInfoV2.instituteName,
        id: userInfoV2.instituteId
      })
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
          setInstitutes((prev) => [...prev, ...newInstitutes])
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInstitutesAPILoading(false))
    }
  }, [userInfoV2.instituteName, userInfoV2.instituteId, userInfoV2.role])

  useEffect(() => {
    if (userInfoV2.role === 'branchAdmin') {
      setSelectedBranch({
        id: userInfoV2.branchId,
        value: userInfoV2.branchName,
        label: userInfoV2.branchName
      })
    } else if (userInfoV2.role === 'superAdmin') {
      setBranchApiLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        instituteId: String(selectedInstitute?.id)
      }
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
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchApiLoading(false))
    }
  }, [selectedInstitute?.id, userInfoV2])

  useEffect(() => {
    setBatchApiLoading(true)
    const payload = {
      page: 1,
      limit: 150,
      instituteId: selectedInstitute?.id,
      branchIds:
        userInfoV2.role == 'branchAdmin'
          ? [String(userInfoV2.branchId)]
          : selectedBranch?.id
          ? [String(selectedBranch?.id)]
          : ['']
    }
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
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setBatchApiLoading(false))
  }, [selectedInstitute?.id, selectedBranch?.id, userInfoV2])

  useEffect(() => {
    if (reassignData?.duration) {
      setTestDuration(reassignData.duration)
    }

    if (reassignData?.endTime) {
      setEndDate(new Date(reassignData?.endTime))
      const newEndDate = {
        title: `${
          new Date(reassignData?.endTime).getHours() % 12 === 0
            ? 12
            : new Date(reassignData?.endTime).getHours() % 12
        }`,
        firstName: `${new Date(reassignData?.endTime).getMinutes()}`.padStart(
          2,
          '0'
        ),
        lastName: new Date(reassignData?.endTime).getHours() >= 12 ? 'PM' : 'AM'
      }
      setTestEndTime(
        `${newEndDate.title}:${newEndDate.firstName} ${newEndDate.lastName}`
      )
    }

    if (reassignData?.startTime) {
      setStartDate(new Date(reassignData?.startTime))
      const newStartTime = {
        title: `${
          new Date(reassignData?.startTime).getHours() % 12 === 0
            ? 12
            : new Date(reassignData?.startTime).getHours() % 12
        }`,
        firstName: `${new Date(reassignData?.startTime).getMinutes()}`.padStart(
          2,
          '0'
        ),
        lastName:
          new Date(reassignData?.startTime).getHours() >= 12 ? 'PM' : 'AM'
      }
      setTestStartTime(
        `${newStartTime.title}:${newStartTime.firstName} ${newStartTime.lastName}`
      )
    }

    if (reassignData && reassignData?.instituteName) {
      setSelectedInstitute({
        id: reassignData?.instituteId,
        label: reassignData?.instituteName
      })

      setSelectedBranch({
        id: reassignData?.branchId,
        label: reassignData?.branchName
      })

      if (userInfoV2.role === 'superAdmin') {
        setSelectedInstitute({
          id: reassignData?.instituteId,
          label: reassignData?.instituteName
        })
        setSelectedBranch({
          id: reassignData?.branchId,
          label: reassignData?.branchName
        })
      }

      if (userInfoV2.role === 'branchAdmin') {
        setSelectedBranch({
          id: reassignData?.branchId,
          label: reassignData?.branchName
        })
      }

      if (reassignData?.batches && reassignData?.batches.length > 0) {
        const newBatch = reassignData?.batches.map((item: any) => {
          return {
            id: item.batchId,
            label: item.batchName
          }
        })
        setSelectedBatch(newBatch)
      }
    }
  }, [reassignData, userInfoV2])

  const submitHandler = () => {
    if (selectedInstitute?.id && selectedBranch?.id && testDuration) {
      let testStartTimeNew = assignedTestFormattedTime(startDate, testStartTime)
      let testEndTimeNew = assignedTestFormattedTime(endDate, testEndTime)

      setIsSubmit(true)
      const newBatch = selectedBatch.map((item) => item.id)

      const payload = {
        testId: testId,
        instituteId: String(selectedInstitute?.id),
        branchId: String(selectedBranch?.id),
        batchIds: newBatch,
        duration: Number(testDuration),
        startTime: testStartTimeNew,
        endTime: testEndTimeNew
      }
      assignNoPatternTestAPI(payload)
        .then(() => {
          CustomToastMessage(`Successfully Assigned!`, 'success')
          setPopup(false)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmit(false))
    }
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
            isLoader={institutesApiLoading}
            label={'Select Institute / School'}
            placeHolder={'Please Select Institute / School'}
            options={institutes}
            isClear={
              selectedInstitute?.id &&
              !(
                userInfoV2.role === 'instituteAdmin' ||
                userInfoV2.role === 'branchAdmin'
              )
                ? true
                : false
            }
            onSelect={(option: any) => {
              setSelectedBranch({
                value: '',
                label: '',
                id: ''
              })
              setSelectedBatch([])
              setBranch([])
              setSelectedInstitute(option)
            }}
            selectedValue={selectedInstitute}
            disabled={
              userInfoV2.role === 'instituteAdmin' ||
              userInfoV2.role === 'branchAdmin'
            }
            required
            error={
              selectedInstitute?.id || !isSubmit ? '' : 'field is required'
            }
          />
        </SearchInputWrapper>
        <SearchInputWrapper>
          <SearchableDropdown
            isLoader={branchApiLoading}
            label={'Select Branch'}
            placeHolder="Please Select Branch"
            options={branch}
            isClear={
              selectedBranch?.id && !(userInfoV2.role === 'branchAdmin')
                ? true
                : false
            }
            onSelect={(option: any) => {
              setSelectedBatch([])
              setSelectedBranch(option)
            }}
            selectedValue={selectedBranch}
            disabled={userInfoV2.role === 'branchAdmin'}
            required
            error={selectedBranch?.id || !isSubmit ? '' : 'field is required'}
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

export default AssignNoPatternTestPopUp
