import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { useEffect, useState } from 'react'
import { BatchDetails, NewBatchDetails } from '../../../../utils/types'
import { DropdownOptionData } from '../../../../components/V2/Form/types'
import {
  assignTestsToInstituteAPI,
  getBatchAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import {
  AlignHeading,
  ButtonWrapper,
  PopUpBox,
  PopUpContainer,
  RemoveIcon
} from '../../../../components/V2/PopUp/styledComponents'
import MultiselectDropdown from '../../../../components/V2/Form/MultiselectDropdown'
import { getDropDownOptions } from '../../../../helpers/V2/dropdown'
import { ButtonV2 } from '../../../../components/V2/styledComponents'
import { Heading } from './styledComponent'

const AssignTestToBatchOfflinePopup = ({
  setPopup,
  testId,
  reassignData
}: {
  setPopup: (d: boolean) => void
  testId: string
  reassignData?: any
  immediateTime?: string
}) => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [batchApiLoading, setBatchApiLoading] = useState(false)
  const [batch, setBatch] = useState<any[]>([])

  const [selectedBatch, setSelectedBatch] = useState<
    DropdownOptionData<BatchDetails>[]
  >([])

  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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
  }, [reassignData])

  const submitHandler = () => {
    if (selectedBatch.length > 0 && selectedAnnouncement) {
      setIsSubmit(true)
      setIsSubmitted(false)
      const newBatch = selectedBatch.map((item) => item.id)
      const payload = {
        testId: testId,
        batches: newBatch,
        isOffline: true
      }
      assignTestsToInstituteAPI(payload)
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          setPopup(false)
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
  }, [user])

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

export default AssignTestToBatchOfflinePopup
