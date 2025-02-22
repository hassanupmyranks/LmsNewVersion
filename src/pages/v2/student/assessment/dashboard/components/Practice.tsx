import {
  Button,
  Error,
  FieldContainer,
  InputTest,
  PracticeCard,
  PracticeContainer,
  Title
} from './styledComponents'

import { Flex } from '../../../../../../components/V2/styledComponents'
import Dropdown from './Dropdown'
import { useState } from 'react'
import TestDetails from './TestDetails'
import { Spinner } from 'react-bootstrap'
import { PrimaryBlue } from '../../../../../../const/V2/stylingVariables'
import ItemCheckBox from './ItemCheckBox'
import { createPracticeTestAPI } from '../../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../../components/V2/ToastMessage'

const Practice = ({
  isUnitAPILoading,
  units,
  chapters,
  topics,
  courseId,
  isChapterAPILoading,
  handleSelectUnit,
  handleSelectChapter,
  handleSelectTopic,
  handleSuccess,
  subjectsDetails,
  setSubjectsDetails
}: {
  isUnitAPILoading: boolean
  isChapterAPILoading: boolean
  units: any[]
  chapters: any[]
  topics: any[]
  subjectsDetails: any[]
  courseId: string
  isSelectedUnit: string
  handleSelectUnit: (d: string) => void
  handleSelectChapter: (d: string) => void
  handleSelectTopic: (d: string) => void
  handleSuccess: (d: string) => void
  setSubjectsDetails: (d: any) => void
}) => {
  const [difficulty, setDifficulty] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [correctAnsMark, setCorrectAnsMark] = useState<string>('')
  const [inCorrectAnsMark, setInCorrectAnsMark] = useState<string>('')
  const [testName, setTestName] = useState('')
  const [totalTestQuestions, setTotalTestQuestions] = useState(0)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const createPracticeTest = () => {
    if (subjectsDetails.length <= 0) {
      CustomToastMessage('Please select the subject, unit', 'error')
    } else if (
      testName &&
      duration &&
      difficulty &&
      correctAnsMark &&
      inCorrectAnsMark
    ) {
      const filteredSubjects = subjectsDetails.filter((subject) => {
        const isUnitOrChapterMissing = !subject?.unitId || !subject?.chapterId
        const hasNoTopics = !subject?.topicIds || subject?.topicIds?.length <= 0

        return !(isUnitOrChapterMissing && hasNoTopics)
      })

      setIsSubmitted(false)
      const tmpDifficulty =
        difficulty === 'Easy' ? '2' : difficulty === 'Medium' ? '3' : '4'
      setIsLoading(true)
      const payload = {
        testName: testName,
        difficulty: tmpDifficulty,
        duration: Number(duration),
        singleQuestionMark: Number(correctAnsMark),
        negativeMark: Number(inCorrectAnsMark),
        courseId: courseId,
        totalTestQuestions: totalTestQuestions,
        totalMarks: totalTestQuestions * Number(correctAnsMark),
        subjects: filteredSubjects
      }
      createPracticeTestAPI(payload)
        .then(() => {
          handleSuccess('My Tests')
          setSubjectsDetails([])
          CustomToastMessage('Created successfully', 'success')
        })
        .catch((error) => {
          // console.log({ 'Error submit practice test': error.message })
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <PracticeContainer>
        <Flex gap="32px" style={{ width: '100%', height: '100%' }}>
          <PracticeCard>
            <Flex
              justifyContent="space-between"
              style={{ margin: '0 12px 12px 0' }}
            >
              <Title fontSize="20px" fontWeight={600}>
                Select Unit & Chapters
              </Title>
              {/* <UnCheckIcon /> */}
            </Flex>
            <Flex gap="10px" direction="column" alignItems="auto">
              {isUnitAPILoading && (
                <Spinner
                  style={{
                    height: '30px',
                    width: '30px',
                    color: `${PrimaryBlue}`
                  }}
                  animation={'border'}
                />
              )}
              {units &&
                units.length > 0 &&
                units.map((ele, index) => (
                  <ItemCheckBox
                    key={`key_${index}`}
                    unit={ele}
                    chapters={chapters}
                    topics={topics}
                    isSelectedUnit={subjectsDetails.some(
                      (details) => details.unitId === ele._id
                    )}
                    isChapterAPILoading={isChapterAPILoading}
                    handleSelectUnit={handleSelectUnit}
                    handleSelectChapter={handleSelectChapter}
                    handleSelectTopic={handleSelectTopic}
                    subjectsDetails={subjectsDetails}
                  />
                ))}
            </Flex>
          </PracticeCard>
          <PracticeCard>
            <Title
              fontSize="20px"
              fontWeight={600}
              style={{ marginBottom: '16px' }}
            >
              Select Test Settings
            </Title>
            <Flex gap="18px" direction="column">
              <FieldContainer style={{ width: '100%' }}>
                <InputTest
                  placeholder="Test Name"
                  onChange={(e) => setTestName(e.target.value)}
                />
                {testName || !isSubmitted ? (
                  ''
                ) : (
                  <Error>Field is required</Error>
                )}
              </FieldContainer>
              <FieldContainer style={{ width: '100%' }}>
                <InputTest
                  type="number"
                  value={totalTestQuestions === 0 ? '' : totalTestQuestions}
                  placeholder="Total Test Questions"
                  onChange={(e) => {
                    if (Number(e.target.value) <= 0) {
                      setTotalTestQuestions(Number(1))
                    } else {
                      setTotalTestQuestions(Number(e.target.value))
                    }
                  }}
                />
                {totalTestQuestions || !isSubmitted ? (
                  ''
                ) : (
                  <Error>Field is required</Error>
                )}
              </FieldContainer>
              <FieldContainer style={{ width: '100%' }}>
                <Dropdown
                  options={['Easy', 'Medium', 'Hard']}
                  onSelected={(val) => setDifficulty(val)}
                  placeHolder="Difficulty Level"
                  selectedValue={difficulty}
                />
                {difficulty || !isSubmitted ? (
                  ''
                ) : (
                  <Error>Field is required</Error>
                )}
              </FieldContainer>
              {/* <Dropdown
                options={['15 min', '30 min', '45 min']}
                onSelected={(val) => setDuration(val)}
                placeHolder="Duration"
                selectedValue={duration}
              /> */}
              <FieldContainer style={{ width: '100%' }}>
                <InputTest
                  value={duration}
                  placeholder="Enter Duration (min)"
                  onChange={(value) => {
                    setDuration(value.target.value)
                  }}
                />
                {duration || !isSubmitted ? (
                  ''
                ) : (
                  <Error>Field is required</Error>
                )}
              </FieldContainer>

              <FieldContainer style={{ width: '100%' }}>
                <Dropdown
                  options={['+1', '+2', '+3', '+4', '+5']}
                  onSelected={(val) => setCorrectAnsMark(val)}
                  placeHolder="Correct Answer(Marks)"
                  selectedValue={correctAnsMark}
                />
                {correctAnsMark || !isSubmitted ? (
                  ''
                ) : (
                  <Error>Field is required</Error>
                )}
              </FieldContainer>
              <FieldContainer style={{ width: '100%' }}>
                <Dropdown
                  options={['0', '-1', '-2', '-3', '-4', '-5']}
                  onSelected={(val) => setInCorrectAnsMark(val)}
                  placeHolder="InCorrect Answer(Marks)"
                  selectedValue={inCorrectAnsMark}
                />
                {inCorrectAnsMark || !isSubmitted ? (
                  ''
                ) : (
                  <Error>Field is required</Error>
                )}
              </FieldContainer>
            </Flex>
          </PracticeCard>
          <TestDetails
            duration={duration}
            correctAnsMark={correctAnsMark}
            inCorrectAnsMark={inCorrectAnsMark}
            testName={testName}
            totalNumberOfQuestions={totalTestQuestions}
          />
        </Flex>
      </PracticeContainer>
      <Flex justifyContent="flex-end">
        <Button
          to={'#'}
          aria-disabled={isLoading}
          onClick={() => {
            setIsSubmitted(true)
            createPracticeTest()
          }}
        >
          {isLoading ? (
            <Spinner
              style={{
                height: '20px',
                width: '20px',
                color: `${PrimaryBlue}`
              }}
              animation={'border'}
            />
          ) : (
            'Create Test'
          )}
        </Button>
      </Flex>
    </>
  )
}

export default Practice
