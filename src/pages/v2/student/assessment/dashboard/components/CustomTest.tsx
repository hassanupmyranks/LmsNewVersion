import { Flex } from '../../../../../../components/V2/styledComponents'
import SearchInput from '../../../../assessment/addQuestions/components/SearchInput'
import {
  MainTitle,
  Test,
  Title,
  SubDetail,
  TestBtn,
  TestContainer,
  TestDetailPopup,
  FlexLine,
  TestDetailContainer,
  TestDetailFlex,
  TestDetailPara,
  Button
} from './styledComponents'

import ChemistryLogo from '../../../../../../assets/chemistry.png'
import { ReactComponent as QuestionIcon } from '../../../../../../assets/svg/question-mark.svg'
import { ReactComponent as MarksIcon } from '../../../../../../assets/svg/puzzle-icon.svg'
import { ReactComponent as ClockIcon } from '../../../../../../assets/svg/clock.svg'
import { ReactComponent as TimerIcon } from '../../../../../../assets/svg/clock-icon.svg'
import { ReactComponent as SkipIcon } from '../../../../../../assets/svg/skip-icon.svg'

import moment from 'moment'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../../redux/store'
import { MyTest } from '../types'
import useOnClickOutside from '../../../../../../hooks/useOnClickOutside'
import ROUTES_V2 from '../../../../../../const/V2/routes'
import { MyTestDetail } from '../../../../../../redux/studentV2/api'

export const ActiveTest = ({ practiceTests }: { practiceTests: MyTest[] }) => {
  const [show, setPopup] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const popupRef = useRef<HTMLDivElement>(null)

  const [testDetail, setTestDetail] = useState<MyTest>()

  useOnClickOutside(popupRef, () => setPopup(false))
  // const dispatch = useDispatch()

  const myTestData = useSelector((state: RootState) => state?.myTest?.data[0])

  return (
    <Flex gap="18px" direction="column" alignItems="flex-start">
      <MainTitle style={{ paddingBottom: '0px' }}>My Tests</MainTitle>
      <SearchInput placeholder="Search Tests" />
      <TestContainer>
        {practiceTests &&
          practiceTests?.length > 0 &&
          practiceTests.map((item: MyTest, index: number) => (
            <Test
              color="#35bba3"
              bgColor="#3dc2ab0f"
              key={`key_${index}`}
              onClick={() => {
                setTestDetail(item)
                setPopup(!show)
                dispatch(
                  MyTestDetail({
                    testId: item._id
                  })
                )
              }}
            >
              <Flex justifyContent="space-between" alignItems="flex-start">
                <Flex direction="column" alignItems="flex-start" gap="6px">
                  <div>
                    <Title fontWeight={700}>{item?.testName}</Title>
                    <Title fontSize="14px">
                      {moment(item?.createdAt).format('Do MMM YYYY')}
                    </Title>
                    <SubDetail fontSize="12px">
                      {item?.totalMarks || 0} marks . {item?.duration || 0}{' '}
                      minutes
                    </SubDetail>
                  </div>
                  <TestBtn bgColor="#35bba3">Start Test</TestBtn>
                </Flex>
                <img src={ChemistryLogo} alt="chemistry_logo" />
              </Flex>
            </Test>
          ))}
      </TestContainer>

      {show && (
        <TestDetailPopup>
          <TestDetailContainer ref={popupRef}>
            <Flex gap="16px" direction="column" alignItems="flex-start">
              <TestDetailPara fontWeight={500} fontSize="24px">
                {testDetail?.testName}
              </TestDetailPara>
              <div>
                <Flex gap="18px" wrap={true} style={{ paddingBottom: '16px' }}>
                  <TestDetailFlex>
                    <QuestionIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      {(myTestData &&
                        myTestData?.questionsList &&
                        myTestData?.questionsList?.length) ||
                        0}{' '}
                      questions
                    </TestDetailPara>
                  </TestDetailFlex>
                  <FlexLine />
                  <TestDetailFlex>
                    <MarksIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      {testDetail?.totalMarks} Marks
                    </TestDetailPara>
                  </TestDetailFlex>
                </Flex>
                <Flex gap="18px">
                  <TestDetailFlex>
                    <ClockIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      {testDetail?.duration} Minutes
                    </TestDetailPara>
                  </TestDetailFlex>
                  <FlexLine />
                  {/* <TestDetailFlex>
                    <MedalIcon />
                    <TestDetailPara fontSize="14px" fontWeight={500}>
                      50 points
                    </TestDetailPara>
                  </TestDetailFlex> */}
                </Flex>
              </div>
              <p
                style={{
                  fontFamily: 'Rubik',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  color: '#858494',
                  paddingTop: '8px'
                }}
              >
                DESCRIPTION
              </p>

              {/* <TestDetailPara>{testDetail?.instruction_text}</TestDetailPara> */}

              <Flex gap="18px">
                <Flex gap="12px">
                  <TimerIcon />
                  <TestDetailPara fontSize="14px" fontWeight={500}>
                    Review Later
                  </TestDetailPara>
                </Flex>
                <Flex gap="12px">
                  <SkipIcon />
                  <TestDetailPara fontSize="14px" fontWeight={500}>
                    Skip Question
                  </TestDetailPara>
                </Flex>
              </Flex>
            </Flex>
            <Flex>
              <div style={{ marginTop: '36px' }}>
                <TestDetailPara fontSize="14px" fontWeight={500}>
                  {user.firstName}
                </TestDetailPara>
                <TestDetailPara
                  fontSize="12px"
                  fontWeight={400}
                  style={{ color: '#858494', lineHeight: '0.8' }}
                >
                  Creator
                </TestDetailPara>
              </div>
            </Flex>

            <TestDetailPara
              fontSize="14px"
              fontWeight={500}
              style={{ color: '#222B45', margin: '12px 0 24px' }}
            >
              Note : This test will show results immediate{' '}
            </TestDetailPara>
            <Flex justifyContent="center">
              <Button to={ROUTES_V2.ATTEMPT_MY_TEST}>Start Test</Button>
            </Flex>
          </TestDetailContainer>
        </TestDetailPopup>
      )}
    </Flex>
  )
}
