import { useState, useRef, useEffect } from 'react'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import { PopupMenuProps } from '../../../utils/types'
import { Flex } from '../styledComponents'
import styled from 'styled-components'
import { Blue, PrimaryBlue, White } from '../../../const/V2/stylingVariables'
import { ReactComponent as ThreeDotIcon } from '../../../assets/svg/three-dot.svg'

const PopupMenu = ({
  options,
  rotate,
  fill,
  id,
  onShow
}: {
  options: PopupMenuProps[]
  fill?: string
  rotate?: string
  id?: string | number | any
  onShow?: (isShow: boolean) => void
  ref?: any
}) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  useEffect(() => {
    if (onShow && show === true) {
      onShow(show)
    }
  }, [show, onShow])

  useEffect(() => {
    if (show && popupRef.current) {
      popupRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }, [show])
  return (
    <DropdownContainer>
      <div
        style={{ cursor: 'pointer' }}
        role="presentation"
        onClick={() => setPopup(!show)}
      >
        <TestComp rotate={rotate} fill={fill} />
      </div>
      {show && (
        <DropdownPopup ref={popupRef}>
          {options.map((option, index) => (
            <DropdownOption
              key={`${option.label}--${index}`}
              selected={option.label}
              onClick={() => (option.disabled ? '' : option.onClick(id))}
              disabled={option.disabled}
            >
              <Flex gap="6px">
                {option.Icon}
                {option.label}
              </Flex>
            </DropdownOption>
          ))}
        </DropdownPopup>
      )}
    </DropdownContainer>
  )
}

export default PopupMenu

const TestComp = styled(ThreeDotIcon)<{
  fill?: string
  rotate?: string
}>`
  & * {
    fill: ${({ fill }) => fill};
  }
  rotate: ${({ rotate }) => rotate};
`

export const DropdownContainer = styled.div`
  position: relative;
  background: ${White};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DropdownPopup = styled.div`
  position: absolute;
  z-index: 998;
  padding: 10px;
  width: 140px;
  overflow-y: auto;
  top: calc(100% + 6px);
  display: flex;
  right: 18px;
  flex-direction: column;
  gap: 7px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  background-color: ${White};
`
export const DropdownOption = styled.div<{
  selected?: string
  disabled?: boolean
}>`
  all: unset;

  display: block;
  padding: 10px;
  border-radius: 5px;
  ${({ disabled }) =>
    disabled ? `opacity: 0.2; cursor: default;` : 'cursor: pointer;'};
  ${({ selected }): any => {
    switch (selected) {
      case 'Edit': {
        return 'color:#5B93FF; background-color:rgba(91, 147, 255, 0.05);'
      }
      case 'Delete': {
        return 'color:#E71D36; background-color:rgba(231, 29, 54, 0.05); '
      }
      case 'Re-Assign': {
        return 'color:#FF8F6B; background-color:rgba(255, 143, 107, 0.05); '
      }
      case 'Preview & Download': {
        return `color:${PrimaryBlue};background-color:rgba(25, 123, 189, 0.05); `
      }
      default: {
        return `color:${Blue}; background-color:rgba(72, 45, 233, 0.05);`
      }
    }
  }}
  font-size: 11px;
  font-weight: 500;
`
