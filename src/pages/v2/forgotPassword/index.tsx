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
  Forgot,
  FormContainer,
  Link,
  Logo,
  LogoWrapper,
  Title,
  Image,
  // FooterList,
  // List,
  // Tag,
  Forgot1
} from './styledcomponents'

import InputV2 from '../../../components/V2/Form/Input'
import { Flex } from '../../../components/V2/styledComponents'
import determineLogo from '../../../helpers/V2/determinelogo'

import LOGIN from '../../../assets/svg/LoginImage.svg'

import { PRODUCT_TYPE } from '../../../utils/env'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import InputMobile from '../../../components/V2/Form/Mobilenumber'
import {
  checkUserNameAPI,
  sentOtpAPI,
  verifyOtpAPI
} from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { Loader } from '../../../components/V2'

const ForgotPasswordPage = (): ReactElement => {
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isOTP, setIsOpt] = useState(false)

  const [data, setData] = useState({ username: '', mobile: '', otp: '' })
  const [userNameError, setUserNameError] = useState('')
  const [mobileError, setMobileError] = useState('')

  const [testDurHours, setTestDurHours] = useState<number>(0)
  const [testDurMinutes, setTestDurMinutes] = useState<number>(0)
  const [testDurSeconds, setTestDurSeconds] = useState<number>(0)
  const [timeTaken, setTimeTaken] = useState(false)

  const handleSendOtp = (action: string) => {
    if (data.username && data.mobile) {
      setIsLoading(true)
      sentOtpAPI({
        username: data.username,
        mobile: data.mobile,
        action: action
      })
        .then((res) => {
          setMobileError('')
          setIsOpt(true)
          CustomToastMessage(res.message, 'success')
        })
        .catch((error) => {
          setMobileError(error.message)
          CustomToastMessage(error.message, 'error')
        })
        .finally(() => setIsLoading(false))
    }
  }

  useEffect(() => {
    if (isOTP) {
      const totalMinutes = 1
      setTestDurHours(Math.floor(totalMinutes / 60))
      setTestDurMinutes(Math.floor(totalMinutes % 60))
      setTestDurSeconds(0)
    }
  }, [isOTP])

  useEffect(() => {
    let myInterval = setInterval(() => {
      setTestDurSeconds((prevState) => {
        if (prevState > 0) {
          return prevState - 1
        } else {
          setTestDurMinutes((prevStateMin) => {
            if (prevStateMin > 0) {
              return prevStateMin - 1
            } else {
              setTestDurHours((prevStateHours) => {
                if (prevStateHours > 0) {
                  return testDurHours - 1
                } else {
                  clearInterval(myInterval)
                  setTestDurSeconds(0)
                  if (
                    testDurHours === 0 &&
                    testDurMinutes === 0 &&
                    testDurSeconds === 0
                  ) {
                    setTimeTaken(true)
                  }
                  return 0
                }
              })
              return testDurHours === 0 ? 0 : 59
            }
          })
          return 59
        }
      })
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testDurHours])

  return (
    <Loginpage>
      <PageComponent>
        <FormContainer
          height={isLoading}
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault()
            setIsSubmit(true)
            if (!isOTP && data.username && data.mobile && data.otp === '') {
              setIsSubmit(false)
              setIsLoading(true)
              checkUserNameAPI({
                username: data.username
              })
                .then(() => {
                  setUserNameError('')
                  handleSendOtp('send')
                })
                .catch((error) => setUserNameError(error.message))
                .finally(() => setIsLoading(false))
            }
            if (isOTP && data.username && data.mobile && data.otp) {
              setIsSubmit(false)
              setIsLoading(true)
              verifyOtpAPI({
                username: data.username,
                mobile: data.mobile,
                otp: data.otp
              })
                .then((res) => {
                  localStorage.setItem('token', res.data.token)
                  setIsOpt(false)
                  history.push(ROUTES_V2.RESET_PASSWORD)
                })
                .catch((error) => CustomToastMessage(error.message, 'error'))
                .finally(() => setIsLoading(false))
            }
          }}
        >
          <LogoWrapper style={{ height: '70px', width: '100%' }}>
            <Logo
              src={determineLogo(PRODUCT_TYPE)}
              style={{ width: '210px' }}
            />
          </LogoWrapper>
          <br />
          <Title>{isOTP ? 'Verification' : 'Forgot password'}</Title>
          {!isOTP && (
            <>
              <br />
              <InputV2
                full
                label={'Username'}
                disabled={isOTP}
                placeholder="Enter your username"
                required={true}
                error={
                  data.username || !isSubmit
                    ? userNameError
                      ? userNameError
                      : ''
                    : 'Field is required'
                }
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    username: event?.target?.value?.replace(/ +/g, '').trim()
                  })
                }}
              ></InputV2>
              <br />
              <InputMobile
                full
                label={'Mobile Number'}
                type="number"
                disabled={isOTP}
                placeholder="Please enter the registered number"
                required={true}
                error={
                  data.mobile || !isSubmit
                    ? mobileError
                      ? mobileError
                      : ''
                    : 'Field is required'
                }
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    mobile: event?.target?.value
                  })
                }}
              ></InputMobile>
            </>
          )}
          {isOTP && (
            <>
              <br />
              <InputV2
                full
                label={'Please verify your otp'}
                placeholder="1234"
                type="number"
                required={true}
                error={
                  data.mobile || !isSubmit
                    ? userNameError
                      ? userNameError
                      : ''
                    : 'Field is required'
                }
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    otp: event?.target?.value
                  })
                }}
              ></InputV2>
              {timeTaken ? (
                <Check>
                  <Forgot1 onClick={() => handleSendOtp('resend')}>
                    Resend OTP
                  </Forgot1>
                </Check>
              ) : (
                <Check>
                  <Forgot1>
                    {`${
                      testDurMinutes < 10
                        ? `0${testDurMinutes}`
                        : testDurMinutes
                    }:${
                      testDurSeconds < 10
                        ? `0${testDurSeconds}`
                        : testDurSeconds
                    }`}
                  </Forgot1>
                </Check>
              )}
            </>
          )}
          <br />
          <Check>
            <Flex>
              {isLoading ? (
                <Loader />
              ) : (
                <Link type="submit" disabled={isLoading}>
                  {isOTP ? 'VERIFY' : 'Submit'}
                </Link>
              )}
            </Flex>
          </Check>
          {!isOTP && (
            <Check className="mt-3">
              <Forgot onClick={() => history.push(ROUTES_V2.LOGIN)}>
                {'<'} Back to login
              </Forgot>
            </Check>
          )}
        </FormContainer>
      </PageComponent>
      <PageComponent>
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
export default ForgotPasswordPage
