import { ReactComponent as AnalysisLogo } from '../../assets/svg/AnalysisLogo.svg'
import {
  AnalysHeading,
  AnalysScore,
  AnalysisScore,
  MyFlex
} from './styledComponents'

const AnalysisCard = ({ Analysis }: any) => {
  return (
    <AnalysisScore>
      <MyFlex>
        <AnalysHeading>{Analysis.name}</AnalysHeading>
        <div>
          <AnalysScore>Correct {Analysis.correct}%</AnalysScore>
          <AnalysScore>Incorrect {Analysis.incorrect}%</AnalysScore>
          <AnalysScore>Skipped {Analysis.skipped}%</AnalysScore>
        </div>
      </MyFlex>
      <AnalysisLogo style={{ borderTopRightRadius: '20px', width: '68px' }} />
    </AnalysisScore>
  )
}

export default AnalysisCard
