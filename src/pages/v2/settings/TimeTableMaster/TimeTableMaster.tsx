import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Container,
  EditTd,
  FirstEditTd,
  FirstTh,
  Flex,
  FormContainerV2,
  Heading,
  InputFlex,
  LastTh,
  StyledContainer,
  Table,
  TableContainer,
  Td,
  Th,
  TimerBox,
  Tr
} from './StyledComponents'

import { ReactComponent as AddIcon } from '../../../../assets/svg/add-plus.svg'
import { ReactComponent as DeleteIcon } from '../../../../assets/svg/delete-icon.svg'
import TimePickerInput from '../../../../components/V2/TimePickerInput/TimePickerInput'
import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../components/V2/Form/types'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { InstituteDetails, NewBranchDetails } from '../../../../utils/types'
import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
import {
  getBranchAPI,
  getInstitutesAPI,
  getCourses,
  geTimeTableAPI,
  getSingleTimeTableAPI
} from '../../../../helpers/V2/apis'
import { ButtonV2 } from '../../../../components/V2/styledComponents'
import InputV2 from '../../../../components/V2/Form/Input'
import AssignTimeTableToBatchPopup from './AssignTimeTableToBatchPopup'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../const/V2/stylingVariables'

export interface breakTimingsType {
  id: number
  type: string
  duration: number
  afterSession: number
}

const TimeTableMaster = () => {
  const [institutes, setInstitutes] = useState<SearchableDropdownOptionData[]>(
    []
  )

  const {
    users: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      users: state.userV2
    }),
    shallowEqual
  )

  const defaultValue = useMemo(() => {
    return {
      label: '',
      id: ''
    }
  }, [])

  const [timeTableId, setTimeTableId] = useState()
  const [branch, setBranch] = useState<any[]>([])
  const [timeTable, setTimeTable] = useState<any[]>([])
  const [timeTableLoading, setTimeTableLoading] = useState(false)
  const [limit, setLimit] = useState<number>(10)
  const [selectedBranch, setSelectedBranch] = useState<any>({
    id: '',
    label: ''
  })

  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])
  const [institutesApiLoading, setInstitutesAPILoading] = useState(false)
  const [branchApiLoading, setBranchApiLoading] = useState(false)
  const [selectInstitute, setSelectInstitute] = useState(defaultValue)
  const [selectedInstitute, setSelectedInstitute] = useState({
    institute_id: '',
    institute_name: ''
  })
  const [classStartTime, setClassStartTime] = useState('')
  const [classEndTime, setClassEndTime] = useState('')
  const [isAssignPopup, setIsAssignPopup] = useState(false)
  const [breakTimings, setBreakTimings] = useState<breakTimingsType[]>([])

  const [isEdit, setIsEdit] = useState(false)
  const [totalPeriods, setTotalPeriods] = useState<number | any>()
  // const [isSubmit, setIsSubmit] = useState(false)

  const Optionsdropdown = [
    { id: 'shortBreak', label: 'Short Break' },
    { id: 'lunchBreak', label: 'Lunch Break' }
  ]
  const getBranch = (instituteId: string) => {
    const payload = {
      page: 1,
      limit: 150,
      instituteId: instituteId
    }
    setBranchApiLoading(true)
    getBranchAPI(payload)
      .then((res) => {
        const newBranch = res?.data?.map((branch: NewBranchDetails) => {
          return {
            value: ``,
            label: branch.name,
            id: branch?._id
          }
        })
        setBranch(newBranch)
      })
      .catch((err) => CustomToastMessage(err.message, 'error'))
      .finally(() => setBranchApiLoading(false))
  }

  useEffect(() => {
    if (userInfoV2.role === 'instituteAdmin') {
      setSelectInstitute({
        label: userInfoV2.instituteName,
        id: userInfoV2.instituteId
      })
      getBranch(userInfoV2.instituteId)
    }

    if (userInfoV2.role === 'superAdmin') {
      setInstitutesAPILoading(true)
      getInstitutesAPI({ page: 1, limit: 150 })
        .then((data) => {
          const newInstitutes = data?.data?.map((item: InstituteDetails) => {
            return {
              value: ``,
              label: item.name,
              id: item?._id
            }
          })
          setInstitutes(newInstitutes)
        })
        .catch((err) => CustomToastMessage(err.message, 'error'))
        .finally(() => setInstitutesAPILoading(false))
    }

    if (userInfoV2.role === 'teacher' || userInfoV2.role === 'branchAdmin') {
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
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
          setGradeData(newGrade)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
  }, [userInfoV2])

  const SelectedInstitute = (selectedValue: SearchableDropdownOptionData) => {
    setSelectInstitute({
      id: String(selectedValue.id),
      label: selectedValue.label
    })
    setSelectedBranch({ id: '', label: '' })
    setBranch([])
    setGradeData([])
    setSelectedGrade({
      value: '',
      label: '',
      id: ''
    })
    if (selectedValue.id) {
      getBranch(String(selectedValue.id))
    }
    setSelectedInstitute({
      institute_id: String(selectedValue.id),
      institute_name: selectedValue.label
    })
  }

  const SelectedBranch = (selectedValue: any) => {
    setSelectedBranch({
      id: '',
      label: ''
    })
    if (selectedValue.id) {
      let newGrade: any = []
      setGradeLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        branchId: selectedValue?.id ? selectedValue?.id : ''
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
          if (res.data.length <= 0) {
            CustomToastMessage('There are no Grades under this Branch', 'error')
          }
          setGradeData(newGrade)
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setGradeLoading(false))
    }
    setSelectedBranch(selectedValue)
  }

  useEffect(() => {
    setTimeTableLoading(true)
    geTimeTableAPI()
      .then((res) => {
        const newTimeTable = res?.data?.map((timeTable: any) => {
          const batchNames =
            timeTable?.batches?.map((batch: any) => batch.batchName) || []
          const scheduleDetails = timeTable?.scheduleDetails || []
          return {
            timeTableId: timeTable._id,
            branchName: timeTable.branchName,
            courseName: timeTable.courseName,
            batchNames,
            startTime: timeTable.startTime,
            endTime: timeTable.endTime,
            noOfSessionsPerDay: timeTable.noOfSessionsPerDay,
            scheduleDetails: scheduleDetails
          }
        })
        setTimeTable(newTimeTable)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setTimeTableLoading(false))
  }, [limit])

  // Function to add a dropdown for a break type
  const addDropdown = () => {
    setBreakTimings((prev) => [
      ...prev,
      { id: Date.now(), type: '', duration: 0, afterSession: 0 }
    ])
  }

  // Function to update values of a specific dropdown
  const updateBreakTiming = (id: number, field: string, value: any) => {
    setBreakTimings((prev) =>
      prev.map((breakItem) =>
        breakItem.id === id ? { ...breakItem, [field]: value } : breakItem
      )
    )
  }

  // Function to remove a dropdown
  const removeDropdown = (id: number) => {
    setBreakTimings((prev) => prev.filter((breakItem) => breakItem.id !== id))
  }

  const getSingleTimeTable = (id: any) => {
    setIsEdit(true)
    getSingleTimeTableAPI(id)
      .then((res) => {
        setSelectedBranch({
          id: res.data.branchId,
          label: res.data.branchName,
          value: res.data.branchName
        })
        setSelectedGrade({
          id: res.data.courseId,
          label: res.data.courseName,
          value: res.data.courseName
        })
        setClassStartTime(res.data.startTime)
        setClassEndTime(res.data.endTime)
        setTotalPeriods(res.data.noOfSessionsPerDay)
        setBreakTimings(
          res.data.scheduleDetails
            .filter((breakItem: any) => breakItem.isBreak) // Keep only items where isBreak is true
            .map((breakItem: any) => ({
              id: breakItem.name,
              type: breakItem.breakType,
              duration: breakItem.duration,
              afterSession: breakItem.afterSession
            }))
        )
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
    // .finally(() => setTimeTableLoading(false))
  }
  const resetForm = () => {
    setSelectedBranch({ id: '', label: '' })
    setSelectedGrade({ value: '', label: '', id: '' })
    setClassStartTime('')
    setClassEndTime('')
    setTotalPeriods('')
    setBreakTimings([])
  }

  return (
    <FormContainerV2 style={{ margin: '20px' }}>
      <StyledContainer>
        {userInfoV2.role === 'superAdmin' && (
          <SearchableDropdown
            label="Select Institute / School"
            placeHolder="Enter or select institute / school"
            options={institutes}
            onSelect={SelectedInstitute}
            selectedValue={selectInstitute}
            isClear={selectedInstitute.institute_name ? true : false}
            defaultValue=""
            required
            isLoader={institutesApiLoading}
            // error={
            //   selectedInstitute.institute_name || !isSubmit
            //     ? ''
            //     : 'Field is required'
            // }
          />
        )}

        {(userInfoV2.role === 'superAdmin' ||
          userInfoV2.role === 'instituteAdmin') && (
          <SearchableDropdown
            selectedValue={selectedBranch}
            isLoader={branchApiLoading}
            label="Select Branch"
            placeHolder="Enter or select branch"
            options={branch}
            isClear={selectedBranch.id ? true : false}
            onSelect={(data) => {
              SelectedBranch(data)
              setGradeData([])
              setSelectedGrade({
                value: '',
                label: '',
                id: ''
              })
            }}
            fullWidth
            required
            // error={selectedBranch.id || !isSubmit ? '' : 'Field is required'}
            // error= {
            //   selectedBranch.label? '' : 'field is required'
            // }
          />
        )}

        <SearchableDropdown
          style={{ width: '290px', marginTop: '6px' }}
          isLoader={gradeLoading}
          label={'Select Grade'}
          placeHolder={'Please Select Grade'}
          options={gradeData}
          isClear={selectedGrade?.id ? true : false}
          required
          // error={selectedGrade?.label || !isSubmit ? '' : 'Field is required'}
          onSelect={(option: any) => {
            setSelectedGrade(option)
          }}
          selectedValue={selectedGrade}
        />
      </StyledContainer>

      <Flex
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '10px'
        }}
      >
        <Box>
          <Heading
            style={{
              marginBottom: '0px'
            }}
          >
            Add Timings for Classes and Breaks
          </Heading>

          <TimerBox>
            <TimePickerInput
              label="Select Start Time"
              title="Select Start Time"
              defaultTime={classStartTime}
              onChangeTime={(value: any) => setClassStartTime(value)}
              color="#1377B9"
            />
            <TimePickerInput
              label="Select End Time"
              title="Select End Time"
              defaultTime={classEndTime}
              onChangeTime={(value: any) => setClassEndTime(value)}
              color="#1377B9"
            />
          </TimerBox>
          <InputFlex
            style={{
              width: '100%',
              display: 'flex',
              marginTop: '15px',
              alignItems: 'center',
              gap: '50px'
            }}
          >
            <InputV2
              label="Total Sessions/Periods"
              value={totalPeriods}
              required
              full
              type="number"
              // error={totalPeriods || isSubmit ? '' : 'Field is required'}
              placeholder="Enter Total Number Of Sessions"
              onChange={(e) => setTotalPeriods(Number(e.target.value))}
            />

            <InputFlex
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '20px'
              }}
            >
              <Heading
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0px'
                }}
              >
                Add Break
              </Heading>

              <AddIcon
                style={{ width: '25px', height: '25px', alignItems: 'center' }}
                onClick={() => {
                  if (Optionsdropdown) addDropdown()
                }}
              />
            </InputFlex>
          </InputFlex>

          <InputFlex
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'stretch'
            }}
          >
            {breakTimings.map((breakItem) => (
              <InputFlex
                key={breakItem.id}
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center'
                }}
              >
                <SearchableDropdown
                  label="Select Break Type"
                  selectedValue={Optionsdropdown.find(
                    (option) => option.id === breakItem.type
                  )}
                  fullWidth
                  isClear={breakItem.type ? true : false}
                  onSelect={(data) =>
                    updateBreakTiming(breakItem.id, 'type', data?.id || '')
                  }
                  placeHolder="Select an option"
                  options={Optionsdropdown}
                  required
                />

                <InputV2
                  label="Duration of Break (mins)"
                  required
                  full
                  type="number"
                  value={breakItem.duration === 0 ? '' : breakItem.duration}
                  placeholder="Enter Duration in mins"
                  onChange={(e) =>
                    updateBreakTiming(
                      breakItem.id,
                      'duration',
                      Number(e.target.value)
                    )
                  }
                />

                <InputV2
                  label="Break After Session"
                  required
                  full
                  type="number"
                  value={
                    breakItem.afterSession === 0 ? '' : breakItem.afterSession
                  }
                  placeholder="Enter Break After Session"
                  onChange={(e) =>
                    updateBreakTiming(
                      breakItem.id,
                      'afterSession',
                      Number(e.target.value)
                    )
                  }
                />

                <DeleteIcon
                  style={{
                    cursor: 'pointer',
                    width: '100px',
                    height: '100px',
                    alignItems: 'center',
                    paddingTop: '20px'
                  }}
                  onClick={() => removeDropdown(breakItem.id)}
                />
              </InputFlex>
            ))}
          </InputFlex>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              paddingTop: '10px',
              justifyContent: 'flex-end',
              marginTop: '10px'
            }}
          >
            <ButtonV2
              onClick={() => {
                setIsAssignPopup(true)
                // setIsSubmit(true)
              }}
            >
              {isEdit ? 'Update' : 'Assign'}
            </ButtonV2>
          </div>
        </Box>

        {isAssignPopup && (
          <AssignTimeTableToBatchPopup
            setPopup={() => {
              setLimit(limit + 1)
              setIsAssignPopup(false)
              // setReassign(null)
            }}
            branchId={selectedBranch?.id}
            courseId={selectedGrade?.id}
            startTime={classStartTime}
            endTime={classEndTime}
            breakTimings={breakTimings}
            totalNoOfSessionsPerDay={Number(totalPeriods)}
            isEdit={isEdit}
            timeTableId={timeTableId}
            resetForm={resetForm}
            // setIsEdit={setIsEdit}
            // updatedBatch={selectedBatch}
          />
        )}
        <div></div>

        <Container>
          {/* <Heading style={{ marginBottom: '0px' }}>
              Institutions Time Table
            </Heading> */}

          <TableContainer>
            {timeTableLoading && (
              <Spinner
                style={{
                  width: '44px',
                  height: '44px',
                  color: `${BlueButton}`,
                  position: 'absolute',
                  top: '55%',
                  left: '75%'
                }}
                animation={'border'}
              />
            )}
            <Table>
              <thead>
                <tr>
                  <FirstTh>Branch Name</FirstTh>
                  <Th>Course Name</Th>
                  <Th>Batch Name</Th>
                  <Th>Start & End Time</Th>
                  <Th>Short Break</Th>
                  <Th>Lunch Break</Th>
                  <LastTh>Action</LastTh>
                </tr>
              </thead>

              <tbody>
                {timeTable.map((row, index) => {
                  const shortBreak = row.scheduleDetails.find(
                    (session: any) =>
                      session.type === 'break' && session.name === 'shortBreak'
                  )
                  const lunchBreak = row.scheduleDetails.find(
                    (session: any) =>
                      session.type === 'break' && session.name === 'lunchBreak'
                  )

                  return (
                    <Tr key={index}>
                      <FirstEditTd>{row.branchName}</FirstEditTd>
                      <Td>{row.courseName}</Td>
                      <Td>{row.batchNames.join(', ')}</Td>
                      <Td>
                        {row.startTime} - {row.endTime}
                      </Td>
                      <Td>
                        {shortBreak
                          ? `${shortBreak.startTime} - ${shortBreak.endTime}`
                          : 'N/A'}
                      </Td>
                      <Td>
                        {lunchBreak
                          ? `${lunchBreak.startTime} - ${lunchBreak.endTime}`
                          : 'N/A'}
                      </Td>
                      <EditTd
                        onClick={() => {
                          getSingleTimeTable(row.timeTableId)
                          setTimeTableId(row.timeTableId)
                        }}
                      >
                        Edit
                      </EditTd>
                    </Tr>
                  )
                })}
              </tbody>
            </Table>
          </TableContainer>
        </Container>
      </Flex>
    </FormContainerV2>
  )
}

export default TimeTableMaster
