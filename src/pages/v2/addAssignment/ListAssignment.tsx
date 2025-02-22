import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { useEffect, useState, ChangeEvent, useMemo } from 'react'
import { ReactComponent as DownArrow } from '../../../assets/svg/darkblue-down-arrow.svg'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/Delete.svg'
import { ReactComponent as AssignIcon } from '../../../assets/svg/assign.svg'
import styled from 'styled-components'
import moment from 'moment'
import BasicTable from '../../../components/V2/Table/BasicTable'
import { Flex, PageContainer } from '../../../components/V2/styledComponents'
import { Form, Spinner } from 'react-bootstrap'
import { NewBatchDetails, NewBranchDetails } from '../../../utils/types'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { PopupViewer } from '../addstudent/stylecomponent'
import EditAssignStudentPopUp from '../addstudent/EditAssignPopup'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'

import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { SearchableDropdownOptionData } from '../../../components/V2/Form/types'
import {
  deleteAssignment,
  getAllBranchAPI,
  getAllInstituteAPI,
  getAllReviewAssignmentData,
  getBatchAPI,
  getChapterData,
  getCourses,
  getSubjectData
} from '../../../helpers/V2/apis'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import WarningPopUp from '../../../components/V2/PopUp/WarningPopup'
import AssignAssignmentPopup from '../../../components/V2/PopUp/AssignAssignment'
import PopupMenu from '../../../components/V2/Table/PopupMenu'
import { useHistory } from 'react-router-dom'
import { MyText } from './styledComponents'
import InputSearchV2 from '../../../components/V2/Form/inputSearchV2'
import ROUTES_V2 from '../../../const/V2/routes'

const ListAssignment = () => {
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )
  const history = useHistory()
  const [tableData, setTableData] = useState<any>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [popup, setpopup] = useState(false)
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [selectedBatch, setSelectedBatch] =
    useState<SearchableDropdownOptionData>()
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [selectedChapter, setSelectedChapter] =
    useState<SearchableDropdownOptionData>()
  const [instituteListPage, setInstituteListPage] = useState(0)
  const [branchListPage, setBranchListPage] = useState(0)
  const [batchListPage, setBatchListPage] = useState(0)
  const [instituteTotal, setInstituteTotal] = useState(0)
  const [branchTotal, setBranchTotal] = useState(0)
  const [batchTotal, setBatchTotal] = useState(0)
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [branchData, setBranchData] = useState<any[]>([])
  const [batch, setBatch] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [insLoading, setInsLoading] = useState(false)
  const [branchLoading, setBranchLoading] = useState(false)
  const [isBatchLoading, setIsBatchLoading] = useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [gradeTotal, setGradeTotal] = useState(0)
  const [subjectTotal, setSubjectTotal] = useState(0)
  const [chapterTotal, setChapterTotal] = useState(0)
  const [subject, setSubject] = useState<any[]>([])
  const [chapter, setChapter] = useState<any[]>([])
  const [gradeData, setGradeData] = useState<any[]>([])
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [chapterLoading, setChapterLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeListPage, setGradeListPage] = useState(0)
  const [subjectListPage, setSubjectListPage] = useState(0)
  const [chapterListPage, setChapterListPage] = useState(0)
  const [isAssignPopup, setIsAssignPopup] = useState(false)
  const [assignmentId, setAssignmentId] = useState('')
  const [assignmentData, setAssignmentData] = useState('')

  const [typeAssignment, setTypeAssignment] = useState('')
  const [adminAssignments, setAdminAssignments] = useState(false)

  const [assignmentAPILoading, setAssignmentAPILoading] = useState(false)

  // const [types] = useState<any[]>([
  //   {
  //     id: 'project',
  //     label: 'Project'
  //   },
  //   // {
  //   //   id: 'assignmentTest',
  //   //   label: 'Test'
  //   // },
  //   { id: 'audio', label: 'Audio' },
  //   { id: 'video', label: 'Video' },
  //   { id: 'presentation', label: 'Presentation' }
  // ])
  // const [selectedType, setSelectedType] = useState({
  //   id: '',
  //   label: ''
  // })

  useEffect(() => {
    setAssignmentAPILoading(true)
    getAllReviewAssignmentData({
      page: page + 1,
      limit,
      searchkey: searchKey,
      instituteId: selectedInstitute?.id ? selectedInstitute?.id : '',
      branchId: selectedBranch?.id ? selectedBranch?.id : '',
      batchId: selectedBatch?.id ? selectedBatch?.id : '',
      subjectId: selectedSubject?.id ? selectedSubject?.id : '',
      courseId: selectedGrade?.id ? selectedGrade?.id : '',
      chapterId: selectedChapter?.id ? selectedChapter?.id : '',
      admin_created: adminAssignments
      // type: selectedType.id
    })
      .then((res) => {
        setTableData(res?.data)
        setEntries(res.total)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setAssignmentAPILoading(false))
  }, [
    page,
    limit,
    searchKey,
    selectedChapter?.id,
    selectedGrade?.id,
    selectedSubject?.id,
    selectedBatch?.id,
    selectedBranch?.id,
    selectedInstitute?.id,
    adminAssignments
  ])

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
    } else if (selectedInstitute?.id || user.role === 'instituteAdmin') {
      setBranchLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        instituteId: selectedInstitute?.id || user?.instituteId
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          setBranchTotal(res?.total)
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
    if (selectedGrade?.id) {
      setIsBatchLoading(true)
      // const ids: any = [
      //   String(
      //     user.role == 'branchAdmin'
      //       ? user.branchId
      //       : selectedBranch?.id
      //       ? selectedBranch?.id
      //       : ''
      //   )
      // ]
      const payload = {
        page: 1,
        limit: 150,
        instituteId: selectedInstitute?.id ? selectedInstitute?.id : '',
        courseId: selectedGrade?.id ? selectedGrade?.id : ''
      }
      getBatchAPI(payload)
        .then((res: any) => {
          setBatchTotal(res?.total)
          const newBatch = res?.data?.map((batch: NewBatchDetails) => {
            return {
              label: batch.name,
              id: batch?._id,
              value: ''
            }
          })
          setBatch(newBatch)
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Batches under this Grade', 'error')
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsBatchLoading(false))
    }
  }, [selectedInstitute?.id, selectedGrade?.id, user])

  useEffect(() => {
    if (selectedBranch?.id || user.role === 'teacher') {
      let newGrade: any = []
      setGradeLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        branchId:
          user.role === 'teacher'
            ? user.branchId
            : selectedBranch?.id
            ? selectedBranch?.id
            : ''
      }
      getCourses(payload)
        .then((res: any) => {
          setGradeTotal(res.total)
          newGrade = res?.data?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setGradeData(newGrade)
          if (res.data?.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }, [selectedBranch?.id, user.role, user.branchId])

  useEffect(() => {
    if (selectedBatch?.id) {
      setSubjectLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        batchId: selectedBatch?.id ? selectedBatch?.id : ''
      }
      getSubjectData(payload)
        .then((res: any) => {
          setSubjectTotal(res?.total)
          const newSubject = res?.map((Subject: any) => {
            return {
              label: Subject.name,
              id: Subject?._id,
              value: ''
            }
          })
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Batch',
              'error'
            )
          }
          setSubject(newSubject)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedBatch?.id])

  useEffect(() => {
    if (selectedSubject?.id) {
      setChapterLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        subjectId: selectedSubject?.id ? selectedSubject?.id : ''
      }
      getChapterData(payload)
        .then((res: any) => {
          setChapterTotal(res?.total)
          const newChapter = res?.data?.map((Chapter: any) => {
            return {
              label: Chapter.name,
              id: Chapter?._id,
              value: ''
            }
          })
          setChapter(newChapter)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Chapters under this Subject',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setChapterLoading(false))
    }
  }, [selectedSubject?.id])

  const NewEditCellOption = useMemo(() => {
    const handleAssignAction = (data: any, assignType: string) => {
      if (assignType) {
        setIsAssignPopup(true)
        setAssignmentId(data._id)
        setTypeAssignment(data.type)
        setAssignmentData(data)
      }
    }

    const menuItems = []

    menuItems.push(
      {
        Icon: <AssignIcon />,
        label: 'Assign',
        onClick: (data: any) => handleAssignAction(data, 'Assign')
      },
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (data: any) => {
          const { _id } = data
          history.push({
            pathname: `${ROUTES_V2.EDIT_ASSIGNMENTS}/${_id}`
          })
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (data: any) => {
          setIsWarning(true)
          setAssignmentId(data._id)
        }
      }
    )
    return menuItems
  }, [history])

  const handleDelete = (testID: string) => {
    if (testID) {
      setAssignmentAPILoading(true)
      deleteAssignment({
        id: assignmentId
      })
        .then((res: any) => {
          if (res) {
            CustomToastMessage(`${res.message}`, 'success')
            setLimit(limit - 1)
            setIsWarning(false)
          }
        })
        .catch((error: any) => CustomToastMessage(`${error.message}`, 'error'))
        .finally(() => setAssignmentAPILoading(false))
    }
  }

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
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
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    ...(user.role === 'superAdmin'
      ? [
          columnHelper.accessor('instituteName', {
            size: 180,
            header: () => {
              return (
                <Flex gap="11px">
                  <P>Institute</P>
                </Flex>
              )
            },
            cell: (props) => {
              return (
                <Flex gap="11px">
                  {props.getValue() ? props.getValue() : 'N/A'}
                </Flex>
              )
            }
          })
        ]
      : []),
    ...(user.role === 'superAdmin' || user.role === 'instituteAdmin'
      ? [
          columnHelper.accessor('branchName', {
            size: 180,
            header: () => {
              return (
                <Flex gap="11px">
                  <P>Branch</P>
                </Flex>
              )
            },
            cell: (props) => {
              return (
                <Flex gap="11px">
                  {props.getValue() ? props.getValue() : 'N/A'}
                </Flex>
              )
            }
          })
        ]
      : []),
    columnHelper.accessor('courseName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '100px' }}>
            <P>Grade</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('batches', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '100px' }}>
            <P>Assigned To</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        const assignedTo = props.getValue()
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {assignedTo
              ? props
                  .getValue()
                  .map((item: any) => item.batchName)
                  .join(', ')
              : 'N/A'}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('subjectName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '130px' }}>
            <P>Subject</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('deadLine', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>DeadLine</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '120px' }}>
            {props.getValue()
              ? moment(props.getValue()).format('DD MMM, yyyy')
              : 'N/A'}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('_id', {
      size: 10,
      header: '',
      cell: (props) => {
        return (
          <div style={{ marginLeft: '15px' }}>
            <PopupMenu id={props.row.original} options={NewEditCellOption} />
          </div>
        )
      }
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
      // const ids: any = [
      //   String(
      //     user.role == 'branchAdmin'
      //       ? user.branchId
      //       : selectedBranch?.id
      //       ? selectedBranch?.id
      //       : ''
      //   )
      // ]
      const payload = {
        page: batchListPage + 1,
        limit: 50,
        instituteId:
          user.role == 'instituteAdmin'
            ? user.instituteId
            : selectedInstitute?.id,
        courseId: selectedGrade?.id ? selectedGrade?.id : ''
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

  const handleInfiniteScroll = (total: number, length: number) => {
    if (total > length) {
      setBranchListPage(branchListPage + 1)
      setBranchLoading(true)
      const payload = {
        instituteId:
          user.role == 'instituteAdmin'
            ? user.instituteId
            : selectedInstitute?.id,
        page: branchListPage + 1,
        limit: 50
      }
      getAllBranchAPI(payload)
        .then((res: any) => {
          setBranchTotal(res.total)
          const newBranch = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setBranchData((prev) => [...prev, ...newBranch])
        })
        .catch((err: any) => console.log(err))
        .finally(() => setBranchLoading(false))
    }
  }

  const handleScrollInfiniteCourse = (total: number, length: number) => {
    if (total > length) {
      setGradeListPage(gradeListPage + 1)
      setGradeLoading(true)
      const payload = {
        page: gradeListPage + 1,
        limit: 50,
        branchId: selectedBranch?.id ? selectedBranch?.id : ''
      }
      getCourses(payload)
        .then((res: any) => {
          const newGrade = res?.data?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setGradeData((prev) => [...prev, ...newGrade])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }

  const handleInfiniteScrollSubject = (total: number, length: number) => {
    if (total > length) {
      setSubjectLoading(true)
      setSubjectListPage(subjectListPage + 1)
      const payload = {
        page: subjectListPage + 1,
        limit: 50,
        batchId: selectedBatch?.id ? selectedBatch?.id : ''
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
          setSubject((prev) => [...prev, ...newSubject])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }

  const handleInfiniteScrollChapter = (total: number, length: number) => {
    if (total > length) {
      setChapterLoading(true)
      setChapterListPage(chapterListPage + 1)
      const payload = {
        page: chapterListPage + 1,
        limit: 50,
        subjectId: selectedSubject?.id ? selectedSubject?.id : ''
      }
      getChapterData(payload)
        .then((res: any) => {
          const newChapter = res?.data?.map((Chapter: any) => {
            return {
              label: Chapter.name,
              id: Chapter?._id,
              value: ''
            }
          })
          setChapter((prev) => [...prev, ...newChapter])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setChapterLoading(false))
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
        {/* <Flex gap="10px" wrap> */}
        {user.role === 'superAdmin' && (
          <SearchableDropdown
            style={{ width: '220px' }}
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
            onSelect={(option: any) => {
              setSelectedBranch({
                value: '',
                label: '',
                id: ''
              })
              setSelectedBatch({
                value: '',
                label: '',
                id: ''
              })
              setSelectedGrade({ id: '', label: '', value: '' })
              setSelectedSubject({ id: '', label: '', value: '' })
              setSelectedChapter({ id: '', label: '', value: '' })
              setBranchData([])
              setGradeData([])
              setBatch([])
              setSubject([])
              setChapter([])
              setSelectedInstitute(option)
              setAssignmentAPILoading(true)
            }}
            selectedValue={selectedInstitute}
          />
        )}
        {(user.role === 'instituteAdmin' || user.role === 'superAdmin') && (
          <SearchableDropdown
            style={{ width: '220px' }}
            isLoader={branchLoading}
            handleScrollInfinite={(first, second) =>
              handleInfiniteScroll(first, second)
            }
            total={branchTotal}
            length={branchData.length}
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
              setSelectedChapter({ id: '', label: '', value: '' })
              setSelectedBranch(option)
              setAssignmentAPILoading(true)
              setGradeData([])
              setBatch([])
              setSubject([])
              setChapter([])
            }}
            selectedValue={selectedBranch}
          />
        )}
        <SearchableDropdown
          style={{ width: '220px' }}
          handleScrollInfinite={(first, second) => {
            handleScrollInfiniteCourse(first, second)
          }}
          total={gradeTotal}
          length={gradeData.length}
          isLoader={gradeLoading}
          label={'Select Grade'}
          placeHolder={'Please Select Grade'}
          options={gradeData}
          isClear={selectedGrade?.id ? true : false}
          onSelect={(option: any) => {
            setBatch([])
            setSubject([])
            setChapter([])
            setSelectedGrade(option)
            setSelectedBatch({
              value: '',
              label: '',
              id: ''
            })
            setSelectedSubject({ id: '', label: '', value: '' })
            setSelectedChapter({ id: '', label: '', value: '' })
            setAssignmentAPILoading(true)
            setBatch([])
            setSubject([])
            setChapter([])
          }}
          selectedValue={selectedGrade}
        />
        <SearchableDropdown
          style={{ width: '280px' }}
          selectedValue={selectedBatch}
          isLoader={isBatchLoading}
          handleScrollInfinite={(first: any, second: any) => {
            handleInfiniteScrollBatch(first, second)
          }}
          total={batchTotal}
          length={batch.length}
          label="Select Batch / Section"
          placeHolder="Enter or select Batch / Section"
          options={batch}
          isClear={selectedBatch?.id ? true : false}
          onSelect={(option: any) => {
            setTableData([])
            setSubject([])
            setChapter([])
            setSelectedSubject({ id: '', label: '', value: '' })
            setSelectedChapter({ id: '', label: '', value: '' })
            setSelectedBatch(option)
          }}
        />
        <SearchableDropdown
          style={{ width: '220px' }}
          isLoader={subjectLoading}
          label="Select Subject"
          placeHolder="Please Select Subject"
          options={subject}
          isClear={selectedSubject?.id ? true : false}
          total={subjectTotal}
          length={subject.length}
          handleScrollInfinite={(first: any, second: any) => {
            handleInfiniteScrollSubject(first, second)
          }}
          onSelect={(data: any) => {
            setChapter([])
            setSelectedSubject(data)
            setSelectedChapter({ id: '', label: '', value: '' })
            setAssignmentAPILoading(true)
          }}
          selectedValue={selectedSubject}
        />
        <SearchableDropdown
          style={{ width: '220px' }}
          isLoader={chapterLoading}
          label="Select Chapter"
          placeHolder="Please Select Chapter"
          options={chapter}
          isClear={selectedChapter?.id ? true : false}
          total={chapterTotal}
          length={chapter.length}
          handleScrollInfinite={(first: any, second: any) => {
            handleInfiniteScrollChapter(first, second)
          }}
          onSelect={(data: any) => {
            setSelectedChapter(data)
            setAssignmentAPILoading(true)
          }}
          selectedValue={selectedChapter}
        />
        {/* </Flex> */}
        <Flex justifyContent="flex-end" gap="10px" wrap>
          {/* <SearchableDropdown
            style={{ width: '200px' }}
            isLoader={chapterLoading}
            label="Select type"
            placeHolder="Please Select type"
            options={types}
            isClear={selectedType?.id ? true : false}
            onSelect={(data: any) => {
              setSelectedType(data)
            }}
            selectedValue={selectedType}
          /> */}
          <InputSearchV2
            label="Search Assignment Name"
            required
            placeholder="Enter Assignment Name"
            style={{ width: '330px' }}
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
      </Flex>
      <TableWrapper>
        {popup == true ? (
          <PopupViewer>
            <EditAssignStudentPopUp
              id={''}
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
            isLoading={assignmentAPILoading}
            onDelete={() => handleDelete(assignmentId)}
            text="Are you sure you want to delete this assignment?"
          />
        )}
        {isAssignPopup && (
          <AssignAssignmentPopup
            setPopup={() => {
              setLimit(limit + 1)
              setIsAssignPopup(false)
            }}
            assignmentData={assignmentData}
            testId={assignmentId}
            AssignmentType={typeAssignment}
          />
        )}
        {user.role === 'superAdmin' ? (
          ''
        ) : (
          <Flex gap="10px" alignItems="center" justifyContent="flex-end">
            <MyText style={{ marginTop: '3px' }}>
              Show SuperAdmin Assignments
            </MyText>
            <Form.Check
              disabled={false}
              checked={adminAssignments}
              type="switch"
              id="reverse-radio-test"
              onChange={() => {
                setAdminAssignments(!adminAssignments)
              }}
            />
          </Flex>
        )}
        {assignmentAPILoading && (
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
  )
}

export default ListAssignment

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
