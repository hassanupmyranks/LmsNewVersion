import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import { CSSProperties } from 'styled-components'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import { ReactComponent as UpArrow } from '../../../assets/svg/keyboard_arrow_up.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import logo from '../../../assets/Future-logo.png'
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
  SearchableDropdownSubContent,
  InfoIcon,
  Tooltiped
} from './styledComponents'
import { SearchableDropdownOptionData } from './types'
import { RequiredError } from './Input'
import LoadingSpinner from './Spinner'
import { RemoveBtn } from '../styledComponents'
import { White } from '../../../const/V2/stylingVariables'
import debounce from 'lodash/debounce' // You need to install lodash
import { OverlayTrigger } from 'react-bootstrap'
const SearchableDropdown = ({
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
  isLoader,
  isClear,
  popupColour,
  disabled,
  handleScrollInfinite,
  total,
  length,
  toolTipText,
  onChange
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
  isLoader?: boolean
  isClear?: boolean
  popupColour?: boolean
  disabled?: boolean
  handleScrollInfinite?: (d: any, b: any) => void
  total?: number
  length?: number
  toolTipText?: any
  onChange?: (value: string) => void
}) => {
  const [show, setPopup] = useState(false)
  const [searchText, setSearchText] = useState(defaultValue ?? '')
  const popupRef = useRef<HTMLDivElement>(null)
  const containerRef: any = useRef()
  const debouncedScroll = useRef<any>(null)

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
    // onSelect({ id: '', label: '' })
    onChange?.(e.target.value)
    setPopup(true)
  }

  useEffect(() => {
    const container = containerRef.current
    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight
      if (scrollHeight < scrollTop + (clientHeight + 3)) {
        // handleGetQuestions = setTimeout(() => {
        handleScrollInfinite?.(total, length)
      }
    }, 1000)

    if (container) {
      debouncedScroll.current = handleScroll
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        // clearTimeout(handleGetQuestions)
        container.removeEventListener('scroll', handleScroll)
        debouncedScroll.current.cancel() // Cancel any pending debounced calls
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, length])

  return (
    <SelectContainer style={style} fullWidth={fullWidth}>
      <SelectLabel>
        {label}

        {required ? <Required>*</Required> : ''}

        {toolTipText && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltiped id="tooltip-top">{toolTipText}</Tooltiped>}
          >
            <InfoIcon />
          </OverlayTrigger>
        )}
      </SelectLabel>
      <SearchDropdownContainer
        ref={popupRef}
        error={error}
        popupColour={popupColour}
      >
        <SearchableInput
          type="text"
          value={searchText}
          disabled={disabled}
          defaultValue={defaultValue}
          placeholder={placeHolder}
          onChange={handleInputChange}
          // onMouseDown={() => setPopup(true)}
          style={{
            backgroundColor: popupColour ? 'rgba(104, 104, 104, 0.01)' : White
          }}
          onClick={() => options?.length && setPopup(!show)}
        ></SearchableInput>
        <Icons
          onClick={() =>
            isClear
              ? onSelect({ id: String(''), label: '' })
              : options?.length && setPopup(show)
          }
        >
          {show && <RefreshIcon />}
          {isLoader ? (
            <LoadingSpinner />
          ) : isClear ? (
            <RemoveBtn>Clear</RemoveBtn>
          ) : show ? (
            <UpArrow />
          ) : (
            <DownArrow />
          )}
        </Icons>

        {/* {show && Boolean(filteredOptions.length) && ( */}
        <SearchableDropdownList
          style={{
            display: show && Boolean(filteredOptions?.length) ? 'block' : 'none'
          }}
          ref={containerRef}
        >
          {filteredOptions?.map((option, index) => (
            <SearchableDropdownOption
              key={`${option.label}-${index}`}
              selected={option.id === selectedValue?.id}
              onClick={() => {
                onSelect(option)
                setPopup(true)
                setSearchText(option.label)
              }}
              onChange={handleInputChange}
            >
              {options[0].id !== '' && option.url ? (
                <SearchDropdownImage
                  url={option.url !== '' ? option.url : logo}
                ></SearchDropdownImage>
              ) : null}
              <div>
                <SearchableDropdownHeading>
                  {option.label}
                </SearchableDropdownHeading>

                {option.value && (
                  <SearchableDropdownSubContent>
                    {option.value}
                  </SearchableDropdownSubContent>
                )}
              </div>
            </SearchableDropdownOption>
          ))}
        </SearchableDropdownList>
        {/* )} */}
      </SearchDropdownContainer>
      {error && <RequiredError>{error}</RequiredError>}
    </SelectContainer>
  )
}

export default SearchableDropdown
