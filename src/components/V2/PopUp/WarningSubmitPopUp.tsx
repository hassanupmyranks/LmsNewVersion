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
import React from 'react'

const WarningSubmitPopUp = ({
  setIsWarning,
  onClick,
  text,
  isLoading
}: {
  setIsWarning: (d: boolean) => void
  onClick: () => void
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
          {/* {isLoading ? (
            <Spinner
              animation={'border'}
              style={{
                width: '20px',
                height: '20px',
                color: `${White}`,
              }}
            />
          ) : ( */}
          <ConfirmButtonV2 onClick={() => !isLoading && onClick()}>
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
              'Yes'
            )}
          </ConfirmButtonV2>
          {/* )} */}
          <ButtonV2 onClick={() => setIsWarning(false)}>Continue</ButtonV2>
        </ButtonWrapper>
      </WarningPopUpBox>
    </PopUpContainer>
  )
}

export default WarningSubmitPopUp

export const ConfirmButtonV2 = styled.button<{
  filled?: boolean
  width?: string
  disabled?: boolean
}>`
  all: unset;
  width: 51px;
  background-color: #d93d3d;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
