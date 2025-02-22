import React, { useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as CloseIcon } from '../../../../assets/svg/close-page.svg'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
const MaterialPopup = ({
  child,
  onClick,
  width,
  height
}: {
  child: React.ReactNode
  onClick: () => void
  width?: string
  height?: string
}) => {
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, onClick)
  return (
    <>
      <PopupContainer>
        <PopupContent ref={popupRef} {...{ width, height }}>
          <ClosePopup onClick={() => onClick()} />
          {child}
        </PopupContent>
      </PopupContainer>
    </>
  )
}

export default MaterialPopup

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
`
const PopupContent = styled.div<{
  width?: string
  height?: string
}>`
  width: ${({ width }) => (width ? width : '55%')};
  height: ${({ height }) => (height ? height : '60%')};
  background-color: white;
  border-radius: 24px;
  padding: 16px;
  position: relative;

  @media (max-width: 768px) {
    width: 96% !important;
  }
`
const ClosePopup = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: -15px;
  right: -20px;
  * {
    fill: white;
  }
`
