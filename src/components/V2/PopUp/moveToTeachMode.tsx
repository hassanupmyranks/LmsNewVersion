import {
  PopUpBox,
  Heading,
  PopUpContainer,
  AlignHeading,
  RemoveIcon
} from './styledComponents'
import SearchableDropdown from '../Form/SearchableDropdown'
import SimpleButton from '../Button/SimpleButton'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import CalendarDateInput from '../CalendarDateInput/CalendarDateInput'
import { CustomToastMessage } from '../ToastMessage'
import {
  createSessions,
  getBatchAPI,
  updateSessionsAPI
} from '../../../helpers/V2/apis'
import { NewBatchDetails } from '../../../utils/types'
import { SearchableDropdownOptionData } from '../Form/types'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
const MoveToTeachMode = ({
  setPopup,
  gradeId,
  SubjectId,
  materialIds,
  isEdit,
  sessionId,
  startDate,
  setStartDate,
  newBatch
}: {
  setPopup: (d: boolean) => void
  gradeId?: number | string
  SubjectId?: number | string
  materialIds?: any
  isEdit: boolean
  sessionId: string
  startDate: null | Date
  setStartDate: (d: any) => void
  newBatch: any
}) => {
  const history = useHistory()
  const minDate = new Date(2020, 12, 31) // Today's date
  const maxDate = new Date(2026, 12, 31) // End of 2025
  const [batch, setBatch] = useState<any[]>([])
  const [batchTotal, setBatchTotal] = useState(0)
  const [isBatchLoading, setIsBatchLoading] = useState(false)
  const [selectedBatch, setSelectedBatch] =
    useState<SearchableDropdownOptionData>()
  useState<SearchableDropdownOptionData>(newBatch)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  useEffect(() => {
    if (gradeId) {
      setIsBatchLoading(false)
      const payload = {
        page: 1,
        limit: 150,
        courseId: gradeId
      }
      getBatchAPI(payload)
        .then((res: any) => {
          setBatchTotal(res?.total)
          const newBatch = res?.data?.map((batch: NewBatchDetails) => {
            return {
              label: batch.name,
              id: batch?._id,
              value: ''
            }
          })
          setBatch(newBatch)
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Batches under this Grade', 'error')
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsBatchLoading(false))
    }
  }, [gradeId])
  const handleSubmit = () => {
    if (startDate && selectedBatch && materialIds.length > 0) {
      setIsSubmitted(true)
      if (isEdit) {
        updateSessionsAPI(sessionId, {
          batchId: selectedBatch?.id,
          materialIds: materialIds,
          sessionDate: startDate
        })
          .then((res: any) => {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.TEACH_MODE)
            setSelectedBatch({ label: '', id: '' })
            setStartDate(new Date())
            setPopup(false)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => setIsSubmitted(false))
      } else {
        createSessions({
          batchId: selectedBatch?.id,
          subjectId: SubjectId,
          materialIds: materialIds,
          sessionDate: startDate
        })
          .then((res: any) => {
            CustomToastMessage(res.message, 'success')
            history.push(ROUTES_V2.TEACH_MODE)
            setSelectedBatch({ label: '', id: '' })
            setStartDate(new Date())
            setPopup(false)
          })
          .catch((error) => {
            CustomToastMessage(error.message, 'error')
          })
          .finally(() => setIsSubmitted(false))
      }
    }
  }
  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <Heading></Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <div style={{ display: 'flex', gap: '10px', padding: '6px' }}>
          <CalendarDateInput
            label="Select Date"
            title="Select Date"
            onChangeDate={(date) => {
              setStartDate(date)
            }}
            defaultDate={startDate ? format(startDate, 'do MMMM, yyyy') : ''}
            minDate={minDate}
            maxDate={maxDate}
            disabled={false}
            color={''}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', padding: '6px' }}>
          <SearchableDropdown
            selectedValue={selectedBatch}
            isLoader={isBatchLoading}
            label="Select Batch/Section"
            placeHolder="Enter or select batch"
            options={batch}
            isClear={selectedBatch?.id ? true : false}
            total={batchTotal}
            onSelect={(option: any) => {
              setSelectedBatch(option)
            }}
            fullWidth
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SimpleButton
            label={isEdit ? 'Update session' : 'Create Session'}
            clickHandler={() => handleSubmit()}
            disabled={isSubmitted}
          />
        </div>
      </PopUpBox>
    </PopUpContainer>
  )
}
export default MoveToTeachMode
