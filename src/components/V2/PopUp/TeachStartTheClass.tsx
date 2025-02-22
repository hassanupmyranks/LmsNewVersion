import {
  PopUpBox,
  Heading,
  PopUpContainer,
  AlignHeading,
  RemoveIcon
} from './styledComponents'
import SearchableDropdown from '../Form/SearchableDropdown'

import SimpleButton from '../Button/SimpleButton'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'

const TeachStartTheClassPopup = ({
  setPopup,
  sessionNumber,
  chapter,
  batch,
  course,
  subject,
  topic
}: {
  setPopup: (d: boolean) => void
  sessionNumber: number
  chapter: any
  batch: any
  course: any
  subject: any
  topic: any
}) => {
  const history = useHistory()

  console.log(topic, 'topic')
  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <Heading></Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <div style={{ display: 'flex', gap: '10px', padding: '6px' }}>
          <SearchableDropdown
            selectedValue={course}
            isLoader={false}
            label="Select Grade"
            placeHolder="Enter or select Grade"
            options={[]}
            isClear={true}
            onSelect={(selectedItem) => {
              console.log('Selected Grade:', selectedItem)
            }}
            fullWidth
            required
          />
          <SearchableDropdown
            selectedValue={batch}
            isLoader={false}
            label="Select Batch"
            placeHolder="Enter or select batch"
            options={[]}
            isClear={true}
            onSelect={(selectedItem) => {
              console.log('Selected Batch:', selectedItem)
            }}
            fullWidth
            required
          />
        </div>
        <div style={{ width: '50%', padding: '0px 6px' }}>
          <Heading style={{ fontSize: '18px' }}>Session Number</Heading> :{' '}
          <Heading style={{ fontSize: '18px' }}>{sessionNumber | 0}</Heading>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '10px'
          }}
        >
          <Heading style={{ fontSize: '18px' }}>
            {chapter?.label || '0'}
          </Heading>
          <Heading style={{ fontSize: '18px' }}>|</Heading>
          <Heading style={{ fontSize: '18px' }}>Topic Name</Heading>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '10px'
          }}
        >
          <Heading style={{ fontSize: '18px' }}>{subject?.name || ''}</Heading>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SimpleButton
            label="Start The Class"
            clickHandler={() => history.push(ROUTES_V2.FINAL_PAGE_TEACH_MODE)}
            disabled={false}
          />
        </div>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default TeachStartTheClassPopup
