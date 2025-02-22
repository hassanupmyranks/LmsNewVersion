import { useEffect, useMemo, useState } from 'react'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../components/V2/Form/types'
import {
  ButtonV2,
  Flex,
  PageContainer
} from '../../../components/V2/styledComponents'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import {
  deleteSessionsAPI,
  getAllSessionAPI,
  getBatchAPI,
  getCourses
} from '../../../helpers/V2/apis'
import { NewBatchDetails } from '../../../utils/types'
import {
  Card,
  CompletedButton,
  ExpiredButton,
  FullPage,
  HeadingName,
  InProgresButton
} from './StyledComponent'
import SingleCalendar from '../assignment/Review/ReviewAssignment/Components/Calender'
import { Heading } from '../../../components/V2/CourseCard/styledComponents'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { Chapters, GetSessionData } from './components/types'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import PopupMenu from '../../../components/V2/Table/PopupMenu'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/Delete.svg'
import { ReactComponent as EditIcon } from '../../../assets/svg/edit-icon.svg'
import WarningPopUp from '../../../components/V2/PopUp/WarningPopup'

const PrepMode = () => {
  const history = useHistory()
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [selectedGrade, setSelectedGrade] = useState<
    SearchableDropdownOptionData | any
  >({ id: '', label: '' })

  const [selectedBatch, setSelectedBatch] = useState<
    SearchableDropdownOptionData | any
  >()
  const [batch, setBatch] = useState<any[]>([])
  const [isBatchLoading, setIsBatchLoading] = useState(false)
  const [fromDate, setFromDate] = useState<any>('')
  const [sesionsLoading, setIsSessionsLoading] = useState(false)
  const [sessionList, setSessionList] = useState<GetSessionData[]>([])
  const [limit, setLimit] = useState(40)
  const [isWarning, setIsWarning] = useState(false)
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    setIsSessionsLoading(true)
    getAllSessionAPI({
      limit: limit,
      page: 1,
      courseId: selectedGrade?.id,
      batchId: selectedBatch?.id,
      sessionDate: fromDate
    })
      .then((res) => {
        setSessionList(res.data)
      })
      .catch((error) => CustomToastMessage(error, 'error'))
      .finally(() => setIsSessionsLoading(false))
  }, [selectedGrade, selectedBatch, fromDate, limit])

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
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
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))
  }, [])

  useEffect(() => {
    if (selectedGrade?.id) {
      setIsBatchLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        courseId: selectedGrade.id
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
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Batches under this Grade', 'error')
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setIsBatchLoading(false))
    }
  }, [selectedGrade.id])

  const handleDelete = (sessionID: string) => {
    if (sessionID) {
      setIsSessionsLoading(true)
      deleteSessionsAPI(sessionID)
        .then((res) => {
          if (res) {
            CustomToastMessage(`${res.message}`, 'success')
            setLimit(limit + 1)
            setIsWarning(false)
          }
        })
        .catch((error) => CustomToastMessage(`${error.message}`, 'error'))
        .finally(() => setIsSessionsLoading(false))
    }
  }

  const editCellOption = useMemo(
    () => [
      {
        Icon: <EditIcon />,
        label: 'Edit',
        onClick: (id: string | number) => {
          history.push(`${ROUTES_V2.PREP_MODE_EDIT}/${id}`)
        }
      },
      {
        Icon: <DeleteIcon />,
        label: 'Delete',
        onClick: (id: any) => {
          setSessionId(id)
          setIsWarning(true)
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <PageContainer>
      {isWarning && (
        <WarningPopUp
          setIsWarning={setIsWarning}
          isLoading={sesionsLoading}
          onDelete={() => handleDelete(sessionId)}
          text="Are you sure you want to delete this session?"
        />
      )}
      <FullPage>
        <Flex justifyContent="space-between">
          <Flex gap="10px">
            <SearchableDropdown
              style={{ width: '320px' }}
              isLoader={gradeLoading}
              label={'Select Grade'}
              placeHolder={'Please Select Grade'}
              options={gradeData}
              isClear={selectedGrade?.id ? true : false}
              onSelect={(option: any) => {
                setSelectedGrade(option)
                setSelectedBatch({ id: '', label: '' })
              }}
              selectedValue={selectedGrade}
            />
            <SearchableDropdown
              style={{ width: '320px' }}
              selectedValue={selectedBatch}
              isLoader={isBatchLoading}
              label="Select Batch / Section"
              placeHolder="Enter or select Batch / Section"
              options={batch}
              isClear={selectedBatch?.id ? true : false}
              onSelect={(option: any) => {
                setSelectedBatch(option)
              }}
            />
          </Flex>
          <Flex alignItems="end" gap="10px">
            {fromDate && (
              <ButtonV2 onClick={() => setFromDate('')}>Clear</ButtonV2>
            )}
            <SingleCalendar
              label="Select Date"
              value={String(fromDate)}
              onChange={() => {}}
              placeholder={'Select Date'}
              onChangeDate={(d: any) => {
                setFromDate(d)
              }}
            />
          </Flex>
        </Flex>
        <Flex wrap gap="10px" style={{ marginTop: '20px' }}>
          {sesionsLoading && (
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
          {sessionList?.length > 0 &&
            sessionList.map((session: GetSessionData, index: number) => (
              <Card key={`key_${index}`}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <Heading>
                    {moment(session.sessionDate).format('DD MMM, YYYY')}
                  </Heading>

                  {session.status !== 'completed' && (
                    <div
                      style={{
                        height: '30px',
                        width: '30px',
                        border: '3px solid #197BBD',
                        borderRadius: '100px',
                        padding: '4px',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <PopupMenu id={session?._id} options={editCellOption} />
                    </div>
                  )}
                  {/* </CardIcon> */}
                </div>
                <div
                  style={{
                    height: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly'
                  }}
                >
                  <Flex gap="10px" alignItems="start">
                    <Heading style={{ fontSize: '14px' }}>Grade: </Heading>
                    <HeadingName style={{ fontSize: '14px' }}>
                      {session.courseName}
                    </HeadingName>
                  </Flex>
                  <Flex gap="10px" alignItems="start">
                    <Heading style={{ fontSize: '14px' }}>
                      Batch / Section:{' '}
                    </Heading>
                    <HeadingName style={{ fontSize: '14px' }}>
                      {session.batchName}
                    </HeadingName>
                  </Flex>
                  <Flex gap="10px" alignItems="start">
                    <Heading style={{ fontSize: '14px' }}>Subject: </Heading>
                    <HeadingName style={{ fontSize: '14px' }}>
                      {session.subjectName}
                    </HeadingName>
                  </Flex>
                  <Flex gap="10px" alignItems="start">
                    <Heading style={{ fontSize: '14px' }}>Chapters: </Heading>
                    <HeadingName style={{ fontSize: '14px' }}>
                      {session.chapters
                        .map((ch: Chapters) => ch.chapterName)
                        .join(', ')}
                    </HeadingName>
                  </Flex>

                  <Flex gap="10px" alignItems="start">
                    <Heading style={{ fontSize: '14px' }}> Topics: </Heading>
                    <HeadingName style={{ fontSize: '14px' }}>
                      {' '}
                      {session.chapters
                        .map((ch) =>
                          ch.topics.map((topic) => topic.topicName).join(', ')
                        )
                        .join(', ')}
                    </HeadingName>
                  </Flex>
                  <Flex gap="10px" alignItems="start">
                    <Heading style={{ fontSize: '14px' }}>
                      Session Number:{' '}
                    </Heading>
                    <HeadingName style={{ fontSize: '14px' }}>
                      {session.sessionNo}{' '}
                    </HeadingName>
                  </Flex>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* #01B574 */}
                  {session.status === 'completed' && (
                    <CompletedButton>Completed</CompletedButton>
                  )}

                  {session.status === 'expired' && (
                    <ExpiredButton>Expired</ExpiredButton>
                  )}

                  {session.status === 'created' && (
                    <ButtonV2
                      onClick={() => {
                        history.push(
                          `${ROUTES_V2.FINAL_PAGE_TEACH_MODE}/${session._id}`
                        )
                      }}
                    >
                      Start Session
                    </ButtonV2>
                  )}
                  {session.status === 'inProgress' && (
                    <InProgresButton
                      onClick={() => {
                        history.push(
                          `${ROUTES_V2.FINAL_PAGE_TEACH_MODE}/${session._id}`
                        )
                      }}
                    >
                      In Progress
                    </InProgresButton>
                  )}
                </div>
              </Card>
            ))}
        </Flex>
      </FullPage>
    </PageContainer>
  )
}

export default PrepMode
