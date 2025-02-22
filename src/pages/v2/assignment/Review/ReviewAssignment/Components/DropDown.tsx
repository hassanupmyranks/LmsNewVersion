import { CSSProperties, useRef, useState } from 'react'

import { ReactComponent as DownArrow } from './../../../../../../assets/svg/keyboard_arrow_down.svg'
import useOnClickOutside from './../../../../../../hooks/useOnClickOutside'
import {
  SelectContainer,
  SelectLabel,
  DropdownContainer,
  PlaceholderContainer,
  SelectedOption,
  DropdownPopup,
  DropdownOption,
  Required,
  ClearButton
} from './styledComponents'
import { DropdownOptionData } from '../Types'

const Dropdown = <T,>({
  label,
  style,
  placeholder,
  options,
  onSelect,
  required,
  fullWidth,
  clearButton,
  setOptions,
  selectedValue
}: {
  label: string
  placeholder: string
  required?: boolean
  clearButton?: boolean
  style?: CSSProperties
  options: DropdownOptionData<T>[]
  fullWidth?: boolean
  setOptions?: any
  onSelect: (_: DropdownOptionData<T>) => void
  selectedValue?: DropdownOptionData<T>
}) => {
  const [show, setPopup] = useState(false)
  console.log(placeholder)
  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  return (
    <>
      <SelectContainer style={style} fullWidth={fullWidth}>
        <SelectLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </SelectLabel>
        <DropdownContainer ref={popupRef}>
          <PlaceholderContainer>
            {/* <Placeholder>{placeholder}</Placeholder> */}
            <SelectedOption>{selectedValue?.label ?? ''}</SelectedOption>
          </PlaceholderContainer>
          {clearButton && (
            <ClearButton onClick={() => setOptions([])}>Clear</ClearButton>
          )}
          <div
            style={{ cursor: 'pointer' }}
            role="presentation"
            onClick={() => options.length && setPopup(true)}
          >
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

export default Dropdown
