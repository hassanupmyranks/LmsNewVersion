import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState
} from 'react'

import InputV2 from '../../../components/V2/Form/Input'
import { Flex } from '../../../components/V2/styledComponents'
import determineLogo from '../../../helpers/V2/determinelogo'

import LOGIN from '../../../assets/Rectangle 417.png'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'

import { useHistory } from 'react-router-dom'

import strings from '../../../locale/en'

import ROUTES_V2 from '../../../const/V2/routes'

import {
  Check,
  Content,
  Footer,
  FooterList,
  Forgot,
  // Forgot1,
  FormContainer,
  Link,
  List,
  Loginpage,
  Logo,
  LogoWrapper,
  PageComponent,
  Tag,
  Title,
  Image
} from '../login/styledcomponents'
import Password from '../login/password'
import SearchableDropdown from '../../../components/V2/Form/SearchableDropdown'
import { erpLmsInstituteListApi } from '../../../helpers/V2/apis'
import { handleAuthenticateV2 } from '../../../redux/userDetailsV2/api'
import { Loader, ToastMessage } from '../../../components/V2'
import {
  updateHasError,
  updatePassword,
  updateUserName
} from '../../../redux/userDetailsV2/action'

const ErpLoginPage = (): ReactElement => {
  const {
    user: { isLoading, isLoggedIn, hasError, userInfoV2 }
  } = useSelector(
    (state: RootState) => ({
      user: state.userV2
    }),
    shallowEqual
  )

  const [login, setLogin] = useState({
    username: '',
    password: '',
    instituteId: 0
  })
  const [instituteList, setInstituteList] = useState<any>([])

  const dispatch = useDispatch()
  const history = useHistory()

  const {
    login: { loginFailed }
  } = strings
  useEffect(() => {
    erpLmsInstituteListApi()
      .then((res) => {
        if (res) {
          const list = res?.data?.map((item: any) => {
            return {
              id: item.institution_id,
              label: item.institution_name,
              url: item.logo_path
            }
          })
          setInstituteList(list)
        }
      })
      .catch((error) => console.log({ error }))
  }, [])
  useEffect(() => {
    if (isLoggedIn) {
      switch (userInfoV2?.role) {
        case 'STAFF':
          history.push(ROUTES_V2.DASHBOARD)
          break
        case 'STUDENT':
          history.push(ROUTES_V2.STUDENTS_DASHBOARD)
          break
        case 'PARENT':
          history.push(ROUTES_V2.DASHBOARD)
          break
        default:
          history.push(ROUTES_V2.DASHBOARD)
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
          <LogoWrapper style={{ paddingBlock: '12px' }}>
            <Logo src={determineLogo(window.location.host)} />
          </LogoWrapper>
          <br />
          <Title>{'Sign In'}</Title>
          <Content>Enter your username and password to sign in!</Content>
          <br />
          <SearchableDropdown
            required
            label={'Select Institute / School'}
            options={instituteList}
            onSelect={(data: any) => {
              setLogin({
                ...login,
                instituteId: data?.id
              })
            }}
            placeHolder={'Select Institute / School'}
          />
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
            <Forgot>Forgot password?</Forgot>
          </Check>

          <Check>
            <Flex>
              {isLoading ? (
                <Loader />
              ) : (
                <Link type="submit" disabled={isLoading}>
                  Sign in
                </Link>
              )}
            </Flex>
          </Check>
          <Check style={{ marginLeft: '-30%' }}>
            <ToastMessage
              show={hasError}
              bg="danger"
              onCloseHandler={() => dispatch(updateHasError(false))}
              message={loginFailed}
            ></ToastMessage>
          </Check>
        </FormContainer>

        <Footer>©2023 Future Education</Footer>
      </PageComponent>
      <PageComponent>
        <Image src={LOGIN} alt="" />

        <FooterList>
          <List>
            <Tag>Our website</Tag>
            <Tag>Privacy Policy</Tag>
            <Tag>Terms of Use</Tag>
            <Tag>Blog</Tag>
          </List>
        </FooterList>
      </PageComponent>
    </Loginpage>
  )
}
export default ErpLoginPage
