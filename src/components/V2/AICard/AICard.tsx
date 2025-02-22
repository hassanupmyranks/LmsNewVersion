import {
  AILogo,
  AIHeading,
  AIData,
  FlexBetween,
  FlexBetween1,
  AIPercentage
} from './styledComponents'

const AIPredictionCard = ({ AIDatas }: any) => {
  return (
    <AILogo>
      <AIHeading>{AIDatas.head}</AIHeading>
      <FlexBetween1>
        <AIData>{AIDatas.data1}</AIData>
        <AIData style={{ textAlign: 'end' }}>{AIDatas.data2}</AIData>
      </FlexBetween1>
      <FlexBetween style={{ margin: '47px 135px 0px 138px' }}>
        <AIPercentage>
          {typeof AIDatas.Per1 === 'number' || !isNaN(AIDatas.Per1)
            ? parseFloat(Number(AIDatas.Per1).toFixed(2))
            : AIDatas.Per1}
          %
        </AIPercentage>

        <AIPercentage>
          {typeof AIDatas.Per2 === 'number' || !isNaN(AIDatas.Per2)
            ? parseFloat(Number(AIDatas.Per2).toFixed(2))
            : AIDatas.Per2}
          %
        </AIPercentage>
      </FlexBetween>
      <FlexBetween1 style={{ marginTop: '65px' }}>
        <AIData>{AIDatas.data3}</AIData>
        <AIData style={{ textAlign: 'end' }}>{AIDatas.data4}</AIData>
      </FlexBetween1>
    </AILogo>
  )
}

export default AIPredictionCard
