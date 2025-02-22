import styled from 'styled-components'
import { Flex } from '../styledComponents'

export const EmptyContainer = ({
  icon,
  text
}: {
  icon: JSX.Element
  text: string
}) => {
  return (
    <ContainerImg>
      <Flex direction="column" gap="20px">
        {icon}
        <P style={{ textAlign: 'center' }}>{text}</P>
      </Flex>
    </ContainerImg>
  )
}

export const ContainerImg = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 20px 16px;
`
const P = styled.p<{
  fontSize?: number
}>`
  color: #a3aed0;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.48px;
  font-size: ${({ fontSize }) => fontSize ?? 18}px;
`
