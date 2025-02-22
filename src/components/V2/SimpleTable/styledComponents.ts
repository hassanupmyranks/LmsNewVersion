import styled from 'styled-components'
import { CoolGray20, DarkBlue, White } from '../../../const/V2/stylingVariables'
import { ReactComponent as DropDownLogoSVG } from '../../../assets/svg/dropdown-logo.svg'

export const Table = styled.table`
  width: 96%;
  margin: 0px 20px 10px 15px;
  height: auto;
  overflow-y: auto;
`
export const TableHead = styled.thead`
  height: 40px;
  background-color: ${White};
  position: sticky;
  top: -1px;
  z-index: 1;
`
export const Td = styled.td`
  text-align: start;

  @media (max-width: 768px) {
    min-width: 125px;
  }
`
export const InfoHead = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${DarkBlue};
  font-family: 'DM Sans';
  min-width: 100%;
`
export const TableRow = styled.tr`
  height: 70px;

  /* border: 1px solid ${CoolGray20}; */
`
export const Info = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${DarkBlue};
  font-family: 'DM Sans';
  min-width: 100%;
`
export const DropDown = styled(DropDownLogoSVG)`
  height: 6px;
  width: 6px;
  margin: 7px 0px 0px 10px;
`
