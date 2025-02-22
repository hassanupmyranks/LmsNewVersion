import styled from 'styled-components'
import { ReactComponent as ChemistrySvg } from '../../../../../assets/svg/chemistry.svg'
import { ReactComponent as PhysicsSvg } from '../../../../../assets/svg/physics.svg'
import { ReactComponent as NewPhysicsIconSvg } from '../../../../../assets/svg/new-physics-icon.svg'

import { ButtonV2 } from '../../../../../components/V2/styledComponents'
import {
  PrimaryBlue,
  SecondaryGray
} from '../../../../../const/V2/stylingVariables'
import { ActionBarProps } from './../types'
import React from 'react'

const ActionBar = ({
  tabs,
  actions,
  handleSelectionTab,
  handleAction
}: ActionBarProps) => {
  const actionIconMap: { [key: string]: JSX.Element } = {
    physics: <NewPhysicsIconSvg />,
    chemistry: <ChemistrySvg />,
    maths: <PhysicsSvg />,
    mathematics: <PhysicsSvg />,
    science: <PhysicsSvg />,
    biology: <PhysicsSvg />
  }

  return (
    <RelativeDiv>
      <Tabs>
        {tabs &&
          tabs.map((tab, index) => (
            <React.Fragment key={`actionbar_tab_${index}`}>
              <Tab
                onClick={() => handleSelectionTab(tab)}
                key={`actionbar_tab_${index}`}
              >
                {actionIconMap[(tab?.name).toLocaleLowerCase()]}
                <TabName isActive={tab?.isActive}>{tab?.name}</TabName>
              </Tab>

              {index !== tabs.length - 1 && <Divider>&nbsp;</Divider>}
            </React.Fragment>
          ))}
      </Tabs>

      <Actions>
        {actions &&
          actions.map((action) => (
            <ButtonV2
              onClick={() => handleAction(action)}
              key={`actionbar_action_${action.index}`}
            >
              {action.caption}
            </ButtonV2>
          ))}
      </Actions>
    </RelativeDiv>
  )
}

export default ActionBar

const Divider = styled.div`
  border-right: 2px solid rgba(25, 123, 189, 0.14);
  height: 100%;
  margin: 0 10px;
`
const RelativeDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Tabs = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 92%;
  overflow-x: auto;

  @media (max-width: 450px) {
    gap: 0px;
    max-width: 210px;
    overflow-x: auto;
  }
`
const Tab = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-wrap: nowrap;

  @media (max-width: 768px) {
    svg {
      width: 25px;
    }
  }
`
const TabName = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props?.isActive ? PrimaryBlue : SecondaryGray)};
  font-family: DM Sans;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.68px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  // width: 7%;
`
