import styled from 'styled-components'
import {
  Blue,
  PrimaryBlue,
  SecondaryGray,
  SecondaryGray600,
  White
} from '../../../../../../const/V2/stylingVariables'
export const FormContainerV2 = styled.div`
  padding: 30px;
  border-radius: 20px;
  background: ${White};
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 36px;
`

export const HeaderTitleContainer = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  background-color: ${White};
  border-radius: 20px;
  // position: sticky;
  // top: 0px;
  gap: 10px;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: start;
  }
`
export const HeaderTitle = styled.div<{
  active?: boolean
}>`
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  background: ${White};
  color: ${(props) => (props.active ? PrimaryBlue : SecondaryGray600)};
  line-height: 32px;
  // margin-left: 10px;

  @media (max-width: 580px) {
    margin: 0px !important;
  }

  & svg {
    margin-right: 10px;
  }
`
export const OrSymbole = styled.div`
  width: 2px;
  height: 36px;
  border-radius: 25px;
  margin-left: 15px;
  background: ${SecondaryGray600};
`

export const FilterContainer = styled.div`
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: white;
  padding: 0 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${White};
  // position: fixed;
  top: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`
export const MyContainer = styled.div`
  background-color: ${White};
  border-radius: 20px;
  height: 100%;
  overflow-y: auto;
`

export const SelectContainer = styled.label<{ fullWidth?: boolean }>`
  display: flex;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  flex-direction: column;
  gap: 8px;
`
export const Required = styled.span`
  color: ${PrimaryBlue};
`

export const SelectLabel = styled.p`
  color: ${Blue};

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.28px;
`

export const DropdownContainer = styled.div`
  position: relative;
  width: 210px;
  padding: 10px;
  // z-index: 111111;
  border-radius: 20px;
  border: 1px solid ${SecondaryGray};

  background: ${White};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Placeholder = styled.span`
  color: ${SecondaryGray600};

  font-size: 14px;

  letter-spacing: -0.28px;
`

export const SelectedOption = styled.span`
  color: ${Blue};

  font-size: 18px;
  font-weight: 700;

  letter-spacing: -0.36px;

  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const DropdownPopup = styled.div`
  position: absolute;
  z-index: 999;
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
export const DropdownOption = styled.div<{ selected?: boolean }>`
  all: unset;

  cursor: pointer;
  display: block;

  padding: 10px;
  border-radius: 5px;

  color: ${PrimaryBlue};
  ${({ selected }) => selected && 'background-color: rgba(25, 123, 189, 0.05);'}

  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};

  &:hover {
    background-color: rgba(25, 123, 189, 0.05);
  }
`
export const ActionButton = styled.button<{ color?: string }>`
  cursor: pointer;
  width: 100px;
  padding: 10px 0px;
  border-radius: 10px;

  background-color: ${({ color }) => color};
  color: ${White};
  border: 0;
  font-size: 14px;
  font-weight: 700;
`
export const ClearButton = styled.button<{ color?: string }>`
  cursor: pointer;
  // width: 100px;
  padding: 10px;
  border-radius: 10px;

  background-color: ${({ color }) => color};
  color: ${White};
  border: 0;
  font-size: 14px;
  font-weight: 700;
`

export const DateFilterButton = styled.button<{ active?: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.active ? White : '#1376B9')};
  border: 0;
  font-size: 14px;
  padding: 4px 18px;
  border-radius: 30px;
  background-color: ${(props) => (props.active ? '#1376B9' : '#F4F7FE')};
`
