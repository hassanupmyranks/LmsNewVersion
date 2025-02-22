import styled from 'styled-components'
import List, { ListProps } from './CourseMenu'

const CourseView = ({ list }: { list: ListProps[] }) => {
  return (
    <TabMenuContainer>
      {list?.map((list, index) => (
        <List key={list.subjectName + index} {...list} />
      ))}
    </TabMenuContainer>
  )
}

export default CourseView

const TabMenuContainer = styled.div`
  overflow: auto;
  height: 310px;
  scrollbar-width: none;
`
