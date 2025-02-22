import { ReactComponent as RefreshIconSvg } from '../../../assets/svg/refresh.svg'
import { ReactComponent as InfoIconSvg } from '../../../assets/svg/info.svg'
import styled from 'styled-components'
import {
  PrimaryBlue,
  Blue,
  SecondaryGray,
  White,
  SecondaryGray600,
  CoolGray60,
  RequiredRed
} from '../../../const/V2/stylingVariables'
import { SearchDropdownImageProps } from '../../../utils/types'
import { Tooltip } from 'react-bootstrap'

export const Required = styled.span`
  color: ${PrimaryBlue};
`

export const FormContainerV2 = styled.div`
  padding: 12px 25px;
  border-radius: 20px;
  background: ${White};

  display: flex;
  height: 100%;
  flex-direction: column;

  overflow-y: auto;

  gap: 5px;

  @media (max-width: 600px) {
    padding: 8px 8px;
    padding-bottom: 90px;
  }
`

// ----------------------- Input Number --------------- //

export const Label = styled.span`
  user-select: none;

  color: ${Blue};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  gap: 8px;
`

export const InputContainer = styled.div`
  display: flex;
  gap: 1px;
  align-items: center;
`

// ------------------------ Dropdown ----------------------------//

export const SelectContainer = styled.label<{ fullWidth?: boolean }>`
  display: flex;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  flex-direction: column;
  position: relative;
  // margin-top: 6px;

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

export const DropdownContainer = styled.div<{
  update?: boolean
  error?: boolean
}>`
  position: relative;
  padding: 10px 10px 10px 20px;
  border-radius: 15px;
  border: 1px solid
    ${({ error, update }) =>
      error ? RequiredRed : update ? '#0bed07' : SecondaryGray};

  background: ${White};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SmallDropdownContainer = styled.div<{ error?: string }>`
  position: relative;

  padding: 0px 10px 0px 14px;

  border-radius: 15px;
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
  width: 90%;
  padding: 9px 0px;
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 520px) {
    font-size: 12px;
  }
`

export const SelectedOption = styled.span`
  color: ${Blue};

  font-size: 15px;
  font-weight: 700;

  letter-spacing: -0.36px;

  max-width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const DropdownPopup = styled.div`
  position: absolute;
  z-index: 999;
  padding: 10px;
  max-width: 248px;

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
export const DropdownPopupDuration = styled.div`
  position: relative;
  z-index: 999;
  padding: 10px;
  width: 336px;

  max-height: 136px;

  overflow-y: auto;

  right: 0;
  top: calc(100% + 6px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  border-radius: 10px;
`
export const DropdownOptionDuration = styled.div<{ selected?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  padding: 10px 25px;
  border-radius: 15px;
  ${({ selected }) => selected && `background-color:${White};`}
  ${({ selected }) =>
    selected ? `color: ${PrimaryBlue};` : `color: ${White};`}

  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};

  &:hover {
    background-color: ${PrimaryBlue};
    color: ${White};
  }
`
export const DropdownOption = styled.div<{ selected?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  ${({ selected }) => selected && `background-color:${PrimaryBlue};`}
  ${({ selected }) =>
    selected ? `color: ${White};` : `color: ${PrimaryBlue};`}

  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
  justify-content: space-between;

  &:hover {
    background-color: ${PrimaryBlue};
    color: ${White};
  }
`
// ------------------------Searchable Dropdown ----------------------------//

export const SearchDropdownContainer = styled.div<{
  error?: string
  popupColour?: boolean
}>`
  position: relative;
  border-radius: 15px;
  ${({ error, popupColour }) =>
    error
      ? `border: 1px solid ${RequiredRed};`
      : popupColour
      ? `border: 1px solid ' rgba(104, 104, 104, 0.01)';`
      : `border: 1px solid ${SecondaryGray};`}

  ${({ popupColour }) =>
    popupColour
      ? `background: ' rgba(104, 104, 104, 0.1)';`
      : `background:  ${White};`}
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SearchableInput = styled.input`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.36px;
  width: 100%;
  max-width: 270px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 20px;
  border: none;
  border-color: ${White};
  border-bottom: '1px solid white';
  outline: none;
  &::placeholder {
    color: ${SecondaryGray600};
    font-size: 14px;
    font-weight: 400;
  }
`
export const RefreshIcon = styled(RefreshIconSvg)`
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin-right: 3px;
`
export const InfoIcon = styled(InfoIconSvg)`
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin-left: 3px;
`
export const Tooltiped = styled(Tooltip)`
  color: ${PrimaryBlue};
`
export const Icons = styled.div`
  margin: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`
export const SearchableDropdownList = styled.div`
  position: absolute;
  z-index: 1000;
  padding: 10px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 5px;
  }
  right: 0;
  top: calc(100% + 6px);
  display: flex;
  flex-direction: column;
  gap: 4px;

  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);

  background-color: ${White};
`
export const SearchableDropdownOption = styled.div<{ selected?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  padding: 10px;
  border-radius: 12px;
  color: ${PrimaryBlue};
  z-index: 9999999;
  ${({ selected }) => selected && 'background-color: rgba(25, 123, 189, 0.05);'}
  &:hover {
    background-color: rgba(25, 123, 189, 0.1);
  }
`
export const SearchableDropdownHeading = styled.div`
  color: ${Blue};
  font-size: 14px;
  font-weight: 700;
`
export const SearchDropdownImage = styled.div<SearchDropdownImageProps>`
  height: 40px;
  width: 40px;
  background-image: ${(props) => (props.url ? `url(${props.url})` : 'none')};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  margin-right: 10px;
`
export const SearchableDropdownSubContent = styled.div`
  font-size: 10px;
  font-weight: 350;
  color: ${CoolGray60};
`
export const SmallDropdownOption = styled.div<{ selected?: boolean }>`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 1rem;
  color: ${Blue};
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
  &:hover {
    background-color: rgba(25, 123, 189, 0.05);
  }
`
