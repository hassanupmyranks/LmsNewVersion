import { CSSProperties, useRef, useState } from 'react'
import { DropdownOptionData } from './types'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  SelectLabel,
  PlaceholderContainer,
  Placeholder,
  SelectedOption,
  DropdownPopup,
  DropdownOption,
  Required
} from './styledComponents'
import { RequiredError } from './Input'
import { Spinner } from 'react-bootstrap'
import {
  BlueButton,
  RequiredRed,
  SecondaryGray,
  White
} from '../../../const/V2/stylingVariables'
import styled from 'styled-components'

const Dropdownsmall = <T,>({
  label,
  style,
  placeholder,
  options,
  onSelect,
  required,
  fullWidth,
  selectedValue,
  error,
  isLoading
}: {
  label: string
  placeholder: string
  required?: boolean
  style?: CSSProperties
  options: DropdownOptionData<T>[]
  fullWidth?: boolean
  onSelect: (_: DropdownOptionData<T>) => void
  selectedValue?: DropdownOptionData<T>
  error?: string
  isLoading?: boolean
}) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLLabelElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  return (
    <>
      <SelectContainer ref={popupRef} style={style} fullWidth={fullWidth}>
        <SelectLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </SelectLabel>
        <DropdownContainersmall
          style={{ cursor: 'pointer' }}
          role="presentation"
          onClick={() => options.length && setPopup(true)}
          error={!!error}
        >
          <PlaceholderContainer>
            {selectedValue?.label ? (
              <SelectedOption>{selectedValue?.label ?? ''}</SelectedOption>
            ) : (
              <Placeholder>{placeholder}</Placeholder>
            )}
          </PlaceholderContainer>
          <div
            style={{ cursor: 'pointer', margin: '0px 10px' }}
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
        </DropdownContainersmall>
        {error && <RequiredError>{error}</RequiredError>}
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
      </SelectContainer>
    </>
  )
}

export default Dropdownsmall

export const DropdownContainersmall = styled.div<{ error?: boolean }>`
  position: relative;
  padding: 15px 5px 15px 15px;
  border-radius: 20px;
  border: 1px solid ${({ error }) => (error ? RequiredRed : SecondaryGray)};

  background: ${White};

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}
`
export const SelectContainer = styled.label<{ fullWidth?: boolean }>`
  display: flex;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  flex-direction: column;
  gap: 6px;
  position: relative;
`
