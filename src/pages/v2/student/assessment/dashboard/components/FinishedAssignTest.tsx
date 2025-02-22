import { Flex } from '../../../../../../components/V2/styledComponents'
import { Test, Title, SubDetail, TestType } from './styledComponents'
import TeacherLogo from '../../../../../../assets/female-teacher.png'
import moment from 'moment'

export const FinishTest = ({ testDetails }: any) => {
  return (
    <Test color="#64AFC7" bgColor="#E4F5FC">
      <Flex justifyContent="space-between">
        <Flex direction="column" alignItems="flex-start" gap="8px">
          <div>
            <Title fontSize="18px" fontWeight={600}>
              {testDetails?.testName || ''}
            </Title>
            <Title fontSize="16px" fontWeight={600}>
              {moment(testDetails?.testStartTime)?.format('Do MMMM, YYYY')}
            </Title>
          </div>
          <div>
            <SubDetail fontSize="14px">
              {testDetails?.totalDuration || 0} minutes
            </SubDetail>
            {/* <TestBtn bgColor="#3FA4C9">Details</TestBtn> */}
          </div>
        </Flex>
        <Flex direction="column" gap="15px">
          <img src={TeacherLogo} alt="teacher_logo" />
        </Flex>
      </Flex>
      <TestType color="#58D3FF">Assigned</TestType>
    </Test>
  )
}
