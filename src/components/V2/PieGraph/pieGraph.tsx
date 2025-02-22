import ApexChart7 from '../../../pages/v2/dashboard/PieChart'
import { Description, Main, Percentage } from './styledComponents'

const PieGraph = ({ GraphData }: any) => {
  return (
    <Main>
      <ApexChart7
        Count={GraphData.percentage}
        Color={GraphData.color}
        BackColor={'#F0EEF5'}
        Height={110}
        Width={80}
      />
      <div>
        <Percentage color={GraphData.color}>{GraphData.percentage}%</Percentage>
        <Description color={GraphData.color}>
          {GraphData.description}
        </Description>
      </div>
    </Main>
  )
}

export default PieGraph
