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
  Button
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
import { getPracticeTestAnalytics } from '../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import { BlueButton } from '../attemptTest/styledComponents'
import QuestionsNumber from './components/QuestionsNumber'

const StudentPracticeTestAnalytics = () => {
  const params: any = useParams()
  const history = useHistory()

  const [testResults, setTestResults] = useState<ResultAnalytics>()
  const [, setIsLoading] = useState(false)

  const [testDetails, setTestDetails] = useState<any>()

  const [currentQuestionId, setCurrentQuestionId] = useState<string>('')

  const [selectedQuestions, setSelectedQuestions] = useState<any>({})

  const [allSectionsQuestion, setAllSectionsQuestions] = useState<any>([])

  useEffect(() => {
    setIsLoading(true)
    getPracticeTestAnalytics({
      testId: params.id
    })
      .then((res) => {
        if (res) {
          setTestResults(res?.data?.test[0])
          setTestDetails(res?.data?.test[0])
        }
      })
      .catch((err) => {
        CustomToastMessage(err.message, 'error')
      })
      .finally(() => setIsLoading(false))
  }, [history, params.id])

  useEffect(() => {
    if (testDetails) {
      let allQuestionsListItem: any = testDetails.questionsList ?? []
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

  const handleKeyChallenges = () => {}

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

      <div style={{ position: 'relative', minHeight: '62vh' }}>
        <QuestionsNumber
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

export default StudentPracticeTestAnalytics
