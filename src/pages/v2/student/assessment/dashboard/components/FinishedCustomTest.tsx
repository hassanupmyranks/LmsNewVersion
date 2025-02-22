import { Flex } from '../../../../../../components/V2/styledComponents'
import SearchInput from '../../../../assessment/addQuestions/components/SearchInput'
import {
  MainTitle,
  Test,
  Title,
  SubDetail,
  TestBtn,
  TestType,
  TestContainer,
  AssignedName
} from './styledComponents'
import ChemistryLogo from '../../../../../../assets/chemistry.png'
import moment from 'moment'
import SmallDropdown from '../../../../../../components/V2/Form/SmallDropdown'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../../../../const/V2/routes'
import { Spinner } from 'react-bootstrap'
import { PrimaryBlue } from '../../../../../../const/V2/stylingVariables'

const CustomTest = ({
  finishedTests,
  handleFilterTestList,
  isSubmitAPILoading
}: {
  finishedTests: any[]
  handleFilterTestList: (d: any) => void
  isSubmitAPILoading: boolean
}) => {
  const history = useHistory()
  const selectData = [
    {
      id: 'practice',
      label: 'Practice tests',
      value: 'practice'
    },
    {
      id: 'assigned',
      label: 'Assigned Assessment',
      value: 'assigned'
    }
  ]

  const handleResultDetails = (id: string, isTrueFalse: boolean) => {
    if (isTrueFalse) {
      history.push({
        pathname: `${ROUTES_V2.PRACTICE_ANALYTICS}/${id}`
      })
    } else {
      history.push({
        pathname: `${ROUTES_V2.STUDENT_TEST_RESULT}/${id}`,
        search: `?isPracticeTest=${false}`
      })
    }
  }
  console.log(isSubmitAPILoading, 'isSubmitAPILoading')
  return (
    <Flex gap="18px" direction="column" alignItems="flex-start">
      <div className="d-flex align-items-center gap-4">
        <MainTitle style={{ paddingBottom: '0px' }}>Finished</MainTitle>
        <SmallDropdown
          label=""
          style={{ width: '180px' }}
          options={selectData}
          onSelect={(data) => handleFilterTestList(data.id)}
          placeholder={'select'}
        />
      </div>
      <SearchInput placeholder="Search Tests" />
      <TestContainer>
        {isSubmitAPILoading && (
          <div className="d-flex justify-content-center w-100">
            <Spinner
              style={{
                height: '30px',
                width: '30px',
                color: `${PrimaryBlue}`
              }}
              animation={'border'}
            />
          </div>
        )}
        {finishedTests &&
          finishedTests?.length > 0 &&
          finishedTests.map((item: any, index: any) =>
            item?.testType === 'PRACTICE_TEST' ? (
              <Test color="#35bba3" bgColor="#3dc2ab0f" key={`key_${index}`}>
                <Flex justifyContent="space-between" alignItems="flex-start">
                  <Flex direction="column" alignItems="flex-start" gap="6px">
                    <div>
                      <Title fontWeight={700}>{item?.testName}</Title>
                      <Title fontSize="14px">
                        {moment(item?.createdAt).format('Do MMM YYYY')}
                      </Title>
                      <SubDetail fontSize="12px">
                        {item?.duration || 0} minutes
                      </SubDetail>
                    </div>
                    <TestBtn
                      bgColor="#35bba3"
                      onClick={() => handleResultDetails(item.testId, true)}
                    >
                      Details
                    </TestBtn>
                    <TestType>Custom test</TestType>
                  </Flex>
                  <img src={ChemistryLogo} alt="chemistry_logo" />
                </Flex>
              </Test>
            ) : (
              <Test color="#35bba3" bgColor="#3dc2ab0f" key={`key_${index}`}>
                <Flex
                  justifyContent="space-between"
                  alignItems="flex-start"
                  style={{ height: '150px' }}
                >
                  <Flex
                    direction="column"
                    alignItems="flex-start"
                    gap="12px"
                    style={{ width: '100%' }}
                  >
                    <Flex
                      justifyContent="space-between"
                      gap="6px"
                      style={{ width: '100%' }}
                    >
                      <AssignedName>
                        {item?.testCreatedBy?.firstName}
                      </AssignedName>{' '}
                      <TestBtn
                        bgColor="#35bba3"
                        onClick={() => handleResultDetails(item?.testId, false)}
                      >
                        Details
                      </TestBtn>
                    </Flex>
                    <Flex
                      justifyContent="space-between"
                      gap="6px"
                      style={{ width: '100%' }}
                    >
                      <div>
                        <Title fontWeight={700}>{item?.testName}</Title>
                        <Title fontSize="14px">
                          {moment(item?.createdAt).format('Do MMM YYYY')}
                        </Title>
                        <SubDetail fontSize="12px">
                          {item?.duration || 0} minutes
                        </SubDetail>
                      </div>
                      <img
                        src={item?.testCreatedBy?.profileImage || ChemistryLogo}
                        alt="chemistry_logo"
                        style={{ width: '80px', height: '80px' }}
                      />
                    </Flex>
                    <TestType>Assigned</TestType>
                  </Flex>
                </Flex>
              </Test>
            )
          )}
      </TestContainer>
    </Flex>
  )
}

export default CustomTest
