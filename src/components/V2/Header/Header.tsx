// import SearchInput from './SearchInput'
import {
  HeaderContainer,
  // NotificationAlter,
  PageTitle,
  UserTab
} from './styledComponents'
// import { ReactComponent as NotificationIcon } from '../../../assets/svg/notification.svg'
//import UserProfile from '../../../assets/user-profile.png'
import LinkButton from '../Button/LinkButton'
import { Flex } from '../styledComponents'
import ROUTES_V2 from '../../../const/V2/routes'
import { Link, useHistory } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import styled from 'styled-components'
import BackButton from '../Button/BackButton'

interface HeaderProps {
  mainTitle: string
  btnText?: string
  btnUrl?: string
  btnText2?: string
  btnUrl2?: string
  backbBtn?: boolean
  toggleSidebar: (d: any) => void
}

const Header = ({
  mainTitle,
  btnText,
  btnUrl,
  btnText2,
  btnUrl2,
  backbBtn,
  toggleSidebar
}: HeaderProps) => {
  const {
    user: { userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const history = useHistory()
  return (
    <HeaderContainer>
      <div className="d-flex gap-2 align-items-center">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        {/* <PageName className="mb-2">{topTitle ?? ''}</PageName> */}
        {backbBtn && <BackButton clickHandler={() => history.goBack()} />}
        <PageTitle>{mainTitle || ''}</PageTitle>
      </div>
      <Flex gap="24px">
        {btnText && btnUrl && <LinkButton to={btnUrl}>{btnText}</LinkButton>}
        {btnText2 && btnUrl2 && (
          <LinkButton to={btnUrl2}>{btnText2}</LinkButton>
        )}
        <UserTab>
          {/* <form autoComplete="off">
            <SearchInput placeholder="Search Dashboard" autoComplete="false" />
          </form>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <NotificationAlter />
            <NotificationIcon />
          </div> */}
          <Link to={ROUTES_V2.USERPROFILE}>
            <LogoImage
              src={
                userInfoV2.profileImage
                  ? userInfoV2.profileImage
                  : '/assets/images/okimage.jpg'
              }
              alt="Test"
            />
          </Link>
        </UserTab>
      </Flex>
    </HeaderContainer>
  )
}

export default Header

export const LogoImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50px;
`
