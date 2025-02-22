import { createAsyncThunk } from '@reduxjs/toolkit'
import { AssignedTestPayload } from '../../utils/types'
import { apiV3 } from '../../services'
import apiEndpointsV2 from '../../const/V2/apiEndpoints'

export const AssignedTestDetail = createAsyncThunk(
  'assignedTest/Details',
  async (payload: AssignedTestPayload) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await apiV3.get(
      `${apiEndpointsV2.instituteTest}?page=${payload.page}&limit=${
        payload.limit
      }${payload.testId ? `&test_id=${payload.testId}` : ''}${
        payload.courseId ? `&course_id=${payload.courseId}` : ''
      }`,
      config
    )
    return await response.data.data
  }
)

export const MyTestDetail = createAsyncThunk(
  'myTest/Details',
  async (payload: AssignedTestPayload) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await apiV3.get(
      `${apiEndpointsV2.getMyTests}?${
        payload.testId ? `&testId=${payload.testId}` : ''
      }`,
      config
    )
    return await response.data.data
  }
)
