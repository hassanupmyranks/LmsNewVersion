import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import React from 'react'
import { Flex } from '../../../../components/V2/styledComponents'
import { ReactComponent as DownArrow } from '../../../../assets/svg/down-arrow-thin.svg'
import {
  LabPublishTableProps,
  PublishDetailsPayload
} from '../../../../utils/types'
import {
  P,
  PublishBtn,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from './StyledComponenet'

const LabPublishTable = ({
  subjectsList,
  handlePublished
}: LabPublishTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper = createColumnHelper<PublishDetailsPayload>()

  const columns: ColumnDef<PublishDetailsPayload, any>[] = [
    columnHelper.accessor('id', {
      size: 50,
      header: () => {
        return (
          <Flex gap="5px">
            <P>Sr No</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('subject_name', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Subject Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('status', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Status</P>
            <DownArrow />
          </Flex>
        )
      }
    })
  ]

  const table = useReactTable({
    data: subjectsList,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr style={{ boxShadow: 'none' }} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <P
                    {...{
                      onClick: header.column.getToggleSortingHandler()
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: '',
                      desc: ''
                    }[header.column.getIsSorted() as string] ?? null}
                  </P>
                )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>
                    {cell.column.id.includes('status') ? (
                      <PublishBtn
                        style={
                          cell.getValue()
                            ? {
                                background: 'rgba(1, 181, 116, 0.1)',
                                color: '#01b574',
                                cursor: 'default'
                              }
                            : {
                                background: '#01b574',
                                color: '#fff'
                              }
                        }
                        onClick={() =>
                          !cell.row.original.status
                            ? handlePublished(cell.row.original)
                            : null
                        }
                      >
                        {cell.getValue() ? 'Published' : 'Publish'}
                      </PublishBtn>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default LabPublishTable
