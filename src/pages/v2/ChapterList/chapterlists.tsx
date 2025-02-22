import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

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
  daleteChapterAPI,
  getAllCourses,
  getChapterData,
  getSubjectsDataCourseId
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
import { SearchableDropdownOptionData } from '../../../components/V2/Form/types'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import InputSearchV2 from '../../../components/V2/Form/inputSearchV2'
import ViewEyeButton from '../../../components/V2/ViewEyeButton'

const ChaptersList = () => {
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
  const history = useHistory()
  const [isWarning, setIsWarning] = useState(false)
  const [chapterId, setChapterId] = useState('')
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [subjectListPage, setSubjectListPage] = useState(1)
  const [subjectData, setSubjectData] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [subjectTotal, setSubjectTotal] = useState(0)
  const [courseList, setCourseList] = useState<any>([])

  const [courseTotal, setCourseTotal] = useState(0)
  const [selectedCourse, setSelectedCourse] =
    useState<SearchableDropdownOptionData>()

  useEffect(() => {
    setIsLoading(true)
    let payload: any = {
      page: page + 1,
      limit,
      searchKey: searchKey,
      subjectId: selectedSubject?.id,
      courseId: selectedCourse?.id
    }

    getChapterData(payload)
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
  }, [page, limit, selectedCourse, searchKey, selectedSubject])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])

  const handleDelete = (chapterId: string) => {
    setIsLoading(true)
    daleteChapterAPI(chapterId)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          let payload: any = {
            page: page + 1,
            limit,
            searchKey: searchKey,
            subjectId: selectedSubject?.id,
            courseId: selectedCourse?.id
          }

          getChapterData(payload)
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
          setIsWarning(false)
        }
      })
      .catch((error) => {
        CustomToastMessage(error.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }

  const editCellOption = useMemo(
    () => [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (id: any) => {
          console.log(id)
          history.push(`${ROUTES_V2.EDIT_CHAPTERS}/${id}`)
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: any) => {
          setChapterId(id)
          setIsWarning(true)
        }
      }
    ],
    [history]
  )

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Chapter Name</P>
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
    columnHelper.accessor('courseName', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P>Grade</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('subjectName', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P>Subject</P>
          </Flex>
        )
      }
    }),
    columnHelper.accessor('topicCount', {
      size: 300,
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P>No of Topics</P>
          </Flex>
        )
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
                  `${ROUTES_V2.VIEW_CHAPTER_DETAILS}/${props.getValue()}`
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
      setSubjectListPage(subjectListPage + 1)
      setIsLoading(true)
      const payload = {
        page: subjectListPage + 1,
        limit: 100
      }
      getSubjectsDataCourseId(payload)
        .then((res: any) => {
          setSubjectTotal(res.total)
          const newSubject = res?.data?.map((item: any) => {
            return {
              id: item._id,
              label: item.name,
              value: ''
            }
          })
          setSubjectData((prev) => [...prev, ...newSubject])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    getAllCourses().then((res: any) => {
      const newCourse: any = res.data.data?.map((item: any) => ({
        id: item._id,
        label: item.name
      }))
      setCourseList(newCourse)
      setCourseTotal(res.data.total)
    })
  }, [])

  return (
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={isLoading}
          onDelete={() => handleDelete(chapterId)}
          text="Are you sure you want to delete this chapter?"
        />
      )}

      <Flex
        style={{ gap: '15px', marginBottom: '15px' }}
        justifyContent="space-between"
        wrap
      >
        <Flex gap="10px" wrap>
          {userInfoV2.role === 'superAdmin' && (
            <SearchableDropdown
              style={{ width: '290px' }}
              total={courseTotal}
              label={'Select Grade'}
              placeHolder={'Please Select Grade'}
              options={courseList}
              isClear={selectedCourse?.id ? true : false}
              onSelect={(option) => {
                setTableData([])
                setSelectedSubject({
                  value: '',
                  label: '',
                  id: ''
                })
                setSubjectData([])
                setSelectedCourse(option)
                if (option?.id) {
                  getSubjectsDataCourseId({
                    page: 1,
                    limit: 100,
                    courseId: String(option.id)
                  })
                    .then((res) => {
                      setSubjectTotal(res.total)
                      const newInstitute = res?.data?.map(
                        (item: NewBranchDetails) => {
                          return {
                            id: item._id,
                            label: item.name
                          }
                        }
                      )
                      setSubjectData(newInstitute)
                      if (res.data.length <= 0) {
                        CustomToastMessage(
                          'There are no Subjects under this Grade',
                          'error'
                        )
                      }
                    })
                    .catch((error) =>
                      CustomToastMessage(error.message, 'error')
                    )
                    .finally(() => setIsLoading(false))
                }
              }}
              selectedValue={selectedCourse}
            />
          )}
          {(userInfoV2.role === 'instituteAdmin' ||
            userInfoV2.role === 'superAdmin') && (
            <SearchableDropdown
              style={{ width: '290px' }}
              selectedValue={selectedSubject}
              isLoader={isLoading}
              handleScrollInfinite={(first, second) =>
                handleInfiniteScroll(first, second)
              }
              total={subjectTotal}
              length={subjectData.length}
              label={'Select Subject'}
              placeHolder="Please Select Subject"
              options={subjectData}
              isClear={selectedSubject?.id ? true : false}
              onSelect={(option) => {
                setSelectedSubject(option)
              }}
            />
          )}
        </Flex>
        <InputSearchV2
          label="Search Chapter"
          required
          placeholder="Enter Chapter Name"
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
            maxHeight: '60vh',
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

export default ChaptersList

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
