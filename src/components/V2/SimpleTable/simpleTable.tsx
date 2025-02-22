import React from 'react'
import {
  Table,
  TableHead,
  Td,
  InfoHead,
  TableRow,
  Info
} from './styledComponents'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ScrollReactTableProps } from '../../../utils/types'

const CustomTable = <T,>({ tableData, columns }: ScrollReactTableProps<T>) => {
  const memoizedData = React.useMemo(() => tableData, [tableData])

  const table = useReactTable({
    data: memoizedData,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Td key={header.id} colSpan={header.colSpan}>
                  <InfoHead>
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      <Info>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Info>
                    </Td>
                  )
                })}
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default CustomTable
