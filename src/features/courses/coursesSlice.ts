import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course, CoursesState } from "./types";
import { fetchCourses } from "./api";

export const getCourses = createAsyncThunk(
  "courses/getAll",
  async (): Promise<Course[]> => {
    const data = await fetchCourses();
    return data;
  }
);

const initialState: CoursesState = {
  courses: [],
  status: "idle",
  error: "",
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        getCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.status = "fulfilled";
          state.courses = action.payload;
        }
      )
      .addCase(getCourses.rejected, (state) => {
        state.status = "rejected";
        state.error = "Something went wrong. Courses can't be loaded.";
      })
  },
});

export default coursesSlice.reducer;
