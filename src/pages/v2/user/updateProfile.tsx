import styled from 'styled-components'
import {
  ButtonV2,
  Flex,
  Grid,
  WrapperCard
} from '../../../components/V2/styledComponents'
import { Blue, BlueButton } from '../../../const/V2/stylingVariables'
import PasswordInput from '../login/password'
import ImageSelector from '../../../components/V2/ImageSelector/imageSelector'
import UserImage from '../../../assets/user-profile.png'
import { useEffect, useState } from 'react'
import { updateUserProfile } from '../../../helpers/V2/apis'
import { CustomToastMessage } from '../../../components/V2/ToastMessage'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.userV2.userInfoV2)

  const [image, setImage] = useState<any>(user.profileImage)
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [changePassword, setChangePassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<{
    newPassword: string
    confirmPassword: string
  }>({
    newPassword: '',
    confirmPassword: ''
  })
  useEffect(() => {
    if (
      (changePassword.length >= 6 &&
        changePassword === confirmPassword &&
        changePassword !== '') ||
      (!currentPassword && !changePassword && !confirmPassword && image)
    ) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [image, changePassword, confirmPassword, currentPassword])

  const handleUpdateUser = () => {
    setIsLoading(true)
    const editUserProfile = new FormData()
    if (changePassword) {
      editUserProfile.append('password', changePassword)
    }
    if (currentPassword) {
      editUserProfile.append('oldPassword', currentPassword)
    }
    if (image) {
      editUserProfile.append('file', image)
    }
    updateUserProfile(editUserProfile)
      .then((res) => {
        setIsLoading(false)
        window.location.reload()
        CustomToastMessage(res.data.message, 'success')
      })
      .catch((error) => {
        setIsLoading(false)
        CustomToastMessage(error?.response?.data.message, 'error')
      })
  }
  return (
    <ProfileParent style={{ overflowY: 'auto' }}>
      <WrapperCard
        style={{
          width: '500px',
          // height: '97%',
          // minHeight: '650px',
          margin: '0 0 20px 20px',
          padding: '25px 40px 36px'
        }}
      >
        <Title>Update profile</Title>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '90%'
          }}
        >
          <Grid gap="5px">
            <div
              style={{
                paddingBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '32px'
              }}
            >
              <ImageSelector
                onImageSelected={(file) => {
                  setImage(file)
                }}
                defaultvalue={user.profileImage || UserImage}
              />
              <Flex direction="column" alignItems="flex-start">
                <UserDetail>{`Username: ${user.username}`}</UserDetail>
                <UserDetail>{`Name: ${user.firstName}`}</UserDetail>
              </Flex>
            </div>
            {user.role !== 'superAdmin' && (
              <>
                <PasswordInput
                  label="Old Password"
                  placeholder="Enter your old password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.currentTarget.value.trim())
                  }
                ></PasswordInput>
                <PasswordInput
                  label="New Password"
                  placeholder="Enter new password - Min 6 characters"
                  value={changePassword}
                  onChange={(e) => {
                    setChangePassword(e.currentTarget.value.trim())
                    if (
                      currentPassword !== '' &&
                      e.currentTarget.value.trim() === currentPassword
                    ) {
                      setError((prevState) => ({
                        ...prevState,
                        newPassword: 'New password is same as current password'
                      }))
                    } else {
                      setError((prevState) => ({
                        ...prevState,
                        newPassword: ''
                      }))
                    }
                  }}
                  error={error.newPassword}
                ></PasswordInput>
                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Re-Enter new password"
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
                  error={error.confirmPassword}
                ></PasswordInput>
              </>
            )}
          </Grid>
          {user.role !== 'superAdmin' && (
            <Flex justifyContent="space-between">
              <FileParameter>
                <p>Image requirements</p>
                <ul>
                  <li>Minimum size 500x500</li>
                  <li>Should be in PNG,JPG,JPEG format</li>
                </ul>
              </FileParameter>
              <ButtonV2
                onClick={handleUpdateUser}
                disabled={!isActive || isLoading}
                style={{ position: 'relative', width: '46px', height: '21px' }}
              >
                {isLoading ? (
                  <Spinner
                    style={{
                      width: '18px',
                      height: '18px',
                      color: `${BlueButton}`,
                      position: 'absolute',
                      top: '32%',
                      left: '40%'
                    }}
                    animation="border"
                  />
                ) : (
                  `Update`
                )}
              </ButtonV2>
            </Flex>
          )}
        </div>
      </WrapperCard>
    </ProfileParent>
  )
}

export default UserProfile

const ProfileParent = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem 1rem 0;
  }
`
const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  color: ${Blue};
  letter-spacing: -0.02em;
  padding-bottom: 10px;
`
const FileParameter = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 26px;
  color: ${Blue};
`

const UserDetail = styled.p`
  font-size: 17px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: #a3aed0;
`
