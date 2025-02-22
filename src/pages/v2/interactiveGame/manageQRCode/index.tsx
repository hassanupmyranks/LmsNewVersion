import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { Spinner } from 'react-bootstrap'
import { CourseDetailProps } from '../manageContent/types'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { PublishDetailsPayload } from '../../../../utils/types'
import {
  DeleteQrcodeAPI,
  getChapterData,
  getLearnCourseData,
  getQrCodeAPI,
  getSubjectData,
  getSubTopicAPI,
  getTopicData
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../..//components/V2/ToastMessage'
import { Flex, PageContainer } from '../../../../components/V2/styledComponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table'
import { P } from '../manageContent/StyledComponents'
import BasicTable from '../../../../components/V2/Table/BasicTable'
import SingleCalendar from '../../assignment/Review/ReviewAssignment/Components/Calender'
import InputSearchV2 from '../../../../components/V2/Form/inputSearchV2'
import ROUTES_V2 from '../../../../const/V2/routes'
import { useHistory } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../../assets/svg/edit-icon.svg'
import PopupMenu from '../../../../components/V2/Table/PopupMenu'
import File from '../../../../assets/BlueDownload.png'
import { Button } from '../../../../components/V2/Button/AssignTeacherButton'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'

const ManageQRCodeList = () => {
  const [gradeOptions, setGradeOptions] = useState<[]>([])
  const [subjectOptions, setSubjectOptions] = useState<[]>([])
  const [chaptersOptions, setChaptersOptions] = useState<[]>([])
  const [topicsOptions, setTopicsOptions] = useState<[]>([])
  const [subTopicsOptions, setSubTopicsOptions] = useState<[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [, setSubjectsList] = useState<PublishDetailsPayload[]>([])

  const history = useHistory()
  const defaultValues = {
    value: '',
    label: '',
    id: ''
  }

  const [selectedGrade, setSelectedGrade] = useState({
    ...defaultValues,
    type: ''
  })

  const [selectedSubject, setSelectedSubject] = useState(defaultValues)

  const [selectedChapter, setSelectedChapter] = useState(defaultValues)

  const [selectedTopic, setSelectedTopic] = useState<any>(defaultValues)

  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)

  const [subjectApiLoading, setSubjectApiLoading] = useState(false)
  const [isChapterApiLoading, setIsChapterApiLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState([])
  const [isTopicApiLoading, setIsTopicApiLoading] = useState(false)
  const [, setManageContentDataBackUp] = useState([])
  const [isManageContentDataApiLoading, setManageContentDataApiLoading] =
    useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [orCodeId, setQRCodeId] = useState('')
  const [isSubTopicApiLoading, setIsSubTopicApiLoading] = useState(false)
  const [selectedSubTopic, setSelectedSubTopic] = useState<any>(defaultValues)
  const searchKey = ''
  const [fromDate, setFromDate] = useState<any>('')
  const [toDate, setToDate] = useState<any>('')
  const [isDeleteAPILoading, setIsDeleteAPILoading] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [selectedType, setSelectedType] =
    useState<SearchableDropdownOptionData>()
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const clickHandler = () => {
    setFromDate('')
    setToDate('')
  }
  useEffect(() => {
    SetIsCourseLoading(true)
    getLearnCourseData({ page: 1, limit: 120 })
      .then((res: CourseDetailProps[]) => {
        const options: any = res?.map((el: any) => {
          return {
            id: el._id,
            label: el.name,
            value: '',
            type: el.type
          }
        })
        setGradeOptions(options)
        SetIsCourseLoading(false)
      })
      .catch(() => SetIsCourseLoading(false))
  }, [])

  useEffect(() => {
    setManageContentDataApiLoading(true)
    getQrCodeAPI({
      courseId: selectedGrade.id,
      subjectId: selectedSubject.id,
      chapterId: selectedChapter.id,
      topicId: selectedTopic.id,
      subTopicId: selectedSubTopic.id,
      fromDate: fromDate,
      toDate: toDate,
      page: page + 1,
      limit,
      searchKey: searchKey
      // type: 'video'
    })
      .then((res) => {
        if (res.data.length <= 0) {
          CustomToastMessage('Content not available', 'error')
          setTableData(res.data)
          setEntries(res.total)
          setManageContentDataBackUp(res.data)
        } else if (selectedType?.id) {
          const filterDate = res.data?.filter(
            (data: any) => data.type === selectedType?.id
          )
          setTableData(filterDate)
          setEntries(res.total)
          setManageContentDataBackUp(filterDate)
        } else {
          setTableData(res.data)
          setEntries(res.total)
          setManageContentDataBackUp(res.data)
        }
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setManageContentDataApiLoading(false))
  }, [
    page,
    limit,
    selectedChapter,
    selectedGrade,
    selectedSubject,
    selectedTopic,
    selectedSubTopic,
    fromDate,
    toDate,
    searchKey,
    selectedType?.id
  ])

  const getSubjectDetails = (valueId: string, type: string) => {
    setSubjectsList([])
    setSubjectOptions([])
    if (type === 'lab') {
      setIsTopicApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: valueId
      })
        .then((res) => {
          if (type === 'lab') {
            const newSubjects = res?.map((el: any, ind: number) => {
              return {
                id: ind + 1,
                subject_id: el._id,
                subject_name: el.name,
                status: el.published
              }
            })
            if (res.length <= 0) {
              CustomToastMessage(
                'There are no Subjects under this Grade',
                'error'
              )
            }
            setSubjectsList(newSubjects)
            setIsTopicApiLoading(false)
          }
        })
        .catch(() => setIsTopicApiLoading(false))
        .finally(() => setSubjectApiLoading(false))
    } else {
      setSubjectApiLoading(true)
      getSubjectData({
        page: 1,
        limit: 100,
        courseId: valueId
      })
        .then((res) => {
          const options = res?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setSubjectOptions(options)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch(() => setIsTopicApiLoading(false))
        .finally(() => setSubjectApiLoading(false))
    }
  }

  const patternSelectHandler = async (data: any) => {
    getSubjectDetails(data.id, data.type)
    setSelectedGrade(data)
    setSelectedSubject(defaultValues)
    setSelectedChapter(defaultValues)
    setSelectedTopic(defaultValues)
    setSelectedSubTopic(defaultValues)
    setSubjectOptions([])
    setSubjectsList([])
    setChaptersOptions([])
    setTopicsOptions([])
    setSubTopicsOptions([])
  }

  const getChapterDetails = (subjectId: string) => {
    setChaptersOptions([])
    if (subjectId) {
      setIsChapterApiLoading(true)
      getChapterData({
        subjectId: subjectId,
        page: 1,
        limit: 100
      })
        .then((res) => {
          const options = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setChaptersOptions(options)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Chapters under this Subject',
              'error'
            )
          }
        })
        .catch(() => console.log(false))
        .finally(() => setIsChapterApiLoading(false))
    }
  }

  const getTopicsDetails = (chapterId: string) => {
    setManageContentDataApiLoading(true)
    if (chapterId) {
      setIsTopicApiLoading(true)
      getTopicData({
        chapterId: chapterId,
        page: 1,
        limit: 100
      })
        .then((res) => {
          const newTopics = res?.data?.map((el: any) => {
            return {
              id: el._id,
              label: el.name,
              value: ''
            }
          })
          setTopicsOptions(newTopics)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this Chapter',
              'error'
            )
          }
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsTopicApiLoading(false))
    }
  }

  const handleDelete = (qrCode: string) => {
    setIsDeleteAPILoading(true)
    DeleteQrcodeAPI(qrCode)
      .then((res) => {
        CustomToastMessage(res.message, 'success')
        setManageContentDataApiLoading(true)
        getQrCodeAPI({
          courseId: selectedGrade.id,
          subjectId: selectedSubject.id,
          chapterId: selectedChapter.id,
          topicId: selectedTopic.id,
          subTopicId: selectedSubTopic.id,
          fromDate: fromDate,
          toDate: toDate,
          page: page + 1,
          limit,
          type: 'video'
        })
          .then((res) => {
            setTableData(res.data)
            setEntries(res.total)
          })
          .catch((error) => CustomToastMessage(error.message, 'error'))
          .finally(() => setManageContentDataApiLoading(false))
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => {
        setIsWarning(false)
        setIsDeleteAPILoading(false)
      })
  }

  const onEditIconClick = useCallback(
    (id: string | number) => {
      history.push(`${ROUTES_V2.EDIT_QRCODE}/${id}`)
    },
    [history]
  )

  const handleDownload = (url: string, id: string) => {
    // Add cache-busting query string to the URL
    const cacheBusterUrl = `${url}?cb=${new Date().getTime()}` // Unique query param to bypass cache

    fetch(cacheBusterUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Prevent caching
        Pragma: 'no-cache' // For older HTTP/1.0 clients
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.blob()
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = `${id}.png`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(downloadUrl)
      })
      .catch((error) => {
        console.error('There was an error with the download:', error)
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
          setQRCodeId(id)
        }
      }
    ],
    [onEditIconClick]
  )

  const columnHelper = createColumnHelper<any>()
  const columns: ColumnDef<any, any>[] = [
    columnHelper.accessor('qrCodeId', {
      size: 50,
      header: () => {
        return (
          <Flex gap="5px">
            <P>QR Code ID</P>
            {/* <DownArrow /> */}
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">{props.getValue() ? props.getValue() : 'N/A'}</Flex>
        )
      }
    }),
    columnHelper.accessor('courseName', {
      size: 50,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '100px' }}>
            <P>Grade</P>
            {/* <DownArrow /> */}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('subjectName', {
      size: 60,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '80px' }}>
            <P>Subject</P>
            {/* <DownArrow /> */}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('chapterName', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '100px' }}>
            <P>Chapter</P>
            {/* <DownArrow /> */}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('topicName', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '100px' }}>
            <P>Topic</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">{props.getValue() ? props.getValue() : 'N/A'}</Flex>
        )
      }
    }),
    columnHelper.accessor('subTopicName', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Sub Topic</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px">{props.getValue() ? props.getValue() : 'N/A'}</Flex>
        )
      }
    }),
    columnHelper.accessor('qrCodePath', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>QR Code</P>
          </Flex>
        )
      },
      cell: (props) => {
        return (
          <Flex gap="11px" style={{ height: '50px', width: '50px' }}>
            {props.getValue() ? (
              <img
                src={props.getValue()}
                alt="qrCodePath"
                style={{ height: '100%' }}
              />
            ) : (
              'N/A'
            )}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('qrCodePath', {
      size: 70,
      header: () => {
        return (
          <Flex gap="0px">
            <P>Download</P>
          </Flex>
        )
      },
      cell: (props) => {
        const Id = props.row.original.qrCodeId
        return (
          <Flex gap="11px" style={{ height: '50px', width: '50px' }}>
            {props.getValue() ? (
              <button
                onClick={() => handleDownload(props.getValue(), Id)}
                type="button"
                style={{
                  display: 'flex',
                  border: 'none',
                  background: '#fff',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none'
                }}
              >
                <>
                  <div
                    style={{
                      width: '40px',
                      borderRadius: '4px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <img src={File} alt="File" height="30px" />
                  </div>
                </>
              </button>
            ) : (
              'N/A'
            )}
          </Flex>
        )
      }
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
  const QrType = [
    {
      id: 'video',
      label: 'Video',
      value: ''
    },
    {
      id: 'audio',
      label: 'Audio',
      value: ''
    },
    {
      id: 'ppt',
      label: 'PPT',
      value: ''
    },
    {
      id: 'game',
      label: 'Game',
      value: ''
    }
  ]
  return (
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={isDeleteAPILoading}
          onDelete={() => handleDelete(orCodeId)}
          text="Are you sure you want to delete this QRCode?"
        />
      )}
      <Flex
        direction={windowWidth < 900 ? 'column' : 'row'}
        alignItems="center"
        gap="10px"
        style={{ marginBottom: '15px' }}
      >
        <SearchableDropdown
          style={{ width: '240px' }}
          label={'Select Type'}
          placeHolder={'Please Select Type'}
          options={QrType}
          isClear={selectedType?.id ? true : false}
          onSelect={(option) => {
            setSelectedType(option)
          }}
          selectedValue={selectedType}
        />
        <SearchableDropdown
          style={{ width: '240px' }}
          popupColour={isWarning}
          label="Select Grade"
          selectedValue={selectedGrade}
          isClear={selectedGrade?.label ? true : false}
          onSelect={patternSelectHandler}
          placeHolder="Grade Name"
          isLoader={isCourseLoading}
          required
          options={gradeOptions}
        />
        {!(selectedGrade.type === 'lab') && (
          <Flex direction={windowWidth < 900 ? 'column' : 'row'} gap="10px">
            <SearchableDropdown
              popupColour={isWarning}
              label="Select Subject"
              selectedValue={selectedSubject}
              isClear={selectedSubject?.label ? true : false}
              onSelect={(e) => {
                setSelectedSubject({
                  id: String(e.id),
                  value: String(e.value),
                  label: e.label
                })
                setManageContentDataApiLoading(true)
                setChaptersOptions([])
                setTopicsOptions([])
                setSubTopicsOptions([])
                getChapterDetails(String(e.id))
                setSelectedChapter(defaultValues)
                setSelectedTopic(defaultValues)
                setSelectedSubTopic(defaultValues)
              }}
              placeHolder="Subject Name"
              isLoader={subjectApiLoading}
              required
              options={subjectOptions}
              fullWidth
            />
            <SearchableDropdown
              popupColour={isWarning}
              label="Select Chapter"
              selectedValue={selectedChapter}
              isClear={selectedChapter?.label ? true : false}
              onSelect={(chapter) => {
                setSelectedChapter({
                  id: String(chapter.id),
                  value: String(chapter.value),
                  label: chapter.label
                })
                setTopicsOptions([])
                setSubTopicsOptions([])
                getTopicsDetails(String(chapter.id))
                setSelectedTopic(defaultValues)
                setSelectedSubTopic(defaultValues)
              }}
              placeHolder="Chapter Name"
              isLoader={isChapterApiLoading}
              required
              options={chaptersOptions}
              fullWidth
            />
            <SearchableDropdown
              popupColour={isWarning}
              label="Select Topic"
              selectedValue={selectedTopic}
              isClear={selectedTopic?.label ? true : false}
              onSelect={(topic: any) => {
                setSelectedTopic(topic)

                setSubTopicsOptions([])
                if (topic.id) {
                  setIsSubTopicApiLoading(true)
                  getSubTopicAPI({
                    topicId: topic.id,
                    page: 1,
                    limit: 120
                  })
                    .then((res) => {
                      const newSubTopics = res?.data?.map((el: any) => {
                        return {
                          id: el._id,
                          label: el.name,
                          value: ''
                        }
                      })
                      setSubTopicsOptions(newSubTopics)
                      if (res.data.length <= 0) {
                        CustomToastMessage(
                          'There are no Sub-Topics under this Topic',
                          'error'
                        )
                      }
                    })
                    .catch((error) =>
                      CustomToastMessage(error.message, 'error')
                    )
                    .finally(() => setIsSubTopicApiLoading(false))
                }
                setSelectedSubTopic(defaultValues)
              }}
              placeHolder="Topic Name"
              isLoader={isTopicApiLoading}
              options={topicsOptions}
              fullWidth
            />
            <SearchableDropdown
              popupColour={isWarning}
              label="Select Sub-Topic"
              selectedValue={selectedSubTopic}
              isClear={selectedSubTopic?.label ? true : false}
              onSelect={(subTopic) => {
                setSelectedSubTopic(subTopic)
              }}
              placeHolder="Sub-Topic Name"
              isLoader={isSubTopicApiLoading}
              options={subTopicsOptions}
              fullWidth
            />
          </Flex>
        )}
      </Flex>
      <Flex
        direction={windowWidth < 900 ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        style={{ marginBottom: '15px' }}
      >
        <InputSearchV2
          label="Search QRCode"
          placeholder="Enter QRCode ID"
          style={{ width: '260px' }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (
              event.target.value.length > 0 ||
              event.target.value.length === 0
            ) {
              getQrCodeAPI({
                courseId: selectedGrade.id,
                subjectId: selectedSubject.id,
                chapterId: selectedChapter.id,
                topicId: selectedTopic.id,
                page: page + 1,
                limit,
                searchKey: event.target.value,
                type: 'video'
              })
                .then((res) => {
                  setTableData(res.data)
                  setEntries(res.total)
                  setManageContentDataBackUp(res.data)
                  setManageContentDataApiLoading(false)
                })
                .catch((error) => CustomToastMessage(error.message, 'error'))
                .finally(() => setManageContentDataApiLoading(false))
            }
          }}
        />
        <Flex gap="10px">
          <Button onClick={clickHandler} style={{ alignSelf: 'end' }}>
            Clear
          </Button>
          <SingleCalendar
            label="From Date"
            value={String(fromDate)}
            onChange={() => {}}
            placeholder={'Select From Date'}
            onChangeDate={(d: any) => {
              setFromDate(d)
            }}
          />
          <SingleCalendar
            label="To Date"
            value={String(toDate)}
            onChange={() => {}}
            placeholder={'Select To Date'}
            onChangeDate={(d: any) => {
              setToDate(d)
            }}
          />
        </Flex>
      </Flex>
      <TableWrapper>
        {isManageContentDataApiLoading && (
          <Spinner
            style={{
              width: '44px',
              height: '44px',
              color: `${BlueButton}`,
              position: 'absolute',
              top: '65%',
              left: '45%'
            }}
            animation={'border'}
          />
        )}
        {
          <BasicTable
            {...{
              maxHeight: '50vh',
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
        }
      </TableWrapper>
    </PageContainer>
  )
}

export default ManageQRCodeList

const TableWrapper = styled.div`
  height: 100%;
  // overflow-y: auto;

  & thead {
    position: sticky;
    top: -9px;
    margin: 0 0 0 0;
    height: 47px;
  }
`
