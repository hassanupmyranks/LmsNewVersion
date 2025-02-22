import styled from 'styled-components'
import {
  Blue,
  CoolGray10,
  CoolGray20,
  Gray,
  White
} from '../../../const/V2/stylingVariables'

export const AllAddCourse2 = styled.div`
  height: 100vh;
  display: flex;
  height: 100%;
  overflow-y: auto;
  width: 35%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`
export const CreateCourseWrapper = styled.div`
  height: 400px;
  width: 100%;
  background-color: ${White};
  border-radius: 1rem;
  padding: 25px;
  border: 1px solid #e3e6e8;

  @media (max-width: 1280px) {
    width: 48%;
    padding: 14px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`
export const ListWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${Blue};
`
export const Heading = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${Blue};
  margin-bottom: 5px;
  width: auto;
`

export const LabelH4 = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${Blue};
  margin-bottom: 15px;
  width: 100%;
  /* border-bottom: 1px solid #3498db; */
`
export const Span = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${Gray};
  margin-bottom: 15px;
`
export const SubjectList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  border-radius: 1rem;
  margin: 10px 20px;
  padding: 14px;
  &:hover {
    box-shadow: 0px 6px 25px rgba(110, 110, 110, 0.1);
  }

  @media (max-width: 768px) {
    margin: 10px 0px;
  }
`
export const SubjectName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
`
export const ListLoader = styled.div`
  margin-top: 10%;
`
export const ListContainer = styled.div`
  padding: 15px;
  background: ${White};
  gap: 10px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  width: 30%;
  border: 1px solid #e3e6e8;
  height: 80vh;
`

export const StudentListWrapper = styled.div`
  overflow-y: auto;
  height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${CoolGray20};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${CoolGray10};
    border-radius: 2px;
  }
`

export const TopicName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Blue};
  padding: 8px;
  width: 95%;
  /* border-bottom: 1px solid #ededed; */
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
  height: 50vh;
`
