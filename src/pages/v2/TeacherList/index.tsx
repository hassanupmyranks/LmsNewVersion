import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { useEffect, useState, useCallback, useMemo, ChangeEvent } from 'react'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { ReactComponent as DownArrow } from '../../../assets/svg/darkblue-down-arrow.svg'
import { ReactComponent as ReAssignIcon } from '../../../assets/svg/re-assign.svg'
import styled from 'styled-components'
import BasicTable from '../../../components/V2/Table/BasicTable'
import PopupMenu from '../../../components/V2/Table/PopupMenu'
import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { Spinner } from 'react-bootstrap'
import {
  // BatchDetails,
  GetNewAllTeacherResponce,
  NewBatchDetails,
  NewBranchDetails
} from '../../../utils/types'
import {
  DeleteUsersV2API,
  getNewAllStudentAPI
} from '../../../redux/addStudentV2/api'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
  // DropdownOptionData,
  SearchableDropdownOptionData
} from '../../../components/V2/Form/types'
import {
  getAllBranchAPI,
  getAllInstituteAPI,
  getBatchAPI,
  getCourses,
  getSubjectData
} from '../../../helpers/V2/apis'
// import MultiselectDropdown from '../learn/components/MultiselectDropdown'
// import { getDropDownOptions } from '../../../helpers/V2/dropdown'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import WarningPopUp from '../../../components/V2/PopUp/WarningPopup'
import InputSearchV2 from '../../../components/V2/Form/inputSearchV2'
import ViewEyeButton from '../../../components/V2/ViewEyeButton'

const TeacherListV2 = () => {
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )
  const history = useHistory()
  const [tableData, setTableData] = useState<GetNewAllTeacherResponce[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [selectedBatch, setSelectedBatch] =
    useState<SearchableDropdownOptionData>()
  const [batch, setBatch] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [isBatchLoading, setIsBatchLoading] = useState(false)

  const [insLoading, setInsLoading] = useState(false)
  const [instituteListPage, setInstituteListPage] = useState(1)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [instituteTotal, setInstituteTotal] = useState(0)

  const [batchListPage, setBatchListPage] = useState(1)
  const [batchTotal, setBatchTotal] = useState(0)
  const [isWarning, setIsWarning] = useState(false)
  const [studentId, setStudentId] = useState('')

  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()

  const [branchLoading, setBranchLoading] = useState(false)
  const [branchData, setBranchData] = useState<any[]>([])
  const [subject, setSubject] = useState<any[]>([])
  const [gradeData, setGradeData] = useState<any[]>([])
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)

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
      setSelectedBranch({
        id: user.branchId,
        value: user.branchName,
        label: user.branchName
      })
    } else if (user.role === 'instituteAdmin' && user.instituteId) {
      setBranchLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        instituteId: user.instituteId
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          const newBranch = res?.data?.map((branch: NewBranchDetails) => {
            return {
              label: branch.name,
              id: branch?._id,
              value: ''
            }
          })
          setBranchData(newBranch)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Branches under this Institute',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    } else if (user.role === 'superAdmin' && selectedInstitute?.id) {
      setBranchLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        instituteId: selectedInstitute?.id
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          const newBranch = res?.data?.map((branch: NewBranchDetails) => {
            return {
              label: branch.name,
              id: branch?._id,
              value: ''
            }
          })
          setBranchData(newBranch)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Branches under this Institute',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute?.id, user])

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
          if (res.data.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }, [selectedBranch?.id])

  useEffect(() => {
    if (selectedGrade?.id) {
      setSubjectLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        courseId: selectedGrade?.id
      }
      getSubjectData(payload)
        .then((res: any) => {
          const newSubject = res?.map((Subject: any) => {
            return {
              label: Subject.name,
              id: Subject?._id,
              value: ''
            }
          })
          setSubject(newSubject)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedGrade?.id])

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
      role: 'teacher',
      searchKey: searchKey,
      instituteId: selectedInstitute?.id ? selectedInstitute?.id : '',
      branchId: selectedBranch?.id ? selectedBranch?.id : '',
      subjectId: selectedSubject?.id ? selectedSubject?.id : '',
      courseId: selectedGrade?.id ? selectedGrade?.id : '',
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
    selectedGrade?.id,
    selectedSubject?.id
  ])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])
  const onEditIconClick = useCallback(
    (id: string | number) => {
      history.push(`${ROUTES_V2.EDIT_TEACHER}/${id}`)
    },
    [history]
  )

  const handleDelete = (id: string) => {
    setIsLoading(true)
    DeleteUsersV2API(id)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          getNewAllStudentAPI({
            page: page + 1,
            limit,
            role: 'teacher'
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
        onClick: (id: string | number) => {
          history.push(`${ROUTES_V2.ASSIGN_TEACHER}/${id}`)
        }
      },
      {
        Icon: <ReAssignIcon />,
        label: 'Assign',
        onClick: (id: string | number) => {
          history.push(`${ROUTES_V2.ASSIGN_TEACHER}/${id}`)
        }
      }
    ],
    [onEditIconClick, history]
  )

  const columnHelper = createColumnHelper<GetNewAllTeacherResponce>()
  const columns: ColumnDef<GetNewAllTeacherResponce, any>[] = [
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
          <Flex gap="11px" style={{ width: '130px' }}>
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
    // columnHelper.accessor('batchName', {
    //   header: () => {
    //     return (
    //       <Flex gap="11px" style={{ width: '180px' }}>
    //         <P>Batch / Section & Grade</P>
    //         <DownArrow />
    //       </Flex>
    //     )
    //   },
    //   cell: (props) => {
    //     const courseName = props.row.original.courseName
    //     return (
    //       <Flex gap="11px" style={{ width: '150px' }}>
    //         <p>
    //           {props.getValue()} {courseName}
    //         </p>
    //       </Flex>
    //     )
    //   }
    // }),
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
                history.push(`${ROUTES_V2.VIEW_TEACHER}/${props.getValue()}`)
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

  const handleInfiniteScrollBatch = (total: number, length: number) => {
    if (total > length) {
      setIsBatchLoading(true)
      setBatchListPage(batchListPage + 1)
      const payload = {
        page: batchListPage + 1,
        limit: 50,
        instituteId:
          user.role == 'instituteAdmin'
            ? user.instituteId
            : selectedInstitute?.id,
        branchId: user.role == 'branchAdmin' ? user.branchId : ''
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
        .catch((err: any) => console.log(err))
        .finally(() => setIsBatchLoading(false))
    }
  }

  return (
    <PageContainer style={{ height: '100%', overflow: 'auto' }}>
      <Flex
        alignItems="end"
        gap="10px"
        style={{ marginBottom: '15px' }}
        justifyContent="space-between"
        wrap
      >
        <Flex gap="10px" wrap>
          {user.role === 'superAdmin' && (
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
                setSelectedBatch({ id: '', label: '', value: '' })
                setSelectedGrade({ id: '', label: '', value: '' })
                setSelectedSubject({ id: '', label: '', value: '' })
                setSelectedBranch({ id: '', label: '', value: '' })
                setBranchData([])
                setBatch([])
                setGradeData([])
                setSubject([])
              }}
              selectedValue={selectedInstitute}
            />
          )}

          {(user.role === 'instituteAdmin' || user.role === 'superAdmin') && (
            <SearchableDropdown
              style={{ width: '290px' }}
              isLoader={branchLoading}
              label={'Select Branch'}
              placeHolder="Please Select Branch"
              options={branchData}
              isClear={selectedBranch?.id ? true : false}
              onSelect={(option: any) => {
                setSelectedBatch({
                  value: '',
                  label: '',
                  id: ''
                })
                setSelectedGrade({ id: '', label: '', value: '' })
                setSelectedSubject({ id: '', label: '', value: '' })
                setSelectedBranch(option)
                setBatch([])
                setGradeData([])
                setSubject([])
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
              setSelectedBatch({
                value: '',
                label: '',
                id: ''
              })
              setBatch([])
              setSubject([])
              setSelectedSubject({ id: '', label: '', value: '' })
            }}
            selectedValue={selectedGrade}
          />

          <SearchableDropdown
            style={{ width: '280px' }}
            isLoader={subjectLoading}
            label="Select Subject"
            placeHolder="Please Select Subject"
            options={subject}
            isClear={selectedSubject?.id ? true : false}
            onSelect={(data: any) => {
              setSelectedSubject(data)
              setBatch([])
            }}
            selectedValue={selectedSubject}
          />
          <SearchableDropdown
            style={{ width: '280px' }}
            isLoader={isBatchLoading}
            label="Select Batch / Section"
            placeHolder="Enter or select Batch / Section"
            options={batch}
            isClear={selectedBatch?.id ? true : false}
            total={batchTotal}
            length={batch.length}
            handleScrollInfinite={(first: any, second: any) => {
              handleInfiniteScrollBatch(first, second)
            }}
            onSelect={(data: any) => {
              setSelectedBatch(data)
            }}
            selectedValue={selectedBatch}
          />
        </Flex>

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
        {isWarning && (
          <WarningPopUp
            setIsWarning={setIsWarning}
            isLoading={isLoading}
            onDelete={() => handleDelete(studentId)}
            text="Are you sure you want to delete this teacher?"
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

export default TeacherListV2

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
