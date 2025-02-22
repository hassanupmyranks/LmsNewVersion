import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState
} from 'react'
import {
  Loginpage,
  PageComponent,
  Check,
  Content,
  Forgot,
  // Forgot1,
  FormContainer,
  Link,
  Logo,
  LogoWrapper,
  Title,
  Image,
  Footer
  // FooterList,
  // List,
  // Tag
} from './styledcomponents'

import InputV2 from '../../../components/V2/Form/Input'
import { Flex } from '../../../components/V2/styledComponents'
import determineLogo from '../../../helpers/V2/determinelogo'

import LOGIN from '../../../assets/svg/LoginImage.svg'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'

import { useHistory } from 'react-router-dom'

import { ROLE } from '../../../helpers/V2/determineMenu'
import strings from '../../../locale/en'

import ROUTES_V2 from '../../../const/V2/routes'
import Password from './password'
import { handleAuthenticateV2 } from '../../../redux/userDetailsV2/api'
import { PRODUCT_TYPE } from '../../../utils/env'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../const/V2/stylingVariables'
import { ToastMessage } from '../../../components/V2'
import {
  updateHasError,
  updatePassword,
  updateUserName
} from '../../../redux/userDetailsV2/action'

const LoginPage = (): ReactElement => {
  const {
    user: { isLoading, isLoggedIn, hasError, userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [login, setLogin] = useState({ username: '', password: '' })

  const dispatch = useDispatch()
  const history = useHistory()

  const {
    login: { loginFailed }
  } = strings

  useEffect(() => {
    if (isLoggedIn) {
      switch (userInfoV2?.role) {
        case ROLE.ADMIN:
          history.push(ROUTES_V2.DASHBOARD)
          break
        case ROLE.STUDENT:
          history.push(ROUTES_V2.STUDENTS_DASHBOARD)
          break
        case ROLE.INSTITUTEV2_ADMIN:
          history.push(ROUTES_V2.DASHBOARD)
          break
        case ROLE.BRANCH_ADMINV2:
          history.push(ROUTES_V2.DASHBOARD)
          break
        default:
          history.push(ROUTES_V2.TEACHERS_DASHBOARD)
      }
    }
  }, [isLoggedIn, userInfoV2?.role, history])

  return (
    <Loginpage>
      <PageComponent>
        <FormContainer
          height={isLoading}
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault()

            dispatch(
              handleAuthenticateV2({
                ...login
              })
            )
          }}
        >
          <LogoWrapper style={{ height: '70px', width: '100%' }}>
            <Logo
              src={determineLogo(PRODUCT_TYPE)}
              style={{ width: '210px' }}
            />
          </LogoWrapper>
          <br />
          <Title>{'Sign In'}</Title>
          <Content>Enter your username and password to sign in!</Content>
          <br />
          <InputV2
            full
            label={'Username'}
            placeholder="Enter your username"
            required={true}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setLogin({
                ...login,
                username: event?.target?.value?.replace(/ +/g, '').trim()
              })
              dispatch(
                updateUserName(event?.target?.value?.replace(/ +/g, '').trim())
              )
            }}
          ></InputV2>
          <br />
          <Password
            placeholder={'Min. 8 characters'}
            label={' Password'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setLogin({
                ...login,
                password: event?.target?.value?.replace(/ +/g, '').trim()
              })
              dispatch(
                updatePassword(event?.target?.value?.replace(/ +/g, '').trim())
              )
            }}
            value={login.password}
          ></Password>

          <br />

          <Check>
            {/* <input style={{ cursor: 'pointer' }} type="checkbox"></input> */}

            {/* <Forgot1>Keep me logged in </Forgot1> */}
            <Forgot onClick={() => history.push(ROUTES_V2.FORGOT_PASSWORD)}>
              Forgot password?
            </Forgot>
          </Check>

          <Check>
            <Flex justifyContent="center">
              {isLoading ? (
                <Spinner
                  style={{
                    color: `${BlueButton}`
                  }}
                  animation={'border'}
                />
              ) : (
                <Link type="submit" disabled={isLoading}>
                  Sign in
                </Link>
              )}
            </Flex>
          </Check>
          {hasError && (
            <Check style={{ marginLeft: '-30%' }}>
              <ToastMessage
                show={hasError}
                bg="danger"
                onCloseHandler={() => dispatch(updateHasError(false))}
                message={loginFailed}
              ></ToastMessage>
            </Check>
          )}
        </FormContainer>

        <Footer>©2023 Future Education</Footer>
      </PageComponent>
      <PageComponent className="imageDiv">
        <Image src={LOGIN} alt="" />

        {/* <FooterList>
          <List>
            <Tag>Our website</Tag>
            <Tag>Privacy Policy</Tag>
            <Tag>Terms of Use</Tag>
            <Tag>Blog</Tag>
          </List>
        </FooterList> */}
      </PageComponent>
    </Loginpage>
  )
}
export default LoginPage
