import styled from 'styled-components'
import { Blue, White } from '../../../../const/V2/stylingVariables'

export const Thead = styled.thead`
  font-size: 14px;
  font-weight: 500;
  // border: 1px solid #e9edf7;
  color: rgba(3, 2, 41, 0.7);
  background-color: ${White};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  height: 57px;
`

export const Table = styled.table`
  padding-left: 10px;
  // padding-right: 42px;
  width: 100%;
  // border-collapse: separate;
  // border-spacing: 0px 20px;
`

export const P = styled.p`
  cursor: pointer;
`
export const Tr = styled.tr`
  width: 100%;
  box-shadow: 1px 17px 44px 0px rgba(91, 147, 255, 0.11);
  border-radius: 10px;
  background-color: ${White};
  padding: 10px;
`

export const Th = styled.th`
  text-align: start;
  min-width: 70px;
  color: #030229;
  &:first-child {
    padding-left: 0px;
  }
  &:last-child {
    padding-right: 43px;
  }
`
export const Td = styled.td`
  text-align: start;
  padding: 0.8rem;
  padding-left: 0px;
`

export const Tbody = styled.tbody`
  color: ${Blue};
  font-weight: 700;
  font-size: 14px;
`

export const PublishBtn = styled.button`
  border-radius: 33px;
  background: rgba(1, 181, 116, 0.1);
  outline: none;
  border: none;
  color: #01b574;
  padding: 0.3rem 1.5rem;
  width: auto;
`
export const FlexLocal = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 800px) {
    display: block;
  }
`
