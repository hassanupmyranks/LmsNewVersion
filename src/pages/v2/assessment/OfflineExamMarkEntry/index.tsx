import {
  ButtonV2,
  Flex,
  PageContainer
} from '../../../../components/V2/styledComponents'
import { format } from 'date-fns'
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table'
import { Flexs } from './styledComponent'
import ViewEyeButton from '../../../../components/V2/ViewEyeButton'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import {
  getBatchAPI,
  getLearnCourseData,
  getNewAllTestData
} from '../../../../helpers/V2/apis'
import ROUTES_V2 from '../../../../const/V2/routes'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import styled from 'styled-components'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import { NewBatchDetails, CourseDetailProps } from '../../../../utils/types'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as AssignIcon } from '../../../../assets/svg/assign.svg'
import AssignTestToBatchOfflinePopup from './AssignBatchTestOfflinePopup'
import BatchSelectionPopup from './BatchSelectionPopup'

const OfflineExamMarkEntry = () => {
  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const history = useHistory()
  const [gradeOptions, setGradeOptions] = useState<[]>([])
  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)
  const [isBatchLoading, setIsBatchLoading] = useState(false)
  const [batch, setBatch] = useState<any[]>([])
  const [batchTotal, setBatchTotal] = useState(0)
  const [selectedBatch, setSelectedBatch] = useState<
    SearchableDropdownOptionData | any
  >()
  const [selectedGrade, setSelectedGrade] = useState({
    ...defaultValues,
    type: ''
  })

  const [tableData, setTableData] = useState<any>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(8)
  const [entries, setEntries] = useState<number>(0)
  const [isAssignPopup, setIsAssignPopup] = useState(false)
  const [testId, setTestId] = useState('')
  const [reassignData, setReassign] = useState<any>()
  // const minDate = new Date(2020, 12, 31) // Today's date
  // const maxDate = new Date(2040, 12, 31) // End of 2025

  const [isBatchSelectingPopup, setIsBatchSelectingPopup] = useState(false)

  const editCellOption = useMemo(() => {
    const handleAssignAction = (data: any) => {
      setIsAssignPopup(true)
      setTestId(data._id)
      setReassign(data)
    }

    return [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (data: any) => {
          const { _id, course_id } = data
          history.push(
            `${ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST}/${_id}/${course_id}`
          )
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (data: any) => {
          setTestId(data._id)
        }
      },
      {
        Icon: <AssignIcon />,
        label: 'Assign',
        onClick: (data: any) => handleAssignAction(data)
      }
    ]
  }, [history])

  useEffect(() => {
    SetIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res: CourseDetailProps[]) => {
        const options: any = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: '',
            type: el.type
          }
        })
        setGradeOptions(options)
        SetIsCourseLoading(false)
        if (res.length <= 0) {
          CustomToastMessage('There are no Grades for this teacher', 'error')
        }
      })
      .catch((err: any) => {
        CustomToastMessage(err.message, 'error')
      })
      .finally(() => SetIsCourseLoading(false))
  }, [])

  useEffect(() => {
    if (selectedGrade?.id) {
      setIsBatchLoading(true)
      const payload = {
        page: 1,
        limit: 50,
        courseId: selectedGrade?.id
        // branchIds: [String(selectedBranch?.id)]
      }
      getBatchAPI(payload)
        .then((res: any) => {
          if (res) {
            setBatchTotal(res?.total)
            const newBatch = res?.data?.map((batch: NewBatchDetails) => ({
              label: batch.name,
              id: batch?._id,
              value: ''
            }))
            setBatch(newBatch)
          }
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Batches under this Grade', 'error')
          }
        })
        .catch((err: any) => {
          CustomToastMessage(err.message, 'error')
        })
        .finally(() => setIsBatchLoading(false))
    }
  }, [selectedGrade?.id])

  // Fetch Offline Assessments
  useEffect(() => {
    getNewAllTestData({
      skip: page * limit,
      limit: limit,
      isOffline: true,
      course_id: selectedGrade?.id,
      batchIds: selectedBatch && Array(selectedBatch?.id)
    })
      .then((response: any) => {
        console.log('getNewAllTestData', response)
        setTableData(response?.data)
        setEntries(response.total || 0)
        if (response.data.length === 0) {
          CustomToastMessage(
            'There are no Offline Assessments Created',
            'error'
          )
        }
      })
      .catch((err: any) => {
        CustomToastMessage(err.message, 'error')
      })
  }, [limit, page, selectedGrade?.id, selectedBatch])

  const patternSelectHandler = async (data: any) => {
    setSelectedGrade(data)
    setSelectedBatch('')
    setBatch([])
  }

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('id', {
      size: 100,
      header: () => {
        return (
          <Flex gap="11px">
            <P>SI.No</P>
            {/* <DownArrow /> */}
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            <p>{props.row.index + 1 + page * limit}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('institute_test_name', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Test Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">{props.getValue() ? props.getValue() : 'N/A'}</Flex>
        )
      }
    }),
    columnHelper.accessor('createdAt', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Date</P>
          </Flex>
        )
      },
      cell: (props) => {
        const rawDate = props.getValue()
        const formattedDate = rawDate
          ? format(new Date(rawDate), 'ddMMM, yyyy')
          : 'N/A'
        return <Flex gap="11px">{formattedDate}</Flex>
      }
    }),
    columnHelper.accessor('course_name', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Course</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">{props.getValue() ? props.getValue() : 'N/A'}</Flex>
        )
      }
    }),
    columnHelper.accessor('batch_details', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Batch</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            {props.getValue()
              ? props
                  .getValue()
                  .map((batch: any) => batch.batch_name)
                  .join(', ')
              : 'N/A'}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('status', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Status</P>
            {/* <DownArrow /> */}
          </Flex>
        )
      },
      cell: (props) => {
        if (props.getValue() === 'CREATED') {
          return (
            <ShowStatus
              bgColor="
            rgba(1, 181, 116, 0.2)"
              color="
            rgba(1, 181, 116, 1)"
            >
              {props.getValue() ? props.getValue() : 'N/A'}
            </ShowStatus>
          )
        } else {
          return (
            <ShowStatus
              bgColor="rgba(29, 78, 216, 0.2)"
              color="rgba(29, 78, 216, 1)"
            >
              {props.getValue() ? props.getValue() : 'N/A'}
            </ShowStatus>
          )
        }
      }
    }),
    columnHelper.accessor('_id', {
      size: 80,
      header: () => {
        return (
          <Flex gap="11px">
            <P>View</P>
          </Flex>
        )
      },
      cell: (props) => {
        const testId = props.getValue()
        return (
          <ViewEyeButton
            clickHandler={() => {
              setIsBatchSelectingPopup(true)
              setTestId(testId)
              setReassign(props.row.original)
            }}
            disabled={false}
          />
        )
      }
    }),
    columnHelper.accessor('_id', {
      size: 80,
      header: '',
      cell: (props) => {
        return (
          <div style={{ marginLeft: '15px' }}>
            <PopupMenu id={props.row.original} options={editCellOption} />
          </div>
        )
      }
    })
  ]

  return (
    <PageContainer style={{ flexDirection: 'column' }}>
      {isAssignPopup && (
        <AssignTestToBatchOfflinePopup
          setPopup={() => {
            setLimit(limit + 1)
            setIsAssignPopup(false)
            setReassign(null)
          }}
          testId={testId}
          reassignData={reassignData}
        />
      )}
      {isBatchSelectingPopup && (
        <BatchSelectionPopup
          setPopup={() => {
            setLimit(limit + 1)
            setIsAssignPopup(false)
            setReassign(null)
          }}
          testId={testId}
          reassignData={reassignData}
        />
      )}
      <Flexs
        style={{
          gap: '26px',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <SearchableDropdown
          label="Select Grade"
          selectedValue={selectedGrade}
          isClear={selectedGrade?.label ? true : false}
          onSelect={patternSelectHandler}
          placeHolder="Grade Name"
          isLoader={isCourseLoading}
          required
          options={gradeOptions}
        />

        <SearchableDropdown
          style={{ width: '280px' }}
          isLoader={isBatchLoading}
          label="Select Batch / Section"
          placeHolder="Enter or select Batch / Section"
          options={batch}
          isClear={selectedBatch?.id ? true : false}
          total={batchTotal}
          length={batch?.length}
          onSelect={(data: any) => {
            setSelectedBatch(data)
          }}
          selectedValue={selectedBatch}
        />
        <div style={{ marginTop: '18px' }}>
          <ButtonV2>Submit</ButtonV2>
        </div>
      </Flexs>
      <TableWrapper style={{ marginTop: '30px' }}>
        <BasicTable
          {...{
            maxHeight: '52vh',
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
    </PageContainer>
  )
}

export default OfflineExamMarkEntry

const P = styled.p`
  cursor: pointer;
`

const TableWrapper = styled.div`
  & thead {
    position: sticky;
    top: -9px;
    margin: 0 0 0 0;
    height: 47px;
  }
`
const ShowStatus = styled.p<{
  bgColor: string
  color: string
}>`
  color: ${({ color }) => color};
  font-family: Nunito;
  width: 70px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.28px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;
`
