import styled from 'styled-components'
import Tab, { TabProps } from './Tab'

const TabMenu = ({ tabs }: { tabs: TabProps[] }) => {
  return (
    <TabMenuContainer>
      {tabs.map((tab, index) => (
        <Tab key={tab.label + index} {...tab} />
      ))}
    </TabMenuContainer>
  )
}

export default TabMenu

const TabMenuContainer = styled.div`
  display: flex;
  justify-content: stretch;
  gap: 10px;
  padding: 0 1.25rem 0.25rem 1rem;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;

  margin-top: 15px;
  padding-top: 5px;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  // @media (max-width: 992px) {
  //   display: flex;
  //   flex-wrap: wrap;
  // }
`
