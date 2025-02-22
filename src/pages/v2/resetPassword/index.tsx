import React, { ReactElement, SyntheticEvent, useState } from 'react'
import {
  Loginpage,
  PageComponent,
  Check,
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

import { Flex } from '../../../components/V2/styledComponents'
import determineLogo from '../../../helpers/V2/determinelogo'

import LOGIN from '../../../assets/svg/LoginImage.svg'

import { Loader } from '../../../components/V2'
import { PRODUCT_TYPE } from '../../../utils/env'
import PasswordInput from '../login/password'
import { forgotPasswordAPI } from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import ROUTES_V2 from '../../../const/V2/routes'
import { useHistory } from 'react-router-dom'

const ResetPasswordPage = (): ReactElement => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const [changePassword, setChangePassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<{
    newPassword: string
    confirmPassword: string
  }>({
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = () => {
    setIsLoading(true)
    forgotPasswordAPI({
      password: changePassword,
      confirmPassword: confirmPassword
    })
      .then((res) => {
        CustomToastMessage(res.message, 'success')
        localStorage.removeItem('token')
        history.push(ROUTES_V2.LOGIN)
      })
      .catch((error) => CustomToastMessage(error.message, 'error'))
      .finally(() => setIsLoading(false))
  }

  return (
    <Loginpage>
      <PageComponent>
        <FormContainer
          height={isLoading}
          onSubmit={(e: SyntheticEvent) => {
            e.preventDefault()
            setIsSubmit(true)
            if (
              changePassword.length >= 6 &&
              changePassword === confirmPassword &&
              changePassword !== '' &&
              error.confirmPassword === ''
            ) {
              handleSubmit()
              setIsSubmit(true)
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
          <Title>{'Reset password'}</Title>

          {/* <Content>Enter your username to forgot your password!</Content> */}
          <br />
          <PasswordInput
            label="New Password"
            placeholder="Enter new password - Min. 6 characters"
            value={changePassword}
            onChange={(e) => {
              setChangePassword(e.currentTarget.value.trim())
            }}
            error={changePassword || !isSubmit ? '' : 'Field is required'}
          ></PasswordInput>
          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter the password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.currentTarget.value.trim())
              if (changePassword !== e.currentTarget.value.trim()) {
                setError((prevState) => ({
                  ...prevState,
                  confirmPassword:
                    'Confirm password does not match new password'
                }))
              } else {
                setError((prevState) => ({
                  ...prevState,
                  confirmPassword: ''
                }))
              }
            }}
            error={
              confirmPassword || !isSubmit
                ? error.confirmPassword !== ''
                  ? error.confirmPassword
                  : ''
                : 'Field is required'
            }
          ></PasswordInput>
          <br />
          <Check>
            <Flex>
              {isLoading ? (
                <Loader />
              ) : (
                <Link type="submit" disabled={isLoading}>
                  Reset
                </Link>
              )}
            </Flex>
          </Check>
        </FormContainer>

        <Footer>©2023 Future Education</Footer>
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
export default ResetPasswordPage
