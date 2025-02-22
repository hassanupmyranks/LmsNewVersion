import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

import { ReactComponent as DownArrow } from '../../../assets/svg/darkblue-down-arrow.svg'

import styled from 'styled-components'

import BasicTable from '../../../components/V2/Table/BasicTable'

import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import {
  // BranchDetails,
  GetNewAllBatchResponce,
  NewBranchDetails
} from '../../../utils/types'

import { BlueButton } from '../../../const/V2/stylingVariables'

import {
  DeleteBatch,
  getAllBranchAPI,
  getAllInstituteAPI,
  getBatchAPI,
  getCourses
} from '../../../helpers/V2/apis'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import PopupMenu from '../../../components/V2/Table/PopupMenu'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import WarningPopUp from '../../../components/V2/PopUp/WarningPopup'
// import MultiselectDropdown from '../learn/components/MultiselectDropdown'
import {
  // DropdownOptionData,
  SearchableDropdownOptionData
} from '../../../components/V2/Form/types'
// import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import InputSearchV2 from '../../../components/V2/Form/inputSearchV2'
import ViewEyeButton from '../../../components/V2/ViewEyeButton'

const BatchList = () => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [tableData, setTableData] = useState<GetNewAllBatchResponce[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isBranchLoading, setIsBranchLoading] = useState(false)
  const history = useHistory()
  const [isWarning, setIsWarning] = useState(false)
  const [batchId, setBatchId] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<
    SearchableDropdownOptionData | any
  >()
  const [branchListPage, setBranchListPage] = useState(1)
  const [branchData, setBranchData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [branchTotal, setBranchTotal] = useState(0)
  const [instituteListPage, setInstituteListPage] = useState(1)
  const [insLoading, setInsLoading] = useState(false)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [instituteTotal, setInstituteTotal] = useState(0)
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])

  useEffect(() => {
    setIsLoading(true)
    let payload: any = {
      page: page + 1,
      limit,
      searchKey: searchKey,
      branchIds:
        userInfoV2.role === 'branchAdmin'
          ? [userInfoV2.branchId]
          : selectedBranch?.id
          ? [selectedBranch?.id]
          : '',
      instituteId: userInfoV2.instituteId || selectedInstitute?.id,
      courseId: selectedGrade?.id
    }

    getBatchAPI(payload)
      .then((res) => {
        if (res) {
          setTableData(res.data)
          setEntries(res.total)
        }
        if (res.total) {
          setEntries(res.total)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [
    page,
    limit,
    userInfoV2,
    selectedInstitute,
    searchKey,
    selectedBranch,
    selectedGrade
  ])

  useEffect(() => {
    if (userInfoV2.role === 'superAdmin' && !selectedInstitute) {
      setInsLoading(true)
      const payload = {
        page: 1,
        limit: 150
      }
      let newInstitute: any = []
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

    if (userInfoV2.role === 'instituteAdmin' && userInfoV2?.instituteId) {
      setIsBranchLoading(true)
      const payload2 = {
        page: 1,
        limit: 150,
        instituteId: userInfoV2?.instituteId
      }
      getAllBranchAPI(payload2)
        .then((res: any) => {
          setBranchTotal(res.total)
          const newInstitute = res?.data?.map((item: NewBranchDetails) => {
            return {
              id: item._id,
              label: item.name
            }
          })
          setBranchData(newInstitute)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsBranchLoading(false))
    }
  }, [selectedInstitute, userInfoV2])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])

  useEffect(() => {
    let newGrade: any = []
    if (selectedBranch?.id || userInfoV2.role === 'branchAdmin') {
      setGradeLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        branchId: selectedBranch?.id ? selectedBranch?.id : ''
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
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
          setGradeData(newGrade)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }, [selectedBranch?.id, userInfoV2.role])

  const handleDelete = (batchID: string) => {
    setIsLoading(true)
    DeleteBatch(batchID)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          setIsWarning(false)
          setIsLoading(true)
          let payload: any = {
            page: page + 1,
            limit,
            branchIds: userInfoV2.branchId ? [userInfoV2.branchId] : ''
          }

          if (userInfoV2.role === 'instituteAdmin') {
            payload = {
              page: page + 1,
              limit,
              searchKey: searchKey,
              instituteId: userInfoV2.instituteId
            }
          }

          getBatchAPI(payload)
            .then((res) => {
              setIsWarning(false)
              if (res) {
                setTableData(res.data)
                setEntries(res.total)
              }
              if (res.total) {
                setEntries(res.total)
              }
            })
            .catch((error) => console.log({ error }))
            .finally(() => setIsLoading(false))
        }
      })
      .catch((error) => {
        CustomToastMessage(error.response.data.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }

  const editCellOption = useMemo(
    () => [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (id: any) => {
          history.push(`${ROUTES_V2.EDIT_BATCH}/${id}`)
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: any) => {
          setBatchId(id)
          setIsWarning(true)
        }
      }
    ],
    [history]
  )

  const columnHelper = createColumnHelper<GetNewAllBatchResponce>()
  const columns: ColumnDef<GetNewAllBatchResponce, any>[] = [
    columnHelper.accessor('name', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Batch / Section Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('branchName', {
      size: userInfoV2.role === 'instituteAdmin' ? 300 : 0,
      header: () => {
        if (userInfoV2.role === 'instituteAdmin') {
          return (
            <Flex gap="11px" style={{ width: '125px' }}>
              <P>Branch Name</P>
            </Flex>
          )
        } else {
          return null // Return null instead of an empty string
        }
      },
      cell: (props) => {
        if (userInfoV2.role === 'instituteAdmin') {
          return (
            <Flex gap="11px">
              <p>{props.getValue()}</p>
            </Flex>
          )
        } else {
          return null // Return null instead of an empty string
        }
      }
    }),
    columnHelper.accessor('studentCount', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P> Number of Students</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('teacherCount', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P> Number of Teachers</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('isActive', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '80px' }}>
            <P>Status</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        if (props.getValue() == true) {
          return (
            <ShowStatus
              bgColor="
                rgba(1, 181, 116, 0.2)"
              color="
                rgba(1, 181, 116, 1)"
            >
              Active
            </ShowStatus>
          )
        } else {
          return (
            <ShowStatus
              bgColor="
                  rgba(231, 29, 54, 0.2)"
              color="
                  rgba(231, 29, 54, 1)"
            >
              Inactive
            </ShowStatus>
          )
        }
      }
    }),
    columnHelper.accessor('_id', {
      size: 50,
      header: () => {
        return (
          <Flex style={{ width: '80px' }}>
            <P>View</P>
          </Flex>
        )
      },
      cell: (props) => (
        <>
          <ViewEyeButton
            {...{
              clickHandler: () => {
                history.push(
                  `${ROUTES_V2.VIEW_BATCH_DETAILS}/${props.getValue()}`
                )
              },
              disabled: false
            }}
          />
        </>
      )
    }),
    columnHelper.accessor('_id', {
      size: 50,
      header: '',
      cell: (props) => (
        <>
          <PopupMenu id={props.getValue()} options={editCellOption} />
        </>
      )
    })
  ]

  const handleInfiniteScroll = (total: number, length: number) => {
    if (total > length) {
      setBranchListPage(branchListPage + 1)
      setIsLoading(true)
      const payload = {
        page: branchListPage + 1,
        limit: 50
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          setBranchTotal(res.total)
          const newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setBranchData((prev) => [...prev, ...newInstitute])
        })
        .catch((err: any) => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  const handleScrollInfinite = (total: number, length: number) => {
    if (total > length) {
      setInstituteListPage(instituteListPage + 1)
      setInsLoading(true)
      const payload = {
        page: instituteListPage + 1,
        limit: 50
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
          const newInstitute = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setInstituteData((prev) => [...prev, ...newInstitute])
        })
        .catch((err: any) => console.log(err))
        .finally(() => setInsLoading(false))
    }
  }

  return (
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={isLoading}
          onDelete={() => handleDelete(batchId)}
          text="Are you sure you want to delete this batch?"
        />
      )}

      <Flex style={{ marginBottom: '15px' }} justifyContent="space-between">
        <Flex gap="15px">
          {userInfoV2.role === 'superAdmin' && (
            <SearchableDropdown
              style={{ width: '290px', marginTop: '6px' }}
              handleScrollInfinite={(first, second) => {
                handleScrollInfinite(first, second)
              }}
              total={instituteTotal}
              length={instituteData.length}
              isLoader={insLoading}
              label={'Select Institute / School'}
              placeHolder={'Please Select Institute / School'}
              options={instituteData}
              isClear={selectedInstitute?.id ? true : false}
              onSelect={(option) => {
                setTableData([])
                setSelectedBranch({
                  value: '',
                  label: '',
                  id: ''
                })
                setSelectedGrade({
                  value: '',
                  label: '',
                  id: ''
                })
                setGradeData([])
                setBranchData([])
                setSelectedInstitute(option)
                if (option?.id) {
                  setIsBranchLoading(true)
                  getAllBranchAPI({
                    page: 1,
                    limit: 150,
                    instituteId: option?.id
                  })
                    .then((res: any) => {
                      setBranchTotal(res.total)
                      const newInstitute = res?.data?.map(
                        (item: NewBranchDetails) => {
                          return {
                            id: item._id,
                            label: item.name
                          }
                        }
                      )
                      if (res.data.length <= 0) {
                        CustomToastMessage(
                          'There are no Branches under this Institite',
                          'error'
                        )
                      }
                      setBranchData(newInstitute)
                    })
                    .catch((err: any) =>
                      CustomToastMessage(err.message, 'error')
                    )
                    .finally(() => setIsBranchLoading(false))
                }
              }}
              selectedValue={selectedInstitute}
            />
          )}
          {(userInfoV2.role === 'instituteAdmin' ||
            userInfoV2.role === 'superAdmin') && (
            <SearchableDropdown
              style={{ width: '290px', marginTop: '6px' }}
              selectedValue={selectedBranch}
              isLoader={isBranchLoading}
              handleScrollInfinite={(first, second) =>
                handleInfiniteScroll(first, second)
              }
              total={branchTotal}
              length={branchData.length}
              label={'Select Branch'}
              placeHolder="Please Select Branch"
              options={branchData}
              isClear={selectedBranch?.id ? true : false}
              onSelect={(option) => {
                setSelectedGrade({
                  value: '',
                  label: '',
                  id: ''
                })
                setGradeData([])
                setSelectedBranch(option)
              }}
            />
          )}
          <SearchableDropdown
            style={{ width: '290px', marginTop: '6px' }}
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
        </Flex>
        <InputSearchV2
          label="Search Batch / Section"
          required
          placeholder="Enter Batch / Section Name"
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
            maxHeight: '58vh',
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

export default BatchList

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

// const IconView = styled.div`
//   border-radius: 50%;
//   width: auto;
//   overflow: hidden;
// `
