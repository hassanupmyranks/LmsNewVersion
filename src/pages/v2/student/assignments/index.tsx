import { PageContainer } from '../../../../components/V2/styledComponents'
import {
  AssignmentCountWrapper,
  AssignmentList,
  Heading,
  Font14,
  BlockSpace,
  Flex,
  Font12,
  TableWrapper,
  TD
} from './styledComponent'
import Assignment from './components/Assignments'
import {
  getAllReviewAssignmentData,
  getSingleReviewAssignmentData,
  getStudentAssignmentCounts,
  getStudentAssignmentDetails
} from '../../../../helpers/V2/apis'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { AssignmentsData } from './types'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../const/V2/routes'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import { FirstRow } from '../../dashboard/StudentDashBoard/styledComponents'
import ColumnApexChart01 from './components/ColumnCommonChart'
import ApexChart7 from '../../dashboard/PieChart'
import {
  Table,
  TableHeader,
  TableRowBody,
  TableRowHead
} from '../../dashboard/SuperAdminDashoard/styledComponents'
import Calender_log from '../../../../assets/calendar.png'
import filter_log from '../../../../assets/filter.png'
import { Button } from './components/ReviewedButton'
import CustomCalendar from './components/calendar'
import moment from 'moment'
import SmallDropdown from '../../../../components/V2/Form/SmallDropdown'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'

const StudentAssignments = () => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const [assignmentAPILoading, setAssignmentAPILoading] = useState(false)
  const [assignments, setAssignments] = useState<AssignmentsData[]>([])
  const [, setSelectedAssignment] = useState<any>(null)
  const [, setReviewedAssignment] = useState<any>(null)
  const [, setButtonStatus] = useState<any>('')
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<any>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showType, setShowType] = useState(false)
  const [assignmentCountDetails, setAssignmentCountDetails] = useState<any>({})
  const [assignmentBarChartDetails, setAssignmentBarChartDetails] = useState<
    any[]
  >([])
  const [tableValues, setTableValues] = useState<any>({
    assignedOn: '',
    type: '',
    status: 'completed'
  })
  const [assignmentDetailsList, setAssignmentDetailsList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const color: Record<string, string> = {
    red: '#fdf1ef',
    blue: '#EDF3FE',
    green: '#EDFEEF'
  }

  const IconColor: Record<string, string> = {
    red: '#FF374E',
    blue: '#0681BC',
    green: '#2F9E3C'
  }

  useEffect(() => {
    setAssignmentAPILoading(true)
    getAllReviewAssignmentData({
      page: 1,
      limit: 50
    })
      .then((res) => {
        if (res) {
          setAssignments(res.data)
          setSelectedAssignment(res.data[0])
          setButtonStatus(res.data[0].status)
          setSelectedAssignmentId(res.data[0]?._id)

          if (res.data[0]?.status === 'reviewed') {
            setLoading(true)
            getSingleReviewAssignmentData(res.data[0]?.submissionId)
              .then((res) => {
                if (res) {
                  setReviewedAssignment(res?.data)
                }
              })
              .catch((error) => console.log({ error }))
              .finally(() => setLoading(false))
          }
        }
      })
      .catch((error) => console.log({ error }))
      .finally(() => setAssignmentAPILoading(false))
  }, [user])

  const handleChangeAssignment = (data: any) => {
    const currentDate = new Date().toISOString()
    if (data?.status === 'submitted') {
      CustomToastMessage('Assignment Alredy Completed', 'success')
    } else if (data?.status === 'pending') {
      history.push({
        pathname: `${ROUTES_V2.STUDENT_SUBMIT_ASSIGNMENT}/${data._id}`
      })
    } else if (data.deadLine < currentDate) {
      CustomToastMessage('Test time is ended', 'error')
    }

    if (data?.status === 'reviewed') {
      setLoading(true)
      getSingleReviewAssignmentData(data?.submissionId)
        .then((res) => {
          if (res) {
            setReviewedAssignment(res?.data)
          }
        })
        .catch((error) => console.log({ error }))
        .finally(() => setLoading(false))
    } else {
      setSelectedAssignment(data)
      setReviewedAssignment(null)
    }
  }

  useEffect(() => {
    setLoading(true)
    getStudentAssignmentCounts()
      .then((res) => {
        if (res) {
          const deStructuredAssignmentdata =
            res?.assignmentsByMonthAndSubject?.reduce(
              (acc: any, current: any) => {
                const { count, month, subjectName, subjectId } = current

                let existing = acc.find(
                  (item: any) => item.subjectId === subjectId
                )

                if (existing) {
                  existing.data[month - 1] = count
                } else {
                  const newDataArray = new Array(12).fill(0)
                  newDataArray[month - 1] = count

                  acc.push({
                    name: subjectName,
                    subjectId: subjectId,
                    data: newDataArray
                  })
                }
                return acc
              },
              []
            )
          setAssignmentBarChartDetails(deStructuredAssignmentdata)
          setAssignmentCountDetails(res?.counts)
          setLoading(false)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log({ error })
      })
      .finally(() => setLoading(false))
    getStudentAssignmentDetails({
      ...tableValues
    }).then((res) => {
      if (res) {
        setAssignmentDetailsList(res?.data)
      }
    })
  }, [tableValues])

  const totalAssignmentCount =
    assignmentCountDetails?.unattempted +
    assignmentCountDetails?.completed +
    assignmentCountDetails?.newAssignments

  const selectStatus = [
    {
      id: 'completed',
      label: 'completed',
      value: 'completed'
    },
    {
      id: 'pending',
      label: 'pending',
      value: 'pending'
    },
    {
      id: 'reviewed',
      label: 'reviewed',
      value: 'reviewed'
    }
  ]

  const filteraRef = useRef<any>(null)

  useOnClickOutside(filteraRef, () => {
    setShowType(false)
    setShowCalendar(false)
  })

  return (
    <PageContainer scroll>
      <FirstRow>
        <AssignmentCountWrapper style={{ width: '30%' }}>
          <BlockSpace
            style={{
              padding: '20px'
            }}
          >
            <Flex
              style={{
                flexDirection: 'column',
                margin: '0 auto'
              }}
            >
              <Font14 style={{ fontSize: '30px' }}>
                {' '}
                {loading ? (
                  <Spinner
                    style={{
                      width: '35px',
                      height: '30px',
                      color: `${BlueButton}`
                    }}
                    animation={'border'}
                  />
                ) : assignmentCountDetails?.newAssignments ? (
                  assignmentCountDetails?.newAssignments
                ) : (
                  0
                )}
              </Font14>
              <Font12 className="mt-4"> New Assignments</Font12>
            </Flex>
          </BlockSpace>{' '}
          <BlockSpace
            style={{
              margin: '0 auto'
            }}
          >
            <Flex style={{ flexDirection: 'column' }}>
              <ApexChart7
                Count={Math.round(
                  (assignmentCountDetails?.completed / totalAssignmentCount) *
                    100
                )}
                Color={'#09ff32'}
                BackColor={'#109727'}
                Height={150}
                Width={140}
              />
              <Font14>
                {' '}
                {loading ? (
                  <Spinner
                    style={{
                      width: '30px',
                      height: '30px',
                      color: `${BlueButton}`
                    }}
                    animation={'border'}
                  />
                ) : assignmentCountDetails?.completed ? (
                  assignmentCountDetails?.completed
                ) : (
                  0
                )}
              </Font14>
              <Font12 className="mt-3"> Completed</Font12>
            </Flex>
            <Flex style={{ flexDirection: 'column' }}>
              <ApexChart7
                Count={Math.round(
                  (assignmentCountDetails?.unattempted / totalAssignmentCount) *
                    100
                )}
                Color={'#ff1e00'}
                BackColor={'#ce6a5d'}
                Height={150}
                Width={140}
              />
              <Font14>
                {' '}
                {loading ? (
                  <Spinner
                    style={{
                      width: '30px',
                      height: '30px',
                      color: `${BlueButton}`
                    }}
                    animation={'border'}
                  />
                ) : assignmentCountDetails?.unattempted ? (
                  assignmentCountDetails?.unattempted
                ) : (
                  0
                )}
              </Font14>
              <Font12 className="mt-3"> In Due</Font12>
            </Flex>
          </BlockSpace>{' '}
        </AssignmentCountWrapper>
        <AssignmentCountWrapper style={{ width: '70%' }}>
          <Heading>Summary</Heading>
          <ColumnApexChart01 height={270} data={assignmentBarChartDetails} />
        </AssignmentCountWrapper>
      </FirstRow>
      <FirstRow>
        <AssignmentCountWrapper
          style={{ height: '650px', width: '30%' }}
          className="mt-4"
        >
          <Heading>New Assignments</Heading>{' '}
          <AssignmentList>
            {assignmentAPILoading ? (
              <div className="d-flex justify-content-center">
                <Spinner
                  style={{
                    width: '30px',
                    height: '30px',
                    color: `${BlueButton}`
                  }}
                  animation={'border'}
                />
              </div>
            ) : (
              assignments
                ?.filter((item) =>
                  moment(item.deadLine).isSameOrAfter(moment(), 'day')
                )
                ?.map((item, index) => {
                  const colorKey =
                    Object.keys(color)[index % Object.keys(color)?.length]
                  const currentColor: any = color[colorKey]
                  const iconColor: any = IconColor[colorKey]
                  return (
                    <Assignment
                      key={`${item}_${index}`}
                      data={item}
                      index={index}
                      length={assignments?.length}
                      currentColor={currentColor}
                      iconColor={iconColor}
                      handleChangeAssignment={(data) => {
                        handleChangeAssignment(data)
                      }}
                      selectedAssignmentId={selectedAssignmentId}
                    />
                  )
                })
            )}
          </AssignmentList>
        </AssignmentCountWrapper>
        <AssignmentCountWrapper
          style={{ height: '650px', width: '70%' }}
          className="mt-4"
          ref={filteraRef}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading>Table View</Heading>
            <div style={{ display: 'flex', position: 'relative' }}>
              <Button
                onClick={() => setShowCalendar(!showCalendar)}
                style={{ background: 'transparent', border: 'none' }}
              >
                <img src={Calender_log} alt="calendar_logo" width={'25px'} />
              </Button>
              {showCalendar && (
                <div
                  style={{ position: 'absolute', left: '-350px', zIndex: '2' }}
                >
                  <CustomCalendar
                    dateState={tableValues?.assignedOn}
                    changeDate={(date: Date) => {
                      setShowCalendar(false)
                      setTableValues({
                        ...tableValues,
                        assignedOn: date
                      })
                    }}
                  />
                </div>
              )}
              <Button
                onClick={() => setShowType(!showType)}
                style={{ background: 'transparent', border: 'none' }}
              >
                <img src={filter_log} alt="calendar_logo" width={'25px'} />
              </Button>{' '}
              {showType && (
                <div
                  style={{
                    position: 'absolute',
                    left: '-200px',
                    zIndex: '2',
                    border: '1px solid lightgrey',
                    padding: '10px',
                    background: '#fff'
                  }}
                >
                  <SmallDropdown
                    label="Select Status"
                    style={{ width: '200px', margin: '10px 0' }}
                    options={selectStatus}
                    onSelect={(data) =>
                      setTableValues({
                        ...tableValues,
                        status: data?.id
                      })
                    }
                    placeholder={'select'}
                  />{' '}
                </div>
              )}
            </div>
          </div>
          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRowHead>
                  <td style={{ textAlign: 'center' }}>Name</td>
                  <td style={{ textAlign: 'center' }}>Subject</td>
                  <td style={{ textAlign: 'center' }}>Description</td>
                  <td style={{ textAlign: 'center' }}>Assigned on</td>
                  <td style={{ textAlign: 'center' }}>Deadline</td>
                </TableRowHead>
              </TableHeader>
              <tbody>
                {assignmentDetailsList?.map((data, index) => {
                  return (
                    <TableRowBody key={index}>
                      <TD>{data?.name}</TD>
                      <TD>{data?.subjectName}</TD>
                      <TD>{`${data?.description?.slice(0, 3)}..`}</TD>
                      <TD>{moment(data.updatedAt).format('Do MMM, YYYY')}</TD>
                      <TD>{moment(data.deadLine).format('Do MMM, YYYY')}</TD>
                    </TableRowBody>
                  )
                })}
              </tbody>
            </Table>
          </TableWrapper>
        </AssignmentCountWrapper>
      </FirstRow>
    </PageContainer>
  )
}

export default StudentAssignments
