import { Table } from 'react-bootstrap'
import styled from 'styled-components'
// import VeiewEyeImage from '../../../assets/images/view-eye-image.jpeg'
import { DarkBlue } from '../../../const/V2/stylingVariables'
import UpGraph from '../../../assets/up.png'
import DownGraph from '../../../assets/decrease.png'
import DefaultImg from '../../../assets/userImage.jpg'
interface TableRowProps {
  isOdd: boolean
}

interface StudentPerformance {
  studentId: string
  studentName: string
  profileImage?: string
  assignmentsSubmitted: number
  totalAssignments: number
  assessmentsSubmitted: number
  totalAssessments: number
  overallAvgPercentage: number | null
}

interface PerformanceTableProps {
  studentPerformanceList: StudentPerformance[]
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  studentPerformanceList
}) => {
  const Header = [
    'Student Name',
    'Assignment Submission',
    'Assesment Submission',
    'Top/Low Percentage'
    // 'Action'
  ]

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr style={{ background: 'red' }}>
            {Header.map((data, index) => (
              <TableHeader key={index}>{data}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentPerformanceList.map((data: any, index: any) => (
            <TableRow key={index} isOdd={index % 2 === 1}>
              <TableData>
                <StudentProfile>
                  {data.profileImage ? (
                    <ProfileImage src={data.profileImage} alt="Profile" />
                  ) : (
                    <ProfileImage src={DefaultImg} alt="Default Profile" />
                  )}
                  {data.studentNameList}
                </StudentProfile>
              </TableData>
              <TableData>{`${data.assignmentsSubmittedList}/${data.totalAssignmentsList}`}</TableData>
              <TableData>{`${data.assessmentsSubmittedList}/${data.totalAssessmentsList}`}</TableData>
              <TableData>
                {data.overallAvgPercentage >= '50' ? (
                  <>
                    <View src={UpGraph} />
                    {data.overallAvgPercentage}%
                  </>
                ) : (
                  <>
                    <View src={DownGraph} />
                    {data.overallAvgPercentage}%
                  </>
                )}
              </TableData>
              {/* <TableData>
                <View src={VeiewEyeImage} />
              </TableData> */}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

export default PerformanceTable

const TableContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: auto;
  background-color: #ffff;
`
const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0 2px;
  thead {
    border-bottom: none;
  }
`
const TableHeader = styled.th`
  width: 200px;
  font-size: 14px;
  color: #1b2559;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
  border: none;
`
const TableRow = styled.tr<TableRowProps>`
  background-color: ${({ isOdd }) => (isOdd ? '#F4F7FE' : '#ffffff')};
  margin-top: 2px;
  margin-bottom: 2px;
`
const TableData = styled.td`
  width: 200px;
  color: ${DarkBlue};
  font-size: 13px;
  font-weight: 300;
  background-color: #f8f9fa;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
  padding: 10px;
`
const View = styled.img`
  width: 20px;
  margin-right: 5px;
`
const StudentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
`

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`
