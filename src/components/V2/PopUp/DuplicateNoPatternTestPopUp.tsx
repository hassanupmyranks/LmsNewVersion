import { useState } from 'react'
import { ButtonV2, Flex } from '../styledComponents'
import {
  AlignHeading,
  Heading,
  RemoveIcon,
  ButtonWrapper,
  PopUpContainer
} from './styledComponents'
import InputV2 from '../Form/Input'
import styled from 'styled-components'
import { createDuplicateNoPatternTestAPI } from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../ToastMessage'
import { Spinner } from 'react-bootstrap'
import { White } from '../../../const/V2/stylingVariables'

const DuplicateNoPatternTestPopUp = ({
  setPopup,
  testId
}: {
  setPopup: (d: boolean) => void
  testId: string
}) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [testName, setTestName] = useState('')
  // const [testDuration, setTestDuration] = useState<any>()
  const [instruction, setInstruction] = useState('')
  // const [startDate, setStartDate] = useState<any>(new Date())
  // const [testStartTime, setTestStartTime] = useState<any>(
  //   `${addFifteenMinutesCurrentTime(new Date())}`
  // )
  // const [startTimeDefaultFormat, setStartTimeDefaultFormat] = useState<any>({
  //   title: `${new Date().getHours() % 12}`,
  //   firstName: `${`${new Date().getMinutes() + 15}`.padStart(2, '0')}`,
  //   lastName: `${new Date().getHours() > 12 ? 'PM' : 'AM'}`
  // })

  // const [endTimeDefaultFormat, setEndTimeDefaultFormat] = useState<any>({
  //   title: `${new Date().getHours() % 12}`,
  //   firstName: `${`${new Date().getMinutes() + 15}`.padStart(2, '0')}`,
  //   lastName: `${new Date().getHours() > 12 ? 'PM' : 'AM'}`
  // })

  // const [endDate, setEndDate] = useState(new Date())
  // const [testEndTime, setTestEndTime] = useState<any>(
  //   `${addFifteenMinutesCurrentTime(new Date())}`
  // )

  // const [timeValidate, setTimeValidate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = () => {
    setIsSubmit(true)
    if (testName && instruction) {
      setIsSubmit(false)
      const payload = {
        testId: testId,
        name: testName,
        instruction: instruction
      }
      setIsLoading(true)
      createDuplicateNoPatternTestAPI(payload)
        .then((res: any) => {
          CustomToastMessage(res.data.message, 'success')
          setPopup(false)
        })
        .catch((error: any) => CustomToastMessage(error.message, 'error'))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <PopUpContainer>
      <PopUpBox>
        <AlignHeading>
          <div></div>
          <Heading>Duplicate</Heading>
          <RemoveIcon onClick={() => setPopup(false)} />
        </AlignHeading>
        <Flex gap="10px" direction="column" alignItems="baseline">
          <InputV2
            label="Test Name"
            required
            value={testName}
            full
            error={
              testName && testName.length > 50
                ? 'Maximum length exceeded (50 characters max)'
                : testName || !isSubmit
                ? ''
                : 'Field is required'
            }
            placeholder="Enter the test name"
            onChange={(e) => setTestName(e.target.value)}
          />
          {/* <InputV2
            label="Durations"
            required
            full
            type="number"
            value={testDuration}
            error={testDuration || !isSubmit ? '' : 'Field is required'}
            placeholder="Enter test duration"
            onChange={(e) => setTestDuration(e.target.value)}
          /> */}
          {/* <Flex
            gap="0px"
            direction="column"
            alignItems="baseline"
            style={{ width: '100%' }}
          >
            <CalendarInput
              label="Select Start date and Time*"
              title="Start date - Time"
              defaultDate={String(format(startDate, 'do MMMM, yyyy')) || ''}
              defaultTime={testStartTime || ''}
              onChangeDate={(val: any) => {
                setStartDate(val)
              }}
              onChangeTime={(val: any) => {
                let timeFormat = getSelectedTime(val)
                setTestStartTime(timeFormat)
                setStartTimeDefaultFormat(val)
              }}
              minDate={minDate}
              maxDate={maxDate}
              color="#1377B9"
            />
            {isSubmit && timeValidate && (
              <RequiredError>Please Select Upcoming Date & Time</RequiredError>
            )}
          </Flex>
          <CalendarInput
            disabled={true}
            label="Select End date and Time"
            title="End date - Time"
            defaultDate={String(format(endDate, 'do MMMM, yyyy')) || ''}
            defaultTime={testEndTime || ''}
            onChangeDate={() => {}}
            onChangeTime={() => {}}
            minDate={minDate}
            maxDate={maxDate}
            color="#1377B9"
          /> */}

          <InputV2
            label="Instruction"
            required
            value={instruction}
            error={instruction || !isSubmit ? '' : 'Field is required'}
            placeholder="Enter your instruction"
            onChange={(e) => setInstruction(e.target.value)}
          />
        </Flex>
        <ButtonWrapper>
          <ButtonV2 onClick={() => submitHandler()} disabled={isLoading}>
            {isLoading ? (
              <Spinner
                animation={'border'}
                style={{
                  width: '20px',
                  height: '20px',
                  color: `${White}`
                }}
              />
            ) : (
              'Submit'
            )}
          </ButtonV2>
        </ButtonWrapper>
      </PopUpBox>
    </PopUpContainer>
  )
}

export default DuplicateNoPatternTestPopUp

export const PopUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  width: 450px;
  background-color: White;
  border-radius: 1em;
  padding: 12px 12px 10px 12px;
  gap: 10px;

  @media (max-width: 768px) {
    width: 96%;
  }
`
