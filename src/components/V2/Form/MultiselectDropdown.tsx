import { CSSProperties, useRef, useState } from 'react'
import { DropdownOptionData } from './types'
import { ReactComponent as CheckedSvg } from '../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../assets/svg/un-check-icon.svg'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  SelectContainer,
  SelectLabel,
  DropdownContainer,
  PlaceholderContainer,
  Placeholder,
  SelectedOption,
  DropdownPopup,
  Required
} from './styledComponents'
import { RequiredError } from './Input'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { Flex, RemoveBtn } from '../styledComponents'
import React from 'react'
import styled from 'styled-components'

const MultiselectDropdown = <T,>({
  label,
  style,
  placeholder,
  options,
  onSelect,
  required,
  fullWidth,
  selectedValue,
  error,
  isLoading,
  isClear
}: {
  label: string
  placeholder?: string
  required?: boolean
  style?: CSSProperties
  options: DropdownOptionData<T>[]
  fullWidth?: boolean
  onSelect: (_: DropdownOptionData<T>[]) => void
  selectedValue: DropdownOptionData<T>[]
  error?: string
  isLoading?: boolean
  isClear?: boolean
}) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  function stringifyJSXChildren(children: React.ReactNode): string {
    if (typeof children === 'string' || typeof children === 'number') {
      return children?.toString() // If children is string or number, return it as is
    } else if (Array?.isArray(children)) {
      // If children is an array, recursively stringify each element
      return children?.map((child) => stringifyJSXChildren(child))?.join('')
    } else if (React.isValidElement(children)) {
      // If children is a JSX element, stringify its children recursively
      return stringifyJSXChildren(children?.props?.children)
    } else {
      return '' // For other types, return an empty string
    }
  }

  return (
    <>
      <SelectContainer style={style} fullWidth={fullWidth}>
        <SelectLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </SelectLabel>
        <DropdownContainer
          ref={popupRef}
          style={{ cursor: 'pointer' }}
          role="presentation"
          onClick={() => options.length > 0 && setPopup(true)}
          error={!!error}
        >
          <PlaceholderContainer>
            {selectedValue.length <= 0 && placeholder && (
              <Placeholder>{placeholder}</Placeholder>
            )}
            <SelectedOption>
              {/* {selectedValue.length
                ? selectedValue.map((value) => value.label).join(', ')
                : ''} */}
              {selectedValue.length > 0
                ? selectedValue
                    ?.map((value) => {
                      // Check if value.label is JSX
                      if (
                        typeof value?.label === 'object' &&
                        value?.label !== null &&
                        typeof value?.label !== 'string' &&
                        !Array.isArray(value.label)
                      ) {
                        // If it's JSX, stringify its children
                        return stringifyJSXChildren(value?.label)
                      } else {
                        // Otherwise, return it as is
                        return value?.label
                      }
                    })
                    .join(', ')
                : ''}
            </SelectedOption>
          </PlaceholderContainer>
          <div
            style={{ padding: '0px', cursor: 'pointer' }}
            // role="presentation"
            // onClick={() => options.length && setPopup(true)}
          >
            {isLoading ? (
              <Spinner
                style={{
                  width: '24px',
                  height: '24px',
                  color: `${BlueButton}`
                }}
                animation={'border'}
              />
            ) : isClear ? (
              <RemoveBtn
                onClick={() => {
                  setPopup(false)
                  onSelect([])
                }}
              >
                Clear
              </RemoveBtn>
            ) : (
              <DownArrow />
            )}
          </div>
          {!!options.length && show && (
            <DropdownPopup>
              {options.map((option, index) => {
                const isSelected = selectedValue?.some(
                  (value) => value?.id === option?.id
                )

                return (
                  <Flex
                    key={`${option.label}-${index}`}
                    style={{ width: '100%' }}
                  >
                    <DropdownOption
                      key={`${option.label}-${index}`}
                      selected={isSelected}
                      onClick={() => {
                        let newlySelectedValue = [...selectedValue]
                        if (options.length === 1) {
                          setPopup(false)
                        }
                        if (isSelected) {
                          newlySelectedValue.splice(
                            newlySelectedValue.findIndex(
                              (item) => item.id === option.id
                            ),
                            1
                          )
                        } else {
                          newlySelectedValue.push(option)
                        }

                        onSelect(newlySelectedValue)
                      }}
                    >
                      <Checkbox>
                        {isSelected ? <CheckedSvg /> : <UnCheckedSvg />}
                      </Checkbox>
                      {option.label}
                    </DropdownOption>
                  </Flex>
                )
              })}
            </DropdownPopup>
          )}
        </DropdownContainer>
        {error && <RequiredError>{error}</RequiredError>}
      </SelectContainer>
    </>
  )
}

export default MultiselectDropdown

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
`
const DropdownOption = styled.div<{ selected?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  padding: 10px 0px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 700;
  flex-grow: 1;
  gap: 5px;
`
