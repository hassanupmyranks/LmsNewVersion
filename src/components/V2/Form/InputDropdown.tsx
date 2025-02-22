import { useRef, useState } from 'react'
import { DropdownProps } from './types'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  SelectContainer,
  SelectLabel,
  DropdownContainer,
  PlaceholderContainer,
  Placeholder,
  DropdownPopup,
  DropdownOption,
  Required
} from './styledComponents'
import styled from 'styled-components'

const InputDropdown = <T,>({
  label,
  style,
  placeholder,
  options,
  onSelect,
  required,
  fullWidth,
  selectedValue
}: DropdownProps<T>) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  return (
    <>
      <SelectContainer
        style={style}
        fullWidth={fullWidth}
        onClick={() => options.length && setPopup(!show)}
      >
        <SelectLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </SelectLabel>
        <DropdownContainer ref={popupRef}>
          <PlaceholderContainer>
            <SelectedOption>
              {selectedValue?.label ?? <Placeholder>{placeholder}</Placeholder>}
            </SelectedOption>
          </PlaceholderContainer>
          <div style={{ cursor: 'pointer' }} role="presentation">
            <DownArrow />
          </div>
          {show && (
            <DropdownPopup>
              {options.map((option, index) => (
                <DropdownOption
                  key={`${option.label}-${index}`}
                  selected={option.id === selectedValue?.id}
                  onClick={() => {
                    onSelect(option)
                    setPopup(false)
                  }}
                >
                  {option.label}
                </DropdownOption>
              ))}
            </DropdownPopup>
          )}
        </DropdownContainer>
      </SelectContainer>
    </>
  )
}

export default InputDropdown

const SelectedOption = styled.span`
  color: #2b3674;
  font-size: 14px;
  letter-spacing: -0.28px;
`
