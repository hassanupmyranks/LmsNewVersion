import { createSlice } from '@reduxjs/toolkit'
import { MyTestDetail } from './api'
import { MyTestState } from './types'

const initialState: MyTestState = {
  data: [],
  isLoading: false
}

export const MyTestSlice = createSlice({
  name: 'myTest/Details',
  initialState,
  reducers: {},
  extraReducers: {
    [MyTestDetail.pending.toString()]: (state) => {
      state.isLoading = true
    },
    [MyTestDetail.fulfilled.toString()]: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    [MyTestDetail.rejected.toString()]: (state) => {
      state.isLoading = false
    }
  }
})

export default MyTestSlice.reducer
