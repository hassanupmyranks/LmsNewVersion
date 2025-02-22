import { Spinner } from 'react-bootstrap'
import { ButtonV2 } from '../styledComponents'
import {
  AlignHeading,
  RemoveIcon,
  ButtonWrapper,
  PopUpContainer,
  WarningPopUpBox
} from './styledComponents'
import { White } from '../../../const/V2/stylingVariables'
import styled from 'styled-components'

const WarningPopUp = ({
  setIsWarning,
  onDelete,
  text,
  isLoading
}: {
  setIsWarning: (d: boolean) => void
  onDelete: () => void
  text: string
  isLoading?: boolean
}) => {
  return (
    <PopUpContainer>
      <WarningPopUpBox>
        <AlignHeading>
          <div></div>
          <RemoveIcon onClick={() => setIsWarning(false)} />
        </AlignHeading>
        <p>{text}</p>
        <ButtonWrapper>
          <ConfirmButtonV2
            disabled={isLoading}
            onClick={() => !isLoading && onDelete()}
          >
            {isLoading ? (
              <Spinner
                animation={'border'}
                style={{
                  width: '20px',
                  height: '20px',
                  color: `${White}`
                }}
              />
            ) : (
              'Confirm'
            )}
          </ConfirmButtonV2>
          <ButtonV2 onClick={() => setIsWarning(false)}>Cancel</ButtonV2>
        </ButtonWrapper>
      </WarningPopUpBox>
    </PopUpContainer>
  )
}

export default WarningPopUp

export const ConfirmButtonV2 = styled.button<{
  filled?: boolean
  width?: string
  disabled?: boolean
}>`
  all: unset;
  background-color: #d93d3d;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
