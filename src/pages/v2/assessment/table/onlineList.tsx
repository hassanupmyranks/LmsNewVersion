import styled from 'styled-components'
import {
  AlignHeading,
  Heading,
  PopUpContainer,
  RemoveIcon
} from '../../../../components/V2/PopUp/styledComponents'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import { useEffect, useState } from 'react'
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table'
import { Flex } from '../../../../components/V2/styledComponents'
import {
  getCourses,
  getOnlineNoPatternTestStudents,
  getOnlineTestStudents
} from '../../../../helpers/V2/apis'
import { Spinner } from 'react-bootstrap'
import {
  BlueButton,
  SecondaryGray300
} from '../../../../const/V2/stylingVariables'
import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'

const OnlineList = ({
  setPopup,
  testId,
  pathname
}: {
  setPopup: (d: boolean) => void
  testId: string
  pathname?: string
}) => {
  const [tableData, setTableData] = useState<any[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [selectedGrade, setSelectedGrade] = useState<
    SearchableDropdownOptionData | any
  >({
    id: '',
    label: ''
  })

  useEffect(() => {
    setIsLoading(true)
    if (pathname === '/v2/assessment/no-pattern-submitted-tests') {
      getOnlineNoPatternTestStudents({
        testId: testId,
        course_id: selectedGrade.id,
        page: page + 1,
        limit
      })
        .then((res) => {
          if (res) {
            setTableData(res.data)
            setEntries(res?.total)
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setIsLoading(false))
    } else {
      getOnlineTestStudents({
        testId: testId,
        course_id: selectedGrade.id,
        page: page + 1,
        limit
      })
        .then((res) => {
          if (res) {
            setTableData(res.data)
            setEntries(res?.total)
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setIsLoading(false))
    }
  }, [page, limit, testId, selectedGrade.id, pathname])

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('firstName', {
      size: 160,
      header: () => {
        return (
          <Flex gap="8px" alignItems="center" style={{ marginTop: '16px' }}>
            <Heading>Sl.No</Heading>
          </Flex>
        )
      },
      cell: (props: any) => {
        return (
          <Flex gap="11px">
            <p
              style={{
                marginLeft: '10px'
              }}
            >
              {props.row.index + 1}
            </p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('firstName', {
      size: 160,
      header: () => {
        return (
          <Flex gap="8px" alignItems="center" style={{ marginTop: '16px' }}>
            <Heading>Student Name</Heading>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            <p
              style={{
                marginLeft: '6px'
              }}
            >
              {props.getValue()}
            </p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('batchName', {
      size: 160,
      header: () => {
        return (
          <Flex gap="8px" alignItems="center" style={{ marginTop: '16px' }}>
            <Heading>Batch / Section</Heading>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            <p
              style={{
                marginLeft: '4px'
              }}
            >
              {props.getValue()}
            </p>
          </Flex>
        )
      }
    })
  ]

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
    }
    getCourses(payload)
      .then((res: any) => {
        newGrade = res?.data?.data?.map((item: any) => {
          return {
            id: item._id,
            label: item.name,
            value: ''
          }
        })
        setGradeData(newGrade)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))
  }, [])

  return (
    <PopUpContainer style={{ maxHeight: '90vh' }}>
      <SearchableDropdown
        style={{ width: '290px' }}
        isLoader={gradeLoading}
        label={'Select Grade'}
        placeHolder={'Please Select Grade'}
        options={gradeData}
        isClear={selectedGrade?.id ? true : false}
        onSelect={(option: any) => {
          setSelectedGrade(option)
        }}
        selectedValue={selectedGrade}
      />

      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Online Students</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <TableWrapper>
          {isLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '55%',
                left: '48.5%',
                zIndex: '1000'
              }}
              animation={'border'}
            />
          )}
          <BasicTable
            {...{
              maxHeight: '42vh',
              tableData,
              columns,
              sorting,
              setSorting,
              setPage,
              setLimit,
              entries,
              limit,
              page
            }}
          />
        </TableWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default OnlineList

export const PopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  width: 650px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;
  gap: 10px;

  @media (max-width: 768px) {
    width: 96%;
  }
`
const TableWrapper = styled.div`
  // height: 100%;
  // overflow-y: auto;
  background-color: ${SecondaryGray300};

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
