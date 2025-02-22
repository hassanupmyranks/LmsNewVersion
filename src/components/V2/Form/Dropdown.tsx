import { useEffect, useRef, useState } from 'react'
import { DropdownProps } from './types'
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
  DropdownOption,
  Required,
  DropdownPopupDuration,
  DropdownOptionDuration
} from './styledComponents'
import { RequiredError } from './Input'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import debounce from 'lodash/debounce' // You need to install lodash

const Dropdown = <T,>({
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
  total,
  length,
  handleScrollInfinite
}: DropdownProps<T>) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLLabelElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))
  const containerRef: any = useRef()
  const debouncedScroll = useRef<any>(null)

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
    <>
      <SelectContainer ref={popupRef} style={style} fullWidth={fullWidth}>
        <SelectLabel>
          {label}
          {required ? <Required>*</Required> : ''}
        </SelectLabel>
        <DropdownContainer
          style={{ cursor: 'pointer' }}
          role="presentation"
          onClick={() => options.length && setPopup(true)}
          error={!!error}
        >
          <PlaceholderContainer>
            <Placeholder>{placeholder}</Placeholder>
            <SelectedOption>{selectedValue?.label ?? ''}</SelectedOption>
          </PlaceholderContainer>
          <div
            style={{ padding: '10px', cursor: 'pointer' }}
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
        </DropdownContainer>
        {error && <RequiredError>{error}</RequiredError>}
        {show && label === 'Select Duration' && (
          <DropdownPopupDuration>
            {options.map((option, index) => (
              <DropdownOptionDuration
                key={`${option.label}-${index}`}
                selected={option.id === selectedValue?.id}
                onClick={() => {
                  onSelect(option)
                  setPopup(false)
                }}
              >
                {option.label}
              </DropdownOptionDuration>
            ))}
          </DropdownPopupDuration>
        )}
        {/* {show && label !== 'Select Duration' && ( */}
        <DropdownPopup
          style={{
            display: show && label !== 'Select Duration' ? 'block' : 'none'
          }}
          ref={containerRef}
        >
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
        {/* )} */}
      </SelectContainer>
    </>
  )
}

export default Dropdown
