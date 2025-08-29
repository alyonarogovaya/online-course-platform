import {createSlice } from "@reduxjs/toolkit";
import type { CoursesState } from "./types";

const initialState: CoursesState = {
  items: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    
  },
});

export default coursesSlice.reducer;
