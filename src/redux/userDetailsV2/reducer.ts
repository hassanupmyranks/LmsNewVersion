import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialState } from './types'
import { handleAuthenticateV2 } from './api'

export const userSliceV2 = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    updateHasError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    updateUserRole: (state, action: PayloadAction<any>) => {
      state.userInfoV2.role = action.payload
    },
    updateUserData: (state, action) => {
      state.isLoggedIn = true
      state.userInfoV2 = action.payload
    }
  },
  extraReducers: {
    [handleAuthenticateV2.pending.toString()]: (state) => {
      state.isLoading = true
      state.hasError = false
      state.isLoggedIn = false
    },
    [handleAuthenticateV2.fulfilled.toString()]: (state, action) => {
      state.isLoading = false
      state.isLoggedIn = !!action.payload
      state.userInfoV2 = action.payload
      state.hasError = !action.payload
    },
    [handleAuthenticateV2.rejected.toString()]: (state) => {
      state.isLoading = false
      state.isLoggedIn = false
      state.hasError = true
    }
  }
})

export default userSliceV2.reducer
