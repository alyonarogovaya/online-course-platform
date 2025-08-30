import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Course, CoursesState } from "./types";
import { fetchCourses, handlePurchase } from "./api";

export const getCourses = createAsyncThunk(
  "courses/getAll",
  async (): Promise<Course[]> => {
    const data = await fetchCourses();
    return data;
  }
);

export const purchaseCourse = createAsyncThunk<
  string,
  { courseId: string },
  { rejectValue: string }
>("courses/purchase", async ({ courseId }, { rejectWithValue }) => {
  try {
    const res = await handlePurchase(courseId);
    return res.courseId;
  } catch (error: unknown) {
    let errorMessage = "Failed to purchase course.";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const err = error as { response?: { data?: { message?: string } } };
      errorMessage = err.response?.data?.message || errorMessage;
    }

    return rejectWithValue(errorMessage);
  }
});

const initialState: CoursesState = {
  courses: [],
  status: "idle",
  error: "",
  purchasedIds: [],
  purchasingStatus: {},
  purchaseError: {},
  currentVideo: {
    courseId: null,
    isOpen: false,
    isPlaying: false,
    currentTime: 0,
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    openVideo(state, action: PayloadAction<string>) {
      state.currentVideo = {
        courseId: action.payload,
        isOpen: true,
        isPlaying: false,
        currentTime: 0,
      };
    },
    closeVideo(state) {
      state.currentVideo.isOpen = false;
      state.currentVideo.isPlaying = false;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.currentVideo.isPlaying = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentVideo.currentTime = action.payload;
    },
  },
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
      .addCase(purchaseCourse.pending, (state, action) => {
        const id = (action.meta.arg as { courseId: string }).courseId;
        state.purchasingStatus[id] = "loading";
        state.purchaseError[id] = "";
      })
      .addCase(
        purchaseCourse.fulfilled,
        (state, action: PayloadAction<string>) => {
          const id = action.payload;
          state.purchasingStatus[id] = "fulfilled";
          state.purchaseError[id] = "";
          if (!state.purchasedIds.includes(id)) state.purchasedIds.push(id);
        }
      )
      .addCase(purchaseCourse.rejected, (state, action) => {
        const id = (action.meta.arg as { courseId: string }).courseId;
        state.purchasingStatus[id] = "rejected";
        state.purchaseError[id] =
          (action.payload as string) ??
          "There was an error purchasing the course. Try again later.";
      });
  },
});
export const { openVideo, closeVideo, setPlaying, setCurrentTime } = coursesSlice.actions;
export default coursesSlice.reducer;
