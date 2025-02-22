import { createSlice } from '@reduxjs/toolkit'
import { AssignedTestDetail } from './api'
import { AssignedTestState } from './types'
import { rowAssignedTestDetails } from './const'

const initialState: AssignedTestState = {
  data: rowAssignedTestDetails,
  isLoading: false
}

export const AssignedTestSlice = createSlice({
  name: 'assignedTest/Details',
  initialState,
  reducers: {},
  extraReducers: {
    [AssignedTestDetail.pending.toString()]: (state) => {
      state.isLoading = true
    },
    [AssignedTestDetail.fulfilled.toString()]: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    [AssignedTestDetail.rejected.toString()]: (state) => {
      state.isLoading = false
    }
  }
})

export default AssignedTestSlice.reducer
