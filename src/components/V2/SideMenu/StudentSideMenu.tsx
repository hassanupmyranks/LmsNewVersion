import {
  LoginContainer,
  LogoNameContainer,
  MenuWrapper,
  ProfileImage,
  Section,
  UserName
} from './styledComponents'
import { Flex } from '../styledComponents'
import { ReactComponent as LoginIcon } from '../../../assets/svg/logout-icon.svg'
import { SideMenuItems } from '../../../const/V2/sideMenuItems'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import { SideMenuItemDetails } from '../../../utils/types'
import { getRoleModulesAPI } from '../../../helpers/V2/apis'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const StudentSideBar = ({ toggleSidebar }: any) => {
  const { pathname } = useLocation()
  const wrapperRef = useRef<any>(null)
  const history = useHistory()

  const userData = useSelector((state: RootState) => state.userV2?.userInfoV2)
  const [modulesList, setModulesList] = useState<any>([])
  const [newSideMenuItems, setNewSideMenuItems] = useState<
    SideMenuItemDetails[]
  >([])
  const [, setModulesLoading] = useState(false)

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      toggleSidebar()
    }
  }

  useEffect(() => {
    if (userData && userData.instituteId) {
      getRoleModulesAPI({
        role: userData.role,
        instituteId: userData.instituteId
      })
        .then((res) => {
          setModulesList(res.data)
        })
        .catch(() => {
          history.push(ROUTES_V2.NOMODULES_FOUND)
        })
        .finally(() => setModulesLoading(false))
    }
  }, [userData, history])

  useEffect(() => {
    if (modulesList && SideMenuItems) {
      let newDynamicItems: any[] = []
      SideMenuItems.student.map((staticItems: any) => {
        if (staticItems.label === 'Logout') {
          newDynamicItems.push(staticItems)
        }
        modulesList.map((dynamicItems: any) => {
          if (dynamicItems.id === staticItems.id) {
            let newSubMenus: any = []
            if (
              dynamicItems?.subModules &&
              dynamicItems?.subModules?.length > 0
            ) {
              dynamicItems.subModules.map((sub: any) => {
                staticItems?.childMenu?.map((staticSub: any) => {
                  if (staticSub.id === sub.id) {
                    newSubMenus.push(staticSub)
                  }
                })
              })
            }
            staticItems.label = dynamicItems.name
            staticItems.childMenu = newSubMenus
            newDynamicItems.push(staticItems)
          }
        })
      })
      setNewSideMenuItems(newDynamicItems)
    }
  }, [modulesList])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MenuWrapper ref={wrapperRef}>
      <LogoNameContainer style={{ marginBottom: '30px' }}>
        <ProfileImage
          src={
            userData?.profileImage
              ? userData?.profileImage
              : '/assets/images/okimage.jpg'
          }
          alt=""
        />
        <UserName>{userData?.firstName}</UserName>
        <span className="mt-3">{userData?.batchName}</span>
        <button className="close-btn" onClick={toggleSidebar}>
          X
        </button>
      </LogoNameContainer>
      <Flex
        direction="column"
        gap="8px"
        alignItems="flex-start"
        style={{ marginInline: '12px', maxHeight: '70%' }}
      >
        {newSideMenuItems?.length > 0 &&
          newSideMenuItems?.map(({ Icon, label, link, activePaths }, index) => {
            const active =
              pathname === link || activePaths.some((item) => item === pathname)
            return (
              <Section
                key={label + index.toString()}
                to={link}
                isActive={active}
                style={{ overflow: 'hidden', width: '90%' }}
              >
                <div style={{ width: '20px' }}>
                  <Icon />
                </div>
                <Label>{label}</Label>
              </Section>
            )
          })}
      </Flex>
      <LoginContainer to={ROUTES_V2.LOGOUT} onClick={toggleSidebar}>
        <Flex justifyContent="center" gap="12px">
          <LoginIcon />
          <p>Log Out</p>
        </Flex>
      </LoginContainer>
    </MenuWrapper>
  )
}

export default StudentSideBar

const Label = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
