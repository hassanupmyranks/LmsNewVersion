import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, TopHeader } from './types'

export const topHeaderSlice = createSlice({
  name: 'topHeader',
  initialState,
  reducers: {
    updateTopHeader: (state, action: PayloadAction<TopHeader>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export default topHeaderSlice.reducer
