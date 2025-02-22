import styled from 'styled-components'
import { Blue, SecondaryGray600 } from '../../../../const/V2/stylingVariables'

export const Thead = styled.thead`
  font-size: 14px;
  font-weight: 500;
  opacity: 0.7;
  border: 1px solid #e9edf7;
  color: ${SecondaryGray600};
`

export const Table = styled.table`
  padding-left: 10px;
  padding-right: 42px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 20px;
`

export const P = styled.p`
  cursor: pointer;
`
export const Tr = styled.tr`
  width: 100%;
  box-shadow: 1px 17px 44px 0px rgba(91, 147, 255, 0.11);
  border-radius: 10px;
`

export const Th = styled.th`
  text-align: start;
  min-width: 50px;
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
  width: 7rem;
`
