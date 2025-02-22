import { useEffect, useRef, useState } from 'react'
import {
  BlueButton,
  SecondaryGray600
} from '../../../const/V2/stylingVariables'
import { useHistory, useLocation } from 'react-router-dom'
import {
  MenuWrapper,
  UserName,
  ItemsContainer,
  MenuItem,
  ImageContainer,
  MenuLabel,
  ChildMenuWrapper,
  Flex,
  ChildMenuLabel,
  ProfileImage,
  LogoNameContainer,
  BatchName
  // Count
} from './styledComponents'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { SideMenuItems } from '../../../const/V2/sideMenuItems'
import { ReactComponent as DownArrow } from '../../../assets/svg/keyboard_arrow_down.svg'
import { ReactComponent as UpArrow } from '../../../assets/svg/keyboard_arrow_up.svg'
import {
  // getHeaderTabsDataAPI,
  getModulesAPI,
  getRoleModulesAPI
} from '../../../helpers/V2/apis'
// import { PRODUCT_TYPE } from '../../../utils/env'
import { SideMenuItemDetails } from '../../../utils/types'
import ROUTES_V2 from '../../../const/V2/routes'
import {
  BatchesMore,
  Close,
  MoreBatches
} from '../../../pages/v2/assessment/table/tests'

const SideMenu = ({ isOpen, toggleSidebar }: any) => {
  const role = useSelector((state: RootState) => state.userV2?.userInfoV2?.role)
  const userData = useSelector((state: RootState) => state.userV2?.userInfoV2)
  const Logo = useSelector(
    (state: RootState) => state.userV2?.userInfoV2?.profileImage
  )
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null)
  const [selectedSubMenu, setselectedSubMenu] = useState<number | null>(null)
  // const [count, setCount] = useState<any>()
  const [, setModulesLoading] = useState(false)
  const [modulesList, setModulesList] = useState<any>([])
  const [newSideMenuItems, setNewSideMenuItems] = useState<
    SideMenuItemDetails[]
  >([])
  const [userName, setUserName] = useState('')

  const history = useHistory()
  const { pathname } = useLocation()
  const wrapperRef = useRef<any>(null)

  useEffect(() => {
    setModulesLoading(true)
    if (userData.role === 'superAdmin') {
      const payload = {
        page: 1,
        limit: 150
      }
      getModulesAPI(payload)
        .then((res: any) => {
          setModulesList(res.data)
        })
        .catch(() => {
          history.push(ROUTES_V2.NOMODULES_FOUND)
        })
        .finally(() => setModulesLoading(false))
    } else if (userData.instituteId) {
      getRoleModulesAPI({
        // role: userData.role,
        // instituteId: userData.instituteId
      })
        .then((res) => {
          setModulesList(res.data)
        })
        .catch((error) => {
          console.log(error.message, 'error')
          history.push(ROUTES_V2.NOMODULES_FOUND)
        })
        .finally(() => setModulesLoading(false))
    }
    if (userData.role === 'instituteAdmin') {
      setUserName(userData.instituteName)
    } else if (userData.role === 'branchAdmin') {
      setUserName(userData.branchName)
    } else {
      setUserName(userData.firstName)
    }
  }, [userData, history])

  useEffect(() => {
    if (role && modulesList && SideMenuItems) {
      let newDynamicItems: any[] = []
      SideMenuItems[role].map((staticItems: any) => {
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
                    staticSub.label = sub.name
                    newSubMenus.push(staticSub)
                  }
                })
              })
            }
            // staticItems.label = dynamicItems.name
            staticItems.childMenu = newSubMenus
            newDynamicItems.push(staticItems)
          }
        })
      })
      setNewSideMenuItems(newDynamicItems)
    }
  }, [modulesList, role])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  // const roleMenuItems =
  //   SideMenuItems[
  //     (PRODUCT_TYPE === 'ERP' ? role.toLowerCase() : role) || 'superAdmin'
  //   ]
  // const labelValues: any = roleMenuItems.flatMap(({ childMenu }) =>
  //   childMenu?.map((item: any) => {
  //     return item.label === 'Institutes'
  //       ? 'institutes'
  //       : item.label === 'Ongoing & Finished Assessment'
  //       ? 'tests-submitted'
  //       : item.label === 'Pattern/Template'
  //       ? 'patterns'
  //       : item.label === 'All Assessment'
  //       ? 'tests'
  //       : item.label === 'Assigned Assessment'
  //       ? 'assigned-tests'
  //       : item.label === 'Un-Assigned Assessment'
  //       ? 'unassigned-tests'
  //       : item.label.toLowerCase()
  //   })
  // )
  // const res = await getHeaderTabsDataAPI({ tabs: labelValues })
  // setCount(res)
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   fetchData()
  // }, [role])

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      toggleSidebar()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [show, setShow] = useState(false)
  return (
    <MenuWrapper
      onBlur={() => {
        setTimeout(() => {
          toggleSidebar()
        }, 100)
      }}
      ref={wrapperRef}
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
    >
      <LogoNameContainer>
        <ProfileImage src={Logo ? Logo : '/assets/images/okimage.jpg'} alt="" />
        <UserName>{userName}</UserName>
        {userData?.role === 'teacher' && userData?.batches?.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              top: '2px'
            }}
          >
            <BatchName>{userData?.batches[0]?.batchName}</BatchName>
            {userData?.batches?.length > 1 && (
              <>
                <BatchName>...</BatchName>{' '}
                <button
                  onClick={() => {
                    setShow(!show)
                  }}
                  style={{
                    width: 'auto',
                    height: '30px',
                    borderRadius: '30px',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: '700',
                    fontFamily: 'GT Walsheim, sans-serif',
                    color: '#2B3674'
                  }}
                >
                  +{userData?.batches?.length}
                </button>
                {show && (
                  <MoreBatches>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      Batches / Sections
                      <Close
                        onClick={() => {
                          setShow(!show)
                        }}
                      />
                    </div>
                    {userData?.batches?.map((data, index) => (
                      <div key={index}>
                        <BatchesMore>{data?.batchName}</BatchesMore>
                      </div>
                    ))}
                  </MoreBatches>
                )}
              </>
            )}
          </div>
        )}

        <button className="close-btn" onClick={toggleSidebar}>
          X
        </button>
      </LogoNameContainer>
      <ItemsContainer>
        {/* {newSideMenuItems[
          (PRODUCT_TYPE === 'ERP' ? role.toLowerCase() : role) || 'superAdmin'
        ].map(({ link, label, Icon, childMenu, activePaths }, index) => { */}
        {newSideMenuItems.length > 0 &&
          newSideMenuItems.map(
            ({ link, label, Icon, childMenu, activePaths }, index) => {
              const active =
                pathname === link ||
                activePaths.some((item) => item === pathname)
              return (
                <div key={label + index.toString()}>
                  <MenuItem
                    active={active}
                    to={link}
                    onClick={() => {
                      setSelectedMenu((prevSelected) =>
                        prevSelected === index ? null : index
                      )
                    }}
                  >
                    <Flex>
                      <ImageContainer>
                        <Icon
                          style={{
                            fill: active ? BlueButton : SecondaryGray600
                          }}
                        />
                      </ImageContainer>
                      <MenuLabel active={active}>{label}</MenuLabel>{' '}
                    </Flex>
                    {!childMenu || childMenu?.length <= 0 ? (
                      ''
                    ) : selectedMenu === index ? (
                      <UpArrow />
                    ) : (
                      <DownArrow />
                    )}
                  </MenuItem>
                  {selectedMenu === index &&
                    childMenu &&
                    childMenu.length > 0 && (
                      <ChildMenuWrapper>
                        {childMenu?.map(
                          ({ link, label, childSubMenu }, index) => {
                            const childActive = pathname === link
                            return (
                              <MenuItem
                                key={label + index.toString()}
                                active={childActive}
                                to={link}
                                onClick={() => {
                                  setselectedSubMenu((prevSelected) =>
                                    prevSelected === index ? null : index
                                  )
                                }}
                              >
                                <ChildMenuLabel active={childActive}>
                                  {label}

                                  {!childSubMenu ? (
                                    ''
                                  ) : selectedSubMenu === index ? (
                                    <UpArrow />
                                  ) : (
                                    <DownArrow />
                                  )}
                                  {selectedSubMenu === index &&
                                    childSubMenu &&
                                    childSubMenu.length > 0 && (
                                      <ChildMenuWrapper
                                        style={{ marginLeft: '-50px' }}
                                      >
                                        {childSubMenu?.map(
                                          ({ link, label }, index) => {
                                            const childSubActive =
                                              pathname === link
                                            return (
                                              <MenuItem
                                                key={label + index.toString()}
                                                active={childSubActive}
                                                to={link}
                                              >
                                                <ChildMenuLabel
                                                  active={childSubActive}
                                                >
                                                  {label}
                                                </ChildMenuLabel>
                                              </MenuItem>
                                            )
                                          }
                                        )}
                                      </ChildMenuWrapper>
                                    )}
                                </ChildMenuLabel>

                                {/* {count?.find(
                                (item: any) =>
                                  item.collectionName ===
                                  (label === 'Institutes'
                                    ? 'institutes'
                                    : label === 'Ongoing & Finished Assessment'
                                    ? 'tests-submitted'
                                    : label === 'Pattern/Template'
                                    ? 'patterns'
                                    : label === 'All Assessment'
                                    ? 'tests'
                                    : label === 'Assigned Assessment'
                                    ? 'assigned-tests'
                                    : label === 'Un-Assigned Assessment'
                                    ? 'unassigned-tests'
                                    : label.toLocaleLowerCase())
                              )?.count === 0 ? (
                                ''
                              ) : (
                                <Count>
                                  {
                                    count?.find(
                                      (item: any) =>
                                        item.collectionName ===
                                        (label === 'Institutes'
                                          ? 'institutes'
                                          : label ===
                                            'Ongoing & Finished Assessment'
                                          ? 'tests-submitted'
                                          : label === 'Pattern/Template'
                                          ? 'patterns'
                                          : label === 'All Assessment'
                                          ? 'tests'
                                          : label === 'Assigned Assessment'
                                          ? 'assigned-tests'
                                          : label === 'Un-Assigned Assessment'
                                          ? 'unassigned-tests'
                                          : label.toLocaleLowerCase())
                                    )?.count
                                  }
                                </Count>
                              )} */}
                              </MenuItem>
                            )
                          }
                        )}
                      </ChildMenuWrapper>
                    )}
                </div>
              )
            }
          )}
      </ItemsContainer>
    </MenuWrapper>
  )
}

export default SideMenu
