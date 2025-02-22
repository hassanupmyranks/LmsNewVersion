import React from 'react'
import styled from 'styled-components'
import { Blue } from '../../../const/V2/stylingVariables'
// import UpGraph from '../../../assets/green arrows.png'
// import DownGraph from '../../../assets/Red arrow.png'
// const data = [
//   {
//     Grade: 'Grade 6',
//     sections: [
//       { name: '6A', percentage: '50%' },
//       { name: '6C', percentage: '70%' }
//     ]
//   },
//   {
//     Grade: 'Grade 5',
//     sections: [
//       { name: '5A', percentage: '20%' },
//       { name: '5G', percentage: '80%' },
//       { name: '5C', percentage: '40%' }
//     ]
//   },
//   {
//     Grade: 'Grade 7',
//     sections: [{ name: '7A', percentage: '50%' }]
//   }
// ]

interface HeaderCellProps {
  span: number
}

const PortionTable = ({ grades }: { grades: any[] }) => {
  const maxSections = Math.max(...grades.map((grade) => grade?.batches?.length))
  const TableContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr repeat(${maxSections}, 1fr);
    width: 100%;
    height: 400px;
    overflow: auto;

    border: 1px solid #e6eaeb;
    text-align: center;
    color: ${Blue};
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.28px;
  `

  return (
    <TableContainer>
      <HeaderCell span={1}>Grade</HeaderCell>
      <HeaderCell span={maxSections}>Sections</HeaderCell>
      {grades.map((grade) => (
        <React.Fragment key={grade.courseName}>
          <GradeCell>{grade?.courseName}</GradeCell>
          {grade.batches.map((batch: any) => (
            <SectionCell key={batch.batchId}>{batch.batchName}</SectionCell>
          ))}
          {Array.from({ length: maxSections - grade?.batches.length }).map(
            (_, idx) => (
              <SectionCell key={`empty-${grade.courseId}-${idx}`} />
            )
          )}
          {grade.batches.map((batch: any) => (
            <SectionCell key={`${batch?.name}-percentage`}>
              {batch?.subjects.map((subject: any) => (
                <SectionCell
                  key={`${batch?.name}-percentage`}
                  style={{ flexDirection: 'column' }}
                >
                  <p>{subject?.subjectName}</p>
                  <p style={{ fontSize: '14px', color: 'green' }}>
                    {subject?.completionPercentage}
                  </p>
                </SectionCell>
              ))}
              {/* {batch?.percentage > '50%' ? (
                <View src={UpGraph} />
              ) : (
                <View src={DownGraph} />
              )} */}
            </SectionCell>
          ))}
          {Array.from({ length: maxSections - grade.batches.length }).map(
            (_, idx) => (
              <SectionCell key={`empty-percentage-${grade?.courseId}-${idx}`} />
            )
          )}
        </React.Fragment>
      ))}
    </TableContainer>
  )
}

export default PortionTable

const HeaderCell = styled.div<HeaderCellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  grid-column: span ${({ span }) => span};
  border: 1px solid #e6eaeb;
  text-align: center;
  color: ${Blue};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
const GradeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  grid-row: span 2;

  border: 1px solid #e6eaeb;
  text-align: center;
  color: ${Blue};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
const SectionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  border: 1px solid #e6eaeb;
  text-align: center;
  color: ${Blue};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.28px;
`
// const View = styled.img`
//   width: 20px;
// `
