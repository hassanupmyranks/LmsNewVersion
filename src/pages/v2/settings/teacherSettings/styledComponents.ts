import styled from 'styled-components'
import { LightBlue, White } from '../../../../const/V2/stylingVariables'

export const TableHead = styled.th`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 700;
  font-size: 22px;
`
export const Table = styled.table`
  border-collapse: separate;
  // border-spacing: 0px 20px;
  width: 50%;
`

export const Tr = styled.tr`
  width: 100%;
  // box-shadow: 1px 5px 5px 0px rgba(91, 147, 255, 0.11);
  border-radius: 10px;
  border: 1px solid ${LightBlue};
  background-color: ${White};
  padding: 10px;
`
export const Td = styled.td`
  text-align: start;
  padding: 0.2rem;
  width: 300px;
  // padding-left: 50px;
  // margin-left: 30px;
  padding-left: 0px;
`

export const Checkbox = styled.div`
  // background-color: ${LightBlue};
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
  width: fit-content;
`
export const FieldLabel = styled.div`
  color: #1b2559;
  font-family: 'DM Sans';
  font-weight: 600;
  font-size: 16px;
`
