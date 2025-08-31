import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";
import { validateEmail, validatePassword } from "./validators";

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const submitAuth = createAsyncThunk<
  User,
  { email: string; password: string; mode: "login" | "register" },
  { rejectValue: string }
>("auth/submit", async (payload, { rejectWithValue }) => {
  const { email, password } = payload;

  if (!validateEmail(email)) return rejectWithValue("Invalid email");
  if (!validatePassword(password)) return rejectWithValue("Invalid password");

  await new Promise((res) => setTimeout(res, 500));

  return { email } as User;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      if (state.user) {
        const key = `purchased_${state.user.email}`;
        localStorage.removeItem(key);
      }

      state.user = null;
      localStorage.removeItem("user");
    },
    hydrate(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "fulfilled";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(submitAuth.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? "Authentication error";
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
