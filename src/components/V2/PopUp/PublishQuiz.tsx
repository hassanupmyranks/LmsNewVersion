import { ButtonV2 } from '../styledComponents'
import {
  PopUpBox,
  AlignHeading,
  Heading,
  RemoveIcon,
  ButtonWrapper,
  PopUpContainer,
  SearchInputWrapper
} from './styledComponents'
import {
  BatchDetails,
  BranchDetails,
  NewBatchDetails
} from '../../../utils/types'
import { assignQuizApi, getBatchAPI } from '../../../helpers/V2/apis'
import { useEffect, useState } from 'react'
import { DropdownOptionData } from '../Form/types'

import MultiselectDropdown from '../Form/MultiselectDropdown'
import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import InputV2 from '../Form/Input'
import { CustomToastMessage } from '../ToastMessage'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
// // import { TimeInput } from '../../../pages/v2/interactiveGame/uploadContent/StyledCompontents'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker/TimePicker'
// import { TextField, MenuItem } from '@mui/material'
// import { Required } from '../Form/styledComponents'

const PublishQuiz = ({
  reassignData,
  setIsPublishPopup,
  type
}: {
  setIsPublishPopup: (d: boolean) => void
  testId?: string
  reassignData?: any
  type?: string
}) => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [batch, setBatch] = useState<any[]>([])

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

  // const [duration, setDuration] = useState<Date | null>(null)
  const history = useHistory()
  const [batchApiLoading, setBatchApiLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [quizName, setQuizName] = useState<any>('')

  // const handleTimeChange = (newTime: Date | null) => {
  //   setDuration(newTime)
  // }

  // const formattedTime: any = duration
  //   ? `${duration.getMinutes().toString().padStart(2, '0')}`
  //   : '00'
  //   const formattedTime: any = duration ? `${duration.getMinutes().toString().padStart(2, '0')}` : '00';
  // console.log(formattedTime)

  // const dateStr: any = duration
  // const date = new Date(dateStr)
  // const minutes = date.getMinutes()

  // console.log(minutes)

  const [duration, setDuration] = useState<any>(null)

  // const minutesList = Array.from({ length: 180 }, (_, i) => i + 1)

  // const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDuration(parseInt(event.target.value, 10))
  // }

  useEffect(() => {
    if (reassignData?.batchDetails && reassignData?.batchDetails.length > 0) {
      const newBatch = reassignData?.batchDetails.map((item: any) => {
        return {
          id: item._id,
          label: item.name
        }
      })
      setSelectedBatch(newBatch)
    }
  }, [reassignData])

  const handleQuizNameChange = (event: any) => {
    setQuizName(event.target.value)
  }

  const submitHandler = () => {
    let branchDetails: any = []
    if (
      selectedInstitute.institute_id &&
      selectedBranch.length > 0 &&
      selectedBatch.length > 0
    ) {
      setIsSubmit(true)
      setIsSubmitted(false)
      branchDetails = selectedBatch.map((item) => {
        // return {
        return String(item.id)
        // name: item.label
        // }
      })
    }
    const payload = {
      quizId: reassignData?._id,
      name: quizName,
      duration: duration ?? 0,
      batchIds: branchDetails
    }

    assignQuizApi(payload)
      .then((res) => {
        console.log('res', res)
        history.push(ROUTES_V2.Quiz)
        CustomToastMessage('Successfully assigned quiz!', 'success')
      })
      .catch((err) => {
        CustomToastMessage(`Error: ${err}`, 'error')
      })
  }

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 50,
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

  // const durationTime: any[] = [
  //   { value: 10, label: '10 min' },
  //   { value: 15, label: '15 min' },
  //   { value: 20, label: '20 min' },
  //   { value: 25, label: '25 min' },
  //   { value: 30, label: '30 min' }
  // ]

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>

          <Heading>
            {' '}
            {type == 'Assignment' ? 'Publish Assignment' : 'Publish Test'}
          </Heading>
          <RemoveIcon onClick={() => setIsPublishPopup(false)} />
        </AlignHeading>
        <SearchInputWrapper>
          <InputV2
            label={type == 'Assignment' ? 'Assignment Name' : 'Test Name'}
            value={quizName}
            required
            placeholder={
              type == 'Assignment' ? 'Enter Assignment Name' : 'Enter Test Name'
            }
            onChange={handleQuizNameChange}
          />
        </SearchInputWrapper>
        <MultiselectDropdown
          selectedValue={selectedBatch}
          isLoading={batchApiLoading}
          label="Select Batch / Section (Select multiple)"
          placeholder="Enter or select Batch / Section"
          error={
            selectedBatch.length > 0 || !isSubmitted ? '' : 'field is required'
          }
          options={getDropDownOptions(batch, 'id', 'label')}
          onSelect={(data) => {
            setSelectedBatch(data)
          }}
          fullWidth
        />
        {type == 'Assignment' ? (
          ''
        ) : (
          <SearchInputWrapper style={{ marginTop: '8px' }}>
            {/* <Dropdown
              label={'Select Duration'}
              placeholder={'Select Duration'}
              selectedValue={duration}
              options={durationTime}
              onSelect={(val: any) => setDuration(val)}
            /> */}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}> */}
            {/* <TimeInput
                  type="time"
                  value={formattedTime}
                  onChange={(e: any) => handleTimeChange(e.target.value)}
                  step="1"
                /> */}
            {/* <TimePicker
                  value={duration}
                  onChange={handleTimeChange}
                  views={['minutes']}
                  openTo="minutes"
                  ampm={false}
                /> */}
            {/* <TimeInput
                  type="time"
                  value={formattedTime}
                  onChange={handleTimeChange}
                  step="1"
                /> */}
            {/* </DemoContainer>
            </LocalizationProvider> */}
            {/* <InputLabel>
              Enter Duration (mins)
            </InputLabel> */}
            <InputV2
              label={'Duration (min)'}
              value={duration}
              placeholder="Enter Duration"
              onChange={(value) => {
                setDuration(value.target.value)
              }}
            />
            {/* <TextField
              select
              placeholder="Select Duration"
              value={duration}
              onChange={handleTimeChange}
              InputProps={{
                style: {
                  height: '47px',
                  borderRadius: '1rem',
                  width: '200px',
                  fontFamily: 'DM Sans',
                  fontSize: '14px'
                }
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 200
                    }
                  }
                }
              }}
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                padding: '6px 0px 2px 0px'
              }}
            >
              {minutesList.map((minute) => (
                <MenuItem key={minute} value={minute.toString()}>
                  {minute}
                </MenuItem>
              ))}
            </TextField> */}
          </SearchInputWrapper>
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

export default PublishQuiz
