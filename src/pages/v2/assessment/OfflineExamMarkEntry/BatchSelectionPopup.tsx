import {
  AlignHeading,
  PopUpBox,
  PopUpContainer,
  RemoveIcon
} from '../../../../components/V2/PopUp/styledComponents'
import { Heading } from './styledComponent'
import ViewEyeButton from '../../../../components/V2/ViewEyeButton'
import ROUTES_V2 from '../../../../const/V2/routes'
import { useHistory } from 'react-router-dom'

const BatchSelectionPopup = ({
  setPopup,
  reassignData,
  testId
}: {
  setPopup: (d: boolean) => void
  reassignData?: any
  testId: string
}) => {
  const history = useHistory()

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Batches</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <div
          style={{
            margin: '15px',
            display: 'flex',
            gap: '10xp',
            flexDirection: 'column'
          }}
        >
          {reassignData?.batch_details &&
            reassignData?.batch_details.length > 0 &&
            reassignData?.batch_details.map((batch: any, ind: number) => (
              <div
                key={`key_${ind}`}
                style={{
                  display: 'flex',
                  gap: '10xp',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>{batch.batch_name}</div>
                <ViewEyeButton
                  clickHandler={() =>
                    history.push(
                      `${ROUTES_V2.EXAM_MARK_ENTRY}/${testId}/${batch.batch_id}`
                    )
                  }
                  disabled={false}
                />
              </div>
            ))}
        </div>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default BatchSelectionPopup
