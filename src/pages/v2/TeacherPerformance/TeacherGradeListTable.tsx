import styled from 'styled-components'
import { Blue } from '../../../const/V2/stylingVariables'

const TeacherGradeTable = ({
  courses,
  batches
}: {
  courses: any[]
  batches: any[]
}) => {
  return (
    <TableContainer>
      {/* <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <PercentageLable>Date: {todayDate}</PercentageLable>
      </div> */}

      <StyledTable>
        <tbody>
          <tr>
            <StyledTh rowSpan={1}>Grade</StyledTh>
            {courses &&
              courses.length &&
              courses.map((course: any, ind: number) => (
                <StyledTh key={`key_${ind}`} colSpan={course?.batchesLength}>
                  {course?.courseName}
                </StyledTh>
              ))}

            {/* <StyledTh colSpan={3}>7</StyledTh>
            <StyledTh colSpan={2}>8</StyledTh> */}
          </tr>
          <tr>
            <StyledTh rowSpan={1}>Section</StyledTh>
            {batches &&
              batches.length &&
              batches.map((batch: any, ind: number) => (
                <StyledTd key={`key_${ind}`}>{batch?.batchName}</StyledTd>
              ))}

            {/* <StyledTd>6H</StyledTd>
            <StyledTd>7A</StyledTd>
            <StyledTd>7B</StyledTd>
            <StyledTd>7C</StyledTd>
            <StyledTd>8A</StyledTd>
            <StyledTd>8C</StyledTd> */}
          </tr>
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}
export default TeacherGradeTable
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 150px;
  overflow: auto;
  background-color: #ffff;
  gap: 10px;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 70%;
`

const StyledTh = styled.th`
  border: 2px solid #e6eaeb;
  padding: 10px;
  text-align: center;
  color: ${Blue};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.28px;
`

const StyledTd = styled.td`
  border: 2px solid #e6eaeb;
  padding: 10px;
  text-align: center;
  color: ${Blue};
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.28px;
`
