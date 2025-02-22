import {
  ColumnDef,
  SortingState,
  createColumnHelper
} from '@tanstack/react-table'
import { useEffect, useState, ChangeEvent } from 'react'
import { ReactComponent as DownArrow } from '../../../../assets/svg/darkblue-down-arrow.svg'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { BlueButton } from '../../student/assessment/attemptTest/styledComponents'
import {
  getChapterData,
  getCourses,
  getMaterialData,
  getSubjectData,
  getSubTopicAPI,
  getTopicData
} from '../../../../helpers/V2/apis'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'
// import ViewEyeButton from '../../../../components/V2/ViewEyeButton'

const MaterialsList = () => {
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
  const [selectedTopic, setSelectedTopic] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubTopic, setSelectedSubTopic] =
    useState<SearchableDropdownOptionData>()
  const [subject, setSubject] = useState<any[]>([])
  const [chapter, setChapter] = useState<any[]>([])
  const [topic, setTopic] = useState<any[]>([])
  const [subTopic, setSubTopic] = useState<any[]>([])
  const [searchKey, setSearchKey] = useState('')
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [chapterLoading, setChapterLoading] = useState(false)
  const [topicLoading, setTopicLoading] = useState(false)
  const [subTopicLoading, setSubTopicLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeListPage, setGradeListPage] = useState(1)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [gradeTotal, setGradeTotal] = useState(0)
  const [subjectListPage, setSubjectListPage] = useState(1)
  const [chapterListPage, setChapterListPage] = useState(1)
  const [topicListPage, setTopicListPage] = useState(1)
  const [subjectTotal, setSubjectTotal] = useState(0)
  const [chapterTotal, setChapterTotal] = useState(0)
  const [topicTotal, setTopicTotal] = useState(0)

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
        courseId: selectedGrade?.id ? selectedGrade?.id : ''
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

  useEffect(() => {
    if (selectedChapter?.id) {
      setTopicLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        chapterId: selectedChapter?.id ? selectedChapter?.id : ''
      }
      getTopicData(payload)
        .then((res: any) => {
          setTopicTotal(res?.total)
          const newTopic = res?.data?.map((Topic: any) => {
            return {
              label: Topic.name,
              id: Topic?._id,
              value: ''
            }
          })
          setTopic(newTopic)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setTopicLoading(false))
    }
  }, [selectedChapter?.id])

  useEffect(() => {
    if (selectedTopic?.id) {
      setSubTopicLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        topicId: selectedTopic?.id ? selectedTopic?.id : ''
      }
      getSubTopicAPI(payload)
        .then((res: any) => {
          setTopicTotal(res?.total)
          const newTopic = res?.data?.map((Topic: any) => {
            return {
              label: Topic.name,
              id: Topic?._id,
              value: ''
            }
          })
          setSubTopic(newTopic)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setTopicLoading(false))
    }
  }, [selectedTopic?.id])

  useEffect(() => {
    setIsLoading(true)
    getMaterialData({
      page: page + 1,
      limit,
      searchKey: searchKey,
      courseId: selectedGrade?.id ? String(selectedGrade?.id) : '',
      subjectId: selectedSubject?.id ? String(selectedSubject?.id) : '',
      chapterId: selectedChapter?.id ? String(selectedChapter?.id) : '',
      topicId: selectedTopic?.id ? String(selectedTopic?.id) : ''
    })
      .then((res) => {
        setTableData(res.data)
        setEntries(res.total)
      })
      .catch((error) => console.log({ error }))
      .finally(() => setIsLoading(false))
  }, [
    page,
    limit,
    searchKey,
    selectedGrade?.id,
    selectedSubject?.id,
    selectedChapter?.id,
    selectedTopic?.id
  ])

  /** @todo This will be used for sorting (When Changes are done from backend)  */
  useEffect(() => {}, [sorting])

  // const editCellOption = useMemo(
  //   () => [
  //     {
  //       Icon: <EditIcon />,
  //       label: 'Edit',
  //       onClick: (id: string | number) => onEditIconClick(id)
  //     },
  //     {
  //       Icon: <DeleteIcon />,
  //       label: 'Delete',
  //       onClick: (id: any) => {
  //         setIsWarning(true)
  //         setSubTopicId(id)
  //       }
  //     }
  //   ],
  //   [onEditIconClick]
  // )
  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('name', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Material Name</P>
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
    columnHelper.accessor('subTopicName', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Sub-topic Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue() || '-'}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('topicName', {
      size: 200,
      header: () => {
        return (
          <Flex gap="11px">
            <P>Topic Name</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ width: '150px' }}>
            {props.getValue() || '-'}
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
    })
    // columnHelper.accessor('_id', {
    //   size: 50,
    //   header: () => {
    //     return (
    //       <Flex style={{ width: '80px' }}>
    //         <P>View</P>
    //       </Flex>
    //     )
    //   },
    //   cell: (props) => (
    //     <>
    //       <ViewEyeButton
    //         {...{
    //           clickHandler: () => {
    //             history.push(`${ROUTES_V2.VIEW_SUB_TOPICS}/${props.getValue()}`)
    //           },
    //           disabled: false
    //         }}
    //       />
    //     </>
    //   )
    // }),
    // columnHelper.accessor('_id', {
    //   size: 50,
    //   header: '',
    //   cell: (props) => (
    //     <>
    //       <PopupMenu id={props.getValue()} options={editCellOption} />
    //     </>
    //   )
    // })
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

  const handleInfiniteScrollTopic = (total: number, length: number) => {
    if (total > length) {
      setTopicLoading(true)
      setTopicListPage(topicListPage + 1)
      const payload = {
        page: topicListPage + 1,
        limit: 50,
        chapterId: selectedChapter?.id ? selectedChapter?.id : ''
      }
      getTopicData(payload)
        .then((res: any) => {
          const newTopic = res?.data?.map((Topic: any) => {
            return {
              label: Topic.name,
              id: Topic?._id,
              value: ''
            }
          })
          setChapter((prev) => [...prev, ...newTopic])
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setTopicLoading(false))
    }
  }

  return (
    <PageContainer>
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
              setSelectedSubject({ id: '', label: '', value: '' })
              setSelectedChapter({ id: '', label: '', value: '' })
              setSelectedTopic({ id: '', label: '', value: '' })
              setSubject([])
              setChapter([])
              setTopic([])
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
              setSelectedTopic({ id: '', label: '', value: '' })
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
              setSelectedTopic({ id: '', label: '', value: '' })
            }}
            selectedValue={selectedChapter}
          />
          <SearchableDropdown
            style={{ width: '280px' }}
            isLoader={topicLoading}
            label="Select Topic"
            placeHolder="Please Select Topic"
            options={topic}
            isClear={selectedTopic?.id ? true : false}
            total={topicTotal}
            length={topic.length}
            handleScrollInfinite={(first: any, second: any) => {
              handleInfiniteScrollTopic(first, second)
            }}
            onSelect={(data: any) => {
              setSelectedTopic(data)
            }}
            selectedValue={selectedTopic}
          />
          <SearchableDropdown
            style={{ width: '280px' }}
            isLoader={subTopicLoading}
            label="Select Sub-Topic"
            placeHolder="Please Select Sub-Topic"
            options={subTopic}
            isClear={selectedSubTopic?.id ? true : false}
            onSelect={(data: any) => {
              setSelectedSubTopic(data)
            }}
            selectedValue={selectedTopic}
          />
          <InputSearchV2
            label="Search Material"
            required
            placeholder="Enter Material Name"
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

export default MaterialsList

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
