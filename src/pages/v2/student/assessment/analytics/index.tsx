import AIPredictionCard from '../../../../../components/V2/AICard/AICard'
import AverageScoreCard from '../../../../../components/V2/AverageScore'
import { Flex } from '../../../../../components/V2/styledComponents'
import ApexChart7 from '../../../dashboard/PieChart'
import { FinishTest } from '../dashboard/components/FinishedAssignTest'
import {
  MainContainer,
  SubPar,
  DetailsCard,
  TestTitle,
  DurationSec,
  DurationText,
  CardsWithAnalytics,
  Cards,
  Button,
  SmallWrap,
  Rank
} from './analyticsStyled'
import Questions from './components/Questions'
import AnalysisCard from '../../../../../components/V2/Analysis'
import { ReactComponent as ClockIcon } from '../../../../../assets/svg/AIClock.svg'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  // AttemptedTestSubjectDetails,
  ResultAnalytics
  // SectionDetails
} from '../../../../../utils/types'
import { getTestAnalytics } from '../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import ROUTES_V2 from '../../../../../const/V2/routes'
import { BlueButton } from '../attemptTest/styledComponents'
import { sectionsDetails, subjectDetails } from './type'
import QuestionsNumber from './components/QuestionsNumber'
import { FlexBetween } from '../../../../../components/V2/AICard/styledComponents'
import {
  Correct,
  Min,
  Scroll,
  TestPercent,
  WrapHeading
} from '../../../assessment/analytics/styledComponents'

const StudentAnalytics = () => {
  const params: any = useParams()
  const history = useHistory()
  const [testResults, setTestResults] = useState<ResultAnalytics>()
  const [, setIsLoading] = useState(false)

  const [testDetails, setTestDetails] = useState<subjectDetails[]>([])

  const [currentQuestionId, setCurrentQuestionId] = useState<string>('')

  const [selectedQuestions, setSelectedQuestions] = useState<any>({})
  const [, setSelectedSubject] = useState<any>('')
  const [, setSelectedSection] = useState<any>('')

  const [allSectionsQuestion, setAllSectionsQuestions] = useState<any>([])

  useEffect(() => {
    if (params.id) {
      setIsLoading(true)
      getTestAnalytics({
        testId: params.id
      })
        .then((res) => {
          if (res) {
            setTestResults(res?.data?.test[0])
            setTestDetails(res?.data?.test[0]?.subjectDetails)
          }
        })
        .catch((err) => {
          CustomToastMessage(`${err.message}`, 'error')
        })
        .finally(() => setIsLoading(false))
    }
  }, [history, params.id])

  useEffect(() => {
    if (testDetails && testDetails.length > 0) {
      setSelectedSubject(testDetails[0].subjectId)
      setSelectedSection(testDetails[0]?.sections[0]?._id)

      let allQuestionsListItem: any =
        testDetails?.flatMap((subject: subjectDetails) =>
          subject.sections.flatMap(
            (section: sectionsDetails) => section.questionsList
          )
        ) ?? []
      setCurrentQuestionId(allQuestionsListItem[0]?.questionId)
      setSelectedQuestions(allQuestionsListItem[0])
      setAllSectionsQuestions(allQuestionsListItem)
    }
  }, [testDetails])

  const handleNextQuestion = (currentQuestionId: string) => {
    const tmpAllQuestions = [...allSectionsQuestion]
    tmpAllQuestions.forEach((qs, index) => {
      if (
        qs.questionId === currentQuestionId &&
        index < tmpAllQuestions.length - 1
      ) {
        const nextQuestion = tmpAllQuestions[index + 1]
        setSelectedQuestions(nextQuestion)
        setCurrentQuestionId(nextQuestion.questionId)
      }
    })
  }

  const handlePrevQuestion = (currentQuestionId: string) => {
    const tmpAllQuestions = [...allSectionsQuestion]
    tmpAllQuestions.forEach((qs, index) => {
      if (qs.questionId === currentQuestionId && index > 0) {
        const nextQuestion = tmpAllQuestions[index - 1]
        setSelectedQuestions(nextQuestion)
        setCurrentQuestionId(nextQuestion.questionId)
      }
    })
  }

  const handleSelectQuestion = (selectedQuestionId: string) => {
    const tmpAllQuestions = [...allSectionsQuestion]
    tmpAllQuestions.forEach((qs, index) => {
      if (qs.questionId === selectedQuestionId) {
        const nextQuestion = tmpAllQuestions[index]
        setSelectedQuestions(nextQuestion)
        setCurrentQuestionId(nextQuestion.questionId)
      }
    })
  }

  const handleKeyChallenges = () => {
    history.push({
      pathname: `${ROUTES_V2.CHALLENGES_QUESTIONS}`,
      state: {
        selectedQuestions,
        courseId: testResults?.courseDetails?.courseId
      }
    })
  }

  return (
    <MainContainer>
      <Flex>
        <TestTitle>{testResults?.testName} status </TestTitle>
      </Flex>
      <div style={{ margin: '20px 0px' }}>
        <div className="d-flex justify-content-between gap-3">
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <FinishTest testDetails={testResults} />
            <AverageScoreCard
              AvgScore={{
                name: 'Average Class Score',
                value: `${testResults?.totalScoredMarks || 0}/${
                  testResults?.totalTestMarks || 0
                }`
              }}
            />
          </div>
          <Cards style={{ marginTop: '20px' }}>
            <AIPredictionCard
              AIDatas={{
                head: 'FE AI Prediction',
                data1: 'Current Class Score',
                data2: 'Class Potential score with FE',
                data3: 'Based on Class current Test',
                data4: 'Based on FE AI Prediction',
                Per1: `${testResults?.percentageScore || 0}`,
                Per2: `${testResults?.potentialScore || 0}`
              }}
            />
          </Cards>
          <CardsWithAnalytics>
            <Cards>
              <DetailsCard>
                <Flex className="flexCard">
                  <ApexChart7
                    Count={0}
                    Color={'#db199e'}
                    BackColor={'#F0EEF5'}
                    Height={110}
                    Width={80}
                  />
                  <SubPar>
                    <h4>{'N/A'}%</h4>{' '}
                    <p>
                      {testResults?.highestMarkSubjectDetails?.subjectName ||
                        ''}
                    </p>{' '}
                  </SubPar>
                </Flex>
                {/* <TopSkillButton>
                  <ButtonText>Top Skill</ButtonText>
                  <ButtonCircle>-&gt;</ButtonCircle>
                </TopSkillButton> */}
              </DetailsCard>
              <DetailsCard>
                <div className="d-flex gap-2 align-items-center">
                  {/* <ApexChart7 Count={20} /> */}
                  <ClockIcon />
                  <DurationSec>
                    <h4>{testResults?.averageTimeForSingleQuestion}</h4>{' '}
                    <p>Seconds</p>{' '}
                  </DurationSec>
                </div>
                <DurationText>
                  Average Time Spent for single question
                </DurationText>
              </DetailsCard>
            </Cards>
            <div style={{ marginTop: '20px' }}>
              <AnalysisCard
                Analysis={{
                  name: 'Question Analysis',
                  correct: `${testResults?.totalCorrectAnswers || 0}`,
                  incorrect: `${testResults?.totalIncorrectAnswers || 0}`,
                  skipped: `${testResults?.totalSkippedAnswers || 0}`
                }}
              />
            </div>
          </CardsWithAnalytics>
        </div>
      </div>

      <Flex
        gap="16px"
        direction="column"
        alignItems="flex-start"
        className="mb-3"
      >
        {/* <Flex gap="8px">
          {testDetails &&
            testDetails.map((subjects) => (
              <Section
                key={subjects?.subjectName}
                active={subjects?.subjectId === selectedSubject}
                onClick={() => {
                  setSelectedSubject(subjects?.subjectId)
                  setSelectedSection(subjects?.sections[0]?._id)
                }}
              >
                <Para>{subjects?.subjectName}</Para>
              </Section>
            ))}
        </Flex>
        <Flex gap="8px">
          {testDetails &&
            testDetails
              ?.filter(
                (subjects) => subjects?.subjectId === selectedSubject
              )?.[0]
              ?.sections?.map((section1: sectionsDetails) => (
                <Section
                  key={section1?.sectionName}
                  active={section1?._id === selectedSection}
                  onClick={() => {
                    setSelectedSection(section1?._id)
                  }}
                >
                  <Para>{section1?.sectionName}</Para>
                  <Para>Total questions: {section1?.totalQuestions}</Para>
                  <Para>Correct answers: {section1?.correctAnswers}</Para>
                  <Para>Incorrect answers: {section1?.incorrectAnswers}</Para>
                  <Para>Total Marks: {section1?.totalMarks}</Para>
                </Section>
              ))}
        </Flex> */}
        <Flex gap="40px" style={{ width: '100%', justifyContent: 'center' }}>
          <SmallWrap>
            <FlexBetween
              style={{ width: '100%', padding: '0px 0px', marginBottom: '8px' }}
            >
              <WrapHeading>Subject Wise Statistics</WrapHeading>
            </FlexBetween>
            <Scroll>
              {testDetails &&
                testDetails?.map((list: any, index: any) => (
                  <Rank
                    key={index}
                    style={{
                      backgroundImage:
                        'linear-gradient(to bottom, #fff2fe, white)'
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <div>
                        <Min color="#a961da" style={{ fontSize: '22px' }}>
                          {list?.subjectName == undefined || null
                            ? 'N/A'
                            : list?.subjectName}
                        </Min>
                        <div style={{ display: 'flex', marginTop: '12px' }}>
                          {/* <RightIcon style={{ marginRight: '5px' }} /> */}
                          <Correct
                            style={{
                              marginRight: '10px',
                              color: '#22be63',
                              width: '60px'
                            }}
                          >
                            {list.correctAnswers == undefined || null
                              ? 'N/A'
                              : `${list.correctAnswers} Correct`}
                          </Correct>
                          {/* <WrongIcon style={{ marginRight: '5px' }} /> */}
                          <Correct
                            style={{
                              marginRight: '10px',
                              color: '#f13731',
                              width: '70px'
                            }}
                          >
                            {list.incorrectAnswers == undefined || null
                              ? 'N/A'
                              : `${list.incorrectAnswers} Incorrect`}
                          </Correct>
                          <Correct
                            style={{
                              marginRight: '10px',
                              color: '#FFA500',
                              width: '60px'
                            }}
                          >
                            {list.skippedAnswers == undefined || null
                              ? 'N/A'
                              : `${list.skippedAnswers} Skipped`}
                          </Correct>
                        </div>
                      </div>
                    </div>
                    <TestPercent color="#a961da" style={{ fontSize: '20px' }}>
                      {list.scoredMarks == undefined || null
                        ? 'N/A'
                        : list.scoredMarks}
                      /
                      {list.totalMarks == undefined || null
                        ? 'N/A'
                        : list.totalMarks}
                    </TestPercent>
                  </Rank>
                ))}
            </Scroll>
          </SmallWrap>

          <SmallWrap>
            <FlexBetween
              style={{ width: '100%', padding: '0px 0px', marginBottom: '8px' }}
            >
              <WrapHeading>Section Wise Statistics</WrapHeading>
            </FlexBetween>
            <Scroll>
              {testDetails &&
                testDetails?.flatMap((list: any, index: any) =>
                  list.sections.map((secList: any) => (
                    <Rank
                      key={index}
                      style={{
                        backgroundImage:
                          'linear-gradient(to bottom, #e3fafc, white)'
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div>
                          <Min color="#0c919b" style={{ fontSize: '22px' }}>
                            {list?.subjectName == undefined || null
                              ? 'N/A'
                              : list?.subjectName}{' '}
                            -{' '}
                            {secList?.sectionName == undefined || null
                              ? 'N/A'
                              : secList?.sectionName}
                          </Min>
                          <div style={{ display: 'flex', marginTop: '12px' }}>
                            {/* <RightIcon style={{ marginRight: '5px' }} /> */}
                            <Correct
                              style={{
                                marginRight: '10px',
                                color: '#25d66f',
                                width: '60px'
                              }}
                            >
                              {secList.correctAnswers == undefined || null
                                ? 'N/A'
                                : `${secList.correctAnswers} Correct`}
                            </Correct>
                            {/* <WrongIcon style={{ marginRight: '5px' }} /> */}
                            <Correct
                              style={{
                                marginRight: '10px',
                                color: '#f13731',
                                width: '70px'
                              }}
                            >
                              {secList.incorrectAnswers == undefined || null
                                ? 'N/A'
                                : `${secList.incorrectAnswers} Incorrect`}
                            </Correct>
                            <Correct
                              style={{
                                marginRight: '10px',
                                color: '#FFA500',
                                width: '60px'
                              }}
                            >
                              {secList.skippedAnswers == undefined || null
                                ? 'N/A'
                                : `${secList.skippedAnswers} Skipped`}
                            </Correct>
                          </div>
                        </div>
                      </div>
                      <TestPercent color="#0c919b" style={{ fontSize: '20px' }}>
                        {secList.scoredMarks == undefined || null
                          ? 'N/A'
                          : secList.scoredMarks}
                        /
                        {secList.totalMarks == undefined || null
                          ? 'N/A'
                          : secList.totalMarks}
                      </TestPercent>
                    </Rank>
                  ))
                )}
            </Scroll>
          </SmallWrap>
        </Flex>
      </Flex>

      <div style={{ position: 'relative', minHeight: '62vh' }}>
        <QuestionsNumber
          testDetails={testDetails}
          currentQuestionId={currentQuestionId}
          allSectionsQuestion={allSectionsQuestion}
          handleSelectQuestion={handleSelectQuestion}
        />
        {selectedQuestions && (
          <Questions
            selectedQuestions={selectedQuestions}
            handleKeyChallenges={handleKeyChallenges}
          />
        )}
      </div>
      <Flex justifyContent="space-between">
        <Button onClick={() => handlePrevQuestion(currentQuestionId)}>
          Previous
        </Button>

        <BlueButton
          onClick={() => {
            handleNextQuestion(currentQuestionId)
          }}
        >
          Next Question
        </BlueButton>
      </Flex>
    </MainContainer>
  )
}

export default StudentAnalytics
