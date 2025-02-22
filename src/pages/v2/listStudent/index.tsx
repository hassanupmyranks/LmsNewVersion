import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { useEffect, useState, useCallback, useMemo, ChangeEvent } from 'react'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { ReactComponent as Calendar } from '../../../assets/svg/calendar.svg'
import { ReactComponent as DownArrow } from '../../../assets/svg/darkblue-down-arrow.svg'
import { ReactComponent as ReAssignIcon } from '../../../assets/svg/re-assign.svg'
import styled from 'styled-components'
import moment from 'moment'
import BasicTable from '../../../components/V2/Table/BasicTable'
import PopupMenu from '../../../components/V2/Table/PopupMenu'
import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import {
  // BatchDetails,
  GetNewAllstudentResponce,
  NewBatchDetails
} from '../../../utils/types'
import {
  DeleteUsersV2API,
  getNewAllStudentAPI
} from '../../../redux/addStudentV2/api'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { PopupViewer } from '../addstudent/stylecomponent'
import EditAssignStudentPopUp from '../addstudent/EditAssignPopup'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import {
  // DropdownOptionData,
  SearchableDropdownOptionData
} from '../../../components/V2/Form/types'
import {
  getAllInstituteAPI,
  getBatchAPI,
  getBatchCourses,
  // getNewAllBatchAPI,
  getNewAllBranchAPI
} from '../../../helpers/V2/apis'
// import MultiselectDropdown from '../learn/components/MultiselectDropdown'
// import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import WarningPopUp from '../../../components/V2/PopUp/WarningPopup'
import SubjectsAssignPopUp from '../addstudent/SubjectsAssignPopup'
import InputSearchV2 from '../../../components/V2/Form/inputSearchV2'
import ViewEyeButton from '../../../components/V2/ViewEyeButton'

const StudentListV2 = () => {
  const dispatch: AppDispatch = useDispatch()

  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )
  const history = useHistory()
  const [tableData, setTableData] = useState<GetNewAllstudentResponce[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [popup, setpopup] = useState(false)
  const [passId, setPassId] = useState<any>()
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [selectedBatch, setSelectedBatch] =
    useState<SearchableDropdownOptionData>()
  const [batch, setBatch] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [isBatchLoading, setIsBatchLoading] = useState(false)

  const [insLoading, setInsLoading] = useState(false)
  const [instituteListPage, setInstituteListPage] = useState(1)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [branchData, setBranchData] = useState<any[]>([])
  const [isBranchLoading, setIsBranchLoading] = useState(false)
  const [instituteTotal, setInstituteTotal] = useState(0)
  const [branchTotal, setBranchTotal] = useState(0)
  const [gradeData, setGradehData] = useState<any[]>([])
  const [isGradeLoading, setIsGradeLoading] = useState(false)
  const [gradeTotal, setGradeTotal] = useState(0)
  const [batchListPage, setBatchListPage] = useState(1)
  const [batchTotal, setBatchTotal] = useState(0)
  const [isWarning, setIsWarning] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [subjectsAssignPopup, setSubjectsAssignPopup] = useState(false)

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
  }, [user])

  useEffect(() => {
    if (selectedGrade?.id) {
      setIsBatchLoading(true)
      const payload = {
        page: 1,
        limit: 50,
        courseId: selectedGrade?.id,
        branchIds: [String(selectedBranch?.id)]
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
  }, [selectedGrade?.id, selectedBranch])

  useEffect(() => {
    setIsLoading(true)
    getNewAllStudentAPI({
      page: page + 1,
      limit,
      role: 'student',
      searchKey: searchKey,
      instituteId: selectedInstitute?.id,
      branchId: selectedBranch?.id,
      courseId: selectedGrade?.id,
      batchId: selectedBatch?.id
    })
      .then((res) => {
        setTableData(res.data)
        setEntries(res.total)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [
    page,
    limit,
    searchKey,
    selectedInstitute?.id,
    selectedBatch,
    selectedBranch?.id,
    selectedGrade?.id
  ])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])
  const onEditIconClick = useCallback(
    (id: string | number) => {
      history.push(`${ROUTES_V2.EDIT_STUDENT}/${id}`)
    },
    [history]
  )
  const editId = useCallback((id: string | number) => {
    setpopup(true)
    setPassId(id)
  }, [])

  const handleDelete = (id: string) => {
    setIsLoading(true)
    DeleteUsersV2API(id)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          const ids = [String(selectedBatch?.id ? selectedBatch?.id : '')]

          getNewAllStudentAPI({
            page: page + 1,
            limit,
            role: 'student',
            searchKey: searchKey,
            instituteId: selectedInstitute?.id,
            branchId: selectedBranch?.id,
            courseId: selectedGrade?.id,
            batchId:
              Array.isArray(ids) && ids.length === 1 && ids[0] === '' ? '' : ids
          })
            .then((res) => {
              if (res) {
                setTableData(res.data)
              }
              if (res.total) {
                setEntries(res.total)
              }
            })
            .catch((error) => CustomToastMessage(error.message, 'error'))
            .finally(() => setIsLoading(false))
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => {
        setIsWarning(false)
        setStudentId('')
        setIsLoading(false)
      })
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
        onClick: (id: any) => {
          setIsWarning(true)
          setStudentId(id)
        }
      },
      {
        Icon: <ReAssignIcon />,
        label: 'Re-Assign',
        onClick: (id: string | number) => editId(id)
      },
      {
        Icon: <ReAssignIcon />,
        label: 'Subjects Assign',
        onClick: (id: string | number) => {
          setPassId(id)
          setSubjectsAssignPopup(true)
        }
      }
    ],
    [onEditIconClick, editId]
  )

  const columnHelper = createColumnHelper<GetNewAllstudentResponce>()
  const columns: ColumnDef<GetNewAllstudentResponce, any>[] = [
    columnHelper.accessor('firstName', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        // const image = props.row.original.profileImage
        const last = props.row.original.lastName
        return (
          <Flex gap="11px" style={{ width: '125px' }}>
            {/* <IconView>
              <img width="25px" src={image} alt="" />
            </IconView> */}
            <p>
              {props.getValue()} {last}
            </p>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('username', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '100px' }}>
            <P>User Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('gender', {
      header: () => {
        return (
          <Flex gap="11px">
            <P>Gender</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        if (props.getValue() == 'male') {
          return (
            <ShowStatus
              bgColor="
            rgba(91, 147, 255, 0.2)"
              color="
            rgba(91, 147, 255, 1)"
            >
              Male
            </ShowStatus>
          )
        } else {
          return (
            <ShowStatus
              bgColor="
            rgba(255, 143, 107, 0.2)"
              color="
            rgba(255, 143, 107, 1)"
            >
              Female
            </ShowStatus>
          )
        }
      }
    }),
    columnHelper.accessor('instituteName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '180px' }}>
            <P> Institute / School Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    // columnHelper.accessor('mobile', {
    //   header: () => {
    //     return (
    //       <Flex gap="11px" style={{ width: '130px' }}>
    //         <P>Phone Number</P>
    //       </Flex>
    //     )
    //   },
    //   cell: (props) => {
    //     return <Flex>{props.getValue() ? props.getValue() : 'N/A'}</Flex>
    //   }
    // }),
    columnHelper.accessor('branchName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P>Branch Name</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('batchName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P>Batch / Section</P>
            <DownArrow />
          </Flex>
        )
      }
    }),
    columnHelper.accessor('dateOfJoining', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Joining Date</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '120px' }}>
            {props.getValue() && <Calendar />}
            {props.getValue()
              ? moment(props.getValue()).format('DD MMM, yyyy')
              : '-'}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('isActive', {
      header: () => {
        return (
          <Flex gap="11px">
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
          <Flex>
            <P>View</P>
          </Flex>
        )
      },
      cell: (props) => (
        <>
          <ViewEyeButton
            {...{
              clickHandler: () => {
                history.push(`${ROUTES_V2.VIEW_STUDENT}/${props.getValue()}`)
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PopupMenu id={props.getValue()} options={editCellOption} />
        </div>
      )
    })
  ]

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
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setInsLoading(false))
    }
  }

  const handleInfiniteScrollBatch = (total: number, length: number) => {
    if (total > length) {
      setIsBatchLoading(true)
      setBatchListPage(batchListPage + 1)
      const payload = {
        page: 1,
        limit: 50,
        branchId:
          user.role == 'branchAdmin'
            ? [String(user.branchId)]
            : [String(selectedBranch?.id)],
        courseId: selectedGrade?.id
      }
      getBatchAPI(payload)
        .then((res: any) => {
          const newBatch = res?.data?.map((batch: NewBatchDetails) => {
            return {
              label: batch.name,
              id: batch?._id,
              value: ''
            }
          })
          setBatch((prev) => [...prev, ...newBatch])
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsBatchLoading(false))
    }
  }

  useEffect(() => {
    if (selectedInstitute?.id || user.role === 'instituteAdmin') {
      const payload = {
        page: 1,
        limit: 50,
        instituteId: selectedInstitute?.id || user.instituteId
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
              'There are no Branches under this Institue',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsBranchLoading(false))
    }
  }, [selectedInstitute?.id, dispatch, user])

  useEffect(() => {
    if (selectedBranch?.id || user.branchId) {
      const payload = {
        branchId: selectedBranch?.id
          ? String(selectedBranch?.id)
          : user.branchId
      }
      setIsGradeLoading(true)
      getBatchCourses(payload)
        .then((res) => {
          setGradeTotal(res.data.total)
          if (res) {
            const Course = res?.data?.map((data: any) => ({
              id: data?._id,
              label: data?.name,
              value: ''
            }))
            if (res.data.length <= 0) {
              CustomToastMessage(
                'There are no Grades under this Branch',
                'error'
              )
            }
            setGradehData(Course)
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsGradeLoading(false))
    }
  }, [selectedBranch?.id, user.branchId])

  return (
    <PageContainer style={{ height: '100%', overflow: 'auto' }}>
      <Flex
        alignItems="center"
        gap="10px"
        wrap
        style={{ marginBottom: '15px' }}
        justifyContent="space-between"
      >
        <FilterContainer
        // style={
        //   resWidth >= 768
        //     ? { display: 'flex', gap: '1%' }
        //     : {
        //         display: 'flex',
        //         gap: '1%',
        //         flexDirection: 'column',
        //         columnGap: '10px'
        //       }
        // }
        >
          {user.role === 'superAdmin' && (
            <>
              <SearchableDropdown
                style={{ width: '290px' }}
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
                  setSelectedInstitute(option)
                  setSelectedBranch({ id: '', label: '', value: '' })
                  setSelectedGrade({ id: '', label: '', value: '' })
                  setSelectedBatch({ id: '', label: '', value: '' })
                  setBranchData([])
                  setGradehData([])
                  setBatch([])
                }}
                selectedValue={selectedInstitute}
              />
            </>
          )}
          {(user.role === 'superAdmin' || user.role === 'instituteAdmin') && (
            <SearchableDropdown
              style={{ width: '290px' }}
              handleScrollInfinite={(first, second) => {
                handleScrollInfinite(first, second)
              }}
              total={branchTotal}
              length={branchData.length}
              isLoader={isBranchLoading}
              label={'Select Branch'}
              placeHolder={'Please Select Branch'}
              options={branchData}
              isClear={selectedBranch?.id ? true : false}
              onSelect={(option) => {
                setSelectedBranch(option)
                setSelectedGrade({ id: '', label: '', value: '' })
                setSelectedBatch({ id: '', label: '', value: '' })
                setGradehData([])
                setBatch([])
              }}
              selectedValue={selectedBranch}
            />
          )}
          <SearchableDropdown
            style={{ width: '290px' }}
            handleScrollInfinite={(first, second) => {
              handleScrollInfinite(first, second)
            }}
            total={gradeTotal}
            length={gradeData.length}
            isLoader={isGradeLoading}
            label={'Select Grade'}
            placeHolder={'Please Select Grade'}
            options={gradeData}
            isClear={selectedGrade?.id ? true : false}
            onSelect={(option) => {
              setSelectedGrade(option)
              setSelectedBatch({ id: '', label: '', value: '' })
              setBatch([])
            }}
            selectedValue={selectedGrade}
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
            handleScrollInfinite={(first: any, second: any) => {
              handleInfiniteScrollBatch(first, second)
            }}
            onSelect={(data: any) => {
              setSelectedBatch(data)
            }}
            selectedValue={selectedBatch}
          />
        </FilterContainer>
        <InputSearchV2
          label="Search Name/Username"
          required
          placeholder="Enter Name/Username"
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
      <TableWrapper>
        {subjectsAssignPopup && passId && (
          <PopupViewer>
            <SubjectsAssignPopUp
              id={passId}
              setpopup={() => {
                setSubjectsAssignPopup(false)
                setLimit(limit + 1)
              }}
            />
          </PopupViewer>
        )}

        {popup == true && passId ? (
          <PopupViewer>
            <EditAssignStudentPopUp
              id={passId}
              setpopup={() => {
                setpopup(false)
                setLimit(limit + 1)
              }}
            />
          </PopupViewer>
        ) : (
          ''
        )}

        {isWarning && (
          <WarningPopUp
            setIsWarning={setIsWarning}
            isLoading={isLoading}
            onDelete={() => handleDelete(studentId)}
            text="Are you sure you want to delete this student?"
          />
        )}

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

export default StudentListV2

const P = styled.p`
  cursor: pointer;
`

const TableWrapper = styled.div`
  // height: 100%;
  // overflow-y: auto;

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

const FilterContainer = styled.div`
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: white;
  /* padding: 0 20px; */
  // position: fixed;
  top: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`
