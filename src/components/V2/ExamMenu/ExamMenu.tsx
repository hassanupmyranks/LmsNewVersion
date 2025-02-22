import styled from 'styled-components'
import {
  Blue,
  SecondaryGray600,
  White
} from '../../../const/V2/stylingVariables'
import Trend from '../../../assets/trend.png'
import TopTrend from '../../../assets/toptrend.png'
export interface ListProps {
  testCount?: number
  testPatternName?: string
  subject?: string
}

const List = ({ testPatternName, subject, testCount }: ListProps) => {
  return (
    <TabContainer>
      <div>
        <Value>{testPatternName}</Value>
        <Label>{subject}</Label>
      </div>
      <Flex>
        {testCount && testCount >= 40 ? (
          <img src={TopTrend} alt="" />
        ) : (
          <img src={Trend} alt="" />
        )}
        <TestNumber>{`${testCount} Tests`}</TestNumber>
      </Flex>
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
`

const Value = styled.p`
  color: ${Blue};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.48px;
  line-height: 20px;
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
  height: 36px;
`
