import {
  PopUpBox,
  Heading,
  PopUpContainer,
  HeadingH2,
  AlignHeading,
  RemoveIcon
} from './styledComponents'
import SimpleButton from '../Button/SimpleButton'
import { useState } from 'react'
import { CustomToastMessage } from '../ToastMessage'
import { updateSessionsAPI } from '../../../helpers/V2/apis'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import { Gray, White } from '../../../const/V2/stylingVariables'
import styled from 'styled-components'

const SessionCompleteConfirmationPopup = ({
  setPopup,
  sessionId,
  setIsCompleted
}: {
  setPopup: (d: boolean) => void
  setIsCompleted: (d: boolean) => void
  sessionId: string
}) => {
  const history = useHistory()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleSubmit = (publish: boolean) => {
    if (sessionId) {
      setIsSubmitted(true)
      updateSessionsAPI(sessionId, { status: 'completed', publish: publish })
        .then((response) => {
          CustomToastMessage(response.message, 'success')

          setIsCompleted(true)
          setPopup(false)

          setTimeout(() => history.push(ROUTES_V2.TEACH_MODE), 1000)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsSubmitted(false))
    }
  }

  return (
    <PopUpContainer>
      <PopUpBox style={{ height: '230px' }}>
        <AlignHeading>
          <div></div>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '6px',
            alignItems: 'center'
          }}
        >
          <HeadingH2>The session has been completed </HeadingH2>
          <Heading> Do you want to publish the study materials?</Heading>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
          <SimpleButton
            label={'Yes'}
            clickHandler={() => handleSubmit(true)}
            disabled={isSubmitted}
          />
          <ButtonV2 onClick={() => handleSubmit(false)} disabled={isSubmitted}>
            Later
          </ButtonV2>
        </div>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default SessionCompleteConfirmationPopup

export const ButtonV2 = styled.button<{
  filled?: boolean
  width?: string
  disabled?: boolean
}>`
  all: unset;
  background-color: ${Gray};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${White};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;

  &:hover {
    color: ${(props) => (props.disabled ? 'rgba(255, 255, 255, 0.5)' : White)};
    background-color: ${(props) => (props.disabled ? Gray : '#2d9de9')};
  }
`
