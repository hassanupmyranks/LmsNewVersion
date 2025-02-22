import { useEffect, useState } from 'react'
import { BatchDetails, NewBatchDetails } from '../../../../utils/types'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import {
  assignTimeTableToInstituteAPI,
  getBatchAPI,
  getSingleTimeTableAPI,
  updateTimeTableToInstituteAPI
} from '../../../../helpers/V2/apis'
import {
  AlignHeading,
  ButtonWrapper,
  Heading,
  PopUpBox,
  PopUpContainer,
  RemoveIcon
} from '../../../../components/V2/PopUp/styledComponents'
import MultiselectDropdown from '../../../../components/V2/Form/MultiselectDropdown'
import {
  ButtonV2,
  LabelH4,
  Span
} from '../../../../components/V2/styledComponents'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../../../redux/store'

interface AssignTimeTableProps {
  setPopup: (d: boolean) => void
  branchId: string
  courseId: string | any
  startTime: string
  endTime: string
  isEdit: boolean
  timeTableId: string | any
  totalNoOfSessionsPerDay: number
  breakTimings: { type: string; duration: number; afterSession: number }[]
  resetForm: () => void
}

const AssignTimeTableToBatchPopup: React.FC<AssignTimeTableProps> = ({
  setPopup,
  totalNoOfSessionsPerDay,
  branchId,
  courseId,
  startTime,
  endTime,
  isEdit,
  timeTableId,
  breakTimings,
  resetForm
}) => {
  // const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [batchApiLoading, setBatchApiLoading] = useState(false)
  const [batch, setBatch] = useState<any[]>([])
  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 500,
      branchIds: [branchId],
      courseId: courseId
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
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setBatchApiLoading(false))
  }, [branchId, courseId])

  const submitHandler = () => {
    if (selectedBatch.length === 0) {
      setIsSubmitted(true)
      return
    }
    setIsSubmit(true)
    setIsSubmitted(false)

    const newBatch = selectedBatch.map((item) => item.id)
    const newBreakTimings = breakTimings.map((breakItem) => ({
      type: breakItem.type,
      duration: breakItem.duration,
      afterSession: breakItem.afterSession
    }))

    const payload: Record<string, any> = {
      startTime,
      endTime,
      breakTimings: newBreakTimings,
      totalNoOfSessionsPerDay,
      batchIds: newBatch
    }

    // Add optional fields only if they exist
    if (branchId && !isEdit) payload.branchId = branchId
    if (courseId && !isEdit) payload.courseId = courseId

    if (isEdit) {
      updateTimeTableToInstituteAPI(timeTableId, payload)
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          setPopup(false)
          resetForm()
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmit(false))
    } else {
      assignTimeTableToInstituteAPI(payload)
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          setPopup(false)
          resetForm()
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmit(false))
    }
  }

  useEffect(() => {
    if (!timeTableId || !isEdit) return
    getSingleTimeTableAPI(timeTableId)
      .then((res) => {
        setSelectedBatch(
          res.data.batches.map((batch: any) => ({
            id: batch.batchId,
            label: batch.batchName
          }))
        )
      })
      .catch((err) => CustomToastMessage(err.message, 'error'))
  }, [timeTableId, isEdit])

  return (
    <PopUpContainer>
      <PopUpBox style={{ padding: '20px', width: '430px' }}>
        <AlignHeading>
          <div></div>
          <Heading>Assign Test</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <LabelH4 style={{ margin: '0px', padding: '0px' }}>
          <Span>
            <strong>Start Time :- </strong>
          </Span>{' '}
          {startTime}
        </LabelH4>
        <LabelH4 style={{ margin: '0px', padding: '0px' }}>
          <Span>
            <strong>End Time :- </strong>
          </Span>{' '}
          {endTime}
        </LabelH4>
        <LabelH4 style={{ margin: '0px', padding: '0px' }}>
          <Span>
            <strong>Total Sessions/Day :- </strong>
          </Span>{' '}
          {totalNoOfSessionsPerDay}
        </LabelH4>
        {breakTimings.length > 0 ? (
          breakTimings.map((breakItem, index) => (
            <div key={index}>
              <LabelH4>
                <Span>
                  <strong>Type :- </strong>
                </Span>{' '}
                {breakItem.type}
              </LabelH4>
              <LabelH4>
                <Span>
                  <strong>Duration :- </strong>
                </Span>{' '}
                {breakItem.duration} mins
              </LabelH4>
              <LabelH4>
                <Span>
                  <strong>After Session :- </strong>
                </Span>{' '}
                {breakItem.afterSession}
              </LabelH4>
            </div>
          ))
        ) : (
          <LabelH4>No break timings assigned</LabelH4>
        )}
        <div></div>

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

        <ButtonWrapper>
          <ButtonV2
            onClick={() => {
              setIsSubmitted(true)
              setIsSubmit(true)
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

export default AssignTimeTableToBatchPopup
