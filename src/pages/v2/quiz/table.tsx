import React, { useState } from 'react'

import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ScrollReactTableProps } from '../../../utils/types'
import {
  Info,
  InfoHead,
  Table,
  TableHead,
  Td
} from '../../../components/V2/SimpleTable/styledComponents'
import styled from 'styled-components'
import QuiZDownloadPopUp from '../CheckPdf/quizPopUp'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'

const QuizTable = <T,>({ tableData, columns }: ScrollReactTableProps<T>) => {
  const memoizedData = React.useMemo(() => tableData, [tableData])
  const history = useHistory()

  const table = useReactTable({
    data: memoizedData,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  })
  const [isPrintPopupOpen, setIsPrintPopupOpen] = useState(false)
  const [getdata, setGetData] = useState<any>()

  const handleReviewAction = (row: any) => {
    const batchDetail = row?.batchDetail
    const quizId = row?.quizId
    const quizType = row?.quizType
    const endDate = row?.duration
    const totalMarks = row?.totalMarks
    history.push({
      pathname: `${ROUTES_V2.TEACHERS_CREATE_QUIZ}`,
      state: {
        batchDetail: batchDetail,
        quizId: quizId,
        viewDetail: true,
        quizType: quizType,
        endDate: endDate,
        totalMarks: totalMarks
      }
    })
  }

  return (
    <div>
      {isPrintPopupOpen ? (
        <QuiZDownloadPopUp
          setPopup={setIsPrintPopupOpen}
          questionId={getdata?.quizId}
        />
      ) : (
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Td
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ textAlign: 'center' }}
                  >
                    <InfoHead
                      style={{
                        color: 'rgba(94, 100, 131, 1)',
                        fontFamily: 'DM Sans'
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </InfoHead>
                  </Td>
                ))}
              </tr>
            ))}
          </TableHead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <QuizRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Quizdata key={cell.id}>
                        <Info
                          style={{
                            color:
                              cell.getContext().column.id == 'ViewDetail'
                                ? 'rgba(19, 118, 185, 1)'
                                : cell.getContext().column.id == 'Downlode'
                                ? 'rgba(19, 118, 185, 1)'
                                : 'rgba(3, 2, 41, 1)',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            if (cell.getContext().column.id == 'ViewDetail') {
                              handleReviewAction(row.original)
                            } else if (
                              cell.getContext().column.id == 'Downlode'
                            ) {
                              setIsPrintPopupOpen(true)
                              const AddId = cell.row.original
                              setGetData(AddId)
                            }
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Info>
                      </Quizdata>
                    )
                  })}
                </QuizRow>
              )
            })}
          </tbody>
        </Table>
      )}
    </div>
  )
}
export default QuizTable

export const QuizRow = styled.tr`
  height: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(91, 147, 255, 0.11);
`
export const Quizdata = styled.td``
