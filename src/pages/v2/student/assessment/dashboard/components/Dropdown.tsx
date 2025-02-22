import { ReactComponent as DownArrow } from '../../../../../../assets/svg/grey-down-arrow.svg'
import { Flex } from '../../../../../../components/V2/styledComponents'
import { useRef, useState } from 'react'
import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'
import {
  DropdownContainer,
  PlaceHolder,
  SelectedValue,
  DropdownPopUp,
  DropdownBtn
} from './styledComponents'
const Dropdown = ({
  placeHolder,
  onSelected,
  selectedValue,
  options
}: {
  placeHolder: string
  onSelected: (_: string) => void
  selectedValue: string
  options: string[]
}) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))
  return (
    <div ref={popupRef} style={{ width: '100%' }}>
      <DropdownContainer show={show} onClick={() => setPopup(!show)}>
        <PlaceHolder>{placeHolder}</PlaceHolder>
        <Flex gap="4px" style={{ cursor: 'pointer' }}>
          <SelectedValue>{selectedValue}</SelectedValue>
          <DownArrow style={{ margin: '24px 12px 24px 0' }} />
        </Flex>
      </DropdownContainer>
      <DropdownPopUp show={show}>
        <Flex justifyContent="space-between" gap="8px" wrap={true}>
          {show &&
            options.map((val, index) => {
              return (
                <DropdownBtn
                  key={`${val}_${index}`}
                  isActive={val === selectedValue}
                  onClick={() => {
                    onSelected(val)
                    setPopup(false)
                  }}
                >
                  {val}
                </DropdownBtn>
              )
            })}
        </Flex>
      </DropdownPopUp>
    </div>
  )
}

export default Dropdown
