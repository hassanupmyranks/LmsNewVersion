import { useEffect, useState } from 'react'
import styled from 'styled-components'

// import PublishTable from './PublishTable'

import { Form, Spinner } from 'react-bootstrap'

import { CourseDetailProps } from './types'

import { Blue, BlueButton } from '../../../../const/V2/stylingVariables'
import { PublishDetailsPayload } from '../../../../utils/types'
import {
  DeleteContent,
  getChapterData,
  getLearnCourseData,
  getGameQRCodeListApi,
  getSubjectData,
  getTopicData
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../..//components/V2/ToastMessage'
import {
  Flex,
  // Grid,
  // GridItem,
  PageContainer
} from '../../../../components/V2/styledComponents'
// import { FormContainerV2 } from '../../assessment/TestPreview/subcomponents'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import WarningPopUp from '../../../../components/V2/PopUp/WarningPopup'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import {
  ColumnDef,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table'
import { P, PublishBtn } from './StyledComponents'
import BasicTable from '../../../../components/V2/Table/BasicTable'
// import { RootState } from '../../../../redux/store'
import File from '../../../../assets/BlueDownload.png'

const MaterialsV2 = () => {
  const TextParaLabel = styled.p`
    font-family: 'DM Sans', sans-serif;
    margin-top: 3rem;
    color: ${Blue};
    font-size: 14px;
    font-weight: 500;
    width: 150px;
  `

  // const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )
  const [gradeOptions, setGradeOptions] = useState<[]>([])

  const [subjectOptions, setSubjectOptions] = useState<[]>([])
  const [chaptersOptions, setChaptersOptions] = useState<[]>([])
  const [topicsOptions, setTopicsOptions] = useState<[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [entries, setEntries] = useState<number>(0)
  const [, setSubjectsList] = useState<PublishDetailsPayload[]>([])

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
  const [checkedPublished, setCheckedPublished] = useState(false)

  const [isCourseLoading, SetIsCourseLoading] = useState<boolean>(false)

  const [subjectApiLoading, setSubjectApiLoading] = useState(false)
  const [isChapterApiLoading, setIsChapterApiLoading] = useState<boolean>(false)
  const [isTopicApiLoading, setIsTopicApiLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  // const [deleteResponse, setDeleteResponse] = useState<any>()
  const [manageContentDataBackUp, setManageContentDataBackUp] = useState([])
  const [isManageContentDataApiLoading, setManageContentDataApiLoading] =
    useState(false)
  const [isWarning, setIsWarning] = useState(false)
  const [deleteId, setdeleteId] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    getGameQRCodeListApi({
      page: page + 1,
      limit,
      courseId: selectedGrade?.id,
      subjectId: selectedSubject?.id,
      chapterId: selectedChapter?.id,
      topicId: selectedTopic?.id
    })
      .then((res) => {
        if (res.data.length <= 0) {
          CustomToastMessage('Content not available', 'error')
        }
        setTableData(res.data)
        setEntries(res.total)
        setManageContentDataBackUp(res.data)
        setManageContentDataApiLoading(false)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setManageContentDataApiLoading(false))
  }, [
    page,
    limit,
    selectedGrade,
    selectedSubject,
    selectedChapter,
    selectedTopic
  ])

  const getSubjectDetails = (valueId: string) => {
    setSubjectsList([])
    setSubjectOptions([])

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
        if (res.length <= 0) {
          CustomToastMessage('There are not Subjects under this Grade', 'error')
        }
        setSubjectOptions(options)
      })
      .catch(() => setIsTopicApiLoading(false))
      .finally(() => setSubjectApiLoading(false))
  }

  const patternSelectHandler = async (data: any) => {
    getSubjectDetails(data.id)
    setSelectedGrade(data)
    setSelectedSubject(defaultValues)
    setSelectedChapter(defaultValues)
    setSelectedTopic(defaultValues)
  }

  const getChapterDetails = (subjectId: string) => {
    setChaptersOptions([])

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

  const getTopicsDetails = (chapterId: string) => {
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
          CustomToastMessage('There are not topics under this chapter', 'error')
        }
      })
      .catch(() => console.log(false))
      .finally(() => setIsTopicApiLoading(false))
  }

  const handleCheckedPublished = (checked: boolean) => {
    setCheckedPublished(checked)
    if (checked) {
      setManageContentDataApiLoading(true)
      getGameQRCodeListApi({
        page: page + 1,
        limit,
        published: true
      })
        .then((res) => {
          if (res.data.length <= 0) {
            CustomToastMessage('Content not available', 'error')
          }
          setTableData(res.data)
          setEntries(res.total)
          setManageContentDataApiLoading(false)
        })
        .catch(() => console.log(false))
        .finally(() => setManageContentDataApiLoading(false))
    } else {
      setTableData(manageContentDataBackUp)
    }
  }
  const handleDelete = () => {
    DeleteContent(deleteId).then((res) => {
      CustomToastMessage(res.message, 'success') &&
        setManageContentDataApiLoading(true)
      getGameQRCodeListApi({
        page: page + 1,
        limit
      })
        .then((res) => {
          if (res.data.length <= 0) {
            CustomToastMessage('Content not available', 'error')
          }
          setTableData(res.data)
          setEntries(res.total)
          setManageContentDataBackUp(res.data)

          setManageContentDataApiLoading(false)
        })
        .catch(() => console.log(false))
        .finally(() => setManageContentDataApiLoading(false))
    })
    setIsWarning(false)
  }

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
    columnHelper.accessor('gameType', {
      size: 100,
      header: () => {
        return (
          <Flex gap="0px" style={{ width: '120px' }}>
            <P>Game Type</P>
            {/* <DownArrow /> */}
          </Flex>
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

    ...(userInfoV2.role === 'superAdmin'
      ? [
          columnHelper.accessor('isDeleted', {
            size: 70,
            header: () => {
              return (
                <Flex gap="0px">
                  <P></P>
                </Flex>
              )
            },
            cell: (props) => {
              return props.row.original.gameType !== 'Question Corner' ? (
                <PublishBtn
                  style={{
                    background: 'rgba(217, 61, 61, 1)',
                    color: '#fcfdfd',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setIsWarning(true)
                    setdeleteId(props.row.original.qrCodeId)
                  }}
                >
                  Delete
                </PublishBtn>
              ) : (
                <p>N/A</p>
              )
            }
          })
        ]
      : [])
  ]

  return (
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          // isLoading={isLoading}
          onDelete={() => handleDelete()}
          text="Are you sure you want to delete this content?"
        />
      )}
      <Flex
        direction={windowWidth < 900 ? 'column' : 'row'}
        alignItems="center"
        gap="10px"
        style={{ marginBottom: '15px' }}
      >
        <SearchableDropdown
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
              if (e.id) {
                getChapterDetails(String(e.id))
              }
              setSelectedChapter(defaultValues)
              setSelectedTopic(defaultValues)
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
              getTopicsDetails(String(chapter.id))
            }}
            placeHolder="Chapter Name"
            isLoader={isChapterApiLoading}
            required
            options={chaptersOptions}
            fullWidth
          />
          <SearchableDropdown
            popupColour={isWarning}
            label="Select Topic "
            selectedValue={selectedTopic}
            isClear={selectedTopic?.label ? true : false}
            onSelect={(topic: any) => {
              setSelectedTopic(topic)
            }}
            placeHolder="Topic Name"
            isLoader={isTopicApiLoading}
            options={topicsOptions}
            fullWidth
          />
          {userInfoV2.role !== 'superAdmin' ? (
            <Flex alignItems="center" style={{ marginLeft: '30px' }}>
              <TextParaLabel>Show Only Published</TextParaLabel>
              <Form.Check
                checked={checkedPublished}
                type="switch"
                id="reverse-radio-1"
                onChange={(e) => handleCheckedPublished(e.target.checked)}
              />
            </Flex>
          ) : (
            ''
          )}
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
              top: '50%',
              left: '45%'
            }}
            animation={'border'}
          />
        )}
        {
          <BasicTable
            {...{
              maxHeight: '65vh',
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

export default MaterialsV2

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
