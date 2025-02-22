import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Router, useLocation } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import useBreakpoint from 'use-breakpoint'
// import { Header } from './components'
import history from './const/V2/history'
import theme from './const/V2/theme'
import SideNavigationV2 from './container/V2/SideNavigation'
import { updateIsMenuOpen } from './redux/menu/actions'
import { RootState } from './redux/store'
import Routes from './routes'
import TopHeader from './components/V2/TopHeader/TopHeader'
import { SecondaryGray300 } from './const/V2/stylingVariables'
import { PRODUCT_TYPE } from './utils/env'
import { AuthProvider } from './components/V2/context/AuthContext'
import BREAKPOINTS from './const/V2/breakpoint'
import { weight } from './const/V2/fonts'
import determineHead from './helpers/V2/determineHead'

interface BodyProps {
  isShowOverlay?: boolean
  marginTop?: boolean
  isMenu?: boolean
}

const Body = styled.div<BodyProps>`
  display: flex;
  margin-top: ${({ marginTop }) => (marginTop ? '70px' : null)};
  min-height: calc(100vh);
  max-width: 100vw;
  overflow-x: hidden;
  background: ${({ isMenu }) =>
    isMenu ? 'rgba(47, 43, 61, 0.7) !important' : '#fff !important'};
  @media (max-width: 500px) {
    margin-top: ${({ marginTop }) => (marginTop ? '70px' : null)};
  }
`

const DivContainer = styled.div<{ isOpen?: boolean }>`
  max-height: 100vh;
  width: 100%;
  overflow-y: hidden;
  background-color: ${SecondaryGray300};
  z-index: ${({ isOpen }) => (isOpen ? '-1' : '0')};

  display: flex;
  flex-direction: column;
`

interface GlobalStylesProps {
  isMobileMenuOpen: boolean
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  body {
    @import url('https://use.typekit.net/your-project-id.css');
    font-family: 'GT Walsheim', sans-serif;
    overflow: ${({ isMobileMenuOpen }) =>
      isMobileMenuOpen ? 'hidden' : 'auto'}; 
  scroll-behavior: smooth;  
  }
  #container {
    z-index: ${({ isMobileMenuOpen }) => (isMobileMenuOpen ? '-1' : '0')};
  }  
  .react-datepicker-popper {
    z-index: 999;
    padding: 0 !important;
  }
  th{
  text-align: center;
  font-size: 14px;
  font-weight: ${weight.bold};
  }
  td{
    text-align: center;
    font-weight: ${weight.normal};
    font-size: .850rem;  
  } 
  .table tbody>tr>th,
  .table tfoot>tr>th,
  .table tbody>tr>td,
  .table tfoot>tr>td{
    line-height: 1.25; 
    padding: 13px 4px;
    border  :none ;
}  
.table thead>tr>th,
.table thead>tr{
    line-height: 1.25; 
    padding: 13px 4px;   background: #f8f6f6; 
} 
.react-calendar button {
    margin: 0;
    outline: none;
    border: 0.5px solid #69296F;
}
.react-calendar__month-view__weekdays__weekday{
  margin-top: -16px;
  border: 0.5px solid #69296F;
  padding: 2%;
}
.react-calendar__navigation button {
  background-color: #69296F;
  color: white;
}
.react-calendar__tile{
  padding: 3%;
}  
p{
  margin: 0;
  margin-bottom:0;
  margin-top: 0;
} 

mjx-container[jax='SVG'][display='true'] {
  color: red;
  display: block;  font-family: 'Nunito', sans-serif;
  text-align: left;  
}
p {
  margin: 0;
  margin-bottom: 0;
}
`

const App = () => {
  const { isLoggedIn, isMenuOpen } = useSelector(
    (state: RootState) => ({
      isLoggedIn: state.userV2.isLoggedIn,
      isMenuOpen: state.userV2.isLoggedIn
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  const { breakpoint } = useBreakpoint(BREAKPOINTS)
  const isMobileMenuOpen = isMenuOpen && breakpoint === 'mobile'

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSmall, setIsSmall] = useState(false)

  const toggleSidebar = () => {
    if (isSmall) {
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [breakpoint])

  useEffect(() => {
    let link: HTMLLinkElement | null =
      document.querySelector("link[rel~='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }
    const heading = determineHead(PRODUCT_TYPE)
    link.href = heading.favicon
    document.title = heading.title
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsSidebarOpen(false)
        setIsSmall(true)
      } else {
        setIsSidebarOpen(true)
        setIsSmall(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // Run once to handle initial load
    handleResize()

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // const dd: any = 'dps.futuretechschool.in'
  // let ddddd: any
  // if (HOST.DPS === dd?.toLocaleUpperCase()) {
  //   ddddd = determineDpsMenu(role)
  // } else {
  //   ddddd =  determineMenu(role)
  // }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles isMobileMenuOpen={isMobileMenuOpen} />
      {/* {false && <Header />} */}
      <Body
        isMenu={isSidebarOpen && isSmall}
        marginTop={isLoggedIn && false}
        onClick={() => {
          setTimeout(() => {
            if (isMobileMenuOpen) {
              dispatch(updateIsMenuOpen(false))
            }
          }, 500)
        }}
      >
        <Router history={history}>
          <WrappedLayout
            {...{
              isSidebarOpen,
              toggleSidebar,
              isSmall
            }}
          />
        </Router>
      </Body>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}

export default App

const WrappedLayout = ({ isSidebarOpen, toggleSidebar, isSmall }: any) => {
  const { pathname } = useLocation()

  // const { role = '' } = useSelector(
  //   (state: RootState) => ({
  //     role: state.user.userInfo?.user_role
  //   }),
  //   shallowEqual
  // )

  const showLayout =
    pathname !== '/' &&
    pathname !== '/forgot-password' &&
    pathname !== '/reset-password'

  return (
    <AuthProvider>
      {/* {false && <SideNavigation menus={determineMenu(role)} />} */}
      {showLayout && isSidebarOpen && (
        <SideNavigationV2
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      <DivContainer isOpen={isSidebarOpen && isSmall}>
        {showLayout && <TopHeader toggleSidebar={toggleSidebar} />}
        <Routes />
      </DivContainer>
    </AuthProvider>
  )
}
