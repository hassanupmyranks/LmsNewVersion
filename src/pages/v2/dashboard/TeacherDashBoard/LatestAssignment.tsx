import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import { DarkBlue } from '../../../../const/V2/stylingVariables'
// import VeiewEyeImage from '../../../../assets/images/view-eye-image.jpeg'
import moment from 'moment'

const LastestAssignment = ({ TabData }: any) => {
  const Header = ['Assesment', 'Assigned To', 'Date']
  const Tabledata = TabData?.map((data: any) => {
    return {
      assesment: data?.institute_test_name || '-',
      assignedTo: data?.batch_details?.map((data: any) => data.batch_name),
      date: moment(data?.test_start_time).format('DD MMM, YYYY')
      // submitted: data?.batches
      //   ?.map((data: any) => data.submittedCount)
      //   ?.reduce(
      //     (accumulator: any, currentValue: any) => accumulator + currentValue,
      //     0
      //   ),
      // pending:
      //   data?.batches
      //     ?.map((data: any) => data.studentCount)
      //     ?.reduce(
      //       (accumulator: any, currentValue: any) => accumulator + currentValue,
      //       0
      //     ) -
      //   data?.batches
      //     ?.map((data: any) => data.submittedCount)
      //     ?.reduce(
      //       (accumulator: any, currentValue: any) => accumulator + currentValue,
      //       0
      //     )
    }
  })
  // console.log(Tabledata1, 'Tabledata1Tabledata1')
  // const Tabledata = [
  //   {
  //     assignment: 'Physics',
  //     assignedTo: ['grade10', 'grade3', 'grade8'],
  //     submitted: '10',
  //     pending: '50'
  //   },
  //   {
  //     assignment: 'Physics3',
  //     assignedTo: ['grade10', 'grade8'],
  //     submitted: '8',
  //     pending: '5'
  //   }
  // ]

  return (
    <TableContainer>
      <Table style={{ backgroundColor: '#F4F7FE' }}>
        <thead>
          <tr style={{ background: 'red' }}>
            {Header.map((data, index) => (
              <TableHeader key={index}>{data}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {Tabledata.map((data: any, index: any) => (
            <tr key={index}>
              <TableData>{data.assesment}</TableData>
              <TableData>{data?.assignedTo?.join(', ')}</TableData>
              {/* <TableData>{data.submitted}</TableData>
              <TableData>{data.pending}</TableData> */}
              <TableData>
                {data?.date}
                {/* <View src={VeiewEyeImage} /> */}
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default LastestAssignment

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`

const TableHeader = styled.th`
  width: 200px;
  font-size: 14px;
  color: #1b2559;
  text-align: center;
  white-space: normal;
  word-wrap: break-word;
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
