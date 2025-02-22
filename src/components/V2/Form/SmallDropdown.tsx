import React, { useState, useRef } from 'react'
import { CSSProperties } from 'styled-components'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  SelectContainer,
  SelectLabel,
  Required,
  SearchDropdownContainer,
  Icons,
  SearchableDropdownList,
  SearchableDropdownOption,
  SearchableDropdownHeading,
  SearchableDropdownSubContent,
  SelectedOption,
  Placeholder
} from './styledComponents'
import { DropdownOptionData } from './types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'

const SmallDropdown = <T,>({
  label,
  style,
  options,
  onSelect,
  required,
  fullWidth,
  selectedValue,
  placeholder,
  isLoading
}: {
  label: string
  required?: boolean
  style?: CSSProperties
  options: DropdownOptionData<T>[]
  fullWidth?: boolean
  onSelect: (_: DropdownOptionData<T>) => void
  selectedValue?: DropdownOptionData<T>
  placeholder: string
  isLoading?: boolean
}) => {
  const [show, setPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(popupRef, () => {
    setPopup(false)
  })
  const [selectedOption, setSelectedOption] = useState<DropdownOptionData<T>>()
  const handleInputChange = () => {
    setPopup(true)
  }

  return (
    <SelectContainer style={style} fullWidth={fullWidth}>
      <SelectLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </SelectLabel>
      <SearchDropdownContainer
        style={{ cursor: 'pointer' }}
        ref={popupRef}
        onClick={() => options.length && setPopup(!show)}
      >
        <SelectedOption style={{ paddingLeft: '12px' }}>
          {selectedOption?.label ?? <Placeholder>{placeholder}</Placeholder>}
        </SelectedOption>
        <Icons>
          {isLoading ? (
            <Spinner
              style={{ width: '24px', height: '24px', color: `${BlueButton}` }}
              animation={'border'}
            />
          ) : (
            <DownArrow />
          )}
        </Icons>
        {show && (
          <SearchableDropdownList>
            {options.map((option, index) => (
              <SearchableDropdownOption
                key={`${option.label}-${index}`}
                selected={option.id === selectedValue?.id}
                onClick={() => {
                  onSelect(option)
                  setSelectedOption(option)
                  setPopup(false)
                }}
                onChange={handleInputChange}
              >
                <div>
                  <SearchableDropdownHeading>
                    {option.label}
                  </SearchableDropdownHeading>
                  <SearchableDropdownSubContent>
                    {/* {option.value} */}
                  </SearchableDropdownSubContent>
                </div>
              </SearchableDropdownOption>
            ))}
          </SearchableDropdownList>
        )}
      </SearchDropdownContainer>
    </SelectContainer>
  )
}

export default SmallDropdown
