import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import { DarkBlue } from '../../../const/V2/stylingVariables'
import { useEffect, useState } from 'react'
interface TableRowProps {
  isOdd: boolean
}

const MissedAessionsTable = ({
  yearlyBatchWiseMissedSessions
}: {
  yearlyBatchWiseMissedSessions: any
}) => {
  const [tableData, setTableData] = useState([])

  const Header = [
    'Section',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  // const Tabledata = [
  //   {
  //     SectionName: '6A',
  //     Data: ['10', '0', '2', '5', '8', '7', '4', '5', '2', '4', '5', '4']
  //   },
  //   {
  //     SectionName: '6C',
  //     Data: ['10', '0', '2', '5', '8', '7', '4', '5', '2', '4', '5', '4']
  //   },
  //   {
  //     SectionName: '6G',
  //     Data: ['10', '0', '2', '5', '8', '7', '4', '5', '2', '4', '5', '4']
  //   },
  //   {
  //     SectionName: '7A',
  //     Data: ['10', '0', '2', '5', '8', '7', '4', '5', '2', '4', '5', '4']
  //   },
  //   {
  //     SectionName: '3A',
  //     Data: ['10', '0', '2', '5', '8', '7', '4', '5', '2', '4', '5', '4']
  //   }
  // ]

  useEffect(() => {
    if (yearlyBatchWiseMissedSessions) {
      let newSessionData: any = []
      yearlyBatchWiseMissedSessions.map((session: any) => {
        newSessionData.push({
          sectionName: session?.batchName,
          data: session?.monthlyMissedSessions?.map(
            (sess: any) => `${sess.missedSessionCount}`
          )
        })
      })
      setTableData(newSessionData)
    }
  }, [yearlyBatchWiseMissedSessions])

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
          {tableData.map((data: any, index) => (
            <TableRow key={index} isOdd={index % 2 === 1}>
              <TableData>{data.sectionName}</TableData>
              {data.data.map((data: any, index: number) => (
                <TableData key={index}>{data}</TableData>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

export default MissedAessionsTable

const TableContainer = styled.div`
  width: 100%;
  height: 400px;
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
