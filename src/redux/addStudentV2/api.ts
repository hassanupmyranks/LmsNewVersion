import apiEndpointsV2 from '../../const/V2/apiEndpoints'
import { apiV3 } from '../../services'
import { GetNewAllStudentPayload } from '../../utils/types'
import { CheckUser } from './types'

export const AddStudentV2 = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(apiEndpointsV2.users, payload, config)
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const checkUserNameAPI = async (payload: CheckUser): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.checkUsename,
      payload,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getNewAllStudentAPI = async (
  payload: GetNewAllStudentPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.users}${payload.id ? `/${payload.id}` : ''}${
        payload.page ? `?page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}${
        payload.role ? `&role=${payload.role}` : ''
      }${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${payload.branchId ? `&branchId=${payload.branchId}` : ''}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.batchId ? `&batchId=${payload.batchId}` : ''}${
        payload.searchKey ? `&searchKey=${payload.searchKey}` : ''
      }`,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const GetSingleStudentV2 = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.users}/${payload}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const UpdateStudentV2 = async (
  payload: any,
  Id: string
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.users}/${Id}`,
      payload,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const AssignSubjectForStudentV2 = async (
  payload: any,
  Id: string
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.users}/${Id}/assign-subjects`,
      payload,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const DeleteUsersV2API = async (Id: string | number): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.users}/${Id}`,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}
