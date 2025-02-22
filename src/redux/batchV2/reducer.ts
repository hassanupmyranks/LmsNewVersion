import { createSlice } from '@reduxjs/toolkit'

import { getNewAllBatchAPI } from '../../helpers/V2/apis'

import { getBatchResponseV2 } from './type'

const initialState: getBatchResponseV2 = {
  data: [],
  page: '1',
  limit: '5',
  loading: false,
  error: null
}

const batchSliceV2 = createSlice({
  name: 'institutes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewAllBatchAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNewAllBatchAPI.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        state.page = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(getNewAllBatchAPI.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch institutes / schools'
      })
  }
})

export default batchSliceV2.reducer
