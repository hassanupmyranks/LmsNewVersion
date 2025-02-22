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
import { Flex } from '../styledComponents'
import styled from 'styled-components'

const MultiselectDropdownSmall = <T,>({
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
  update
}: {
  label: string
  placeholder: string
  required?: boolean
  style?: CSSProperties
  options: DropdownOptionData<T>[]
  fullWidth?: boolean
  onSelect: (_: DropdownOptionData<T>[]) => void
  selectedValue: DropdownOptionData<T>[]
  error?: string
  isLoading?: boolean
  update?: boolean
}) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  return (
    <>
      <SelectContainer style={style} fullWidth={fullWidth}>
        <SelectLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </SelectLabel>
        <DropdownContainer
          update={update}
          ref={popupRef}
          style={{ cursor: 'pointer', padding: '1px 2px 1px 20px' }}
          role="presentation"
          onClick={() => options.length && setPopup(true)}
          error={!!error}
        >
          <PlaceholderContainer>
            {selectedValue.length ? (
              <SelectedOption>
                {selectedValue.length
                  ? selectedValue.map((value) => value.label).join(', ')
                  : ''}
              </SelectedOption>
            ) : (
              <Placeholder>{placeholder}</Placeholder>
            )}
          </PlaceholderContainer>
          <div
            style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}
            role="presentation"
            onClick={() => options.length && setPopup(true)}
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
            ) : (
              <DownArrow />
            )}
          </div>
          {!!options.length && show && (
            <DropdownPopup>
              {options.map((option, index) => {
                const isSelected = selectedValue.some(
                  (value) => value.id === option.id
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

export default MultiselectDropdownSmall

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
