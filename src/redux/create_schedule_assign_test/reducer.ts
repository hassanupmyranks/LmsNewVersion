import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, TestDetails } from './types'

export const createScheduleAssignTest = createSlice({
  name: 'Create Test',
  initialState,

  // PayloadAction<TestDetails>
  reducers: {
    createTestDetails: (state, action: PayloadAction<Partial<TestDetails>>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export default createScheduleAssignTest.reducer
