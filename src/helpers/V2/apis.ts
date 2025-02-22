import { createAsyncThunk } from '@reduxjs/toolkit'

import apiEndpointsV2 from '../../const/V2/apiEndpoints'

import { apiV2, apiV3 } from '../../services'
import {
  CreatePatternPayload,
  GetCourseDetailsPayload,
  GetPatternDataPayload,
  GetRandomGenerateQuestionsPayload,
  GetTopicQuestionsPayload,
  GetTestDataPayload,
  CreateInstituteTestPayload,
  GetTeacherPayload,
  GetCoursePayload,
  GetInstituteBatchPayload,
  TeacherPublishTopicPayload,
  UpdateQuestionsCreatedTestAPIPayload,
  GetHeaderTabsPayload,
  GetNewAllBatchAPIPayload,
  PaginationPayload,
  GetSubjectPayload,
  GetChapterPayload,
  GetTopicPayload,
  GetMaterialPayload,
  GetReviewAssignmentData,
  QuestionBulkUploadPayload,
  AllUserAPIPayload,
  BatchApiPayload,
  BranchApiPayload,
  GetQuestionBankDetailsPayload,
  GetAllPatternDataPayload,
  GetNewAllInstituteAPIPayload,
  GetNewAllBranchAPIPayload,
  TestDeletePayload,
  UpdatePatternPayload,
  AddAssignmentPayload,
  UploadedQuestionsPayload,
  AssignedTestPayload,
  GetBatchCourse,
  AddAuthorProps,
  AssignTestToInstitutePayload,
  AssignBatchToTeacherPayload,
  // SubmitAssignmentPayload,
  AddBatchPayload,
  GetBatchCourseId,
  EditBatchPayload,
  SubjectsDataCourseIdPayload,
  GetAllBatch,
  SubmitAttemptedTestPayload,
  ManageContentPayload,
  ReviewQuizPayload,
  GetReviewBatchPayload,
  GetCourseId,
  reviewedSubmittedAssignmentAPIPayload,
  GetStudentDashboardPayload,
  GetAllMyTestPayload,
  ResultAnnouncementPayload,
  CreatePracticeTestPayload,
  GetAnalyticsPayload,
  GetSubmitAttemptedTestPayload,
  SubmitPracticeTestPayload,
  GetTestToppersPayload,
  createDuplicateTestPayload,
  checkUserNameAPIPayload,
  SendOTPPayload,
  VerifyOtpAPIPayload,
  ForgotPasswordAPIPayload,
  TestEnabledPayload,
  BoardsAPIPayload,
  GetQuestionsPayload,
  UpdateQrCodePayload,
  GenerateQrCodeAPIPayload,
  GetQrCodePayload,
  GetSubTopicAPIPayload,
  CreateChapterPayload,
  createDuplicateNoPatternTestPayload,
  AssignNoPatternTestPayload,
  CourseMappingPayload,
  GetAllAssesmentTestTypePayload,
  getDashboardDataPayload,
  getTeacherDashboardDataPayload,
  GetAllHolidaysPayload,
  GetSingleHolidayPayload,
  AddOrEditHolidayProps,
  CreateLessonPlanModule,
  CreateSession,
  CompletedSessionPayload,
  AssignTimeTableToInstitutePayload,
  getStudentPerformancePayload,
  getStudentPerformanceListPayload,
  UpdateTimeTableToInstitutePayload
} from '../../utils/types'
import { LoginPayloadV2, UserInfoV2 } from '../../redux/userDetailsV2/types'
import { NumberFormatterCallbackFunction } from 'highcharts'
import axios from 'axios'

export const getCoursesDetailsApi = async (
  payload: GetCourseDetailsPayload
) => {
  const response: any = await apiV2.post(
    apiEndpointsV2.getCourseDetails,
    payload
  )
  if (response?.status === 200 || response?.status === 'success') {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getTeacherSubmittedQuizAPI = async (payload?: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  let url = `${apiEndpointsV2.getTeacherSubmittedQuiz}?`
  if (payload?.gradeId) url += `&gradeId=${payload.gradeId}`
  if (payload?.batchId) url += `&batchId=${payload.batchId}`
  if (payload?.quizId) url += `&quizId=${payload.quizId}`
  if (payload?.studentId) url += `&studentId=${payload.studentId}`
  if (payload?.viewBatchStudents)
    url += `&viewBatchStudents=${payload.viewBatchStudents}`
  if (payload?.limit) url += `&limit=${payload.limit}`
  if (payload?.skip) url += `&skip=${payload.skip}`
  if (payload?.subjectId) url += `&subjectId=${payload.subjectId}`
  if (payload?.chapterId) url += `&chapterId=${payload.chapterId}`
  if (payload?.topicId) url += `&topicId=${payload.topicId}`

  const response = await apiV3.get(url, config)
  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data.data)
  }
}

export const createQuizApi = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response: any = await apiV3.post(
    apiEndpointsV2.CreateQuiz,
    payload,
    config
  )
  if (response?.status === 200 || response?.status === 'success') {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const assignQuizApi = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response: any = await apiV3.patch(
    apiEndpointsV2.AssignQuiz,
    payload,
    config
  )
  if (response?.status === 200 || response?.status === 'success') {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const createPatternApi = async (payload: CreatePatternPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.post(apiEndpointsV2.testPattern, payload, config)
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const updatePatternApi = async (payload: UpdatePatternPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.patch(
    apiEndpointsV2.testPattern,
    payload,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const deletePatternApi = async (testId: string | number) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      test_id: testId
    }
  }
  try {
    const response = await apiV3.delete(apiEndpointsV2.testPattern, config)
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getCreatePatternDataApi = async (
  payload: GetPatternDataPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.testPattern}?${
        payload.test_id ? `pattern_id=${payload.test_id}` : ''
      }&limit=${payload.limit}&skip=${payload.skip}${
        payload.course_id ? `&course_id=${payload.course_id}` : ''
      }${payload.searchKey ? `&searchKey=${payload.searchKey}` : ''}`,
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

export const getTeacherModule = async (payload: any): Promise<any> => {
  const response: any = await apiV2.post(
    apiEndpointsV2.getTeacherModule,
    payload
  )
  if (response?.status_code === 200) {
    return response
  } else {
    throw new Error(response?.data)
  }
}
export const getCreateTestDataApi = async (
  payload: GetTestDataPayload
): Promise<any> => {
  const response = await apiV2.post(apiEndpointsV2.getCreatedTestData, payload)
  if (response?.status === 200) {
    return response
  } else {
    throw new Error(response?.data)
  }
}

export const getQuestionType = async (payload: {
  courseId: string | undefined
  subjectId: string | undefined
}) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.getQuestionType}?courseId=${payload.courseId}${
      payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
    }&version=v2`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response.data.data)
  }
}

export const getLMSQuestions = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.getLMSQuestion}?${
      payload.taskType ? `taskType=${payload.taskType}` : ''
    }&limit=${payload.limit}${payload.page ? `&page=${payload.page}` : ''}${
      payload.questionType ? `&questionType=${payload.questionType}` : ''
    }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
      payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
    }${payload.chapterId ? `&chapterId=${payload.chapterId}` : ''}${
      payload.topicId ? `&topicId=${payload.topicId}` : ''
    }${payload.subTopicId ? `&subTopicId=${payload.subTopicId}` : ''}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response.data)
  }
}

export const getNewAllTestData = async (payload: GetTestDataPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.instituteTest}?&limit=${payload.limit}${
        payload.skip ? `&skip=${payload.skip}` : ''
      }${payload.user_id ? `&user_id=${payload.user_id}` : ''}${
        payload.show_only_user_created_tests !== undefined
          ? `&show_only_user_created_tests=${payload.show_only_user_created_tests}`
          : ''
      }${payload.test_id ? `&test_id=${payload.test_id}` : ''}${
        payload.withoutPattern !== undefined
          ? `&withoutPattern=${payload.withoutPattern}`
          : ''
      }${payload.course_id ? `&course_id=${payload.course_id}` : ''}${
        payload.isCompleted !== undefined
          ? `&isCompleted=${payload.isCompleted}`
          : ''
      }${
        payload.isAssigned !== undefined
          ? `&isAssigned=${payload.isAssigned}`
          : ''
      }${payload.searchKey ? `&searchKey=${payload.searchKey}` : ''}${
        payload.batchIds ? `&batchIds=["${payload.batchIds.join('","')}"]` : ''
      }${payload.isOffline ? `&isOffline=${payload.isOffline}` : ''}`,
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

export const getNoPatternAllTestData = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.testWithoutPattern}${
        payload.page ? `?page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}${
        payload.testId ? `&testId=${payload.testId}` : ''
      }${payload.course_id ? `&course_id=${payload.course_id}` : ''}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.started !== undefined ? `&started=${payload.started}` : ''}${
        payload.status !== undefined ? `&status=${payload.status}` : ''
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

export const getNoPatternSingleTestData = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.testWithoutPattern}/${payload.testId}`,
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

export const getSingleNoPatternTestData = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.testWithoutPattern}/${payload.testId}`,
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

export const deleteNoPatternTest = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.delete(
      `${apiEndpointsV2.testWithoutPattern}/${payload.testId}`,
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

export const getAllTestsSubmittedData = async (payload: GetTestDataPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getTestsSubmitted}?&limit=${payload.limit}&page=${payload.skip}`,
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

export const getOnlineTestStudents = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.testStartedStudents}?testId=${payload.testId}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }${payload.page ? `&page=${payload.page}` : ''}${
        payload.course_id ? `&course_id=${payload.course_id}` : ''
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

export const getOnlineNoPatternTestStudents = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.noPatternTestStartedStudents}?testId=${payload.testId}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }${payload.page ? `&page=${payload.page}` : ''}${
        payload.course_id ? `&course_id=${payload.course_id}` : ''
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

export const getGameTypes = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.get(`${apiEndpointsV2.gameType}`, config)
  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data.data)
  }
}

export const NewCreateInstituteTest = async (
  payload: CreateInstituteTestPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response = await apiV3.post(
      apiEndpointsV2.instituteTest,
      payload,
      config
    )
    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const updateInstituteTestAPI = async (
  payload: CreateInstituteTestPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response = await apiV3.put(
      apiEndpointsV2.instituteTest,
      payload,
      config
    )
    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const updateUserProfile = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  }
  const response = await apiV3.put(apiEndpointsV2.users, payload, config)
  if (response?.status === 200) {
    return response
  } else {
    throw new Error(response?.data)
  }
}

export const getLearnCourseData = async (payload: PaginationPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.Course}?page=${payload.page}&limit=${payload.limit}${
        payload.gameType ? `&gameType=${payload.gameType}` : ''
      }${payload.branchId ? `&branchId=${payload.branchId}` : ''}`,
      config
    )
    if (response?.status === 200) {
      return response.data.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getSubjectsDataCourseId = async (
  payload: SubjectsDataCourseIdPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.Subject}?${
        payload.courseId ? `courseId=${payload.courseId}` : ''
      }&page=${payload.page}&limit=${payload.limit}`,
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

export const getSubjectData = async (payload: GetSubjectPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.Subject}?page=${payload.page}&limit=${payload.limit}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.batchId ? `&batchIds=["${payload.batchId}"]` : ''}${
        payload.batchIds ? `&batchIds=["${payload.batchIds.join('","')}"]` : ''
      }`,
      config
    )
    if (response?.status === 200) {
      return response.data.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getChapterData = async (payload: GetChapterPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.Chapter}?page=${payload.page}&limit=${payload.limit}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.mode ? `&mode=${payload.mode}` : ''
      }${payload.searchKey ? `&searchKey=${payload.searchKey}` : ''}${
        payload.batchIds ? `&batchIds=["${payload.batchIds.join('","')}"]` : ''
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

export const createChapterAPI = async (payload: CreateChapterPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      `${apiEndpointsV2.Chapter}`,
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

export const getSingleChapterAPI = async (id: String) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(`${apiEndpointsV2.Chapter}/${id}`, config)
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const updateChapterAPI = async (payload: any, Id: string) => {
  const storedToken = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.Chapter}/${Id}`,
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

export const daleteChapterAPI = async (id: String) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.delete(
      `${apiEndpointsV2.Chapter}/${id}`,
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

export const createTopics = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.post(apiEndpointsV2.Topic, payload, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const updateTopics = async (payload: any, Id: string) => {
  const storedToken = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.Topic}/${Id}`,
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

export const deleteTopicsAPI = async (id: String) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.delete(`${apiEndpointsV2.Topic}/${id}`, config)
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getSingleTopic = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Topic}/${payload.id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${storedToken}`
        }
      }
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

export const getSingleSubTopic = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.subTopics}/${payload.id}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${storedToken}`
        }
      }
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

export const createSubTopics = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.post(apiEndpointsV2.subTopics, payload, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const updateSubTopics = async (payload: any, Id: string) => {
  const storedToken = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.subTopics}/${Id}`,
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

export const deleteSubTopicsAPI = async (id: String) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.delete(
      `${apiEndpointsV2.subTopics}/${id}`,
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

export const getTopicData = async (payload: GetTopicPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.Topic}?page=${payload.page}&limit=${payload.limit}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.chapterId ? `&chapterId=${payload.chapterId}` : ''}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${
        payload.batchIds && payload.batchIds.length > 0
          ? `&batchIds=["${payload.batchIds.join('","')}"]`
          : ''
      }${payload.isLMS !== undefined ? `&isLMS=${payload.isLMS}` : ''}${
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

export const getMaterialData = async (payload: GetMaterialPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.Material}?${
        payload.courseId ? `courseId=${payload.courseId}` : ''
      }${payload.type ? `&materialType=${payload.type}` : ''}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${payload.topicId ? `&topicId=${payload.topicId}` : ''}${
        payload.chapterId ? `&chapterId=${payload.chapterId}` : ''
      }&limit=${payload.limit}${payload.page ? `&page=${payload.page}` : ''}${
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
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const getInstitutesAPI = async (payload: PaginationPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Institute}?page=${payload.page}&limit=${payload.limit}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const getBranchAPI = async (payload: BranchApiPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Branch}?page=${payload.page}&limit=${payload.limit}${
        payload.instituteId && payload.instituteId !== 'undefined'
          ? `&instituteId=${payload.instituteId}`
          : ''
      }`,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const getBatchAPI = async (payload: BatchApiPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Batch}?page=${payload.page}&limit=${payload.limit}${
        payload.branchIds && payload.branchIds.length > 0
          ? `&branchIds=["${payload.branchIds.join('","')}"]`
          : ''
      }
      ${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}${
        payload.course ? `&course=${payload.course}` : ''
      }${payload.searchKey ? `&searchKey=${payload.searchKey}` : ''}`,

      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const getAllUserAPI = async (payload: AllUserAPIPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response: any = await apiV3.get(
    `${apiEndpointsV2.users}?page=${payload.page}&limit=${payload.limit}&role=${
      payload.role
    }${
      payload.instituteId === undefined || null || ''
        ? ''
        : `&instituteId=${payload.instituteId}`
    }${payload.branchId ? `&branchId=${payload.branchId}` : ''}${
      payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
    }${
      payload.questionBankCourse
        ? `&questionBankCourse=${payload.questionBankCourse}`
        : ''
    }`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getQuestionBankV2CoursesAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getQuestionBankV2Courses}?limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const getQuestionBankV2SubjectsAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.getQuestionBankV2subjects}${
      payload.courseId ? `?courseId=${payload.courseId}` : ''
    }&limit=${payload.limit}`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getQuestionBankV2GetAllQuestionAPI = async (
  payload: GetQuestionsPayload
) => {
  const tmp_question_types: any = payload?.questionType
    ? payload?.questionType
    : []
  const uniqueQuestionTypes = tmp_question_types?.filter(
    (value: any, index: any, self: any) => self.indexOf(value) === index
  )
  const outputArray = uniqueQuestionTypes.map((item: string) => `"${item}"`)

  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.QuestionsV2}?&limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}${
        payload.chapterId
          ? `&chapterIds=["${payload.chapterId.join('","')}"]`
          : ''
      }${
        payload.topicIds ? `&topicIds=["${payload.topicIds.join('","')}"]` : ''
      }${payload.unitId ? `&unitIds=["${payload.unitId.join('","')}"]` : ''}${
        payload.questionType ? `&questionType=[${outputArray}]` : ''
      }`,
      config
    )
    if (response?.status === 200) {
      return response.data.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getQuestionV2BankUnitAPI = async (
  payload: GetQuestionBankDetailsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await apiV3.get(
    `${apiEndpointsV2.getQuestionBankV2Unit}?${
      payload.courseId ? `courseId=${payload.courseId}` : ''
    }${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}&limit=${
      payload.limit
    }`,
    config
  )

  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data.data)
  }
}

export const getQuestionV2BankChaptersAPI = async (
  payload: GetQuestionBankDetailsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await apiV3.get(
    `${apiEndpointsV2.getQuestionBankV2Chapters}?${
      payload.courseId ? `courseId=${payload.courseId}` : ''
    }${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}${
      payload.unitId ? `&unitId=${payload.unitId}` : ''
    }&limit=${payload.limit}`,
    config
  )

  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data.data)
  }
}

export const getQuestionBankV2TopicsAPI = async (
  payload: GetTopicQuestionsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.getQuestionBankV2Topics}?&limit=${payload.limit}${
      payload.chapterId ? `&chapterId=${payload.chapterId}` : ''
    }`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data.data
  } else {
    throw new Error(response?.data)
  }
}

export const getQuestionsChapterAndTopicAPI = async (
  payload: GetTopicQuestionsPayload
) => {
  const tmp_question_types = payload?.question_type
    ? payload?.question_type?.split(',')
    : []
  const uniqueQuestionTypesSet = new Set(tmp_question_types)

  const uniqueQuestionTypesArray = Array.from(uniqueQuestionTypesSet)
  let question_types = ''
  for (let index = 0; index < uniqueQuestionTypesArray.length; index++) {
    question_types += `"${uniqueQuestionTypesArray[index]}"`
  }
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.Questions}?&limit=${payload.limit}&skip=${payload?.skip}${
      payload.courseId ? `&course_id=${payload.courseId}` : ''
    }&topic_id=${payload.topic_id}${
      payload.subtopicId ? `&subtopic_id=${payload.subtopicId}` : ''
    }${`&question_type=[${question_types.slice(0, -1)}]`}`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data.data
  } else {
    throw new Error(response?.data)
  }
}

export const getNewRandomQuestionsAPI = async (
  payload: GetRandomGenerateQuestionsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.post(
      apiEndpointsV2.RandomQuestions,
      payload,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getAllTestPatternData = async (
  payload: GetAllPatternDataPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.testPattern}?&limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.skip ? `&skip=${payload.skip}` : ''}${
        payload.test_id ? `&test_id=${payload.test_id}` : ''
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

export const getInstituteBatch = async (payload: GetInstituteBatchPayload) => {
  const response: any = await apiV2.post(
    apiEndpointsV2.getInstituteBatch,
    payload
  )
  if (response?.status === 200 || response?.statusCode === 200) {
    return response.response
  } else {
    throw new Error(response?.data)
  }
}

export const learnModule = async (payload: any): Promise<any> => {
  const response: any = await apiV2.post(apiEndpointsV2.learnModule, payload)
  if (response?.status_code === 200) {
    return response
  } else {
    throw new Error(response?.data)
  }
}

export const getTeachers = async (payload: GetTeacherPayload) => {
  const response: any = await apiV2.post(apiEndpointsV2.getTeachers, payload)
  if (response?.status === 200 || response?.status_code === 200) {
    return response.response
  } else {
    throw new Error(response?.data)
  }
}

export const getCourse = async (payload: GetCoursePayload) => {
  const response: any = await apiV2.post(apiEndpointsV2.getCourse, payload)
  if (response?.status === 200 || response?.statusCode === 200) {
    return response.response
  } else {
    throw new Error(response?.data)
  }
}

// /dev/publish-materials

export const teacherPublishedTopicAPI = async (
  payload: TeacherPublishTopicPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.post(
      apiEndpointsV2.teacherPublishedTopic,
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
export const publishMaterialAPI = async (
  payload: TeacherPublishTopicPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.post(
      apiEndpointsV2.teacherPublishedTopic,
      // ${
      //   payload.courseId ? payload.courseId : ''
      // }${payload.subjectIds ? payload.subjectIds : ''}${
      //   payload.chapterIds ? payload.chapterIds : ''
      // }${payload.batchId ? payload.batchId : ''}
      // ${payload.topicIds ? payload.topicIds : ''}${
      //   payload.instituteId ? payload.instituteId : ''
      // }${payload.branchId ? payload.branchId : ''}`,
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
export const updateQuestionsCreatedTestAPI = async (
  payload: UpdateQuestionsCreatedTestAPIPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.post(
      apiEndpointsV2.updateQuestionsCreatedTest,
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

export const getHeaderTabsDataAPI = async (payload: GetHeaderTabsPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response: any = await apiV3.post(
    apiEndpointsV2.getHeaderTabsData,
    payload,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data.data
  } else {
    throw new Error(response?.data)
  }
}

export const getNewAllBatchAPI = createAsyncThunk(
  'batches/fetchAll',
  async (payload: GetNewAllBatchAPIPayload) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const response: any = await apiV3.get(
        `${apiEndpointsV2.getNewAllBatch}?page=${payload.page}&limit=${
          payload.limit
        }
      ${
        payload.branchIds
          ? `&branchIds=["${payload.branchIds.join('","')}"]`
          : ''
      }
      ${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}
      ${
        payload.courseId
          ? `&branchIds=["${payload?.branchIds.join('","')}"]&courseId=${
              payload.courseId
            }`
          : ''
      }${
          payload.course
            ? `&branchIds=["${payload?.branchIds.join('","')}"]&courseId=${
                payload.courseId
              }&course=${payload?.course}`
            : ''
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
)

export const getNewAllBatch = createAsyncThunk(
  'batches/fetchAll',
  async (payload: GetAllBatch) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const response: any = await apiV3.get(
      `${apiEndpointsV2.getNewAllBatch}?page=${payload.page}&limit=${
        payload.limit
      }${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}${
        payload.branchIds && payload.branchIds.length > 0
          ? `&branchIds=["${payload.branchIds.join('","')}"]`
          : ''
      }`,
      config
    )

    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data)
    }
  }
)

//new api flow
export const handleAuthenticateV2 = createAsyncThunk(
  'user/authenticate',
  async (payload: LoginPayloadV2): Promise<UserInfoV2> => {
    const response = await apiV3.post(apiEndpointsV2.auth, payload)
    const userInfo = response.data
    // const userInfo = response.data?.description?.user
    localStorage.setItem('token', userInfo.data.token)
    localStorage.setItem('refreshToken', userInfo.data.refreshToken)
    return userInfo.data.user
  }
)

export const refreshTokenAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      `${apiEndpointsV2.refreshToken}`,
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

export const getAllReviewAssignmentData = async (
  payload: GetReviewAssignmentData
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.assignments}?page=${payload.page}&limit=${
        payload.limit
      }${payload.branchId ? `&branchId=${payload.branchId}` : ''}${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.batchId ? `&batchId=${payload.batchId}` : ''
      }${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}${
        payload.chapterId ? `&chapterId=${payload.chapterId}` : ''
      }${payload.date ? `&date=${payload.date}` : ''}${
        payload.searchkey ? `&searchKey=${payload.searchkey}` : ''
      }${payload.type ? `&type=${payload.type}` : ''}${
        payload.admin_created ? `&admin_created=${payload.admin_created}` : ''
      }${payload.forReview ? `&forReview=${payload.forReview}` : ''}`,
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

export const getSingleAssignment = async (id: String) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.assignments}/${id}`,
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

export const assignAssignment = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const payload2 = {
    batchIds: payload.batches,
    deadLine: payload.deadline,
    duration: payload.duration
  }
  try {
    const response = await apiV3.post(
      `${apiEndpointsV2.assignAssignment}/${payload.id}`,
      payload2,
      config
    )

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const deleteAssignment = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.delete(
    `${apiEndpointsV2.assignments}/${payload.id}`,
    {
      ...config
    }
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getSingleSubmittedReviewAssignmentAPI = async (id: string) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getSubmitAssignment}/${id}`,
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

export const getAllSubmittedAssignmentAPI = async (
  payload: GetReviewAssignmentData
) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getSubmitAssignment}?${
        payload.assignmentId ? `&assignmentId=${payload.assignmentId}` : ''
      }${payload.page ? `&page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }${payload.branchId ? `&branchId=${payload.branchId}` : ''}${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.batchId ? `&batchId=${[payload.batchId]}` : ''
      }${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}${
        payload.date ? `&date=${payload.date}` : ''
      } `,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
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

export const reviewSubmittedAssignmentAPI = async (
  id: string,
  payload: reviewedSubmittedAssignmentAPIPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.reviewSubmittedAssignment}/${id}`,
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

export const getSingleReviewAssignmentData = async (id: string) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getSubmitAssignment}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
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

export const addAssignmentAPI = async (payload: AddAssignmentPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.assignments,
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

export const updateWithoutPatternTest = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.testWithoutPattern}`,
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

export const updateAssignment = async (payload: any, Id: string) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.assignments}/${Id}`,
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

export const getAllGradeData = async (payload: GetReviewAssignmentData) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.getAllGradeData}?page=${
      payload.skip === 0 ? 1 : payload.skip
    }&limit=${payload.limit}
      `,
    config
  )

  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data)
  }
}

export const addCourses = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.post(apiEndpointsV2.addCourse, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const getAllCourses = async () => {
  const storedToken = localStorage.getItem('token')

  try {
    const response: any = await apiV3.get(apiEndpointsV2.addCourse, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })

    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getSingleCourse = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.get(
    `${apiEndpointsV2.addCourse}/${payload}`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }
  )
  return response
}

export const getCourses = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Course}?page=${
        payload.page ? payload.page : ''
      }&limit=${payload.limit ? payload.limit : ''}${
        payload.instituteId ? `&&instituteId=${payload.instituteId}` : ''
      }${payload.branchId ? `&&branchId=${payload.branchId}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    )
    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const editOrUpdateCourse = async (payload: any, Id: string) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.put(
    `${apiEndpointsV2.addCourse}/${Id}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${storedToken}`
      }
    }
  )
  return response
}

export const deleteCourse = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.addCourse}/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    )
    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getNewAllInstituteAPI = createAsyncThunk(
  'institutes/fetchAll',
  async (payload: GetNewAllInstituteAPIPayload) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const response: any = await apiV3.get(
      `${apiEndpointsV2.getInstitute}?page=${payload.page}&limit=${payload.limit}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data)
    }
  }
)

export const getNewAllBranchAPI = createAsyncThunk(
  'Branch/fetchAll',
  async (payload: GetNewAllBranchAPIPayload) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    const response: any = await apiV3.get(
      `${apiEndpointsV2.getBranch}?page=${payload.page}&limit=${payload.limit}${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
      }`,
      config
    )

    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data)
    }
  }
)

export const getAllBranchAPI = async (payload: GetNewAllBranchAPIPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getBranch}${
        payload.page ? `?page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}${
        payload.searchKey ? `&searchKey=${payload.searchKey}` : ''
      }${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}`,
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

export const getQuestionBankDetails = async (
  payload: GetQuestionBankDetailsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await apiV3.get(
    `${apiEndpointsV2.questionBank}?${
      payload.courseId ? `course_id=${payload.courseId}` : ''
    }${payload.subjectId ? `&subject_id=${payload.subjectId}` : ''}&list_type=${
      payload.type
    }&limit=${payload.limit}`,
    config
  )

  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data.data)
  }
}

export const getQuestionBankDetailsCourses = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getQuestionBankV2Courses}?limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
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

export const getQuestionBankDetailsSubjects = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await apiV3.get(
    `${apiEndpointsV2.getQuestionBankV2subjects}?courseId=${payload.courseId}&limit=${payload.limit}`,
    config
  )

  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response.data.data)
  }
}

export const getQuestionBankDetailsTopics = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getQuestionBankV2Topics}?chapterId=${
        payload.chapterId
      }&limit=${payload.limit}${payload.page ? `&page=${payload.page}` : ''}`,
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

export const questionBulkUpload = async (
  payload: QuestionBulkUploadPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.questionsBulkUpload,
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

export const questionUploadInBulk = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response = await apiV3.post(
    apiEndpointsV2.questionsBulkUpload,
    payload,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const UsersBulkUpload = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response = await apiV3.post(
    apiEndpointsV2.UsersBulkUpload,
    payload,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const MaterialUpload = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.materialUpload,
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

export const getUploadedQuestions = async (
  payload: UploadedQuestionsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.questionsBulkUpload}/${payload.processId}?page=${payload.page}&limit=${payload.limit}`,
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

export const deleteInstituteTestAPI = async (payload: TestDeletePayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.delete(apiEndpointsV2.instituteTest, {
    ...config,
    data: payload
  })
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const instituteTestEnableAPI = async (payload: TestEnabledPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.put(
      apiEndpointsV2.instituteTest,
      payload,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const noPatternTestEnableAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.testWithoutPattern}/${payload.testId}`,
      { enabled: payload.enabled },
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const createSubjects = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.post(apiEndpointsV2.Subject, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const getAllSubjects = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Subject}?${
        payload.courseId ? `courseId=${payload.courseId}` : ''
      }${payload.searchKey ? `&searchKey=${payload.searchKey}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const getSingleSubject = async (SubjectId: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.Subject}/${SubjectId}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const eidtOrUpdateSubject = async (payload: any, Id: string) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.put(
    `${apiEndpointsV2.Subject}/${Id}`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${storedToken}`
      }
    }
  )
  return response
}

export const deleteSubject = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.Subject}/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const getAssignedTest = async (payload: AssignedTestPayload) => {
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
    }${payload.testDate ? `&testDate=${payload.testDate}` : ''}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getBatchCourses = async (
  payload: GetBatchCourse
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.addCourse}${
        payload.batchId
          ? `?batchId=${payload.batchId}`
          : payload.branchId
          ? `?branchId=${payload.branchId}`
          : ''
      }             `,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const getAllInstituteAPI = async (
  payload: GetNewAllInstituteAPIPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getInstitute}?page=${payload.page}&limit=${
        payload.limit
      }${payload.searchKey ? `&searchKey=${payload.searchKey}` : ''}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const getAllHolidays = async (payload: GetAllHolidaysPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getAllHolidays}?month=${payload.month}&year=${payload.year}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const getSingleHoliday = async (payload: GetSingleHolidayPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getAllHolidays}/${payload.id}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const updateHoliday = async (payload: AddOrEditHolidayProps) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.getAllHolidays}/${payload.id}`,
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

export const addHolidayAPI = async (
  payload: AddOrEditHolidayProps
): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.post(apiEndpointsV2.getAllHolidays, payload, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const bulkUploadHoliday = async (payload: any): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.post(
    apiEndpointsV2.bulkUploadHolidays,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${storedToken}`
      }
    }
  )
  return response
}

export const deleteHoliday = async (payload: string): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.delete(
    `${apiEndpointsV2.getAllHolidays}/${payload}`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }
  )
  return response
}

export const getAuthorListAPI = async (): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.get(`${apiEndpointsV2.Authors}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const addAuthorAPI = async (
  requestPayloads: AddAuthorProps
): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.post(apiEndpointsV2.Authors, requestPayloads, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const editAuthorAPI = async (payload: any, Id: string): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.put(`${apiEndpointsV2.Authors}/${Id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const deleteAuthorAPI = async (payload: string): Promise<any> => {
  const storedToken = localStorage.getItem('token')
  const response = await apiV3.delete(`${apiEndpointsV2.Authors}/${payload}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  return response
}

export const getSingleAuthor = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.get(
    `${apiEndpointsV2.Authors}/${payload}`,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    }
  )
  return response
}

export const AddInstituteV2 = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.addInstituteV2,
      payload,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const assignTestsToInstituteAPI = async (
  payload: AssignTestToInstitutePayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.assignTestToInstitute,
      payload,
      config
    )

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const assignTimeTableToInstituteAPI = async (
  payload: AssignTimeTableToInstitutePayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.assignTimeTabeToInstitute,
      payload,
      config
    )

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const updateTimeTableToInstituteAPI = async (
  id: string,
  payload: UpdateTimeTableToInstitutePayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.assignTimeTabeToInstitute}/${id}`,
      payload,
      config
    )

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const geTimeTableAPI = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.assignTimeTabeToInstitute}`,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const getSingleTimeTableAPI = async (id: string) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.assignTimeTabeToInstitute}/${id}`,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error')
  }
}

export const assignNoPatternTestAPI = async (
  payload: AssignNoPatternTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.assignNoPatternTest,
      payload,
      config
    )

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const DeleteInstitute = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.delete(
    `${apiEndpointsV2.deleteInstituteV2}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const assignBatchToTeacherAPI = async (
  payload: AssignBatchToTeacherPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.assignBatchToTeacher,
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

export const submitAssignmentAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.getSubmitAssignment,
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

export const EditInstitute = async (Id: string, payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.addInstituteV2}/${Id}`,
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

export const GetSingleInstitute = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.addInstituteV2}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const AddBranchV2 = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.addBranchV2,
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

export const getcourseById = async (payload: GetCourseId): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.addCourse}?instituteId=${payload.instituteId}`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const DeleteBranch = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.delete(
    `${apiEndpointsV2.addBranchV2}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const GetSingleBranch = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.addBranchV2}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const EditBranch = async (Id: string, payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.addBranchV2}/${Id}`,
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

export const getcourseByBranchId = async (
  payload: GetBatchCourseId
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.addCourse}?branchId=${payload.branchId}`,
      config
    )
    if (response?.status === 200 || response?.status_code === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const AddBatchV2 = async (payload: AddBatchPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.getAllBatchData,
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
export const DeleteBatch = async (
  Id: string | NumberFormatterCallbackFunction
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.delete(
    `${apiEndpointsV2.getAllBatchData}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const GetSingleBatch = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.getAllBatchData}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const EditBatch = async (
  Id: string,
  payload: EditBatchPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.getAllBatchData}/${Id}`,
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

export const GetAdminDashBoardData = async (Payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.adminDashBoard}${
      Payload?.instituteId ? `?instituteId=${Payload.instituteId}` : ''
    }${Payload.branchId ? `&branchId=${Payload.branchId}` : ''}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const GetTeacherDashBoardData = async () => {
  const storedToken = localStorage.getItem('token')
  const response: any = await apiV3.get(`${apiEndpointsV2.teacherDashBoard}`, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const BulkUploadGameDataWithQRCode = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  const response: any = await apiV3.post(
    apiEndpointsV2.bulkUploadGameDate,
    payload,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const GetAllUploadedFiles = async (payload: any) => {
  const storedToken = localStorage.getItem('token')
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.uploadedFiles}?type=${payload}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      }
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

export const SubmitAttemptedTest = async (
  payload: SubmitAttemptedTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.submitAttemptedTest,
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

export const SubmitMyAttemptedTest = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.submitAttemptedTest,
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

export const getTeacherQuizApi = async (payload?: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.getTeacherQuiz}${
      payload?.quizId ? `?quizId=${payload?.quizId}` : ''
    }`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getStudentQuizApi = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.getStudentQuiz}${
      payload.quizId ? `?quizId=${payload.quizId}` : ''
    }${payload.limit ? `?limit=${payload.limit}` : ''}${
      payload.skip ? `&skip=${payload.skip}` : ''
    }`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getScoreExcelApi = async (payload?: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.getScoreExcelFile}${
      payload?.testId ? `?testId=${payload?.testId}` : ''
    }`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getGameQRCodeListApi = async (payload: ManageContentPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.manageContent}?limit=${payload.limit}&page=${
        payload.page
      }
    ${payload.courseId ? `&courseId=${payload.courseId}` : ''}
    ${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}
    ${payload.chapterId ? `&chapterId=${payload.chapterId}` : ''}
    ${payload.topicId ? `&topicId=${payload.topicId}` : ''}`,
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

export const updateGamePublishedApi = async (payload: any) => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await apiV3.put(
    `${apiEndpointsV2.updateGameByQrCodeId}/${payload.qrCodeId}`,
    {},
    config
  )

  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const reviewQuiz = async (payload: ReviewQuizPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.reviewQuiz,
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

export const SubmitQuizAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.submitQuiz,
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

export const DeleteContent = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.delete(
    `${apiEndpointsV2.manageContent}/${Id}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const GetAllReviewBatch = async (payload: GetReviewBatchPayload) => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.getNewAllBatch}?page=${payload.page}&limit=${
      payload.limit
    }${
      payload.branchIds ? `&branchIds=["${payload.branchIds.join('","')}"]` : ''
    }&courseId=${payload.courseId}&subjectId=${payload.subjectId}`,
    config
  )
  if (response?.status === 200) {
    return response.data.data
  } else {
    throw new Error(response?.data)
  }
}

export const getStudentDashboardAPI = async (
  payload: GetStudentDashboardPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response: any = await apiV3.get(
    `${apiEndpointsV2.studentDashboard}?page=${payload.page}&limit=${payload.limit}`,
    config
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getAllMyTest = async (payload: GetAllMyTestPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.getMyTests}?page=${
      payload.page === 0 ? 1 : payload.page
    }&limit=${payload.limit}
      `,
    config
  )

  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response.data)
  }
}

export const getSingleMyTest = async (payload: GetAllMyTestPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.getMyTests}?testId=${payload.testId}&page=${
      payload.page === 0 ? 1 : payload.page
    }&limit=${payload.limit}
      `,
    config
  )

  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response.data)
  }
}

export const updateResultAnnouncementAPI = async (
  payload: ResultAnnouncementPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.patch(
      apiEndpointsV2.updateResultAnnouncement,
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

export const getAllFinishedTest = async (payload: GetAllMyTestPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getFinishedTests}?page=${
        payload.page === 0 ? 1 : payload.page
      }&limit=${payload.limit}
      `,
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

export const createPracticeTestAPI = async (
  payload: CreatePracticeTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.createPracticeTest,
      payload,
      config
    )

    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const submitPracticeTestAPI = async (
  payload: SubmitPracticeTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.submitPracticeTest,
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

export const getSubmitPracticeTestAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getSubmitPracticeTest}?limit=${payload.limit}&page=${payload.page}`,
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

export const erpLmsInstituteListApi = async () => {
  const response: any = await axios.get(
    'https://app.atcampussolutions.com/api/instance.php'
  )
  if (response?.status === 200 || response?.status_code === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getTestAnalytics = async (payload: GetAnalyticsPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.testAnalytics}?testId=${payload.testId}`,
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

export const getPracticeTestAnalytics = async (
  payload: GetAnalyticsPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.practiceTestAnalytics}?testId=${payload.testId}`,
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

export const getSubmitAttemptedTest = async (
  payload: GetSubmitAttemptedTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getFinishedTests}?courseId=${payload.courseId}&testId=${payload.testId}&isPracticeTest=${payload.isPracticeTest}`,
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

export const getTeacherTestAnalytics = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await apiV3.get(
    `${apiEndpointsV2.testAnalytics}?testId=${payload}`,
    config
  )
  if (response?.status === 200) {
    return response.data
  } else {
    throw new Error(response?.data)
  }
}

export const getTestTopperList = async (payload: GetTestToppersPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.topRankers}?testId=${payload.testId}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}`,
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

export const submitKeyChallenges = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  try {
    const response = await apiV3.post(
      `${apiEndpointsV2.keyChallenges}`,
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

export const createDuplicateTestAPI = async (
  payload: createDuplicateTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.createDuplicateTest,
      payload,
      config
    )

    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const createDuplicateNoPatternTestAPI = async (
  payload: createDuplicateNoPatternTestPayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.createDuplicateNoPatternTest,
      payload,
      config
    )

    if (response?.status === 200) {
      return response
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const checkUserNameAPI = async (payload: checkUserNameAPIPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.checkUsernameForgotPassword,
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

export const sentOtpAPI = async (payload: SendOTPPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(apiEndpointsV2.sendOTP, payload, config)

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const verifyOtpAPI = async (payload: VerifyOtpAPIPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.verifyOtpForgotPassword,
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

export const forgotPasswordAPI = async (payload: ForgotPasswordAPIPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.forgotPasswordReset,
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

export const getAllBoardsAPI = async (payload: BoardsAPIPayload) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.boards}?${payload.page ? `page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}`,
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

export const getSingleBoardAPI = async (boardId: string) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.boards}/${boardId}`,
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

export const createBoardAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      `${apiEndpointsV2.boards}`,
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

export const updateBoardAPI = async (payload: any, boardId: string) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.boards}/${boardId}`,
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

export const deleteBoardAPI = async (boardId: string) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.delete(
      `${apiEndpointsV2.boards}/${boardId}`,
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

export const startTestAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.post(
      `${apiEndpointsV2.startTest}`,
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

export const DeleteQuestion = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.questionsDelete}/${Id}`,
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

export const instituteSettingsAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.instituteSettings}`,
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

export const getInstituteSettingsAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.instituteSettings}?${
        payload.page ? `page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
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

export const getSubTopicAPI = async (
  payload: GetSubTopicAPIPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.subTopics}?${
        payload.page ? `page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.chapterId ? `&chapterId=${payload.chapterId}` : ''}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${payload.topicId ? `&topicId=${payload.topicId}` : ''}${
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

export const generateQrCodeAPI = async (
  payload: GenerateQrCodeAPIPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.qrCode}`,
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

export const getQrCodeAPI = async (payload: GetQrCodePayload): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.qrCode}?${payload.page ? `page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }${payload.fromDate ? `&fromDate=${payload.fromDate}` : ''}${
        payload.toDate ? `&toDate=${payload.toDate}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${payload.chapterId ? `&chapterId=${payload.chapterId}` : ''}${
        payload.topicId ? `&topicId=${payload.topicId}` : ''
      }${payload.subTopicId ? `&subTopicId=${payload.subTopicId}` : ''}${
        payload.searchKey ? `&searchKey=${payload.searchKey}` : ''
      }${payload.type ? `&type=${payload.type}` : ''}`,
      config
    )

    // courseId, subjectId, chapterId, topicId, subtopicId
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getSingleQRCodeAPI = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.qrCode}/${Id}`,
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

export const updateQrCodeAPI = async (
  id: string,
  payload: UpdateQrCodePayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.qrCode}/${id}`,
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

export const DeleteQrcodeAPI = async (Id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.qrCode}/${Id}`,
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

export const bulkUploadQrCodeAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.bulkUploadQrCode}`,
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

export const ChapterBulkUpload = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.chapterBulkUpload,
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

export const SubtopicsBulkUpload = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.subtopicsBulkUpload,
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

export const TopicsBulkUpload = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.topicsBulkUpload,
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

export const getModulesAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.modules}?${payload.page ? `page=${payload.page}` : ''}${
        payload.limit ? `&limit=${payload.limit}` : ''
      }${payload.instituteId ? `&instituteId=${payload.instituteId}` : ''}`,
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

export const modulesSettingsAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.modulesSettings}`,
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

export const getSingleInstituteModulesAPI = async (
  payload: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.modulesSettings}?${
        payload.instituteId ? `instituteId=${payload.instituteId}` : ''
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

export const rolemodulesSettingsAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.roleModulesSettings}`,
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

export const getRoleModulesAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.roleModulesSettings}?${
        payload.instituteId ? `instituteId=${payload.instituteId}` : ''
      }${payload.role ? `&role=${payload.role}` : ''}`,
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

export const courseMappingAPI = async (
  payload: CourseMappingPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.courseMapping}`,
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

export const getQuestionsCourseAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.questionsCourse}?${
        payload.page ? `page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}`,
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

export const deleteCourseMappingAPI = async (id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.courseMapping}/${id}`,
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

export const getSignleQuestionsCourseAPI = async (id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.questionsCourse}/${id}`,
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
export const getQuestionBankDetailsChapter = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.getQuestionBankV2Chapters}?subjectId=${
        payload.subjectId
      }&limit=${payload.limit}${payload.page ? `&page=${payload.page}` : ''}`,
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

export const getStudentAssignmentCounts = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentAssignmentCounts}`,
      config
    )
    if (response?.status === 200) {
      return response.data?.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getStudentAssignmentDetails = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentAssignmentDetails}?${
        payload?.status ? `status=${payload?.status}` : ''
      }${payload?.assignedOn ? `&assignedOn=${payload?.assignedOn}` : ''}`,
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

export const getStudentTestCount = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentTestCount}`,
      config
    )
    if (response?.status === 200) {
      return response?.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error ')
  }
}

export const getStudentSubjectAverage = async (id: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentSubjectAverage}?subjectId=${id}`,
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

export const getStudentAssignmentTypeBarChart = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentAssignmentBarChartByType}`,
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

export const getStudentTestChartDetails = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentTestChartDetails}`,
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

export const getStudentTestDetails = async (status?: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentsTestDetails}${
        status ? `?status=${status}` : ''
      }`,
      config
    )
    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    //throw new Error(error.response?.data?.message || 'Error ')
    console.log(error)
  }
}

export const getAllAssesmentTestType = async (
  payload: GetAllAssesmentTestTypePayload
) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.assesmentTestType}?&limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.skip ? `&skip=${payload.skip}` : ''}`,
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

export const getDashboardSuperAdminAPI = async (
  payload: getDashboardDataPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.dashboardSuperAdmin}?${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.branchId ? `&branchId=${payload.branchId}` : ''
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

export const getDashboardtopPerformers = async (
  payload: getDashboardDataPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.dashboardTopperformers}?${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.branchId ? `&branchId=${payload.branchId}` : ''
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

export const getDashboardAvgScoresGraph = async (
  payload: getDashboardDataPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.dashboardAvgScoresGraph}?${
        payload.instituteId ? `&instituteId=${payload.instituteId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}${
        payload.branchId ? `&branchId=${payload.branchId}` : ''
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
export const getTeacherDashboardApi = async (
  payload: getTeacherDashboardDataPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.teacherDashboardEd}?${
        payload.batchId ? `&batchId=${payload.batchId}` : ''
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

export const getTeacherAssesmentDashboardApi = async (
  payload: getTeacherDashboardDataPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.teacherDashboardAssesmentEd}?${
        payload.batchId ? `&batchId=${payload.batchId}` : ''
      }${payload.type ? `&type=${payload.type}` : ''}`,
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

export const getLessonPlanApi = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.lessonPlan}?&limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.skip ? `&skip=${payload.skip}` : ''}${
        payload.subjectId ? `&subjectId=${payload.subjectId}` : ''
      }${payload.courseId ? `&courseId=${payload.courseId}` : ''}`,
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

export const createLessonPlanApi = async (
  payload: CreateLessonPlanModule
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.lessonPlan}`,
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

export const getClassActivitiesApi = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.classActivitiesResoures}?&limit=${payload.limit}${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.skip ? `&skip=${payload.skip}` : ''}`,
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

export const getStudentTestcounts = async () => {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  try {
    const response = await apiV3.get(
      `${apiEndpointsV2.studentTestCountForChart}`,
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

export const getPrepModeMaterials = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.prepModeMaterials}?courseId=${payload.courseId}${
        payload.chapterId ? `&chapterId=${payload.chapterId}` : ''
      }${payload.topicId ? `&topicId=${payload.topicId}` : ''}`,
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

export const prepModeMaterials = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.prepModeMaterials}`,
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

export const getSessionMaterials = async (id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.sessions}/${id}`,
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

export const createSessions = async (payload: CreateSession): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.post(
      `${apiEndpointsV2.sessions}`,
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

export const getAllSessionAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.sessions}?&limit=${payload.limit}${
        payload.courseId ? `&courseId=${payload.courseId}` : ''
      }${payload.subjectId ? `&subjectId=${payload.subjectId}` : ''}${
        payload.batchId ? `&batchId=${payload.batchId}` : ''
      }${payload.sessionDate ? `&sessionDate=${payload.sessionDate}` : ''}`,
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

export const updateSessionsAPI = async (
  id: string,
  payload: CompletedSessionPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.put(
      `${apiEndpointsV2.sessions}/${id}`,
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

export const deleteSessionsAPI = async (id: string): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.delete(
      `${apiEndpointsV2.sessions}/${id}`,
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

export const questionCornerUploadInBulk = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(
      apiEndpointsV2.questionsCornerBulkUpload,
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

export const getOfflineSubmitsAPI = async (
  id: string,
  payload: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getOfflineSubmits}/${id}?${
        payload.page ? `&page=${payload.page}` : ''
      }${payload.limit ? `&limit=${payload.limit}` : ''}${
        payload.batchId ? `&batchId=${payload.batchId}` : ''
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

export const downloadOfflineSubmits = async (
  id: string,
  payload: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.downloadOfflineSubmtsExcel}/${id}?${
        payload.batchId ? `&branchId=${payload.batchId}` : ''
      }${
        payload.studentIds
          ? `&studentIds=["${payload.studentIds.join('","')}"]`
          : ''
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

export const assessmentMarkEntryAPI = async (id: string, payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response = await apiV3.put(
      `${apiEndpointsV2.assessmentMarkEntry}/${id}`,
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

export const addMaterialsAPI = async (payload: any) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }
  try {
    const response = await apiV3.post(apiEndpointsV2.Material, payload, config)

    if (response?.status === 200) {
      return response.data
    } else {
      throw new Error(response?.data?.message || 'Unexpected error occurred')
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error ')
  }
}

export const getStudentPerformanceAPI = async (
  payload: getStudentPerformancePayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getStudentPerformance}?batchId=${payload.batchId}`,
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

export const teacherPerformanceAPI = async (payload: any): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.myPerformance}?${
        payload.teacherId ? `&teacherId=${payload.teacherId}` : ''
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

export const getStudentPerformanceListAPI = async (
  payload: getStudentPerformanceListPayload
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.getStudentPerformanceList}?batchId=${payload.batchId}&page=${payload.page}&limit=${payload.limit}`,
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

export const missionSessionPerformanceAPI = async (
  payload: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.missedSession}?${
        payload.teacherId ? `&teacherId=${payload.teacherId}` : ''
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

export const teacherSubjectwiseBytypeAPI = async (
  payload: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.teacherSubjectwiseBytype}?${
        payload.teacherId ? `&teacherId=${payload.teacherId}` : ''
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

export const teacherSubjectwiseTestBytypeAPI = async (
  payload: any
): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    const response: any = await apiV3.get(
      `${apiEndpointsV2.teacherSubjectwiseTestBytype}?${
        payload.type ? `&type=${payload.type}` : ''
      }${payload.teacherId ? `&teacherId=${payload.teacherId}` : ''}`,
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
