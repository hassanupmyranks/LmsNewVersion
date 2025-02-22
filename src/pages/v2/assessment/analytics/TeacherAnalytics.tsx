import AIPredictionCard from '../../../../components/V2/AICard/AICard'
import AnalysisCard from '../../../../components/V2/Analysis'
import AverageScoreCard from '../../../../components/V2/AverageScore'
import PieGraphTopSkill from '../../../../components/V2/PieGraph/PieGraphTopSkill'
import PieGraph from '../../../../components/V2/PieGraph/pieGraph'
import { ReactComponent as ClockIcon } from '../../../../assets/svg/AIClock.svg'
// import { ReactComponent as MoveIcon } from '../../../../assets/svg/MoveArrow.svg'
import { ReactComponent as RightIcon } from '../../../../assets/svg/DoubleTick.svg'
import { ReactComponent as WrongIcon } from '../../../../assets/svg/WrongMark.svg'
import { ReactComponent as SkippedIcon } from '../../../../assets/svg/skip-icon.svg'
import UserImage from '../../../../assets/no_user.png'
import {
  AICard,
  ClockCom,
  Container,
  Correct,
  FlexAlign,
  FlexBetween,
  Heading,
  Min,
  ProfileImage,
  Rank,
  ST1,
  ST2,
  Scroll,
  SecAvg,
  SmallWrap,
  Statistics,
  Statistics1,
  Statistics2,
  Statistics3,
  SubHeading,
  SubmittedDate,
  TestPercent,
  View,
  // View,
  WrapHeading
} from './styledComponents'
// import AnalyticChart from './analyticPieChart'
import { useHistory, useLocation } from 'react-router-dom'
// import ROUTES_V2 from '../../../../const/V2/routes'
import { useEffect, useState } from 'react'
import { getTeacherTestAnalytics } from '../../../../helpers/V2/apis'
import ROUTES_V2 from '../../../../const/V2/routes'

const TeacherAnalytics = () => {
  // const names = ['Fully - Attempted', 'Half - Attempted', 'Un - Attempted']
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const [analytics, setAnalytics] = useState<any>({})
  const [subjectData, setSubjectData] = useState<any>()
  const [sectionData, setSectionData] = useState<any>()
  const [batchData, setBatchData] = useState<any>()
  const [overAll, setOverAll] = useState<any>({})
  const [topSubject, setTopSubject] = useState<any>({})
  const [studentsDataList, setStudentsDataList] = useState<any>()
  // const counts = ['N/A', 'N/A', 'N/A']

  const history = useHistory()

  useEffect(() => {
    getTeacherTestAnalytics(id).then((res) => {
      setAnalytics(res?.data?.test[0])
      setTopSubject(res?.data?.test[0]?.highestMarkSubjectDetails)
      setOverAll(res?.data?.overallAverages[0])
      setSubjectData(res?.data?.subjectWiseAverages)
      setSectionData(res?.data?.sectionWiseAverages)
      setBatchData(res?.data?.batchWiseAverages)
      setStudentsDataList(res.data.studentMarks)
    })
  }, [id])
  const TopperList = (test: any) => {
    history.push(`${ROUTES_V2.TOP_RANKERS_LIST}?id=${test?.testId}`)
  }

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) {
      return 'Invalid date'
    }

    const options: any = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }

    const timeString = date.toLocaleTimeString('en-US', options)

    const day = date.getDate()
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      date
    )
    const year = date.getFullYear()

    return `${timeString}, ${day}${getDaySuffix(day)} ${month} ${year}`
  }

  const getDaySuffix = (day: any) => {
    if (day >= 11 && day <= 13) {
      return 'th'
    }
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <Statistics>
        <Statistics1>
          <Statistics3>
            <ST2>
              <Heading>Test Statistics</Heading>
              <SubHeading>{`${
                analytics?.testName == undefined || null
                  ? 'N/A'
                  : analytics?.testName
              } - ${
                analytics?.courseDetails == undefined || null
                  ? 'N/A'
                  : analytics.courseDetails?.courseName == undefined || null
                  ? 'N/A'
                  : analytics.courseDetails?.courseName
              }, ${
                analytics?.totalDuration == undefined || null
                  ? 'N/A'
                  : analytics?.totalDuration
              } mins`}</SubHeading>
              <SubmittedDate>
                Test Ended On :{' '}
                {analytics?.testEndTime == undefined || null
                  ? 'N/A'
                  : formatDate(analytics?.testEndTime)}
              </SubmittedDate>
            </ST2>
            <ST1>
              <div style={{ marginTop: '10px' }}>
                <AverageScoreCard
                  AvgScore={{
                    name: 'Average Class Score',
                    value: `${
                      overAll?.averageScoredMarks == undefined || null
                        ? 'N/A'
                        : overAll?.averageScoredMarks
                    }/${
                      analytics?.totalTestMarks == undefined || null
                        ? 'N/A'
                        : analytics?.totalTestMarks
                    }`
                  }}
                />
              </div>
              <div style={{ marginTop: '10px' }}>
                <AnalysisCard
                  Analysis={{
                    name: 'Question Analysis',
                    correct:
                      overAll?.avgCorrectAnswersPercentage == undefined || null
                        ? 'N/A'
                        : overAll?.avgCorrectAnswersPercentage,
                    incorrect:
                      overAll?.avgIncorrectAnswersPercentage == undefined ||
                      null
                        ? 'N/A'
                        : overAll?.avgIncorrectAnswersPercentage,
                    skipped:
                      overAll?.avgSkippedAnswersPercentage == undefined || null
                        ? 'N/A'
                        : overAll?.avgSkippedAnswersPercentage
                  }}
                />
              </div>
            </ST1>
          </Statistics3>
          <AICard>
            <AIPredictionCard
              AIDatas={{
                head: 'FE AI Prediction',
                data1: 'Current Class Score',
                data2: 'Class Potential score with FE',
                data3: 'Based on Class current Test',
                data4: 'Based on FE AI Prediction',
                Per1: `${
                  analytics?.percentageScore == undefined || null
                    ? 'N/A'
                    : analytics?.percentageScore
                }`,
                Per2: `${
                  analytics?.potentialScore == undefined || null
                    ? 'N/A'
                    : analytics?.potentialScore
                }`
              }}
            />
          </AICard>
        </Statistics1>
        <Statistics2>
          <div style={{ display: 'flex' }}>
            <PieGraph
              GraphData={{
                color: '#8d16c4',
                percentage: `${
                  analytics?.submissionPercentage == undefined || null
                    ? 'N/A'
                    : analytics?.submissionPercentage == 100
                    ? analytics?.submissionPercentage
                    : analytics?.submissionPercentage.toFixed(2)
                }`,
                description: 'Submission'
              }}
            />
            {/* <PieGraph
              GraphData={{
                color: '#03c52d',
                percentage: 'N/A',
                description: 'Correctness'
              }}
            /> */}
          </div>
          <div>
            <PieGraphTopSkill
              GraphData={{
                color: '#db199e',
                percentage:
                  topSubject?.marksPercentage == undefined || null
                    ? 'N/A'
                    : topSubject?.marksPercentage.toFixed(2),
                description:
                  topSubject?.subjectName == undefined || null
                    ? 'N/A'
                    : topSubject?.subjectName
              }}
            />
          </div>
          <div>
            <ClockCom>
              <FlexAlign>
                <ClockIcon style={{ margin: '0px 10px 0px 20px' }} />
                <div>
                  <Min color="#5B72F8">
                    {analytics?.averageTimeForSingleQuestion == undefined ||
                    null
                      ? 'N/A'
                      : analytics?.averageTimeForSingleQuestion}{' '}
                    secs
                  </Min>
                </div>
              </FlexAlign>
              <SecAvg style={{ width: '120px', marginRight: '50px' }}>
                Average Time Spent by Class Per Question
              </SecAvg>
            </ClockCom>
          </div>
        </Statistics2>
      </Statistics>
      <Container>
        <SmallWrap>
          <FlexBetween
            style={{
              width: '100%',
              paddingLeft: '30px',
              marginBottom: '8px'
            }}
          >
            <WrapHeading>Batch / Section Wise Statistics</WrapHeading>
          </FlexBetween>
          <Scroll>
            {batchData?.map((list: any, index: any) => (
              <Rank
                key={index}
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #fff4d8, white)'
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <Min color="#8a4148" style={{ fontSize: '22px' }}>
                      {list?.batchName == undefined || null
                        ? 'N/A'
                        : list?.batchName}
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
                        {list.avgCorrectAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgCorrectAnswersPercentage}% Correct`}
                      </Correct>
                      {/* <WrongIcon style={{ marginRight: '5px' }} /> */}
                      <Correct
                        style={{
                          marginRight: '10px',
                          color: '#f13731',
                          width: '70px'
                        }}
                      >
                        {list.avgIncorrectAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgIncorrectAnswersPercentage}% Incorrect`}
                      </Correct>
                      <Correct
                        style={{
                          marginRight: '10px',
                          color: '#FFA500',
                          width: '60px'
                        }}
                      >
                        {list.avgSkippedAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgSkippedAnswersPercentage}% Skipped`}
                      </Correct>
                    </div>
                  </div>
                </div>
                <TestPercent color="#8a4148" style={{ fontSize: '20px' }}>
                  {list.averageScoredMarks == undefined || null
                    ? 'N/A'
                    : list.averageScoredMarks}
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
            style={{
              width: '100%',
              padding: '0px 30px',
              marginBottom: '8px'
            }}
          >
            <WrapHeading>Subject Wise Statistics</WrapHeading>
          </FlexBetween>
          <Scroll>
            {subjectData?.map((list: any, index: any) => (
              <Rank
                key={index}
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #fff2fe, white)'
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
                        {list.avgCorrectAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgCorrectAnswersPercentage}% Correct`}
                      </Correct>
                      {/* <WrongIcon style={{ marginRight: '5px' }} /> */}
                      <Correct
                        style={{
                          marginRight: '10px',
                          color: '#f13731',
                          width: '70px'
                        }}
                      >
                        {list.avgIncorrectAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgIncorrectAnswersPercentage}% Incorrect`}
                      </Correct>
                      <Correct
                        style={{
                          marginRight: '10px',
                          color: '#FFA500',
                          width: '60px'
                        }}
                      >
                        {list.avgSkippedAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgSkippedAnswersPercentage}% Skipped`}
                      </Correct>
                    </div>
                  </div>
                </div>
                <TestPercent color="#a961da" style={{ fontSize: '20px' }}>
                  {list.averageScoredMarks == undefined || null
                    ? 'N/A'
                    : list.averageScoredMarks}
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
            style={{
              width: '100%',
              padding: '0px 30px',
              marginBottom: '8px'
            }}
          >
            <WrapHeading>Section Wise Statistics</WrapHeading>
          </FlexBetween>
          <Scroll>
            {sectionData?.map((list: any, index: any) => (
              <Rank
                key={index}
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #e3fafc, white)'
                }}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <Min color="#0c919b" style={{ fontSize: '22px' }}>
                      {list?.subjectName == undefined || null
                        ? 'N/A'
                        : list?.subjectName}{' '}
                      -{' '}
                      {list?.sectionName == undefined || null
                        ? 'N/A'
                        : list?.sectionName}
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
                        {list.avgCorrectAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgCorrectAnswersPercentage}% Correct`}
                      </Correct>
                      {/* <WrongIcon style={{ marginRight: '5px' }} /> */}
                      <Correct
                        style={{
                          marginRight: '10px',
                          color: '#f13731',
                          width: '70px'
                        }}
                      >
                        {list.avgIncorrectAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgIncorrectAnswersPercentage}% Incorrect`}
                      </Correct>
                      <Correct
                        style={{
                          marginRight: '10px',
                          color: '#FFA500',
                          width: '60px'
                        }}
                      >
                        {list.avgSkippedAnswersPercentage == undefined || null
                          ? 'N/A'
                          : `${list.avgSkippedAnswersPercentage}% Skipped`}
                      </Correct>
                    </div>
                  </div>
                </div>
                <TestPercent color="#0c919b" style={{ fontSize: '20px' }}>
                  {list.averageScoredMarks == undefined || null
                    ? 'N/A'
                    : list.averageScoredMarks}
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
            style={{
              width: '100%',
              padding: '0px 30px',
              marginBottom: '8px'
            }}
          >
            <WrapHeading>Top ranked in this test</WrapHeading>
            <View onClick={() => TopperList(analytics)}>View All</View>
          </FlexBetween>
          <Scroll>
            {studentsDataList?.slice(0, 5).map((list: any, index: any) => (
              <Rank
                key={index}
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #e3f0fc, white)'
                }}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <ProfileImage
                    src={list?.profileImage ? list?.profileImage : UserImage}
                    color="#c8ecf7"
                  />
                  <div style={{ width: '100%' }}>
                    <Min color="#5B72F8">
                      {list?.firstName == undefined || null
                        ? 'N/A'
                        : list?.firstName}
                    </Min>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '5px',
                        width: '70%',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <RightIcon style={{ marginRight: '5px' }} />
                        <Correct style={{ marginRight: '10px' }}>
                          {list.totalCorrectAnswers == undefined || null
                            ? 'N/A'
                            : `${list.totalCorrectAnswers}`}
                        </Correct>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <WrongIcon style={{ marginRight: '5px' }} />
                        <Correct style={{ marginRight: '10px' }}>
                          {list.totalIncorrectAnswers == undefined || null
                            ? 'N/A'
                            : `${list.totalIncorrectAnswers}`}
                        </Correct>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <SkippedIcon
                          style={{
                            height: '16px',
                            width: '16px',
                            marginRight: '5px'
                          }}
                        />
                        <Correct style={{ marginRight: '10px' }}>
                          {list.totalSkippedAnswers == undefined || null
                            ? 'N/A'
                            : `${list.totalSkippedAnswers}`}
                        </Correct>
                      </div>
                    </div>
                  </div>
                </div>
                <TestPercent color="#5B72F8">
                  {list.percentageScore == undefined || null
                    ? 'N/A'
                    : list.percentageScore}
                  %
                </TestPercent>
              </Rank>
            ))}
          </Scroll>
        </SmallWrap>
        {/* <SmallWrap style={{ justifyContent: 'space-between' }}>
          <FlexBetween style={{ width: '100%', padding: '0px 30px' }}>
            <WrapHeading>Test Attempt Pie Chart</WrapHeading>
            <MoveIcon style={{ cursor: 'pointer' }} onClick={TestStats} />
          </FlexBetween>
          <AnalyticChart Names={names} Count={counts} />
        </SmallWrap>
        <SmallWrap>
          <FlexBetween
            style={{
              width: '100%',
              padding: '0px 30px',
              marginBottom: '8px'
            }}
          >
            <WrapHeading>Key challenged</WrapHeading>
            <View>View All</View>
          </FlexBetween>
          <Scroll>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#5B72F8">Akash P</Min>
                  <Correct style={{ marginTop: '5px' }}>
                    Challenged 4th question
                  </Correct>
                </div>
              </div>
              <MoveIcon style={{ cursor: 'pointer' }} />
            </Rank>
            <div>No Data Available</div>
          </Scroll>
        </SmallWrap> */}
      </Container>
    </div>
  )
}

export default TeacherAnalytics
