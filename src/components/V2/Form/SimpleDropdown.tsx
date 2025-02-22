import { CSSProperties, useRef, useState } from 'react'
import { SmallDropdownOptionData } from './types'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import {
  SelectContainer,
  SelectLabel,
  SmallDownPlaceholderContainer,
  SmallPlaceholder,
  SelectedOption,
  DropdownPopup,
  SmallDropdownOption,
  Required,
  SmallDropdownContainer
} from './styledComponents'
import { RequiredError } from './Input'
import LoadingSpinner from './Spinner'
import { RemoveBtn } from '../styledComponents'

const SimpleDropdown = <T,>({
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
  placeholder: string
  required?: boolean
  style?: CSSProperties
  options: SmallDropdownOptionData<T>[]
  fullWidth?: boolean
  onSelect: (_: SmallDropdownOptionData<T>) => void
  selectedValue?: SmallDropdownOptionData<T>
  error?: string
  onBlur?: () => void
  isLoading?: boolean
  isClear?: boolean
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
        <SmallDropdownContainer ref={popupRef} error={error} onBlur={() => {}}>
          <SmallDownPlaceholderContainer
            onClick={() => options.length && setPopup(true)}
          >
            {(selectedValue?.label ?? '') === '' ? (
              <SmallPlaceholder>{placeholder}</SmallPlaceholder>
            ) : (
              <SelectedOption>{selectedValue?.label ?? ''}</SelectedOption>
            )}
          </SmallDownPlaceholderContainer>
          <div
            style={{ padding: '2px', margin: '2px', cursor: 'pointer' }}
            role="presentation"
            onClick={() => options.length && setPopup(true)}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : isClear ? (
              <RemoveBtn>Clear</RemoveBtn>
            ) : (
              <DownArrow />
            )}
          </div>
          {show && (
            <DropdownPopup>
              {options.map((option, index) => (
                <SmallDropdownOption
                  key={`${option.label}-${index}`}
                  selected={option.id === selectedValue?.id}
                  onClick={() => {
                    onSelect(option)
                    setPopup(false)
                  }}
                >
                  {option.label}
                </SmallDropdownOption>
              ))}
            </DropdownPopup>
          )}
        </SmallDropdownContainer>
        {error && <RequiredError>{error}</RequiredError>}
      </SelectContainer>
    </>
  )
}

export default SimpleDropdown
