import { useEffect, useState } from 'react'

import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import styled from 'styled-components'
import './Style/style.css'
import { ReactComponent as DownArrow } from './../../../../../assets/svg/darkblue-down-arrow.svg'
import { ReactComponent as TaskFilled } from './../../../../../assets/svg/TaskFilled.svg'
// import { ReactComponent as Word } from './../../../../../assets/svg/word.svg'
import {
  GetTestDataResponse,
  NewBatchDetails,
  NewBranchDetails
} from '../../../../../utils/types'
import {
  getAllBranchAPI,
  getAllGradeData,
  getAllInstituteAPI,
  // getAllSubmittedAssignmentAPI,
  getBatchAPI,
  getSubjectData,
  getAllReviewAssignmentData
} from '../../../../../helpers/V2/apis'
import {
  Flex,
  // Grid,
  // GridItem,
  PageContainer
} from '../../../../../components/V2/styledComponents'
import {
  ActionButton,
  // DateFilterButton,
  FilterContainer,
  HeaderTitle,
  HeaderTitleContainer,
  MyContainer
} from './Components/styledComponents'
import CustomTable from './Components/CustomTable'
import { formatDateString } from './Utils/formatString'
import {
  BlueButton,
  CompletedButton,
  PrimaryBlue,
  White
} from '../../../../../const/V2/stylingVariables'
import Calendar from './Components/Calender'
import { Spinner } from 'react-bootstrap'
import ROUTES_V2 from '../../../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../../../components/V2/Button/SimpleButton'
import SearchableDropdown from '../../../../../components/V2/Form/SearchableDropdown'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { SearchableDropdownOptionData } from '../../../../../components/V2/Form/types'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import {
  BatchesMore,
  Close,
  MoreBatches
} from '../../../assessment/table/tests'
// import VideoIcon from '../../../../../assets/video player logo.png'
// import AudioIcon from '../../../../../assets/audioplayer.png'
// import PdfIcon from '../../../../../assets/pdf logo.png'
// import PptxIcon from '../../../../../assets/pptx logo.jpeg'
// import WordIcon from '../../../../../assets/word logo.png'
// import { DocLogo } from '../../../dashboard/ReiewAssignment/styledComponents'
const ReviewAssignment = () => {
  const defaultValues = {
    value: '',
    label: '',
    id: 0,
    url: ''
  }
  const history = useHistory()
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.userV2.userInfoV2
    }),
    shallowEqual
  )
  const [tableData, setTableData] = useState<GetTestDataResponse[]>([])
  const [grade, setGrade] = useState<[]>([])
  const [selectedGrade, setSelectedGrade] = useState(defaultValues)
  const [selectedBatch, setSelectedBatch] = useState({ id: '', label: '' })
  const [date, setDate] = useState<any>()
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(100)
  const [entries, setEntries] = useState<number>(0)
  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)
  const [reviewAssignmentAPILoading, setReviewAssignmentAPILoading] =
    useState(false)
  const [selectedInstitute, setSelectedInstitute] =
    useState<SearchableDropdownOptionData>()
  const [selectedBranch, setSelectedBranch] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [instituteData, setInstituteData] = useState<any[]>([])
  const [branchData, setBranchData] = useState<any[]>([])
  const [batch, setBatch] = useState<any[]>([])
  const [insLoading, setInsLoading] = useState(false)
  const [branchLoading, setBranchLoading] = useState(false)
  const [isBatchLoading, setIsBatchLoading] = useState(false)
  const [subject, setSubject] = useState<any[]>([])
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [showId, setShowId] = useState('')
  const [isSmall, setIsSmall] = useState(false)
  const [submittedCount, setSubmittedCount] = useState(0)

  useEffect(() => {
    setReviewAssignmentAPILoading(true)
    getAllReviewAssignmentData({
      page: page + 1,
      limit,
      instituteId: selectedInstitute?.id ? selectedInstitute?.id : '',
      branchId: selectedBranch?.id ? selectedBranch?.id : '',
      batchId: selectedBatch?.id ? selectedBatch?.id : '',
      subjectId: selectedSubject?.id ? selectedSubject?.id : '',
      courseId: selectedGrade?.id ? selectedGrade?.id : '',
      forReview: true,
      date: date
    })
      .then((res) => {
        if (res) {
          setTableData(res.data)
          setEntries(res.total)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setReviewAssignmentAPILoading(false))
  }, [
    page,
    limit,
    date,
    selectedGrade?.id,
    selectedSubject?.id,
    selectedBatch?.id,
    selectedBranch?.id,
    selectedInstitute?.id
  ])

  useEffect(() => {
    let newInstitute: any = []
    if (user?.role === 'instituteAdmin') {
      setSelectedInstitute({
        id: user.instituteId,
        value: user.instituteName,
        label: user.instituteName
      })
    } else if (user?.role === 'superAdmin') {
      setInsLoading(true)
      const payload = {
        page: 1,
        limit: 150
      }
      getAllInstituteAPI(payload)
        .then((res: any) => {
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
  }, [user?.instituteId, user?.instituteName, user?.role])

  useEffect(() => {
    if (user.role === 'branchAdmin') {
      setSelectedBranch({
        id: user.branchId,
        value: user.branchName,
        label: user.branchName
      })
    } else if (user.role === 'superAdmin') {
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
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setBranchLoading(false))
    }
  }, [selectedInstitute?.id, user])

  useEffect(() => {
    if (selectedGrade?.id) {
      setIsBatchLoading(true)
      const ids: any = [
        String(
          user.role == 'branchAdmin'
            ? user.branchId
            : selectedBranch?.id
            ? selectedBranch?.id
            : ''
        )
      ]
      const payload = {
        page: 1,
        limit: 150,
        instituteId: selectedInstitute?.id,
        branchIds:
          Array.isArray(ids) && ids.length === 1 && ids[0] === '' ? '' : ids,
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
          setBatch(newBatch)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsBatchLoading(false))
    }
  }, [selectedInstitute?.id, selectedBranch?.id, user, selectedGrade?.id])

  useEffect(() => {
    SetIsCourseLoading(true)
    getAllGradeData({
      skip: 0,
      limit: 100
    })
      .then((res) => {
        if (res) {
          const optionsData = res.map((el: any) => {
            return {
              id: el.courseId,
              label: el.courseName,
              value: ''
            }
          })

          setGrade(optionsData)
        }
      })
      .catch((error) =>
        CustomToastMessage(error.response.data.message, 'error')
      )
      .finally(() => SetIsCourseLoading(false))
  }, [])

  useEffect(() => {
    if (selectedBatch?.id) {
      setSubjectLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        batchId: selectedBatch?.id
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
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedBatch?.id])

  const handleReviewStudentAssignment = (assignmentId: string) => {
    history.push({
      pathname: `${ROUTES_V2.REVIEW_ASSIGNMENT_STUDENT}/${assignmentId}`,
      state: {
        id: assignmentId
      }
    })
  }

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
      size: 150,
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
          <Flex gap="11px">
            <p>{props.getValue()}</p>
          </Flex>
        )
      }
    }),
    // columnHelper.accessor('scoredMarks', {
    //   size: 120,
    //   header: () => {
    //     return (
    //       <Flex gap="8px">
    //         <P>Percentage</P>
    //       </Flex>
    //     )
    //   },
    //   cell: (props) => {
    //     return (
    //       <p>
    //         {(props.getValue() / props?.row?.original?.totalMarks).toFixed(2)}
    //       </p>
    //     )
    //   }
    // }),
    columnHelper.accessor('batches', {
      size: 120,
      header: () => {
        return (
          <Flex gap="8px">
            <P>Assigned To</P>
          </Flex>
        )
      },
      cell: (props) => {
        const checker = props.row?.original?._id
        return (
          // <p> {props?.getValue() ? props?.getValue()?.toUpperCase() : 'N/A'}</p>
          <div
            style={{
              display: 'flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              gap: '5px',
              position: 'relative'
            }}
          >
            <p>{props?.getValue()[0]?.batchName}</p>
            {props?.getValue()?.length > 1 && (
              <>
                <p>...</p>{' '}
                <button
                  onClick={() => {
                    setShow(!show)
                    setShowId(props.row?.original?._id)
                  }}
                  style={{
                    width: 'auto',
                    height: '30px',
                    borderRadius: '30px',
                    border: 'none',
                    fontFamily: 'GT Walsheim, sans-serif'
                  }}
                >
                  +{props?.getValue()?.length}
                </button>
                {show && checker === showId && (
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
                    {props?.getValue()?.map((data: any, index: any) => (
                      <div key={index}>
                        <BatchesMore>{data?.batchName}</BatchesMore>
                      </div>
                    ))}
                  </MoreBatches>
                )}
              </>
            )}
          </div>
        )
      }
    }),
    columnHelper.accessor('batches', {
      size: 90,
      header: () => {
        return (
          <Flex gap="8px">
            <P>Student Count</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <p> {props.getValue()?.map((data: any) => data?.studentCount)}</p>
        )
      }
    }),
    columnHelper.accessor('batches', {
      size: 90,
      header: () => {
        return (
          <Flex gap="8px">
            <P>Submitted Count</P>
          </Flex>
        )
      },
      cell: (props) => {
        setSubmittedCount(
          props.getValue()?.map((data: any) => data?.submittedCount)[0]
        )
        return (
          <p> {props.getValue()?.map((data: any) => data?.submittedCount)}</p>
        )
      }
    }),
    columnHelper.accessor('batches', {
      size: 90,
      header: () => {
        return (
          <Flex gap="8px">
            <P>Reviewed Count</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <p> {props.getValue()?.map((data: any) => data?.reviewedCount)}</p>
        )
      }
    }),
    columnHelper.accessor('createdAt', {
      size: 80,
      header: () => {
        return (
          <Flex gap="6px">
            <P>Assigned On</P>
            <DownArrow />
          </Flex>
        )
      },

      cell: (props) => {
        return (
          <p> {props.getValue() ? formatDateString(props.getValue()) : ''}</p>
        )
      }
    }),
    columnHelper.accessor('_id', {
      size: 80,
      header: () => {
        return (
          <Flex gap="6px">
            <P>Status</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        if (props?.row?.original?.reviewCompleted === true) {
          return (
            <ActionButton onClick={() => {}} color={CompletedButton}>
              Completed
            </ActionButton>
          )
        } else {
          return submittedCount > 0 ? (
            <ActionButton
              onClick={() => handleReviewStudentAssignment(props.getValue())}
              color={PrimaryBlue}
            >
              Review
            </ActionButton>
          ) : (
            <ActionButton color={'#66abd9'}>Review</ActionButton>
          )
        }
      }
    })
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmall(true)
      } else {
        setIsSmall(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PageContainer>
      <MyContainer>
        <HeaderTitleContainer>
          <HeaderTitle active>
            <TaskFilled />
            Review Assignment
          </HeaderTitle>
        </HeaderTitleContainer>

        <FilterContainer>
          <Flex
            direction={isSmall ? 'column' : 'row'}
            gap="8px"
            style={{ justifyContent: 'space-between', width: '100%' }}
          >
            <Flex gap="10px" wrap={true}>
              {user.role === 'superAdmin' && (
                <SearchableDropdown
                  style={{ width: '290px' }}
                  isLoader={insLoading}
                  label={'Select Institute / School'}
                  placeHolder={'Please Select Institute / School'}
                  options={instituteData}
                  isClear={selectedInstitute?.id ? true : false}
                  onSelect={(option: any) => {
                    setTableData([])
                    setSelectedBranch({
                      value: '',
                      label: '',
                      id: ''
                    })
                    setSelectedBatch({
                      label: '',
                      id: ''
                    })
                    setBranchData([])
                    setSelectedInstitute(option)
                  }}
                  selectedValue={selectedInstitute}
                />
              )}
              {(user.role === 'instituteAdmin' ||
                user.role === 'superAdmin') && (
                <SearchableDropdown
                  style={{ width: '290px' }}
                  isLoader={branchLoading}
                  length={branchData.length}
                  label={'Select Branch'}
                  placeHolder="Please Select Branch"
                  options={branchData}
                  isClear={selectedBranch?.id ? true : false}
                  onSelect={(option: any) => {
                    setSelectedBatch({
                      label: '',
                      id: ''
                    })
                    setTableData([])
                    setSelectedBranch(option)
                  }}
                  selectedValue={selectedBranch}
                />
              )}
              <SearchableDropdown
                style={{ width: '290px' }}
                isLoader={isCourseLoading}
                label={'Select Grade'}
                placeHolder={'Please Select Grade'}
                options={grade}
                isClear={selectedGrade?.id ? true : false}
                onSelect={(option: any) => {
                  setSubject([])
                  setSelectedGrade(option)
                  setSelectedSubject({ id: '', label: '', value: '' })
                  setSelectedBatch({ id: '', label: '' })
                  setBatch([])
                }}
                selectedValue={selectedGrade}
              />
              <SearchableDropdown
                style={{ width: '280px' }}
                selectedValue={selectedBatch}
                isLoader={isBatchLoading}
                label="Select Batch / Section"
                placeHolder="Enter or select Batch / Section"
                options={batch}
                isClear={selectedBatch?.id ? true : false}
                onSelect={(option: any) => {
                  setSubject([])
                  setSelectedBatch(option)
                  setSelectedSubject({ id: '', label: '', value: '' })
                }}
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
                }}
                selectedValue={selectedSubject}
              />
            </Flex>
          </Flex>
          <Flex>
            <Flex gap="10px">
              <Calendar
                label="Filter by Date"
                value={date}
                onChange={(date: any) => {
                  setDate(date ? date.toISOString() : '')
                }}
                placeholder={'Select Date'}
                onChangeDate={function (date: Date): void {
                  setDate(date ? date.toISOString() : '')
                }}
              />
              {date ? (
                <Button
                  style={{
                    height: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isSmall ? 'center' : 'flex-end',
                    marginBottom: '2px'
                  }}
                  onClick={() => setDate('')}
                >
                  Clear
                </Button>
              ) : (
                ''
              )}
            </Flex>
          </Flex>
        </FilterContainer>

        <TableWrapper style={{ padding: '0 20px', marginTop: '40px' }}>
          {reviewAssignmentAPILoading && (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner
                style={{
                  width: '44px',
                  height: '44px',
                  color: `${BlueButton}`,
                  position: 'absolute',
                  top: '60%',
                  left: '45%'
                }}
                animation={'border'}
              />
            </div>
          )}
          <CustomTable
            {...{
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
      </MyContainer>
    </PageContainer>
  )
}

export default ReviewAssignment
const P = styled.p`
  cursor: pointer;
`

const TableWrapper = styled.div`
  // height: 100%;
  overflow-y: auto;
  background-color: ${White};
  border-radius: 20px;

  & thead {
    position: sticky;
    top: 0%;
    height: 57px;
    margin: 0 0 0 0;
    z-index: 0;
  }
`
