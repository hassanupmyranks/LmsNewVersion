import styled from 'styled-components'
import List, { ListProps } from './ExamMenu'

const TrendExam = ({ exam }: { exam: ListProps[] }) => {
  return (
    <TabMenuContainer>
      {exam.map((exam, index) => (
        <List
          key={exam.testPatternName && exam.testPatternName + index}
          {...exam}
        />
      ))}
    </TabMenuContainer>
  )
}

export default TrendExam

const TabMenuContainer = styled.div`
  overflow: auto;
  height: 220px;
  scrollbar-width: none;
`
