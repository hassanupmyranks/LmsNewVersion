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
import React, { useEffect, useRef } from 'react'
import { Flex } from '../../../../components/V2/styledComponents'
import { ReactComponent as DownArrow } from '../../../../assets/svg/down-arrow-thin.svg'
import { PublishPayload, PublishTableProps } from '../../../../utils/types'
import {
  // Blue,
  // BlueButton,
  LightBlue
} from '../../../../const/V2/stylingVariables'
import { ReactComponent as CheckedSvg } from '../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../assets/svg/un-check-icon.svg'

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
import styled from 'styled-components'
import debounce from 'lodash/debounce' // You need to install lodash

const PublishTable = ({
  headerName,
  dataList,
  handleScrollInfinite,
  total,
  length,
  publishList,
  onCheck,
  isChecked,
  onChildCheck,
  view
}: PublishTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper: any = createColumnHelper<PublishPayload>()
  const containerRef: any = useRef()
  const debouncedScroll = useRef<any>(null)

  const columns: ColumnDef<PublishPayload, any>[] = [
    columnHelper.accessor('index', {
      size: 50,
      header: () => {
        return (
          <Flex gap="5px">
            {!view && (
              <Checkbox onClick={() => onCheck()}>
                {isChecked ? <CheckedSvg /> : <UnCheckedSvg />}
              </Checkbox>
            )}

            <P>Sl.No</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props: any) => {
        const child = props.row.original.id
        const check = props.row.original.status

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            {view ? (
              ''
            ) : !check ? (
              <Checkbox onClick={() => onChildCheck(child)}>
                {publishList?.includes(child) ? (
                  <CheckedSvg />
                ) : (
                  <UnCheckedSvg />
                )}
              </Checkbox>
            ) : (
              <Checkbox>
                <UnCheckedSvg />
              </Checkbox>
            )}
            <p style={{ marginLeft: '20px' }}> {props.getValue()}</p>
          </div>
        )
      }
    }),
    columnHelper.accessor('name', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px">
            <P>{headerName}</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    ...(view
      ? []
      : [
          columnHelper.accessor(!view ? 'status' : '', {
            size: 70,
            header: () => {
              return (
                <Flex gap="0px">
                  {!view && (
                    <>
                      <P>Status</P>
                      <DownArrow />
                    </>
                  )}
                </Flex>
              )
            }
          })
        ])
  ]

  const table = useReactTable({
    data: [...dataList],
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  useEffect(() => {
    const container = containerRef.current
    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight
      if (scrollHeight < scrollTop + (clientHeight + 3)) {
        handleScrollInfinite?.(total, length)
      }
    }, 1000)

    if (container) {
      debouncedScroll.current = handleScroll
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
        debouncedScroll.current.cancel() // Cancel any pending debounced calls
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, length])

  return (
    <TableWrapper ref={containerRef}>
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
          {Object.keys(table?.getRowModel()?.rowsById)?.map((rowId) => {
            const row = table.getRowModel().rowsById[rowId]
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
                        >
                          {cell.getValue() ? 'Published' : ' Not Published'}
                        </PublishBtn>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableWrapper>
  )
}

export default PublishTable

const TableWrapper = styled.div`
  height: 100%;
  overflow-y: auto;

  @media (max-width: 768px) {
    min-height: 500px;
  }

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
export const Checkbox = styled.div`
  background-color: ${LightBlue};
  display: flex;
  align-items: center;
  border-radius: 50%;
  padding: 10px;
`
