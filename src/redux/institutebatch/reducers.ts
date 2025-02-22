import { createSlice } from '@reduxjs/toolkit'

import { getNewAllBatch } from '../../helpers/V2/apis'

import { getInstituteBatchResponseV2 } from './types'

const initialState: getInstituteBatchResponseV2 = {
  data: [],
  page: '1',
  limit: '5',
  loading: false,
  error: null
}

const InstitutebatchSliceV2 = createSlice({
  name: 'institutes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewAllBatch.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNewAllBatch.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        state.page = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(getNewAllBatch.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch institutes / schools'
      })
  }
})

export default InstitutebatchSliceV2.reducer
