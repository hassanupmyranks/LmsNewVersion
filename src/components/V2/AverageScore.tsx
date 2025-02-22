import { AverageScore, Score, ScoreHeading } from './styledComponents'
import { ReactComponent as AverageLogo } from '../../assets/svg/Averagelogo.svg'

const AverageScoreCard = ({ AvgScore }: any) => {
  return (
    <AverageScore>
      <div>
        <ScoreHeading>{AvgScore.name}</ScoreHeading>
        <Score>{AvgScore.value}</Score>
      </div>
      <AverageLogo style={{ marginTop: '6px' }} />
    </AverageScore>
  )
}

export default AverageScoreCard
