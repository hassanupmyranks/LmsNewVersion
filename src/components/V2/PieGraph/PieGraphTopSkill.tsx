import { FlexAlign } from '../../../pages/v2/assessment/analytics/styledComponents'
import ApexChart7 from '../../../pages/v2/dashboard/PieChart'
import {
  ButtonCircle,
  ButtonText,
  Description,
  Main,
  Percentage,
  TopSkillButton
} from './styledComponents'

const PieGraphTopSkill = ({ GraphData }: any) => {
  return (
    <Main
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '350px',
        paddingRight: '20px'
      }}
    >
      <FlexAlign>
        <ApexChart7
          Count={GraphData.percentage}
          Color={GraphData.color}
          BackColor={'#F0EEF5'}
          Height={110}
          Width={80}
        />
        <div>
          <Percentage color={GraphData.color}>
            {GraphData.percentage}%
          </Percentage>
          <Description color={GraphData.color}>
            {GraphData.description}
          </Description>
        </div>
      </FlexAlign>
      <TopSkillButton>
        <ButtonText>Top Skill</ButtonText>
        <ButtonCircle>-&gt;</ButtonCircle>
      </TopSkillButton>
    </Main>
  )
}

export default PieGraphTopSkill
