import React, { useEffect, useRef, useState } from 'react'
import { Flex } from '../../addAssignment/styledComponents'
import { ButtonV2 } from '../../../../components/V2/styledComponents'
import {
  PageWrapper,
  Table,
  TableRow,
  TableRowFirst,
  TableRowLast,
  TableWrapper,
  Uploaded,
  Text
} from '../studentBulkUpload/styledComponents'
import {
  ColumnWrapper,
  ContentRow,
  FormContainerV2,
  Heading,
  SmallContainer,
  StyledContainer
} from './styleComponents'
import DownloadDropdown from './DownloadDropdown'
import { useParams } from 'react-router-dom'
import {
  assessmentMarkEntryAPI,
  downloadOfflineSubmits,
  getNewAllTestData,
  getOfflineSubmitsAPI
} from '../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import debounce from 'lodash/debounce' // You need to install lodash

interface TypeData {
  studentName: string
  hasSubmitted: boolean
  totalMarks: number | null
  scoredMarks: number | null
  studentId: string
}

const ExamMarkEntry = () => {
  const params: any = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [studentData, setStudentData] = useState<TypeData[]>([])
  const [testData, setTestData] = useState<any>({})
  const [selectedStudents, setSelectedStudents] = useState<String[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [isAbsent, setIsAbsent] = useState(false)
  const [mark, setMark] = useState(0)
  const [limit, setLimit] = useState(10)

  const containerRef: any = useRef()
  const debouncedScroll = useRef<any>(null)
  const [total, setTotal] = useState(0)
  const [length, setLength] = useState(0)
  const [listPage, setListPage] = useState(1)

  useEffect(() => {
    if (params?.id && params?.bId) {
      setIsLoading(true)
      getOfflineSubmitsAPI(params?.id, {
        limit: limit,
        page: 1,
        batchId: params?.bId
      })
        .then((res) => {
          setStudentData(res.data)
          setTotal(res.total)
          setLength(res.data.length)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }, [params, limit])

  const handleExcelDownload = () => {
    setIsLoading(true)
    downloadOfflineSubmits(params?.id, {
      batchId: params?.bId,
      studentIds: selectedStudents
    })
      .then((res) => {
        CustomToastMessage('Downloaded Successfully', 'success')
        let link: any = document.createElement('a')
        link.download = 'Excel File'
        link.href = res.data.filePath
        link.click()

        setSelectedStudents([])
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }

  // const handlePdfDownload = () => {
  //   console.log('Downloading PDF...')
  // }

  const options = [
    { label: ' Excel', action: handleExcelDownload }
    // { label: ' PDF', action: handlePdfDownload }
  ]

  useEffect(() => {
    setIsLoading(true)
    getNewAllTestData({
      skip: 0,
      limit: 1,
      isOffline: true,
      test_id: params?.id
    })
      .then((response: any) => {
        setTestData(response?.data[0])
        if (response.data.length === 0) {
          CustomToastMessage(
            'There are no Offline Assessments Created',
            'error'
          )
        }
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setIsLoading(false))
  }, [params?.id])

  const handleSelection = (ID: string) => {
    const isChecked = selectedStudents.indexOf(ID)
    let tmpSelected = [...selectedStudents]
    if (isChecked !== -1) {
      tmpSelected = tmpSelected.filter((id) => id !== ID)
    } else {
      tmpSelected.push(ID)
    }
    setSelectedStudents(tmpSelected)
  }

  const handleMarkEntry = (testID: string, stdId: string) => {
    if (testID && (mark || isAbsent)) {
      setIsLoading(true)
      assessmentMarkEntryAPI(testID, {
        batchId: params?.bId,
        students: [
          {
            studentId: stdId,
            isAbsent: isAbsent,
            mark: mark
          }
        ]
      })
        .then((res) => {
          CustomToastMessage(res.message, 'success')
          setLimit(limit + 1)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    } else {
      CustomToastMessage('Please assign the marks', 'error')
    }
  }

  const handleCheckedAll = () => {
    let newSeletedStudent: any = []
    studentData.map((item: TypeData) => {
      newSeletedStudent.push(item.studentId)
    })
    setSelectedStudents(newSeletedStudent)
  }
  const handleScrollInfinite = (total: number, length: number) => {
    if (total > length) {
      setIsLoading(true)
      getOfflineSubmitsAPI(params?.id, {
        limit: limit,
        page: listPage + 1,
        batchId: params?.bId
      })
        .then((res) => {
          setStudentData((prev) => [...prev, ...res.data])
          setTotal(res.total)
          setLength(res.data.length)
        })
        .catch((error) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    const container = containerRef.current
    const handleScroll = debounce(() => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight
      const clientHeight = container.clientHeight
      if (scrollHeight < scrollTop + (clientHeight + 3)) {
        handleScrollInfinite?.(total, length)
        setListPage(listPage + 1)
      }
    }, 1000)

    if (container) {
      debouncedScroll.current = handleScroll
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
        debouncedScroll.current.cancel() // Cancel any pending debounced calls
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, length, listPage])

  return (
    <PageWrapper style={{ flexDirection: 'column' }}>
      <FormContainerV2 style={{ marginBottom: '0px' }}>
        <StyledContainer>
          <SmallContainer>
            <ContentRow>
              <Heading>Grade:</Heading>
              <Text>{testData?.course_name}</Text>
            </ContentRow>
            <ContentRow>
              <Heading>Date:</Heading>
              <Text>{moment(testData.createAt).format('DD MMMM, YYYY')}</Text>
            </ContentRow>
          </SmallContainer>
          <SmallContainer>
            <ContentRow>
              <Heading>Batch:</Heading>
              <Text>
                {testData?.batch_details
                  ?.map((batch: any) => batch?.batch_name)
                  .join(', ')}
              </Text>
            </ContentRow>
            <ContentRow>
              <Heading>Test Name:</Heading>
              <Text>{testData?.institute_test_name}</Text>
            </ContentRow>
          </SmallContainer>
          <ColumnWrapper>
            <DownloadDropdown options={options} />
          </ColumnWrapper>
        </StyledContainer>
      </FormContainerV2>
      {isLoading && (
        <Spinner
          style={{
            width: '44px',
            height: '44px',
            color: `${BlueButton}`,
            position: 'absolute',
            top: '70%',
            left: '45%'
          }}
          animation={'border'}
        />
      )}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allChecked}
                  style={{ marginLeft: '15px' }}
                  onChange={() => {
                    if (!allChecked) {
                      handleCheckedAll()
                    } else {
                      setSelectedStudents([])
                    }
                    setAllChecked(!allChecked)
                  }}
                />
              </th>
              <th>Sl.No</th>
              <th>Student Name</th>
              <th>Scored Marks</th>
              <th>Total Marks</th>
              <th>is Absent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((item: TypeData, index) => (
              <TableRow key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents?.includes(item?.studentId)}
                    onChange={() => handleSelection(item?.studentId)}
                  />
                </td>
                <TableRowFirst style={{ width: '10%' }}>
                  {index + 1}
                </TableRowFirst>
                <td>{item.studentName}</td>
                <td>
                  {item.scoredMarks ? (
                    item.scoredMarks
                  ) : (
                    <input
                      type="number"
                      style={{ width: '60px' }}
                      onChange={(e) => {
                        setMark(Number(e.target.value))
                        setIsAbsent(false)
                      }}
                    />
                  )}
                </td>
                <td>{item.totalMarks || 0}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => {
                      setIsAbsent(!isAbsent)
                      setMark(0)
                    }}
                  />
                </td>
                <TableRowLast>
                  <Flex style={{ width: '100%', justifyContent: 'center' }}>
                    {item.hasSubmitted ? (
                      <Uploaded
                        style={{ display: 'flex', alignContent: 'center' }}
                      >
                        Submitted
                      </Uploaded>
                    ) : (
                      <ButtonV2
                        onClick={() =>
                          handleMarkEntry(params?.id, item?.studentId)
                        }
                        style={{ padding: '5px 20px' }}
                      >
                        Submit
                      </ButtonV2>
                    )}
                  </Flex>
                </TableRowLast>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </PageWrapper>
  )
}

export default ExamMarkEntry
