import styled from 'styled-components'
import {
  CoolGray30,
  CoolGray60,
  Gray,
  NavyBlue,
  OffWhite
} from '../../../const/V2/stylingVariables'
import { ReactComponent as CheckSvg } from '../../../assets/svg/check.svg'
import { ReactComponent as PieChartSvg } from '../../../assets/svg/pie-chart-alt.svg'
import { ReactComponent as CircleSvg } from '../../../assets/svg/circle.svg'
import { Flex } from '../styledComponents'

const ProgressItem = ({
  status,
  title,
  subTitle
}: {
  status: 'Pending' | 'Completed' | 'Current'
  title: string
  subTitle?: string
}) => {
  const Icon = {
    Pending: <CircleSvg />,
    Completed: <CheckSvg />,
    Current: <PieChartSvg />
  }
  return (
    <ContainerDiv isCurrent={status === 'Current'}>
      <Flex gap="8px">
        {Icon[status]}
        <div>
          <Title>{title}</Title>
          {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
        </div>
      </Flex>
    </ContainerDiv>
  )
}

export default ProgressItem

const ContainerDiv = styled.div<{ isCurrent?: boolean }>`
  flex: 1 0 0;
  border-top: 3px solid
    ${({ isCurrent }) => (isCurrent ? NavyBlue : CoolGray30)};
  background: ${OffWhite};
  padding: 16px 8px;
`

const Title = styled.p`
  color: ${Gray};

  font-size: 14px;
  font-weight: 500;
`
const SubTitle = styled.p`
  color: ${CoolGray60};

  font-size: 12px;
`
