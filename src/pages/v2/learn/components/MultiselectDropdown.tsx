import { CSSProperties, useEffect, useRef, useState } from 'react'
import { DropdownOptionData } from '../../assignment/Review/ReviewAssignment/Types'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import { Required } from '../../assignment/Review/ReviewAssignment/Components/styledComponents'
import { Spinner } from 'react-bootstrap'
import {
  Blue,
  BlueButton,
  RequiredRed,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../../const/V2/stylingVariables'
import { Flex, RemoveBtn } from '../../../../components/V2/styledComponents'
import styled from 'styled-components'
import { RequiredError } from '../../../../components/V2/Form/Input'
import { ReactComponent as DownArrow } from '../../../../assets/svg/keyboard_arrow_down.svg'
import debounce from 'lodash/debounce' // You need to install lodash
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'

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
  isClear,
  total,
  length,
  handleInfiniteScroll
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
  isClear?: boolean
  total?: number
  length?: number
  handleInfiniteScroll?: (d: any, b: any) => void
}) => {
  const [show, setPopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

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
        handleInfiniteScroll?.(total, length)
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
  }, [total, length, containerRef.current])

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
          onClick={() => options.length >= 1 && setPopup(true)}
          error={!!error}
        >
          <PlaceholderContainer>
            {selectedValue.length ? (
              ''
            ) : (
              <Placeholder>{placeholder}</Placeholder>
            )}
            <SelectedOption>
              {selectedValue.length
                ? selectedValue.map((value) => value.label).join(', ')
                : ''}
            </SelectedOption>
          </PlaceholderContainer>
          <div>
            {isLoading ? (
              <Spinner
                style={{
                  width: '16px',
                  height: '16px',
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
          {/* {!!options?.length && show && ( */}
          <DropdownPopup
            style={{ display: !!options?.length && show ? 'block' : 'none' }}
            ref={containerRef}
          >
            {options?.map((option, index) => {
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
                    </Checkbox>{' '}
                    {option.label}
                  </DropdownOption>{' '}
                </Flex>
              )
            })}
          </DropdownPopup>
          {/* )} */}
        </DropdownContainer>
        {error && <RequiredError>{error}</RequiredError>}
      </SelectContainer>
    </>
  )
}

export default MultiselectDropdown

export const SelectContainer = styled.label<{ fullWidth?: boolean }>`
  display: flex;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  flex-direction: column;
  gap: 6px;
  position: relative;
  margin-top: 6px;

  @media (max-width: 500px) {
    width: 100% !important;
  }
`

export const SelectLabel = styled.p`
  color: ${Blue};

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const DropdownContainer = styled.div<{ error?: boolean }>`
  position: relative;

  padding: 8px 10px 9px 22px;

  border-radius: 15px;
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
export const SmallDropdownContainer = styled.div<{ error?: string }>`
  position: relative;

  padding: 0px 10px 0px 24px;

  border-radius: 20px;
  ${({ error }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : `border: 1px solid ${SecondaryGray};`}

  background: ${White};

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`
export const SmallDownPlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0px;
  cursor: pointer;
`

export const Placeholder = styled.span`
  color: ${SecondaryGray600};
  font-size: 14px;
  letter-spacing: -0.28px;
`

export const SmallPlaceholder = styled.span`
  color: ${SecondaryGray600};
  height: 27px;
  font-size: 14px;
  padding-top: 4px;
  letter-spacing: -0.28px;
`

export const SelectedOption = styled.span`
  color: ${Blue};

  font-size: 18px;
  font-weight: 700;

  letter-spacing: -0.36px;

  max-width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const DropdownPopup = styled.div`
  position: absolute;
  z-index: 9999;
  padding: 10px;
  width: 210px;

  max-height: 300px;

  overflow-y: auto;

  right: 0;
  top: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  gap: 4px;

  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);

  background-color: ${White};
`

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
