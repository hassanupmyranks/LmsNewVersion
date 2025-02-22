import {
  // ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'

import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as EyeIcon } from '../../../../assets/svg/MoveArrow.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as AssignIcon } from '../../../../assets/svg/assign.svg'
import { ReactComponent as ReAssignIcon } from '../../../../assets/svg/re-assign.svg'
import { ReactComponent as PrintIcon } from '../../../../assets/svg/print.svg'
import { ReactComponent as DownloadIcon } from '../../../../assets/svg/download.svg'
import { ReactComponent as CalendarIcon } from '../../../../assets/svg/calendar.svg'
import { ReactComponent as CloseIcon } from '../../../../assets/svg/close-page.svg'
import { ReactComponent as TableTestsIcon } from '../../../../assets/svg/tests-table-icon.svg'

import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'

import styled from 'styled-components'
import {
  deleteInstituteTestAPI,
  getAllInstituteAPI,
  getCourses,
  getHeaderTabsDataAPI,
  getNewAllBranchAPI,
  getNewAllTestData,
  instituteTestEnableAPI
  // noPatternTestEnableAPI
} from '../../../../helpers/V2/apis'
import {
  GetTestDataResponse,
  GetTestSubjectPayload
} from '../../../../utils/types'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'
import {
  BlueButton,
  DarkBlue,
  PrimaryBlue,
  SecondaryGray600
} from '../../../../const/V2/stylingVariables'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { useHistory, useLocation } from 'react-router-dom'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
import { Form, Spinner } from 'react-bootstrap'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'
import { initialState } from '../../../../redux/create_schedule_assign_test/types'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import { capitalizeFirstLetter } from '../../../../helpers/V2/capitalizeFirstLetter'
import ROUTES_V2 from '../../../../const/V2/routes'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import { HeadingWrapper, Line } from '../../addAssignment/styledComponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import DuplicateTestPopUp from '../../../../components/V2/PopUp/DuplicateTestPopup'
import AssignInstitutePopup from '../../../../components/V2/PopUp/AssignInstitutePopup'
import DownloadPopUp from '../../../../components/V2/PopUp/DownloadPopup'
import PrintPopUp from '../../../../components/V2/PopUp/PrintPopup'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'
interface HeadingProps {
  isActive: boolean
}

const NoPatternTestsTable = () => {
  const [tableData, setTableData] = useState<GetTestDataResponse[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [isWarning, setIsWarning] = useState(false)
  const [testId, setTestId] = useState('')
  const [isAssignPopup, setIsAssignPopup] = useState(false)
  const [isPrintPopupOpen, setIsPrintPopupOpen] = useState(false)
  const [reassignData, setReassign] = useState<any>()
  const [printData, setPrintData] = useState<any>()
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false)
  const [isOpenDuplicate, setOpenDuplicatePopup] = useState(false)

  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [selectedGrade, setSelectedGrade] = useState<
    SearchableDropdownOptionData | any
  >({
    id: '',
    label: ''
  })
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [instituteTotal, setInstituteTotal] = useState(0)
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [branchData, setBranchData] = useState<any[]>([])
  const [isBranchLoading, setIsBranchLoading] = useState(false)
  const [branchTotal, setBranchTotal] = useState(0)
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    let newInstitute: any = []
    if (user.role === 'instituteAdmin') {
      setSelectedInstitute({
        id: user.instituteId,
        value: user.instituteName,
        label: user.instituteName
      })
    } else if (user.role === 'superAdmin') {
      setInsLoading(true)

      const payload = {
        page: 1,
        limit: 150
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
          setInstituteTotal(res.total)
          newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setInstituteData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInsLoading(false))
    }
  }, [user.instituteId, user.instituteName, user.role])

  useEffect(() => {
    if (user.role === 'branchAdmin') {
      setSelectedInstitute({
        id: user.instituteId,
        value: user.instituteName,
        label: user.instituteName
      })
      setSelectedBranch({
        id: user.branchId,
        value: user.branchName,
        label: user.branchName
      })
    }
    if (
      (selectedInstitute?.id && user.role === 'superAdmin') ||
      user.role === 'instituteAdmin'
    ) {
      const payload = {
        page: 1,
        limit: 50,
        instituteId:
          user.role == 'instituteAdmin'
            ? user.instituteId
            : selectedInstitute?.id
      }
      setIsBranchLoading(true)
      dispatch(getNewAllBranchAPI(payload))
        .then((data: any) => {
          setBranchTotal(data?.total)
          const branch = data.payload.data.map((res: any) => ({
            label: res.name,
            id: res._id,
            value: ''
          }))
          setBranchData(branch)
          if (data.payload.data.length <= 0) {
            CustomToastMessage(
              'There are no Branches under this Institute',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsBranchLoading(false))
    }
  }, [
    user.instituteId,
    selectedInstitute?.id,
    dispatch,
    user.role,
    user.branchName,
    user.branchId,
    user.instituteName
  ])
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
      if (user.role !== 'teacher') {
        if (assignType) {
          setIsAssignPopup(true)
          setTestId(data._id)
          setReassign(data)
        }
      }
    }

    const handlePrintDownloadAction = (data: any, action: string) => {
      setPrintData({
        test_id: data?._id
      })
      if (action === 'Print') {
        setIsPrintPopupOpen(true)
      } else {
        setIsDownloadPopupOpen(true)
      }
    }

    const menuItems = []
    if (user.role === 'teacher') {
      menuItems.push({
        Icon: <EyeIcon />,
        label: 'View',
        onClick: (data: any) => {
          const { _id, course_id } = data
          history.push(
            `${ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST}/${_id}/${course_id}`
          )
        }
      })
    } else {
      menuItems.push(
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
          Icon: <EyeIcon />,
          label: 'View',
          onClick: (data: any) => {
            const { _id, course_id } = data
            history.push(
              `${ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST}/${_id}/${course_id}`
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
          onClick: (data: any) => handlePrintDownloadAction(data, 'Print')
        },
        {
          Icon: <DownloadIcon />,
          label: 'Preview & Download',
          onClick: (data: any) => handlePrintDownloadAction(data, 'Download')
        }
      )
    }
    return menuItems
  }, [history, user.role, dispatch])

  const NewEditCellOption = useMemo(() => {
    const handleAssignAction = (data: any, assignType: string) => {
      if (user.role !== 'teacher') {
        if (assignType) {
          setIsAssignPopup(true)
          setTestId(data._id)
          setReassign(data)
        }
      }
    }

    const handlePrintDownloadAction = (data: any, action: string) => {
      setPrintData({
        test_id: data?._id
      })
      if (action === 'Print') {
        setIsPrintPopupOpen(true)
      } else {
        setIsDownloadPopupOpen(true)
      }
    }

    const menuItems = []
    if (user.role === 'teacher') {
      menuItems.push(
        // {
        //   Icon: <EditIcon />,
        //   label: 'Add questions',
        //   onClick: (data: any) => {
        //     const { _id, course_id } = data
        //     history.push(`/v2/add-questions/${_id}/${course_id}`)
        //   }
        // },
        {
          Icon: <EyeIcon />,
          label: 'View',
          onClick: (data: any) => {
            const { _id, course_id } = data
            history.push(
              `${ROUTES_V2.EDIT_SCHEDULE_ASSIGN_TEST}/${_id}/${course_id}/view`
            )
          }
        }
      )
    } else {
      menuItems.push(
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
          Icon: <EyeIcon />,
          label: 'View',
          onClick: (data: any) => {
            const { _id, course_id } = data
            history.push(
              `${ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST}/${_id}/${course_id}`
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
          onClick: (data: any) => handlePrintDownloadAction(data, 'Print')
        },
        {
          Icon: <DownloadIcon />,
          label: 'Preview & Download',
          onClick: (data: any) => handlePrintDownloadAction(data, 'Download')
        }
      )
    }
    return menuItems
  }, [history, user.role, dispatch])

  const onlyEditCellOption = useMemo(() => {
    const menuItems = []
    if (user.role === 'teacher') {
      menuItems.push(
        // {
        //   Icon: <EditIcon />,
        //   label: 'Edit questions',
        //   onClick: (data: any) => {
        //     const { _id, course_id } = data
        //     history.push(`/v2/add-questions/${_id}/${course_id}`)
        //   }
        // },
        {
          Icon: <EyeIcon />,
          label: 'View',
          onClick: (data: any) => {
            const { _id, course_id } = data
            history.push(
              `${ROUTES_V2.VIEW_SCHEDULE_ASSIGN_TEST}/${_id}/${course_id}`
            )
          }
        }
      )
    }
    return menuItems
  }, [history, user.role])

  useEffect(() => {
    setIsLoading(true)
    getNewAllTestData({
      course_id: selectedGrade?.id,
      // skip: page * limit,
      limit,
      withoutPattern: true,
      // started:
      //   pathname === '/v2/assessment/no-pattern-submitted-tests'
      //     ? true
      //     : undefined,
      isAssigned:
        pathname === '/v2/assessment/no-pattern-assigned-tests'
          ? true
          : pathname === '/v2/assessment/no-pattern-unassigned-tests'
          ? false
          : undefined,
      // status:
      //   pathname === '/v2/assessment/no-pattern-assigned-tests'
      //     ? 'ASSIGNED'
      //     : pathname === '/v2/assessment/no-pattern-unassigned-tests'
      //     ? 'CREATED'
      //     : undefined
      searchKey: searchKey
    })
      .then((res) => {
        if (res) {
          setTableData(res?.data)
          setEntries(res?.total)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [page, limit, selectedGrade.id, user._id, pathname, user.role, searchKey])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  //   useEffect(() => {}, [sorting])

  useEffect(() => {
    dispatch(createTestDetails(initialState))
  }, [dispatch])

  const handleDelete = (testID: string) => {
    if (testID) {
      setIsLoading(true)
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
        .finally(() => setIsLoading(false))
    }
  }

  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const columnHelper = createColumnHelper<GetTestDataResponse>()
  const columns: any = [
    columnHelper.accessor('institute_test_name', {
      size: 160,
      header: () => {
        return (
          <Flex gap="5px">
            <P>Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="5px" style={{ width: '100%' }}>
            <div>
              <TableTestsIcon />
            </div>
            <p style={{ width: '120px' }}>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('test_duration', {
      size: 110,
      header: () => {
        return (
          <>
            <Flex
              gap="5px"
              alignItems="center"
              justifyContent="center"
              style={{ marginLeft: '10px' }}
            >
              <P>Duration</P>
              <DownArrow />
            </Flex>
          </>
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
              marginLeft: '10px'
            }}
          >
            {props.getValue() ? props.getValue() : 'N/A'}
          </p>
        )
      }
    }),
    pathname !== '/v2/assessment/no-pattern-unassigned-tests' &&
      columnHelper.accessor(`_id`, {
        size: 140,
        header: () => {
          return (
            <Flex gap="8px" style={{ marginLeft: '10px' }}>
              <P>Assigned To</P>
              <DownArrow />
            </Flex>
          )
        },
        cell: (props) => {
          return props?.row?.original?.test_details?.subjects_details &&
            props?.row?.original.institute_details?.institute_name ? (
            <div
              className="ms-1"
              role="presentation"
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => {
                setShow(!show)
                setId(props?.getValue())
              }}
            >
              <p style={{ width: '180px', marginLeft: '10px' }}>
                {props?.row?.original?.test_details?.subjects_details
                  .map(
                    (ele: GetTestSubjectPayload) =>
                      ele?.teacher_details?.teacher_name
                  )
                  .filter((item: string | undefined) => item)
                  .join(',')}
              </p>
              {props?.row?.original.institute_details?.institute_name ? (
                <p style={{ marginLeft: '10px' }}>
                  {props?.row?.original.institute_details?.institute_name || ''}{' '}
                  {props?.row?.original?.branch_details[0]?.branch_name || ''}{' '}
                  {props?.row?.original?.batch_details?.length > 0 && ' . . .'}
                  {show &&
                    id === props?.row?.original?._id &&
                    props?.row?.original?.batch_details?.length > 0 && (
                      <MoreBatches>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          Batches / Sections
                          <Close
                            onClick={() => {
                              setShow(!show)
                            }}
                          />
                        </div>

                        {props?.row?.original?.batch_details?.map(
                          (item, index) => (
                            <div key={index}>
                              <BatchesMore>
                                {item.batch_name}
                                {/* {index !== subjectsLength - 1 ? ',' : ''} */}
                              </BatchesMore>
                            </div>
                          )
                        )}
                      </MoreBatches>
                    )}
                </p>
              ) : (
                ''
              )}
            </div>
          ) : (
            'N/A'
          )
        }
      }),
    pathname !== '/v2/assessment/no-pattern-unassigned-tests' &&
      columnHelper.accessor('test_start_time', {
        size: 170,
        header: () => {
          return (
            <Flex gap="8px" style={{ marginLeft: '10px', width: '150px' }}>
              <P>Test Date & Time</P>
              <DownArrow />
            </Flex>
          )
        },
        cell: (props) => {
          return (
            <Flex gap="5px" style={{ marginLeft: '10px' }}>
              {props.getValue() ? (
                <>
                  <CalendarIcon />
                  <p className="ms-1" style={{ width: '150px' }}>
                    {moment(props.getValue()).format('DD MMM, YYYY LT')}
                    {/* {moment("2024-07-01T12:00:00.000Z").format('DD MMM, YYYY LT')} */}
                  </p>
                </>
              ) : (
                <p>N/A</p>
              )}
              {/* <p>
                {moment(props.getValue()).format('DD MMM, YYYY LT')}
              </p> */}
            </Flex>
          )
        }
      }),
    columnHelper.accessor('total_marks', {
      size: 90,
      header: () => {
        return <P style={{ marginLeft: '10px' }}>Total Marks</P>
      },
      cell: (props) => {
        return (
          <p
            className="ms-1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90px',
              marginLeft: '10px'
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
          <p style={{ marginLeft: '10px', width: '60px' }}>Enable / Disable</p>
        )
      },
      cell: (props) => {
        return (
          <Form.Check
            disabled={
              props.row.original.status !== 'ASSIGNED' ||
              user.role === 'teacher'
                ? true
                : false
            }
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
        if (props.getValue() === 'ASSIGNED') {
          return (
            <ShowStatus bgColor="#01B574" style={{ marginLeft: '10px' }}>
              Assigned
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
            <ShowStatus bgColor="#fd0808" style={{ marginLeft: '10px' }}>
              Pending
            </ShowStatus>
          )
        }
      }
    }),
    columnHelper.accessor('test_details.subjects_details', {
      size: 10,
      header: '',
      cell: (props) => {
        const allQuestionsIncomplete = props.row.original?.status === 'PENDING'

        if (allQuestionsIncomplete || user.role !== 'teacher') {
          if (
            props?.row?.original.institute_details?.institute_name &&
            props?.row?.original?.branch_details?.length > 0 &&
            props?.row?.original?.batch_details?.length > 0
          ) {
            return (
              <div style={{ marginLeft: '15px' }}>
                <PopupMenu
                  id={props.row.original}
                  options={NewEditCellOption}
                />
              </div>
            )
          } else {
            return (
              <div style={{ marginLeft: '15px' }}>
                <PopupMenu id={props.row.original} options={editCellOption} />
              </div>
            )
          }
        } else {
          return (
            <div style={{ marginLeft: '15px' }}>
              <PopupMenu id={props.row.original} options={onlyEditCellOption} />
            </div>
          )
        }
      }
    })
  ].filter(Boolean)

  useEffect(() => {
    if (selectedBranch?.id) {
      let newGrade: any = []
      setGradeLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        branchId: selectedBranch?.id
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
          if (res.data.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
          setGradeData(newGrade)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }, [selectedBranch?.id])
  useEffect(() => {
    if (user.role === 'teacher') {
      setSelectedInstitute({
        id: user.instituteId,
        value: user.instituteName,
        label: user.instituteName
      })
      setSelectedBranch({
        id: user.branchId,
        value: user.branchName,
        label: user.branchName
      })
    }
  }, [
    user.branchId,
    user.branchName,
    user.instituteId,
    user.instituteName,
    user.role
  ])
  return (
    <>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={isLoading}
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
            handleChangeHeader()
          }}
          testId={testId}
        />
      )}

      {isAssignPopup && (
        <AssignInstitutePopup
          setPopup={() => {
            setLimit(limit + 1)
            setIsAssignPopup(false)
            setReassign(null)
          }}
          testId={testId}
          // assignText={assignText}
          reassignData={reassignData}
        />
      )}

      {isPrintPopupOpen && (
        <PrintPopUp setPopup={setIsPrintPopupOpen} data={printData} />
      )}

      {isDownloadPopupOpen && (
        <DownloadPopUp setPopup={setIsDownloadPopupOpen} data={printData} />
      )}

      <PageContainer>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{ marginBottom: '15px' }}
        >
          {user.role === 'superAdmin' && (
            <SearchableDropdown
              style={{ width: '290px' }}
              total={instituteTotal}
              length={instituteData.length}
              isLoader={insLoading}
              label={'Select Institute / School'}
              placeHolder={'Please Select Institute / School'}
              options={instituteData}
              isClear={selectedInstitute?.id ? true : false}
              onSelect={(option) => {
                setSelectedInstitute(option)
                setBranchData([])
                setGradeData([])
                setSelectedBranch({ id: '', label: '' })
                setSelectedGrade({ id: '', label: '' })
              }}
              selectedValue={selectedInstitute}
            />
          )}
          {(user.role === 'superAdmin' || user.role === 'instituteAdmin') && (
            <SearchableDropdown
              style={{ width: '290px' }}
              total={branchTotal}
              length={branchData.length}
              isLoader={isBranchLoading}
              label={'Select Branch'}
              placeHolder={'Please Select Branch'}
              options={branchData}
              isClear={selectedBranch?.id ? true : false}
              onSelect={(option) => {
                setSelectedBranch(option)
                setGradeData([])
                setSelectedGrade({ id: '', label: '' })
              }}
              selectedValue={selectedBranch}
            />
          )}
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
              history.push(
                pathname === ROUTES_V2.NO_PATTERN_TESTS
                  ? ROUTES_V2.TESTS
                  : pathname === ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
                  ? ROUTES_V2.ASSIGNED_TESTS
                  : pathname === ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
                  ? ROUTES_V2.UNASSIGNED_TESTS
                  : ROUTES_V2.TESTS
              )
            }}
          >
            <Heading isActive={false}>Pattern Assessment</Heading>
          </HeadingWrapper>
          <Line />
          <HeadingWrapper
            style={{ width: 'auto' }}
            onClick={() => {
              history.push(
                pathname === ROUTES_V2.TESTS
                  ? ROUTES_V2.NO_PATTERN_TESTS
                  : pathname === ROUTES_V2.ASSIGNED_TESTS
                  ? ROUTES_V2.NO_PATTERN_ASSIGNED_TESTS
                  : pathname === ROUTES_V2.UNASSIGNED_TESTS
                  ? ROUTES_V2.NO_PATTERN_UNASSIGNED_TESTS
                  : ROUTES_V2.NO_PATTERN_TESTS
              )
            }}
          >
            <Heading isActive={true}>No Pattern Assessment</Heading>
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
      </PageContainer>
    </>
  )
}

export default NoPatternTestsTable

const P = styled.p`
  cursor: pointer;
`

const TableWrapper = styled.div`
  height: 100%;
  // overflow-y: auto;

  & thead {
    position: sticky;
    top: 0px;
    margin: 0 0 0 0;
  }
`
export const ShowStatus = styled.p<{
  bgColor: string
}>`
  width: fit-content;
  padding: 0px 4px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.28px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;
`

export const MoreBatches = styled.div`
  display: block;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  min-height: 100px;
  min-width: 100px;
  max-height: 200px;
  max-width: 200px;
  position: absolute;
  z-index: 999;
  right: 0px;
  top: 35px;
  background-color: #f4f7fe;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 5px;
  border-width: 2px;
  border-color: #197bbd;
  border-style: solid;
  overflow-y: auto;
  font-weight: 700;
`

export const BatchesMore = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${DarkBlue};
  line-height: 20px;
  padding: 2px;
  margin-right: 4px;
`
export const Close = styled(CloseIcon)`
  height: 15px;
  width: 15px;
`
export const Heading = styled.p<HeadingProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => (props.isActive ? PrimaryBlue : SecondaryGray600)};
  font-family: 'DM Sans';
`
export const FullHeading = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 15px 0px;
  padding: 10px;
  background-color: white;
  width: auto;
  border-radius: 20px;
  @media (max-width: 768px) {
    height: auto;
  }

  @media (max-width: 525px) {
    flex-direction: column;
  }
`
