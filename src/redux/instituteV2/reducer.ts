import { createSlice } from '@reduxjs/toolkit'

import { getNewAllInstituteAPI } from '../../helpers/V2/apis'

import { getInstituteResponseV2 } from './types'

const initialState: getInstituteResponseV2 = {
  data: [],
  page: '1',
  limit: '5',
  loading: false,
  error: null
}

const instituteSliceV2 = createSlice({
  name: 'institutes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewAllInstituteAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNewAllInstituteAPI.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        state.page = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(getNewAllInstituteAPI.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch institutes / schools'
      })
  }
})

export default instituteSliceV2.reducer
