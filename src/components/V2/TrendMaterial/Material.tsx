import styled from 'styled-components'
import List, { ListProps } from './MaterialMenu'

const TrendMaterial = ({ exam }: { exam: ListProps[] }) => {
  return (
    <TabMenuContainer>
      {exam.map((exam, index) => (
        <List key={exam.studentCount && exam.studentCount + index} {...exam} />
      ))}
    </TabMenuContainer>
  )
}

export default TrendMaterial

const TabMenuContainer = styled.div`
  overflow: auto;
  height: 310px;
  scrollbar-width: none;
`
