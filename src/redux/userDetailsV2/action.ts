import { handleAuthenticateV2 } from './api'
import { userSliceV2 } from './reducer'

const {
  updateIsLoggedIn,
  updateUserName,
  updatePassword,
  updateHasError,
  updateUserRole,
  updateUserData
} = userSliceV2.actions

export {
  updateIsLoggedIn,
  updateUserName,
  updatePassword,
  updateUserRole,
  handleAuthenticateV2,
  updateHasError,
  updateUserData
}
