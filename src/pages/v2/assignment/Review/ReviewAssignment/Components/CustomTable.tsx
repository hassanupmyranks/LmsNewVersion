import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { ReactNode, useRef, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as RightArrow } from './../../../../../../assets/svg/blue-right-arrow.svg'
import { ReactComponent as LeftArrow } from './../../../../../../assets/svg/blue-left-arrow.svg'
import { ReactComponent as UpArrow } from './../../../../../../assets/svg/up-arrow.svg'

import { ReactTableProps } from '../../../../../../utils/types'

import { Flex } from '../../../../../../components/V2/styledComponents'
import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'
import {
  Blue,
  DarkBlue,
  PrimaryBlue,
  SecondaryGray,
  SecondaryGray300,
  White
} from '../../../../../../const/V2/stylingVariables'

const BasicTable = <T,>({
  tableData,
  columns,
  sorting,
  setSorting,
  setPage,
  page,
  setLimit,
  limit,
  entries
}: ReactTableProps<T>) => {
  const memoizedData = React.useMemo(() => tableData, [tableData])
  const memoizedColumns = React.useMemo(() => columns, [columns])
  const [show, setPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popupRef, () => setPopup(false))

  const paginationButtons: ReactNode[] = []

  const table = useReactTable({
    defaultColumn: {
      size: 200
    },
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting
    },
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel()
  })

  for (let i = 0; i <= entries / limit; i++) {
    paginationButtons.push(
      <Button
        key={i}
        currentPage={i}
        activePage={page}
        onClick={() => {
          table.setPageIndex(i)
          setPage(i)
        }}
      >
        {i + 1}
      </Button>
    )
  }

  const RenderPages = (currPage: any) => {
    if (paginationButtons.length <= 7) {
      return paginationButtons.map((pages) => pages)
    }
    if (paginationButtons.length > 7 && currPage <= 2) {
      return (
        <Flex gap="8px">
          {paginationButtons[0]}
          {paginationButtons[1]}
          {paginationButtons[2]}
          {paginationButtons[3]}
          {`...`}
          {paginationButtons[paginationButtons.length - 1]}
        </Flex>
      )
    } else if (
      paginationButtons.length > 7 &&
      currPage >= paginationButtons.length - 3
    ) {
      return (
        <Flex gap="8px">
          {paginationButtons[0]}
          {`...`}
          {paginationButtons?.[currPage - 2]}
          {paginationButtons?.[currPage - 1]}
          {paginationButtons[currPage]}
          {paginationButtons?.[currPage + 1]}
          {paginationButtons?.[currPage + 2]}
        </Flex>
      )
    } else if (paginationButtons.length > 7 && currPage >= 3) {
      return (
        <Flex gap="8px">
          {paginationButtons[0]}
          {`...`}
          {paginationButtons?.[currPage - 1]}
          {paginationButtons[currPage]}
          {paginationButtons?.[currPage + 1]}
          {`...`}
          {paginationButtons[paginationButtons.length - 1]}
        </Flex>
      )
    }
  }

  const setPerPage = (e: any) => {
    table.setPageSize(Number(e.target.value))
    table.setPageIndex(0)
    setPage(0)
    setLimit(Number(e.target.value))
  }
  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px'
        }}
      >
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        role="presentation"
                        {...{
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
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
                      <Td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize()
                        }}
                      >
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
      </div>
      <PaginationContainer>
        <Flex justifyContent="space-between">
          <P>
            Showing {tableData?.length} of {entries} entries
          </P>
          <Flex>
            <ButtonArrow
              onClick={() =>
                page - 1 >= 0 && setPage((prevState: number) => prevState - 1)
              }
              disabled={page === 0}
            >
              <LeftArrow />
            </ButtonArrow>
            <Flex gap="11px">{RenderPages(page)}</Flex>
            <ButtonArrow
              onClick={() =>
                page + 1 <= entries / limit &&
                setPage((prevState: number) => prevState + 1)
              }
              disabled={page + 1 === entries / limit}
            >
              <RightArrow />
            </ButtonArrow>
          </Flex>

          <Flex gap="16px">
            <P>Per Page</P>
            <DropdownContainer ref={popupRef} onClick={() => setPopup(!show)}>
              {limit}
              <div style={{ cursor: 'pointer' }} role="presentation">
                <UpArrow />
              </div>
              {show && (
                <DropdownPopup>
                  {[10, 20, 30, 40, 50].map((count) => (
                    <DropdownOption
                      key={count}
                      onClick={(e) => {
                        setPerPage(e)
                        setPopup(!show)
                      }}
                    >
                      {count}
                    </DropdownOption>
                  ))}
                </DropdownPopup>
              )}
            </DropdownContainer>
          </Flex>
        </Flex>
      </PaginationContainer>
    </>
  )
}

export default BasicTable

const ButtonArrow = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const PaginationContainer = styled.div`
  padding: 48px 42px 10px 10px;

  @media (max-width: 768px) {
    width: 100vh;
  }
`

const Button = styled.button<{ currentPage?: number; activePage?: number }>`
  color: ${PrimaryBlue};
  background-color: transparent;
  font-size: 20px;
  padding: 2px 10px;
  ${(props) =>
    props.activePage === props.currentPage
      ? `color: ${PrimaryBlue};border: 2px solid ${PrimaryBlue};background: rgba(25, 123, 189, 0.40);`
      : 'color:${PrimaryBlue};border: 2px solid #b2dbf7;'};
  border-radius: 5px;
`

const P = styled.p`
  color: ${Blue};
  font-size: 20px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: -0.4px;
`

const Table = styled.table`
  padding-left: 10px;
  padding-right: 20px;
  width: 100%;
  border-collapse: separate;
  // border-spacing: 0px 20px;
  color: ${DarkBlue};
  z-index: 1;
`

const Thead = styled.thead`
  background-color: ${SecondaryGray300};
  font-size: 14px;
  font-weight: 500;
  color: rgba(3, 2, 41, 0.7);
  position: absolute;
  z-index: 1;
`

const Tbody = styled.tbody`
  font-size: 16px;
`

const Tr = styled.tr``

const Th = styled.th`
  text-align: start;
  // padding-bottom: 16px;
  &:first-child {
    padding-left: 20px;
  }
  &:last-child {
    padding-right: 43px;
  }

  @media (max-width: 768px) {
    min-width: 140px;
  }
`
const Td = styled.td`
  color: ${DarkBlue};
  background-color: ${White};
  font-size: 14px;
  padding: 14px 0px;
  text-align: start;
  &:first-child {
    padding-left: 20px;
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  @media (max-width: 768px) {
    min-width: 140px;
  }
`
const DropdownPopup = styled.div`
  position: absolute;
  z-index: 999;
  padding: 10px;
  width: 70px;
  overflow-y: auto;
  bottom: 48px;
  display: flex;
  right: 4px;
  flex-direction: column;
  gap: 7px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  background-color: ${White};
`

const DropdownOption = styled.option<{ selected?: string }>`
  all: unset;
  cursor: pointer;
  display: block;
  padding: 10px;
  border-radius: 5px;
  ${({ selected }) =>
    selected === 'Edit'
      ? 'color:#5B93FF; background-color:rgba(91, 147, 255, 0.05);'
      : selected === 'Delete'
      ? 'color:#E71D36; background-color:rgba(231, 29, 54, 0.05); '
      : 'color:#2B3674; background-color:rgba(43, 54, 116, 0.05);'};
  ${({ selected }) => selected && 'background-color: rgba(25, 123, 189, 0.05);'}
  font-size: 11px;
  font-weight: 500;
`

export const DropdownContainer = styled.div`
  position: relative;
  gap: 16px;
  padding: 12px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${SecondaryGray};

  background: ${White};

  display: flex;
  justify-content: space-between;
  align-items: center;
`
