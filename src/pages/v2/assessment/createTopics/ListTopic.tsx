import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { useEffect, useState, useCallback, useMemo, ChangeEvent } from 'react'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import ROUTES_V2 from '../../../../const/V2/routes'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
import { BlueButton } from '../../student/assessment/attemptTest/styledComponents'
import {
  deleteTopicsAPI,
  getChapterData,
  getCourses,
  getSubjectData,
  getTopicData
} from '../../../../helpers/V2/apis'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'
import ViewEyeButton from '../../../../components/V2/ViewEyeButton'

const ListTopic = () => {
  const history = useHistory()
  const [tableData, setTableData] = useState<[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [selectedChapter, setSelectedChapter] =
    useState<SearchableDropdownOptionData>()
  const [subject, setSubject] = useState<any[]>([])
  const [chapter, setChapter] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [chapterLoading, setChapterLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeListPage, setGradeListPage] = useState(1)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [gradeTotal, setGradeTotal] = useState(0)
  const [subjectListPage, setSubjectListPage] = useState(1)
  const [chapterListPage, setChapterListPage] = useState(1)
  const [subjectTotal, setSubjectTotal] = useState(0)
  const [chapterTotal, setChapterTotal] = useState(0)
  const [isWarning, setIsWarning] = useState(false)
  const [topicId, setTopicId] = useState('')

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
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
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))
  }, [])

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
          setSubjectTotal(res?.total)
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
    if (selectedSubject?.id) {
      setChapterLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        subjectId: selectedSubject?.id
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

  useEffect(() => {
    setIsLoading(true)
    getTopicData({
      page: page + 1,
      limit,
      searchKey: searchKey,
      courseId: selectedGrade?.id ? selectedGrade?.id : '',
      subjectId: selectedSubject?.id ? selectedSubject?.id : '',
      chapterId: selectedChapter?.id ? selectedChapter?.id : ''
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
    selectedGrade?.id,
    selectedSubject?.id,
    selectedChapter?.id
  ])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])
  const onEditIconClick = useCallback(
    (id: string | number) => {
      history.push(`${ROUTES_V2.EDIT_TOPICS}/${id}`)
    },
    [history]
  )

  const handleDelete = (id: string) => {
    setIsLoading(true)
    deleteTopicsAPI(id)
      .then((res) => {
        if (res) {
          CustomToastMessage(res.message, 'success')
          getTopicData({
            page: page + 1,
            limit,
            searchKey: searchKey,
            courseId: selectedGrade?.id ? selectedGrade?.id : '',
            subjectId: selectedSubject?.id ? selectedSubject?.id : '',
            chapterId: selectedChapter?.id ? selectedChapter?.id : ''
          })
            .then((res) => {
              setTableData(res.data)
              setEntries(res.total)
            })
            .catch((error) => console.log({ error }))
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
        onClick: (id: string | number) => onEditIconClick(id)
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: any) => {
          setIsWarning(true)
          setTopicId(id)
        }
      }
    ],
    [onEditIconClick]
  )
  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Topic Name</P>
            <DownArrow />
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue()}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('chapterName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '180px' }}>
            <P> Chapter Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue()}
          </Flex>
        )
      }
    }),

    columnHelper.accessor('subjectName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '130px' }}>
            <P>Subject Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue()}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('courseName', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '100px' }}>
            <P>Grade Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue()}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('materialCount', {
      header: () => {
        return (
          <Flex gap="11px" style={{ width: '160px' }}>
            <P>Materials</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue()}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('subTopicCount', {
      size: 180,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Sub Topics</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '120px' }}>
            {props.getValue()}
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
                history.push(`${ROUTES_V2.VIEW_TOPICS}/${props.getValue()}`)
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
      setGradeListPage(gradeListPage + 1)
      setGradeLoading(true)
      const payload = {
        page: gradeListPage + 1,
        limit: 50
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
        courseId: selectedGrade?.id ? selectedGrade?.id : ''
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
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={isLoading}
          onDelete={() => handleDelete(topicId)}
          text="Are you sure you want to delete this Topic?"
        />
      )}

      <Flex
        alignItems="center"
        gap="10px"
        wrap
        style={{ marginBottom: '15px' }}
        justifyContent="space-between"
      >
        <Flex gap="10px" wrap>
          <SearchableDropdown
            style={{ width: '290px' }}
            handleScrollInfinite={(first, second) => {
              handleScrollInfinite(first, second)
            }}
            total={gradeTotal}
            length={gradeData.length}
            isLoader={gradeLoading}
            label={'Select Grade'}
            placeHolder={'Please Select Grade'}
            options={gradeData}
            isClear={selectedGrade?.id ? true : false}
            onSelect={(option) => {
              setSelectedGrade(option)
              setSubject([])
              setChapter([])
              setSelectedSubject({ id: '', label: '', value: '' })
              setSelectedChapter({ id: '', label: '', value: '' })
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
            total={subjectTotal}
            length={subject.length}
            handleScrollInfinite={(first: any, second: any) => {
              handleInfiniteScrollSubject(first, second)
            }}
            onSelect={(data: any) => {
              setSelectedSubject(data)
              setSelectedChapter({ id: '', label: '', value: '' })
              setChapter([])
            }}
            selectedValue={selectedSubject}
          />
          <SearchableDropdown
            style={{ width: '280px' }}
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
            }}
            selectedValue={selectedChapter}
          />
        </Flex>

        <InputSearchV2
          label="Search Topic"
          required
          placeholder="Enter Topic Name"
          style={{ width: '430px' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (
              event.target.value.length >= 1 ||
              event.target.value.length === 0
            ) {
              setPage(0)
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
  )
}

export default ListTopic

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
