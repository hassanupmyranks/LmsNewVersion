import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'

import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as AssignIcon } from '../../../../assets/svg/assign.svg'
import { ReactComponent as ReAssignIcon } from '../../../../assets/svg/re-assign.svg'
import { ReactComponent as PrintIcon } from '../../../../assets/svg/print.svg'
import { ReactComponent as DownloadIcon } from '../../../../assets/svg/download.svg'
import { ReactComponent as CalendarIcon } from '../../../../assets/svg/calendar.svg'
import { ReactComponent as TableTestsIcon } from '../../../../assets/svg/tests-table-icon.svg'

import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'

import styled from 'styled-components'
import {
  deleteInstituteTestAPI,
  getCourses,
  getHeaderTabsDataAPI,
  getNewAllTestData,
  instituteTestEnableAPI
} from '../../../../helpers/V2/apis'
import {
  GetTestDataResponse,
  GetTestSubjectPayload
} from '../../../../utils/types'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'
import {
  BlueButton,
  CoolGray30,
  DarkBlue,
  White
} from '../../../../const/V2/stylingVariables'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
import { Form, Spinner } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'
import { initialState } from '../../../../redux/create_schedule_assign_test/types'
import AssignTestToBatchPopup from '../../../../components/V2/PopUp/AssignBatchTestPopup'
import { capitalizeFirstLetter } from '../../../../helpers/V2/capitalizeFirstLetter'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import ROUTES_V2 from '../../../../const/V2/routes'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import PrintPopUp from '../../../../components/V2/PopUp/PrintPopup'
import DownloadPopUp from '../../../../components/V2/PopUp/DownloadPopup'
import DuplicateTestPopUp from '../../../../components/V2/PopUp/DuplicateTestPopup'
import { ShowStatus } from './tests'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { FullHeading, Heading } from './noPatternTest'
import { HeadingWrapper, Line } from '../../addAssignment/styledComponents'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'

const TeacherTestsTable = () => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const history = useHistory()

  const [tableData, setTableData] = useState<GetTestDataResponse[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [isWarning, setIsWarning] = useState(false)
  const [testId, setTestId] = useState('')
  const [isAssignPopup, setIsAssignPopup] = useState(false)
  const [isPrintPopupOpen, setIsPrintPopupOpen] = useState(false)
  const [reassignData, setReassign] = useState<any>()
  const [printData, setPrintData] = useState<any>()
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false)
  const [immediateTime, setImmediateTime] = useState<any>('')
  const [isOpenDuplicate, setOpenDuplicatePopup] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [selectedGrade, setSelectedGrade] = useState<
    SearchableDropdownOptionData | any
  >({ id: '', label: '' })
  const [patternName, setPatternName] = useState('')
  const { pathname } = useLocation()

  const [role, firstName]: any = useSelector((state: RootState) => [
    state.userV2.userInfoV2.role,
    state.userV2.userInfoV2.firstName
  ])

  const handleChangeHeader = () => {
    const newHeaderData = { ...topHeaderValues[role || 'superAdmin'][pathname] }
    if (
      Object.keys(newHeaderData).length > 0 &&
      newHeaderData.tabs.length > 0
    ) {
      let newTabs = newHeaderData.tabs
      const newTabsData: string[] = newTabs?.map((item: any) => {
        return item?.label === 'Institutes / Schools'
          ? 'institutes'
          : item.label === 'Ongoing & Finished Assessment'
          ? 'tests-submitted'
          : item.label === 'Pattern/Template'
          ? 'patterns'
          : item.label === 'Grade'
          ? 'grades'
          : item.label === 'Batch/Section'
          ? 'batches'
          : item.label === 'All Assessment'
          ? 'tests'
          : item?.label?.split(' ').join('-').toLowerCase()
      })

      getHeaderTabsDataAPI({ tabs: newTabsData })
        .then((res) => {
          if (res) {
            const newData = newTabs?.map((item: any) => {
              const matchingNewItem = res?.find(
                (newItem: any) =>
                  (item?.label === 'Institutes / Schools'
                    ? 'Institutes'
                    : item.label === 'Ongoing & Finished Assessment'
                    ? 'Tests Submitted'
                    : item.label === 'Pattern/Template'
                    ? 'Patterns'
                    : item.label === 'Grade'
                    ? 'Grades'
                    : item.label === 'Batch/Section'
                    ? 'Batches'
                    : item.label === 'All Assessment'
                    ? 'Tests'
                    : item?.label) ===
                  capitalizeFirstLetter(
                    newItem?.collectionName.split('-').join(' ')
                  )
              )

              if (matchingNewItem) {
                const newObj = {
                  ...item,
                  value: Number(matchingNewItem?.count)
                }
                return newObj
              }

              // If no matching item is found, return the original item
              return item
            })
            newHeaderData.tabs = newData
            dispatch(updateTopHeader(newHeaderData))
          }
        })
        .catch((error) => console.log({ error }))
    } else {
      const headerObj = {
        btnText: '',
        btnUrl: '',
        mainTitle:
          `${newHeaderData?.mainTitle ? newHeaderData?.mainTitle : ''}${
            role === 'student' && pathname === ROUTES_V2.DASHBOARD
              ? ` ${firstName}`
              : ''
          }` || '',
        topTitle: newHeaderData?.topTitle || '',
        tabs: []
      }
      dispatch(updateTopHeader(headerObj))
    }
  }

  const handleDuplicate = (data: GetTestDataResponse) => {
    setOpenDuplicatePopup(true)
    setTestId(data._id)
  }

  const editCellOption = useMemo(() => {
    const handleAssignAction = (data: any, assignType: string) => {
      if (assignType === 'Assign') {
        setIsAssignPopup(true)
        setTestId(data._id)
        setImmediateTime(data?.test_end_time)
        setReassign(null)
      } else {
        setIsAssignPopup(true)
        setTestId(data._id)
        setReassign(data)
        setImmediateTime(data?.test_end_time)
      }
    }

    const handlePrintDownloadAction = (data: any, action: string) => {
      const allQuestionsIncomplete = data?.test_details?.subjects_details?.some(
        (ele: GetTestSubjectPayload) => !ele.are_all_questions_added_for_subject
      )
      if (allQuestionsIncomplete) {
        CustomToastMessage(`not ${action.toLowerCase()}`, 'error')
      } else {
        setPrintData({
          test_id: data?._id,
          course_id: data?.course_id
        })
        if (action === 'Print') {
          setIsPrintPopupOpen(true)
        } else {
          setIsDownloadPopupOpen(true)
        }
      }
    }

    return [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (data: any) => {
          dispatch(
            createTestDetails({
              isEdit: true,
              withoutPattern: data?.withoutPattern
            })
          )
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
          setIsWarning(true)
          setTestId(data._id)
        }
      },
      {
        Icon: <AssignIcon />,
        label: 'Assign',
        onClick: (data: any) => handleAssignAction(data, 'Assign')
      },
      {
        Icon: <DownloadIcon />,
        label: 'Duplicate',
        onClick: (data: any) => handleDuplicate(data)
      },
      {
        Icon: <PrintIcon />,
        label: 'Print',
        disabled: false,
        onClick: (data: any) => handlePrintDownloadAction(data, 'Print')
      },
      {
        Icon: <DownloadIcon />,
        label: 'Preview & Download',
        disabled: false,
        onClick: (data: any) => handlePrintDownloadAction(data, 'Download')
      }
    ]
  }, [history, dispatch])

  const NewEditCellOption = useMemo(() => {
    const handleAssignAction = (data: any, assignType: string) => {
      if (assignType === 'Assign') {
        setIsAssignPopup(true)
        setTestId(data._id)
        setImmediateTime(data?.test_end_time)
        setReassign(null)
      } else {
        setIsAssignPopup(true)
        setTestId(data._id)
        setReassign(data)
        setImmediateTime(data?.test_end_time)
      }
    }

    const handlePrintDownloadAction = (data: any, action: string) => {
      const allQuestionsIncomplete = data?.test_details?.subjects_details?.some(
        (ele: GetTestSubjectPayload) => !ele.are_all_questions_added_for_subject
      )
      if (allQuestionsIncomplete) {
        CustomToastMessage(`not ${action.toLowerCase()}`, 'error')
      } else {
        setPrintData({
          test_id: data?._id,
          course_id: data?.course_id
        })
        if (action === 'Print') {
          setIsPrintPopupOpen(true)
        } else {
          setIsDownloadPopupOpen(true)
        }
      }
    }

    return [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (data: any) => {
          dispatch(
            createTestDetails({
              isEdit: true,
              withoutPattern: data?.withoutPattern
            })
          )
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
          setIsWarning(true)
          setTestId(data._id)
        }
      },
      {
        Icon: <ReAssignIcon />,
        label: 'Assign',
        onClick: (data: any) => handleAssignAction(data, 'Re-Assign')
      },
      {
        Icon: <DownloadIcon />,
        label: 'Duplicate',
        onClick: (data: any) => handleDuplicate(data)
      },
      {
        Icon: <PrintIcon />,
        label: 'Print',
        disabled: false,
        onClick: (data: any) => handlePrintDownloadAction(data, 'Print')
      },
      {
        Icon: <DownloadIcon />,
        label: 'Preview & Download',
        disabled: false,
        onClick: (data: any) => handlePrintDownloadAction(data, 'Download')
      }
    ]
  }, [history, dispatch])

  useEffect(() => {
    setIsLoading(true)
    getNewAllTestData({
      user_id: user._id,
      skip: page * limit,
      limit,
      show_only_user_created_tests: true,
      withoutPattern: patternName === '' ? false : true,
      searchKey: searchKey
    })
      .then((res) => {
        if (res) {
          setTableData(res.data)
          setEntries(res?.total)
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setIsLoading(false))
  }, [page, limit, user, patternName, searchKey])
  /** @todo This will be used for sorting (When Changes are done from backend)  */
  //   useEffect(() => {}, [sorting])

  useEffect(() => {
    dispatch(createTestDetails(initialState))
  }, [dispatch])

  const handleDelete = (testID: string) => {
    if (testID) {
      deleteInstituteTestAPI({
        test_id: testID
      })
        .then((res) => {
          if (res) {
            CustomToastMessage(`${res.message}`, 'success')
            setLimit(limit - 1)
            setIsWarning(false)
            handleChangeHeader()
          }
        })
        .catch((error) => CustomToastMessage(`${error.message}`, 'error'))
    }
  }

  const columnHelper = createColumnHelper<GetTestDataResponse>()
  const columns: ColumnDef<GetTestDataResponse, any>[] = [
    columnHelper.accessor('institute_test_name', {
      size: 160,
      header: () => {
        return (
          <Flex gap="8px" style={{ width: '120px' }}>
            <P>Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            <TableTestsIcon />
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('test_pattern_details', {
      size: 140,
      header: () => {
        return (
          <Flex gap="8px" style={{ marginLeft: '10px' }}>
            <P>Pattern</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '120px', marginLeft: '10px' }}>
            <p>{props?.getValue()?.name}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('test_details.subjects_details', {
      size: 220,
      header: () => {
        return <p style={{ marginLeft: '10px' }}>Syllabus</p>
      },
      id: 'test',
      enableSorting: false,
      cell: (props) => {
        return (
          <p style={{ width: '  200px', marginLeft: '10px' }}>
            {props
              .getValue()
              .map((ele: GetTestSubjectPayload) => ele.subject_name)
              .join(',')}
          </p>
        )
      }
    }),
    columnHelper.accessor(`_id`, {
      size: 140,
      header: () => {
        return (
          <Flex gap="8px">
            <P>Assigned, R.Announcement</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <div className="ms-1">
            {props?.row?.original.institute_details?.institute_name && (
              <>
                <p>
                  {props?.row?.original?.batch_details?.length > 0 &&
                    props?.row?.original?.batch_details
                      ?.map((item) => item.batch_name)
                      .join(', ')}
                </p>
                <p>
                  {props?.row?.original?.result_announce}{' '}
                  {props?.row?.original?.result_announce == 'IMMEDIATE'
                    ? ''
                    : moment(props?.row?.original?.result_announce_time).format(
                        'llll'
                      )}
                </p>
              </>
            )}
          </div>
        )
      }
    }),
    columnHelper.accessor('test_duration', {
      size: 110,
      header: () => {
        return (
          <Flex
            gap="8px"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '10px'
            }}
          >
            <P>Duration</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {props.getValue()}
          </p>
        )
      }
    }),
    columnHelper.accessor('test_start_time', {
      size: 170,
      header: () => {
        return (
          <Flex gap="8px" style={{ width: '150px', marginLeft: '10px' }}>
            <P>Test Date & Time</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return props.getValue() ? (
          <Flex gap="8px" style={{ width: '170px', marginLeft: '10px' }}>
            <CalendarIcon />
            <p>{moment(props.getValue()).format('DD MMM, YYYY LT')}</p>
          </Flex>
        ) : (
          ''
        )
      }
    }),
    columnHelper.accessor('total_marks', {
      size: 140,
      header: () => {
        return (
          <Flex
            gap="8px"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '90px'
            }}
          >
            <P>Total Marks</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <p
            className="ms-1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90px'
            }}
          >
            {props.getValue()}
          </p>
        )
      }
    }),
    columnHelper.accessor('_id', {
      size: 50,
      header: () => {
        return (
          <p style={{ marginLeft: '10px', width: '60px' }}>Enable/ Disable</p>
        )
      },
      cell: (props) => {
        return (
          <Form.Check
            // disabled={props.row.original.status !== 'ASSIGNED' ? true : false}
            checked={props?.row?.original?.enabled}
            type="switch"
            id="reverse-radio-test"
            onChange={(e: any) => {
              if (props.getValue()) {
                setIsLoading(true)
                instituteTestEnableAPI({
                  test_id: props.getValue(),
                  enabled: e.target.checked
                })
                  .then((res) => {
                    if (res) {
                      if (!e.target.checked) {
                        CustomToastMessage(`Test Enabled`, 'success')
                      } else {
                        CustomToastMessage(`Test Disabled`, 'success')
                      }
                      setLimit(limit + 1)
                    }
                  })
                  .catch((error) =>
                    CustomToastMessage(`${error.message}`, 'error')
                  )
                  .finally(() => setIsLoading(false))
              }
            }}
          />
        )
      }
    }),
    columnHelper.accessor('status', {
      size: 100,
      id: 'question_status',
      header: () => {
        return (
          <Flex gap="8px" style={{ marginLeft: '10px' }}>
            <P>Status</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        if (props.getValue() === 'PENDING') {
          return (
            <ShowStatus bgColor="#fd0808" style={{ marginLeft: '10px' }}>
              Pending
            </ShowStatus>
          )
        } else if (props.getValue() === 'CREATED') {
          return (
            <ShowStatus bgColor="#f39d2d" style={{ marginLeft: '10px' }}>
              Created
            </ShowStatus>
          )
        } else {
          return (
            <ShowStatus bgColor="#01B574" style={{ marginLeft: '10px' }}>
              Assigned
            </ShowStatus>
          )
        }
      }
    }),
    columnHelper.accessor('_id', {
      size: 10,
      header: '',
      cell: (props) => {
        if (props?.row?.original.institute_details?.institute_name) {
          return (
            <div style={{ marginLeft: '15px' }}>
              <PopupMenu id={props.row.original} options={NewEditCellOption} />
            </div>
          )
        } else {
          return (
            <div style={{ marginLeft: '15px' }}>
              <PopupMenu id={props.row.original} options={editCellOption} />
            </div>
          )
        }
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
    <>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          onDelete={() => handleDelete(testId)}
          text="Are you sure you want to delete this test?"
        />
      )}

      {isOpenDuplicate && (
        <DuplicateTestPopUp
          setPopup={() => {
            setOpenDuplicatePopup(false)
            setTestId('')
            setLimit(limit + 1)
          }}
          testId={testId}
        />
      )}

      {isAssignPopup && (
        <AssignTestToBatchPopup
          setPopup={() => {
            setLimit(limit + 1)
            setIsAssignPopup(false)
            setReassign(null)
          }}
          testId={testId}
          immediateTime={immediateTime}
          reassignData={reassignData}
        />
      )}

      {isPrintPopupOpen && (
        <PrintPopUp setPopup={setIsPrintPopupOpen} data={printData} />
      )}

      {isDownloadPopupOpen && (
        <DownloadPopUp setPopup={setIsDownloadPopupOpen} data={printData} />
      )}

      <PageContainer style={{ height: '100%', overflow: 'auto' }}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{ marginBottom: '15px' }}
        >
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
          <InputSearchV2
            label="Search Assessment"
            required
            placeholder="Enter Assessment Name"
            style={{ width: '430px' }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (
                event.target.value.length >= 1 ||
                event.target.value.length === 0
              ) {
                setSearchKey(event.target.value)
              }
            }}
          />
        </Flex>
        <FullHeading>
          <HeadingWrapper
            style={{ width: 'auto' }}
            onClick={() => {
              // history.push(
              //   pathname === ROUTES_V2.NO_PATTERN_TESTS
              //     ? ROUTES_V2.TESTS
              //     : pathname === ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
              //     ? ROUTES_V2.ASSIGNED_TESTS
              //     : pathname === ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
              //     ? ROUTES_V2.UNASSIGNED_TESTS
              //     : ROUTES_V2.TESTS
              // )
              setPatternName('')
            }}
          >
            <Heading isActive={patternName === '' ? true : false}>
              Pattern Assessment
            </Heading>
          </HeadingWrapper>
          <Line />
          <HeadingWrapper
            style={{ width: 'auto' }}
            onClick={() => {
              // history.push(
              //   pathname === ROUTES_V2.TESTS
              //     ? ROUTES_V2.NO_PATTERN_TESTS
              //     : pathname === ROUTES_V2.ASSIGNED_TESTS
              //     ? ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
              //     : pathname === ROUTES_V2.UNASSIGNED_TESTS
              //     ? ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
              //     : ROUTES_V2.NO_PATTERN_TESTS
              // )
              setPatternName('No pattern')
            }}
          >
            <Heading isActive={patternName === 'No pattern' ? true : false}>
              No Pattern Assessment
            </Heading>
          </HeadingWrapper>
        </FullHeading>
        <TableWrapper>
          {isLoading && (
            <Spinner
              style={{
                width: '44px',
                height: '44px',
                color: `${BlueButton}`,
                position: 'absolute',
                top: '70%',
                left: '45%'
              }}
              animation={'border'}
            />
          )}
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
    </>
  )
}

export default TeacherTestsTable

const P = styled.p`
  cursor: pointer;
`

const TableWrapper = styled.div`
  // height: 100%;
  // overflow-y: auto;

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
export const MoreBatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 400px;
  max-width: 400px;
  position: absolute;
  z-index: 999;
  // right: 0px;
  top: 60px;
  background-color: ${White};
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  border-width: 2px;
  border-color: ${CoolGray30};
  border-style: solid;
`

export const BatchesMore = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${DarkBlue};
  line-height: 20px;
  padding: 2px;
  margin-right: 4px;
`
