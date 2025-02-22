import { createSlice } from '@reduxjs/toolkit'

import { getNewAllBranchAPI } from '../../helpers/V2/apis'

import { getBranchResponseV2 } from './type'

const initialState: getBranchResponseV2 = {
  data: [],
  page: '1',
  limit: '5',
  loading: false,
  error: null
}

const branchSliceV2 = createSlice({
  name: 'institutes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewAllBranchAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getNewAllBranchAPI.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        state.page = action.payload.page
        state.limit = action.payload.limit
      })
      .addCase(getNewAllBranchAPI.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch institutes  / schools'
      })
  }
})

export default branchSliceV2.reducer
