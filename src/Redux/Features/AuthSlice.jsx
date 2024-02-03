import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const loginFun = createAsyncThunk(
  "loginFun/auth",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        }),
      });

      let data = await res.json();
      if (!data.token) {
        dispatch(logoutUser());

        toast.error("Invalid credentials");
        return rejectWithValue("Invalid credentials");
      } else {
        return data;
      }
    } catch (error) {
      toast.error("Invalid credential");
      return rejectWithValue(error.message || "Invalid credentials");
    }
  }
);

const initialState = {
  error: "",
  data: {},
};

export const logout = createSlice({
  name: "logout",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = {};
      state.error = "";
    },
  },
});
export const { logoutUser } = logout.actions;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginFun.pending, (state, action) => {});
    builder.addCase(loginFun.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(loginFun.rejected, (state, action) => {
      console.log(action);
      state.error = action.payload;
      state.data = "";
    });
    builder.addCase(logoutUser, (state) => {
      state.data = {};
      state.error = "";
    });
  },
});

export default authSlice.reducer;
