import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './types'

const initialState: InitialState = {
  isLoading: false
}

export const teacherLeaveSlice = createSlice({
  name: 'teacherLeave',
  initialState,
  reducers: {},
  extraReducers: {}
})

export default teacherLeaveSlice.reducer
