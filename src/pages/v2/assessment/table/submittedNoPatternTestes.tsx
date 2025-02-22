import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useState } from 'react'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'

// import { ReactComponent as CopyIcon } from '../../../../assets/svg/copy.svg'
// import { ReactComponent as CalendarIcon } from '../../../../assets/svg/calendar.svg'
import { ReactComponent as TableTestsIcon } from '../../../../assets/svg/tests-table-icon.svg'

import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'

import styled from 'styled-components'
import {
  getAllInstituteAPI,
  getCourses,
  getNewAllBranchAPI,
  getNewAllTestData
  // getNoPatternAllTestData
} from '../../../../helpers/V2/apis'
import { BlueButton } from '../../../../const/V2/stylingVariables'
// import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { Spinner } from 'react-bootstrap'
import { GetTestsSubmittedData } from '../../../../utils/types'
import { createTestDetails } from '../../../../redux/create_schedule_assign_test/actions'
import { initialState } from '../../../../redux/create_schedule_assign_test/types'
//   import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { useHistory, useLocation } from 'react-router-dom'
import OnlineList from './onlineList'
import { FullHeading, Heading } from './noPatternTest'
import { HeadingWrapper, Line } from '../../addAssignment/styledComponents'
import ROUTES_V2 from '../../../../const/V2/routes'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'

const SubmittedNoPatternTestsTable = () => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [tableData, setTableData] = useState<GetTestsSubmittedData[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [showOnline, setShowOnline] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const [onlineTestId, setOnlineTestId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
  const [searchKey, setSearchKey] = useState('')
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [branchData, setBranchData] = useState<any[]>([])
  const [isBranchLoading, setIsBranchLoading] = useState(false)
  const [branchTotal, setBranchTotal] = useState(0)
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()

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
  }, [
    user.instituteId,
    user.role,
    user.branchName,
    user.branchId,
    user.instituteName
  ])

  useEffect(() => {
    if (user.role === 'instituteAdmin' || user.role === 'superAdmin') {
      if (selectedInstitute?.id) {
        const payload = {
          page: 1,
          limit: 50,
          instituteId: selectedInstitute?.id
        }
        setIsBranchLoading(true)
        dispatch(getNewAllBranchAPI(payload))
          .then((data: any) => {
            setBranchTotal(data?.total)
            const branch = data.payload.data.map((res: any) => ({
              label: res.name,
              id: res._id,
              value: res.name
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
    }
  }, [selectedInstitute?.id, dispatch, user.role])

  const { pathname } = useLocation()
  const history = useHistory()

  const OnlineTestList = (id: any) => {
    setShowOnline(true)
    setOnlineTestId(id)
  }

  useEffect(() => {
    setIsLoading(true)
    getNewAllTestData({
      course_id: selectedGrade.id,
      skip: page * limit,
      limit,
      withoutPattern: false,
      show_only_user_created_tests:
        pathname === '/v2/assessment/assigned-test'
          ? undefined
          : pathname === '/v2/assessment/unassigned-test'
          ? undefined
          : false,
      isAssigned:
        pathname === '/v2/assessment/assigned-test'
          ? true
          : pathname === '/v2/assessment/unassigned-test'
          ? false
          : undefined,
      searchKey: searchKey
    })
      .then((res) => {
        if (res) {
          setTableData(res?.data)
          setEntries(res?.total)
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setIsLoading(false))
  }, [page, limit, user, pathname, selectedGrade.id, searchKey])
  /** @todo This will be used for sorting (When Changes are done from backend)  */
  //   useEffect(() => {}, [sorting])

  useEffect(() => {
    dispatch(createTestDetails(initialState))
  }, [dispatch])

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
      size: 160,
      header: () => {
        return (
          <Flex gap="8px">
            <P>Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            <TableTestsIcon />
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('courseName', {
      size: 110,
      header: () => {
        return (
          <Flex gap="8px" style={{ marginLeft: '10px' }}>
            <P>Grade</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px', marginLeft: '10px' }}>
            <p>{props?.getValue()}</p>
          </Flex>
        )
      }
    }),
    ...(user.role === 'superAdmin'
      ? [
          columnHelper.accessor('instituteName', {
            size: 100,
            header: () => {
              return (
                <Flex style={{ marginLeft: '10px' }}>
                  <P>Institute</P>
                </Flex>
              )
            },
            cell: (props) => {
              return (
                <p style={{ width: '150px', marginLeft: '10px' }}>
                  {props.getValue()}
                </p>
              )
            }
          })
        ]
      : []),
    ...(user.role === 'superAdmin' || user.role === 'instituteAdmin'
      ? [
          columnHelper.accessor('branchName', {
            size: 100,
            header: () => {
              return (
                <Flex style={{ marginLeft: '10px' }}>
                  <P>Branch</P>
                </Flex>
              )
            },
            cell: (props) => {
              return (
                <p style={{ width: '150px', marginLeft: '10px' }}>
                  {props.getValue()}
                </p>
              )
            }
          })
        ]
      : []),
    columnHelper.accessor('batches', {
      size: 100,
      header: () => {
        return (
          <Flex style={{ marginLeft: '10px' }}>
            <P>Batch / Section</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <p style={{ width: '150px', marginLeft: '10px' }}>
            {props
              .getValue()
              .map((ele: any) => ele.batchName)
              .join(',')}
          </p>
        )
      }
    }),
    // columnHelper.accessor('averageScore', {
    //   size: 110,
    //   header: () => {
    //     return (
    //       <Flex gap="8px">
    //         <P>Average Score</P>
    //       </Flex>
    //     )
    //   }
    // }),
    columnHelper.accessor('duration', {
      size: 100,
      header: () => {
        return (
          <Flex gap="8px" style={{ marginLeft: '10px' }}>
            <P>Duration</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ marginLeft: '10px' }}>
            <p>{props?.getValue()}</p>
          </Flex>
        )
      }
    }),
    // columnHelper.accessor('submittedOn', {
    //   size: 170,
    //   header: () => {
    //     return (
    //       <Flex gap="8px">
    //         <P>Submitted Date & Time</P>
    //         <DownArrow />
    //       </Flex>
    //     )
    //   },
    //   cell: (props) => {
    //     return (
    //       <Flex gap="8px">
    //         <CalendarIcon />
    //         <p>{moment(props.getValue()).format('DD MMM, YYYY LT')}</p>
    //       </Flex>
    //     )
    //   }
    // }),
    columnHelper.accessor('totalMarks', {
      size: 110,
      header: () => {
        return <p style={{ width: '90px', marginLeft: '10px' }}>Total Marks</p>
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ marginLeft: '10px' }}>
            <p>{props?.getValue()}</p>
          </Flex>
        )
      }
    }),
    // columnHelper.accessor('submissionPercentage', {
    //   size: 130,
    //   header: 'Submission (%)',
    //   cell: (props) => {
    //     if (props.getValue()) {
    //       return (
    //         <Flex style={{ gap: '11px', fontWeight: '700', color: `${Blue}` }}>
    //           <CopyIcon
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => {
    //               navigator.clipboard.writeText(props.getValue())
    //               CustomToastMessage('Copied to clipboard!', 'success')
    //             }}
    //           />{' '}
    //           <p>{props.getValue()}</p>
    //         </Flex>
    //       )
    //     } else {
    //       return <p>{props.getValue()}</p>
    //     }
    //   }
    // }),
    columnHelper.accessor('_id', {
      size: 160,
      header: '',
      cell: (props) => {
        const submittedTestId = props.getValue()
        const currentTime = new Date().toISOString()
        const isButtonDisabled =
          props?.row?.original?.endTime > currentTime
            ? props?.row?.original?.testStartedCount == 0
              ? true
              : false
            : true
        return (
          <Flex gap="11px" style={{ margin: '0px 10px' }}>
            <AnalyticsButton
              onClick={() =>
                !isButtonDisabled && OnlineTestList(submittedTestId)
              }
              style={{
                background: 'none',
                border: 'none',
                cursor: isButtonDisabled ? 'default' : 'pointer',
                padding: '0',
                display: 'flex',
                gap: '6px',
                alignItems: 'center'
              }}
            >
              Online
              <OnlineActive isActive={!isButtonDisabled} />
            </AnalyticsButton>
          </Flex>
        )
      }
    })

    //   columnHelper.accessor('_id', {
    //     size: 160,
    //     header: '',
    //     cell: (props) => {
    //       const submittedTestId = props.getValue()
    //       const batchDetails = props.row.original.batch_details
    //       return (
    //         <Flex gap="11px" style={{ margin: '0px 10px' }}>
    //           <AnalyticsButton
    //             onClick={() => AnalyticsList(submittedTestId, batchDetails)}
    //             style={{
    //               background: 'none',
    //               border: 'none',
    //               cursor: 'pointer',
    //               padding: '0'
    //             }}
    //           >
    //             Analytics
    //           </AnalyticsButton>
    //         </Flex>
    //       )
    //     }
    //   })
  ]

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
          setGradeData(newGrade)
          if (res?.data?.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
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
      {showOnline && (
        <OnlineList
          setPopup={() => {
            setShowOnline(false)
          }}
          testId={onlineTestId}
          pathname={pathname}
        />
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
              history.push(ROUTES_V2.SUBMITTED_TESTS)
            }}
          >
            <Heading isActive={false}>Pattern Assessment</Heading>
          </HeadingWrapper>
          <Line />
          <HeadingWrapper
            style={{ width: 'auto' }}
            onClick={() => {
              history.push(ROUTES_V2.NO_PATTERN_SUBMITTED_TESTS)
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
                top: '50%',
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

export default SubmittedNoPatternTestsTable

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
const AnalyticsButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  font-family: 'DM Sans';
  color: #1376b9;
`

const OnlineActive = styled.div<{ isActive: boolean }>`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.isActive ? '#66CC33' : '#bfcddb')};
  border-radius: 50%;
`
