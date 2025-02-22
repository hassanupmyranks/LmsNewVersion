import styled from 'styled-components'
import List, { ListProps } from './ListMenu'

const ListView = ({ list }: { list: ListProps[] }) => {
  return (
    <TabMenuContainer>
      {list.map((list, index) => (
        <List key={list.firstName + index} {...list} />
      ))}
    </TabMenuContainer>
  )
}

export default ListView

const TabMenuContainer = styled.div`
  overflow: auto;
  height: 210px;
  scrollbar-width: none;
`
