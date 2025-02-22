import {
  BottomSec,
  Button,
  CrownIconDiv,
  DetailsSections,
  FirstSec,
  ImageDiv,
  NameSec,
  ResultDiv,
  ResultLabel,
  ResultTitle,
  ScoreDetailsSec,
  // ShareIconDiv,
  TestTitle,
  TextSec,
  UserDiv
} from './styledComponents'
import StarImage from '../../../../../../assets/star-group-image.png'
import FemaleTeacher from '../../../../../../assets/female-teacher.png'

import { ReactComponent as CrownIcon } from '../../../../../../assets/svg/crownIcon.svg'
// import { ReactComponent as ShareIcon } from '../../../../../../assets/svg/share-icon.svg'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getPracticeTestAnalytics,
  getTestAnalytics
} from '../../../../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../../../../components/V2/ToastMessage'
import { ResultAnalytics } from '../../../../../../utils/types'
import { RootState } from '../../../../../../redux/store'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../../../const/V2/stylingVariables'
import ROUTES_V2 from '../../../../../../const/V2/routes'

const TestResultContainer = () => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)
  const params: any = useParams()
  const history = useHistory()
  const [testResults, setTestResults] = useState<ResultAnalytics>()
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const isPractice = searchParams.get('isPracticeTest') // gets the value for 'isPractice'

  console.log(isPractice, 'isPractice')

  useEffect(() => {
    if (isPractice === 'true') {
      setIsLoading(true)
      getPracticeTestAnalytics({
        testId: params.id
      })
        .then((res) => {
          if (res) {
            setTestResults(res?.data?.test[0])
          }
        })
        .catch((err) => {
          CustomToastMessage(err.message, 'error')
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(true)
      getTestAnalytics({
        testId: params.id
      })
        .then((res) => {
          if (res) {
            setTestResults(res?.data?.test[0])
          }
        })
        .catch((err) => {
          CustomToastMessage(err.message, 'error')
        })
        .finally(() => setIsLoading(false))
    }
  }, [isPractice, history, params.id])

  return (
    <div
      style={{
        overflow: 'auto',
        padding: '16px 24px 16px',
        background: '#fff',
        height: '100%',
        position: 'relative'
      }}
    >
      <TestTitle>{testResults?.testName.toUpperCase() || 'Test'} </TestTitle>
      {isLoading && (
        <Spinner
          style={{
            width: '44px',
            height: '44px',
            color: `${BlueButton}`,
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}
          animation={'border'}
        />
      )}
      <ResultDiv>
        <ImageDiv>
          <img src={StarImage} alt="" />
          <CrownIconDiv>
            {' '}
            <CrownIcon />
          </CrownIconDiv>
          <UserDiv>
            <img src={user.profileImage || FemaleTeacher} alt="" />
          </UserDiv>
          <TextSec role="img">CONGRATS</TextSec>
          <NameSec>{user?.firstName}</NameSec>
        </ImageDiv>
        <DetailsSections>
          <ScoreDetailsSec>
            <FirstSec>
              <ResultTitle>CORRECT ANSWER</ResultTitle>
              <ResultLabel>{testResults?.totalCorrectAnswers || 0}</ResultLabel>
              <ResultTitle>Skipped</ResultTitle>
              <ResultLabel>{testResults?.totalSkippedAnswers || 0}</ResultLabel>
            </FirstSec>
            <FirstSec>
              <ScoreDetailsSec>
                <FirstSec>
                  <ResultTitle>SCORE</ResultTitle>
                  <ResultLabel>
                    {testResults?.totalScoredMarks || 0}
                  </ResultLabel>
                </FirstSec>
                <FirstSec>
                  <ResultTitle>SCORE %</ResultTitle>
                  <ResultLabel>{testResults?.percentageScore || 0}</ResultLabel>
                </FirstSec>
              </ScoreDetailsSec>
              <ResultTitle>INCORRECT ANSWER</ResultTitle>
              <ResultLabel>
                {testResults?.totalIncorrectAnswers || 0}
              </ResultLabel>
            </FirstSec>
          </ScoreDetailsSec>
          <BottomSec>
            <Button
              to={
                isPractice === 'true'
                  ? `${ROUTES_V2.PRACTICE_ANALYTICS}/${params.id}`
                  : `${ROUTES_V2.STUDENT_ANALYTICS}/${params.id}`
              }
            >
              Check Test Analysis
            </Button>
            {/* <ShareIconDiv>
              <ShareIcon />
            </ShareIconDiv> */}
          </BottomSec>
        </DetailsSections>
      </ResultDiv>
    </div>
  )
}

export default TestResultContainer
