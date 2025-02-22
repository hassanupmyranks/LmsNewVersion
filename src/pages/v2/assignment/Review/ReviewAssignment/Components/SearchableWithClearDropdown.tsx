import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { ReactComponent as DownArrow } from '../../../../../../assets/svg/keyboard_arrow_down.svg'
import { ReactComponent as UpArrow } from '../../../../../../assets/svg/keyboard_arrow_up.svg'
import logo from '../../../../../../assets/Future-logo.png'

import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'
import {
  SelectContainer,
  SelectLabel,
  Required,
  SearchDropdownContainer,
  SearchableInput,
  RefreshIcon,
  Icons,
  SearchableDropdownList,
  SearchableDropdownOption,
  SearchDropdownImage,
  SearchableDropdownHeading,
  SearchableDropdownSubContent
} from '../../../../../../components/V2/Form/styledComponents'
import { SearchableDropdownOptionData } from '../Types'
import { RequiredError } from '../../../../../../components/V2/Form/Input'
import LoadingSpinner from '../../../../../../components/V2/Form/Spinner'

const SearchableDropdownWithClear = ({
  label,
  style,
  options,
  onSelect,
  required,
  fullWidth,
  selectedValue,
  placeHolder,
  defaultValue,
  error,
  isClear,
  isLoading
}: {
  label: string
  required?: boolean
  style?: CSSProperties
  options: SearchableDropdownOptionData[]
  fullWidth?: boolean
  onSelect: (_: SearchableDropdownOptionData) => void
  selectedValue?: SearchableDropdownOptionData
  placeHolder: string
  defaultValue?: string
  error?: string
  isClear?: boolean
  isLoading?: boolean
}) => {
  const [show, setPopup] = useState(false)
  const [searchText, setSearchText] = useState(defaultValue ?? '')
  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => {
    setPopup(false)
  })

  useEffect(() => {
    if (selectedValue?.label) {
      setSearchText(selectedValue?.label)
    } else {
      setSearchText('')
    }
  }, [selectedValue])

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase().includes(searchText?.toLowerCase())
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setPopup(true)
  }
  const clearOptions = {
    id: 0,
    value: '',
    url: '',
    label: ''
  }

  return (
    <SelectContainer style={style} fullWidth={fullWidth}>
      <SelectLabel>
        {label}
        {required ? <Required>*</Required> : ''}
      </SelectLabel>
      <SearchDropdownContainer ref={popupRef} error={error}>
        <SearchableInput
          type="text"
          value={searchText}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          onChange={handleInputChange}
          onMouseDown={() => setPopup(true)}
        ></SearchableInput>
        <Icons
          onClick={() =>
            isClear ? onSelect(clearOptions) : options.length && setPopup(!show)
          }
        >
          {show && <RefreshIcon />}
          {isLoading ? (
            <LoadingSpinner />
          ) : isClear ? (
            <RemoveBtn>Clear</RemoveBtn>
          ) : show ? (
            <UpArrow />
          ) : (
            <DownArrow />
          )}
        </Icons>
        {show && Boolean(filteredOptions.length) && (
          <SearchableDropdownList>
            {filteredOptions.map((option, index) => (
              <SearchableDropdownOption
                key={`${option.label}-${index}`}
                selected={option.id === selectedValue?.id}
                onClick={() => {
                  onSelect(option)
                  setPopup(false)
                  setSearchText(option.label)
                }}
                onChange={handleInputChange}
              >
                {option.url ? (
                  <SearchDropdownImage
                    url={option.url !== '' ? option.url : logo}
                  ></SearchDropdownImage>
                ) : null}
                <div>
                  <SearchableDropdownHeading>
                    {option.label}
                  </SearchableDropdownHeading>

                  <SearchableDropdownSubContent>
                    {option.value}
                  </SearchableDropdownSubContent>
                </div>
              </SearchableDropdownOption>
            ))}
          </SearchableDropdownList>
        )}
      </SearchDropdownContainer>
      {error && <RequiredError>Enter {error}</RequiredError>}
    </SelectContainer>
  )
}

export default SearchableDropdownWithClear

const RemoveBtn = styled.button`
  all: unset;
  background: #fde7e7;
  border-radius: 23px;
  align-items: center;
  text-align: center;
  max-width: 122px;
  padding: 2px 8px;
  color: #cc1818;
  font-size: 14px;
  font-weight: 500;
`
