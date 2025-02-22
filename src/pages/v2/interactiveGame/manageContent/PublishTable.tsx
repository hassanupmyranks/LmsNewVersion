import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import React from 'react'
import { Flex } from './../../../../components/V2/styledComponents'
import { ReactComponent as DownArrow } from '../../../../assets/svg/down-arrow-thin.svg'

import {
  P,
  PublishBtn,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from './StyledComponents'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const PublishTable = ({
  manageContentData,
  handlePublished,
  setIsWarning,
  setdeleteId
}: any) => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('qrCodeId', {
      size: 50,
      header: () => {
        return (
          <Flex gap="5px">
            <P>Code ID</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">{props.getValue() ? props.getValue() : 'N/A'}</Flex>
        )
      }
    }),
    columnHelper.accessor('gameType', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '120px' }}>
            <P>Game Type</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('mainInstruction', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '150px' }}>
            <P>Instructions</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            {props.getValue() ? `${props.getValue().substring(0, 50)}...` : ''}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('mainDescription', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '150px' }}>
            <P>Description</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            {props.getValue() ? `${props.getValue().substring(0, 50)}...` : ''}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('fileName', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>File</P>
          </Flex>
        )
      },
      cell: (props) => {
        return <Flex gap="11px">{props?.getValue()}...</Flex>
      }
    }),
    ...(userInfoV2.role !== 'superAdmin'
      ? [
          columnHelper.accessor('published', {
            size: 70,
            header: () => (
              <Flex gap="0px">
                <P>Status</P>
              </Flex>
            ),
            cell: (props) => {
              const isPublished = props.getValue()
              const gameType = props.row.original.gameType

              if (gameType === 'Question Corner') {
                return <p>N/A</p>
              }

              const buttonStyle = isPublished
                ? {
                    background: 'rgba(1, 181, 116, 0.1)',
                    color: '#01b574',
                    cursor: 'default'
                  }
                : {
                    background: '#01b574',
                    color: '#fff'
                  }

              const handleClick = () => {
                if (!isPublished) {
                  handlePublished(props.row.original)
                }
              }

              return (
                <PublishBtn style={buttonStyle} onClick={handleClick}>
                  {isPublished ? 'Published' : 'Publish'}
                </PublishBtn>
              )
            }
          })
        ]
      : []),
    ...(userInfoV2.role === 'superAdmin'
      ? [
          columnHelper.accessor('isDeleted', {
            size: 70,
            header: () => {
              return (
                <Flex gap="0px">
                  <P>Action</P>
                </Flex>
              )
            },
            cell: (props) => {
              return props.row.original.gameType !== 'Question Corner' ? (
                <PublishBtn
                  style={{
                    background: 'rgba(217, 61, 61, 1)',
                    color: '#fcfdfd',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setIsWarning(true)
                    setdeleteId(props.row.original.qrCodeId)
                  }}
                >
                  Delete
                </PublishBtn>
              ) : (
                <p>N/A</p>
              )
            }
          })
        ]
      : [])
  ]

  const table = useReactTable({
    data: manageContentData,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <>
      <Table style={{ paddingRight: '0' }}>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export default PublishTable
