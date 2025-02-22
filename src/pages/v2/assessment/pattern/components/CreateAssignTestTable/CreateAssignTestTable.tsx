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
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as DownArrow } from '../../../../../../assets/svg/down-arrow-thin.svg'
import { Flex } from '../../../../../../components/V2/styledComponents'
import {
  Blue,
  SecondaryGray600
} from '../../../../../../const/V2/stylingVariables'
import {
  CreatePatternPayload,
  PatternSubjectDetails
} from '../../../../../../utils/types'
import { questionType } from '../const'

const CreateAssignTestTable = ({
  selectedData,
  selectedSubject
}: {
  selectedData: CreatePatternPayload
  selectedSubject: number
}) => {
  const sectionsData =
    selectedData?.subjects_details?.[selectedSubject]?.sections.map(
      (section) => {
        const tmp_question_type = Array.isArray(section.question_type)
          ? section.question_type.map((que_type: any) => {
              return (
                questionType.find((qt) => qt.value === que_type)?.label ||
                que_type
              )
            })
          : [section.question_type]

        return {
          ...section,
          question_type: tmp_question_type.join(','),
          questions_list: []
        }
      }
    ) ?? []

  const [sorting, setSorting] = React.useState<SortingState>([])

  const [, setSubjectSections] = React.useState<Array<PatternSubjectDetails>>(
    []
  )

  useEffect(() => {
    const newData = selectedData?.subjects_details

    setSubjectSections(newData)
  }, [selectedData?.subjects_details])

  interface PatternPayload {
    section_name: string
    marks_per_question: number
    negative_mark: number
    question_type: string
    optional_question: number
  }

  const columnHelper = createColumnHelper<PatternPayload>()

  const columns: ColumnDef<PatternPayload, any>[] = [
    columnHelper.accessor('section_name', {
      size: 100,
      header: () => {
        return (
          <Flex gap="5px">
            <P>Section Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('marks_per_question', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Marks/Question</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('negative_mark', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Negatives</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('question_type', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Question Type</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('optional_question', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Answer Any</P>
            <DownArrow />
          </Flex>
        )
      }
    })
  ]

  const table = useReactTable({
    data: sectionsData,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const Th = styled.th`
    text-align: start;
    // min-width: 140px;
    min-width: 70px;
    &:first-child {
      padding-left: 0px;
    }
    &:last-child {
      padding-right: 23px;
    }
  `
  const Tr = styled.tr`
    width: 100%;
  `
  const Hr = styled.tr`
    width: 100%;
    border-bottom: 5px solid #e9edf7;
    height: 5px;
  `

  const Td = styled.td`
    // min-width: 150px;
    text-align: start;
  `

  const Span = styled.span`
    width: 120px;
    display: inline-block;
  `
  const Thead = styled.thead`
    font-size: 16px;
    font-weight: 500;
    opacity: 0.7;
    border: 1px solid #e9edf7;
    color: ${SecondaryGray600};

    th {
      font-size: 15px !important;
    }
  `

  const Table = styled.table`
    padding-left: 10px;
    padding-right: 42px;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 10px;
    max-width: 100%;
    overflow-x: auto;
  `
  const Tbody = styled.tbody`
    color: ${Blue};
    font-weight: 700;
    font-size: 16px !important;

    td {
      font-size: 15px !important;
    }
  `
  const OuterDiv = styled.div`
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  `

  return (
    <OuterDiv>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
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
        <Hr />
        <Tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {/* {cell.column.id.includes('section_name') ? (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        style={{ marginRight: '8px' }}
                        checked={isChecked.includes(
                          `${activeSubject.subject_name}-${cell.id}`
                        )}
                        onChange={() =>
                          selectSectionHandler(row.original, cell.id)
                        }
                      />
                    ) : null} */}
                      <Span>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Span>
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </OuterDiv>
  )
}

export default CreateAssignTestTable

export const P = styled.p`
  cursor: pointer;
`
