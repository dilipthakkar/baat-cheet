import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUser } from "./actions";
const initialState = {
  user: null,
  loading: false,
  isSignup: false,
  isLogin: false,
  token: "",
};
const authReducer = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      Object.assign(state, initialState);
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSignup = true;
    },
    [signUpUser.rejected]: (state, action) => {
      Object.assign(state, initialState);
    },
    [loginUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isLogin = true;
      state.user = payload.user;
      state.token = payload?.token;
    },
    [loginUser.rejected]: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});
export const { logOut, setLoading } = authReducer.actions;
export default authReducer.reducer;
