import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/courses/coursesSlice"

export const store = configureStore({
  reducer: {
  courses: coursesReducer,
  },
});


export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];