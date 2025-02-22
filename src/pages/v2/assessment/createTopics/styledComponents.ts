import styled from 'styled-components'
import { Blue, White } from '../../../../const/V2/stylingVariables'

export const AllAddCourse2 = styled.div`
  height: 100vh;
  display: flex;
  margin: 10px 15px 0px 15px;
  /* height: 100%; */
  overflow-y: auto;
  width: 40%;

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 10px;
    width: 90%;
  }
`
export const CreateCourseWrapper = styled.div`
  height: fit-content;
  width: 100%;
  background-color: ${White};
  border-radius: 1rem;
  padding: 25px;

  @media (max-width: 1280px) {
    width: 48%;
    padding: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${Blue};
  margin-bottom: 15px;
`
export const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Table = styled.table`
  width: 100%;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
`

export const TableHead = styled.thead`
  background-color: #f4f4f4;
`

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9; /* Stripe effect */
  }
`

export const TableHeader = styled.th`
  color: black;
  text-align: center;
  font-size: 20px;
  border-bottom: none;
`

export const TableCell = styled.td`
  text-align: center;
  font-size: 16px;
`

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  height: 100%;
  overflow: auto;
  border-radius: 20px;
`
