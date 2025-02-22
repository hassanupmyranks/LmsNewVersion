import { createAsyncThunk } from '@reduxjs/toolkit'
import apiEndpointsV2 from '../../const/V2/apiEndpoints'
import { apiV3 } from '../../services'
import { LoginPayloadV2, UserInfoV2 } from './types'

export const handleAuthenticateV2 = createAsyncThunk(
  'user/authenticate',
  async (payload: LoginPayloadV2): Promise<UserInfoV2> => {
    const response = await apiV3.post(apiEndpointsV2.auth, payload)
    const userInfo = response.data
    localStorage.setItem('token', response.data.data.token)
    localStorage.setItem('refreshToken', userInfo.data.refreshToken)
    return userInfo.data.user
  }
)
