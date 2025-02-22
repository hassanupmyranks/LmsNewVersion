import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import {
  deletePatternApi,
  getAllInstituteAPI,
  getCourses,
  getCreatePatternDataApi,
  getHeaderTabsDataAPI,
  getNewAllBranchAPI
} from '../../../../helpers/V2/apis'
import { GetPatternResponse } from '../../../../utils/types'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'

import { ReactComponent as CreateTestIcon } from '../../../../assets/svg/create-test-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as Calendar } from '../../../../assets/svg/calendar.svg'
import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'

import styled from 'styled-components'
import moment from 'moment'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'

import { useHistory, useLocation } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
import { topHeaderValues } from '../../../../const/V2/topHeaderConsts'
import { AppDispatch, RootState } from '../../../../redux/store'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { capitalizeFirstLetter } from '../../../../helpers/V2/capitalizeFirstLetter'
import { updateTopHeader } from '../../../../redux/topHeader/actions'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'

const PatternsTable = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )
  const [tableData, setTableData] = useState<GetPatternResponse[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [conformationPopup, setConformationPopup] = useState(false)
  const [patternId, setPatternId] = useState<string | number>('')
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
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
    }
  }, [selectedInstitute?.id, dispatch, user.role])
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
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const [selectedGrade, setSelectedGrade] = useState<
    SearchableDropdownOptionData | any
  >()

  const history = useHistory()

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

  const getPatternData = useCallback(() => {
    setIsLoading(true)
    getCreatePatternDataApi({
      skip: page * limit,
      limit,
      course_id: selectedGrade?.id,
      searchKey: searchKey
    })
      .then((res) => {
        if (res) {
          setTableData(res.data)
          setEntries(res?.total || 0)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [page, limit, selectedGrade?.id, searchKey])

  useEffect(() => getPatternData(), [getPatternData])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])

  const onEditIconClick = useCallback(
    (id: string | number) => {
      history.push(`${ROUTES_V2.EDIT_TEST_PATTERN}/${id}`)
    },
    [history]
  )
  const onCreateIconClick = useCallback(
    (id: string | number) => {
      console.log('id', id)
      history.push(`${ROUTES_V2.CREATE_SCHEDULE_ASSIGN_TEST}?id=${id}`)
    },
    [history]
  )

  const handlePatternDelete = (id: string | number) => {
    setIsLoading(true)
    deletePatternApi(id)
      .then(() => {
        CustomToastMessage('Test pattern deleted successfully', 'success')
        getPatternData()
        setConformationPopup(false)
        handleChangeHeader()
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }

  const editCellOption = useMemo(
    () => [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (id: string | number) => onEditIconClick(id)
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: string | number) => {
          setConformationPopup(true)
          setPatternId(id)
        }
      },
      {
        Icon: <CreateTestIcon />,
        label: 'Create Test',
        onClick: (id: string | number) => onCreateIconClick(id)
      }
    ],
    [onEditIconClick, onCreateIconClick]
  )
  const columnHelper = createColumnHelper<GetPatternResponse>()
  const columns: ColumnDef<GetPatternResponse, any>[] = [
    columnHelper.accessor('test_name', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            <P>Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('course_details', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '110px' }}>
            <P>Grade</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        if (props.getValue()) {
          return props.getValue().course_name
        }
        return ''
      }
    }),
    columnHelper.accessor('subjects_details', {
      size: 210,
      header: 'Subjects',
      id: 'test',
      enableSorting: false,
      cell: (props) => {
        return (
          props
            .getValue()
            ?.map((ele: any) => ele.subject_name)
            .join(',') ?? ''
        )
      }
    }),
    columnHelper.accessor('test_duration', {
      header: () => {
        return (
          <Flex gap="11px" justifyContent="center" style={{ width: '100%' }}>
            <P>Duration</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return <Flex justifyContent="center">{props.getValue()}</Flex>
      }
    }),
    columnHelper.accessor('subjects_details', {
      header: () => {
        return (
          <Flex gap="11px" justifyContent="center">
            <P>Marks/Question</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => (
        <Flex gap="11px" justifyContent="center">
          {props.getValue()?.[0]?.sections
            ? props.getValue()[0].sections[0]?.marks_per_question
            : ' '}
        </Flex>
      )
    }),
    columnHelper.accessor('createdAt', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '130px' }}>
            <P>Created Date</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">
            <Calendar />
            {moment(props.getValue()).format('DD MMM, yyyy')}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('total_marks', {
      enableSorting: false,
      header: () => {
        return <Flex justifyContent="center">Total Marks</Flex>
      },
      cell: (props) => {
        return <Flex justifyContent="center">{props.getValue()}</Flex>
      }
    }),
    columnHelper.accessor('_id', {
      header: '',
      size: 25,
      cell: (props) => (
        <>
          <PopupMenu id={props.getValue()} options={editCellOption} />
        </>
      )
    })
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
      {conformationPopup && (
        <WarningPopUp
          setIsWarning={setConformationPopup}
          isLoading={isLoading}
          onDelete={() => handlePatternDelete(patternId)}
          text="Are you sure you want to delete this pattern?"
        />
      )}
      <PageContainer>
        <Flex
          direction={windowWidth < 900 ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
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
            label="Search Pattern"
            required
            placeholder="Enter Pattern Name"
            style={{ width: '430px', marginTop: '6px' }}
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

export default PatternsTable

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
