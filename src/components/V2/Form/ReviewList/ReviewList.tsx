import styled from 'styled-components'
import List, { ListProps } from './ReviewMenuList'

const ListView = ({ list }: { list: ListProps[] }) => {
  return (
    <TabMenuContainer>
      {list?.map((list, index) => (
        <List key={index} {...list} />
      ))}
    </TabMenuContainer>
  )
}

export default ListView

const TabMenuContainer = styled.div`
  overflow: auto;
  height: 310px;
  scrollbar-width: none;
`
