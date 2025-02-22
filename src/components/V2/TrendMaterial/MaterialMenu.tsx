import styled from 'styled-components'
import {
  Blue,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import Trend from '../../../assets/trend.png'
import TopTrend from '../../../assets/toptrend.png'
import { ReactComponent as VideoIcon } from '../../../assets/svg/video-logo.svg'
import { ReactComponent as MaterialIcon } from '../../../assets/svg/material-logo.svg'
export interface ListProps {
  studentCount?: number
  subjectName?: string
  videos?: number
  materials?: number
  user?: string
}

const List = ({
  subjectName,
  videos,
  studentCount,
  materials,
  user
}: ListProps) => {
  return (
    <TabContainer>
      <div>
        <Value>{subjectName}</Value>
        <Flex>
          <VideoIcon style={{ marginRight: '5px' }} />
          <Label style={{ marginRight: '10px' }}>{videos} Videos</Label>
          <MaterialIcon style={{ marginRight: '5px' }} />
          <Label>{materials} Materials</Label>
        </Flex>
      </div>
      <FlexColumn>
        {studentCount && studentCount >= 100 ? (
          <img src={TopTrend} alt="" />
        ) : (
          <img src={Trend} alt="" />
        )}
        <TestNumber>{`${studentCount} ${
          user == 'teacher' ? 'Students' : 'Tests'
        }`}</TestNumber>
      </FlexColumn>
    </TabContainer>
  )
}

export default List
const TestNumber = styled.p`
  font-family: 'DM Sans';
  font-size: 12px;
  color: rgba(163, 174, 208, 1);
  font-weight: 500;
`

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
  background: ${White};
  border-radius: 20px;
  width: auto;
  box-shadow: 0px 18px 40px 0px rgba(112, 144, 176, 0.12);
  margin: 0px 18px 18px 18px;
`

const Label = styled.p`
  color: ${SecondaryGray600};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.28px;
  align-self: center;
`

const Value = styled.p`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.48px;
  line-height: 20px;
`
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
  height: 36px;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`
