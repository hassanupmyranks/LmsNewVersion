import { ButtonV2 } from '../styledComponents'
import {
  PopUpBox,
  AlignHeading,
  Heading,
  RemoveIcon,
  ButtonWrapper,
  PopUpContainer
} from './styledComponents'
import {
  BatchDetails,
  BranchDetails,
  NewBatchDetails
} from '../../../utils/types'
import {
  assignTestsToInstituteAPI,
  getBatchAPI,
  updateResultAnnouncementAPI
} from '../../../helpers/V2/apis'
import { useEffect, useState } from 'react'
import { DropdownOptionData } from '../Form/types'

import MultiselectDropdown from '../Form/MultiselectDropdown'
import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import { CustomToastMessage } from '../ToastMessage'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import SearchableDropdown from '../Form/SearchableDropdown'
import CalendarInput from '../CalendarInput/Calendar'
import {
  assignedTestFormattedTime,
  formattedTime
} from '../../../helpers/V2/formattedTime'
import {
  addFifteenMinutesCurrentTime,
  getSelectedTime
} from '../../../pages/v2/assessment/pattern/helper'
import InputV2 from '../Form/Input'
import { format } from 'date-fns'

const AssignTestToBatchPopup = ({
  setPopup,
  testId,
  reassignData
}: // immediateTime
{
  setPopup: (d: boolean) => void
  testId: string
  reassignData?: any
  immediateTime?: string
}) => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [batch, setBatch] = useState<any[]>([])

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

  const announcementData = [
    {
      id: 'LATER',
      label: 'Later'
    },
    {
      id: 'IMMEDIATE',
      label: 'Immediate'
    }
  ]

  const [selectedInstitute] = useState({
    institute_id: user.instituteId,
    institute_name: user.instituteName
  })
  const [selectedBranch] = useState<BranchDetails[]>([
    {
      branch_id: user.branchId,
      branch_name: user.branchName
    }
  ])
  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])

  const [batchApiLoading, setBatchApiLoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState<any>('')

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>({
    id: '',
    label: ''
  })

  useEffect(() => {
    if (reassignData?.batch_details && reassignData?.batch_details.length > 0) {
      const newBatch = reassignData?.batch_details.map((item: any) => {
        return {
          id: item.batch_id,
          label: item.batch_name
        }
      })
      setSelectedBatch(newBatch)
      const announce = reassignData?.result_announce?.toLowerCase()
      setSelectedAnnouncement({
        id: reassignData?.result_announce,
        label: announce?.charAt(0).toUpperCase() + announce.slice(1)
      })
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
  }, [reassignData])

  const submitAnnouncement = () => {
    if (selectedAnnouncement?.id) {
      let payload: any = {
        test_id: testId,
        result_announce: selectedAnnouncement?.id
        // result_announce_time: immediateTime
      }
      if (selectedAnnouncement?.id === 'LATER') {
        let announcementTime = formattedTime(date, time)
        payload = {
          test_id: testId,
          result_announce: selectedAnnouncement?.id,
          result_announce_time: announcementTime
        }
      }
      updateResultAnnouncementAPI(payload)
        .then((res) => {
          CustomToastMessage(`${res.message}`, 'success')
          setPopup(false)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmit(false))
    }
  }

  const submitHandler = () => {
    if (
      selectedInstitute.institute_id &&
      selectedBranch.length > 0 &&
      selectedBatch.length > 0 &&
      selectedAnnouncement
    ) {
      setIsSubmit(true)
      setIsSubmitted(false)
      const newBatch = selectedBatch.map((item) => item.id)
      let testStartTimeNew = assignedTestFormattedTime(startDate, testStartTime)
      let testEndTimeNew = assignedTestFormattedTime(endDate, testEndTime)

      const payload = {
        testId: testId,
        batches: newBatch,
        test_start_time: testStartTimeNew,
        test_end_time: testEndTimeNew,
        test_duration: testDuration
      }
      assignTestsToInstituteAPI(payload)
        .then(() => {
          submitAnnouncement()
          setIsSubmit(true)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmit(false))
    }
  }

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 500,
      branchIds: [user.branchId]
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
  }, [user.branchId])

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Assign Test</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <MultiselectDropdown
          selectedValue={selectedBatch}
          isLoading={batchApiLoading}
          label="Select Batch / Section (Select multiple)"
          placeholder="Enter or select Batch / Section"
          error={
            selectedBatch.length > 0 || !isSubmitted ? '' : 'Field is required'
          }
          options={getDropDownOptions(batch, 'id', 'label')}
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
        <SearchableDropdown
          label="Result Announcement"
          placeHolder="Enter or select Announcement"
          selectedValue={selectedAnnouncement}
          options={announcementData}
          onSelect={(data) => setSelectedAnnouncement(data)}
          isLoader={false}
          required
          error={
            selectedAnnouncement.id || !isSubmitted ? '' : 'Field is required'
          }
        />
        {selectedAnnouncement && selectedAnnouncement?.id === 'LATER' && (
          <CalendarInput
            label="Select Date & Time"
            title=""
            defaultDate={''}
            defaultTime={''}
            onChangeDate={(val) => setDate(val)}
            onChangeTime={(val) => {
              setTime(val)
            }}
            minDate={minDate}
            maxDate={maxDate}
            color="#1377B9"
          />
        )}
        <ButtonWrapper>
          <ButtonV2
            onClick={() => {
              setIsSubmitted(true)
              submitHandler()
            }}
            disabled={isSubmit}
          >
            Assign
          </ButtonV2>
        </ButtonWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default AssignTestToBatchPopup
