import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './menu/reducer'
import assignedTestReducer from './studentV2/reducer'
import TeacherLeaveReducer from './teacherLeave/reducers'
import topHeaderReducer from './topHeader/reducer'
import createScheduleAssignTest from './create_schedule_assign_test/reducer'
import userReducerV2 from './userDetailsV2/reducer'
import instituteReducerV2 from './instituteV2/reducer'
import branchReducerV2 from './branchV2/reducer'
import batchReducerV2 from './batchV2/reducer'
import InstitutebatchreducersV2 from './institutebatch/reducers'
import myTestReducer from './studentV2/reducerMyTest'

const reducer = {
  userV2: userReducerV2,
  instituteV2: instituteReducerV2,
  branchV2: branchReducerV2,
  batchV2: batchReducerV2,
  institutebatch: InstitutebatchreducersV2,
  menu: menuReducer,
  teacherLeave: TeacherLeaveReducer,
  topHeader: topHeaderReducer,
  createScheduleAssignTest: createScheduleAssignTest,
  assignedTest: assignedTestReducer,
  myTest: myTestReducer
}

const initialState = {}

export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
